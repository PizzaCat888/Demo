//Packages and Setup
var express          = require("express"),
    methodOverride   = require("method-override"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local");
    
//Models and Schema
var foodBlog = require("./models/foodpost.js"),
    Comment  = require("./models/comment.js"),
    User     = require("./models/user.js");
    
    
//general package setup
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(expressSanitizer());

//passport configuration
app.use(require("express-session")({
    secret:"foodblogdemo",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//enables flash messages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});


//Database
var url = process.env.DATABASEURL || "mongodb://Jack1:password@ds133271.mlab.com:33271/foodtopia"
mongoose.connect(url);
//by adding environment variables, we can use two databases for our deployed app and for our local app. 
//This way, we do not mix development data with our deployed app. DATABASEURL represents two variables 
//on Heroku and on our loca setup 



//define our routes in order to use properly
var foodRoutes    = require("./routes/mainfood.js"),
    commentRoutes = require("./routes/comments.js"),
    indexRoutes   = require("./routes/index.js");


//tells app.js to use routes
app.use("/foods", foodRoutes);
app.use("/",indexRoutes);
app.use("/foods/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});
