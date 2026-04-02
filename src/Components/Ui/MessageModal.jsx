"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const MessageModal = ({
  isOpen,
  onClose,
  message,
  type = "error", // success | error
  duration = 3000,
}) => {

  // ⏱ auto close
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 text-center relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              {isSuccess ? (
                <CheckCircle className="text-green-500 w-12 h-12" />
              ) : (
                <AlertCircle className="text-red-500 w-12 h-12" />
              )}
            </div>

            {/* Message */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {isSuccess ? "Success" : "Error"}
            </h2>

            <p className="text-gray-600 text-sm">{message}</p>

            {/* Button */}
            <button
              onClick={onClose}
              className={`mt-5 w-full py-2 rounded-xl text-white font-medium ${
                isSuccess
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;