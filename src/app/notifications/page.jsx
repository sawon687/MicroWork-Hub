'use client';
import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, Calendar, CheckCircle2, XCircle, Info, Clock, 
  Inbox, Trash2, Sparkles, Loader2, AlertTriangle, User, Check,
  ChevronRight, Zap
} from "lucide-react";
import { useRouter } from 'next/navigation';

const AllNotificationsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['all-notifications', session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return [];
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`);
      const result = await res.json();
      return result.data || [];
    },
    enabled: !!session?.user?.email,
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      let url = `/api/notifications?email=${session?.user?.email}`;
      if (deleteTarget === 'all') url += `&type=all`; 
      else url += `&id=${deleteTarget}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        await queryClient.invalidateQueries(['all-notifications', session?.user?.email]);
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setTimeout(() => setIsSuccessModalOpen(false), 2000);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const getStyle = (message = "") => {
    const msg = message.toLowerCase();
    if (msg.includes('earned') || msg.includes('success') || msg.includes('approved')) {
      return { icon: <CheckCircle2 size={18} />, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", type: 'success' };
    }
    if (msg.includes('rejected') || msg.includes('failed') || msg.includes('cancelled')) {
      return { icon: <XCircle size={18} />, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", type: 'error' };
    }
    return { icon: <Info size={18} />, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", type: 'info' };
  };

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter(n => getStyle(n.message).type === activeFilter);
  }, [notifications, activeFilter]);

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#01100d]">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#01100d] text-white font-sans selection:bg-emerald-500 selection:text-white overflow-hidden relative">
      
      {/* --- PREMIUM BACKGROUND DECOR --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#02241e] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6"><AlertTriangle size={32} /></div>
              <h3 className="text-2xl font-black mb-2 tracking-tighter">Are you sure?</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed font-medium">Ei action-ti permanent. Apnar activity history ar phire paben na.</p>
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold bg-white/5 hover:bg-white/10 transition-all border border-white/10">No, Wait</button>
                <button onClick={handleDelete} className="flex-1 py-4 rounded-2xl font-bold bg-rose-500 hover:bg-rose-400 text-[#01100d] transition-all">
                   {isDeleting ? '...' : 'Yes, Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <Zap size={14} className="fill-current" /> Recent Activity
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                Updates <span className="text-emerald-400">Center</span>
              </h1>
              <p className="text-emerald-100/40 font-medium">History tracking for <span className="text-emerald-400">@{session?.user?.email?.split('@')[0]}</span></p>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={() => {setDeleteTarget('all'); setIsModalOpen(true)}}
                className="group p-4 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20 rounded-2xl transition-all flex items-center gap-3"
              >
                <Trash2 size={18} className="group-hover:text-rose-400 transition-colors" />
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-rose-400">Clear All</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {['all', 'success', 'error', 'info'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeFilter === f 
                ? 'bg-emerald-500 border-emerald-500 text-[#01100d] shadow-[0_10px_30px_rgba(16,185,129,0.3)]' 
                : 'bg-white/5 border-white/10 text-white/40 hover:border-emerald-500/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif, i) => {
                const style = getStyle(notif.message);
                return (
                  <motion.div
                    key={notif._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group bg-white/[0.02] hover:bg-white/[0.05] border ${style.border} p-6 rounded-3xl transition-all flex items-center gap-6 relative overflow-hidden backdrop-blur-3xl`}
                  >
                    {/* Icon Box */}
                    <div className={`w-14 h-14 rounded-3xl ${style.bg} ${style.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {style.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 cursor-pointer" onClick={() => notif.actionRoute && router.push(notif.actionRoute)}>
                        <h4 className="text-lg font-bold text-white/90 group-hover:text-emerald-400 transition-colors leading-tight mb-2">
                            {notif.message}
                        </h4>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.15em]">
                              <Clock size={12} className="text-emerald-500" /> 
                              {new Date(notif.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.15em]">
                              <Calendar size={12} className="text-emerald-500" /> 
                              {new Date(notif.time).toLocaleDateString()}
                           </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {setDeleteTarget(notif._id); setIsModalOpen(true)}}
                          className="p-3 text-white/10 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all"
                        >
                            <Trash2 size={18} />
                        </button>
                        <ChevronRight size={20} className="text-white/10 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="py-32 text-center bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[3rem]"
              >
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Inbox size={40} className="text-white/10" />
                 </div>
                 <h3 className="text-xl font-bold text-white/40">Clean Slate</h3>
                 <p className="text-white/20 text-xs font-medium uppercase tracking-widest mt-2">No new updates to show</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Pro Tip */}
        <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 relative overflow-hidden group"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500 rounded-2xl text-[#01100d]">
                    <Sparkles size={20} fill="currentColor" />
                </div>
                <h5 className="font-black uppercase tracking-tighter text-emerald-400">Pro Dashboard Strategy</h5>
            </div>
            <p className="text-emerald-100/40 text-sm leading-relaxed max-w-lg">
                {session?.user?.role === 'worker' 
                ? "Keep your notification log clear to focus on high-priority client messages and earnings." 
                : "Real-time updates help you track freelancer progress without manual check-ins."}
            </p>
            <User className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </motion.div>
      </div>

      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-white/10 text-xs font-bold tracking-widest uppercase italic">TaskFlow Intelligence © 2026</p>
      </footer>
    </div>
  );
};

export default AllNotificationsPage;