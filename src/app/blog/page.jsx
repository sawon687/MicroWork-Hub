// app/blog/page.js
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { FadeUp } from '../../Components/MotionContorleAni/AboutAnimation';
import CTA from '../../Components/Layout/CTA';
import { blogs } from '../../lib/blogData';



export default function page() {
    const blog=blogs
  const featuredPost = blog.find(b => b.featured);
  const regularPosts = blog.filter(b => !b.featured);

  return (
    <div className="min-h-screen bg-[#011612]  text-white selection:bg-emerald-500/30">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 relative md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20"
          style={{ background: "radial-gradient(circle at 50% 0%, #10b981 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeUp>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Our <span className="text-emerald-400">Insights</span>
            </h1>
            <p className="text-emerald-100/50 max-w-xl mx-auto text-lg">
              Stay updated with the latest trends, success stories, and tips from the TaskFlow community.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="pb-20 md:px-20">
        <div className="container mx-auto px-4">
          <FadeUp delay={0.2}>
            <Link href={`/blog/${featuredPost.id}`}>
              <div className="group relative w-full h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden border border-emerald-500/20 bg-emerald-950/20">
                <Image 
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011612] via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-emerald-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-black">Featured</span>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-emerald-100/60 text-lg hidden md:block">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Regular Posts Grid */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:px-20 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.1}>
                <article className="group bg-[#062c24] rounded-[2rem] overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 transition-all flex flex-col h-full">
                  {/* Card Image */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-emerald-500/20">
                         {post.category}
                       </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-4 uppercase tracking-widest font-semibold">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/50 text-sm mb-6 line-clamp-3 font-light leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold group-hover:gap-3 transition-all">
                        Read Story <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}