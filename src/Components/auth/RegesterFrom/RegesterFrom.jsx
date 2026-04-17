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
import MessageModal from "../../Ui/MessageModal";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectRole, setSelectRole] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen,setOpen]=useState(false);
  const [message,setMessage]=useState('')
  const [modalType,setModalType]=useState('')
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

  // ✅ FIXED HANDLE REGISTER
  const handleRegister = async (data) => {
    try {
      setLoading(true);

      let imageUrl = "";

      const photo = data.photo?.[0];

      // 👉 Upload Image (optional)
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imgData = await res.json();
        imageUrl = imgData.data?.display_url;
      }

      data.photo = imageUrl;

      // 👉 Call Signup API
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {

        // 👉 Auto Login
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
           setMessage( result.message || "Account created successfully",)
        setModalType("success");
        setOpen(true);     
      } else {
        setMessage(result.message);

       setModalType("error");      }
    } catch (error) {
      console.log("🔥 ERROR:", error);

      setMessage({
        success: false,
        message: "Something went wrong!",
      });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border-2 border-gray-200 rounded-xl py-3 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center px-4">

        {/* Back Button */}
        <div className="absolute top-6 left-4">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white">
              <ArrowLeft size={16} /> Back
            </button>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-emerald-500">
              TaskFlow
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">

            {/* Name */}
            <input
              placeholder="Name"
              className={inputStyle}
              {...register("name", { required: "Name required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* Email */}
            <input
              placeholder="Email"
              className={inputStyle}
              {...register("email", { required: "Email required" })}
            />

            {/* Photo */}
            <input
              type="file"
              {...register("photo")}
              className={inputStyle}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-16 h-16 rounded-full mx-auto"
              />
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputStyle}
                {...register("password", {
                  required: "Password required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Strength */}
            <div className="text-xs">
              <p>{hasLength ? "✔" : "❌"} 6 char</p>
              <p>{hasUppercase ? "✔" : "❌"} Uppercase</p>
              <p>{hasNumber ? "✔" : "❌"} Number</p>
              <p>{hasSymbol ? "✔" : "❌"} Symbol</p>
            </div>

            {/* Role */}
            <div className="flex gap-2">
              {["Worker", "Buyer"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectRole(role);
                    setValue("role", role, { shouldValidate: true });
                  }}
                  className={`p-2 border ${
                    selectRole === role ? "bg-green-200" : ""
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {!selectRole && (
              <p className="text-red-500 text-xs">Role required</p>
            )}

            {/* Submit */}
            <button
              disabled={!isValid || !selectRole || loading}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        </motion.div>
      </div>

       <MessageModal isOpen={isOpen} onClose={() => setOpen(false)} message={message} type={modalType} />

    </>
  );
};

export default RegisterForm;