'use client'
import { motion } from "framer-motion";
import { Coins, Shield, Star, TrendingUp, Users, Zap } from "lucide-react";
import HeadingTage from "../Ui/HeadingTage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  { icon: Coins, title: "Earn Coins", desc: "Complete simple tasks and earn coins that convert to real money." },
  { icon: Users, title: "Find Workers", desc: "Post tasks and get them completed by verified workers quickly." },
  { icon: Shield, title: "Secure Payments", desc: "Safe withdrawal system with verified transactions." },
  { icon: Zap, title: "Instant Tasks", desc: "Browse and start working on tasks immediately." },
  { icon: TrendingUp, title: "Track Earnings", desc: "Real-time dashboard to monitor your progress and earnings." },
  { icon: Star, title: "Build Reputation", desc: "Earn ratings and climb the leaderboard for better tasks." },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background px-20">
    <div className="container mx-auto px-4">
      <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <HeadingTage firstText={'Why Choose'} secondText={'TaskFlow'}/>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to earn or get work done, all in one platform.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} className="bg-card rounded-2xl p-8 shadow-md  transition-shadow duration-300 border border-gray-200"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
            <div className="w-12 h-12 rounded-xl bg-emerald-400  text-white  flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold title-text mb-2">{f.title}</h3>
            <p className="paragraph-text ">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
}