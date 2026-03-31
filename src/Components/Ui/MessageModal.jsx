"use client";
import React, { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const MessageModal = ({ isOpen, onClose, title, message, autoClose = true, duration = 6000 }) => {
  // Auto close effect
  useEffect(() => {
    if (!isOpen || !autoClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  const isSuccess = title === "success"?true:false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-scaleIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <div className="bg-green-100 p-3 rounded-full">
             <CheckCircle className="text-emerald-500-600" size={40} />
            </div>
          ) : (
            <div className="bg-red-100 p-3 rounded-full">
              <X className="text-red-600" size={40} />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-2 rounded-lg font-medium transition ${
            isSuccess
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          OK
        </button>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageModal;