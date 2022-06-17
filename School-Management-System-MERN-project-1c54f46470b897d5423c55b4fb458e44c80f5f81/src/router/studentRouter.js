const express=require("express")
const feedbackDb = require("../model/feedback")
const loginDb = require("../model/LoginDb")
const markDb = require("../model/markDb")
const check=require("../middleware/Auth")
const studentRegisterDb = require("../model/studentRegsiterDb")
const studentRouter=express.Router()
studentRouter.get("/markview",check,(req,res)=>{
 let userId=req.userData.userId;
 console.log("user id :"+userId);
 markDb.findOne({login_idd:userId}).then((data)=>{
     console.log("dataa"+data);
     if(!data){
         res.status(200).json({error:"no mark found"})
     }
     else{
        res.status(200).json(data)
     }
   
 })
//  res.status(200).json(userId)
})
studentRouter.post("/feedbackadd",(req,res)=>{
    const items={
        feedback:req.body.feedback
    }
    const feedbackModel=feedbackDb(items)
   feedbackModel.save().then((data)=>{
        res.status(200).json(data)
    })
})
studentRouter.get("/feedbackview",(req,res)=>{
    feedbackDb.find().then((data)=>{
        res.status(200).json(data)
    })
})
studentRouter.get("/progresscard/:id",(req,res)=>{
    console.log("id issssssss"+req.params.id)
  const id =req.params.id;
//   console.log("data type"+typeof idd );
//   studentRegisterDb.aggregate([
//       {
//         $lookup:
//         {
//               from:"studentmarks",
//               localField:"login_id",
//               foreignField:"login_idd",
//               as:"newFieldNew"
//         }
//       },
//       {
//           $match :
//                      { 
//                          login_id : id
//                      }
//     }
// ]
// )
studentRegisterDb.findOne({login_id:id})
.then((progresscard)=>{
    console.log("progress card"+progresscard);
    markDb.findOne({login_idd:id}).then((markDetails)=>{
        res.status(200).json({studentData:progresscard,markDetails:markDetails})
    })
         
      })
})
module.exports=studentRouter