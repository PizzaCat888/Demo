var express = require("express");
var router = express.Router();
var foodBlog = require("../models/foodpost.js");


//index route
router.get("/", function(req, res) {
    foodBlog.find({}, function(err, foods){
        if(err){
            console.log(err)
        } else {
             res.render("foods/foodPost",{foods:foods});
        }
    });
   
});



router.get("*", function(req, res){
    res.send("Sorry, the page you are looking for does not exist");
});












module.exports = router;