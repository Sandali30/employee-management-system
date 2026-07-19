const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            name,
            email,
            password,
            phone,
            department,
            designation,
            salary,
            joiningDate,
            role,
            manager
        } = req.body;
        const existingUser = await User.findOne({
            $or: [
                { email },
                { employeeId }
            ]
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists."
            });
        }
        if (
            req.user.role === "HR Manager" &&
            role === "Super Admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "HR Manager cannot create Super Admin."
            });
        }
        if (manager) {
            const managerExists = await User.findById(manager);
            if (!managerExists) {
                return res.status(404).json({
                    success: false,
                    message: "Manager not found."
                });
            }
        }
        const employee = await User.create({
            employeeId,
            name,
            email,
            password,
            phone,
            department,
            designation,
            salary,
            joiningDate,
            role: role || "Employee",
            manager: manager || null
        });
        return res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            employee
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            department,
            role,
            status,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;
        const query = {
            isDeleted: false
        };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { employeeId: { $regex: search, $options: "i" } }
            ];
        }
        if (department) {
            query.department = department;
        }
        if (role) {
            query.role = role;
        }
        if (status) {
            query.status = status;
        }
        const sort = {
            [sortBy]: order === "asc" ? 1 : -1
        };
        const totalEmployees = await User.countDocuments(query);
        const employees = await User.find(query)
            .populate("manager", "name employeeId email")
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        return res.status(200).json({
            success: true,
            totalEmployees,
            currentPage: Number(page),
            totalPages: Math.ceil(totalEmployees / limit),
            employees
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Employee ID."
            });
        }
        const employee = await User.findById(id)
            .populate("manager", "name employeeId email");
        if (!employee || employee.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }
        if (
            req.user.role === "Employee" &&
            req.user._id.toString() !== employee._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this profile."
            });
        }
        return res.status(200).json({
            success: true,
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

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Employee ID."
            });
        }
        const employee = await User.findById(id);
        if (!employee || employee.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }
        if (
            req.user.role === "Employee" &&
            req.user._id.toString() !== employee._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this employee."
            });
        }
        if (
            req.user.role === "HR Manager" &&
            employee.role === "Super Admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "HR Manager cannot update Super Admin."
            });
        }
        if (req.body.email) {
            const existingEmail = await User.findOne({
                email: req.body.email,
                _id: { $ne: id }
            });
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }
        }
        if (req.body.employeeId) {
            const existingEmployee = await User.findOne({
                employeeId: req.body.employeeId,
                _id: { $ne: id }
            });
            if (existingEmployee) {
                return res.status(400).json({
                    success: false,
                    message: "Employee ID already exists."
                });
            }
        }
        Object.assign(employee, req.body);
        await employee.save();
        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
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

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Employee ID."
            });
        }
        const employee = await User.findById(id);
        if (!employee || employee.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }
        if (
            req.user.role === "HR Manager" &&
            employee.role === "Super Admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "HR Manager cannot delete Super Admin."
            });
        }
        if (req.user.role === "Employee") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete employees."
            });
        }
        employee.isDeleted = true;
        await employee.save();
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Employee ID."
            });
        }
        const employee = await User.findById(id);
        if (!employee || employee.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }
        if (
            req.user.role === "Employee" &&
            req.user._id.toString() !== employee._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this profile."
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }
        if (employee.profileImage) {
            const oldImagePath = path.join(
                __dirname,
                "..",
                employee.profileImage.replace(/^\/+/, "")
            );
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        employee.profileImage = `/uploads/profileImages/${req.file.filename}`;
        await employee.save();
        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully.",
            profileImage: employee.profileImage
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};