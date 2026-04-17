'use client'
import React from 'react';

const SkeletonHome = () => {
  return (
    <div className="w-full min-h-screen bg-[#050505] space-y-32 pb-20 overflow-hidden">
      
      {/* 1. Hero Skeleton - More Dynamic & Centered */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        {/* Background Glow Effect */}
        <div className="absolute top-0 -z-10 h-[500px] w-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        
        {/* Badge */}
        <div className="h-7 w-40 bg-emerald-500/20 border border-emerald-500/20 animate-pulse rounded-full mb-8"></div>
        
        {/* Main Heading Lines */}
        <div className="space-y-4 mb-8 w-full flex flex-col items-center">
          <div className="h-16 md:h-20 w-full max-w-4xl bg-gradient-to-r from-slate-200/20 via-slate-200/10 to-slate-200/20 rounded-2xl"></div>
          <div className="h-16 md:h-20 w-3/4 max-w-2xl bg-gradient-to-r from-slate-200/20 via-slate-200/10 to-slate-200/20 rounded-2xl"></div>
        </div>
        
        {/* Subtext */}
        <div className="h-5 w-full max-w-lg bg-slate-200/5 rounded-lg mb-12"></div>
        
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-5">
          <div className="h-14 w-48 bg-emerald-500/20 rounded-xl border border-emerald-500/30"></div>
          <div className="h-14 w-48 bg-white/5 rounded-xl border border-white/10"></div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl border-t border-white/5 pt-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3 flex flex-col items-center">
                 <div className="h-10 w-24 bg-slate-200/10 rounded-lg"></div>
                 <div className="h-4 w-20 bg-slate-200/5 rounded-md"></div>
              </div>
            ))}
        </div>
      </section>

      {/* 2. Features Skeleton - Grid with Card feel */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20 space-y-4">
          <div className="h-10 w-72 bg-slate-200/10 rounded-2xl"></div>
          <div className="h-4 w-96 bg-slate-200/5 rounded-lg"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-6 overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-14 w-14 bg-emerald-500/10 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="h-6 w-2/3 bg-slate-200/10 rounded-lg"></div>
                <div className="h-4 w-full bg-slate-200/5 rounded-lg"></div>
                <div className="h-4 w-4/5 bg-slate-200/5 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Top Workers Skeleton - User Cards */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
             <div className="h-10 w-64 bg-slate-200/10 rounded-2xl"></div>
             <div className="h-4 w-80 bg-slate-200/5 rounded-lg"></div>
          </div>
          <div className="h-12 w-32 bg-white/5 rounded-xl hidden md:block"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-5 p-5 bg-white/[0.03] border border-white/5 rounded-2xl shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shrink-0 border border-white/10"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 w-28 bg-slate-200/10 rounded-md"></div>
                <div className="h-3 w-40 bg-slate-200/5 rounded-md"></div>
              </div>
              <div className="h-8 w-12 bg-emerald-500/10 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SkeletonHome;