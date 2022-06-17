const jwt=require("jsonwebtoken")
module.exports= (req,res,next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjJmOGFmOTJiMzNmZDg0NmI5NGFkNGEiLCJ1c2VyRW1haWwiOiJtYXlvb2doYWsxM0BnbWFpbC5jb20iLCJpYXQiOjE2NDczMzIwMzF9.RtVhr4WoQN31bqnJ9uoKtYkAocRG2ptwP2wdgFyPxgA"
        console.log("Token:"+token);
        const decodedToken=jwt.verify(token, "secretkey");
        req.userData= { userId:decodedToken.userId,userEmail:decodedToken.userEmail};
        console.log("user id :"+req.userData.userId);
        console.log("user Email:"+req.userData.userEmail);
        next();
    } catch(error){
        res.status(401).json({message:"Auth failed"})
    }
}
    


 