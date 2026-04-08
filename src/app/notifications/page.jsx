'use client'
import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { 
  Bell, Trash2, Calendar, ArrowRight, 
  ChevronRight, CheckCircle2, XCircle, Info 
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

const AllNotificationsPage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Fetch all notifications
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['all-notifications', session?.user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`);
      const result = await res.json();
      return result.data || [];
    },
    enabled: !!session?.user?.email,
  });

  // UI Helper: Get Icon based on message content
  const getStatusIcon = (message) => {
    if (message.toLowerCase().includes('earned')) return <CheckCircle2 className="text-emerald-500" size={20} />;
    if (message.toLowerCase().includes('rejected')) return <XCircle className="text-rose-500" size={20} />;
    return <Info className="text-blue-500" size={20} />;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading your activity feed...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
            <Bell className="text-emerald-500" size={32} /> Notifications
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">
            Keep track of your earnings and task updates
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
           <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-200">
             All Alerts
           </button>
           <button className="px-4 py-2 text-slate-400 hover:text-emerald-500 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
             Unread
           </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif._id}
              onClick={() => notif.actionRoute && router.push(notif.actionRoute)}
              className="group bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all p-5 md:p-6 cursor-pointer relative overflow-hidden flex items-start gap-4"
            >
              {/* Status Indicator Bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notif.message.includes('earned') ? 'bg-emerald-500' : 'bg-rose-500'}`} />

              {/* Icon Container */}
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                {getStatusIcon(notif.message)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed group-hover:text-emerald-700 transition-colors">
                    {notif.message}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(notif.time).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Action Arrow */}
              <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg shadow-emerald-100">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-100">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="text-slate-200" size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Inbox is empty</h3>
            <p className="text-slate-400 max-w-xs mx-auto text-sm font-medium">
              You haven't received any notifications yet. Start working on tasks to see updates!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Tip */}
      {notifications.length > 0 && (
        <p className="text-center text-slate-400 text-xs font-bold uppercase mt-12 tracking-widest italic opacity-50">
          --- End of activity history ---
        </p>
      )}
    </div>
  );
};

export default AllNotificationsPage;