'use client'
import { Clock, Coins, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ApplyFormModal from '../Ui/ApplyFormModal'

const TaskCard = ({ task }) => {

  if (!task) return null;
  console.log('task Task card',task)

  return (
    <div 
      className="bg-white w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 group"
    
    
    >

    
      {/* Image Section */}
      <div className="h-40 overflow-hidden bg-slate-100">
        <img 
          src={task.task_image || 'https://via.placeholder.com/400x300'} 
          alt={task.task_title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>

      <div className="p-6">
        {/* Status and Coins */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${
            task.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {task.status || 'unknown'}
          </span>
          <div className="flex items-center gap-1 text-blue-600 font-bold">
            <Coins className="w-4 h-4" /> {task.payable_amount}
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
          {task.task_title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {task.task_detail}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {task.required_workers} Workers
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {task.completion_date}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link href={`/all-task/${task._id}`} className="flex-1">
            <button className="w-full  cursor-pointer hover:bg-orange-400 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
              Details
            </button>
          </Link>
          
        <ApplyFormModal taskId={task?._id} task_coin={task?.payable_amount} taskTitle={task.task_title}></ApplyFormModal>
        </div>
      </div>
    </div>
  )
}

export default TaskCard;