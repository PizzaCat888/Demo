var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");


//landing page
router.get("/", function(req, res){
    res.render("landing");
});

//======================
//Authorization Routes

router.get("/register", function(req, res){
    res.render("register");
})

//sign up logic

router.post("/register", function(req, res){
   var newUser = new User({username:req.body.username})
    User.register(newUser, req.body.password,function(err, user){
        if(err){
            console.log(err.message);
            //message is the object inside the error in mongoDB
            req.flash("error", err.message)
           return res.redirect("register")
        }
        //when user signs up, log them in and redirect
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to FoodTopia " + user.username);
            res.redirect("/foods");
        });
    });
});

//login form

router.get("/login", function(req, res){
    res.render("login");
})

//login logic
router.post("/login", passport.authenticate("local", {
    
    successRedirect:"/foods",
    failureRedirect:"/login"
}),function(req, res){
    
})

//logout logic

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});



module.exports = router;