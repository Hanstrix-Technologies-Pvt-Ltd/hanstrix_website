"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Users, Zap } from "lucide-react";
import Image from "next/image";

const features = [
  { title: "Robust Security", desc: "Multi-layered encryption and role-based access controls.", icon: ShieldCheck },
  { title: "Real-Time Analytics", desc: "Instant insights across all business modules.", icon: Gauge },
  { title: "Collaborative Workflows", desc: "Boost team productivity with integrated processes.", icon: Users },
  { title: "Scalable Modules", desc: "Add or customize modules as your business grows.", icon: Zap },
];

export default function KeyFeatures() {
  return (
    <section className="px-6 lg:px-20 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Image
            src="/images/erp-features.png"
            alt="ERP Features"
            width={650}
            height={500}
            className="rounded-xl border border-white/10"
          />
        </motion.div>

        {/* Right features list */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-neon">
            Key Features That Drive ERP
          </h2>
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-4 flex items-start gap-3"
            >
              <f.icon className="w-6 h-6 text-cyan-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold">{f.title}</h3>
                <p className="text-gray-300 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
