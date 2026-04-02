import React from 'react'
const  Button=({ children ,className, ...props })=> {
  return (
    <>
    <button 
   
    {...props}
    className={`${className==='primary' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:bg-emerald-500' : className==='secondary' ? 'bg-gray-800/60 hover:bg-gray-700 border border-gray-600' : ''}
     text-white px-5 py-2 rounded-xl font-bold transition`} >
      {children}
    </button>
    </>
  )
}

export default Button