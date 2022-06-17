const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const registerSchema=Schema({
login_id:{type:mongoose.Schema.Types.ObjectId,ref:"SchoolLogin"},
name:String,
joining_date:String,
mobile:String,
 email:String,
  address:String,
  username:String,
  password:String,

})
const teacherRegisterDb=mongoose.model("TeacherRegister",registerSchema)
module.exports=teacherRegisterDb;