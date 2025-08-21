"use client";

import { motion } from "framer-motion";
import { howItWorksErp } from "@/content/erp-page-content";

export default function HowItWorks() {
  return (
    <section className="px-6 lg:px-20 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8 text-center"
      >
        Our ERP Implementation Process
      </motion.h2>

      {/* Desktop: horizontal stepper */}
      <div className="hidden lg:block">
        <div className="relative max-w-6xl mx-auto">
          {/* Progress rail */}
          <div className="absolute left-0 right-0 top-[34px] h-[2px] bg-white/10" />
          <div className="absolute left-0 top-[34px] h-[2px] bg-gradient-neon w-full opacity-40" />

          <div className="grid grid-cols-4 gap-6">
            {howItWorksErp.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-cyan-400" />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(70%_70%_at_50%_50%,rgba(0,255,255,0.12),transparent)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-gray-300 text-sm leading-relaxed max-w-[18rem]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: vertical list */}
      <div className="lg:hidden space-y-4">
        {howItWorksErp.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
