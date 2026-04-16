'use client'
import React from 'react'
const  Button=({ children ,className, ...props })=> {
  return (
    <>
    <button 
   
    {...props}
    className={`${className==='primary' ? 
      'bg-gradient-to-r from-emerald-500 to-teal-400 hover:bg-emerald-500 text-white' 
      : className==='secondary' ? 'bg-gray-800/60 hover:bg-gray-700 border border-gray-600 text-white' : 'bg-white border-white/70 text-gray-900 hover:bg-orange-400 hover:text-white'}
      px-6 py-3 rounded-xl font-bold transition`} >
      {children}
    </button>
    </>
  )
}

export default Button;