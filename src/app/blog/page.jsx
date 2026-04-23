import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import CTA from '../../Components/Layout/CTA';
import { blogs } from '../../lib/blogData';
import { CategoryButton } from '../../Components/BlogpageCategorybutton/CategoryButton';
import { FadeUp } from '../../Components/MotionContorleAni/AboutAnimation';

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const searchQuery = params?.search || "";
  const activeCategory = params?.category || "All";

  // Filter Logic
  const filteredBlogs = blogs.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured post ta find kora hocche
  const featuredPost = blogs.find(b => b.featured) || blogs[0];

  return (
    <div className="min-h-screen bg-[#011612] pt-20 text-white selection:bg-emerald-500/30">
      
      {/* --- 1. MODERN HERO BANNER WITH CLEAR FEATURED IMAGE --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-emerald-500/10">
        
        {/* Background Featured Image (More Clear) */}
        {featuredPost && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={featuredPost.image} 
              alt={featuredPost.title}
              fill 
              className="object-cover opacity-60 scale-100 transition-all duration-1000"
              priority
            />
            {/* Optimized Overlays for Clarity & Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#011612]/80 via-transparent to-[#011612]" />
            <div className="absolute inset-0 bg-black/20" /> {/* Subtle dark overlay for text contrast */}
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <FadeUp>
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              <Sparkles size={12} className="text-emerald-400" /> Featured Article
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
              {featuredPost?.title.split(' ').slice(0, 2).join(' ')} <span className="text-emerald-400 italic">{featuredPost?.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <p className="text-white max-w-2xl mx-auto text-lg md:text-xl mb-12 font-semibold leading-relaxed drop-shadow-lg">
              {featuredPost?.excerpt}
            </p>

            {/* CTA Button - Directly to Detail Page */}
            <div className="mb-16">
              <Link 
                href={`/blog/${featuredPost?.id}`} 
                className="group relative inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-[0_20px_60px_rgba(16,185,129,0.4)]"
              >
                READ ARTICLE DETAILS
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </FadeUp>

          {/* Search & Filter - Floating Style */}
          <div className="max-w-4xl mx-auto py-20">
            <CategoryButton initialSearch={searchQuery} initialCategory={activeCategory} />
          </div>
        </div>
      </section>

      {/* --- 2. BLOGS GRID --- */}
      <section className="py-24 bg-[#011612]">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-black uppercase tracking-tighter">Latest <span className="text-emerald-500">Stories</span></h2>
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-20">
              {filteredBlogs.map((post, i) => (
                <FadeUp key={post.id} delay={i * 0.05}>
                  <article className="group bg-emerald-950/10 rounded-[2.5rem] overflow-hidden border border-emerald-500/5 hover:border-emerald-500/20 transition-all flex flex-col h-full hover:bg-emerald-900/5">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-5 left-5">
                        <span className="bg-black/80 backdrop-blur-md text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase border border-emerald-500/20">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-white/30 text-[10px] mb-4 uppercase font-bold tracking-widest">
                        <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> {post.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> {post.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-6 line-clamp-3 leading-relaxed font-medium italic">
                        "{post.excerpt}"
                      </p>

                      <div className="mt-auto">
                        <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black group-hover:gap-4 transition-all uppercase tracking-[0.2em]">
                          Read Full Story <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl text-emerald-100/20 font-bold uppercase tracking-widest">No Articles Found</h3>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </div>
  );
}

export default page;