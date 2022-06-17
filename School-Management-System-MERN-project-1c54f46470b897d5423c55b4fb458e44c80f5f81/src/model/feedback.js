const mongoose=require("mongoose")
const schema=new mongoose.Schema({
  feedback:String
})
const feedbackDb=mongoose.model("Feedback",schema)
module.exports=feedbackDb;