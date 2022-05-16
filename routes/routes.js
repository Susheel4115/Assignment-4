const express = require("express");
const router = express.Router();
const Model = require("../model/model");

// get method for start page

router.get("/", async (req, res) => {
  // res.status(200).json("Hello you're in homepage");
  const form = await Model.find({});

  res.render("index", { form });
  // res.send("hello");
});

router.get("/form", async (req, res) => {
  // const form = await Model.find();
  res.render("form");
});

//post
router.post("/post/form", async (req, res) => {
  // console.log(req.body);
  // const user = new Model({
  //   name: req.body.name,
  //   // email: req.body.email,
  // });
  // console.log(user);
  const newUser = req.body;
  console.log(newUser);
  await Model.create(newUser);
  res.redirect("/");
  //   try {
  //     await user.save();
  //     res.redirect("/");
  //   } catch (err) {
  //     res.send(err);
  //   }
  // });
});
//get all records from db

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find({});
    // res.json(data);
    res.send(data);
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
router.delete("/post/form/users/:id", async (req, res) => {
  // res.send("Deleted using ID");
  // try {
  //   const id = req.params.id;
  //   const data = await Model.findByIdAndDelete(id);
  //   res.redirect("/");
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  const id = req.params.id;
  console.log(id);
  await Model.findByIdAndDelete(id);
  res.redirect("/");
});

//put method

router.put("/post/form/users/:id/", async function (req, res) {
  await Model.updateOne({ _id: req.params.id }, [
    {
      $set: {
        isPromoted: { $not: "$isPromoted" },
      },
    },
  ]);
  res.redirect("/");
});

module.exports = router;
