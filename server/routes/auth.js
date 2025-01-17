const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const destinationPath = "./images";
        cb(null,destinationPath);
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

var upload = multer({
    storage: storage
});

// signup
router.post("/signup", upload.single("profileImage"), authController.signup);

//login
router.post("/login", authController.login);

module.exports = router;