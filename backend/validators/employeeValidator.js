const { body } = require("express-validator");

exports.createEmployeeValidator = [

    body("employeeId")
        .notEmpty()
        .withMessage("Employee ID is required"),

    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required"),

    body("department")
        .notEmpty()
        .withMessage("Department is required"),

    body("designation")
        .notEmpty()
        .withMessage("Designation is required"),

    body("salary")
        .isNumeric()
        .withMessage("Salary must be numeric"),

    body("joiningDate")
        .notEmpty()
        .withMessage("Joining Date is required"),

    body("role")
        .optional()
        .isIn(["Super Admin", "HR Manager", "Employee"])
        .withMessage("Invalid Role")

];

exports.updateEmployeeValidator = [

    body("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("phone")
        .optional()
        .notEmpty()
        .withMessage("Phone number cannot be empty"),

    body("department")
        .optional()
        .notEmpty()
        .withMessage("Department cannot be empty"),

    body("designation")
        .optional()
        .notEmpty()
        .withMessage("Designation cannot be empty"),

    body("salary")
        .optional()
        .isNumeric()
        .withMessage("Salary must be numeric"),

    body("status")
        .optional()
        .isIn(["Active", "Inactive"])
        .withMessage("Invalid status"),

    body("role")
        .optional()
        .isIn(["Super Admin", "HR Manager", "Employee"])
        .withMessage("Invalid role")

];