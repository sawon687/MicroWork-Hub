"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    // Background set to #011612 to match your Banner component
    <div className="min-h-screen py-10 bg-[#011612] flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Background Glows - Matching your Banner's Emerald Glow */}
      <div className="absolute -top-20 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated Warning Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
        >
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Access <span className="text-red-500">Denied</span>
          </h1>
          <p className="text-emerald-100/60 text-lg mb-10 leading-relaxed font-medium">
            Sorry, you don't have permission to view this page. This area is restricted to specific user roles.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary Action - Green/Emerald */}
          <Link href="/">
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-gray-200 px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
              <Home size={20} strokeWidth={2.5} />
              Back to Home
            </button>
          </Link>
          
          {/* Secondary Action - Ghost Button */}
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all backdrop-blur-md"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-emerald-100/20 text-xs uppercase tracking-[3px] font-bold"
        >
          System Restriction Level 4
        </motion.p>




         <div className="mt-16 py-3 px-6 bg-red-500/5 border border-red-500/10 rounded-full inline-flex items-center gap-3">
          <ShieldAlert className="text-red-500 w-4 h-4" />
          <span className="text-red-200/40 text-xs font-medium uppercase tracking-[2px]">
            Security Alert: Restricted Area
          </span>
        </div>
      
      </div>
    </div>
  );
};

export default UnauthorizedPage;