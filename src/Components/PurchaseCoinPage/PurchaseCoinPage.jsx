"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Sparkles,
  Shield,
  Zap,
  Coins,
  ChevronRight,
  Star,
  Crown,
  Rocket,
} from "lucide-react";
  const packages = [
    {
      id: "starter",
      name: "Starter",
      coins: 100,
      price: 5,
      icon: Zap,
      color: "from-blue-500 to-cyan-400",
      border: "border-blue-400",
      shadow: "shadow-blue-500/25",
      badge: null,
      features: ["100 Coins", "Basic Tasks", "Email Support"],
    },
    {
      id: "popular",
      name: "Popular",
      coins: 500,
      price: 20,
      icon: Star,
      color: "from-teal-400 to-emerald-400",
      border: "border-emerald-400",
      shadow: "shadow-emerald-500/25",
      badge: "BEST VALUE",
      features: ["500 Coins", "Priority Tasks", "24/7 Support", "Bonus 50 Coins"],
    },
    {
      id: "pro",
      name: "Pro",
      coins: 1200,
      price: 45,
      icon: Crown,
      color: "from-amber-500 to-orange-400",
      border: "border-orange-400",
      shadow: "shadow-orange-500/25",
      badge: "MOST POPULAR",
      features: ["1200 Coins", "Premium Tasks", "Dedicated Support", "Bonus 200 Coins", "VIP Badge"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      coins: 3000,
      price: 99,
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      border: "border-purple-400",
      shadow: "shadow-purple-500/25",
      badge: "MAX POWER",
      features: ["3000 Coins", "All Tasks Access", "Priority Queue", "Bonus 500 Coins", "VIP Badge", "Custom Support"],
    },
  ];

  const faqs = [
    {
      title: "How do I use my coins?",
      description:
        "Coins are used to post tasks or unlock premium features on the platform.",
    },
    {
      title: "Are purchases refundable?",
      description:
        "All coin purchases are final. Unused coins remain in your account indefinitely.",
    },
    {
      title: "How fast will I receive my coins?",
      description:
        "Coins are added to your account instantly after successful payment.",
    },
  ];
export default function PurchaseCoinPage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [loading, setLoading] = useState(false);



  const handlePurchase = async (pkg) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Buying ${pkg.coins} coins`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-400 text-emerald-400 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Power Up Your Account
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Buy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400">
              Coins
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Fuel your tasks with coins. More coins = more power.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section>
        <div className="container mx-auto px-4">
          {/* Info bar */}
          <div className="flex justify-center pb-12">
            <div className="flex items-center gap-6 px-6 py-3 rounded-2xl border border-gray-300 shadow-lg">
              <div className="flex items-center text-emerald-400 gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure Payment</span>
              </div>

              <div className="flex items-center text-orange-400 gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Instant Delivery</span>
              </div>

              <div className="flex items-center text-emerald-400 gap-2">
                <Coins className="w-5 h-5" />
                <span className="text-sm">20 Coins = $1</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const isSelected = selectedPkg === pkg.id;

              return (
                <motion.div
                  key={pkg.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`relative cursor-pointer bg-white rounded-2xl border-2 p-6 transition-all duration-300
                  ${
                    isSelected
                      ? `${pkg.border} ${pkg.shadow} shadow-xl`
                      : "border-gray-200 hover:shadow-lg"
                  }`}
                >
                  {pkg.badge && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-white px-3 py-1 rounded-full bg-gradient-to-r ${pkg.color}`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className="text-4xl font-black">${pkg.price}</p>

                  <div className="flex text-emerald-500 font-bold bg-emerald-50 border border-emerald-200 rounded-xl py-2 px-2 items-center gap-2 mt-3 mb-5">
                    <Coins className="w-4 h-4" />
                    {pkg.coins} Coins
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(pkg);
                    }}
                    className={`w-full py-2 shadow rounded-xl text-white bg-gradient-to-r ${pkg.color}`}
                  >
                    {loading && selectedPkg === pkg.id
                      ? "Processing..."
                      : "Buy Now"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}