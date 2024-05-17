const express = require("express");
let server = express();


let ejsLayouts = require("express-ejs-layouts");
server.use(ejsLayouts);

const mongoose = require("mongoose");
let Place = require("./models/Place")

let placesAPIRouter = require("./routes/api/places");
server.use(placesAPIRouter);

server.use(express.static("public"));
server.use(express.json());
server.set("view engine", "ejs");
server.use(express.urlencoded());

server.use("/places", require("./routes/places"));


server.get("/", async (req, res) => {
    // res.send("HELLOOO")
    res.render("homepage");
})
server.get("/contact-us", async (req, res) => {
    res.render("contact-us");
})
server.get("/lakes", async (req, res) => {
    res.render("lakes");
})
server.get("/mountains", async (req, res) => {
  res.render("mountains");
})
server.get("/valleys", async (req, res) => {
  res.render("valleys");
})
server.get("/mosques", async (req, res) => {
  res.render("mosques");
})
server.get("/deserts", async (req, res) => {
  res.render("deserts");
})
server.get("/historical_places", async (req, res) => {
  res.render("historical_places");
})


server.listen(4000, () => {
    console.log("server started listening at localhost:4000");
  });

  mongoose.connect("mongodb+srv://ridaabid7:Ridaabid267@project1.tbva6z8.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });