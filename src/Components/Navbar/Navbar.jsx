"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// Components
import Mullanguage from "../Mullanguage/Mullanguage";
import ProfileDropdown from '../Ui/profileDropdown';
import NotificationModal from '../NotificationModal/NotificationModal';
import SearchModal from '../Ui/SearchModal';
import LiveCoin from '../LiveCoin/LiveCoin';
import Logo from '../Ui/Logo';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (pathname === "/Login" || pathname === '/Register' || pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        
     <Logo></Logo>
        {/* --- 2. CENTER MENU (Optimized NavLinks) --- */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full shadow-inner backdrop-blur-md">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <NavLink href="/all-tasks" label="All Tasks" active={pathname === "/all-tasks"} />
          <NavLink href="/blog" label="Blog" active={pathname === "/blog"} />
          <NavLink href="/about" label="About" active={pathname === "/about"} />
          <NavLink href="/Contact" label="Contact" active={pathname === "/Contact"} />
          
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className=" transition-transform">
            <SearchModal />
          </div>
        </div>

        {/* --- 3. RIGHT SECTION --- */}
        <div className="flex items-center gap-4">
          <Mullanguage />

          {session?.user ? (
            <div className="flex items-center gap-3 bg-white/5 p-1 pr-2 rounded-full border border-white/10">
              <div className="pl-2">
                <LiveCoin />
              </div>

              <NotificationModal Navbar={'Navbar'} />

              <div className="relative">
                <button 
                  onMouseEnter={() => setShowDropdown(true)}
                  className="relative flex items-center group"
                >
                  <img 
                    src={session?.user?.photo} 
                    alt={session?.user?.name} 
                    className="w-9 h-9 rounded-full object-cover border border-emerald-400/30 group-hover:border-emerald-400 transition-all" 
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#011612] rounded-full" />
                </button>

                {/* Dropdown with Animation */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setShowDropdown(false)}
                      className="absolute top-12 right-0 w-56 z-[60]"
                    >
                      <ProfileDropdown user={session?.user} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={'/Login'}>
                <button className="px-5 py-2 text-[13px] font-bold text-gray-400 hover:text-white transition-colors">
                  Login
                </button>
              </Link>
              <Link href={'/Register'}>
                <button className="px-6 py-2.5 bg-emerald-500 text-white text-[13px] font-black rounded-full hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all active:scale-95 uppercase tracking-wider">
                  Join Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Updated NavLink Component ---
const NavLink = ({ href, label, active }) => (
  <Link 
    href={href} 
    className={`relative px-5 py-2 text-[13px] font-bold transition-all duration-300 rounded-full tracking-wide ${
      active ? "text-emerald-400" : "text-gray-400 hover:text-white"
    }`}
  >
    <span className="relative z-10">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      />
    )}
  </Link>
);

export default Navbar;