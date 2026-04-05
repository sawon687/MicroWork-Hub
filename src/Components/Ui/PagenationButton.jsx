'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const PagenationButton = ({pageNumber}) => {
     console.log('total task page',pageNumber)
     const [currentPage,setCurrentPage]=useState(1)
     const router=useRouter()
     const limit=9;
   useEffect(() => {

  router.push(`/all-task?limit=${limit}&page=${currentPage}`,{ scroll: false });
}, [currentPage, router]);
    return (
        <div className='max-w-4xl py-10 mx-auto'>
            <div className='flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                
                {/* Previous Button */}
                <button onClick={()=> setCurrentPage((prev)=>prev-1)}
                 className='group flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-orange-400 text-gray-700 bg-gray-900 text-white border border-gray-300 rounded-lg  hover:text-white font-bold transition-all duration-200 shadow-sm active:scale-95'>
                    <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>Previous</span>
                </button>

 

                {/* Page Numbers (Optional but makes it professional) */}
                <div className='hidden md:flex items-center gap-1'>
                    {[...Array(pageNumber)].map((_,page) => (
                        <button 
                            key={page} 
                            onClick={()=>setCurrentPage((prev)=> prev + 1)}
                            className={`px-4 py-2 text-sm font-medium border border-gray-300 shadow-md rounded-lg transition-colors ${page+1 === currentPage ? 'bg-gradient-to-r to-teal-400 from-emerald-400 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <span className='px-2 text-gray-400'>...</span>
                    <button className='px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100'>{pageNumber}</button>
                </div>

                {/* Next Button */}
                <button onClick={()=> setCurrentPage((prev)=> prev + 1)} className='group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-800 text-white border hover:bg-orange-400 border-gray-300 rounded-lg  hover:text-white transition-all duration-200 shadow-sm active:scale-95'>
                    <span>Next</span>
                    <HiOutlineArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

            </div>
        </div>
    );
}

export default PagenationButton;