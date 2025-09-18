"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi,} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

// Best 3
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Hanstrix delivered a clean, fast, and secure website for Radiant. The team understood our brand, executed quickly, and the final site performs flawlessly across devices.",
    name: "Ashok Godavarti",
    title: "CEO, Radiant Research Services Pvt Ltd",
  },
  {
    quote:
      "The customized ERP system delivered by Hanstrix streamlined our parking operations, automated reporting, and significantly improved efficiency across departments.",
    name: "Mohit Gowda",
    title: "CEO, Stelz Parking Pvt Ltd",
  },
  {
    quote:
      "Hanstrix’s digital marketing plus AI/ML strategy boosted our reach and decision-making. Their data-driven approach and execution quality stood out from day one.",
    name: "Kalagara Vijaya Radha Krishna",
    title: "CEO, Stock Navii",
  },
];

export default function TestimonialsSection() {
  const N = TESTIMONIALS.length;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setItemRef = (idx: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[idx] = el;
  };
  const [uniformH, setUniformH] = useState<number | null>(null);

  const measureHeights = () => {
    const h = Math.max(
      0,
      ...itemRefs.current.map((el) => (el ? el.offsetHeight : 0))
    );
    setUniformH(Number.isFinite(h) && h > 0 ? h : null);
  };

  useEffect(() => {
    const rAF = requestAnimationFrame(measureHeights);
    const onResize = () => measureHeights();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(measureHeights);
    itemRefs.current.forEach((el) => el && ro.observe(el));

    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  const bodyStyle = uniformH ? { minHeight: `${uniformH}px` } : undefined;

  return (
    <section id="testimonials" className="relative section-spacing">
      <div className="container mx-auto max-w-7xl container-gutters">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-neon inline-block">
            Testimonials
          </h2>
        </div>
      </div>

      {/* md-only: marquee (duplicate list) */}
      {N > 2 && (
        <div className="hidden md:block lg:hidden mt-8">
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
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div
                  key={`md-${idx}`}
                  className="w-80 sm:w-[360px] md:w-[380px] px-3"
                >
                  <Card className="bg-transparent border-white/20 text-white p-6 h-full">
                    <CardContent className="p-0">
                      <div style={bodyStyle}>
                        <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                        <div className="text-right mt-4">
                          <p className="font-semibold text-cyan-400">{t.name}</p>
                          <p className="text-sm text-gray-400">{t.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* lg+ static 3-column */}
      <div className="hidden lg:block mt-10">
        <div className="container mx-auto max-w-7xl container-gutters">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <Card
                key={`lg-${idx}`}
                className="bg-transparent border-white/20 text-white p-6 h-full"
              >
                <CardContent className="p-0">
                  <div
                    ref={setItemRef(idx)}
                    style={bodyStyle}
                  >
                    <p className="text-base leading-relaxed opacity-90">{t.quote}</p>
                    <div className="text-right mt-4">
                      <p className="font-semibold text-cyan-400">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* sm-only: shadcn carousel (loop + one-card-per-swipe), equal heights */}
      <div className="md:hidden mt-6">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {TESTIMONIALS.map((t, i) => (
              <CarouselItem key={`m-${i}`} className="basis-full">
                <div className="px-4">
                  <div className="container mx-auto max-w-3xl">
                    <Card className="bg-transparent border-white/20 text-white p-5 h-full">
                      <CardContent className="p-0">
                        {/* measure base items here too */}
                        <div
                          ref={setItemRef(i)}
                          style={bodyStyle}
                        >
                          <p className="text-[15px] leading-relaxed opacity-90">{t.quote}</p>
                          <div className="text-right mt-4">
                            <p className="font-semibold text-cyan-400">{t.name}</p>
                            <p className="text-sm text-gray-400">{t.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* progress bars (click to jump) */}
        <div className="mt-5 px-8">
          <div className="mx-auto max-w-[240px] w-full flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  className="relative h-1 flex-1 rounded-full overflow-hidden bg-white/20"
                  aria-label={`Go to testimonial ${i + 1}`}
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

      <style jsx>{`
        @keyframes ts-marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ts-marquee-slow { animation: ts-marquee-slow 40s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
