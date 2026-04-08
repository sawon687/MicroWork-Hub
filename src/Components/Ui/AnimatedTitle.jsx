'use client'
import React from 'react'
import { motion} from 'framer-motion';
const AnimatedTitle = ({title}) => {
  return (
    <div>
  <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-5xl text-white pb-7 font-extrabold mb-6"
          >
            {title}
          </motion.h1>

    </div>
  )
}

export default AnimatedTitle