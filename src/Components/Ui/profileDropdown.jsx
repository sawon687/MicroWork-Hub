"use client";
import Link from "next/link";
import { LayoutDashboard, User, Settings, LogOut, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";

const ProfileDropdown = ({ user }) => {
  return (
    <div className="fixed top-20 right-5 z-50 w-64 bg-[#0a2f27]/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-emerald-500/20 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95">
      

      <div className="px-6 py-5 border-b border-emerald-500/10 bg-emerald-500/5">
        <p className="text-sm font-bold text-white truncate">
          {user?.name || "User Name"}
        </p>
        <p className="text-xs text-emerald-400/60 truncate mt-0.5">
          {user?.email || "user@example.com"}
        </p>
      </div>


      <div className="p-2 space-y-1">
        {[
          { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
          { href: "/my-profile", icon: User, label: "My Profile" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-emerald-500/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3 text-white/70 group-hover:text-emerald-400">
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={14} className="text-emerald-500/0 group-hover:text-emerald-500 transition-all" />
          </Link>
        ))}

        <div className="pt-2 mt-2 border-t border-emerald-500/10">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors duration-200"
          >
            <LogOut size={18} />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;