'use client'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Coins } from 'lucide-react';
import HeadingTage from '../Ui/HeadingTage';
import ContorleAni from '../MotionContorleAni/ContorleAni';


const TopWorkers = ({ topWorkers}) => {
    const [fadeUp]=useState(ContorleAni())
  return (
    <div>


        <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <HeadingTage firstText={'Top'} secondText={'Workers'}/>
        <p className="text-muted-foreground text-lg">Our highest earning community members this month.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topWorkers.map((w, i) => (
          <motion.div key={w.name} className="rounded-2xl  p-6 shadow-md border border-gray-200 flex items-center gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <div className="w-14 h-14 rounded-full  bg-background  flex items-center justify-center text-white font-bold font-display text-lg flex-shrink-0">
              {w.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold  truncate">{w.name}</h3>
              <p className="text-sm text-muted-foreground">{w.tasks} tasks completed</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-500 font-bold font-display">
              <Coins className="w-4 h-4" />
              {w.coins.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
    </div>
  )
}

export default TopWorkers