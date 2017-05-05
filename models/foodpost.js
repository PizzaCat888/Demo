var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    created: {type: Date, default: Date.now},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    //the comments should be in array
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
    
});




module.exports = mongoose.model("foodBlog", foodSchema);