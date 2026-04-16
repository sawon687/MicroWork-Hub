'use client'
import { motion } from "framer-motion";
import HeadingTage from "../Ui/HeadingTage";
import { Coins, Shield, Star, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";
import ContorleAni from '../MotionContorleAni/ContorleAni';

const iconMap = { Coins, Users, Shield, Zap, TrendingUp, Star };
export default function FeaturesSection({features}) {
  const [fadeUp]=useState(ContorleAni())
  return (
    <section className="py-24  ">
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <HeadingTage firstText={'Why Choose'} secondText={'TaskFlow'}/>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to earn or get work done, all in one platform.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon=iconMap[f.iconName];
          return (
          <motion.div key={f.title} className="bg-card rounded-2xl p-8 shadow-md  transition-shadow duration-300 border border-gray-200"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <div className="w-12 h-12 rounded-xl bg-background text-white  flex items-center justify-center mb-4">
                {Icon && <Icon className="w-6 h-6 text-primary-foreground" />}
            </div>
            <h3 className="text-xl font-semibold title-text mb-2">{f.title}</h3>
            <p className="paragraph-text ">{f.desc}</p>
          </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
}