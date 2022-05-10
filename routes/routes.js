const express = require("express");
const router = express.Router();
const Model = require("../model/model");

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

//get all methods from api

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
router.get("/getOne/:id", (req, res) => {
  res.send("getting a particular record based on id");
  //   res.send(req.params.id);
});

//update an ID using patch

router.patch("/update/:id", (req, res) => {
  res.send("updated using ID");
});

//delete a ID using delete
router.delete("/delete/:id", (req, res) => {
  res.send("Deleted using ID");
});
module.exports = router;
