const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");

const app = express();
//express middleware for res body in json
app.use(express.json());

//dotenv for port
dotenv.config();

// console.log(process.env.PORT);

//mongo connection

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("db connected");
});

//attaching port
app.listen(process.env.PORT, () => {
  console.log(`server is running and lisening to port ${process.env.PORT}`);
});

//creating routes

app.use("/api", routes);
