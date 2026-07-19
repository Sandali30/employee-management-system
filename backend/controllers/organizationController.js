const User = require("../models/User");

// Get complete organization hierarchy
exports.getOrganizationTree = async (req, res) => {

    try {

        const employees = await User.find({
            isDeleted: false
        })
            .select("-password")
            .lean();

        const employeeMap = {};

        employees.forEach(employee => {

            employee.children = [];

            employeeMap[employee._id] = employee;

        });

        const roots = [];

        employees.forEach(employee => {

            if (employee.manager) {

                const manager = employeeMap[employee.manager];

                if (manager) {

                    manager.children.push(employee);

                }

            } else {

                roots.push(employee);

            }

        });

        return res.status(200).json({
            success: true,
            organization: roots
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get Direct Reportees
exports.getDirectReportees = async (req, res) => {

    try {

        const employees = await User.find({
            manager: req.params.id,
            isDeleted: false
        }).select("-password");

        return res.status(200).json({
            success: true,
            reportees: employees
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Helper function to prevent circular reporting
const isCircular = async (employeeId, managerId) => {

    if (!managerId) return false;

    let current = await User.findById(managerId);

    while (current) {

        if (current._id.toString() === employeeId.toString()) {
            return true;
        }

        if (!current.manager) {
            return false;
        }

        current = await User.findById(current.manager);

    }

    return false;

};

// Assign Reporting Manager
exports.assignManager = async (req, res) => {

    try {

        const { manager } = req.body;

        const employee = await User.findById(req.params.id);

        if (!employee || employee.isDeleted) {

            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });

        }

        // Cannot assign self
        if (manager === req.params.id) {

            return res.status(400).json({
                success: false,
                message: "Employee cannot report to themselves."
            });

        }

        // Prevent circular reporting
        const circular = await isCircular(
            employee._id,
            manager
        );

        if (circular) {

            return res.status(400).json({
                success: false,
                message: "Circular reporting is not allowed."
            });

        }

        employee.manager = manager || null;

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Reporting manager updated successfully.",
            employee
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};