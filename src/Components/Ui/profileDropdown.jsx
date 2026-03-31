"use client";
import Link from "next/link";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const ProfileDropdown = ({ user }) => {
  return (
    <div className="absolute top-20 right-5 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {user?.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {user?.email}
        </p>
      </div>

      {/* Menu Items */}
      <div className="py-2 text-sm text-gray-400">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <User size={16} />
          Profile
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Settings size={16} />
          Settings
        </Link>

        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;