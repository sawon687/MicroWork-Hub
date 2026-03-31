"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";

import GoogleButton from "@/Components/GoogleButton/GoogleButton";
import { motion } from "framer-motion";
export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(error.message);
      
    }
  };

  return (
    <div className="min-h-screen flex pt-20 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <motion.div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-emerald-500">
            TaskFlow
          </Link>
          <p className="text-gray-500 mt-2">
            Welcome back! Sign in to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border-2 border-gray-200 rounded-xl py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-xl py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium flex items-center justify-center"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>

      <GoogleButton></GoogleButton>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/Register"
            className="text-emerald-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  );
}