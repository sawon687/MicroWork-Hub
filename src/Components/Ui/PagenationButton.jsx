'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const PagenationButton = ({ pageNumber }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentPage = Number(searchParams.get('page')) || 1;

    const gotoPage = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());

        startTransition(() => {
           
            router.push(`/all-tasks?${params.toString()}`, { scroll: false });
        });
    }

    return (
        <div className={`max-w-4xl mt-40 mx-auto transition-all duration-500 ${isPending ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className='flex justify-between items-center bg-[#0a2f27]/50 backdrop-blur-xl p-4 rounded-[2rem] border border-emerald-500/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]'>
                
                {/* Previous Button */}
                <div className="w-28 md:w-32">
                    {currentPage > 1 && (
                        <button 
                            disabled={isPending}
                            onClick={() => gotoPage(currentPage - 1)}
                            className='group flex items-center gap-2 px-4 py-2 text-sm font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="hidden md:inline">Previous</span>
                        </button>
                    )}
                </div>

                {/* Page Numbers */}
                <div className='flex items-center gap-2'>
                    {[...Array(pageNumber)].map((_, index) => {
                        const page = index + 1;
                      
                        return (
                            <button 
                                key={page} 
                                disabled={isPending}
                                onClick={() => gotoPage(page)}
                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300 border ${
                                    page === currentPage 
                                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-transparent shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110 z-10' 
                                    : 'text-emerald-100/60 bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <div className="w-28 md:w-32 flex justify-end">
                    {currentPage < Number(pageNumber) && (
                        <button 
                            disabled={isPending}
                            onClick={() => gotoPage(currentPage + 1)} 
                            className='group flex items-center gap-2
                             px-4 py-2 text-sm font-bold bg-emerald-500/10 text-emerald-400 border
                              border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <span className="hidden md:inline">Next</span>
                            <HiOutlineArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    )}
                </div>

            </div>
            
            {/* Loading Indicator */}
            {isPending && (
                <div className="text-center mt-4">
                    <span className="text-emerald-400 text-xs tracking-widest uppercase animate-pulse">Updating Tasks...</span>
                </div>
            )}
        </div>
    );
}

export default PagenationButton;