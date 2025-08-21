"use client";

import { motion } from "framer-motion";
import { erpSolutions } from "@/content/erp-page-content";

// simple tilt (no deps)
const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotX = (0.5 - py) * 6;
  const rotY = (px - 0.5) * 6;
  el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
};
const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
};

export default function Features() {
  return (
    <section className="px-6 lg:px-20 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-6 text-center"
      >
        ERP That Fits Your Operations
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {erpSolutions.map((f, idx) => (
          <motion.div
            key={f.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div
              className="
                glass-card rounded-2xl p-0 overflow-hidden h-full
                transition-transform duration-200 will-change-transform relative group
                grid grid-cols-[64px_1fr]
              "
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              {/* Left icon strip */}
              <div className="relative bg-white/5 border-r border-white/10 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-cyan-400" aria-hidden="true" />
                {/* vertical glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-purple-400/0" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col">
                {/* mask border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-cyan-400/30 transition-all duration-300" />

                {/* Reserve consistent title area */}
                <h3
                  className="
                    min-h-[2.75rem] flex items-center
                    text-lg md:text-xl font-semibold text-white
                  "
                >
                  {f.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mt-1 flex-1">
                  {f.description}
                </p>

                <div className="mt-4 h-[3px] rounded-full bg-gradient-neon opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
