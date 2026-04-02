'use client'
import React, { useState } from 'react'

const SortButton = () => {
    const[activeSort,setActiveSort]=useState('Newest')
  return (
       <div className="flex items-center gap-4 mt-5 text-sm">
        <span className="text-gray-400"> Sort by:</span>
           

              {
             ['Newest','Highest Pay','Deadline'].map((item,i)=>(
                           <button 
                             key={i} 
                             className={`px-3 py-1 rounded-full ${activeSort === item ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
                             onClick={() => setActiveSort(item)}
                           >
                              {item}
                            </button>
             ))
           }
           
       

     
      </div>
  )
}

export default SortButton