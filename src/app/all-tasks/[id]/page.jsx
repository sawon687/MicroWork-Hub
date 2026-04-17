import { ArrowLeft, Clock, Coins, FileText, Send, Users, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import AnimatedTitle from '../../../Components/Ui/AnimatedTitle';
import ApplyFormModal from '../../../Components/Ui/ApplyFormModal';

const getTaskItem = async (id) => {
  const result = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-task/${id}`)).json()
  return result.data
}

const page = async ({ params }) => {
  const { id } = await params
  const task = await getTaskItem(id) || {}

  return (
    <div className="min-h-screen bg-[#010a09] text-white font-sans selection:bg-emerald-500/30">
      
      {/* --- Header Section --- */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-emerald-500/10">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-emerald-500/10 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link
            href={"/all-tasks"}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-500/60 hover:text-emerald-400 transition-all mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Explore Tasks
          </Link>

          <div className="max-w-4xl">
            <AnimatedTitle title={task?.task_title} className="text-4xl md:text-6xl font-black tracking-tight mb-8" />
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Coins className="w-5 h-5" /> {task?.payable_amount} Coins
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-emerald-100/80 backdrop-blur-md">
                <Users className="w-4 h-4" /> {task?.required_workers} Workers Needed
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-emerald-100/80 backdrop-blur-md">
                <Clock className="w-4 h-4" /> Due: {task?.completion_date}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-2 space-y-10">
            {/* Task Banner Image */}
            {task?.task_image && (
              <div className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src={task?.task_image}
                  alt="task" 
                  className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010a09]/80 to-transparent" />
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
                <FileText className="w-6 h-6" /> Task Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-emerald-50/60 leading-relaxed text-lg font-light">
                  {task?.task_detail}
                </p>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="bg-emerald-500/[0.02] backdrop-blur-3xl rounded-[2rem] p-8 md:p-10 border border-emerald-500/10 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="w-6 h-6" /> Submission Instructions
              </h2>
              <p className="text-emerald-50/60 leading-relaxed text-lg font-light italic bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                {task?.submission_requirement || "Please ensure all steps are followed correctly. Provide high-quality proof as requested to ensure quick approval."}
              </p>
            </div>
          </div>

          {/* Right Side: Action Sidebar */}
          <div className="relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl text-center">
                <div className="mb-8">
                  <span className="text-emerald-500/60 text-xs font-bold uppercase tracking-[0.2em]">Reward Amount</span>
                  <div className="text-6xl font-black text-white mt-2 flex justify-center items-start gap-1">
                    <span className="text-2xl mt-2 text-emerald-400">$</span>
                    {task?.payable_amount}
                  </div>
                  <div className="mt-2 text-emerald-400/40 text-sm font-medium">Equates to Task Coins</div>
                </div>

                <div className="space-y-4 py-6 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40">Category</span>
                    <span className="font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg">{task.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40">Task Status</span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500 text-black text-[10px] font-black uppercase">
                      {task?.status || 'Active'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40">Closing Date</span>
                    <span className="text-white font-medium">{task.completion_date}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <ApplyFormModal taskID={task._id} payable_amount={task.payable_amount} />
                </div>
                
                <p className="mt-6 text-[10px] text-white/20 font-medium leading-relaxed">
                  By applying, you confirm you have read the instructions. Fraudulent submissions will result in account suspension.
                </p>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-white/20">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified Task Provider</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Footer Glow */}
      <div className="h-40 bg-gradient-to-t from-emerald-500/5 to-transparent" />
    </div>
  )
}

export default page;