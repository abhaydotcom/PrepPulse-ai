import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading,setLoading]=useState(false)
  const { login,error} = useAuth();
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       await login(formData);
    } catch (error) {
        console.log(error?.response)    
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       {error && (
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
        </div>
        )}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl pl-10 pr-10 py-2.5 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl py-2.5 mt-2 transition-all duration-200 shadow-lg shadow-violet-500/20 cursor-pointer"
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
          : <>Sign In <ArrowRight className="w-4 h-4" /></>
        }
      </button>
    </form>
  );
};

export default LoginForm;