const mongo = require("mongoose");

const student = new mongo.Schema({
    name:{type:String,required:true},
    classId:{type:String,required:true}
})

module.exports = mongo.model("student",student);