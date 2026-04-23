"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from "react";

// banner
const Banner = ({slides}) => {
  const [current, setCurrent] = useState(0);
 const {data:session}=useSession()
 const role=session?.user?.role;
  // Auto Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 secand One after another
    return () => clearInterval(timer);
  }, []);
const getSecondaryLink = () => {
  if (role === 'Buyer') return '/dashboard/add-task';
  if (role === 'Worker') return '/dashboard'; 
  return '/register';
};

const getSecondaryText = () => {
  if (role === 'Buyer') return 'Post a Task';
  if (role === 'Worker') return 'My Dashboard';
  return 'Get Started';
};

const link2 = getSecondaryLink();
const text2 = getSecondaryText();
  return (
    <section className="relative min-h-screen flex items-center w-full justify-center bg-[#011612] text-white overflow-hidden pt-10">
      

      {/* Dynamic Background Glows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 z-0`}
        >
          <div className={`absolute -top-20 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full`}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full`}></div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10 text-center">
       
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-block mt-20 mb-6 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold tracking-wide">
              {slides[current].badge}
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tight">
              {slides[current].heading}
              <span className="text-emerald-400">{slides[current].highlight}</span>{" "}
              <br className="hidden md:block" />
              {slides[current].subHeading}
            </h1>

            {/* Description */}
            <p className="mt-8 text-emerald-100/60 text-lg max-w-2xl mx-auto leading-relaxed">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* buttons start */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
             <Link href={'/all-tasks'}>
               <button className="bg-background hover:bg-emerald-500 hover:scale-105 transition-all text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
            Start Earning Now →
          </button>
             </Link>
        <Link href={link2}>
          <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl text-white border border-white/10 backdrop-blur-md transition-all">
           {text2}
          </button>
        </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-10 grid  grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-emerald-500/10 pt-10">
          <div className="group">
            <h2 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">12K+</h2>
            <p className="text-emerald-100/40 text-sm uppercase tracking-widest mt-1">Active Workers</p>
          </div>
          <div className="group">
            <h2 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">85K+</h2>
            <p className="text-emerald-100/40 text-sm uppercase tracking-widest mt-1">Tasks Completed</p>
          </div>
          <div className="group">
            <h2 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">$250K+</h2>
            <p className="text-emerald-100/40 text-sm uppercase tracking-widest mt-1">Paid Out</p>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="mt-12 py-5 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === index ? "w-8 bg-emerald-400" : "w-2 bg-emerald-500/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;