import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#011612] animate-pulse">
      
      {/* 1. Header Section Skeleton */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4 text-center">
          {/* Title Skeleton */}
          <div className="h-16 md:h-20 w-3/4 max-w-2xl bg-emerald-500/10 rounded-2xl mx-auto mb-6"></div>
          {/* Subtitle Skeleton */}
          <div className="h-5 w-full max-w-md bg-white/5 rounded-lg mx-auto"></div>
        </div>
      </section>

      {/* 2. Featured Post Skeleton */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="w-full h-[400px] md:h-[550px] rounded-[3rem] bg-emerald-950/20 border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-3xl space-y-4">
              {/* Badge & Date */}
              <div className="flex gap-3">
                <div className="h-6 w-24 bg-emerald-500/20 rounded-full"></div>
                <div className="h-6 w-32 bg-white/5 rounded-full"></div>
              </div>
              {/* Title */}
              <div className="h-10 md:h-14 w-full bg-white/10 rounded-xl"></div>
              <div className="h-10 md:h-14 w-2/3 bg-white/10 rounded-xl"></div>
              {/* Excerpt (Desktop) */}
              <div className="hidden md:block space-y-2">
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
                <div className="h-4 w-4/5 bg-white/5 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Regular Posts Grid Skeleton */}
      <section className="py-20 bg-black/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#062c24]/50 rounded-[2rem] overflow-hidden border border-emerald-500/5 h-[500px] flex flex-col">
                {/* Image Area */}
                <div className="h-60 w-full bg-emerald-950/40 relative">
                   <div className="absolute top-4 left-4 h-6 w-20 bg-black/40 rounded-lg"></div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 space-y-5 flex-grow">
                  {/* Meta (Author/Date) */}
                  <div className="flex gap-4">
                    <div className="h-3 w-20 bg-white/10 rounded-full"></div>
                    <div className="h-3 w-20 bg-white/10 rounded-full"></div>
                  </div>
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-white/10 rounded-lg"></div>
                    <div className="h-6 w-2/3 bg-white/10 rounded-lg"></div>
                  </div>
                  {/* Excerpt */}
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-md"></div>
                    <div className="h-3 w-full bg-white/5 rounded-md"></div>
                    <div className="h-3 w-3/4 bg-white/5 rounded-md"></div>
                  </div>
                  {/* Footer Link */}
                  <div className="mt-auto pt-4">
                    <div className="h-4 w-24 bg-emerald-500/10 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogSkeleton;