import React from 'react';

const TaskDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#010a09] animate-pulse">
      
      {/* --- Header Section Skeleton --- */}
      <div className="relative pt-32 pb-16 border-b border-emerald-500/10">
        <div className="container mx-auto px-6 md:px-12">
          {/* Back Button Skeleton */}
          <div className="h-4 w-32 bg-white/5 rounded-md mb-8"></div>
          
          <div className="max-w-4xl space-y-6">
            {/* Title Skeleton */}
            <div className="h-12 md:h-16 w-full bg-white/5 rounded-2xl"></div>
            <div className="h-12 md:h-16 w-2/3 bg-white/5 rounded-2xl"></div>
            
            {/* Badges Skeleton */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="h-10 w-32 bg-emerald-500/20 rounded-2xl"></div>
              <div className="h-10 w-40 bg-white/5 rounded-2xl"></div>
              <div className="h-10 w-40 bg-white/5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Skeleton --- */}
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Side Skeleton */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image Skeleton */}
            <div className="w-full h-[400px] md:h-[500px] bg-white/5 rounded-[2.5rem] border border-white/5"></div>

            {/* Description Card Skeleton */}
            <div className="bg-white/[0.02] rounded-[2rem] p-8 md:p-10 border border-white/5 space-y-6">
              <div className="h-8 w-48 bg-emerald-500/10 rounded-lg"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
                <div className="h-4 w-3/4 bg-white/5 rounded-md"></div>
              </div>
            </div>

            {/* Instruction Card Skeleton */}
            <div className="bg-white/[0.01] rounded-[2rem] p-8 md:p-10 border border-white/5 space-y-4">
              <div className="h-8 w-56 bg-emerald-500/10 rounded-lg"></div>
              <div className="h-24 w-full bg-emerald-500/[0.02] rounded-2xl border border-emerald-500/5"></div>
            </div>
          </div>

          {/* Right Side Sidebar Skeleton */}
          <div className="relative">
            <div className="bg-white/[0.03] rounded-[2.5rem] p-8 border border-white/10 space-y-8">
              {/* Reward Skeleton */}
              <div className="text-center space-y-3">
                <div className="h-3 w-24 bg-white/10 mx-auto rounded-full"></div>
                <div className="h-16 w-32 bg-white/10 mx-auto rounded-2xl"></div>
                <div className="h-3 w-32 bg-white/5 mx-auto rounded-full"></div>
              </div>

              {/* Info List Skeleton */}
              <div className="space-y-6 py-6 border-t border-white/5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 bg-white/5 rounded-md"></div>
                    <div className="h-4 w-24 bg-white/10 rounded-md"></div>
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="h-14 w-full bg-emerald-500/20 rounded-2xl shadow-lg shadow-emerald-500/5"></div>
              
              <div className="h-3 w-3/4 bg-white/5 mx-auto rounded-full"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TaskDetailSkeleton;