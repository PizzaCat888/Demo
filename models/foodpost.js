var mongoose = require("mongoose");




var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
    //use has to input date, the default is the current date
});


module.exports = mongoose.model("foodBlog", blogSchema);