const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
    storage:storage
});

// signup route
const signup = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists with this email" });
        }

        // Check if a profile image file is provided
        if (!req.file) {
            return res.status(400).json({ error: "No profile image provided" });
        }

        // Validate password length
        if (!userPassword || userPassword.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        // Upload the profile image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        // Hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);
        console.log("Request body: ", req.body);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the created user
        return res.status(200).json({
            status: "Ok",
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error(error);
    }
};


//login route
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        // console.log(userEmail);

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                const userobj1=user.toObject();
                delete userobj1.userPassword;
                delete userobj1["_id"];
                return res.json(userobj1);
            } else {
                return res.json({ status: "Error", getUser: false })
            }
        } else {
            return res.json({ status: "Error", getUser: false });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup, login };