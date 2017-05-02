var express = require("express");
var router = express.Router({mergeParams: true});
//tells express to merge params from foodpost and comments together
var foodBlog = require("../models/foodpost.js");
var Comment = require("../models/comment.js");
var middleware = require("../middleware");

//===========
//Comments Route(which needs to be nested)
//==========

router.get("/new", middleware.isLoggedIn, function(req, res){
    foodBlog.findById(req.params.id, function(err, foundFoodPost){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {food:foundFoodPost});
        }
    });
    
    
});

//comments create
router.post("/", middleware.isLoggedIn,function(req, res){
    //lookup campground by id
    foodBlog.findById(req.params.id, function(err,foundFoodPost){
        if(err){
            console.log(err);
            res.redirect("/foods");
        } else {
            //create new comment
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                console.log(err)
            } else {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save
                comment.save()
                //connect new comment to food
                foundFoodPost.comments.push(comment);
                foundFoodPost.save();
                console.log(comment);
                req.flash("success", "Successfully added comment");
                    //redirect campground show page
                res.redirect("/foods/" + foundFoodPost._id);
            }
        });
        }
     });
   
});

//edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
     res.render("comments/edit", {food_id: req.params.id, comment: foundComment});

        }
    })

});

//update comments route
router.put("/:comment_id",  middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/foods/" + req.params.id);
        }
    })
})

// Destroy route

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/foods/" + req.params.id);
        }
    });
});



module.exports = router;