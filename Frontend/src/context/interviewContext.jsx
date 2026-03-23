import { createContext, useEffect, useState } from "react";
import { generateInterviewReport, generateResumePdf, getAllInterviewReports, getInterviewReportById } from "../services/interviewApi";
import { useParams } from "react-router-dom";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const {interviewId}=useParams();

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

           

            if (!response) throw new Error("No response from AI");

            setReport(response.interviewReport);

            return response.interviewReport;

        } catch (error) {
            console.error("Generate Report Error:", error);
        } finally {
            setLoading(false);
        }
    };

     const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

     const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()

            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReports
    }

     const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

     useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])


    return (
        <InterviewContext.Provider
            value={{
                loading,
                generateReport,
                report,
                setReport,
                reports,
                setReports,
                getReportById,
                getReports,
                getResumePdf
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};

export default InterviewContext;