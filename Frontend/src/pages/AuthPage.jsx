import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const switchMode = (next) => setMode(next);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">

 
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

    
      <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">

    
        <div className="flex flex-col items-center mb-8">
         
          <h1 className="text-lg text-gray-200 mt-1 font-bold">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </h1>
        </div>

  
        <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => switchMode(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize cursor-pointer
                ${mode === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {tab === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
          {mode === "login"
            ? <LoginForm onSwitch={() => switchMode("signup")} />
            : <SignupForm onSwitch={() => switchMode("login")} />
          }
        </div>

        {/* Bottom link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          {mode === "login" ? (
            <>Don't have an account?{" "}
              <button onClick={() => switchMode("signup")} className="text-violet-400 hover:text-violet-300 font-medium transition-colors cursor-pointer">
                Sign up
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                Sign in
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
};

export default AuthPage;