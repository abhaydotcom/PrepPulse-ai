import express from "express"
import{ Auth} from "../middleware/auth.middleware.js"
import upload from "../middleware/file.middleware.js";
import { generateResumePdfController, getAllInterviewReports,  getInterviewReportById,  interviewReport } from "../controllers/interview.controller.js";
const router=express.Router();

router.post("/",Auth,upload.single("resume"),interviewReport)
router.get("/report/:interviewId",Auth,getInterviewReportById)
router.get("/",Auth,getAllInterviewReports)
router.post("/resume/pdf/:interviewReportId",Auth,generateResumePdfController)
export default router