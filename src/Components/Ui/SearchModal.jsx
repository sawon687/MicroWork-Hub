"use client";
import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Coins } from 'lucide-react';
import Link from 'next/link';

const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, watch, handleSubmit } = useForm();
    
    const search = watch('search');

    // Ctrl + K shortcut detection
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



    // API fetching logic with debounce
    useEffect(() => {
        const fetchTasks = async () => {
            if (!search || search.length < 2) {
                setTasks([]);
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`/api/all-task?search=${search}`);
                const result = await response.json();
                setTasks(result?.data?.result || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchTasks, 300);
        return () => clearTimeout(debounceTimer);
    }, [search]);

    return (
        <div>
            {/* Desktop Trigger */}
            <div className="px-4 md:block hidden">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 outline-none"
                >
                    <HiOutlineSearch className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
                    <span className="text-sm text-gray-300 font-medium pr-10">Search tasks...</span>
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-gray-400 border border-white/10 rounded-md">
                        CTRL K
                    </kbd>
                </button>
            </div>

            {/* Mobile Trigger */}
            <button className='md:hidden text-white p-2' onClick={() => setIsOpen(true)}> 
                <HiOutlineSearch size={22}/>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4">
                        
                        {/* 1. Backdrop Overlay with Blur Effect */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm" // Yekhane blur add kora hoyeche
                        />

                        {/* 2. Modal Container */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-xl bg-[#121212]   rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden border border-white/10"
                        >
                            {/* Input Field Section */}
                            <div className="relative flex items-center px-6 py-5 border-b border-white/5">
                                <HiOutlineSearch className={`w-6 h-6 ${isLoading ? 'animate-pulse text-emerald-400' : 'text-gray-400'}`} />
                                <form onSubmit={handleSubmit} className="flex-1">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        autoComplete="off"
                                        placeholder="Search for projects or tasks..."
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
                            <div className="max-h-[60vh] overflow-y-auto p-3 custom-scrollbar">
                                {tasks.length > 0 ? (
                                    <div className="space-y-1">
                                        {tasks.map((task) => (
                                            <Link href={`/all-tasks/${task?._id}`} onClick={() => setIsOpen(false)} key={task?._id}>
                                                <div className="group flex items-center gap-4 p-3 rounded-2xl bg-transparent hover:bg-white/5 transition-all duration-200 cursor-pointer">
                                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-white/5">
                                                        <img 
                                                            src={task.task_image || 'https://via.placeholder.com/100'} 
                                                            alt=""
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-bold text-gray-100 truncate group-hover:text-emerald-400 transition-colors">
                                                            {task.task_title}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-medium">
                                                            {task.task_detail || 'View task details...'}
                                                        </p>
                                                    </div>

                                                    <div className="text-right flex-shrink-0">
                                                        <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                                            <span className="text-xs font-black text-emerald-400">{task.payable_amount}</span>
                                                            <Coins className="w-3 h-3 text-emerald-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4 text-gray-600">
                                            <HiOutlineSearch size={32} />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium italic">
                                            {search ? `No results found for "${search}"` : "Start typing to search tasks..."}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="bg-black/20 px-6 py-3 border-t border-white/5 flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <span className="text-[10px] text-gray-500 font-bold tracking-widest flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 text-gray-300">ESC</kbd> CLOSE
                                    </span>
                                </div>
                                <div className="text-emerald-500/50 text-[10px] font-black italic tracking-wider">
                                    AURA ENGINE v2.0
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
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(16, 185, 129, 0.5);
                }
            `}</style>
        </div>
    );
};

export default SearchModal;