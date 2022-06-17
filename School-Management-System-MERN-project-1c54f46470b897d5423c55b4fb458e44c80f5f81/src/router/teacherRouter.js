const express=require("express");
const verifyToken=require("../middleware/Auth")
const loginDb = require("../model/LoginDb");
const markDb = require("../model/markDb");
const registerDb = require("../model/RegisterDb");
const studentRegisterDb = require("../model/studentRegsiterDb");
const teacherRouter=express.Router();
teacherRouter.get("/view",(req,res)=>{
    studentRegisterDb.find().then((studentData)=>{
        console.log(studentData);
        res.status(200).json(studentData)

    })
})
teacherRouter.post("/markadd",(req,res)=>{
    studentRegisterDb.findOne({adm_no:req.body.adm_no}).then((details)=>{
        const items={
            login_idd:details.login_id,
            adm_no:req.body.adm_no,
              english:req.body.english,
            maths:req.body.maths,
            computerscience:req.body.computerscience,
            malayalam:req.body.maths
        }
        markDb.findOne({adm_no:req.body.adm_no}).then((data)=>{
            if(data){
                res.status(200).json("error")
            }
            else{
                const markModel=markDb(items)
                markModel.save().then((data)=>{
                    console.log("mark data:"+data);
                    res.status(200).json(data)
                })
            }
        })
      
    })
    })
   
teacherRouter.get("/marklist",(req,res)=>{
    markDb.find().then((marks=>{
        studentRegisterDb.find().then((studentDetails)=>{
            res.status(200).json({Stdmark:marks,details:studentDetails})
        })
      
    }))
})
teacherRouter.delete("/delete/:id1",(req, res) => {
    const id = req.params.id1;
    console.log("id is "+id);
    markDb.findOne({_id:id}).then((deleteData)=>{
        console.log("delete data"+deleteData)
    })
    markDb.findByIdAndRemove(id).exec();
    res.send("deleted")
})
teacherRouter.get("/edit/:id",(req,res)=>{
    const id=req.params.id;
    markDb.findOne({_id:id}).then((editData)=>{
        res.status(200).json(editData)
    })
})
teacherRouter.put("/update/:id",  (req, res) => {
    const id = req.params.id;
    const items = {
        adm_no:req.body.adm_no,
        english:req.body.english,
      maths:req.body.maths,
      computerscience:req.body.computerscience,
      malayalam:req.body.maths
    }
   markDb.findByIdAndUpdate(id, items).then((data) => {
        console.log("updated " + data);
       res.status(200).json(data)
    })
   
})
module.exports=teacherRouter