import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const Auth=async(req,res,next)=>{
    
    try {
        
        const tokens=req.cookies?.token
        if(!tokens){
             return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
        const decode=jwt.verify(tokens,process.env.JWT_SECRET)

            if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

  
       
    const user =await User.findById(decode.id).select('-password')

      if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user=user
    
    next();

    } catch (error) {
           console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
    }

}