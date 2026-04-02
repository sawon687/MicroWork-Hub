"use client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
export default function Footer() {
  const pathname = usePathname();

  if(pathname ==="/Login" || pathname === "/Register"|| pathname.startsWith('/dashboard'))return null
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-300 pt-16 pb-8 px-6 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 relative z-10">

        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-3">
            TaskFlow
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Earn money by completing simple micro-tasks. Join thousands of
            workers and buyers worldwide.
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-4">
            {[FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 transition cursor-pointer"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold text-white mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-emerald-400 transition">Home</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition">Blog</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-white mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-emerald-400 transition">Login</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition">Register</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={14} /> support@taskflow.com
            </li>
            <li><Link href="#" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500 relative z-10">
        © 2026 TaskFlow. All rights reserved.
      </div>
    </footer>
  );
}