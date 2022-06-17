const express=require("express");
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")
const cookieparser=require("cookie-parser")
const registerDb=require("../model/RegisterDb")
const loginDb=require("../model/LoginDb")
const jwt=require("jsonwebtoken");
const checkAuth=require("../middleware/Auth")
const {OAuth2Client} =require("google-auth-library")
const studentRegisterDb = require("../model/studentRegsiterDb");
const homeRouter=express.Router();
const client=new OAuth2Client("512365035902-42njki7eco46tugvrld45k9ujhnminjg.apps.googleusercontent.com")

homeRouter.post("/",(req,res)=>{
    bcrypt.hash(req.body.password,10,(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
        }
        const loginItems={
            email:req.body.email,
            password:data,
            role:"admin",
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
                        const registerDetails={
                            login_id:id,
                            name:req.body.name,
                            email:req.body.email,
                            mobile:req.body.mobile,
                            // role:req.body.role,
                        }
                        const registerModel=registerDb(registerDetails)
            registerModel.save().then(RegisterData=>{
                console.log("register data is :"+RegisterData);
                res.send({Details:RegisterData})
                
            })
                    })
                })
            }
        })
      
    })
  
})

homeRouter.post("/login",(req,res)=>{
    console.log("details:"+req.body.email)
    loginDb.findOne({email:req.body.email}).then((datas)=>{
        console.log("login details"+datas);
        if(!datas){
           res.json({message:"user not found"});
        }
        else{
           
          bcrypt.compare(req.body.password,datas.password).then((data)=>{
              if(!data){
                  res.json({error:"password incorrect"})
              }
              else{
                var token=jwt.sign({userId:datas._id,userEmail:datas.email},"secretkey")
                res.json({message:"user found",dataaa:datas,token:token});
              }
          })
            
        }
    })
})
homeRouter.post("/google-login",(req,res)=>{
     const {tokenId}=req.body;
     client.verifyIdToken({idToken:tokenId,audience:"512365035902-42njki7eco46tugvrld45k9ujhnminjg.apps.googleusercontent.com" }).then((response)=>{
        const {email_verified,name,email}=response.payload;
        console.log("detailssss"+JSON.stringify(response.payload.email));
           loginDb.findOne({email:response.payload.email}).then((data)=>{
               console.log("google login "+data);
               if(data){
                var token=jwt.sign({userId:data._id,userEmail:data.email},"secretkey")
                res.status(200).json({details:data,token:token})
               }
             else{
                 res.status(200).json("no-user")
             }
           })
     })
})
homeRouter.post("/reset-password",(req,res)=>{
    console.log("email isss"+req.body.email)
   loginDb.findOne({email:req.body.email}).then((user)=>{
       console.log("details isss"+user);
       if(!user){
           res.json({message:"no user found"})
       }
       else{
        const token = user._id;
        user. resetToken =token,
        user. expireToken = Date.now() + 3600000
        user.save().then((result)=>{
            console.log("data iss"+result)
            var transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"jihanagafoor65@gmail.com",
                    pass:"Jihana@123"
                }
            });
            var mailOptions ={
                from:"jihanagafoor65@gmail.com",
                to:`${user.email}`,
                subject:"Forgot Password",
                text:"hai",
                // html:` <p>You requested for password reset</p>
                // <h5>click in this <a href="http://localhost:3000/newPassword/${token}">link</a> to reset password</h5>
                // `
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

    }
    })
   
})
homeRouter.post("/confirmPassword/:token",(req,res)=>{
    bcrypt.hash(req.body.password,10,(error,data)=>{
        const newPassword=data
        const token=req.params.token;
        console.log("token :"+token);
        loginDb.findOne({resetToken:token}).then((newData)=>{
            console.log("newdata"+newData);
            newData.password=newPassword
           newData.save().then((newsavedData)=>{
               console.log("new Password"+newsavedData);
               res.status(200).json(newsavedData)
           })
    
        })
    })
   

})
homeRouter.get("/userData",checkAuth,(req,res)=>{
const userEmail=req.userData.userEmail;
 console.log("user is "+userEmail);
 res.status(200).json(userEmail)
})
module.exports=homeRouter;