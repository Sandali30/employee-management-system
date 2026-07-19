const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        const user = await User.findOne({
            email: {
                $in: [
                    "admin@ems.com",
                    "admin@gmail.com"
                ]
            }
        });

        if (!user) {
            console.log("Admin not found");
            process.exit();
        }

        user.password = "Admin@123";

        await user.save();

        console.log("Password reset successfully!");
        console.log(`Email: ${user.email}`);
        console.log("Password: Admin@123");

        process.exit();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
