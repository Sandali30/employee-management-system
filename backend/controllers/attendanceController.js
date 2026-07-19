const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {

    try {

        // Current date and time
        const now = new Date();

        // Date only (00:00:00) for checking today's attendance
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if employee has already checked in today
        let attendance = await Attendance.findOne({
            employee: req.user._id,
            date: today
        });

        if (attendance) {
            return res.status(400).json({
                success: false,
                message: "Already checked in today."
            });
        }

        // Office starts at 9:30 AM
        const officeStart = new Date();
        officeStart.setHours(9, 30, 0, 0);

        let status = "Present";

        if (now > officeStart) {
            status = "Late";
        }

        // Create attendance
        attendance = await Attendance.create({

            employee: req.user._id,

            date: today,

            month: today.getMonth() + 1,

            year: today.getFullYear(),

            checkIn: now,

            status

        });

        return res.status(201).json({

            success: true,

            message: "Check-in successful.",

            attendance

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.checkOut = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            employee: req.user._id,
            date: today
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "You have not checked in today."
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: "You have already checked out."
            });
        }

        attendance.checkOut = new Date();

        const workingMilliseconds =
            attendance.checkOut - attendance.checkIn;

        attendance.workingHours =
            Number(
                (workingMilliseconds / (1000 * 60 * 60)).toFixed(2)
            );

        // Half Day Rule
        if (attendance.workingHours < 4.5) {

            attendance.status = "Half Day";

        }

        await attendance.save();
        return res.status(200).json({
            success: true,
            message: "Check-out successful.",
            attendance
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

exports.getTodayAttendance = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            employee: req.user._id,
            date: today
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found for today."
            });
        }

        return res.status(200).json({
            success: true,
            attendance
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

exports.getMyAttendance = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = {
            employee: req.user._id
        };

        if (req.query.startDate && req.query.endDate) {

            filter.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };

        }

        const attendance = await Attendance.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const totalRecords = await Attendance.countDocuments(filter);

        return res.status(200).json({

            success: true,

            totalRecords,

            currentPage: page,

            totalPages: Math.ceil(totalRecords / limit),

            attendance

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getAllAttendance = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.employeeId) {
            filter.employee = req.query.employeeId;
        }

        const attendance = await Attendance.find(filter)
            .populate(
                "employee",
                "employeeId name department designation"
            )
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const totalRecords = await Attendance.countDocuments(filter);

        return res.status(200).json({

            success: true,

            totalRecords,

            currentPage: page,

            totalPages: Math.ceil(totalRecords / limit),

            attendance

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getAttendanceStats = async (req, res) => {

    try {

        const stats = await Attendance.aggregate([

            {
                $group: {

                    _id: "$status",

                    count: {
                        $sum: 1
                    }

                }

            }

        ]);

        const totalWorkingHours = await Attendance.aggregate([

            {

                $group: {

                    _id: null,

                    hours: {
                        $sum: "$workingHours"
                    }

                }

            }

        ]);

        return res.status(200).json({

            success: true,

            statusStatistics: stats,

            totalWorkingHours:
                totalWorkingHours[0]?.hours || 0

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};