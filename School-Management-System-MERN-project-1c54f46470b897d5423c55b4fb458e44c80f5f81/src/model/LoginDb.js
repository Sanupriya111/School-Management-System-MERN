const mongoose=require("mongoose")
const schema=new mongoose.Schema({
    email:String,
    password:String,
    role:String,
    resetToken:String,
    expireToken:String
})
const loginDb=mongoose.model("SchoolLogin",schema)
module.exports=loginDb;