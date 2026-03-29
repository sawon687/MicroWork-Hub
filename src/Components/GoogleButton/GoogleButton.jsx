import React from 'react'
import { FcGoogle } from "react-icons/fc";
const GoogleButton = () => {
  return (
    <>
            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-400">or</span>
              </div>
            </div>
    
            {/* Google Login */}
            <button
              
              className="w-full border-2 border-gray-300 gap-2 rounded-xl py-3 hover:bg-gray-50 flex items-center justify-center"
            >
                  <FcGoogle size={20} />
             <span> Continue with Google</span>
            </button>
            </>
  )
}

export default GoogleButton