'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { 
  Bell, Calendar, CheckCircle2, XCircle, Info, Clock, 
  Inbox, Trash2, Sparkles, Loader2, AlertTriangle, User, Check
} from "lucide-react";
import { useRouter } from 'next/navigation';

const AllNotificationsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

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
      // URL dynamic ভাবে তৈরি করা
      let url = `/api/notifications?email=${session?.user?.email}`;
      
      if (deleteTarget === 'all') {
        url += `&type=all`; 
      } else {
        url += `&id=${deleteTarget}`; // নির্দিষ্ট আইডি ডিলিট করার জন্য
      }

      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (res.ok) {
       
        await queryClient.invalidateQueries(['all-notifications', session?.user?.email]);
        
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setTimeout(() => setIsSuccessModalOpen(false), 2000);
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const openConfirm = (id) => {
    setDeleteTarget(id);
    setIsModalOpen(true);
  };

  const getStyle = (message = "") => {
    const msg = message.toLowerCase();
    if (msg.includes('earned') || msg.includes('success') || msg.includes('approved')) {
      return { icon: <CheckCircle2 size={18} />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" };
    }
    if (msg.includes('rejected') || msg.includes('failed') || msg.includes('cancelled')) {
      return { icon: <XCircle size={18} />, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" };
    }
    return { icon: <Info size={18} />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
  };

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
      <p className="text-slate-400 font-medium tracking-wide">Fetching notifications...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      
      {/* --- SUCCESS MODAL --- */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-white/60 backdrop-blur-md">
          <div className="bg-white rounded-[32px] p-10 max-w-xs w-full shadow-2xl border border-slate-50 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Done!</h3>
            <p className="text-slate-500 font-medium">Successfully removed.</p>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-slate-100">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Are you sure?</h3>
            <p className="text-slate-500 text-center text-[14px] leading-relaxed mb-8">
              {deleteTarget === 'all' 
                ? "Your entire activity history will be cleared. This cannot be undone." 
                : "This item will be removed from your activity list."}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3.5 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
              >
                Go Back
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3.5 rounded-2xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg transition-all text-sm disabled:opacity-50"
              >
                {isDeleting ? 'Removing...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-2xl mx-auto px-4 pt-28 relative z-10">
        
        <div className="flex flex-col gap-1 mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit mb-2">
               <Bell size={14} />
               <span className="text-[11px] font-bold uppercase tracking-wider">Activity Center</span>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={() => openConfirm('all')}
                className="group flex items-center gap-2 px-4 py-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all font-bold text-xs"
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">History</h1>
          <p className="text-slate-500 font-medium">
              Tracking <span className="text-slate-900">{notifications.length}</span> recent updates
          </p>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              const style = getStyle(notif.message);
              return (
                <div 
                  key={notif._id}
                  className={`group bg-white border ${style.border} rounded-[30px] p-6 transition-all duration-300 hover:shadow-xl flex gap-4 items-center relative overflow-hidden`}
                >
                  <div 
                    onClick={() => notif.actionRoute && router.push(notif.actionRoute)}
                    className="flex flex-1 gap-5 items-center cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center`}>
                      {style.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 font-bold text-[15px] leading-snug mb-2 group-hover:text-black transition-colors">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock size={12} /> {new Date(notif.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(notif.time).toLocaleDateString('en-GB', {day:'numeric', month:'short'})}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      openConfirm(notif._id); 
                    }}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[45px] py-24 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Inbox size={36} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Nothing here yet</h3>
              <p className="text-slate-400 text-sm mt-1">Updates will appear as you take action.</p>
            </div>
          )}
        </div>

        {/* Tip Section */}
        {notifications.length > 0 && (
          <div className="mt-12 p-8 rounded-[35px] bg-slate-900 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-emerald-400" />
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Pro Tip for {session?.user?.role || 'User'}</p>
              </div>
              <p className="text-[15px] font-medium text-slate-300 leading-relaxed max-w-[90%]">
                {session?.user?.role === 'worker' 
                  ? "Finish your assigned tasks promptly to keep your success rate high."
                  : "Keep an eye on freelancer updates here to ensure your projects move smoothly."
                }
              </p>
            </div>
            <User className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotificationsPage;