"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative px-6 sm:px-12 lg:px-20 py-14">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
        {/* moving gradient veil */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,198,255,0.10), rgba(138,43,226,0.12), rgba(0,198,255,0.10))",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
          animate={{ x: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 px-6 sm:px-10 py-10 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-gradient-neon">
            Ready to Make Your Online Presence Impactful?
          </h3>
          <p className="mt-3 text-white/85 max-w-3xl mx-auto">
            Partner with Hanstrix Technologies for data-driven digital marketing that delivers measurable growth.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-neon text-white font-semibold border border-white/10 shadow-lg hover:shadow-xl transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            Boost Your Brand
          </a>
        </div>
      </div>
    </section>
  );
}
