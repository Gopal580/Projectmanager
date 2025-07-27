const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    enum: [
      "Mockups",
      "Proposals",
      "Presentations",
      "Credentials",
      "RFP",
      "AI Work",
      "Creative Work"
    ],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  client: {
    type: String,
    required: true,
    trim: true,
  },
  dateReceived: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      "New",
      "Sent to CEO",
      "Approved by Client",
      "Invoice Raised"
    ],
    default: "New"
  },
}, { timestamps: true }); 

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
