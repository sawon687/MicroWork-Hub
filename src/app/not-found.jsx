"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen py-20 bg-[#0f172a] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse" />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: i * 2,
          }}
          className="absolute w-1 h-1 bg-teal-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Big 404 with Gradient Outline */}
        <div className="relative mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none"
          >
            404
          </motion.h1>

          {/* Centered Floating Compass Card */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-500/40 mb-4 mx-auto">
                <FiCompass className="text-white text-4xl animate-spin-slow" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-wide uppercase">Lost in Paradise</h3>
            </div>
          </motion.div>
        </div>

        {/* Messaging Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Oops! You've drifted <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">too far.</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg font-light leading-relaxed">
            The page you are looking for has been vanished into the digital void. 
            Let's get you back to safety.
          </p>
        </motion.div>

        {/* Premium Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-transparent text-white border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all flex items-center gap-3 active:scale-95"
          >
            <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            Go Back
          </button>

          <Link href="/">
            <button className="px-10 py-4 bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0f172a] rounded-2xl font-black shadow-[0_10px_30px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_40px_rgba(45,212,191,0.5)] hover:scale-105 transition-all flex items-center gap-3 active:scale-95">
              <FiHome className="text-xl" />
              Back to Home
            </button>
          </Link>
        </motion.div>

        {/* Minimal Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-slate-500 text-sm tracking-[0.2em] uppercase font-medium"
        >
          Microwork-hub • 2026
        </motion.p>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}