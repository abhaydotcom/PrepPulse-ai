import "dotenv/config"
import express from "express"
import connectDB from "./src/config/database.js"
import authRouter from "./src/routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import interviewRouter from "./src/routes/interview.routes.js"


const app=express()
const PORT=process.env.PORT || 5000



app.get("/",(req,res)=>{
    res.send("Hello , This side abhay here , I'm happy to say that server is working fine") 
})
app.use(cors({
     origin: [
        "http://localhost:5173",
        "https://preppulseai.vercel.app"
    ],
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",authRouter)
app.use("/api/interview",interviewRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})