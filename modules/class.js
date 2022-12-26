const mongo = require("mongoose");

const className = new mongo.Schema({
    class:{type:String,required:true},
    studentsCount:{type:Number,required:true}
})

module.exports = mongo.model("classes",className);