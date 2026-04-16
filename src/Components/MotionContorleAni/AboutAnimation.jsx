// components/AboutAnimations.js
"use client";
import { motion } from "framer-motion";

export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.08, duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);