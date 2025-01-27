const IssueTrackingModel = require("../models/IssueTrackingModel");
const getAllIssuesList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 1000;
    const issues = await IssueTrackingModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (issues.length === 0) {
      return res.status(200).json({ message: "No issues found", data: [] });
    }
    const issuesWithId = issues.map((issue, index) => ({
      ...issue._doc,
      id: index + 1,
    }));

    res.status(200).json({
      message: "Issues retrieved successfully",
      currentPage: page,
      pageSize: limit,
      data: issuesWithId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await IssueTrackingModel.findById(req.params.id);
    if (!issue) {
      return res
        .status(404)
        .json({ message: `Issue with ID ${req.params.id} not found` });
    }
    res
      .status(200)
      .json({ message: "Issue retrieved successfully", data: issue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const createIssue = async (req, res) => {
  try {
    const {
      room,
      type,
      subType,
      observation,
      impact,
      inspectionImg,
      remarks,
      refCode1,
      refCode2,
    } = req.body;

    // Validation
    if (!room || !type || !observation || !impact) {
      return res
        .status(400)
        .json({ message: "Room, type, observation, and impact are required" });
    }

    const newIssue = await IssueTrackingModel.create({
      room,
      type,
      subType,
      observation,
      impact,
      inspectionImg,
      remarks,
      refCode1,
      refCode2,
    });
    res
      .status(201)
      .json({ message: "Issue created successfully", data: newIssue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updateIssue = async (req, res) => {
  try {
    const updatedIssue = await IssueTrackingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: `Issue with ID ${req.params.id} updated successfully`,
      data: updatedIssue,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const deleteIssue = async (req, res) => {
  try {
    const deletedIssue = await IssueTrackingModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({
      message: `Issue with ID ${req.params.id} deleted successfully`,
      data: deletedIssue,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const deleteManyIssuesByIDs = async (req, res) => {
  try {
    // console.log(req.body.ids);
    const deletedIssues = await IssueTrackingModel.deleteMany({
      _id: { $in: req.body.ids },
    });
    res.status(200).json({
      message: `Issues with IDs   deleted successfully`,
      data: deletedIssues,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  getAllIssuesList,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
  deleteManyIssuesByIDs,
};
