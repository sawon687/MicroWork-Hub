"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { motion } from "framer-motion"; // এনিমেশনের জন্য

// Components
import Mullanguage from "../Mullanguage/Mullanguage";
import ProfileDropdown from '../Ui/profileDropdown';
import NotificationModal from '../NotificationModal/NotificationModal';
import Logo from '../Ui/Logo';
import SearchModal from '../Ui/SearchModal';
import LiveCoin from '../../lib/LiveCoin';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (pathname === "/Login" || pathname === '/Register' || pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        
        <Logo />

        {/* Center Menu with Active State */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 px-6 py-1.5 rounded-full">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <NavLink href="/all-tasks" label="All Task" active={pathname === "/all-tasks"} />
          <NavLink href="/blog" label="Blog" active={pathname === "/blog"} />
          <NavLink href="/about" label="About" active={pathname === "/about"} />
          
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <SearchModal />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          <Mullanguage />

          <div className="flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-3 md:gap-4 bg-white/5 p-1 pr-3 rounded-full border border-white/10">
                <div className="pl-2">
                   <LiveCoin />
                </div>

                <NotificationModal Navbar={'Navbar'} />

                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative flex items-center group"
                  >
                    <img 
                      src={session?.user?.photo} 
                      alt={session?.user?.name} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400/50 group-hover:border-emerald-400 transition-all shadow-lg" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full shadow-sm" />
                  </button>

                  {showDropdown && (
                    <div className="absolute top-12 right-0 w-56">
                       <ProfileDropdown user={session?.user} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={'/Login'}>
                  <button className="px-5 py-2 text-sm font-medium border rounded-full bg-white/5 hover:bg-gray-700/70 border-white/10 text-gray-400 hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
                <Link href={'/Register'}>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all active:scale-95">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Active Link Helper Component ---
const NavLink = ({ href, label, active }) => (
  <Link 
    href={href} 
    className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
      active ? "text-white" : "text-gray-400 hover:text-gray-200"
    }`}
  >
    {/* Active Background - Teal/Emerald Gradient */}
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-emerald-500/30 rounded-full -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    {label}
  </Link>
);

export default Navbar;