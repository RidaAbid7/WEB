const express = require("express");

let server = express();


server.use(express.static("public"));

server.use(express.json());
server.set("view engine", "ejs");

let ejsLayouts = require("express-ejs-layouts");
server.use(ejsLayouts);

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

server.listen(4000, () => {
    console.log("server started listening at localhost:4000");
  });