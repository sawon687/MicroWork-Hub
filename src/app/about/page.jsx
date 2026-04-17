
import Link from "next/link";
import Image from "next/image"; 
import { Users, Target, Shield, Award, ArrowLeft, Zap, Globe, TrendingUp, CheckCircle2 } from "lucide-react";
import { FadeUp } from '../../Components/MotionContorleAni/AboutAnimation';
import CTA from '../../Components/Layout/CTA';

const values = [
  { icon: Target, title: "Mission", desc: "Empower people worldwide to earn real income by completing simple micro-tasks.", color: "from-teal-500 to-emerald-400" },
  { icon: Users, title: "Community", desc: "We've built a thriving community of 12,000+ workers and buyers.", color: "from-cyan-500 to-blue-400" },
  { icon: Shield, title: "Trust & Safety", desc: "Every transaction is verified and secure. We protect both workers and buyers.", color: "from-emerald-600 to-teal-500" },
  { icon: Award, title: "Fair Pay", desc: "Workers get paid fairly for every task. No hidden fees, no delays.", color: "from-yellow-500 to-orange-400" },
];

const stats = [
  { value: "12,000+", label: "Active Workers", icon: Users },
  { value: "85,000+", label: "Tasks Completed", icon: Zap },
  { value: "$250K+", label: "Total Payouts", icon: TrendingUp },
  { value: "45+", label: "Countries", icon: Globe },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#011612] text-white selection:bg-emerald-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30"
          style={{ background: "radial-gradient(circle at 50% 0%, #10b981 0%, transparent 70%)" }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeUp delay={0}>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-emerald-400/80 hover:text-emerald-300 mb-8 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              We scale <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Human</span> potential.
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-emerald-100/60 font-light">
              Building the world's most trusted micro-tasking ecosystem since 2024.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 -mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i}>
                <div className="bg-[#0a2f27] border border-white/5 p-8 rounded-[2rem] shadow-2xl hover:translate-y-[-5px] transition-transform duration-300">
                  <stat.icon className="w-5 h-5 text-emerald-400 mb-4" />
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <FadeUp>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Our <span className="text-emerald-400 text-not-italic">Origin.</span></h2>
                <div className="space-y-6 text-emerald-100/70 text-lg leading-relaxed">
                  <p>TaskFlow was born in <span className="text-white font-semibold">2024</span> with a vision to democratize digital work globally.</p>
                  <p>We realized that millions of talented individuals were disconnected from the global economy. Our platform acts as the bridge that creates instant opportunities.</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {['Global Reach', 'Instant Payouts', 'Verified Tasks', '24/7 Support'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-emerald-400 bg-emerald-500/5 py-2 px-4 rounded-xl border border-emerald-500/10">
                        <CheckCircle2 className="w-4 h-4" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
            
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[3rem] blur-3xl group-hover:bg-emerald-500/30 transition-colors duration-500" />
              <div className="relative w-full h-[450px] rounded-[3rem] border border-emerald-500/20 overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop"
                  alt="TaskFlow Team Story"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-10">
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-1 font-bold">Inception Year</div>
                    <div className="text-7xl font-black text-white/95">2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Modern Bento Style */}
      <section className="py-32 bg-black/40 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The TaskFlow <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent uppercase">Way</span></h2>
            <p className="text-white/40 max-w-md mx-auto">Core principles that define our DNA and guide every decision we make.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i}>
                <div className="group relative p-10 rounded-[2.5rem] bg-[#022c22] border border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 overflow-hidden">
                  {/* Subtle background glow on hover */}
                  <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${v.color} opacity-[0.03] group-hover:opacity-10 rounded-full transition-opacity duration-500`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <v.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-emerald-50">{v.title}</h3>
                  <p className="text-emerald-100/40 leading-relaxed font-light text-lg">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="relative z-10">
        <CTA />
      </div>

    </div>
  );
}