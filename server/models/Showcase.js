const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowcaseSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  profileInfo: {
    image: String,
    name: String,
    about: String,
    contact: String, // Ensure that 'contact' is part of the profileInfo schema
  },
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accomplishment',
    },
  ],
  customSections: [
    {
      title: String,
      content: String,
    },
  ],
});


const Showcase = mongoose.model('Showcase', ShowcaseSchema);
module.exports = Showcase;