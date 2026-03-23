import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";

import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Interview from "./pages/interview";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
   if ( loading) {
  return (
    <div className="h-screen bg-[#050508] flex flex-col items-center justify-center gap-5">
    
      <div className="relative h-16 w-16">
      
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        
    
        <div className="absolute inset-4 rounded-full bg-violet-500/20 blur-md animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Loading...
        </p>
       
      </div>
    </div>
  );
}
  return user ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if ( loading) {
  return (
    <div className="h-screen bg-[#050508] flex flex-col items-center justify-center gap-5">
    
      <div className="relative h-16 w-16">
      
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        
    
        <div className="absolute inset-4 rounded-full bg-violet-500/20 blur-md animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Loading...
        </p>
       
      </div>
    </div>
  );
}
  return user ? <Navigate to="/" replace /> : children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
      <Route path="/interview/:interviewId" element={<PrivateRoute><Interview/></PrivateRoute>} />
      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}