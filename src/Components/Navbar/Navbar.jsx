"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react'; // signOut add kora hoyeche
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// Components
import Mullanguage from "../Mullanguage/Mullanguage";
import ProfileDropdown from '../Ui/profileDropdown';
import NotificationModal from '../NotificationModal/NotificationModal';
import SearchModal from '../Ui/SearchModal';
import LiveCoin from '../LiveCoin/LiveCoin';
import Logo from '../Ui/Logo';
import { Menu, X, Search, LayoutDashboard, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const dropdownRef = useRef(null);

  // Side overflow bondho korar jonno body scroll lock
  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileNav]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname === "/Login" || pathname === '/Register' || pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 bg-black/40 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-3 md:py-4 overflow-hidden flex items-center justify-between">
        
        <Logo />

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full shadow-inner backdrop-blur-md">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <NavLink href="/all-tasks" label="All Tasks" active={pathname === "/all-tasks"} />
          <NavLink href="/blog" label="Blog" active={pathname === "/blog"} />
          <NavLink href="/about" label="About" active={pathname === "/about"} />
          <NavLink href="/Contact" label="Contact" active={pathname === "/Contact"} />
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <SearchModal />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:block">
            <Mullanguage />
          </div>

          {session?.user ? (
            <div className="flex items-center gap-2 bg-white/5 p-1 pr-2 rounded-full border border-white/10">
              <div className="pl-1 md:pl-2 scale-90 md:scale-100">
                <LiveCoin />
              </div>
              <NotificationModal Navbar={'Navbar'} />
              
              {/* Desktop Profile Only */}
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} className="relative flex items-center focus:outline-none">
                  <img src={session?.user?.photo} alt="profile" className="w-9 h-9 rounded-full object-cover border border-emerald-400/30" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#011612] rounded-full" />
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute top-12 right-0 w-64 z-[70]">
                      <ProfileDropdown user={session?.user} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Link href='/Login' className="text-gray-400 font-bold text-sm">Login</Link>
              <Link href='/Register' className="px-6 py-2 bg-emerald-500 text-white font-black rounded-full text-xs uppercase">Join</Link>
            </div>
          )}

          {/* MOBILE CONTROLS */}
          <div className="flex items-center mr-10 lg:hidden gap-1">
            <SearchModal customIcon={<Search size={22} className="text-gray-300" />} />
            <button onClick={() => setMobileNav(!mobileNav)} className='text-white p-2 z-[110]'>
              {mobileNav ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-[105] lg:hidden flex flex-col"
          >
            <div className="flex flex-col p-6 pt-24 gap-8 overflow-y-auto w-full">
              
              {/* 1. Profile Section (If Logged In) */}
              {session?.user && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={session?.user?.photo} className="w-16 h-16 rounded-2xl border-2 border-emerald-500/50 object-cover" alt="" />
                    <div>
                      <h3 className="text-white font-bold text-lg">{session?.user?.name}</h3>
                      <p className="text-gray-400 text-xs">{session?.user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link onClick={() => setMobileNav(false)} href="/dashboard" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-semibold">
                      <LayoutDashboard size={20} className="text-emerald-400" /> Dashboard
                    </Link>
                    <Link onClick={() => setMobileNav(false)} href="/dashboard/profile" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-semibold">
                      <User size={20} className="text-emerald-400" /> My Profile
                    </Link>
                    <button onClick={() => signOut()} className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl text-red-400 font-semibold mt-2">
                      <LogOut size={20} /> Logout
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Language */}
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">Preferences</p>
                <Mullanguage />
              </div>

              {/* 3. Links */}
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Menu</p>
                <MobileNavLink href="/" label="Home" active={pathname === "/"} onClick={() => setMobileNav(false)} />
                <MobileNavLink href="/all-tasks" label="All Tasks" active={pathname === "/all-tasks"} onClick={() => setMobileNav(false)} />
                <MobileNavLink href="/blog" label="Blog" active={pathname === "/blog"} onClick={() => setMobileNav(false)} />
                <MobileNavLink href="/about" label="About" active={pathname === "/about"} onClick={() => setMobileNav(false)} />
                <MobileNavLink href="/Contact" label="Contact" active={pathname === "/Contact"} onClick={() => setMobileNav(false)} />
              </div>

              {/* 4. Auth (If not logged in) */}
              {!session?.user && (
                <div className="flex flex-col gap-3 mt-auto pb-10">
                  <Link href='/Login' onClick={() => setMobileNav(false)} className="py-4 text-center text-white border border-white/10 rounded-2xl font-bold">Login</Link>
                  <Link href='/Register' onClick={() => setMobileNav(false)} className="py-4 text-center bg-emerald-500 text-black rounded-2xl font-black">Get Started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MobileNavLink = ({ href, label, active, onClick }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`text-3xl font-black transition-all ${active ? "text-emerald-400 pl-2" : "text-white/40"}`}
  >
    {label}
  </Link>
);

const NavLink = ({ href, label, active }) => (
  <Link href={href} className={`relative px-5 py-2 text-[13px] font-bold transition-all ${active ? "text-emerald-400" : "text-gray-400 hover:text-white"}`}>
    <span className="relative z-10">{label}</span>
    {active && <motion.div layoutId="activeTab" className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full" />}
  </Link>
);

export default Navbar;