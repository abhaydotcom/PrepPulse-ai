import { createContext } from "react";
import API from "../services/axios";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const AuthContext=createContext(null)


export const AuthProvider=({children})=>{
  const[user,setUser]=useState(null)
  const[loading ,setLoading]=useState(true)
  const[error,setError]=useState(null)
  const fetchMe=useCallback(async()=>{
    try {
      const {data}=await API.get('/api/v1/auth/get-me')
      setUser(data.user)
    } catch  {
      setUser(null)
    }finally{
      setLoading(false)
    }
  },[])
    useEffect(() => { fetchMe(); }, [fetchMe]);

    const signup = async (formData) => {
      try {
         const { data } = await API.post("/api/v1/auth/signup", formData);
          setUser(data?.user);
          return data;
      } catch (error) {
        const msg = error?.response?.data?.message || "Signup failed. Please try again.";
        setError(msg);
        console.error(error)
       
      }
  };

  const login = async (formData) => {
    try {
      const { data } = await API.post("/api/v1/auth/login", formData);  
      setUser(data?.user);
      return data;
    } catch (error) {
      console.error(error)
      const msg = error?.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
      return error
    }
  };

  const logout = async () => {
    try {
      await API.get("api/v1/auth/logout");
     setUser(null);
    } catch (error) {
      console.error(error)
       const msg = error?.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    }
  };

  return(
    <AuthContext.Provider value={{login,signup,logout,user,loading,error,setError}} >
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext

