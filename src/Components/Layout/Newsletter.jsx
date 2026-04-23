import React from 'react';
import { Send, ShieldCheck, Sparkles } from 'lucide-react';
import { FadeUp } from '../../Components/MotionContorleAni/AboutAnimation';

const Newsletter = () => {
  return (
    <section className="py-24  relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[300px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6">
        <FadeUp>
          <div className="max-w-5xl mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-md relative overflow-hidden">
            
            {/* Design Element: Floating Icon */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-emerald-500/10 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 border border-emerald-500/20 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <Sparkles size={12} /> Stay Ahead of the Curve
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
                  Get the latest <span className="text-emerald-500 italic">Insights</span> delivered.
                </h2>
                <p className="text-white/50 text-lg font-medium leading-relaxed mb-8">
                  Subscribe to our newsletter and receive curated engineering guides, tech trends, and exclusive community updates directly in your inbox.
                </p>
                
                <div className="flex items-center gap-4 text-white/30 text-xs font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> No Spam, Ever</span>
                    <span className="h-4 w-[1px] bg-white/10" />
                    <span>Weekly Updates</span>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="relative">
                <form className="relative flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-emerald-500 text-[#011612] px-8 py-5 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
                  >
                    SUBSCRIBE <Send size={16} />
                  </button>
                </form>
                
                <p className="text-[10px] text-white/20 mt-4 text-center sm:text-left font-medium uppercase tracking-widest">
                    By subscribing, you agree to our <span className="text-white/40 underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>

            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Newsletter;