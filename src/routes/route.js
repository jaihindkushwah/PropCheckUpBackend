const app = require("express").Router();

const {
  getAllIssuesList,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
  deleteManyIssuesByIDs,
} = require("../controller/IssueController");

app.get("/issues", getAllIssuesList);

app.get("/issues/:id", getIssueById);

app.post("/issues", createIssue);

app.put("/issues/:id", updateIssue);

app.delete("/issues/:id", deleteIssue);

app.delete("/issues", deleteManyIssuesByIDs);

module.exports = app;
