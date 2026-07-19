const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
    generatePayroll,
    getMyPayrolls,
    getAllPayrolls,
    markPayrollAsPaid,
    getPayrollStatistics,
    getPayrollById
} = require("../controllers/payrollController");

router.post(
    "/generate",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    generatePayroll
);

router.get(
    "/my-payrolls",
    authenticate,
    getMyPayrolls
);

router.get(
    "/",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getAllPayrolls
);

router.patch(
    "/:id/pay",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    markPayrollAsPaid
);

router.get(
    "/statistics",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getPayrollStatistics
);

router.get(
    "/:id",
    authenticate,
    getPayrollById
);

module.exports = router;