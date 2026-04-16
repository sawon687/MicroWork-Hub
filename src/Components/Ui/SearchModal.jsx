'use client'
import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineX, HiOutlineLightningBolt } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Coins } from 'lucide-react';
import Link from 'next/link'
const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, watch, handleSubmit } = useForm();
    
    const search = watch('search');

    // Shortcut Key (Ctrl + K) detect korar jonno
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // API fetching logic
    useEffect(() => {
        const fetchTasks = async () => {
            if (!search || search.length < 2) {
                setTasks([]);
                return;
            }
            setIsLoading(true);
            try {
              // Result limit set kora hoyeche
                const response = await fetch(`/api/all-task?search=${search}`);
                const result = await response.json();
                // API structure onujayi data set kora
                setTasks(result?.data?.result || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchTasks, 300); // 300ms delay jate bar bar API call na hoy
        return () => clearTimeout(debounceTimer);
    }, [search]);

    return (
        <>
            {/* Search Trigger Button */}
            <div className="px-4">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 px-4 py-2 bg-gray-800/40 hover:bg-gray-800/60 border border-white/10 rounded-2xl transition-all duration-300 outline-none"
                >
                    <HiOutlineSearch className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
                    <span className="text-sm text-gray-300 font-medium pr-10">Search tasks...</span>
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-gray-400 border border-white/10 rounded-md">
                        CTRL K
                    </kbd>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-20">
                        
                        {/* 1. Backdrop Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
                        />

                        {/* 2. Modal Container */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="relative w-full max-w-xl bg-[#121212] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
                        >
                            {/* Input Field Section */}
                            <div className="relative flex items-center px-6 py-5 border-b border-white/5">
                                <HiOutlineSearch className={`w-6 h-6 ${isLoading ? 'animate-bounce' : ''} text-emerald-500`} />
                                <form onSubmit={handleSubmit} className="flex-1">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        autoComplete="off"
                                        placeholder="Type to search tasks..."
                                        className="w-full bg-transparent border-none outline-none px-4 text-gray-100 text-lg placeholder:text-gray-500"
                                        {...register('search')}
                                    />
                                </form>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-xl text-gray-400 transition-colors"
                                >
                                    <HiOutlineX size={20} />
                                </button>
                            </div>

                            {/* Search Results Area */}
                            <div className="max-h-[450px] overflow-y-auto p-3 custom-scrollbar">
                                {tasks.length > 0 ? (
                                    <div className="space-y-2">
                                        {tasks.map((task) => (
                                           <Link  href={`/all-tasks/${task?._id}`} onClick={()=> setIsOpen(false)}  key={task?._id} >
                                           
                                           
                                            <div 
                                           
                                                className="group flex items-center my-4 gap-4 p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all duration-200 cursor-pointer"
                                            >
                                                {/* Task Image */}
                                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                                                    <img 
                                                        src={task.task_image || 'https://via.placeholder.com/100'} 
                                                        alt="task"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>

                                                {/* Task Title & Desc */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-semibold text-gray-100 truncate group-hover:text-emerald-400 transition-colors">
                                                        {task.task_title}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                                        {task.task_detail || 'No description provided for this task.'}
                                                    </p>
                                                </div>

                                                {/* Reward Section */}
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                                        <span className="text-xs font-bold text-emerald-400">{task.payable_amount}</span>
                                                        <Coins className="w-3 h-3 text-emerald-400" />
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">Reward</p>
                                                </div>
                                            </div></Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                                            <HiOutlineSearch className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium italic">
                                            {search ? `No tasks matching "${search}"` : "Search for tasks by title or description"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Info */}
                            <div className="bg-black/40 px-6 py-4 border-t border-white/5 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 shadow-sm text-gray-300">ESC</kbd> CLOSE
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 shadow-sm text-gray-300">↵</kbd> SELECT
                                    </span>
                                </div>
                                <div className="text-emerald-500 text-[10px] font-black italic tracking-tighter flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    SEARCH ENGINE v2.0
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(16, 185, 129, 0.5);
                }
            `}</style>
        </>
    );
};

export default SearchModal;