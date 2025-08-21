"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Stat = { label: string; value: number; suffix?: string };
const stats: Stat[] = [
  { label: "AI Models Deployed", value: 50 },
  { label: "Industries Served", value: 10 },
  { label: "Avg. Accuracy Achieved", value: 95, suffix: "%" },
];

export default function StatsCounters() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafIds = useRef<number[]>([]);
  const prefersReduced = useRef(false);

  // prefers-reduced-motion (client-only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  // Fire only when visible the first time
  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    if (prefersReduced.current) {
      // show final numbers instantly
      setCounts(stats.map((s) => s.value));
      return;
    }

    // Smooth count-up
    stats.forEach((stat, i) => {
      const duration = 900; // ms
      const start = performance.now();

      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const val = Math.round(stat.value * eased);
        setCounts((prev) => {
          const next = [...prev];
          next[i] = val;
          return next;
        });
        if (p < 1) {
          rafIds.current[i] = requestAnimationFrame(tick);
        }
      };

      rafIds.current[i] = requestAnimationFrame(tick);
    });

    return () => {
      rafIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, [started]);

  return (
    <section ref={sectionRef} className="px-6 lg:px-20 md:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            viewport={{ once: true }}
            aria-live="polite"
          >
            <p className="text-4xl font-bold text-gradient-neon">
              {counts[idx]}
              {stat.suffix || ""}
            </p>
            <p className="text-gray-300 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
