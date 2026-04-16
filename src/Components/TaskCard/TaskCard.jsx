import { Clock, Coins, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ApplyFormModal from '../Ui/ApplyFormModal'
import Image from 'next/image'

const TaskCard = ({ task }) => {
  if (!task) return null;

  return (
    <div className="group bg-[#0a2f27]/30 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={task.task_image || 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80'} 
          alt={task?.task_title || "Task Thumbnail"} 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#011612] via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
            Verified
          </span>
          <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter shadow-lg backdrop-blur-md ${
            task.status === 'active' ? 'bg-blue-500/80 text-white' : 'bg-rose-500/80 text-white'
          }`}>
            {task?.status || 'unknown'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
             <Coins className="w-4 h-4 text-emerald-400" />
             <span className="text-emerald-400 font-black text-sm">{task.payable_amount}</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-[11px]">
             <Clock className="w-3.5 h-3.5" /> {task.completion_date}
          </div>
        </div>

        <h3 className="text-xl font-bold text-emerald-50 mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
          {task?.task_title}
        </h3>
        
        <p className="text-sm text-emerald-100/50 mb-6 line-clamp-2 leading-relaxed font-light">
          {task?.task_detail}
        </p>

        <div className="flex items-center gap-4 text-[11px] text-white/30 mb-6 pb-6 border-b border-emerald-500/5">
          <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
            <Users className="w-3 h-3 text-emerald-500" /> {task.required_workers} Spots
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <Link href={`/all-tasks/${task._id}`} className="flex-1">
            <button className="w-full group/btn flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
              Details <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
          
      
            <ApplyFormModal taskId={task?._id} taskTitle={task?.task_title} />
          
        </div>
      </div>
    </div>
  )
}

export default TaskCard;