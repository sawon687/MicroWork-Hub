'use client'
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. Sidebar Skeleton (White) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 p-6 space-y-8 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded-lg mb-10"></div> {/* Logo */}
        
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-100 rounded"></div>
              <div className="h-4 w-28 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        
        {/* 2. Topbar Skeleton */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 animate-pulse">
          <div className="h-6 w-56 bg-gray-100 rounded-md"></div>
          <div className="flex items-center gap-4">
            <div className="h-5 w-5 bg-gray-100 rounded-full"></div> {/* Notification */}
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div> {/* Profile */}
            <div className="h-10 w-28 bg-emerald-500/10 rounded-xl"></div> {/* Action Button */}
          </div>
        </header>

        {/* 3. Dashboard Content */}
        <div className="p-8 space-y-8 overflow-y-auto">
          
          {/* Stats Cards Skeleton - White/Shadow Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
                <div className="h-4 w-24 bg-gray-100 rounded mb-4"></div>
                <div className="h-8 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-50 rounded"></div>
              </div>
            ))}
          </div>

          {/* Large Charts/Tables Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
            
            {/* Left Content (Main Table/Chart) */}
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[2rem] p-8 h-80 relative overflow-hidden shadow-sm">
                <div className="h-6 w-44 bg-gray-100 rounded mb-8"></div>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 w-full bg-gray-50 rounded-xl border border-gray-100/50"></div>
                    ))}
                </div>
                {/* Shimmer Effect (Light Mode) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>

            {/* Right Content (Activities) */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-8 h-80 shadow-sm">
                <div className="h-6 w-36 bg-gray-100 rounded mb-8"></div>
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-10 w-10 bg-gray-100 rounded-full shrink-0"></div>
                            <div className="space-y-2 w-full">
                                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                <div className="h-3 w-1/2 bg-gray-50 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLoading;