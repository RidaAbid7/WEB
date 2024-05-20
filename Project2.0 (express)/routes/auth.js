let express = require("express");
let router = express.Router();
let User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = "YourJWTSecretKey"; 

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register", async (req, res) => {
    console.log("register form body: ", req.body);
    //Validation checks
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("Validation error: One or more fields are empty.");
        return res.redirect("/register");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("Validation error: Invalid email format.");
        return res.redirect("/register");
    }

    try {
        let user = new User(req.body);
        await user.save();
        res.redirect("/login");
    } catch (error) {
        console.log("Error saving user:", error);
    }
});


router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.redirect("/register");
    if (user.password != req.body.password) return res.redirect("/login");
    
    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    req.session.user = user;
    return res.redirect("/");
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    });
});

module.exports = router;
