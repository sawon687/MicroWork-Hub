'use client'
import React from 'react'
import MytaskCard from '../../../Components/MytaskCard/MytaskCard'
import { FaPlus, FaRocket, FaListUl } from 'react-icons/fa';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import NormalLoading from '../../../Components/LoadingAll/NormalLoading';

const page =() => {


  const {data:myTasks=[],isLoading,refetch}=useQuery({
    queryKey:['my-task'],
    queryFn:async()=>{
       const result=await( (await fetch(`http://localhost:3000/api/my-task`))).json()

       return result.data}
})

if(isLoading)
{
  <NormalLoading></NormalLoading>
}

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Top Background Gradient Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-100/50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-12">
        
        {/* Page Header: Modern & Compact */}
        <div className="relative mb-12 overflow-hidden bg-slate-900 rounded-xl p-8 md:p-12 shadow-2xl shadow-slate-200">
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <FaRocket className="animate-bounce" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Employer Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                My <span className="text-emerald-400">Campaigns</span>
              </h1>
              <p className="text-slate-400 font-medium max-w-md">
                Monitor performance, manage submissions, and scale your tasks efficiently.
              </p>
            </div>

            <Link href="/dashboard/add-task">
              <button className="group bg-emerald-400 hover:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black transition-all duration-300 shadow-[0_10px_30px_rgba(52,211,153,0.3)] flex items-center gap-3 hover:-translate-y-1 active:scale-95">
                <div className="bg-white/30 p-1.5 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                  <FaPlus size={14} />
                </div>
                CREATE NEW TASK
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Summary (Optional but Professional) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <p className="text-2xl font-black text-slate-800">{myTasks?.length}</p>
          </div>
         
        </div>

        {/* Task List Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <FaListUl /> Active Listings
            </div>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {myTasks && myTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {myTasks.map((task) => (
                <MytaskCard task={task} refetch={refetch} key={task._id} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="bg-slate-50 p-8 rounded-full mb-6">
                <FaListUl className="text-slate-300 size-12" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Tasks Found</h3>
              <p className="text-slate-500 mb-8 text-center max-w-xs">
                You haven't posted any tasks yet. Start by creating your first campaign!
              </p>
              <Link href="/dashboard/add-task" className="text-emerald-500 font-bold hover:underline">
                Create Task Now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default page;