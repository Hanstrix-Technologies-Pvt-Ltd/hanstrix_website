"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const TESTIMONIALS: Testimonial[] = [
  { quote: "Hanstrix Technologies transformed our online presence. Their expertise in digital marketing drove a significant increase in our lead generation, and the support was excellent.", name: "John Doe", title: "CEO, Tech Solutions Inc." },
  { quote: "The customized ERP solution they developed for us streamlined our operations and cut our costs by 20%. The team was professional and highly responsive.", name: "Jane Smith", title: "Operations Manager, Global Corp." },
  { quote: "Their website development team is top-notch. They delivered a beautiful, fast, and secure website that has received nothing but praise from our users.", name: "Alex Johnson", title: "Founder, Innovate Co." },
  { quote: "Hanstrix's AI solutions gave us a competitive edge. The predictive analytics they implemented completely changed how we make business decisions.", name: "Emily Davis", title: "Chief Data Officer, DataStream" },
  { quote: "From discovery to launch, the process was smooth. Our paid media ROAS improved by 35% within two months.", name: "Rahul Verma", title: "Head of Growth, SnapFin" },
  { quote: "Excellent collaboration and reliable delivery. Their SEO and content engine keeps driving compounding organic traffic.", name: "Sophia Lee", title: "Marketing Director, BloomLabs" },
];

export default function TestimonialsSection() {
  // Desktop/tablet marquee data (duplicated for seamless loop)
  const marqueeData = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS], []);
  // Mobile: tripled for true infinite wrap
  const N = TESTIMONIALS.length;
  const tripled = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS], []);
  const baseStartIndex = N; // middle copy
  const baseStartIndexRef = useRef(baseStartIndex); // stable snapshot for mount-only logic

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [snapOn, setSnapOn] = useState(true);
  const isTouchingRef = useRef(false);
  const touchEndTimer = useRef<number | null>(null);

  // Helpers
  const enableSnapNextFrame = useCallback(() => {
    requestAnimationFrame(() => setSnapOn(true));
  }, []);

  const teleport = useCallback((leftPx: number) => {
    const el = trackRef.current;
    if (!el) return;
    setSnapOn(false);
    el.scrollTo({ left: leftPx, behavior: "auto" });
    enableSnapNextFrame();
  }, [enableSnapNextFrame]);

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const el = trackRef.current;
      if (!el || cellWidth === 0) return;
      el.scrollTo({
        left: (baseStartIndexRef.current + i) * cellWidth,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [cellWidth]
  );

  // Measure slide width & land on the middle copy (mount + resize)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      setCellWidth(w);
      teleport(baseStartIndexRef.current * w);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [teleport]);

  // Infinite wrap + active dot sync
  useEffect(() => {
    const el = trackRef.current;
    if (!el || cellWidth === 0) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const raw = el.scrollLeft / cellWidth;
        const rawIndex = Math.max(0, Math.round(raw));

        // Left outer copy (0 .. N-1): teleport to middle, same item
        if (rawIndex < N) {
          teleport((rawIndex + N) * cellWidth);
          setActive(rawIndex);
          return;
        }
        // Right outer copy (2N .. 3N-1): teleport to middle, same item
        if (rawIndex >= 2 * N) {
          teleport((rawIndex - N) * cellWidth);
          setActive(rawIndex - 2 * N);
          return;
        }
        // Middle copy (N .. 2N-1)
        setActive(rawIndex - N);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [cellWidth, N, teleport]);

  // Pause autoplay during touch/drag; resume after momentum settles
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTouchStart = () => {
      isTouchingRef.current = true;
      if (touchEndTimer.current) {
        window.clearTimeout(touchEndTimer.current);
        touchEndTimer.current = null;
      }
    };
    const onTouchEndLike = () => {
      if (touchEndTimer.current) window.clearTimeout(touchEndTimer.current);
      touchEndTimer.current = window.setTimeout(() => {
        isTouchingRef.current = false;
      }, 220) as unknown as number;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("pointerdown", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEndLike, { passive: true });
    el.addEventListener("pointerup", onTouchEndLike, { passive: true });
    el.addEventListener("pointercancel", onTouchEndLike, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("pointerdown", onTouchStart);
      el.removeEventListener("touchend", onTouchEndLike);
      el.removeEventListener("pointerup", onTouchEndLike);
      el.removeEventListener("pointercancel", onTouchEndLike);
    };
  }, []);

  // Gentle autoplay on mobile (only when not touching)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || cellWidth === 0) return;
    const id = window.setInterval(() => {
      if (isTouchingRef.current) return;
      goTo((active + 1) % N, true);
    }, 3800);
    return () => window.clearInterval(id);
  }, [active, cellWidth, N, goTo]);

  return (
    <section id="testimonials" className="relative py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-200">
          Testimonials
        </h2>
      </div>

      {/* Desktop / Tablet: full-width slower marquee */}
      <div className="hidden md:block mt-10">
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          />
          <div className="flex w-max animate-ts-marquee-slow">
            {marqueeData.map((t, idx) => (
              <div key={`desk-a-${idx}`} className="w-96 md:w-[420px] lg:w-[460px] px-3">
                <Card className="bg-transparent border-white/20 text-white p-6 h-full">
                  <CardContent className="p-0">
                    <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                    <div className="text-right mt-4">
                      <p className="font-semibold text-cyan-400">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {marqueeData.map((t, idx) => (
              <div key={`desk-b-${idx}`} className="w-96 md:w-[420px] lg:w-[460px] px-3">
                <Card className="bg-transparent border-white/20 text-white p-6 h-full">
                  <CardContent className="p-0">
                    <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                    <div className="text-right mt-4">
                      <p className="font-semibold text-cyan-400">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: snap carousel with infinite wrap + clickable progress */}
      <div className="md:hidden mt-6">
        <div
          ref={trackRef}
          className={`flex overflow-x-auto no-scrollbar w-full touch-pan-x overscroll-x-contain ${
            snapOn ? "snap-x snap-mandatory" : "snap-none"
          }`}
          style={{
            scrollSnapType: snapOn ? "x mandatory" : "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tripled.map((t, i) => (
            <div key={`m-${i}`} className="shrink-0 w-full px-4 snap-start" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
              <Card className="bg-transparent border-white/20 text-white p-5 h-full">
                <CardContent className="p-0">
                  <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                  <div className="text-right mt-4">
                    <p className="font-semibold text-cyan-400">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.title}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Small clickable progress dots/bar */}
        <div className="mt-5 px-8">
          <div className="mx-auto max-w-[240px] w-full flex items-center gap-2">
            {Array.from({ length: N }).map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="relative h-1 flex-1 rounded-full overflow-hidden bg-white/20"
                >
                  <span
                    className={`absolute left-0 top-0 h-full ${
                      isActive ? "w-full" : "w-0"
                    } bg-gradient-to-r from-cyan-400 to-violet-500 transition-[width] duration-300`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local keyframes (ASCII-only) */}
      <style jsx>{`
        @keyframes ts-marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ts-marquee-slow { animation: ts-marquee-slow 70s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
