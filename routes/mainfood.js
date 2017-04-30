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

//new route
router.get("/new",  function(req,res){
    res.render("foods/newPost.ejs");
});

//create route
router.post("/",  function (req, res){
 
   //get data from form and add to array
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
//   var author = {
//       id: req.user._id,
//       username:req.user.username
//   };

//remember to add -> author:author in future versions
   var newFoodPost= {name: name, price:price, image: image, description: desc};
   //create a new campground and save to DB
   foodBlog.create(newFoodPost, function(err, newlyCreated){
       if(err){
           console.log(err);
       }   else {
           console.log(newlyCreated);
           //redirect back to index foods page
           res.redirect("/foods");
       }
   });
   
   });













router.get("*", function(req, res){
    res.send("Sorry, the page you are looking for does not exist");
});












module.exports = router;