const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
    createEmployeeValidator,
    updateEmployeeValidator
} = require("../validators/employeeValidator");

const { validate } = require("../middleware/validationMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    uploadProfileImage
} = require("../controllers/employeeController");

const {
    assignManager,
    getDirectReportees
} = require("../controllers/organizationController");

// Create Employee
router.post(
    "/",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    createEmployeeValidator,
    validate,
    createEmployee
);

// Get All Employees
router.get(
    "/",
    authenticate,
    getEmployees
);

// Get Employee By ID
router.get(
    "/:id",
    authenticate,
    getEmployeeById
);

// Update Employee
router.put(
    "/:id",
    authenticate,
    authorize("Super Admin", "HR Manager", "Employee"),
    updateEmployeeValidator,
    validate,
    updateEmployee
);

// Upload Profile Image
router.put(
    "/:id/upload-profile",
    authenticate,
    authorize("Super Admin", "HR Manager", "Employee"),
    upload.single("profileImage"),
    uploadProfileImage
);

// Delete Employee (Soft Delete)
router.delete(
    "/:id",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    deleteEmployee
);

// Assign Reporting Manager
router.patch(
    "/:id/manager",
    authenticate,
    authorize("Super Admin"),
    assignManager
);

// Get Direct Reportees
router.get(
    "/:id/reportees",
    authenticate,
    authorize("Super Admin", "HR Manager"),
    getDirectReportees
);

module.exports = router;

