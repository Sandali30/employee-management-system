const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
    try {

        const {
            leaveType,
            startDate,
            endDate,
            reason
        } = req.body;

        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            return res.status(400).json({
                success: false,
                message: "Cannot apply leave for past dates."
            });
        }

        if (end < start) {
            return res.status(400).json({
                success: false,
                message: "End date cannot be before start date."
            });
        }

        const existingLeave = await Leave.findOne({
            employee: req.user._id,
            status: {
                $in: ["Pending", "Approved"]
            },
            startDate: {
                $lte: end
            },
            endDate: {
                $gte: start
            }
        });

        if (existingLeave) {
            return res.status(400).json({
                success: false,
                message: "A leave request already exists for the selected dates."
            });
        }

        const totalDays =
            Math.ceil(
                (end - start) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        const leave = await Leave.create({

            employee: req.user._id,

            leaveType,

            startDate,

            endDate,

            totalDays,

            reason

        });

        return res.status(201).json({

            success: true,

            message: "Leave applied successfully.",

            leave

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }
};

exports.getMyLeaves = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const leaves = await Leave.find({
            employee: req.user._id
        })
            .populate(
                "approvedBy",
                "employeeId name"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit);

        const totalLeaves = await Leave.countDocuments({
            employee: req.user._id
        });

        return res.status(200).json({

            success: true,

            totalLeaves,

            currentPage: page,

            totalPages: Math.ceil(totalLeaves / limit),

            leaves

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getAllLeaves = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.leaveType) {
            filter.leaveType = req.query.leaveType;
        }

        if (req.query.employee) {
            filter.employee = req.query.employee;
        }

        if (req.query.startDate && req.query.endDate) {

            filter.startDate = {
                $gte: new Date(req.query.startDate)
            };

            filter.endDate = {
                $lte: new Date(req.query.endDate)
            };

        }

        const leaves = await Leave.find(filter)
            .populate(
                "employee",
                "employeeId name department designation"
            )
            .populate(
                "approvedBy",
                "employeeId name"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit);

        const totalLeaves = await Leave.countDocuments(filter);

        return res.status(200).json({

            success: true,

            totalLeaves,

            currentPage: page,

            totalPages: Math.ceil(totalLeaves / limit),

            leaves

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.approveLeave = async (req, res) => {

    try {

        const leave = await Leave.findById(req.params.id);

        if (!leave) {

            return res.status(404).json({

                success: false,

                message: "Leave request not found."

            });

        }

        if (leave.status !== "Pending") {

            return res.status(400).json({

                success: false,

                message: "Leave request has already been processed."

            });

        }

        leave.status = "Approved";
        leave.approvedBy = req.user._id;
        leave.remarks = req.body.remarks || "";

        await leave.save();

        return res.status(200).json({

            success: true,

            message: "Leave approved successfully.",

            leave

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.rejectLeave = async (req, res) => {

    try {

        const leave = await Leave.findById(req.params.id);

        if (!leave) {

            return res.status(404).json({

                success: false,

                message: "Leave request not found."

            });

        }

        if (leave.status !== "Pending") {

            return res.status(400).json({

                success: false,

                message: "Leave request has already been processed."

            });

        }

        leave.status = "Rejected";
        leave.approvedBy = req.user._id;
        leave.remarks = req.body.remarks || "";

        await leave.save();

        return res.status(200).json({

            success: true,

            message: "Leave rejected successfully.",

            leave

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};