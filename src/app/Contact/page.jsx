'use client'
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, Star, Users, Globe, MessageSquare, Zap } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#010c0a] text-white font-sans selection:bg-emerald-500 selection:text-white overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- 1. DYNAMIC HERO SECTION --- */}
      <section className="relative pt-40 pb-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <Zap size={14} className="fill-current" /> We respond in minutes
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              Let's Start a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Project Together
              </span>
            </h1>
            <p className="text-emerald-100/60 text-xl max-w-lg leading-relaxed mb-10">
              Apnar idea-ke reality-te rupantor korte amader team prostut. Shudu ekta message-er opekkha.
            </p>
            
            <div className="flex gap-6 items-center">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <img key={i} className="w-12 h-12 rounded-full border-4 border-[#010c0a] object-cover" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
                    ))}
                </div>
                <p className="text-sm text-emerald-100/40 font-medium">Joined by 10k+ <br/> active creators</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main Animated Image Container */}
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                    alt="Team work"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010c0a] via-transparent to-transparent" />
            </div>
            
            {/* Floating Glass Cards */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-20 shadow-2xl"
            >
                <MessageSquare className="text-emerald-400 mb-2" size={30} />
                <p className="text-xs font-bold text-emerald-400">Live Chat</p>
            </motion.div>

            <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -left-10 p-6 bg-emerald-500 rounded-3xl z-20 shadow-[0_20px_50px_rgba(16,185,129,0.3)] text-white"
            >
                <Star size={30} fill="currentColor" />
                <p className="text-xs font-black mt-2">TOP RATED</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. CONTACT & FORM SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left: Quick Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-emerald-500"></span> Contact Details
            </h3>
            
            {[
                { icon: <Phone size={20}/>, label: "Phone", val: "+880 1776079464", color: "text-blue-400" },
                { icon: <Mail size={20}/>, label: "Email", val: "islamsawon367@gmail.com", color: "text-emerald-400" },
                { icon: <MapPin size={20}/>, label: "Location", val: "Dhaka, Bangladesh", color: "text-orange-400" },
            ].map((item, i) => (
                <motion.div 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    key={i} 
                    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center gap-6 transition-all"
                >
                    <div className={`p-4 rounded-2xl bg-white/5 ${item.color}`}>
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-tighter">{item.label}</p>
                        <p className="text-lg font-medium">{item.val}</p>
                    </div>
                </motion.div>
            ))}

            <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/20">
                <h4 className="font-bold text-xl mb-2">Work with us?</h4>
                <p className="text-emerald-100/50 mb-6 text-sm">Amader team-e join korte agrohi? CV pathan career@taskflow.com-e</p>
                <button className="text-emerald-400 font-bold flex items-center gap-2 group">
                    Join the team <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </div>

          {/* Right: The Ultra-Glass Form */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="p-1 md:p-1 rounded-[3.5rem] bg-gradient-to-br from-emerald-500/20 via-white/5 to-white/5">
                <div className="bg-[#01130f] p-8 md:p-16 rounded-[3.4rem] relative overflow-hidden">
                    {/* Form Header */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-4">Send a message</h2>
                        <p className="text-white/40">Niche apnar details likhun, amra khub druto jogajog korbo.</p>
                    </div>

                    <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="absolute -top-3 left-4 px-2 bg-[#01130f] text-emerald-400 text-xs font-bold z-10">FULL NAME</label>
                                <input type="text" placeholder="e.g. Rakib Hasan" className="w-full bg-transparent border-2 border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all placeholder:text-white/10" />
                            </div>
                            <div className="group relative">
                                <label className="absolute -top-3 left-4 px-2 bg-[#01130f] text-emerald-400 text-xs font-bold z-10">EMAIL ADDRESS</label>
                                <input type="email" placeholder="rakib@example.com" className="w-full bg-transparent border-2 border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all placeholder:text-white/10" />
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="absolute -top-3 left-4 px-2 bg-[#01130f] text-emerald-400 text-xs font-bold z-10">SUBJECT</label>
                            <select className="w-full bg-transparent border-2 border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none appearance-none">
                                <option className="bg-[#01130f]">New Business Project</option>
                                <option className="bg-[#01130f]">Technical Support</option>
                                <option className="bg-[#01130f]">Partnership Inquiry</option>
                            </select>
                        </div>

                        <div className="group relative">
                            <label className="absolute -top-3 left-4 px-2 bg-[#01130f] text-emerald-400 text-xs font-bold z-10">YOUR MESSAGE</label>
                            <textarea rows="5" placeholder="Describe your project..." className="w-full bg-transparent border-2 border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-white/10" />
                        </div>

                        <button className="relative w-full group overflow-hidden bg-emerald-500 p-6 rounded-2xl font-black text-[#010c0a] text-xl tracking-widest transition-all hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)]">
                           <span className="relative z-10 flex items-center justify-center gap-4 group-hover:scale-105 transition-transform">
                             SUBMIT REQUEST <Send size={22} />
                           </span>
                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                    </form>
                </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-black/20 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg" /> TASKFLOW
            </div>
            <div className="flex gap-8 text-white/40 font-medium">
                <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            </div>
            <p className="text-white/20 text-sm italic">Designed for the future.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;