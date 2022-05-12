const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const app = express();
const user = require("./routes/user");

//express middleware for res body in json
app.use(express.json());

//setting the template enginee

app.set("view engine", "ejs");

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
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running and lisening to port ${port}`);
});

//creating routes

app.use("/", routes);

//submitting form

app.use("/", user);
