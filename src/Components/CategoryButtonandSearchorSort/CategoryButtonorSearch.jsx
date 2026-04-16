"use client";
import React, { useEffect, useState } from "react";
import Button from "../Ui/Button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SortButton from "./SortButton";

const CategoryButtonorSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ URL থেকে value read
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      search: initialSearch,
    },
  });

  const searchValue = watch("search", "");

  // ✅ URL change হলে state sync
  useEffect(() => {
    const category = searchParams.get("category") || "All";
    const search = searchParams.get("search") || "";

    setActiveCategory(category);
    setValue("search", search);
  }, [searchParams, setValue]);

  // ✅ Category click handler (NO LOOP 🔥)
  const handleCategory = (item) => {
    setActiveCategory(item);

    const params = new URLSearchParams();

    if (searchValue) params.set("search", searchValue);
    if (item !== "All") params.set("category", item);
    params.set("page", "1");

    router.push(`/all-tasks?${params.toString()}`);
  };

  // ✅ Search handler (debounce)
  useEffect(() => {
    const debounce = setTimeout(() => {
      const params = new URLSearchParams();

      if (searchValue) params.set("search", searchValue);
      if (activeCategory !== "All") {
        params.set("category", activeCategory);
      }
      params.set("page", "1");

      router.push(`/all-tasks?${params.toString()}`);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchValue]); // 🚀 only search depend

  const categories = [
    "All",
    "Social",
    "Review",
    "Translation",
    "Testing",
    "Data Entry",
    "Writing",
    "Design",
  ];

  return (
    <>
      <div className="flex flex-col space-y-6">
      <div className="flex flex-wrap items-center w-full gap-6">
        {/* 🔍 Search Input */}
        <div className="relative w-full lg:w-[450px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-400 w-5 h-5 transition-colors" />
          <input
            type="text"
            placeholder="Search by task title or keywords..."
            {...register("search")}
            className="w-full bg-[#011612]/60 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-white placeholder:text-white/20 transition-all"
          />
        </div>

        {/* 🏷️ Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((item, i) => (
            <button
              key={i}
              onClick={() => handleCategory(item)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 border ${
                activeCategory === item 
                ? "bg-background text-white border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
                : "bg-emerald-500/5 text-emerald-100/60 border-emerald-500/10 hover:bg-emerald-500/10 hover:text-emerald-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-emerald-500/5 pt-4">
        <p className="text-white/20 text-xs font-medium uppercase tracking-widest">Sort Result By</p>
        <SortButton />
      </div>
    </div>
    </>
  );
};

export default CategoryButtonorSearch;