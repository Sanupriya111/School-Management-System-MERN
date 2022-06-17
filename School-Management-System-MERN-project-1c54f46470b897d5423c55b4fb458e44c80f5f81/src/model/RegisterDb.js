const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const registerSchema=Schema({
    login_id:{type:mongoose.Schema.Types.ObjectId,ref:"SchoolLogin"},
    name:String,
    email:String,
    // gender:String,
    // age:String,
    mobile:String,
    // role:String,
    // address:String,
})
const registerDb=mongoose.model("schoolRegister",registerSchema)
module.exports=registerDb;