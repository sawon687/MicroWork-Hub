"use client";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative min-h-screen flex items-center w-full justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white pt-10">
      <div className=" mx-auto text-center   ">
  <div className="absolute -top-20 left-0 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ⚡ Earn Money Completing Tasks
        </div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Complete Tasks.{" "}
          <span className="text-emerald-400">Earn Coins.</span>{" "}
          Get Paid.
        </motion.h1>

        {/* Description */}
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Join thousands of workers earning real money by completing simple micro tasks.
          Post tasks and get them done in minutes.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-emerald-400 hover:bg-emerald-500 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2">
            Start Earning →
          </button>

          <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-gray-300">
            Post a Task
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">12K+</h2>
            <p className="text-gray-400 text-sm">Active Workers</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">85K+</h2>
            <p className="text-gray-400 text-sm">Tasks Completed</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">$250K+</h2>
            <p className="text-gray-400 text-sm">Paid Out</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;