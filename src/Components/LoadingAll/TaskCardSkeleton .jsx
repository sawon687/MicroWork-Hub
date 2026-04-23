import React from "react";

const TaskCardSkeleton = () => {
  return (
    <div className="bg-[#0a2f27]/30 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-emerald-500/10 flex flex-col h-[520px] animate-pulse shadow-2xl">

      <div className="relative h-56 w-full bg-emerald-950/40">
        <div className="absolute top-5 left-6 flex gap-2">
          <div className="h-6 w-20 bg-emerald-500/20 rounded-full border border-emerald-500/20"></div>
          <div className="h-6 w-16 bg-blue-500/20 rounded-full border border-blue-500/20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#011612] to-transparent opacity-60"></div>
      </div>

  
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-24 bg-emerald-500/20 rounded-xl border border-emerald-500/20"></div>
          <div className="h-4 w-28 bg-white/10 rounded-full"></div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="h-7 w-full bg-white/10 rounded-lg"></div>
          <div className="h-7 w-2/3 bg-white/10 rounded-lg"></div>
        </div>

        <div className="space-y-2 mb-8">
          <div className="h-4 w-full bg-white/5 rounded-md"></div>
          <div className="h-4 w-5/6 bg-white/5 rounded-md"></div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-6">
          <div className="h-5 w-32 bg-white/5 rounded-md"></div>
          <div className="flex gap-4">
            <div className="h-12 flex-1 bg-white/5 rounded-2xl border border-white/5"></div>
            <div className="h-12 flex-1 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;



