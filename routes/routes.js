const express = require("express");
const router = express.Router();
const Model = require("../model/model");

//get method for start page

// router.get("/", async (req, res) => {
//   // res.status(200).json("Hello you're in homepage");
//   const form = await Model.find({});

//   res.render("index", { form });
//   // res.send(form);
// });

// router.get("/form", async (req, res) => {
//   const form = await Model.find();
//   res.render("form", { form });
// });

// //post
// router.post("/form", (req, res) => {
//   // const data = res.body;
//   // console.log(data);
//   console.log(req.body);
//   try {
//     // const dataToSave = await data.save();
//     // res.status(200).json(dataToSave);
//     res.redirect("/");
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
//   //   res.send("Post method");
// });

// //get all records from db

// router.get("/getAll", async (req, res) => {
//   try {
//     const data = await Model.find();
//     // res.json(data);
//     res.send("hello");
//     return;
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     return;
//   }
//   //   res.send("getting all records to Api call");
// });

// //get record by ID
// router.get("/getOne/:id", async (req, res) => {
//   // res.send("getting a particular record based on id");
//   //   res.send(req.params.id);
//   try {
//     const data = await Model.findOne(req.param.id);
//     console.log(data);
//     res.status(200).json(data);
//     // res.send({ message: res.json(data) });
//     return;
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     return;
//   }
// });

// //update an ID using patch

// router.patch("/update/:id", async (req, res) => {
//   // res.send("updated using ID");
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };
//     const result = await Model.findByIdAndUpdate(id, updatedData, options);
//     console.log(result);
//     res.send(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //delete a ID using delete
// router.delete("/delete/:id", async (req, res) => {
//   // res.send("Deleted using ID");
//   try {
//     const id = req.params.id;
//     const data = await Model.findByIdAndDelete(id);
//     res.send(`${data.name}- this guy has been kicked off from DB`);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //put method

// router.put("/user/:id", async (req, res) => {
//   try {
//     res.send("in the put method");
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

//get method

router.get("/", async (req, res) => {
  const users = await Model.find({});
  res.render("index.ejs", { users });
});

//get method for form

router.get("/forms", (req, res) => {
  res.render("form.ejs");
});

router.post("/form", async (req, res) => {
  const data = res.body;
  console.log(data);

  try {
    const dataToSave = await data.save();
    // res.status(200).json(dataToSave);
    res.render("index", { dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  //   res.send("Post method");
});
module.exports = router;
