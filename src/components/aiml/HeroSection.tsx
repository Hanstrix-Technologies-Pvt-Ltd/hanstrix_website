"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import AiSummaryButton from "@/components/AISummaryButton";

interface HeroSectionProps {
  pageContent: string;
  serviceName: string;
  bgAltImage?: string;
}

const rotatingTags = ["Healthcare", "FinTech", "Retail", "Logistics", "EdTech", "SaaS"];

export default function HeroSection({
  pageContent,
  serviceName,
  bgAltImage = "/images/AI.png",
}: HeroSectionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotatingTags.length), 2200);
    return () => clearInterval(t);
  }, []);

  // magnetic hover for CTA (use currentTarget to avoid child-node issues)
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setMx(x * 0.1);
    setMy(y * 0.1);
  };
  const resetMagnet = () => {
    setMx(0);
    setMy(0);
  };

  return (
    <section className="relative z-10 pt-13 md:pt-36 lg:pt-15 px-4 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center lg:text-left"
        >
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm text-gray-300">
              Intelligent Automation • Real-time Insights • Personalization
            </span>
          </div>

          {/* Headings */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-neon leading-tight mb-4">
            Artificial Intelligence & Machine Learning Solutions
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-white font-semibold mb-4">
            Innovative AI & ML Services to Accelerate Your Business
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0">
            Stay competitive with{" "}
            <strong className="text-cyan-400">AI and machine learning solutions</strong>{" "}
            from Hanstrix Technologies. We help organizations harness the power of real-time
            data and intelligent automation to drive smarter decisions, optimize operations,
            and deliver personalized customer experiences.
          </p>

          {/* Rotating tags */}
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
                We build smarter AI for {rotatingTags[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="/contact"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetMagnet}
              style={{ transform: `translate(${mx}px, ${my}px)` }}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-neon text-white font-bold shadow-lg transition-transform duration-150 hover:scale-[1.02] border border-white/10 neon-glow-subtle"
              aria-label="Get a Free Consult"
            >
              Get a Free Consult
            </a>

            {/* Secondary, de-emphasized */}
            <AiSummaryButton
              content={pageContent}
              serviceName={serviceName}
              variant="ghost"
              size="sm"
              label="Quick Summary"
              className="self-center sm:self-auto"
            />
          </div>

        </motion.div>

        {/* Right: Illustration with subtle float */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center items-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[540px]"
          >
            <Image
              src={bgAltImage}
              alt="Artificial Intelligence and Machine Learning Illustration"
              width={800}
              height={560}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 540px"
              className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl object-contain"
              priority
            />
            {/* Soft glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-2xl -z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
