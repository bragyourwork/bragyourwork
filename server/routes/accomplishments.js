const express = require("express");
const router = express.Router();
const accompController = require("../controllers/AccompController");
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
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Temporary storage directory
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage }); // Use disk storage



router.post("/add", upload.fields([{ name: 'file',maxCount:1 }, { name: 'files', maxCount: 10 }]),accompController.add);
router.delete('/delete/:id',accompController.deleteAccomplishment);

router.get('/view/:userEmail', accompController.view);
router.get('/view/:userEmail/:id', accompController.viewById);
// router.put('/:id', accompController.updateAccomplishmentById);
router.put('/:id', upload.fields([{ name: 'files', maxCount: 10 }]), accompController.updateAccomplishmentById);
  // Route definition
router.delete('/:id/files', accompController.deleteFileFromAccomplishment);
router.get('/:id', accompController.viewById)
// Start server
module.exports = router;
// module.exports = app;
