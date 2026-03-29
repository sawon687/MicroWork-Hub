"use client";
import Link from "next/link";

const Navbar = () => {
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
          <Link href={'/Login'}>
          <button className="text-gray-300 hover:text-white transition">
            Login
          </button>
          </Link>
         <Link href={'/Register'}
>
   <button className="bg-emerald-400 hover:bg-emerald-500 text-black px-5 py-2 rounded-full font-semibold transition">
            Get Started
          </button>
  </Link>        </div>
      </div>
    </nav>
  );
};

export default Navbar;