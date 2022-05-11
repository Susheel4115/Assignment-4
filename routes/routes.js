const { name } = require("ejs");
const express = require("express");
const router = express.Router();
const Model = require("../model/model");

//get method for start page

router.get("/", (req, res) => {
  // res.status(200).json("Hello you're in homepage");
  res.render("index", {});
});

router.get("/form", function (req, res) {
  // var mascots = [
  //   { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
  //   { name: "Tux", organization: "Linux", birth_year: 1996 },
  //   { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  // ];
  // var tagline =
  //   "No programming concept is complete without a cute animal mascot.";

  res.render("form", {
    name: "Susheel",
  });
});
//post
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
    return;
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  //   res.send("Post method");
});

//get all records from db

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
  //   res.send("getting all records to Api call");
});

//get record by ID
router.get("/getOne/:id", async (req, res) => {
  // res.send("getting a particular record based on id");
  //   res.send(req.params.id);
  try {
    const data = await Model.findOne(req.param.id);
    console.log(data);
    res.status(200).json(data);
    // res.send({ message: res.json(data) });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
});

//update an ID using patch

router.patch("/update/:id", async (req, res) => {
  // res.send("updated using ID");
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete a ID using delete
router.delete("/delete/:id", async (req, res) => {
  // res.send("Deleted using ID");
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`${data.name}- this guy has been kicked off from DB`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//put method

router.put("/user/:id", async (req, res) => {
  try {
    res.send("in the put method");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
