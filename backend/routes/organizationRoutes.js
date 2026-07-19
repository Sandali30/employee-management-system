const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
    getOrganizationTree,
    getDirectReportees,
    assignManager
} = require("../controllers/organizationController");

// View Organization Tree
router.get(
    "/tree",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getOrganizationTree
);

// View Direct Reportees
router.get(
    "/reportees/:id",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getDirectReportees
);

// Assign Reporting Manager
router.patch(
    "/manager/:id",
    authenticate,
    authorize("Super Admin"),
    assignManager
);

module.exports = router;