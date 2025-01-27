const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
    required: true,
  },
  impact: {
    type: String,
    required: true,
  },
  inspectionImg: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    default: "NA",
  },
  refCode1: {
    type: String,
    default: "NA",
  },
  refCode2: {
    type: String,
    default: "NA",
  },
});
const IssueTrackingModel = mongoose.model("IssueTracking", issueSchema);

module.exports = IssueTrackingModel;
