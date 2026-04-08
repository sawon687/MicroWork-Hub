'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react'; // ১. স্মুথ রেন্ডারিংয়ের জন্য ইম্পোর্ট
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const PagenationButton = ({ pageNumber }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition(); // ২. ট্রানজিশন হুক

    const currentPage = Number(searchParams.get('page')) || 1;

    const gotoPage = (page) => {
        // ৩. URLSearchParams ব্যবহার করা বেস্ট প্র্যাকটিস
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        params.set('limit', '9');

        // ৪. startTransition ব্যবহার করলে রাউটিং আপডেট স্মুথ হয়
        startTransition(() => {
            router.push(`/all-task?${params.toString()}`, { scroll: false });
        });
    }

    return (
        <div className={`max-w-4xl py-10 mx-auto transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            <div className='flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                
                {/* Previous Button */}
                <div className="w-32"> {/* বাটন সরানড়া রোধ করতে ফিক্সড উইথ */}
                    {currentPage > 1 && (
                        <button 
                            disabled={isPending}
                            onClick={() => gotoPage(currentPage - 1)}
                            className='group flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white border border-gray-300 rounded-lg hover:bg-orange-400 transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50'
                        >
                            <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span>Previous</span>
                        </button>
                    )}
                </div>

                {/* Page Numbers */}
                <div className='hidden md:flex items-center gap-2'>
                    {[...Array(pageNumber)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button 
                                key={page} 
                                disabled={isPending}
                                onClick={() => gotoPage(page)}
                                className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 ${
                                    page === currentPage 
                                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-transparent shadow-md' 
                                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <div className="w-32 flex justify-end">
                    {currentPage < Number(pageNumber) && (
                        <button 
                            disabled={isPending}
                            onClick={() => gotoPage(currentPage + 1)} 
                            className='group flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white border border-gray-300 rounded-lg hover:bg-orange-400 transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50'
                        >
                            <span>Next</span>
                            <HiOutlineArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default PagenationButton;