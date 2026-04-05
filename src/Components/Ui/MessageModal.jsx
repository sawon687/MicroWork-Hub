"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Coins } from "lucide-react";

const MessageModal = ({
  isOpen,
  onClose,
  message,
  type = "error", // success | error | coin
  duration = 8000,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const getStyle = () => {
    if (type === "success")
      return {
        icon: <CheckCircle className="w-14 h-14 text-white" />,
        bg: "from-emerald-400 to-emerald-600",
        btn: "bg-emerald-500 hover:bg-emerald-600",
        title: "Success 🎉",
      };
    if (type === "coin")
      return {
        icon: <Coins className="w-14 h-14 text-white" />,
        bg: "from-yellow-400 to-amber-500",
        btn: "bg-amber-500 hover:bg-amber-600",
        title: "Coins Updated 💰",
      };
    return {
      icon: <AlertCircle className="w-14 h-14 text-white" />,
      bg: "from-red-400 to-red-600",
      btn: "bg-red-500 hover:bg-red-600",
      title: "Something went wrong ❌",
    };
  };

  const style = getStyle();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 80 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative w-[90%] max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Top Gradient Section */}
            <div
              className={`bg-gradient-to-r ${style.bg} p-6 flex justify-center`}
            >
              {style.icon}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {style.title}
              </h2>

              <p className="text-gray-600 text-sm mb-5">{message}</p>

              <button
                onClick={onClose}
                className={`w-full py-2.5 rounded-xl text-white font-semibold transition-all duration-200 ${style.btn} active:scale-95`}
              >
                Got it 👍
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;