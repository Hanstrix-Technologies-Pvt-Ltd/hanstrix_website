"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Target, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import AiSummaryButton from "@/components/AISummaryButton";

const HIGHLIGHTS = [
  { icon: TrendingUp, title: "Performance-first", desc: "Full-funnel tracking & weekly insights." },
  { icon: Target, title: "Precision targeting", desc: "Audience cohorts & lookalikes that convert." },
  { icon: BarChart3, title: "Transparent reports", desc: "GA4 dashboards with channel level ROI." },
];

export default function HeroSection({
  pageContent,
  serviceName,
}: {
  pageContent: string;
  serviceName: string;
}) {
  const tags = ["SEO", "PPC", "Social", "Content", "Email", "Analytics"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % tags.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ===== Desktop / Tablet ===== */}
      <section className="hidden md:block relative px-6 sm:px-12 lg:px-20 pt-16 md:pt-18 lg:pt-20 pb-8 md:pb-9 lg:pb-10">
        <div className="mx-auto max-w-7xl min-h-[calc(100vh-5rem)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 w-full items-center">
            {/* Illustration LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex justify-center lg:order-1"
            >
              <div className="relative w-full sm:w-[420px] md:w-[490px] lg:w-[530px]">
                <motion.div
                  aria-hidden
                  className="absolute -inset-10 -z-10 rounded-[50%] blur-2xl"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.18), rgba(138,43,226,0.12) 60%, transparent)",
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image
                  src="/images/DigiMarket.png"
                  alt="Digital Marketing Illustration"
                  width={760}
                  height={520}
                  className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Copy RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-60px" }}
              className="text-center lg:text-left lg:order-2"
            >
              {/* Badge */}
              <div className="flex justify-center lg:justify-start mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm text-gray-300">
                    Data • Targeting • Conversion
                  </span>
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gradient-neon leading-tight">
                Digital Marketing Services
              </h1>

              <p className="mt-3 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Grow visibility, leads, and revenue with data-driven campaigns across search, social,
                and content—built to convert and scale.
              </p>

              {/* Rolling line */}
              <div className="mt-3 h-6 sm:h-8 md:h-9 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="inline-block text-base sm:text-lg md:text-xl font-semibold text-gradient-neonsubtle"
                  >
                    Campaigns that perform in {tags[i]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 lg:mt-6 flex justify-center lg:justify-start">
                <AiSummaryButton content={pageContent} serviceName={serviceName} />
              </div>

              {/* Highlights — fixed title row height for alignment on md/lg */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-left h-full flex flex-col"
                  >
                    {/* title row: same height across cards so descriptions align */}
                    <div className="flex items-start gap-2 text-white md:h-[44px] lg:h-[48px]">
                      <Icon className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold leading-tight">{title}</span>
                    </div>

                    <div className="mt-2 text-xs text-white/70">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech marquee */}
              <div className="mt-8 lg:mt-10">
                <div className="relative w-full h-10 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                  <div className="absolute inset-0 opacity-[0.9] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <div className="whitespace-nowrap animate-roll font-mono text-[12px] leading-[40px] text-cyan-300/80 px-4">
                      GA4 • GSC • Looker Studio • GTM • Meta Ads • Google Ads • LinkedIn Ads •
                      Segmentation • LTV • CPA • A/B Testing • Funnels • Retargeting
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Mobile: Screen 1 (content) — unchanged ===== */}
      <section className="md:hidden relative px-3 pt-[calc(96px+env(safe-area-inset-top))] pb-2">
        <div className="w-full text-center">
          <div className="mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-300">Data • Targeting • Conversion</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gradient-neon leading-tight">
            Digital Marketing Services
          </h1>

          <p className="mt-2 text-sm text-white/90 leading-relaxed max-w-[30ch] mx-auto">
            Grow visibility, leads, and revenue with data-driven campaigns across search, social,
            and content—built to convert and scale.
          </p>

          {/* Rolling line */}
          <div className="mt-2 h-7 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="inline-block text-base font-semibold text-gradient-neonsubtle"
              >
                Campaigns that perform in {tags[i]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-center">
            <AiSummaryButton content={pageContent} serviceName={serviceName} />
          </div>

          {/* Highlights — MOBILE keeps special 3rd card */}
          <div className="mt-4 grid grid-cols-2 gap-2 -mx-2">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-left ${
                  idx === 2 ? "col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-white">
                  <Icon className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-semibold">{title}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/70">{desc}</div>
              </div>
            ))}
          </div>

          {/* Marquee BELOW */}
          <div className="py-6">
            <div className="relative w-full h-8 rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <div className="absolute inset-0 opacity-[0.9] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="whitespace-nowrap animate-roll font-mono text-[11px] leading-[32px] text-cyan-300/80 px-3">
                  GA4 • GSC • Looker Studio • GTM • Meta Ads • Google Ads • LinkedIn Ads •
                  Segmentation • LTV • CPA • A/B Testing • Funnels • Retargeting
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mobile: Screen 2 (illustration ONLY) ===== */}
      <section className="md:hidden relative px-3 pb-6">
        <div className="relative w-full max-w-md mx-auto">
          <motion.div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[50%] blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.18), rgba(138,43,226,0.12) 60%, transparent)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/images/DigiMarket.png"
            alt="Digital Marketing Illustration"
            width={760}
            height={520}
            className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl w-full h-auto"
            priority
          />
        </div>
      </section>
    </>
  );
}
