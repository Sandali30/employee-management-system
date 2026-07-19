const { body } = require("express-validator");

exports.applyLeaveValidator = [

    body("leaveType")
        .notEmpty()
        .withMessage("Leave Type is required.")
        .isIn([
            "Casual",
            "Sick",
            "Earned",
            "Maternity",
            "Paternity",
            "Loss of Pay"
        ])
        .withMessage("Invalid Leave Type."),

    body("startDate")
        .notEmpty()
        .withMessage("Start Date is required.")
        .isISO8601()
        .withMessage("Invalid Start Date."),

    body("endDate")
        .notEmpty()
        .withMessage("End Date is required.")
        .isISO8601()
        .withMessage("Invalid End Date."),

    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Reason is required.")
        .isLength({ min: 5, max: 500 })
        .withMessage("Reason must be between 5 and 500 characters.")
];