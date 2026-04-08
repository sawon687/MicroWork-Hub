"use client";
import Link from "next/link";
import Button from "../Ui/Button";
import { usePathname } from "next/navigation";
import Mullanguage from "../Mullanguage/Mullanguage";
import { useSession } from 'next-auth/react';
import { Coins } from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from '../Ui/profileDropdown';

import NotificationModal from '../NotificationModal/NotificationModal';
import Logo from '../Ui/Logo';
import SearchModal from '../Ui/SearchModal';

const Navbar = () => {
    const pathname = usePathname();
    const {data:session}=useSession()
  
    const [showDropdown,setShowDropdown]=useState(false)
  
  if(pathname ==="/Login" || pathname ==='/Register'|| pathname.startsWith('/dashboard'))return null

  return (
    <nav className="fixed z-50 w-full backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className=" mx-auto  px-20 py-4 flex items-center justify-between">
        
        {/* Logo */}
     <Logo></Logo>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/all-task" className="hover:text-white transition">All Task</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <SearchModal></SearchModal>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* multilanguage button */}
          <Mullanguage></Mullanguage>
         
         
            <div className="flex items-center gap-4">

              { session?.user ? (
               <>
                <div className='px-5 py-1 border border-white/10 rounded-xl flex bg-gray-800 text-emerald-500'
                >
                  {/* user coins */}
                   <Coins></Coins> <span>{session?.user?.coin}</span></div>

                   
            {/* notification */}
                 <NotificationModal Navbar={'Navbar'}></NotificationModal>
            
                <img onClick={()=> setShowDropdown(!showDropdown)} src={session?.user?.photo} alt={session?.user?.name} className='w-10 h-10 rounded-full border-2 border-emerald-400' />
                { showDropdown && <ProfileDropdown user={session?.user}></ProfileDropdown> }
               </>
          ):(
            <>  
            {/* Login */}
              <Link href={'/Login'}>
                <button className="text-gray-300 hover:text-white transition">
                  Login
                </button>
              </Link>
              {/* Regsiter */}
              <Link href={'/Register'}>
                <Button className={'primary'}>
                  Get Started
                </Button>
              </Link>
            </>
          )
        }    
         </div>
                    </div>

      </div>

    </nav>
  );
};

export default Navbar;