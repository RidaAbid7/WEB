//npm i express
//run it from same folder in which you are building your server
// npm i -g nodemon
//run above command once in lifetime.

const express = require("express");
const mongoose = require("mongoose");
let server = express();
let Student = require("./models/Students");
server.use(express.json());
server.set("view engine", "ejs");

let ejsLayouts = require("express-ejs-layouts");
server.use(ejsLayouts);

server.use(express.static("public"));

let studentsAPIRouter = require("./routes/api/students");
server.use(studentsAPIRouter);

server.get("/contact-us", async (req, res) => {
  res.render("contact-us");
});

server.get("/", async (req, res) => {
  res.render("homepage");
});

server.listen(4000, () => {
  console.log("server started listening at localhost:4000");
});
mongoose
  .connect("mongodb+srv://ridaabid7:Ridaabid267@project1.tbva6z8.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });