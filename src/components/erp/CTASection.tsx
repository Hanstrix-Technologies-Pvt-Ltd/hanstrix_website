"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-6 lg:px-20 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border border-white/10"
      >
        {/* gradient strip */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-cyan-600/30 blur-xl" />
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/40 backdrop-blur-md">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Ready to streamline your operations with a tailored ERP?
            </h3>
            <p className="text-gray-300 mt-2 max-w-2xl">
              Let’s map your workflows and implement the right modules—fast, secure, and scalable.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-neon text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Talk to an ERP Expert
            </Link>
            <Link
              href="/services/ai-ml"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              Explore AI Add-Ons
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
