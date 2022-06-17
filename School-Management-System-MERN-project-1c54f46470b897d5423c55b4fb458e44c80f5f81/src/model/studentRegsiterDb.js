const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const registerSchema=Schema({
  login_id:{type:mongoose.Schema.Types.ObjectId,ref:"SchoolLogin"},
  adm_no:String,
  name:String,
  class:String,
  email:String,
  address:String,
  username:String,
  password:String,
  token:String

})
const studentRegisterDb=mongoose.model("studentRegister",registerSchema)
module.exports=studentRegisterDb;