"use client";
import React, { useState } from 'react';
import { User, Mail, Shield, Calendar, Edit3, Camera, MapPin, Briefcase, History, CheckCircle, Clock, ArrowUpRight, X, Upload, Save, Link2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
   const [isModalOpen,setIsModalOpen]=useState(false)
   const [imgePreview,setImgePreview]=useState()
 
  const user = session?.user;
  const { data } = useQuery({
    queryKey: ["profile", session?.email],
    enabled: !!session?.email,
    queryFn: async () => {
      const res = await fetch(`/api/sign-up/${session?.email}`);
      const result = await res.json();
      return result.data;
    },
  });
 
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
        
        {/* header/cover Area */}
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
            <button onClick={()=> setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-emerald-500 transition-all rounded-2xl border border-white/10  font-bold group">
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

          {/* main content areas with tabs */}
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

            {/* Dynamics Tab Navigation */}
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
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
    {/* Backdrop with extreme blur */}
    <div
      className="absolute inset-0 bg-[#010c0a]/90 backdrop-blur-2xl"
      onClick={() => setIsModalOpen(false)}
    ></div>

    {/* Modern High-End Modal Box */}
    <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#0a2f27] to-[#051a16] border border-white/10 rounded-[3.5rem] p-8 md:p-14 shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-y-auto max-h-[95vh] custom-scrollbar">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -z-10" />

      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-10 right-10 p-3 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
      >
        <X size={20} />
      </button>

      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
            Account Management
          </span>
          <h2 className="text-5xl font-black tracking-tighter text-white mt-4">
            Refine <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Profile.</span>
          </h2>
        </div>
        <div className="text-right">
           <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Current Role</p>
           <p className="text-emerald-400 font-black text-xl italic tracking-widest">{user?.role}</p>
        </div>
      </div>

      <form className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* --- COLUMN 1: IDENTITY --- */}
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-emerald-500/30"></div>
                <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">Identity</h3>
             </div>
             
             <div className="space-y-6">
               <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 transition-colors ml-1">Legal Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-white placeholder:text-white/10"
                  />
               </div>

               <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 transition-colors ml-1">Contact Access</label>
                  <input 
                    type="text" 
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-white placeholder:text-white/10"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Avatar Media</label>
                  <div className="group relative w-full h-40 bg-black/40 border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all cursor-pointer">
                     <div className="p-4 bg-white/5 rounded-2xl mb-3 group-hover:scale-110 group-hover:text-emerald-400 transition-all">
                        <Upload size={24} />
                     </div>
                     <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Update Photo</span>
                  </div>
               </div>
             </div>
          </div>

          {/* --- COLUMN 2: PROFESSIONAL --- */}
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-emerald-500/30"></div>
                <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">Professionalism</h3>
             </div>

             <div className="space-y-6">
               {user?.role === "Buyer" ? (
                 <>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Organization</label>
                      <input type="text" placeholder="Company Name" className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 transition-all" />
                   </div>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Brand Vision</label>
                      <textarea placeholder="Describe your mission..." className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 transition-all h-[180px] resize-none" />
                   </div>
                 </>
               ) : (
                 <>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Skill Stack</label>
                      <input type="text" placeholder="Python, Devops, SEO" className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 transition-all" />
                   </div>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Work Zone</label>
                      <input type="text" placeholder="London, UK (Remote)" className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 transition-all" />
                   </div>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Elevator Pitch</label>
                      <textarea placeholder="Tell your story..." className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] px-6 py-4 outline-none focus:border-emerald-500/50 transition-all h-[85px] resize-none" />
                   </div>
                 </>
               )}
             </div>
          </div>

          {/* --- COLUMN 3: CONNECTIVITY --- */}
          <div className="space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-emerald-500/30"></div>
                <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">Connectivity</h3>
             </div>
             
             <div className="space-y-6">
               <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">GitHub Repository</label>
                  <div className="relative">
                    <input type="url" placeholder="github.com/user" className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] pl-14 pr-6 py-4 outline-none focus:border-emerald-500/50 transition-all" />
                    <FaGithub size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
               </div>

               <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 group-focus-within:text-emerald-400 ml-1">Showcase Link</label>
                  <div className="relative">
                    <input type="url" placeholder="portfolio.io" className="w-full bg-black/20 border border-white/5 rounded-[1.25rem] pl-14 pr-6 py-4 outline-none focus:border-emerald-500/50 transition-all" />
                    <Link2 size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
               </div>

               <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 mt-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldCheck size={40} /></div>
                   <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Privacy Note</p>
                   <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                     Your professional data helps us match you with the best opportunities. All links are verified for security.
                   </p>
               </div>
             </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: ACTIONS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Profile Readiness: 85%</span>
           </div>

           <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 md:flex-none px-10 py-5 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Discard
              </button>
              <button 
                type="submit"
                className="flex-1 md:flex-none px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-emerald-500/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Save size={16} /> Sync Changes
              </button>
           </div>
        </div>
      </form>
    </div>
  </div>
)}  
    </div>
  );
};

export default ProfilePage;