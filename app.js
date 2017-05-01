//Packages and Setup
var express          = require("express"),
    methodOverride   = require("method-override"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    flash            = require("connect-flash");
    
//Models and Schema
var foodBlog = require("./models/foodpost.js"),
    Comment = require("./models/comment.js");

    
    
//setup
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(expressSanitizer());

//Database
mongoose.connect("mongodb://localhost/food_blog");

//landing page
app.get("/", function(req, res){
    res.render("landing");
});

//define our routes in order to use properly
var foodRoutes = require("./routes/mainfood.js")


//tells app.js to use routes
app.use("/foods", foodRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});
