const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const issueRouter = require("./routes/route");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1", issueRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
