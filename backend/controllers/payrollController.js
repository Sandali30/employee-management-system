const Payroll = require("../models/Payroll");
const User = require("../models/User");
const Attendance = require("../models/Attendance");
const {
    createNotification
} = require("./notificationController");

exports.generatePayroll = async (req, res) => {

    try {

        const {
            employeeId,
            month,
            year,
            bonus = 0,
            deductions = 0,
            tax = 0
        } = req.body;

        const employee = await User.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        const existingPayroll = await Payroll.findOne({
            employee: employeeId,
            month,
            year
        });

        if (existingPayroll) {
            return res.status(400).json({
                success: false,
                message: "Payroll already generated."
            });
        }

        // Get attendance
        const attendance = await Attendance.find({
            employee: employeeId,
            month,
            year
        });

        const presentDays = attendance.filter(
            a => a.status === "Present"
        ).length;

        const halfDays = attendance.filter(
            a => a.status === "Half Day"
        ).length;

        const absentDays = attendance.filter(
            a => a.status === "Absent"
        ).length;

        const basicSalary = employee.salary;

        const workingDays = 30;

        const perDaySalary = basicSalary / workingDays;

        const attendanceSalary =
            (presentDays * perDaySalary) +
            (halfDays * perDaySalary * 0.5);

        const leaveDeduction =
            absentDays * perDaySalary;

        const netSalary =
            attendanceSalary +
            bonus -
            deductions -
            tax;

        const payroll = await Payroll.create({

            employee: employeeId,

            month,

            year,

            basicSalary,

            bonus,

            deductions: deductions + leaveDeduction,

            tax,

            netSalary

        });

        await createNotification(

            employeeId,

            "Payroll Generated",

            `Your payroll for ${month}/${year} has been generated.`,

            "Payroll"

        );

        return res.status(201).json({

            success: true,

            message: "Payroll Generated Successfully",

            payroll,

            payrollSummary: {

                presentDays,

                halfDays,

                absentDays,

                attendanceSalary,

                leaveDeduction

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getMyPayrolls = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const payrolls = await Payroll.find({
            employee: req.user._id
        })
            .sort({
                year: -1,
                month: -1
            })
            .skip(skip)
            .limit(limit);

        const totalRecords = await Payroll.countDocuments({
            employee: req.user._id
        });

        return res.status(200).json({

            success: true,

            totalRecords,

            currentPage: page,

            totalPages: Math.ceil(totalRecords / limit),

            payrolls

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getAllPayrolls = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.month) {
            filter.month = Number(req.query.month);
        }

        if (req.query.year) {
            filter.year = Number(req.query.year);
        }

        if (req.query.employeeId) {
            filter.employee = req.query.employeeId;
        }

        const payrolls = await Payroll.find(filter)
            .populate(
                "employee",
                "employeeId name department designation"
            )
            .sort({
                year: -1,
                month: -1
            })
            .skip(skip)
            .limit(limit);

        const totalRecords = await Payroll.countDocuments(filter);

        return res.status(200).json({

            success: true,

            totalRecords,

            currentPage: page,

            totalPages: Math.ceil(totalRecords / limit),

            payrolls

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.markPayrollAsPaid = async (req, res) => {

    try {

        const payroll = await Payroll.findById(req.params.id);

        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: "Payroll not found."
            });
        }

        if (payroll.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Payroll already marked as paid."
            });
        }

        payroll.paymentStatus = "Paid";
        payroll.paymentDate = new Date();

        await payroll.save();

        await createNotification(

            payroll.employee,

            "Salary Credited",

            `Your salary for ${payroll.month}/${payroll.year} has been credited successfully.`,

            "Payroll"

        );

        return res.status(200).json({

            success: true,

            message: "Payroll marked as paid successfully.",

            payroll

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getPayrollStatistics = async (req, res) => {

    try {

        const totalPayrolls = await Payroll.countDocuments();

        const totalSalaryPaid = await Payroll.aggregate([

            {
                $match: {
                    paymentStatus: "Paid"
                }
            },

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$netSalary"
                    }
                }
            }

        ]);

        const pendingPayrolls = await Payroll.countDocuments({
            paymentStatus: "Pending"
        });

        const paidPayrolls = await Payroll.countDocuments({
            paymentStatus: "Paid"
        });

        return res.status(200).json({

            success: true,

            statistics: {

                totalPayrolls,

                paidPayrolls,

                pendingPayrolls,

                totalSalaryPaid:
                    totalSalaryPaid[0]?.total || 0

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getPayrollById = async (req, res) => {

    try {

        const payroll = await Payroll.findById(req.params.id)
            .populate(
                "employee",
                "employeeId name email department designation"
            );

        if (!payroll) {

            return res.status(404).json({

                success: false,

                message: "Payroll not found."

            });

        }

        return res.status(200).json({

            success: true,

            payroll

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};
