import { createRequire } from "module"
import { generateInterviewReport, generateResumePdf } from "../service/ai.service.js"
import { interviewReportModel } from "../models/interviewReport.model.js"

const require = createRequire(import.meta.url)
const pdfParse = require("pdf-parse")

export const interviewReport=async(req,res)=>{
    try {
          if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }
        const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
       
        const {selfDescription,jobDescription} = req.body

        const interviewReportByAi=await generateInterviewReport({
            resume:resumeContent.text,
            selfDescription,
            jobDescription

        })

        const interviewReport=await interviewReportModel.create({
            user:req.user.id,
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })
      
         res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
            
    } catch (error) {
        res.status(500).json({
            message:"Interval server error",
            error
        })
    }
}


export async function getInterviewReportById(req, res) {

   try {
     const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
   } catch (error) {
     res.status(500).json({
            message:"Interval server error",
            error
        })
   }
}

export async function getAllInterviewReports(req, res) {
   try {
     const interviewReports = await interviewReportModel.find({ user: req.user.id })
     .sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
    
   } catch (error) {
     res.status(500).json({
            message:"Intervel server error",
            error
        })
   }
}


export async function generateResumePdfController(req, res) {
  try {
      const { interviewReportId } = req.params
     
    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
  } catch (error) {
     res.status(500).json({
            message:"Intervel server error",
            error
        })
  }
}

