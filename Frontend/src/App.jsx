import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";

import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Interview from "./pages/interview";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="font-semibold text-2xl"></div>;
  return user ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"></div>;
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