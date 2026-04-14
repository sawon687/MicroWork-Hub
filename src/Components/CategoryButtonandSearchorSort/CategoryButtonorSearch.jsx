'use client'
import React, { useEffect, useState } from 'react'
import Button from '../Ui/Button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import SortButton from './SortButton';

const CategoryButtonorSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL theke initial value read kora
  const initialCategory = searchParams.get('category') || "All";
  const initialSearch = searchParams.get('search') || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const { register, watch } = useForm({
    defaultValues: {
      search: initialSearch
    }
  });

  const searchValue = watch('search', '');
  useEffect(() => {
    // Prothom bar render-e jate delay na hoy, tai debounce deya
    const debounce = setTimeout(() => {
      // Create URLSearchParams object for cleaner URL building
      const params = new URLSearchParams();
      
      if (searchValue) params.set('search', searchValue);
      if (activeCategory !== "All") params.set('category', activeCategory);
      
      // Sob shomoy page 1-e niye jabe jokhon filter change hobe
      params.set('page', '1');

      router.push(`/all-tasks?${params.toString()}`);
    }, 500); // 500ms is standard for better feel

    return () => clearTimeout(debounce);
  }, [searchValue, activeCategory, router]);

  const categories = ["All", "Social", "Review", "Translation", "Testing", "Data Entry", "Writing", "Design"];

  return (
    <>
      <div className="flex flex-wrap items-center w-full gap-4">
        <div className="relative w-full md:w-[420px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            {...register('search')}
            className="w-full bg-gray-800/60 border border-gray-600 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item, i) => (
            <Button
              onClick={() => setActiveCategory(item)}
              key={i}
              className={`${activeCategory === item ? 'primary' : 'secondary'}`}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <SortButton />
    </>
  )
}

export default CategoryButtonorSearch;