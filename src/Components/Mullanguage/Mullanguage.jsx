"use client";
import React, { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { Check } from "lucide-react";

const languages = [
  { code: "EN", label: "English" },
  { code: "BN", label: "Bengali" },
];

const Mullanguage = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl 
        bg-white/10 backdrop-blur-xl border border-white/10 
        text-emerald-400 hover:bg-white/20 transition-all duration-200"
      >
        <MdLanguage size={18} />
        <span className="font-semibold text-sm">
          {selectedLanguage.code}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 
        bg-white dark:bg-gray-900 
        rounded-2xl shadow-2xl 
        border border-gray-200 dark:border-gray-800 
        overflow-hidden animate-in fade-in zoom-in-95">
          
          <ul className="py-2">
            {languages.map((l, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelectedLanguage(l);
                  setOpen(false);
                }}
                className={`flex items-center justify-between 
                px-4 py-2 cursor-pointer text-sm
                hover:bg-emerald-50 dark:hover:bg-gray-800
                transition
                ${
                  l.code === selectedLanguage.code
                    ? "bg-gray-800 text-emerald-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="flex flex-col">
                  <span>{l.code}</span>
                  <span className="text-xs opacity-70">
                    {l.label}
                  </span>
                </div>

                {l.code === selectedLanguage.code && (
                  <Check size={16} className="text-emerald-500" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Mullanguage;