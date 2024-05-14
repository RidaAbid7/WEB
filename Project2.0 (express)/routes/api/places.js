const express = require("express");
let router = express.Router();
let Place = require("../../models/Place");

router.get("/new", (req, res) => {
    res.render("new");
  });
    
router.post("/api/places", async function (req, res) {
  console.log("routes -> api -> places",req.body);
  let data = req.body;
  let place = new Place(data);
  await place.save();
  res.send(place);
});

router.get("/api/places", async function (req, res) {
  let places = await Place.find();
  res.send(places);
});
  
module.exports = router;