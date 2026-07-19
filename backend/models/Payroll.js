const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
    {

        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true
        },

        basicSalary: {
            type: Number,
            required: true
        },

        bonus: {
            type: Number,
            default: 0
        },

        deductions: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        netSalary: {
            type: Number,
            default: 0
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid"
            ],
            default: "Pending"
        },

        paymentDate: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true
    }
);

// Prevent duplicate payroll for same employee/month/year
payrollSchema.index(
    {
        employee: 1,
        month: 1,
        year: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Payroll", payrollSchema);