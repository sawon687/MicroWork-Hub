
import { ArrowLeft, Clock, Coins, FileText, Send, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import AnimatedTitle from '../../../Components/Ui/AnimatedTitle';
import ApplyFormModal from '../../../Components/Ui/ApplyFormModal';
const getTaskItem=async(id)=>{
   const result=await (await fetch(`http://localhost:3000/api/all-task/${id}`)).json()
      console.log('task de',result.data)
   return result.data
}
const page = async({params}) => {
const {id}=await params
console.log('id task details',id)
const task=await getTaskItem(id) || {}
console.log('task details',task)
  return (
   
    <div className="min-h-screen relative z-10 bg-[#0a0a0a] text-white font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-emerald-900/20 to-transparent pt-24  pb-12">
        <div className="container mx-auto px-10">
          <Link
            href={"/all-task" }
            className="inline-flex items-center gap-2 text-sm mb-6 py-5 text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Tasks
          </Link>
          
        

        <AnimatedTitle title={task?.task_title}></AnimatedTitle>

          <div className="flex flex-wrap gap-3 ">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold">
              <Coins className="w-5 h-5" /> {task?.payable_amount} Coins
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-300">
              <Users className="w-4 h-4" /> {task?.required_workers} Workers
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-300">
              <Clock className="w-4 h-4" />Completion date: {task?.completion_date}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto bg-gray-100 px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-2 space-y-6">
            {task?.task_image && (
              <img 
                src={task?.task_image }
                alt="task" 
                className="w-full rounded-3xl object-cover shadow-2xl border border-white/5 max-h-[450px]"
              />
            )}

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-500">
                <FileText className="w-5 h-5" /> Task Description
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {task?.task_detail}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-white/5 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-emerald-500">How to Submit?</h2>
              <p className="text-gray-400 leading-relaxed">
                {task?.submission_requirement|| "Follow the instructions above and click apply to submit your work proof."}
              </p>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="relative">
            <div className="sticky  top-28 bg-white rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="text-center pb-6 border-b border-white/5">
          
                <div className="text-5xl font-black text-emerald-400 mt-1">
                  ${task?.payable_amount}
                </div>
                 <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">coins per submission</span>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Category</span>
                  <span className="font-bold text-emerald-500">{task.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className="px-3  rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase">
                    {task?.status || 'Active'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Deadline</span>
                  <span className="text-gray-900">{task.completion_date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Posted</span>
                  <span className="text-gray-900">Recently</span>
                </div>
              </div>

               <ApplyFormModal taskID={task._id} payable_amount={task.payable_amount}></ApplyFormModal>
                
                 <p className="text-[10px] text-center text-gray-600 font-medium">
                By clicking, you agree to our Terms of Service
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page;