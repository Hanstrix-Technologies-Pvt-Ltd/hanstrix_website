"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";
import AiSummaryButton from "@/components/AISummaryButton";
import { useEffect, useMemo, useState } from "react";

interface HeroSectionProps {
  pageContent: string;
  serviceName: string;
}

const rotatingTags = [
  "Manufacturing",
  "Retail",
  "Healthcare",
  "Distribution",
  "Finance",
  "Education",
  "Projects",
  "WMS",
  "CRM",
  "BI Dashboards",
];

export default function HeroSection({
  pageContent,
  serviceName,
}: HeroSectionProps) {
  // rolling text index
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingTags.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  // (optional) memo for small perf win
  const imgProps = useMemo(
    () => ({
      src: "/images/ERP.png",
      alt: "Customized ERP Software - Visual representation of our ERP system interface",
      width: 900,
      height: 600,
      className: "rounded-2xl border border-white/10 bg-white/5 shadow-2xl",
    }),
    []
  );

  return (
    <>
      {/* HERO — first screen */}
      <section
        className="
          relative z-10 
          px-6 sm:px-12 lg:px-20
          pt-24 md:pt-28 lg:pt-24
        "
      >
        <div
          className="
            mx-auto max-w-7xl 
            grid grid-cols-1 lg:grid-cols-2 
            gap-10 items-center
            min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-9rem)]
          "
        >
          {/* Left (image) hidden on mobile so it appears below the fold */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative hidden lg:flex justify-center"
            aria-hidden
          >
            <div className="relative w-full max-w-[540px]">
              <Image {...imgProps} priority alt={imgProps.alt} />
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(0,255,255,0.18),rgba(138,43,226,0.12)_60%,transparent)] blur-2xl" />
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="
              text-center lg:text-left 
              flex flex-col justify-center 
              h-full
            "
          >
            {/* Badge (centered and not stretched) */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1 
                              rounded-full bg-white/5 border border-white/10 
                              backdrop-blur-md mb-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-xs sm:text-sm text-gray-300">
                  Modular • Integrated • Scalable
                </span>
              </div>
            </div>


            {/* Headings */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gradient-neon leading-tight mb-3">
              Customized ERP Solutions
            </h1>
            <h2 className="text-lg md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Flexible ERP — Tailored to Your Business
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Transform your operations with{" "}
              <b className="text-gradient-neonsubtle">bespoke ERP</b> that fits
              your processes, integrates your tools, and scales with your
              growth—delivering clear visibility and measurable ROI across
              departments.
            </p>

            {/* Rolling dynamic text (same pattern as AI-ML) */}
            <div className="mt-4 h-6 sm:h-8 md:h-10 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="inline-block text-base sm:text-lg md:text-2xl font-semibold text-gradient-neonsubtle"
                >
                  Tailored ERP for {rotatingTags[index]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions — aligned heights */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center 
                  px-6 h-11 sm:h-12 rounded-full 
                  border border-cyan-400/50 text-white font-semibold
                  bg-transparent hover:bg-cyan-500/10 transition-colors
                  shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]
                  focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                "
              >
                Get an ERP Demo
              </a>

              <div className="inline-flex h-11 sm:h-12">
                <AiSummaryButton content={pageContent} serviceName={serviceName} />
              </div>
            </div>

            {/* Helper text */}
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>AI summary gives a quick executive overview of this page.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MOBILE-ONLY Illustration — next screen (below the fold) */}
      <section className="lg:hidden px-6 sm:px-12 pt-2 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-[520px]">
            <Image {...imgProps} priority={false} alt={imgProps.alt} />
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(0,255,255,0.18),rgba(138,43,226,0.12)_60%,transparent)] blur-2xl" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
