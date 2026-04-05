import React from 'react'

const LoadinSpaner = () => {
  return (
         <div className="flex justify-center items-center h-screen">
  <div className="relative">
    <div className="w-14 h-14 border-4 border-gray-200 rounded-full"></div>
    <div className="absolute top-0 left-0 w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
</div>
      
  )
}

export default LoadinSpaner