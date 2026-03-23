import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function signUp(req,res){
   try {
     const {name,email,password}=req.body

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required",  success:false,})
    }

    if(password.length<6){
        return res.status(400).json({
            message:"Password must be at least 6 characters"
        })
    }

    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already exists",  success:false,})
    }

    const hashPassword=await bcrypt.hash(password,10)
    const user= await User.create({
        name,
        email,
        password:hashPassword
    })
    
    let token;
   if(user){
     token= jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}

    )
     res.cookie("token",token)
    await user.save()
   }
    
   

    res.status(201).json({
        message:"User created successfully",
          success:true,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }
        })
    
   } catch (error) {
    console.log("Error in signup",error)
   }
}   

export async function login(req,res){
    try {
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).json({message:"All fields are required",  success:false,})
        }
        const existingEmail=await User.findOne({email})
        if(!existingEmail){
            return res.status(404).json({message:"Incorrect Email",  success:false,})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingEmail.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password",  success:false,})
        }
        const token= jwt.sign(  
            {id:existingEmail._id,email:existingEmail.email},
            process.env.JWT_SECRET,
            {expiresIn:"1day"}
        )

        res.cookie("token",token)
        res.status(200).json({
            message:"Login successful",
              success:true,
            user:{
                id:existingEmail._id,
                name:existingEmail.name,
                email:existingEmail.email,
            }
        })

    } catch (error) {
        console.log("Error in login",error)
    }
}

export function logout(req,res){
    try {
        res.clearCookie("token")
        res.status(200).json({message:"Logout successful",  success:true,})
    } catch (error) {
        console.log("Error in logout",error)
         return res.status(500).json({
      message: "Internal server error"
    });
    }
}
 
export async function getMeController(req, res) {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        message: "User details fetched successfully",
        success:true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,

        }
    })

}

