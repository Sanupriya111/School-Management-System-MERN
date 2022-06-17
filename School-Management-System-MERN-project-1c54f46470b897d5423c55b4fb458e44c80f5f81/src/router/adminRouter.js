const express=require("express");
const nodemailer=require("nodemailer")
const bcrypt=require("bcrypt")
const studentRegisterDb = require("../model/studentRegsiterDb");
const loginDb=require("../model/LoginDb")
const adminRouter=express.Router();
const checkAuth=require("../middleware/Auth")
const teacherRegisterDb=require("../model/teacherRegisterDb")
adminRouter.post("/studentRegister",(req,res)=>{
    bcrypt.hash(req.body.password,10,(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
        }
    const loginItems={
        role:"student",
        email:req.body.email,
        password:data,
    }
    loginDb.findOne({email:req.body.email}).then((logindata)=>{
        if(logindata){
            res.status(200).json('error')
        }
        else{
            const loginModel=loginDb(loginItems)
            loginModel.save().then(()=>{
                loginDb.findOne({email:loginItems.email}).then((details)=>{
                    var id=details._id;
                    const items={
                        login_id:id,
                        adm_no:req.body.adm_no,
                        name:req.body.name,
                        class:req.body.class,
                        email:req.body.email,
                        address:req.body.address,
                        password:req.body.password
                    }
                    const studentRegisterModel=studentRegisterDb(items)
          studentRegisterModel.save().then((studentData)=>{
              console.log("data saved"+studentData);
              res.send({data:studentData})
              var transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"noreplyemail120@gmail.com",
                    pass:"Jihana@123"
                }
            });
            var mailOptions ={
                from:"noreplyemail120@gmail.com",
                to:`${studentData.email}`,
                subject:"Email send to verify",
                html:`<h2 style="color:red;">Welcome to Don Public School</h2>
                <h4> Your password for your account is:${studentData.password}</h4>`
            };
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                }
                else
                {
                  console.log("email sent"+info.response);  
                }
            })
            
        })
                })
            })
        }
    })
    
})

  })

adminRouter.post("/teacherRegister",(req,res)=>{
    bcrypt.hash(req.body.password,10,(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
        }
    const loginItems={
        role:"teacher",
        email:req.body.email,
        password:data
    }
    loginDb.findOne({email:req.body.email}).then((logindata)=>{
        if(logindata){
            res.status(200).json('error')
        }
        else{
            const loginModel=loginDb(loginItems)
            loginModel.save().then(()=>{
                loginDb.findOne({email:loginItems.email}).then((details)=>{
                 var id=details._id;
                const items={
                login_id:id,
              name:req.body.name,
              joining_date:req.body.joining_date,
              mobile:req.body.mobile,
              email:req.body.email,
                address:req.body.address,
                password:req.body.password
            }
          const teacherRegisterModel=teacherRegisterDb(items)
          teacherRegisterModel.save().then((teacherData)=>{
              console.log("data saved");
              res.send({data:teacherData})
              var transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"noreplyemail120@gmail.com",
                    pass:"Jihana@123"
                }
            });
            var mailOptions ={
                from:"noreplyemail120@gmail.com",
                to:`${teacherData.email}`,
                subject:"Email send to verify",
                html:`<h2 style="color:red;">Welcome to Don Public School</h2>
                <h4>Your password for your account:${teacherData.password}</h4>`
            };
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    console.log(error);
                }
                else
                {
                  console.log("email sent"+info.response);  
                }
            })
          })
                })
            })
        }
    })
})
})
adminRouter.get("/studentList", (req, res) => {
    studentRegisterDb.find().then((dataa) => {
        console.log("back end dataaa  :" +dataa);
        res.status(200).json(dataa)
    })
})
adminRouter.get("/teacherList", (req, res) => {
    teacherRegisterDb.find().then((dataa) => {
        console.log("back end dataaa  :" +dataa);
        res.status(200).json(dataa)
    })
})
adminRouter.delete("/Tdelete/:id1",(req, res) => {
    const id = req.params.id1;
    console.log("id is "+id);
    teacherRegisterDb.findOne({_id:id}).then((deleteData)=>{
        console.log("delete data"+deleteData)
        loginDb.findByIdAndRemove(deleteData.login_id).exec();
    })
    teacherRegisterDb.findByIdAndRemove(id).exec();
    res.send("deleted")
})
adminRouter.get("/Tedit/:id",(req,res)=>{
    const id=req.params.id;
    teacherRegisterDb.findOne({_id:id}).then((editData)=>{
        res.status(200).json(editData)
    })
})
adminRouter.put("/Tupdate/:id",  (req, res) => {
    const id = req.params.id;
    const items = {
        name:req.body.name,
        joining_date:req.body.joining_date,
        mobile:req.body.mobile,
        email:req.body.email,
        address:req.body.address,
    }
    teacherRegisterDb.findByIdAndUpdate(id, items).then((data) => {
        console.log("updated " + data);
       res.status(200).json(data)
    })
   
})
adminRouter.delete("/Sdelete/:id1",(req, res) => {
    const id = req.params.id1;
    console.log("id is "+id);
   studentRegisterDb.findOne({_id:id}).then((deleteData)=>{
        console.log("delete data"+deleteData)
        loginDb.findByIdAndRemove(deleteData.login_id).exec();
    })
    studentRegisterDb.findByIdAndRemove(id).exec();
    res.send("deleted")
})
adminRouter.get("/Sedit/:id",(req,res)=>{
    const id=req.params.id;
    studentRegisterDb.findOne({_id:id}).then((editData)=>{
        res.status(200).json(editData)
    })
})
adminRouter.put("/Supdate/:id",  (req, res) => {
    const id = req.params.id;
    const items = {
        adm_no:req.body.adm_no,
        name:req.body.name,
        class:req.body.class,
        email:req.body.email,
        address:req.body.address,
    }
    studentRegisterDb.findByIdAndUpdate(id, items).then((data) => {
        console.log("updated " + data);
       res.status(200).json(data)
    })
   
})
module.exports=adminRouter