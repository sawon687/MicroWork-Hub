
import Image from "next/image";
import Banner from "../Components/Banner/Banner";
import FeaturesSection from "@/Components/Layout/FeaturesSection";
import TopWorkers from "@/Components/Layout/TopWorkers";
import HowitWork from "@/Components/Layout/HowitWork";
import TestimonialFAQ from "@/Components/Layout/TestimonialFAQ";

const steps = [
  { step: "01", title: "Create Account", desc: "Sign up as a Worker or Buyer in seconds." },
  { step: "02", title: "Browse or Post Tasks", desc: "Workers find tasks, Buyers create them." },
  { step: "03", title: "Complete & Submit", desc: "Workers complete tasks and submit proof." },
  { step: "04", title: "Get Paid", desc: "Earn coins and withdraw to your account." },
];

const topWorkers = [
  { name: "Sarah Chen", coins: 4850, tasks: 234, avatar: "SC" },
  { name: "Mike Johnson", coins: 4200, tasks: 198, avatar: "MJ" },
  { name: "Aisha Patel", coins: 3900, tasks: 176, avatar: "AP" },
  { name: "David Kim", coins: 3650, tasks: 162, avatar: "DK" },
  { name: "Emma Wilson", coins: 3400, tasks: 155, avatar: "EW" },
  { name: "Carlos Ruiz", coins: 3100, tasks: 143, avatar: "CR" },
];
const features = [
  { iconName: "Coins", title: "Earn Coins", desc: "Complete simple tasks and earn coins that convert to real money." },
  { iconName: "Users", title: "Find Workers", desc: "Post tasks and get them completed by verified workers quickly." },
  { iconName: "Shield", title: "Secure Payments", desc: "Safe withdrawal system with verified transactions." },
  { iconName: "Zap", title: "Instant Tasks", desc: "Browse and start working on tasks immediately." },
  { iconName: "TrendingUp", title: "Track Earnings", desc: "Real-time dashboard to monitor your progress and earnings." },
  { iconName: "Star", title: "Build Reputation", desc: "Earn ratings and climb the leaderboard for better tasks." },
];

 const testimonials = [
    {
      name: "Rachel T.",
      role: "Worker",
      text: "I've earned over $500 in my first month! The tasks are simple and the platform is super easy to use."
    },
    {
      name: "James L.",
      role: "Buyer",
      text: "I get my micro-tasks completed within hours. The worker quality is amazing and prices are fair."
    },
    {
      name: "Nina S.",
      role: "Worker",
      text: "The withdrawal process is smooth and fast. I love earning extra income in my spare time."
    }
  ];

  const faqs = [
    {
      q: "How do I earn money?",
      a: "Complete available micro tasks. Once approved, earnings will be added to your wallet."
    },
    {
      q: "What is the minimum withdrawal?",
      a: "Minimum withdrawal is $10. You can withdraw anytime after reaching it."
    },
    {
      q: "How do I post tasks?",
      a: "Create a buyer account, then click post task and fill in the requirements."
    },
    {
      q: "Is it free to join?",
      a: "Yes, joining is completely free for both workers and buyers."
    }
  ];

  const slides = [
  {
    badge: "⚡ Earn Money Completing Tasks",
    heading: "Complete Tasks. ",
    highlight: "Earn Coins.",
    subHeading: "Get Paid.",
    description: "Join thousands of workers earning real money by completing simple micro tasks. Post tasks and get them done in minutes.",
    color: "from-emerald-500/20"
  },
  {
    badge: "🚀 Boost Your Business",
    heading: "Hire Global ",
    highlight: "Expert Workers.",
    subHeading: "Fast Results.",
    description: "Need something done quickly? Post your task and watch it get completed by our dedicated global workforce in no time.",
    color: "from-cyan-500/20"
  },
  {
    badge: "💰 Secure & Fast Payments",
    heading: "Instant ",
    highlight: "Withdrawals.",
    subHeading: "Zero Fees.",
    description: "Your earnings are safe with us. Withdraw your coins instantly to your preferred payment method with maximum security.",
    color: "from-purple-500/20"
  }
];
export default function Home() {
  return (
    <div className="flex flex-col items-center w-full justify-center  font-sans ">
    <Banner slides={slides}></Banner>
  

     <div className="bg-white px-20">
          <FeaturesSection features={features} ></FeaturesSection>
          <HowitWork steps={steps} ></HowitWork>
          <TopWorkers topWorkers={topWorkers} ></TopWorkers>
          <TestimonialFAQ testimonials={testimonials} faqs={faqs} ></TestimonialFAQ>
     </div>
    </div>
  );
}
