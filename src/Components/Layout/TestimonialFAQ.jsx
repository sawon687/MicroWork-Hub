"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import HeadingTage from "../Ui/HeadingTage";

export default function TestimonialFAQ({testimonials,faqs}) {
  const [open, setOpen] = useState(null);

 

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 ">

      {/* Testimonials */}
      <div className="w-full mx-auto text-center mb-20">
      
        <HeadingTage firstText={'  What People '} secondText={'Say'}/>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition"
            >
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm italic mb-4">
                "{t.text}"
              </p>

              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-xs text-emerald-500">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl py-4 mx-auto">
      
        <HeadingTage firstText={'Have More'} secondText={'Questions?'}/>

        <div className="space-y-4 pt-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300   rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-gray-600 text-sm"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}