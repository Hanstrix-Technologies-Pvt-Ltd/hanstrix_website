"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Sparkles, Copy, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AiSummaryButton from "@/components/AISummaryButton";

interface HeroSectionProps {
  pageContent: string;
  serviceName: string;
}

const rotatingTags = ["Startups", "SaaS", "E-Commerce", "Enterprises", "Agencies", "Nonprofits"];

export default function HeroSection({ pageContent, serviceName }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotatingTags.length), 2200);
    return () => clearInterval(t);
  }, []);

  // Magnetic CTA (primary button)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const transform = useMotionTemplate`translate(${mx}px, ${my}px)`;
  const onMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.08);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.08);
  };
  const onMagnetLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Simple functional editor (tabs + editable)
  type TabKey = "app/page.tsx" | "layout.tsx" | "seo.config.ts";
  const defaults = useMemo(
    () => ({
      "app/page.tsx": `export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6">
      <h1 className="text-3xl font-bold">Ship fast. Rank high.</h1>
      <p className="text-white/70">Next.js • TypeScript • Tailwind • SEO</p>
      <a href="/contact" className="btn-primary">Get Started</a>
    </main>
  )
}`,
      "layout.tsx": `import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#030303] text-white antialiased">
        {children}
      </body>
    </html>
  )
}`,
      "seo.config.ts": `export const seo = {
  title: "Hanstrix • Web Development",
  description: "High-performance, SEO-forward websites that convert.",
  openGraph: { type: "website", locale: "en_US" }
};`,
    }),
    []
  );
  const [active, setActive] = useState<TabKey>("app/page.tsx");
  const [files, setFiles] = useState<Record<TabKey, string>>(defaults);
  const onChangeFile = (val: string) => setFiles((prev) => ({ ...prev, [active]: val }));
  const onCopy = async () => { try { await navigator.clipboard.writeText(files[active]); } catch {} };
  const onReset = () => setFiles(defaults);

  return (
    <section className="relative z-10 px-6 sm:px-12 lg:px-20 pt-24 md:pt-28 lg:pt-24 pb-8">
      {/* subtle top fade for readability over mesh bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm text-gray-300">
                Performance • SEO • Accessibility
              </span>
            </div>
          </div>

          <motion.h1
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="
              pt-1 md:pt-2
              text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight
              bg-[linear-gradient(90deg,#00C6FF,65%,#8A2BE2)]
              bg-clip-text text-transparent
            "
          >
            Website Development Services
          </motion.h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto lg:mx-0">
            We craft high-performance, SEO-friendly digital experiences tailored to your brand and
            business goals—built to convert and scale.
          </p>

          {/* rolling line */}
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
                Experiences that convert for {rotatingTags[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTAs (matched) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
            {/* Primary*/}
            <motion.a
              href="/contact"
              onMouseMove={onMagnetMove}
              onMouseLeave={onMagnetLeave}
              style={{ transform }}
              className="
                inline-flex items-center justify-center px-6 py-3 rounded-full
                bg-gradient-neon text-white font-semibold
                shadow-lg hover:shadow-xl
                [background-clip:padding-box] border border-transparent
                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
                transition-[transform,box-shadow] duration-150 hover:scale-[1.02]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50
                will-change-transform
              "
            >
              Start Your Project
            </motion.a>

            {/* Secondary (AiSummaryButton) – now visually consistent */}
            <AiSummaryButton
              content={pageContent}
              serviceName={serviceName}
              className=""
            />
          </div>

          {/* helper line */}
          <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs sm:text-sm justify-center lg:justify-start">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>AI summary gives a quick executive overview of this page.</span>
          </div>

          {/* Tech marquee unique to this page */}
          <div className="mt-6 md:block">
            <div className="relative w-full h-12 rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <div className="absolute inset-0 opacity-[0.9] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="whitespace-nowrap animate-roll font-mono text-[12px] leading-[48px] text-cyan-300/80 px-4">
                  React • Next.js • TypeScript • Tailwind • Vite • Vercel • Edge Caching • Image Optimization •
                  Lighthouse 95+ • a11y-first • ISR/SSG • SEO schema • React Server Components • Suspense
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Illustration + functional editor below on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex justify-center items-center"
        >
          <div className="relative w-full sm:w-[460px] md:w-[520px] lg:w-[560px]">
            <motion.div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-[50%] blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(0, 255, 255, 0.18), rgba(138, 43, 226, 0.12) 60%, transparent)",
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/images/webdev.png"
              alt="Web Development Illustration"
              width={800}
              height={560}
              className="rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Editor lives under left column on all sizes; fixed height + internal scroll to avoid clipping */}
      <div className="mx-auto max-w-7xl mt-6 md:mt-8 lg:mt-10">
        <div className="relative w-full rounded-xl border border-white/10 glass-card overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {(["app/page.tsx", "layout.tsx", "seo.config.ts"] as TabKey[]).map((t) => {
                const activeTab = t === active;
                return (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`px-2.5 py-1.5 rounded text-xs whitespace-nowrap border transition-colors ${
                      activeTab
                        ? "text-white border-white/20 bg-black/30"
                        : "text-gray-300 border-transparent hover:text-white hover:border-white/10"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onCopy}
                className="p-1.5 rounded border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                aria-label="Copy code"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={onReset}
                className="p-1.5 rounded border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                aria-label="Reset code"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor area */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="h-10 bg-gradient-to-b from-transparent via-white/6 to-transparent"
              />
            </div>

            <textarea
              aria-label={`Editor for ${active}`}
              value={files[active]}
              onChange={(e) => onChangeFile(e.target.value)}
              className="
                w-full font-mono text-[12px] md:text-[13px] leading-relaxed
                bg-black/20 text-cyan-300/90 caret-cyan-300
                outline-none resize-none p-4
                h-56 md:h-48 lg:h-56 xl:h-64
                overflow-auto custom-scrollbar
              "
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
