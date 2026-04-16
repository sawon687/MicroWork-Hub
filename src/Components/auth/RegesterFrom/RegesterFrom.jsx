"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Image,
  ArrowRight,
  EyeOff,
  Eye,
  CheckCircle,
  Circle,
  ArrowLeft,
} from "lucide-react";
import GoogleButton from "@/Components/GoogleButton/GoogleButton";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import MessageModal from '../../Ui/MessageModal';
import { signIn } from 'next-auth/react';
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectRole, setSelectRole] = useState("");
  const [preview, setPreview] = useState(null);
  const [isOpen,setOpen]=useState(false)
  const [message,setMessage]=useState("")
  const [loading,setLoading]=useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[@$!%*?&]/.test(password);
  const hasLength = password.length >= 6;

  const strength =
    [hasUppercase, hasNumber, hasSymbol, hasLength].filter(Boolean).length;

  const handleRegister = async (data) => {
   try {
    setLoading(true)
  
      const photo=data.photo?.[0];
      if(!photo)return alert("Photo is required!")
      const formData=new FormData();
      formData.append("image",photo)
   
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
        { method: "POST", body: formData }
      );

      const imgData=await res.json();
      data.photo=imgData.data?.display_url;
      console.log('after image uplaod',data)
    const result=await(await fetch("/api/sing-up",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })).json();
     if(result.success){
         setOpen(true);
         setMessage(result.message)
         
          setLoading(false)
            signIn("credentials",{
              email:data.email,
              password:data.password,
              redirect:'/',
            })

     }else{
       setMessage(result)
       setOpen(true);
       console.log('message',result)
       setLoading(false)
     }
   } catch (error) {
     console.log("🔥 ERROR:", error);
     
  }finally{
       setLoading(false)
  }
  };

  const inputStyle =
    "w-full border-2 border-gray-200 rounded-xl py-3 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

  return (
    <>
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-start px-4 relative">

   
      <div className="absolute top-6 left-4">
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 hover:bg-white/20 transition-all duration-200 shadow-sm hover:shadow-md">
            <ArrowLeft size={16} />
            Back
          </button>
        </Link>
      </div>

      {/* Form Card */}
      <motion.div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 mt-12"
       initial={{opacity:0,y:50}}
       animate={{opacity:1,y:0}}
       transition={{duration:1}}
      >
 
        {/* Header */}
        <div className="text-center mb-4">
          <Link href="/" className="text-2xl font-bold text-emerald-500">
            TaskFlow
          </Link>
          <p className="text-gray-500 text-sm mt-1">
            Create your account and start earning.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">

          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-2">
            {/* Name */}
            <div>
              <label className="text-xs text-gray-600">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="John"
                  className={inputStyle}
                  {...register("name", {
                    required: "Name is required ❌",
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputStyle}
                  {...register("email", {
                    required: "Email is required ❌",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email ❌",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Photo */}
            <div className="col-span-2">
              <label className="text-xs text-gray-600">Photo</label>
              <div className="relative mt-1">
                <Image className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input
                  type="file"
                  {...register("photo", {
                    required: "Photo is required ❌",
                  })}
                  className={inputStyle}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>

              {preview && (
                <img
                  src={preview}
                  className="w-16 h-16 rounded-full mt-2 mx-auto object-cover"
                />
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Strong password"
                className={inputStyle}
                {...register("password", {
                  required: "Password is required ❌",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                    message: "Weak password ❌",
                  },
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

            {/* Validation */}
            <div className="text-xs mt-2 space-y-1">
              <p className={`flex items-center gap-2 ${hasLength ? "text-emerald-500" : "text-gray-400"}`}>
                {hasLength ? <CheckCircle size={14} /> : <Circle size={14} />}
                At least 6 characters
              </p>
              <p className={`flex items-center gap-2 ${hasUppercase ? "text-emerald-500" : "text-gray-400"}`}>
                {hasUppercase ? <CheckCircle size={14} /> : <Circle size={14} />}
                Uppercase letter
              </p>
              <p className={`flex items-center gap-2 ${hasNumber ? "text-emerald-500" : "text-gray-400"}`}>
                {hasNumber ? <CheckCircle size={14} /> : <Circle size={14} />}
                Number
              </p>
              <p className={`flex items-center gap-2 ${hasSymbol ? "text-emerald-500" : "text-gray-400"}`}>
                {hasSymbol ? <CheckCircle size={14} /> : <Circle size={14} />}
                Symbol
              </p>
            </div>

            {/* Progress Bar */}
          {/* Progress Bar */} <div className="w-full bg-gray-200 h-4 rounded mt-2"> 

            <div className={`h-4 ${strength ? "bg-emerald-500" : ""} rounded transition-all flex justify-end items-center px-1`}
             style={{ width: `${strength * 25||0}%` }} >
               <span className="text-white text-xs font-medium">{`${strength * 25||0}%`}</span> 
               </div> </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="grid grid-cols-2 gap-3">
            {["Worker", "Buyer"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  setSelectRole(role);
                  setValue("role", role);
                }}
                className={`py-3 rounded-xl border-2 text-sm ${
                  selectRole === role
                    ? "border-emerald-500 bg-emerald-100 text-emerald-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {role === "Worker" ? "👷 Worker" : "🧑‍💼 Buyer"}
              </button>
            ))}
          </div>

          {errors.role && (
            <p className="text-red-500 text-xs">Role is required ❌</p>
          )}

          {/* Submit */}
          <button
            disabled={!isValid||loading}
            className={`w-full bg-emerald-500 hover:bg-emerald-600 ${
              !isValid || loading ? "opacity-50 cursor-not-allowed" : ""
            } text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center`}
          >
            {loading? "Creating Account...":"Create Account"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>

        

        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?
          <Link href="/Login" className="text-emerald-500 ml-1">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
    <MessageModal isOpen={isOpen}  onClose={()=>setOpen(false)} title={message.success?'success':'error'} message={message.message} />
    </>
  );
};

export default RegisterForm;