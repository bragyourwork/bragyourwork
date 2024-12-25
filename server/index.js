const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User")
const authRoutes = require("./routes/auth");
const accompRoutes = require("./routes/accomplishments");
const showcaseRoutes = require("./routes/myshowcase");

const app = express();
const port = 4000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

try{
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connection successful");
}catch(error){
    console.log(error);
}

app.get("/",(req,res) =>{
    res.send("Server is running");
} );

app.use("/auth",authRoutes);    
app.use("/accomplishments",accompRoutes);

app.use("/showcase",showcaseRoutes);

app.get("/profile/:email", async (req, res) => {
    try {
      const user = await User.findOne({ userEmail: req.params.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user); // Send the user data as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

app.listen(port,() =>{
    console.log(`Server running on port ${port}`);
})