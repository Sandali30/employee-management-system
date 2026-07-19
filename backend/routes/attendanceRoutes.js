const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
    checkIn,
    checkOut,
    getTodayAttendance,
    getMyAttendance,
    getAllAttendance,
    getAttendanceStats
} = require("../controllers/attendanceController");

router.post(
    "/check-in",
    authenticate,
    checkIn
);

router.post(
    "/check-out",
    authenticate,
    checkOut
);

router.get(
    "/today",
    authenticate,
    getTodayAttendance
);

router.get(
    "/my-attendance",
    authenticate,
    getMyAttendance
);

router.get(
    "/",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getAllAttendance
);

router.get(
    "/stats",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getAttendanceStats
);

module.exports = router;