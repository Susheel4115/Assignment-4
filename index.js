const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const methodOverride = require("method-override");
// const { urlencoded } = require("body-parser");
const app = express();
// const user = require("./routes/user");
// const bodyParser = require("body-parser");
//express middleware for res body in json

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting the template enginee
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//dotenv for port
dotenv.config();

// console.log(process.env.PORT);

//mongo connection

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.once("connected", () => {
  console.log("db connected");
});
db.on("error", (error) => {
  console.log(error);
});

//attaching port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running and lisening to port ${port}`);
});

//creating routes

app.use("/", routes);
// app.use(express.json());
//submitting form

//bodyparser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use("/", user);
