const mongoose=require("mongoose")
const schema=new mongoose.Schema({
   login_idd:{type:mongoose.Schema.Types.ObjectId,ref:"studentRegister"},
   adm_no:String,
   english:String,
   maths:String,
   computerscience:String,
   malayalam:String
})
const markDb=mongoose.model("studentMark",schema)
module.exports=markDb;