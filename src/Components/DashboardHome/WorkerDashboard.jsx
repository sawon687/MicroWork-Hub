'use client';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, Send, Clock, Banknote, 
  ChevronRight, ArrowUpRight, TrendingUp, Sparkles,
  Loader2, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const WorkerDashboard = () => {
  const { data: session } = useSession();

  // ওয়ার্কারের ব্যক্তিগত স্ট্যাটাস ফেচ করা
  const { data: stats, isLoading } = useQuery({
    queryKey: ['worker-stats', session?.user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/worker/stats?email=${session?.user?.email}`);
      return res.json();
    },
    enabled: !!session?.user?.email
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F8FAFC]">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
      <p className="text-slate-400 font-bold font-syne">Loading your progress...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                Worker Portal
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 font-syne">
              Hello, {session?.user?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">Here is what's happening with your tasks today.</p>
          </div>
          
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                <Sparkles size={24} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Current Level</p>
                <p className="text-sm font-black text-slate-900">Elite Contributor</p>
             </div>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Total Submissions */}
          <StatCard 
            label="Total Submissions"
            value={stats?.totalSubmissions || 0}
            icon={<Send size={24} />}
            color="bg-blue-600"
            lightColor="bg-blue-50"
            textColor="text-blue-600"
            description="Tasks you've completed"
          />

          {/* Pending Submissions */}
          <StatCard 
            label="Pending Tasks"
            value={stats?.totalPending || 0}
            icon={<Clock size={24} />}
            color="bg-amber-500"
            lightColor="bg-amber-50"
            textColor="text-amber-600"
            description="Waiting for review"
          />

          {/* Total Earnings */}
          <StatCard 
            label="Total Earning"
            value={`$${stats?.totalEarnings || 0}`}
            icon={<Banknote size={24} />}
            color="bg-emerald-600"
            lightColor="bg-emerald-50"
            textColor="text-emerald-600"
            description="Approved earnings"
            isCurrency
          />

        </div>

        {/* Recent Activity / Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
              </div>
              <div className="space-y-4">
                 <ActionLink title="Browse New Tasks" desc="Find more ways to earn" icon={<LayoutDashboard size={18}/>} color="text-blue-500" />
                 <ActionLink title="Withdraw Funds" desc="Transfer earnings to your bank" icon={<Banknote size={18}/>} color="text-emerald-500" />
              </div>
           </div>

           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Earnings Tip 💡</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Workers with a <span className="text-emerald-400 font-bold">95%+ approval rate</span> get priority access to high-paying premium tasks. Keep up the good work!
                </p>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                   View Success Guide <ChevronRight size={14}/>
                </button>
              </div>
              <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
           </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ label, value, icon, color, lightColor, textColor, description, isCurrency }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-[35px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
  >
    <div className={`w-14 h-14 ${lightColor} ${textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div className="relative z-10">
      <h3 className={`text-4xl font-black text-slate-900 mb-1 ${isCurrency ? 'font-mono' : 'font-syne'}`}>
        {value}
      </h3>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{label}</p>
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`}></div>
        {description}
      </div>
    </div>
    <ArrowUpRight className="absolute right-6 top-6 text-slate-100 group-hover:text-slate-200 transition-colors" size={40} />
  </motion.div>
);

const ActionLink = ({ title, desc, icon, color }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
  </div>
);

export default WorkerDashboard;