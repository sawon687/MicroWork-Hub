'use client';
import React, { useEffect, useState } from 'react';
import { blogs } from '../../lib/blogData';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // App Router-er jonno thik import

export const CategoryButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL theke initial value nite hobe
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');

  // Unique Categories logic
  const categories = ['All', ...new Set(blogs.map((b) => b.category))];

  useEffect(() => {
    // URL update korar logic
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (activeCategory !== 'All') {
      params.set('category', activeCategory);
    } else {
      params.delete('category');
    }

    // URL update (push/replace)
    router.push(`/blog?${params.toString()}`, { scroll: false });

  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative group max-w-2xl mx-auto">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full bg-emerald-950/20 border border-emerald-500/10 focus:border-emerald-500/50 rounded-full py-4 pl-14 pr-12 outline-none text-emerald-100 placeholder:text-emerald-100/30 backdrop-blur-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")} 
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category List */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
              activeCategory === cat
                ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "bg-emerald-950/20 border-emerald-500/10 text-emerald-100/60 hover:border-emerald-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};