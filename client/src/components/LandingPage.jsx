import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import AuthModal from "./AuthModal";
import { login, signup } from "../services";

export default function ChatbotApp() {
  const [showModal, setShowModal] = useState(null); // 'login', 'signup', null
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating AI particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </svg>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );

  const handleAuthSubmit = async (type, formData) => {
    try {
      const values = Object.fromEntries(formData.entries());
      console.log(values);
      if (type === "login") {
        await login(values);
      } else if (type === "signup") {
        await signup(values);
      }
      navigate("/chat");
    } catch (err) {
      console.error("Authentication error:", err);
      alert("Authentication failed. Please try again.");
    }
  };
  return (
    <>
      <div className="font-sans">
        {/* Landing */}
        <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 overflow-hidden">
          <AnimatedBackground />

          <div className="relative z-10 text-center space-y-8 max-w-md w-full">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                ChatBot AI
              </h1>
              <p className="text-xl text-slate-300">
                Your intelligent conversation partner
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                label="Login"
                onClick={() => setShowModal("login")}
                variant="primary"
              />
              <Button
                label="Sign Up"
                onClick={() => setShowModal("signup")}
                variant="secondary"
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <AuthModal
            type={showModal}
            onClose={() => setShowModal(null)}
            onSubmit={handleAuthSubmit}
          />
        )}
      </div>
    </>
  );
}
