"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Image, ArrowRight, EyeOff, Eye } from "lucide-react";
import GoogleButton from "@/Components/GoogleButton/GoogleButton";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
   const [selectRole,setSelectRole]=useState(' ')


     const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const handleRegister=async(data)=>{
      console.log(data)
  }
  const inputStyle =
    "w-full border-2 border-gray-200 rounded-xl py-3 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

  return (
   <>
   
    <div className="min-h-screen  pt-40  bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 ">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="text-center mb-5">
          <Link href="/" className="text-2xl font-bold text-emerald-500">
            TaskFlow
          </Link>
          <p className="text-gray-500 text-sm mt-1">
            Create your account and start earning.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
          
          {/* Two Column */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* Name */}
            <div>
              <label className="text-xs text-gray-600">Full Name</label>
              <div className="relative mt-1 ">
                <User className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="John" className={inputStyle} {...register('name')} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input type="email" placeholder="you@example.com" className={inputStyle} {...register('email')} />
              </div>
            </div>

            {/* Photo URL */}
            <div className="col-span-2">
              <label className="text-xs text-gray-600">Photo</label>
              <div className="relative mt-1">
                <Image className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                <input type="file" className={inputStyle} {...register('photo')} />
              </div>
            </div>

          </div>


          {/* Password */}
          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 characters"
                className={inputStyle}
                {...register('password')}
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

          {/* Role */}
        

           {/* Role */}
          <div className="grid grid-cols-2 gap-3">

            {
                 [' Worker',' Buyer'].map((role,index)=><>
                 
                   <button
              type="button"
              value={selectRole}
              {...register('role')}
              
              onClick={()=>{setSelectRole(role)
                setValue('role',role)
              }}
              className={`py-3 
                rounded-xl border text-sm 
                ${selectRole==role?'border-emerald-500 bg-emerald-100 text-emerald-600':'border-gray-300 text-gray-500'}`}
     >
               {role==='Worker' ? '👷 ' : ' 🧑‍💼 '}{role}
            </button>
                  </>)
            }
          
          </div>
          


          

          {/* Button */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center">
            Create Account
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>

        </form>
<GoogleButton></GoogleButton>
        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?
          <Link href="/login" className="text-emerald-500 ml-1">
            Sign In
          </Link>
        </p>

      </div>
    </div>
   
   </>
  );
};

export default RegisterForm;