const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const path=require("path")
const app=express();
app.use(express.json());
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );
//     next();
//   });

const adminRouter=require("./src/router/adminRouter")
const studentRouter=require("./src/router/studentRouter")
const teacherRouter=require("./src/router/teacherRouter");
const homeRouter=require("./src/router/homeRouter");
// const { application } = require("express");
// app.use("/",homeRouter)

// app.get("/",(req,res)=>{
//     res.send("hai")
// })
mongoose.connect("mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/schoolManagamentSystem?retryWrites=true&w=majority",()=>{
    console.log("Database Connected")
})
app.use(express.static(path.join(__dirname,'./build')))
app.use("/api",homeRouter)
app.use("/api/admin",adminRouter)
app.use("/api/student",studentRouter)
app.use("/api/teacher",teacherRouter)
app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./build'))
})
app.listen(process.env.PORT ||1234,()=>{
    console.log("server is listening...http://localhost:1234");
})