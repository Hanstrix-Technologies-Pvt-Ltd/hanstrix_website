"use client";

import { motion } from "framer-motion";
import { Building2, Package, LineChart } from "lucide-react";

type Study = {
  logo?: string; // if you want to drop in a logo later
  icon: React.ElementType;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  before: string;
  after: string;
  spark: number[]; // simple sparkline data
};

const studies: Study[] = [
  {
    icon: Building2,
    title: "Enterprise Resource Unification",
    industry: "Corporate",
    problem: "Fragmented data across finance, HR, and procurement.",
    solution:
      "Unified, role-based ERP modules with automated approvals and real-time reporting.",
    before: "Reporting took 4–5 days",
    after: "Real-time visibility",
    spark: [6, 7, 5, 8, 10, 11, 14, 13, 16, 18],
  },
  {
    icon: Package,
    title: "Inventory Accuracy at Scale",
    industry: "Retail & Distribution",
    problem: "Stockouts & overstock due to manual reconciliation.",
    solution:
      "Automated stock sync across POS, WMS & e-commerce; demand alerts.",
    before: "72% accuracy",
    after: "97%+ accuracy",
    spark: [3, 4, 5, 7, 6, 8, 9, 11, 12, 13],
  },
  {
    icon: LineChart,
    title: "Finance Close Acceleration",
    industry: "Financial Services",
    problem: "Month-end close was slow & error-prone.",
    solution:
      "Custom ledgers, audit trails, and rule-based reconciliations within ERP.",
    before: "T+10 days close",
    after: "T+3 days close",
    spark: [12, 12, 11, 10, 9, 8, 8, 7, 6, 5],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 140;
  const h = 44;
  const step = w / (data.length - 1 || 1);

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / Math.max(1, max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-80">
      <polyline
        points={points}
        fill="none"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function CaseStudies() {
  return (
    <section className="px-6 lg:px-20 py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8 text-center"
      >
        ERP Case Snapshots
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {studies.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-5 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <s.icon className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-white font-semibold">{s.title}</h3>
                <p className="text-xs text-gray-400">{s.industry}</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-300 space-y-2">
              <p>
                <span className="text-white/90 font-medium">Problem: </span>
                {s.problem}
              </p>
              <p>
                <span className="text-white/90 font-medium">Solution: </span>
                {s.solution}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 p-3 bg-white/5">
                <p className="text-gray-400 text-xs">Before</p>
                <p className="text-white font-medium">{s.before}</p>
              </div>
              <div className="rounded-xl border border-white/10 p-3 bg-white/5">
                <p className="text-gray-400 text-xs">After</p>
                <p className="text-white font-medium">{s.after}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <span className="text-xs text-gray-300">Trajectory</span>
              <Sparkline data={s.spark} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
