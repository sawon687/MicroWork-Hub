"use client";
import Link from "next/link";
import Button from "../Ui/Button";
import { usePathname } from "next/navigation";
import Mullanguage from "../Mullanguage/Mullanguage";
import { useSession } from 'next-auth/react';
import { Coins } from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from '../Ui/profileDropdown';

const Navbar = () => {
    const pathname = usePathname();
    const {data:session}=useSession()
    const [showDropdown,setShowDropdown]=useState(false)
      console.log('session',session?.user?.photo)
      console.log(typeof session?.user?.photo,'sawon is real', session?.user?.photo)
  if(pathname ==="/Login" || pathname ==='/Register')return null

  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-emerald-400">
          TaskFlow
        </h1>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/features" className="hover:text-white transition">Features</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Mullanguage></Mullanguage>
        {
          session?.user?(
            <div className="flex items-center gap-4">
               <div className='px-5 py-1 rounded-full flex bg-amber-100 text-amber-500'
               > <Coins></Coins> <span>{session?.user?.coin}</span></div>
              <img onClick={()=> setShowDropdown(!showDropdown)} src={session?.user?.photo} alt={session?.user?.name} className='w-10 h-10 rounded-full border-2 border-emerald-400' />
              {
                showDropdown && <ProfileDropdown user={session?.user}></ProfileDropdown>
              }
            </div>
          ):(
            <>
              <Link href={'/Login'}>
                <button className="text-gray-300 hover:text-white transition">
                  Login
                </button>
              </Link>
              <Link href={'/Register'}>
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          )
        }    
                    
                      </div>
      </div>
    </nav>
  );
};

export default Navbar;