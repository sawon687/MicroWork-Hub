"use client";
import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Edit3, Camera, MapPin, Briefcase, History, CheckCircle, Clock, ArrowUpRight, X, Upload, Save } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
   const [isModalOpen,setIsModalOpen]=useState(false)
  // ইউজার ডাটা (Session থেকে ডায়নামিক)
  const user = session?.user;

  // ডায়নামিক ট্যাব কন্টেন্ট জেনারেটর
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-emerald-400">Activity Overview</h3>
            <p className="text-white/50 leading-relaxed">
              Welcome back, {user?.name || 'User'}. You have been active on TaskFlow since {new Date().getFullYear()}. 
              Currently, you have a high success rate. Keep completing tasks to unlock premium rewards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500"><CheckCircle size={20}/></div>
                  <div>
                    <div className="text-sm text-white/40">Verified Status</div>
                    <div className="text-sm font-bold">Identity Verified</div>
                  </div>
               </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500"><History size={20}/></div>
                  <div>
                    <div className="text-sm text-white/40">Last Activity</div>
                    <div className="text-sm font-bold">2 hours ago</div>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'submissions':
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-emerald-400">Recent Submissions</h3>
              <span className="text-xs text-white/30 tracking-widest uppercase font-bold">Real-time update</span>
            </div>
            {/* Table Header */}
            <div className="grid grid-cols-3 p-4 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40">
               <span>Task Name</span>
               <span className="text-center">Status</span>
               <span className="text-right">Earnings</span>
            </div>
            {/* Example Row - Map your API data here */}
            <div className="grid grid-cols-3 p-4 border-b border-white/5 items-center hover:bg-white/5 transition rounded-xl">
               <span className="text-sm font-medium">YouTube Watch Task</span>
               <span className="flex justify-center"><span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-bold">Pending</span></span>
               <span className="text-right text-emerald-400 font-bold">+20 Coins</span>
            </div>
          </div>
        );

      case 'withdrawals':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-xl font-bold text-emerald-400">Withdrawal History</h3>
             <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[2rem] flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-red-500/10 rounded-full text-red-500"><ArrowUpRight size={24}/></div>
                <p className="text-sm text-white/40 font-medium">No withdrawals processed yet.</p>
                <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition">Request Payment</button>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#011612] text-white pt-28 pb-20 px-6 selection:bg-emerald-500/30">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header/Cover Area */}
        <div className="relative mb-24">
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-[3rem] border border-emerald-500/10 shadow-2xl overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             {/* Dynamic Glow */}
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="absolute -bottom-16 left-8 md:left-16 flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#011612] bg-[#0a2f27] overflow-hidden shadow-2xl">
                <Image 
                  src={user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'TaskFlow User')}&background=0d9488&color=fff`} 
                  alt="Profile" 
                  fill 
                  className="object-cover rounded-full"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 rounded-full border-2 border-[#011612] hover:scale-110 transition-transform shadow-lg">
                <Camera size={18} className="text-black" />
              </button>
            </div>
            
            <div className="mb-4">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{user?.name || "Anonymous"}</h1>
              <div className="flex items-center gap-4 mt-2 text-emerald-400/60 font-medium">
                <span className="flex items-center gap-1.5 text-sm"><Briefcase size={14}/> Professional Worker</span>
                <span className="flex items-center gap-1.5 text-sm"><MapPin size={14}/> Global Resident</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-12 right-8 hidden md:block">
            <button onClick={()=> setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-emerald-500 transition-all rounded-2xl border border-white/10 hover:text-black font-bold group">
              <Edit3 size={18} className="group-hover:rotate-12 transition-transform" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          
          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-[#0a2f27]/40 p-8 rounded-[2.5rem] border border-emerald-500/10 backdrop-blur-md">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Shield size={20} className="text-emerald-500" /> Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Email Address</span>
                  <span className="text-sm font-medium truncate">{user?.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-widest font-bold">System Role</span>
                  <span className="text-sm font-medium capitalize">{session?.user?.role || 'Member'}</span>
                </div>
              </div>
            </div>

            <div className="group bg-emerald-500 p-8 rounded-[2.5rem] text-black shadow-xl shadow-emerald-500/10 relative overflow-hidden transition-all hover:-translate-y-1">
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-black/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-2 bg-black/10 rounded-xl"><Calendar size={20}/></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter bg-black/20 px-2 py-1 rounded">Active Wallet</span>
               </div>
               <div className="text-4xl font-black relative z-10 tracking-tighter">1,250</div>
               <div className="text-xs font-bold uppercase tracking-wider opacity-60 relative z-10">Task Coins Earned</div>
            </div>
          </div>

          {/* Main Content Areas with Tabs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.03] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
               <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="text-3xl font-black text-emerald-400">48</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase mt-1 tracking-widest">Tasks Completed</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-cyan-500/20 transition-colors">
                    <div className="text-3xl font-black text-cyan-400">98%</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase mt-1 tracking-widest">Success Ratio</div>
                  </div>
               </div>
            </div>

            {/* Dynamic Tab Navigation */}
            <div className="bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <div className="flex bg-white/5 border-b border-white/5 p-2 gap-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'submissions', label: 'Submissions' },
                  { id: 'withdrawals', label: 'Withdrawals' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${
                      activeTab === tab.id 
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Render Selected Content */}
              <div className="p-8 md:p-10">
                {renderTabContent()}
              </div>
            </div>
          </div>

        </div>
      </div>

        {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#011612]/90 backdrop-blur-md" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Box */}
          <div className="relative w-full max-w-lg bg-[#0a2f27] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl scale-in-center">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-black mb-8 tracking-tighter">Edit <span className="text-emerald-400">Profile.</span></h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.name}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Profile Picture</label>
                <div 
             
                  className="flex items-center gap-4 p-4 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-2xl cursor-pointer hover:bg-emerald-500/10 transition-colors"
                >
                  <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500">
                    <Upload size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Upload New Image</div>
                    <div className="text-[10px] text-white/30 uppercase">PNG, JPG up to 5MB</div>
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-400 active:scale-95 transition-all"
              >
                <Save size={18} /> Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;