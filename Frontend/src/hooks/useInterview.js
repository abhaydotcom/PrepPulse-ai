import InterviewContext from "../context/interviewContext"
import { useContext } from "react"

export const useInterview=()=>{
    const ctx=useContext(InterviewContext)

     if (!ctx) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  return ctx;
}