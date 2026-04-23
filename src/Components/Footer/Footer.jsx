"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from '../Ui/Logo';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { 
  ArrowUpRight, 
  Mail, 
  LayoutDashboard, 
  FileCheck, 
  Wallet, 
  Banknote, 
  PlusCircle, 
  FolderOpen, 
  Coins, 
  Users, 
  ListTodo 
} from 'lucide-react';
import { useSession } from 'next-auth/react';

const getLink = {
  Worker: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Submissions", url: "/dashboard/my-submission", icon: FileCheck },
    { title: "Withdraw Funds", url: "/dashboard/withdraw", icon: Wallet },
    { title: 'Withdrawals Log', url: "/dashboard/my-withdrawals", icon: Banknote }
  ],
  Buyer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Create Task", url: "/dashboard/add-task", icon: PlusCircle },
    { title: "Active Tasks", url: "/dashboard/my-task", icon: FolderOpen },
    { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon: Coins }
  ],
  Admin: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
    { title: "System Tasks", url: "/dashboard/task-overview", icon: ListTodo },
    { title: 'Payments History', url: '/dashboard/payment-history', icon: Banknote }
  ]
};

export default function Footer() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Safely get links based on role, or empty array if not logged in
  const roleLinks = session?.user?.role ? getLink[session.user.role] : [];

  // Hide footer on specific pages
  if (pathname === "/Login" || pathname === "/Register" || pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="relative bg-[#011612] text-gray-300 pt-24 pb-12 px-6 overflow-hidden border-t border-emerald-500/10">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400/5 blur-[100px] rounded-full -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-16">

          {/* 1. BRAND SECTION */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="text-sm text-white/50 leading-relaxed font-medium italic max-w-[280px]">
              "Empowering the global workforce through seamless micro-tasking and innovative productivity solutions."
            </p>

            <div className="flex gap-3">
              {[
                { Icon: FaFacebook, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaGithub, href: "#" },
                { Icon: FaLinkedin, href: "#" }
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 text-white/40 hover:text-emerald-400 transition-all duration-300"
                >
                  <item.Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. PLATFORM LINKS */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Platform</h3>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/all-tasks" label="Micro Tasks" />
              <FooterLink href="/about" label="Our Story" />
              <FooterLink href="/blog" label="Engineering Blog" />
            </ul>
          </div>

          {/* 3. QUICK ACCESS (DYNAMIC BASED ON ROLE) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
              {session ? `${session.user.role} Console` : "Account"}
            </h3>
            <ul className="space-y-4">
              {session ? (
                roleLinks.map((link, idx) => (
                  <FooterLink key={idx} href={link.url} label={link.title} />
                ))
              ) : (
                <>
                  <FooterLink href="/Login" label="Portal Login" />
                  <FooterLink href="/Register" label="Become a Worker" />
                  <FooterLink href="/pricing" label="Rewards & Coins" />
                </>
              )}
            </ul>
          </div>

          {/* 4. SUPPORT & CONTACT */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Direct Connect</h3>
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5">
              <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-2">Support Email</p>
              <a href="mailto:support@taskflow.com" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                <Mail size={16} className="text-emerald-500" /> 
                support@taskflow.com
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
              </a>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
                <Link href="#" className="text-[11px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</Link>
                <Link href="#" className="text-[11px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest">Terms of Service</Link>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM STRIP --- */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">
            © 2026 <span className="text-emerald-500/50">TaskFlow</span> Global Systems.
          </p>
          
          <div className="flex items-center gap-8 text-[10px] font-black text-white/20 uppercase tracking-widest">
             <span className="hover:text-emerald-500 transition-colors cursor-pointer">Status: Operational</span>
             <span className="hover:text-emerald-500 transition-colors cursor-pointer">Security: AES-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, label }) => (
  <li>
    <Link 
      href={href} 
      className="text-sm font-medium text-white/40 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group"
    >
      <div className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
      {label}
    </Link>
  </li>
);