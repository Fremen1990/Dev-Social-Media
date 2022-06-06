const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/users", (req, res) => {
  res.send("Users page");
});

const port = 8800;

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend server is running on port ${port}....`);
});

//TODO 8:10 min Middleware and first request
