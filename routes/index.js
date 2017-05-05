var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var foodBlog = require("../models/foodpost.js");
var User     = require("../models/user.js");


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
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      req.flash("error", "Oops! Something Went Wrong! Please Enter Your Login Information Correctly Or Register for a New Account")
      res.redirect("/login")
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      req.flash("success", "Welcome Back To FoodTopia " + user.username)
      return res.redirect("/foods")
      
    });      
  })(req, res, next);
});


//logout logic

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/foods");
});



module.exports = router;