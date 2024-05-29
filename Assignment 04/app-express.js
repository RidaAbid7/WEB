const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");


app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use(express.static("public"));
app.set("view engine", "ejs");

const placesAPIRouter = require("./routes/api/places");
app.use(placesAPIRouter);

app.use("/places", require("./routes/places"));

app.get("/", (req, res) => {
  res.render("homepage");
});
app.get("/contact-us", async (req, res) => {
  res.render("contact-us");
})
app.post('/contact-us', (req, res) => {
  res.redirect("contact-us")
});
app.get("/lakes", async (req, res) => {
  res.render("lakes");
})
app.get("/mountains", async (req, res) => {
res.render("mountains");
})
app.get("/valleys", async (req, res) => {
res.render("valleys");
})
app.get("/mosques", async (req, res) => {
res.render("mosques");
})
app.get("/deserts", async (req, res) => {
res.render("deserts");
})
app.get("/historical_places", async (req, res) => {
res.render("historical_places");
})

app.listen(4000, () => {
  console.log("app started listening at localhost:4000");
});

mongoose.connect("mongodb+srv://ridaabid7:Ridaabid267@project1.tbva6z8.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });
