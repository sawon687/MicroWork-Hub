'use client'
import React, { useState, useEffect } from "react";
import { X, Bell, Loader2, BellOff, ArrowRight, CheckCheck } from "lucide-react";
import { GoBell } from 'react-icons/go';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotificationModal = ({ Navbar }) => {
  const [isOpen, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); 
  const { data: session } = useSession();
  const router = useRouter();

  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ['notifications', session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return [];
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`);
      const result = await res.json();
      const data = result.data || [];
      setUnreadCount(data.length); 
      return data;
    },
    enabled: !!session?.user?.email,
  });

  const isDark = Navbar === 'Navbar';

 
  const handleNotificationClick = (route) => {
    setOpen(false);
    if (unreadCount > 0) {
      setUnreadCount(prev => prev - 1);
    }
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Bell Icon with Counter */}
      <button 
        onClick={() => setOpen(!isOpen)} 
        className={`relative p-2 rounded-full transition-all duration-300 ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
      >
        <GoBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 border-2 border-white text-[10px] text-white font-bold items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpen(false)}></div>

          <div className={`absolute right-0 top-14 z-50 w-85 sm:w-96 transform transition-all duration-300 ease-out shadow-2xl rounded-2xl overflow-hidden border ${isDark ? 'bg-gray-900/95 backdrop-blur-md border-gray-800' : 'bg-white border-gray-100'}`}>
            
            {/* Header */}
            <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-50'}`}>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Bell size={18} />
                </div>
                <div>
                  <h2 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Activity Feed</h2>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{unreadCount} Unread Updates</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className={`p-1.5 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}>
                <X size={18} />
              </button>
            </div>

            {/* List Body */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar scroll-smooth">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="animate-spin text-emerald-500 w-8 h-8" />
                  <p className="text-xs text-gray-500 font-medium">Loading details...</p>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-gray-800/10">
                  {notifications.map((item) => (
                    <div
                      key={item._id}
                      onClick={() =>{ handleNotificationClick(item.actionRoute); router.push('/notifications')}}
                      className={`group px-5 py-4 cursor-pointer transition-all duration-200 flex gap-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-emerald-50/40'}`}
                    >
                      <div className="mt-1">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${item.message.includes('earned') ? 'bg-emerald-500' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]'}`}></div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm leading-relaxed mb-2 font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {item.message}
                        </p>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1.5">
                             <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                             {new Date(item.time).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                           </span>
                           <Link 
                            href={'/notifications'} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen(false);
                              if (unreadCount > 0) setUnreadCount(prev => prev - 1);
                            }} 
                            className="bg-emerald-500/10 text-emerald-500 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 flex items-center gap-1 text-[10px] font-bold"
                          >
                             View details <ArrowRight size={12} />
                           </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                  <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <BellOff size={32} className="text-gray-600" />
                  </div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>All Caught Up</h3>
                  <p className="text-xs text-gray-500">New updates will appear here when they arrive.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className={`px-5 py-3 border-t flex items-center justify-between ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-50 bg-gray-50/30'}`}>
                <button 
                  onClick={() => {
                    refetch();
                    setUnreadCount(0); // সব পড়া হিসেবে মার্ক করলে ০ করে দেওয়া
                  }}
                  className="text-[10px] font-bold text-gray-500 hover:text-emerald-500 flex items-center gap-1 uppercase transition-all"
                >
                  <CheckCheck size={14} /> Mark all read
                </button>
                <Link 
                  href="notifications" 
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-bold text-emerald-500 hover:underline uppercase tracking-widest"
                >
                  See Full History
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? '#374151' : '#CBD5E1'};
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default NotificationModal;