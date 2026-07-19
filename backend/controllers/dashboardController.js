const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {

    try {

        const totalEmployees = await User.countDocuments({
            isDeleted: false
        });

        const activeEmployees = await User.countDocuments({
            status: "Active",
            isDeleted: false
        });

        const inactiveEmployees = await User.countDocuments({
            status: "Inactive",
            isDeleted: false
        });

        const hrManagers = await User.countDocuments({
            role: "HR Manager",
            isDeleted: false
        });

        const recentEmployees = await User.find({
            isDeleted: false
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("employeeId name department role joiningDate");

        res.status(200).json({

            success: true,

            statistics: {

                totalEmployees,

                activeEmployees,

                inactiveEmployees,

                hrManagers

            },

            recentEmployees

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};

exports.getDepartmentStatistics = async (req, res) => {

    try {

        const departmentStats = await User.aggregate([
            {
                $match: {
                    isDeleted: false
                }
            },
            {
                $group: {
                    _id: "$department",
                    totalEmployees: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalEmployees: -1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            departmentStats
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

exports.getOrganizationHierarchy = async (req, res) => {

    try {

        const managers = await User.find({
            role: {
                $in: ["Super Admin", "HR Manager"]
            },
            isDeleted: false
        })
        .select("employeeId name designation role");

        const hierarchy = [];

        for (const manager of managers) {

            const employees = await User.find({
                manager: manager._id,
                isDeleted: false
            })
            .select("employeeId name designation department role");

            hierarchy.push({
                manager,
                employees
            });

        }

        return res.status(200).json({
            success: true,
            hierarchy
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};