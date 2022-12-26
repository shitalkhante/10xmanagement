const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongo = require("mongoose");
const classes = require("./modules/class");
const student = require("./modules/student");

mongo.connect("mongodb+srv://admin:admin@cluster0.3b9lwj8.mongodb.net/?retryWrites=true&w=majority",console.log("connected to db"))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post("/POST/v1/myClass",async(req,res)=>{
    const studentsCount = req.body.studentsCount;
    const className = req.body.class; 
    await classes.create({class:className,studentsCount:studentsCount}).then(data=>{
        res.status(201).json({
            Id:data._id
        })
    }).catch(err=>{
        res.json({
            msg:err
        })
    })
})

app.post("/POST/v1/myClass/:myClassId/students",async(req,res)=>{
    const name = req.body.name;
    const classId = req.params.myClassId; 
    console.log(classId)
    await student.create({name:name,classId:classId}).then(data=>{
        res.status(201).json({
            studentId:data._id
        })
    }).catch(err=>{
        res.json({
            msg:err
        })
    })
})

app.get("/GET/v1/myClass",async(req,res)=>{
    
    await classes.find().then(data=>{
        res.status(200).json({
            data
        })
    }).catch(err=>{
        res.json({
            msg:err
        })
    })
})
app.get("/GET/v1/myClass/:myClassId",async(req,res)=>{
    
    await classes.find({_id:req.params.myClassId}).then(data=>{
        res.status(200).json({
            data
        })
    }).catch(err=>{
        res.status(404).json({
            Err:"There is no class at that id"
        })
    })
})

app.get("/GET/v1/myClass/:myClassId/students",async(req,res)=>{
    
    await student.find({classId:req.params.myClassId}).then(data=>{
        if(data.length){
            res.status(201).json({
            data
        })
        }else{
            res.status(404).json({
                Err:"There are no students at this class"
            })
        }
        
    }).catch(err=>{
        res.json({
            Err:"There are no students at this class"
        })
    })
})

app.get("/GET/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    
    await student.find({classId:req.params.myClassId,_id:req.params.studentId}).then(data=>{
        if(data.length){
            res.status(201).json({
            data
        })
        }else{
            res.status(404).json({
                Err:"There are no student of that id"
            })
        }
        
    }).catch(err=>{
        res.json({
            Err:"There are no student of that id"
        })
    })
})

app.delete("/DELETE/v1/myClass/:myClassId",async(req,res)=>{
    
    await classes.deleteOne({_id:req.params.myClassId}).then(data=>{
        res.status(204).json({
            data
        })
    }).catch(err=>{
        res.status(404).json({
            Err:"There is no class at that id"
        })
    })
})
app.delete("/DELETE/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    
    await student.deleteOne({classId:req.params.myClassId,_id:req.params.studentId}).then(data=>{
            res.status(204).json({
            data
        })
    }).catch(err=>{
        res.status(404).json({
            Err:"There are no student of that id"
        })
    })
})
app.listen(8000,console.log("server up"));