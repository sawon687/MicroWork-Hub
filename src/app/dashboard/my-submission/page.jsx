'use client'
import { Coins, CheckCircle2, ListChecks, Clock, LayoutDashboard, TrendingUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { data: session } = useSession()
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)

    const getRelativeTime = (date) => {
        if (!date) return 'N/A';
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }
  const email=  session?.user?.email

    useEffect(() => {
        const fetchSubmissions = async () => {
                 if(email)
                 {
                            try {
                    const res = await fetch(`/api/task-submit`,{
                          method: 'GET',
                    credentials: 'include'
                    })
                    const data = await res.json()
                    console.log('data task',data)
                    setSubmissions(data.data)
                } catch (error) {
                    console.error("Fetch error:", error)
                } finally {
                    setLoading(false)
                }
            
                 }
              
        }
        fetchSubmissions()
    }, [email])

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    const approvedCount = submissions.filter(s => s.status === 'approved').length;
    const pendingCount = submissions.filter(s => s.status === 'pending').length;

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] pb-20 font-sans">
            
            {/* --- Professional Header --- */}
            <div className="w-full bg-slate-900 rounded-2xl pt-10 pb-20 px-6 relative overflow-visible">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                
                <div className="max-w-4xl mx-auto relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        {/* Welcome Text */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
                                <LayoutDashboard size={14} /> 
                                Task Management
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                My <span className="text-emerald-500">Submissions</span>
                            </h1>
                            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                                Track your task progress and real-time approval status.
                            </p>
                        </div>

                        {/* Efficiency Rate Card */}
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 shadow-inner">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">Efficiency</p>
                                <p className="text-white text-lg font-black leading-none">
                                    {submissions.length > 0 ? Math.round((approvedCount / submissions.length) * 100) : 0}% 
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overlap Cards: Half on Header, Half on Content */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6 absolute top-40  left-0 right-0 z-30">
                        {[
                            { label: 'Total Task', value: submissions.length, icon: ListChecks, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'Completed', value: approvedCount, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border-b-4 border-emerald-400 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                                    <stat.icon size={20} />
                                </div>
                                <p className="text-2xl md:text-3xl font-black text-slate-800 leading-none">{stat.value}</p>
                                <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase mt-2 tracking-tighter">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- List Section --- */}
            <div className="max-w-4xl mx-auto px-4 mt-40 relative z-20">
                {/* Section Title */}
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Submission Log</h2>
                    <div className="h-[1px] flex-1 bg-slate-200 mx-4"></div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full italic">Total {submissions.length}</span>
                </div>

                <div className="grid gap-4">
                    {submissions.length > 0 ? (
                        submissions.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all duration-300 shadow-sm group">
                                <div className="relative shrink-0">
                                    <img 
                                        src={item.task_screenSort || 'https://via.placeholder.com/100'} 
                                        alt="" 
                                        className="w-14 h-14 rounded-xl object-cover bg-slate-50 ring-2 ring-slate-50 group-hover:ring-emerald-100"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${
                                            item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                                            item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                            {item.status}
                                        </span>
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">{getRelativeTime(item.createdAt)}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-base truncate group-hover:text-emerald-600 transition-colors tracking-tight">{item.taskTitle}</h3>
                                </div>

                                <div className="text-right flex flex-col items-end shrink-0">
                                    <div className="flex items-center gap-1.5 bg-slate-50 group-hover:bg-emerald-500 px-3 py-2 rounded-xl border border-slate-100 group-hover:border-emerald-400 transition-all duration-300">
                                        <Coins size={14} className="text-emerald-500 group-hover:text-white" />
                                        <span className="text-base font-black text-slate-800 group-hover:text-white tracking-tighter">
                                            {item.task_coin || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                            <ListChecks size={40} className="mx-auto text-slate-200 mb-4" />
                            <h2 className="text-slate-400 font-bold tracking-tight">No history found</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page;