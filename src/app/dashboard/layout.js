'use client';
import { Coins, PanelLeft, Bell, User as UserIcon, LogOut, Banknote, ShieldCheck, ChevronUp, Settings, UserCircle, Mail } from "lucide-react";
import { useState, useMemo } from "react";
import Logo from "../../Components/Ui/Logo";
import {
  LayoutDashboard,
  ListTodo,
  FileCheck,
  PlusCircle,
  FolderOpen,
  Users,
  Wallet,
} from "lucide-react";
import React from 'react'
import { useSession, signOut } from "next-auth/react";
import NextAuthPovider from '../../provider/NextAuthPovider';
import UseQueryProvider from '../../provider/UseQueryProvider';
import NotificationModal from '../../Components/NotificationModal/NotificationModal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import LiveCoin from '../../Components/LiveCoin/LiveCoin';

const workerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Submissions", url: "/dashboard/my-submission", icon: FileCheck },
  { title: "Withdraw Funds", url: "/dashboard/withdraw", icon: Wallet },
  { title: 'Withdrawals Log', url: "/dashboard/my-withdrawals", icon: Banknote }
];

const buyerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create Task", url: "/dashboard/add-task", icon: PlusCircle },
  { title: "Active Tasks", url: "/dashboard/my-task", icon: FolderOpen },
  { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon: Coins }
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
  { title: "System Tasks", url: "/dashboard/task-overview", icon: ListTodo },
  { title: 'Payments History', url: '/dashboard/payment-history', icon: Banknote }
];

const getLinks = (role) => {
  if (role === "Buyer") return buyerLinks;
  if (role === "Admin") return adminLinks;
  if (role === 'Worker') return workerLinks;
  return [];
};

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  const role = session?.user?.role;
  const links = useMemo(() => getLinks(role), [role]);

  return (
    <NextAuthPovider>
      <UseQueryProvider>
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
          
          {/* --- SIDEBAR --- */}
          <aside
            className={`fixed left-0 top-0 h-screen z-[60] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${open ? "w-72" : "w-24"} bg-[#0f172a] border-r border-white/5 flex flex-col shadow-2xl`}
          >
            <div className="h-20 flex items-center justify-center border-b border-white/10 px-6">
              {open ? <Logo /> : <div className="relative flex items-center justify-center">
                 <svg 
                   width="42" 
                   height="42" 
                   viewBox="0 0 100 100" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className="relative z-10 transition-transform duration-700 group-hover:rotate-[360deg]"
                 >
                   <path 
                     d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" 
                     className="stroke-emerald-500/30 fill-emerald-500/5"
                     strokeWidth="3"
                   />
                   <path 
                     d="M35 50L45 60L65 40" 
                     stroke="#10b981" 
                     strokeWidth="8" 
                     strokeLinecap="round" 
                     strokeLinejoin="round"
                     className="animate-pulse"
                   />
                 </svg>
                 <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500" />
               </div>}
            </div>

            {/* MODERN ACTIVE LINKS */}
            <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
              {links.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <Link key={item.title} href={item.url} className="block relative">
                    <div className={`
                        flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group
                        ${isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}
                        ${!open ? 'justify-center' : ''}
                      `}>
                      
                      {isActive && (
                        <motion.div 
                          layoutId="activeGlow"
                          className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl z-0"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {isActive && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute left-[-16px] w-1.5 h-6 bg-emerald-500 rounded-r-full shadow-[4px_0_15px_rgba(16,185,129,0.6)]"
                        />
                      )}
                      
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                      {open && <span className="relative z-10 text-[14px] font-bold tracking-tight">{item.title}</span>}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* --- BOTTOM PROFILE CARD WITH DROPDOWN (EMAIL ADDED) --- */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <AnimatePresence>
                  {profileOpen && open && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 w-full mb-3 bg-[#1e293b] border border-white/10 rounded-3xl p-3 shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-white/5 mb-2">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Logged in as</p>
                        <div className="flex items-center gap-2 text-slate-300">
                           <Mail size={12} className="text-emerald-500" />
                           <p className="text-[11px] font-medium truncate">{session?.user?.email}</p>
                        </div>
                      </div>
                      
                      <button onClick={() => { router.push('/dashboard/profile'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all font-bold text-xs">
                        <UserCircle size={16} className="text-emerald-500" /> Profile Settings
                      </button>

                      <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-400/10 transition-all font-bold text-xs">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => open && setProfileOpen(!profileOpen)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border border-transparent
                  ${open ? 'bg-white/5 hover:bg-white/10' : 'justify-center'}
                  ${profileOpen ? 'border-emerald-500/30 bg-white/10' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500/20 bg-slate-800 shrink-0">
                    {session?.user?.photo ? <img src={session.user.photo} alt="U" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-500"><UserIcon size={20} /></div>}
                  </div>
                  {open && (
                    <>
                      <div className="flex-1 text-left overflow-hidden">
                        <p className="text-xs font-black text-white truncate leading-none">{session?.user?.name}</p>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter mt-1.5">{role}</p>
                      </div>
                      <ChevronUp size={16} className={`text-slate-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* --- MAIN PAGE --- */}
          <div className={`flex-1 transition-all duration-500 ${open ? "ml-72" : "ml-24"}`}>
            <header className="h-16 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setOpen(!open)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-xl transition-all"><PanelLeft size={20} /></button>
                <h2 className="hidden md:block font-black text-slate-800 text-[11px] uppercase tracking-[0.2em]">{role} Workspace</h2>
              </div>

              <div className="flex items-center gap-4">
                <LiveCoin />
                <NotificationModal />
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-slate-900">{session?.user?.name}</p>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{role}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shadow-sm">
                        {session?.user?.photo ? <img src={session.user.photo} alt="U" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><UserIcon size={18} /></div>}
                    </div>
                </div>
              </div>
            </header>

            <main className="p-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1600px] mx-auto">
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </UseQueryProvider>
    </NextAuthPovider>
  );
};

export default React.memo(DashboardLayout);