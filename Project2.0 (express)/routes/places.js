let express = require("express");
let router = express.Router();
let Place = require("../models/Place");

router.get("/new", (req, res) => {
  res.render("places/new");
});

router.post("/new", async (req, res) => {
  console.log("routes -> places",req.body);
  if(req.body.name === ''|| req.body.landscape === '' || req.body.location === '') {
    return res.redirect("/new");
  }
  else{
    let plc = new Place(req.body);
    await plc.save();
    return res.redirect("/places");
  }
});

router.get("/delete/:id", async (req, res) => {
  let plc = await Place.findByIdAndDelete(req.params.id);
  // let places = await Place.find()
  return res.redirect("/places");
});

router.get("/edit/:id", async (req, res) => {
  let place = await Place.findById(req.params.id);
  console.log("routes -> put ", req.body);

  return res.render("places/edit", { place });
});
router.post("/edit/:id", async (req, res) => {
  let place = await Place.findById(req.params.id);
  place.name = req.body.name;
  place.address = req.body.address;
  await place.save();
  return res.redirect("/places");
});


router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All Places";
  let page = req.params.page ? req.params.page : 1;
  let pageSize = 5;
  let skip = (page - 1) * pageSize;
  let total = await Place.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let places = await Place.find().limit(pageSize).skip(skip);
  //   return res.send(places);
  return res.render("./places/list", {
    pageTitle,
    places,
    page,
    pageSize,
    total,
    totalPages,
  });
});

module.exports = router;