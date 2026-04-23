import React from 'react';

const AboutSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#011612] animate-pulse">
      

      <section className="pt-32 pb-40 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">

          <div className="h-8 w-32 bg-emerald-500/10 rounded-full mx-auto mb-8 border border-emerald-500/20"></div>
  
          <div className="space-y-4 mb-6">
            <div className="h-16 md:h-24 w-3/4 max-w-4xl bg-white/5 rounded-3xl mx-auto"></div>
            <div className="h-16 md:h-24 w-1/2 max-w-2xl bg-white/5 rounded-3xl mx-auto"></div>
          </div>

          <div className="h-6 w-full max-w-xl bg-white/5 rounded-lg mx-auto"></div>
        </div>
      </section>

      <section className="relative z-30 -mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#0a2f27] border border-white/5 p-8 rounded-[2rem]">
                <div className="w-5 h-5 bg-emerald-500/20 rounded-md mb-4"></div>
                <div className="h-8 w-20 bg-white/10 rounded-lg mb-2"></div>
                <div className="h-3 w-24 bg-white/5 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
    
            <div className="lg:w-1/2 space-y-8">
              <div className="h-12 w-48 bg-white/5 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
                <div className="h-4 w-full bg-white/5 rounded-md"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded-md"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-emerald-500/5 rounded-xl border border-emerald-500/10"></div>
                ))}
              </div>
            </div>
            
  
            <div className="lg:w-1/2 w-full h-[450px] bg-emerald-950/20 rounded-[3rem] border border-emerald-500/10"></div>
          </div>
        </div>
      </section>


      <section className="py-32 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <div className="h-12 w-64 bg-white/5 rounded-2xl mx-auto"></div>
            <div className="h-4 w-48 bg-white/5 rounded-md mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-[#022c22] border border-emerald-500/5 h-64 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20"></div>
                <div className="h-8 w-32 bg-white/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded-md"></div>
                  <div className="h-4 w-3/4 bg-white/5 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutSkeleton;