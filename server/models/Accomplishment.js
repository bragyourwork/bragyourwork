    const mongoose = require("mongoose");

    const AccomplishmentSchema = mongoose.Schema({
        userId: String,
        userEmail:{
            type: String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            required:true,
        },
        file:{
            type:String,
            required:true,
        },
        files:{
            type:[String],
            required:false,
        },
        tags:{
            type:[String],
            required:true,
        },
    });

    module.exports = mongoose.model("Accomplishment",AccomplishmentSchema);