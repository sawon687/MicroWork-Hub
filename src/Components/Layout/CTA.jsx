'use client'
import React from 'react'
import { motion } from "framer-motion"
import Link from "next/link"
import Button from '../Ui/Button';


// এনিমেশন ভেরিয়েবল (এটি না থাকলে কোড এরর দিবে)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-emerald-950">
      {/* Background Glow - Custom CSS এর বদলে Inline Style ব্যবহার করা হয়েছে */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.15), transparent 70%)"
        }}
      />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6 text-zinc-50"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp} 
          custom={0}
        >
          Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Join Us</span>?
        </motion.h2>

        <motion.p 
          className="text-lg mb-10 max-w-xl mx-auto text-zinc-400"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp} 
          custom={1}
        >
          Start earning today or get your tasks done in minutes. Join 12,000+ people already on TaskFlow.
        </motion.p>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp} 
          custom={2} 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button  className="primary">
            <Link href="/register">Get Started Free</Link>
          </Button>
          
          <Button className={'text-black'}>
            <Link href="/all-tasks">Browse Tasks</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA