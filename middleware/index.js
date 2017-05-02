var foodBlog = require("../models/foodpost.js");
var Comment = require("../models/comment");


//middleware goes here
var middlewareObj = {};




middlewareObj.checkBlogPostOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        foodBlog.findById(req.params.id, function(err, foundFoodPost){
        if(err){
            res.redirect("/foods")
        } else {
              // does user own the campground?
              if(foundFoodPost.author.id.equals(req.user._id)){
                  //must use mongoose method of .equals as it is a string vs object
                 next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("back");
                  //sends user back to previous page
              }
        }
        
        });
    } else {
    req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

    
middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Post not found");
            res.redirect("/foods")
        } else {
              // does user own the comment?
              if(foundComment.author.id.equals(req.user._id)){
                  //must use mongoose method of .equals as it is a string vs object
                 next();
              } else {
                  req.flash("error", "You don't have permission to do that");
                  res.redirect("back");
                  //sends user back to previous page
              }
        }
        
        });
    } else {
    req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
//middleware for sessions
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    //message shows on the next message
    res.redirect("/login");
    
};







module.exports = middlewareObj;