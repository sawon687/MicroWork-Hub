"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";

import GoogleButton from "@/Components/GoogleButton/GoogleButton";
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import MessageModal from '../../Ui/MessageModal';
export default function Login() {
  


  const [loading, setLoading] = useState(false);
  const [isOpen,setOpen]=useState(false);
  const [message,setMessage]=useState('')
  const [modalType,setModalType]=useState('')
  const[showPassword, setShowPassword]=useState()
  const router=useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  const handleLogin = async (data) => {
    try { 
      
       setLoading(true)
    const result = await signIn('credentials',{
           email: data?.email,
           password: data?.password,
           redirect:false
      
        })
      if (result?.ok) {
        setModalType("success");
           setMessage("Login Successful 🎉");
       setOpen(true);
           router.push("/");
} else {
  setModalType("error");
  setMessage(result.error || "Something went wrong");
  setOpen(true);
}

        console.log('result data ',result)
    } catch (error) {
        console.log('🔥 ERROR:', error);
      setLoading(false)
    }finally{
      setLoading(false)
    }

   
  
  };

  // const handleGoogleLogin = async () => {
  //   const { error } = await supabase.auth.sign({
  //     provider: "google",
  //   });

  //   if (error) {
  //     alert(error.message);
      
  //   }
  // };

  return (
     <>
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
        <form onSubmit={ handleSubmit(handleLogin)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border-2 border-gray-200 rounded-xl py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-emerald-500"
                 {...register('email',{
                  required:true
                 })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                 type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-xl py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-emerald-500"
                {...register('password',{
                  required: true
                })}
              />
               <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-4 text-gray-400"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
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
    <MessageModal isOpen={isOpen} onClose={() => setOpen(false)} message={message} type={modalType} />
   </>
  );
}