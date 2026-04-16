import React, { Suspense } from "react";
import PagenationButton from "../../Components/Ui/PagenationButton";
import CategoryButtonorSearch from "../../Components/CategoryButtonandSearchorSort/CategoryButtonorSearch";
import TaskCardSkeleton from '../../Components/LoadingAll/TaskCardSkeleton ';
import TaskList from '../../Components/TaskList/TaskList';
import { Sparkles, LayoutGrid, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export const getTaskData = async (search = "", page = 1, category = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page) params.set("page", page);
  if (category && category !== "All") params.set("category", category);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-task?${params.toString()}`,
    { cache: "no-store" }
  );
  const result = await res.json();
  return result.data;
};

const AllTasksPage = async ({ searchParams }) => {
  const params = (await searchParams) || {};

  const data = await getTaskData(
    params.search || "",
    params.page || 1,
    params.category || ""
  );

  const pageNumber = data?.pageNumber || 1;

  return (
    <div className="min-h-screen bg-[#011612] text-white selection:bg-emerald-500/30">
      
      {/* --- Header Section --- */}
      <header className="relative pt-24 pb-16 overflow-hidden border-b border-emerald-500/5">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-emerald-500/60 hover:text-emerald-400 transition-colors mb-8 group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-3 h-3" /> Explore Opportunities
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">
                Available <span className="text-emerald-400">Micro Tasks</span>
              </h1>
              <p className="text-emerald-100/40 text-lg md:text-xl font-light max-w-xl">
                Browse, apply, and complete micro tasks to start earning rewards today.
              </p>
            </div>
            
            <div className="hidden lg:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-emerald-400/40 text-xs font-bold uppercase tracking-widest">
                <LayoutGrid className="w-4 h-4" />
                <span>Status Dashboard</span>
              </div>
              <span className="text-white/20 text-xs">Total Pages Available: {pageNumber}</span>
            </div>
          </div>

          {/* Search & Category Filter Card */}
          <div className="mt-12 p-1 md:p-2 rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border border-white/5 shadow-2xl">
            <div className="bg-[#0a2f27]/40 rounded-[1.8rem] p-4 md:p-6 border border-emerald-500/10">
                <CategoryButtonorSearch />
            </div>
          </div>
        </div>
      </header>

      {/* --- Content Section --- */}
      <main className="container mx-auto px-6 pb-24">
        <div className="relative">
          <Suspense
            key={`${params.search}-${params.page}-${params.category}`}
            fallback={<TaskCardSkeleton count={9} />}
          >
            <div className="py-12">
               <TaskList
                search={params?.search}
                page={params?.page}
                category={params?.category}
              />
            </div>
          </Suspense>
        </div>

        {/* --- Pagination Section --- */}
        <div className="mt-10 flex justify-center py-10 border-t border-emerald-500/5">
          <PagenationButton pageNumber={pageNumber} />
        </div>
      </main>

      {/* Subtle Footer Glow */}
      <div className="h-32 bg-gradient-to-t from-emerald-500/5 to-transparent" />
    </div>
  );
};

export default AllTasksPage;