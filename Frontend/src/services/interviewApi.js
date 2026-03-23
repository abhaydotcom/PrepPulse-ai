import API from "./axios"

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

   try {
     const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await API.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
    
   } catch (error) {
    console.error(error)
   }

}

export const getInterviewReportById = async (interviewId) => {
  try {
      const response = await API.get(`/api/interview/report/${interviewId}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllInterviewReports = async () => {
   try {
     const response = await API.get("/api/interview/")

    return response.data
   } catch (error) {
    console.error(error)
   }
}

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await API.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}