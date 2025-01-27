const { data } = require("./utils/dummyData");
const IssueTrackingModel = require("./models/IssueTrackingModel");
const { connectDB } = require("./db");
const insertData = async () => {
  try {
    await connectDB();
    await IssueTrackingModel.insertMany(data);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

insertData();
