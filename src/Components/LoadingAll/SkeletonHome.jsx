'use client'
import React from 'react';

const SkeletonHome = () => {
  return (
    <div className="w-full space-y-24 bg-black animate-pulse">
      
      {/* 1. Hero Skeleton */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="h-8 w-32 bg-emerald-500/10 rounded-full mb-6"></div>
        <div className="h-16 md:h-24 w-full max-w-3xl bg-slate-200/20 rounded-3xl mb-4"></div>
        <div className="h-16 md:h-24 w-2/3 max-w-xl bg-slate-200/20 rounded-3xl mb-8"></div>
        <div className="h-6 w-full max-w-lg bg-slate-200/10 rounded-lg mb-10"></div>
        <div className="flex gap-4">
          <div className="h-14 w-44 bg-slate-200/20 rounded-2xl"></div>
          <div className="h-14 w-44 bg-slate-200/10 rounded-2xl"></div>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl border-t border-white/5 pt-10">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="space-y-3 flex flex-col items-center">
                <div className="h-8 w-20 bg-slate-200/20 rounded-lg"></div>
                <div className="h-4 w-24 bg-slate-200/10 rounded-lg"></div>
             </div>
           ))}
        </div>
      </section>

      {/* 2. Features Skeleton */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center mb-16 gap-4">
          <div className="h-10 w-64 bg-slate-200 rounded-xl"></div>
          <div className="h-4 w-96 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-white border border-gray-100 rounded-2xl p-8 space-y-4">
              <div className="h-12 w-12 bg-slate-100 rounded-xl"></div>
              <div className="h-6 w-1/2 bg-slate-200 rounded-lg"></div>
              <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How It Works Skeleton */}
      <section className="bg-muted/30 py-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16 gap-3">
             <div className="h-10 w-48 bg-slate-200 rounded-xl"></div>
             <div className="h-4 w-64 bg-slate-100 rounded-lg"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-14 w-14 bg-emerald-100/50 rounded-full mx-auto"></div>
                <div className="h-6 w-3/4 bg-slate-200 rounded-lg mx-auto"></div>
                <div className="h-4 w-full bg-slate-100 rounded-lg mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Workers Skeleton */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center mb-16 gap-3">
             <div className="h-10 w-48 bg-slate-200 rounded-xl"></div>
             <div className="h-4 w-64 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-6 border border-gray-100 rounded-2xl">
              <div className="w-14 h-14 bg-slate-200 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-24 bg-slate-200 rounded-md"></div>
                <div className="h-3 w-32 bg-slate-100 rounded-md"></div>
              </div>
              <div className="h-6 w-16 bg-emerald-50 rounded-md"></div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SkeletonHome;