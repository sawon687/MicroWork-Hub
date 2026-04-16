import React from "react";

const TaskCardSkeleton = ({ count = 9 }) => {
  return (
    // প্যারেন্ট ডিভ-এ গ্রিড লেআউট যুক্ত করা হয়েছে যা রেসপনসিভ
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 w-full">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-[#0a2f27]/30 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-emerald-500/5 flex flex-col h-full animate-pulse shadow-2xl shadow-black/10"
        >
          {/* Image Skeleton - TaskCard এর মতো rounded-t এবং হাইট */}
          <div className="relative h-52 w-full overflow-hidden bg-emerald-950/40">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            
            {/* Badges Skelton */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <div className="h-5 w-16 bg-emerald-500/10 rounded-full border border-emerald-500/20"></div>
              <div className="h-5 w-16 bg-blue-500/10 rounded-full border border-blue-500/20"></div>
            </div>
            
            {/* Bottom Gradient Overlay Skeleton */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#011612] via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6 flex flex-col flex-grow">
            
            {/* Coin and Date Metada Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-7 w-20 bg-emerald-500/10 rounded-lg border border-emerald-500/10"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>

            {/* Title Skeleton - ২ লাইনের জন্য */}
            <div className="h-7 w-full bg-white/10 rounded-lg mb-2.5"></div>
            <div className="h-7 w-3/4 bg-white/10 rounded-lg mb-4"></div>

            {/* Description Skeleton - ২ লাইনের জন্য */}
            <div className="h-4 w-full bg-emerald-100/10 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-emerald-100/10 rounded mb-6"></div>

            {/* Metadata (Workers Spot) Skeleton */}
            <div className="h-6 w-24 bg-white/5 rounded-md mb-6 mt-auto"></div>

            {/* Buttons Skeleton */}
            <div className="flex gap-3">
              <div className="h-11 flex-1 bg-emerald-500/5 rounded-xl border border-emerald-500/10"></div>
              <div className="h-11 flex-1 bg-emerald-500/5 rounded-xl border border-emerald-500/10"></div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCardSkeleton;