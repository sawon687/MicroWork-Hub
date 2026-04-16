import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, Clock, ChevronRight } from "lucide-react";
import { FadeUp } from '../../../Components/MotionContorleAni/AboutAnimation';
import CTA from '../../../Components/Layout/CTA';
import { blogs } from '../../../lib/blogData';

const page=async({ params })=> {
  const {id}=await params;
 console.log('id',id)
  const blog=blogs
  const post =blog.find(b=> b.id==id)

console.log('post data',post)
  

  return (
    <div className="min-h-screen bg-[#011612] text-white selection:bg-emerald-500/30">
      
      {/* Back Button & Top Meta */}
      <nav className="pt-32 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeUp>
            <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </Link>
            <div className="flex items-center gap-3 text-emerald-500/80 text-sm font-medium uppercase tracking-widest mb-4">
              <span>{post?.category}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/40">Article</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8">
              {post?.title}
            </h1>
          </FadeUp>
        </div>
      </nav>

      {/* Featured Image */}

<section className="pb-16">
  <div className="container mx-auto px-4 max-w-5xl">
    <FadeUp delay={0.2}>
      <div className="relative h-[300px] md:h-[600px] rounded-[3rem] overflow-hidden border border-emerald-500/10 shadow-2xl bg-emerald-950/20">
        
        
        {post?.image ? (
          <Image 
            src={post.image}
            alt={post.title || "Blog Image"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          
          <div className="flex items-center justify-center h-full text-emerald-500/20">
            No Image Available
          </div>
        )}

      </div>
    </FadeUp>
  </div>
</section>

      {/* Article Content */}
      <section className="pb-32 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Side: Author Info & Share */}
            <aside className="lg:w-1/4">
              <div className="sticky top-32 space-y-8 border-l border-emerald-500/10 pl-6">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Written by</p>
                  <p className="font-bold text-emerald-50 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" /> {post?.author}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Published on</p>
                  <p className="font-medium text-emerald-50/80 flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-400" /> {post?.date}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Reading Time</p>
                  <p className="font-medium text-emerald-50/80 flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-emerald-400" /> {post?.readTime}
                  </p>
                </div>
                <div className="pt-4">
                  <button className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 transition-all w-full justify-center text-sm font-bold">
                    <Share2 className="w-4 h-4" /> Share Post
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Side: Blog Body */}
            <main className="lg:w-3/4">
              <FadeUp delay={0.3}>
                <div 
                  className="prose prose-invert prose-emerald max-w-none 
                  prose-p:text-emerald-100/70 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light
                  prose-headings:text-white prose-headings:font-bold prose-h3:text-2xl
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                  prose-strong:text-emerald-400 prose-strong:font-semibold"
                 dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                />

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-emerald-500/10 flex flex-wrap gap-3">
                  {['Earning', 'Freelancing', 'Microtask', 'Guide'].map(tag => (
                    <span key={tag} className="bg-[#0a2f27] text-emerald-400 px-4 py-1.5 rounded-full text-xs font-medium border border-emerald-500/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </main>

          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}

export default page;