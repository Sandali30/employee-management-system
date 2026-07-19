const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        const existingAdmin = await User.findOne({
            role: "Super Admin",
        });

        if (existingAdmin) {
            console.log("Super Admin already exists.");
            process.exit();
        }

        const admin = new User({
            employeeId: "EMP001",
            name: "Super Admin",
            email: "admin@gmail.com",
            password: "Admin@123",
            phone: "9876543210",
            department: "Administration",
            designation: "System Administrator",
            salary: 100000,
            joiningDate: new Date(),
            role: "Super Admin",
            status: "Active",
        });

        await admin.save();

        console.log("Super Admin Created Successfully");
        console.log("Email: admin@gmail.com");
        console.log("Password: Admin@123");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAdmin();
