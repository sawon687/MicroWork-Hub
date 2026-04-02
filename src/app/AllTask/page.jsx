import { Search } from 'lucide-react'
import React from 'react'
import CategoryButton from '../../Components/CategoryButtonandSort/CategoryButton'
import SortButton from '../../Components/CategoryButtonandSort/SortButton'


const page = () => {
  return (
     <div className="bg-gradient-to-r  from-[#0f172a] to-[#1e293b]  py-25  text-white p-8 ">
      
      {/* Title */}
      <h1 className="text-3xl text-gray-100 md:text-5xl font-bold mb-2">All Tasks</h1>
      <p className="text-gray-300 mb-6">
        Browse and apply for micro tasks to start earning
      </p>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-[420px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-gray-800/60 border border-gray-600 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Buttons */}
        <CategoryButton></CategoryButton>
      </div>

      {/* Sort */}
      <SortButton></SortButton>
    </div>
  )
}

export default page