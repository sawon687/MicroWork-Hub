import React from 'react'
const  Button=({ children })=> {
  return (
    <>
    <button className='bg-gradient-to-r from-emerald-500 to-teal-400 hover:bg-emerald-500 text-white px-5 py-2 rounded-full font-bold transition' >
      {children}
    </button>
    </>
  )
}

export default Button