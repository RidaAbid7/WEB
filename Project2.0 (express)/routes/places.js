let express = require("express");
let router = express.Router();
let Place = require("../models/Place");

router.get("/new", (req, res) => {
  res.render("places/new");
});

router.post("/new", async (req, res) => {
  console.log("routes -> places",req.body);
  let plc = new Place(req.body);
  await plc.save();
  //return res.redirect("/places");
  return res.send(req.body);
  // res.render("places/new");
});


module.exports = router;