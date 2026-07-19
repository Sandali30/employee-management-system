require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        await connectDB();

        const exists = await User.findOne({
            email: "admin@ems.com"
        });

        if (exists) {
            console.log("Super Admin already exists.");
            process.exit();
        }

        await User.create({
            employeeId: "EMP001",
            name: "Super Admin",
            email: "admin@ems.com",
            password: "Admin@123",
            phone: "9999999999",
            department: "Administration",
            designation: "System Administrator",
            salary: 100000,
            joiningDate: new Date(),
            status: "Active",
            role: "Super Admin"
        });

        console.log("Super Admin Created Successfully");
        console.log("Email: admin@ems.com");
        console.log("Password: Admin@123");
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
