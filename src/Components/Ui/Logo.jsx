
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        {/* --- 1. LOGO SECTION --- */}
             <Link href="/" className="flex items-center gap-3 group cursor-pointer">
               <div className="relative flex items-center justify-center">
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
               </div>
     
               <div className="flex flex-col">
                 <h1 className="text-xl font-black tracking-tighter leading-none flex items-center">
                   <span className="text-white">TASK</span>
                   <span className="text-emerald-500 italic ml-0.5">FLOW</span>
                 </h1>
                 <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30 mt-0.5 leading-none">
                   Empowering Productivity
                 </p>
               </div>
             </Link>
     
    </div>
  )
}

export default Logo