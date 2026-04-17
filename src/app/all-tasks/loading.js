import React from 'react';
import TaskCardSkeleton from '../../Components/LoadingAll/TaskCardSkeleton ';

const AllTasksSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-[#011612] px-6 md:px-20 animate-pulse">
      
      {/* --- 1. Header Area Match (Title & Subtitle) --- */}
      <div className="pt-24 pb-16 space-y-6">
        {/* Top Badge Skeleton */}
        <div className="h-7 w-48 bg-emerald-500/10 border border-emerald-500/20 rounded-full"></div>
        
        {/* Main Heading Skeleton */}
        <div className="space-y-3">
          <div className="h-16 md:h-20 w-full max-w-2xl bg-white/5 rounded-2xl"></div>
          
        </div>

        {/* Subtitle Skeleton */}
        <div className="h-5 w-full max-w-xl bg-white/5 rounded-lg"></div>
      </div>

      {/* --- 2. Filter Card Skeleton (Search & Category) --- */}
      <div className="mb-12 p-1 md:p-2 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-2xl">
        <div className="bg-[#0a2f27]/40 rounded-[1.8rem] p-4 md:p-8 border border-emerald-500/10">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col lg:flex-row items-center w-full gap-8">
              
              {/* Search Box Skeleton */}
              <div className="h-16 w-full lg:w-[480px] bg-[#011612]/60 border border-emerald-500/10 rounded-2xl"></div>
              
              {/* Category Pills Skeleton */}
              <div className="flex flex-wrap items-center gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-11 w-24 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"></div>
                ))}
              </div>
            </div>

            {/* Sort Bar Footer Skeleton */}
            <div className="flex items-center justify-between border-t border-emerald-500/5 pt-6">
              <div className="h-4 w-40 bg-white/10 rounded-full"></div>
              <div className="h-10 w-36 bg-white/5 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Grid Layout Match --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 py-10">
        {[...Array(9)].map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>

      {/* --- 4. Pagination Footer --- */}
      <div className="flex justify-center mt-10 py-16 border-t border-emerald-500/5">
        <div className="h-14 w-80 bg-white/5 rounded-2xl border border-white/5"></div>
      </div>

    </div>
  );
};

export default AllTasksSkeleton;