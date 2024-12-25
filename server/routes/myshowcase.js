const express = require("express");
const router = express.Router();
const accompController = require("../controllers/AccompController");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const streamifier = require('streamifier');


dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });


router.get('/:userEmail',accompController.retrieveShowcase);
router.post('/:userEmail',upload.single('profileInfo.image'), accompController.updateShowcase);

router.get('/public/:userEmail', accompController.getPublicShowcase);

module.exports = router;