import Link from 'next/link';
import React from 'react';
import { 
  FaEdit, FaEye, FaUsers, FaCalendarAlt, 
  FaClock, FaTrashAlt, FaYoutube, FaPlus 
} from 'react-icons/fa';

const MyTaskCard = ({ task }) => {
  // Database checking and dynamic calculations
  const totalCost = task.payable_amount * task.required_workers;
  const completedWorkers = task.completed_workers || 0; // Jodi backend theke completed_workers field thake
  const submissionRate = (completedWorkers / task.required_workers) * 100;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 group mb-6">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Section: Content */}
        <div className="p-8 md:p-10 flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-emerald-50 text-emerald-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 shadow-sm flex items-center gap-2">
              <FaYoutube className="text-red-500" /> {task.category || "Social Media"}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <FaClock className="text-emerald-400" />
              POSTED: {new Date(task.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-emerald-500 transition-colors">
            {task.task_title}
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-2xl italic">
            "{task.task_detail}"
          </p>

          {/* Progress Analytics */}
          <div className="mt-10 max-w-md bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Campaign Progress</p>
                <span className="text-sm font-black text-slate-700 flex items-center gap-2">
                   <FaUsers className="text-emerald-500" /> {completedWorkers} / {task.required_workers} Workers
                </span>
              </div>
              <span className="text-xl font-black text-emerald-500">{Math.round(submissionRate)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-200"
                style={{ width: `${submissionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Section: Action & Budget */}
        <div className="bg-slate-50/80 p-8 md:p-10 lg:w-96 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-100 backdrop-blur-sm">
          <div className="space-y-5 mb-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaCalendarAlt className="text-emerald-400" /> Deadline
              </span>
              <span className="text-sm font-black text-slate-800">{task.completion_date}</span>
            </div>
            
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Budget</span>
              <span className="text-2xl font-black text-emerald-500">${totalCost}</span>
            </div>

            <div className="flex justify-between items-center px-4">
               <span className="text-[10px] font-bold text-slate-400 uppercase">Per Worker</span>
               <span className="text-sm font-bold text-slate-600">${task.payable_amount}</span>
            </div>
          </div>

          {/* Action Buttons - Emerald Theme */}
          <div className="flex flex-col gap-3">
            <Link href={`/dashboard/my-task/submission-task`} className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-500 text-white text-xs font-black py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-200 active:scale-95 tracking-widest uppercase">
              <FaEye size={16} /> View Submissions
            </Link>
            
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-emerald-400 hover:text-emerald-500 text-slate-700 text-xs font-black py-4 rounded-2xl transition-all duration-300">
                <FaEdit /> EDIT
              </button>
              <button className="px-6 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all duration-300 shadow-sm border border-rose-100">
                <FaTrashAlt />
              </button>
            </div>
          </div>
          
          <p className="text-[9px] text-center text-slate-400 mt-6 font-bold uppercase tracking-widest opacity-50">
            Task ID: {task.createdId?.slice(-8)}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default MyTaskCard;