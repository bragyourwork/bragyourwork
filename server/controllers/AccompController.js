const express = require("express");
const dotenv = require("dotenv");
const Accomplishment = require("../models/Accomplishment");
const Showcase = require("../models/Showcase");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
// const cloudinary = require("cloudinary");
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

dotenv.config();

const router = express.Router();

// Store files temporarily on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

// adding accomplishment
const add = async (req, res) => {
    try {
      const { userId, userEmail, title, description, date, tags } = req.body;
  
      let fileUrl = '';
      if (req.files['file'] && req.files['file'][0]) {
        console.log("path",req.files['file'][0].path); // Check the file path
        const coverImage = req.files['file'][0];
        const coverImageResult = await cloudinary.uploader.upload(coverImage.path);
        fileUrl = coverImageResult.secure_url;
        fs.unlinkSync(coverImage.path); // Remove temp file after upload
      }
  
      const fileUrls = [];
      if (req.files['files']) {
        for (const file of req.files['files']) {
          const result = await cloudinary.uploader.upload(file.path);
          fileUrls.push(result.secure_url);
          fs.unlinkSync(file.path); // Remove temp file after upload
        }
      }
  
      const accomplishment = new Accomplishment({
        userId,
        userEmail,
        title,
        description,
        date,
        tags: tags.split(','),
        file: fileUrl,
        files: fileUrls,
      });
  
      await accomplishment.save();
      res.status(201).json({ message: 'Accomplishment added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding accomplishment' });
    }
  };
  



// view accomplishments
const view = async (req, res) => {
    try {
        const {userEmail} = req.params;
        // console.log(userEmail);
        const accomplishments = await Accomplishment.find({ userEmail:userEmail});
        res.status(200).json(accomplishments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accomplishments' });
    }
};
const viewById = async (req, res) =>{
    try {
        const {id} = req.params;
        const accomplishment = await Accomplishment.findById(id);
        res.status(200).json(accomplishment);
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching accomplishment by id' });
    }
}

// delete accomplishment by ID
const deleteAccomplishment = async (req, res) => {
  try {
    // console.loh("hahaha")
      const { id } = req.params;
      
      const accomplishment = await Accomplishment.findByIdAndDelete(id);
      
      if (!accomplishment) {
          return res.status(404).json({ message: 'Accomplishment not found' });
      }
      
      res.status(200).json({ message: 'Accomplishment deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting accomplishment' });
  }
};


const updateAccomplishmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, userEmail, title, description, date, tags } = req.body;

        // Fetch the existing accomplishment
        const existingAccomplishment = await Accomplishment.findById(id);
        if (!existingAccomplishment) {
            return res.status(404).json({ message: 'Accomplishment not found' });
        }

        // Create a new array of files that combines existing and new files
        const newFiles = [];

        if (req.files && req.files['files']) {
            const uploadPromises = req.files['files'].map(file => {
                return new Promise((resolve, reject) => {
                    let uploadStream;
                    
                    if (file.mimetype === 'application/pdf') {
                        // Upload PDFs as raw files
                        uploadStream = cloudinary.uploader.upload_stream(
                            { resource_type: 'raw' },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result.secure_url);
                            }
                        );
                        // Use buffer to handle file content
                        uploadStream.end(file.buffer);
        
                    } else if (file.mimetype.startsWith('video/')) {
                        // Upload videos using buffer
                        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
                            if (error) {
                                console.error('Error uploading video:', error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }).end(file.buffer); // Use buffer for video uploads
        
                    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                               file.mimetype === 'application/msword') {
                        // Upload Word documents as raw files
                        cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
                            if (error) {
                                console.error('Error uploading Word document:', error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }).end(file.buffer);  // Use buffer for Word document uploads
        
                    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                               file.mimetype === 'application/vnd.ms-excel') {
                        // Upload Excel files as raw files
                        cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
                            if (error) {
                                console.error('Error uploading Excel file:', error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }).end(file.buffer);  // Use buffer for Excel file uploads
        
                    } else {
                        // Upload images as image files using buffer
                        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                            if (error) {
                                console.error('Error uploading image:', error);
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }).end(file.buffer);  // Use file.buffer to upload the image from memory
                    }
                });
            });
        
            // Wait for all uploads to complete
            const uploadedFiles = await Promise.all(uploadPromises);
            newFiles.push(...uploadedFiles);
        }
        

        const updatedAccomplishment = {
            userId,
            userEmail,
            title,
            description,
            date,
            tags: tags.split(','),
            files: [...existingAccomplishment.files, ...newFiles],
        };

        const accomplishment = await Accomplishment.findByIdAndUpdate(id, updatedAccomplishment, { new: true });
        res.status(200).json(accomplishment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating accomplishment', error });
    }
};


  const deleteFileFromAccomplishment = async (req, res) => {
    try {
      const { id } = req.params;
      const { fileUrl } = req.body;
  
      // Fetch the existing accomplishment
      const accomplishment = await Accomplishment.findById(id);
      if (!accomplishment) {
        return res.status(404).json({ message: 'Accomplishment not found' });
      }
  
      // Remove the file from Cloudinary
      const publicId = fileUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
  
      // Update the accomplishment document
      const updatedFiles = accomplishment.files.filter(file => file !== fileUrl);
      accomplishment.files = updatedFiles;
      await accomplishment.save();
  
      res.status(200).json({ message: 'File removed successfully', files: updatedFiles });
    } catch (error) {
      res.status(500).json({ message: 'Error removing file', error });
    }
  };


  // ---------------showcase---------------------------
  const retrieveShowcase = async (req, res) => {
    const { userEmail } = req.params;  // Fetch by email
    try {
        const showcase = await Showcase.findOne({ userEmail });  // Query by userEmail
        res.json(showcase || {});
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving showcase data' });
    }
}


const updateShowcase = async (req, res) => {
    const { userEmail } = req.params;
    const { profileInfo, achievements, customSections } = req.body;
    let profileImageUrl = profileInfo.image; // Start with the existing image URL, if any
  
    try {
      // If a new profile image file is uploaded, upload it to Cloudinary
      if (req.file) {
        const uploadFromBuffer = () => {
          return new Promise((resolve, reject) => {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
              { folder: "profile-images" }, // Optional folder for organization
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
            streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
          });
        };
  
        // Upload the image to Cloudinary and get the URL
        const uploadResult = await uploadFromBuffer();
        profileImageUrl = uploadResult.secure_url; // Update the image URL with Cloudinary's result
      }
  
      // Find the user's showcase by email and update it
      let showcase = await Showcase.findOneAndUpdate(
        { userEmail },
        {
          profileInfo: {
            ...profileInfo,
            image: profileImageUrl, // Save the new/updated image URL
          },
          achievements,
          customSections,
        },
        { new: true, upsert: true } // Use 'upsert' to create a new doc if none exists
      );
  
      res.json(showcase);
    } catch (error) {
      res.status(500).json({ error: "Error saving showcase data" });
    }
  };

  const getPublicShowcase = async (req, res) => {
    try {
        // console.log("reached route");
        const userEmail = req.params.userEmail;
        // console.log("Fetching showcase for:", userEmail);  // Debugging log
        const showcase = await Showcase.findOne({ userEmail }).populate('achievements');
        // console.log("Showcase found:", showcase);  // Debugging log

        if (!showcase) {
            return res.status(404).json({ error: 'Showcase not found' });
        }

         // Log the populated showcase object to verify achievements data
         console.log("Populated showcase:", JSON.stringify(showcase, null, 2));
         
        res.status(200).json(showcase);
    } catch (error) {
        console.error('Error fetching showcase:', error);  // Error log
        res.status(500).json({ error: 'Server error' });
    }
};


  
  
  

module.exports = { add, view, viewById,updateAccomplishmentById,deleteFileFromAccomplishment,retrieveShowcase,updateShowcase,getPublicShowcase, deleteAccomplishment };
