const express = require("express");
let router = express.Router();
let Place = require("../../models/Place");

router.get("/new", (req, res) => {
    res.render("places/new");
});
    
router.post("/api/places", async function (req, res) {
  let data = req.body;
  let place = new Place(data);
  await place.save();
  res.send(place);
});

router.delete("/api/places/:id", async function (){
  let place = await Place.findByIdAndDelete(req.params.id);
  if (!place) return res.status(404).send("Record Not Found");
  res.send(place);
})

router.put("/api/places/:id", async function (req, res) {
  let place = await  Place.findById(req.params.id);
  if (!place) return res.status(404).send("Record Not Found");
  console.log("api -> put ", req.body);
  place.name = req.body.name;
  place.landscape = req.body.landscape;
  place.located = req.body.located;
  await place.save();
  res.send(place);
});

router.get("/api/places/:id", async function (req, res) {
  let place = await Place.findById(req.params.id);
  res.send(place);
});

router.get("/api/places", async function (req, res) {
  let places = await Place.find();
  res.send(places);
});
  
module.exports = router;