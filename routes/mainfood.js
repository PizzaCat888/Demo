var express = require("express");
var router = express.Router();
var foodBlog = require("../models/foodpost.js");
var middleware = require("../middleware");

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
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("foods/newPost.ejs");
});

//create route
router.post("/",middleware.isLoggedIn, function (req, res){
 
   //get data from form and add to array
   var name =  req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc =  req.body.description;
   var author = {
      id: req.user._id,
      username:req.user.username
  };


   var newFoodPost= {name: name, price:price, image: image, description: desc, author: author};
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


//show route
router.get("/:id", function(req, res){
    //find the campground with provided ID, using new method with Mongo
    foodBlog.findById(req.params.id).populate("comments").exec(function(err, foundFoodPost){
        if(err){
            console.log(err)
        } else {
            console.log(foundFoodPost);
            //render show template with that ID
    res.render("foods/show", {food: foundFoodPost});
        }
    });
   
});

//edit route
router.get("/:id/edit", middleware.checkBlogPostOwnership, function(req, res) {
    foodBlog.findById(req.params.id, function(err, foundFoodPost){
        res.render("foods/edit", {food: foundFoodPost});
    });
});

//update route
router.put("/:id",  middleware.checkBlogPostOwnership,function(req, res){
    //find and update the correct campground
    
    foodBlog.findByIdAndUpdate(req.params.id, req.body.food, function(err, updatedFoodPost){
        if(err){
            res.redirect("/foods");
        } else {
           res.redirect("/foods/" + req.params.id); 
        }
    })
   
})

//destroy route
router.delete("/:id",  middleware.checkBlogPostOwnership,  function(req, res){
    foodBlog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/foods");
        } else {
            res.redirect("/foods");
        }
    });
});





// router.get("*", function(req, res){
//     res.send("Sorry, the page you are looking for does not exist");
// });












module.exports = router;