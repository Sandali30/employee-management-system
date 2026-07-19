const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
    getDashboardStats,
    getDepartmentStatistics,
    getOrganizationHierarchy
} = require("../controllers/dashboardController");

router.get(
    "/stats",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getDashboardStats
);

router.get(
    "/departments",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getDepartmentStatistics
);

router.get(
    "/hierarchy",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getOrganizationHierarchy
);

module.exports = router;
