'use client'
import React, { useState } from 'react'
import { motion } from "framer-motion";

import HeadingTage from '../Ui/HeadingTage';
import ContorleAni from '../MotionContorleAni/ContorleAni';

const HowitWork = ({ steps}) => {
      const [fadeUp]=useState(ContorleAni())
  return (
    <>
    <section className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
    
        <HeadingTage firstText={'How It'} secondText={'Works'}/>
        <p className="text-muted-foreground text-lg">Simple steps to start earning or getting work done.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div key={s.step} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <div className="text-6xl font-bold font-display text-emerald-500 opacity-30 mb-2">{s.step}</div>
            <h3 className="text-xl font-semibold font-display mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
    
    </>
  )
}

export default HowitWork