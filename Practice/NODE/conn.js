const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  // Your route handler code
});


mongoose
.connect("mongodb+srv://ridaabid7:Ridaabid267@project1.tbva6z8.mongodb.net/")
.then(() => {
      app.listen(4000, () => {
        console.log("Node API running");
      });
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });




// const { default: mongoose } = require("mongoose");
// const mongo = require("mongoose");
// const prodschema = mongo.Schema(
//     {
//         name: {
//             type: String,
//             required: [true, "Please enter your name"]
//         },
//         quantity: {
//             type: Number,
//             required: [true,"Please enter the quantity"],
//             default:0
//         },
//         email: {
//             type: String,
//             required: [true,"Please enter your email"]
//         },
//     },
//     {
//         timestamps: true
//     }
// )
// const product = mongoose.model("Product",prodschema)
// module.exports = product