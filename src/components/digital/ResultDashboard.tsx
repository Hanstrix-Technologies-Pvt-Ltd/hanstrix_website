// // components/digital/ResultDashboard.tsx
// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   LabelList,
// } from "recharts";
// import {
//   Rocket,
//   TrendingUp,
//   MousePointerClick,
//   Banknote,
//   Gauge,
//   Filter,
//   Info,
//   HelpCircle,
//   X,
// } from "lucide-react";

// /* ------------------ Demo data (UI preview only) ------------------ */
// const baseYear = [
//   { m: "Jan", spend: 12, revenue: 24, conv: 280, cvr: 2.1 },
//   { m: "Feb", spend: 14, revenue: 32, conv: 340, cvr: 2.4 },
//   { m: "Mar", spend: 18, revenue: 41, conv: 410, cvr: 2.6 },
//   { m: "Apr", spend: 16, revenue: 35, conv: 370, cvr: 2.5 },
//   { m: "May", spend: 21, revenue: 48, conv: 460, cvr: 2.7 },
//   { m: "Jun", spend: 20, revenue: 51, conv: 490, cvr: 2.9 },
//   { m: "Jul", spend: 22, revenue: 55, conv: 520, cvr: 3.0 },
//   { m: "Aug", spend: 23, revenue: 57, conv: 540, cvr: 3.1 },
//   { m: "Sep", spend: 19, revenue: 47, conv: 450, cvr: 2.8 },
//   { m: "Oct", spend: 21, revenue: 53, conv: 505, cvr: 2.95 },
//   { m: "Nov", spend: 24, revenue: 60, conv: 560, cvr: 3.15 },
//   { m: "Dec", spend: 26, revenue: 66, conv: 610, cvr: 3.25 },
// ];

// const channels = ["All", "SEO", "Ads", "Social", "Email"] as const;
// type Channel = (typeof channels)[number];

// function mutateByChannel(rows: typeof baseYear, channel: Channel) {
//   if (channel === "All") return rows;
//   const mult = { SEO: 0.95, Ads: 1.08, Social: 0.98, Email: 0.9 }[channel]!;
//   return rows.map((r) => ({
//     ...r,
//     spend: +(r.spend * (channel === "SEO" ? 0.75 : mult)).toFixed(2),
//     revenue: +(r.revenue * mult).toFixed(2),
//     conv: Math.round(r.conv * mult),
//     cvr: +(r.cvr * (channel === "Email" ? 1.15 : 1)).toFixed(2),
//   }));
// }

// const tabs = ["Performance", "Conversions", "ROI"] as const;
// type Tab = (typeof tabs)[number];

// /* ------------------ UI atoms ------------------ */
// const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//   <h2 className="text-2xl md:text-3xl font-bold text-gradient-neon text-center">{children}</h2>
// );

// const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <div className={`relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md ${className}`}>
//     <motion.div
//       aria-hidden
//       className="pointer-events-none absolute inset-0 rounded-2xl"
//       style={{
//         background:
//           "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 80%)",
//         backgroundSize: "200% 100%",
//       }}
//       animate={{ backgroundPositionX: ["0%", "100%"] }}
//       transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
//     />
//     <div className="relative z-10">{children}</div>
//   </div>
// );

// function KPI({
//   icon: Icon,
//   label,
//   value,
//   delta,
// }: {
//   icon: React.ElementType;
//   label: string;
//   value: string;
//   delta: string;
// }) {
//   const up = delta.trim().startsWith("+");
//   return (
//     <Card className="p-4 md:p-5 hover:shadow-[0_10px_40px_rgba(0,255,255,0.08)] transition-shadow">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-xl grid place-items-center border border-white/10 bg-white/10">
//           <Icon className="w-5 h-5 text-cyan-300" />
//         </div>
//         <div className="min-w-0">
//           <div className="text-white/80 text-sm">{label}</div>
//           <div className="text-lg md:text-2xl font-semibold text-white">{value}</div>
//           <div className={`text-xs mt-0.5 ${up ? "text-emerald-400" : "text-red-400"}`}>
//             {delta} vs last period
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// /* ------------------ Helpers ------------------ */
// function useMediaQuery(query: string) {
//   const [matches, setMatches] = React.useState(false);
//   useEffect(() => {
//     const mq = window.matchMedia(query);
//     const handler = () => setMatches(mq.matches);
//     handler();
//     // addEventListener fallback for older Safari
//     // @ts-ignore
//     (mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler));
//     return () =>
//       // @ts-ignore
//       (mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler));
//   }, [query]);
//   return matches;
// }

// /* ------------------ Conversions (Ladder + Mix + Heatmap) ------------------ */

// /** Smart label that moves outside if the bar is short */
// function LadderSmartLabel(props: any) {
//   const { x = 0, y = 0, width = 0, height = 0, value, payload } = props ?? {};
//   const p = payload ?? {};
//   const stage = p.stage ?? "";
//   const note = p.note ? ` • ${p.note}` : "";
//   const text = `${stage}: ${Number(value).toLocaleString()}${note}`;
//   const isNarrow = width < 90;
//   const tx = isNarrow ? x + width + 8 : x + 10;
//   const ty = y + height / 2 + 4;

//   return (
//     <text x={tx} y={ty} fill={isNarrow ? "#E5E7EB" : "#0b0b0c"} fontSize={12} fontWeight={700}>
//       {text}
//     </text>
//   );
// }

// function ConversionLadder({
//   impressions,
//   visits,
//   leads,
//   conversions,
//   ctr,
//   v2l,
//   l2c,
//   overallCVR,
// }: {
//   impressions: number;
//   visits: number;
//   leads: number;
//   conversions: number;
//   ctr: string;
//   v2l: string;
//   l2c: string;
//   overallCVR: string;
// }) {
//   const flow = [
//     { stage: "Impressions", value: impressions, note: "" },
//     { stage: "Visits", value: visits, note: `CTR ${ctr}` },
//     { stage: "Leads", value: leads, note: `V→L ${v2l}` },
//     { stage: "Conversions", value: conversions, note: `L→C ${l2c}` },
//   ];

//   // 👇 responsive tuning for mobile
//   const isSmUp = useMediaQuery("(min-width: 640px)");
//   const yAxisWidth = isSmUp ? 118 : 70;
//   const leftMargin = isSmUp ? 16 : 8;
//   const tickFont = isSmUp ? 12 : 11;

//   return (
//     <Card className="p-3 md:p-5 flex-1 flex flex-col">
//       <div className="flex items-center justify-between">
//         <h3 className="text-white font-semibold">Conversion Ladder</h3>
//         <div className="text-xs text-white/80">
//           Overall CVR: <span className="text-white font-semibold">{overallCVR}</span>
//         </div>
//       </div>

//       {/* Explicit height so ResponsiveContainer can measure */}
//       <div className="mt-2 h-[320px] sm:h-[360px] md:h-[420px] xl:h-[480px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             layout="vertical"
//             data={flow}
//             margin={{ top: 8, right: 16, left: leftMargin, bottom: 8 }}
//             barCategoryGap={isSmUp ? 18 : 14}
//             barGap={isSmUp ? 8 : 6}
//             style={{ overflow: "visible" }}
//           >
//             <defs>
//               <linearGradient id="grad0" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#00C6FF" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.85} />
//               </linearGradient>
//               <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.9} />
//               </linearGradient>
//               <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#c084fc" stopOpacity={0.9} />
//               </linearGradient>
//               <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="0">
//                 <stop offset="0%" stopColor="#c084fc" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#f472b6" stopOpacity={0.9} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
//             <XAxis type="number" hide />
//             <YAxis
//               type="category"
//               dataKey="stage"
//               width={yAxisWidth}
//               tick={{ fill: "#E5E7EB", fontSize: tickFont }}
//             />
//             <Tooltip
//               formatter={(v: number, _k, p: any) => [Number(v).toLocaleString(), p?.payload?.stage]}
//               contentStyle={{
//                 background: "rgba(0,0,0,0.85)",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 borderRadius: 12,
//                 backdropFilter: "blur(6px)",
//                 color: "white",
//               }}
//               itemStyle={{ color: "#fff" }}
//               labelStyle={{ color: "#fff" }}
//             />
//             <Bar dataKey="value" radius={[10, 10, 10, 10]} minPointSize={2}>
//               {flow.map((_f, i) => (
//                 <Cell key={i} fill={`url(#grad${i})`} />
//               ))}
//               <LabelList content={<LadderSmartLabel />} />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }

// function SourceMixPie({
//   conversions,
//   channel,
// }: {
//   conversions: number;
//   channel: Channel;
// }) {
//   const baseMix = [
//     { name: "SEO", weight: 0.28, color: "#22d3ee" },
//     { name: "Ads", weight: 0.42, color: "#8A2BE2" },
//     { name: "Social", weight: 0.18, color: "#60a5fa" },
//     { name: "Email", weight: 0.12, color: "#f472b6" },
//   ];

//   let raw = baseMix;
//   if (channel !== "All") {
//     raw = baseMix.map((s) =>
//       s.name === channel ? { ...s, weight: s.weight * 1.6 } : { ...s, weight: s.weight * 0.6 }
//     );
//     const sum = raw.reduce((a, b) => a + b.weight, 0);
//     raw = raw.map((s) => ({ ...s, weight: s.weight / sum }));
//   }

//   const data = raw.map((m) => ({
//     name: m.name,
//     value: Math.round(conversions * m.weight),
//     color: m.color,
//   }));
//   const total = data.reduce((a, b) => a + b.value, 0);

//   return (
//     <Card className="p-4 md:p-5">
//       <h3 className="text-white font-semibold">Source Mix</h3>
//       <div className="mt-2 h-[220px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={50}
//               outerRadius={78}
//               paddingAngle={3}
//               stroke="rgba(255,255,255,0.06)"
//             >
//               {data.map((d) => (
//                 <Cell key={d.name} fill={d.color} />
//               ))}
//               <LabelList
//                 dataKey="value"
//                 position="outside"
//                 formatter={(v: number, datum: any) => {
//                   const p = datum?.payload ?? datum ?? {};
//                   const nm = p.name ?? "";
//                   const pct = total ? Math.round((v / total) * 100) : 0;
//                   return `${nm} • ${pct}%`;
//                 }}
//                 style={{ fontSize: 11, fill: "#E5E7EB" }}
//               />
//             </Pie>
//             <Tooltip
//               contentStyle={{
//                 background: "rgba(0,0,0,0.85)",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 borderRadius: 12,
//                 backdropFilter: "blur(6px)",
//                 color: "white",
//               }}
//               itemStyle={{ color: "#fff" }}
//               labelStyle={{ color: "#fff" }}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="text-xs text-white/70">
//         Total conversions: <span className="text-white">{total.toLocaleString()}</span>
//       </div>
//     </Card>
//   );
// }

// function StageHeatmap({
//   data,
//   globalV2L,
//   globalL2C,
// }: {
//   data: typeof baseYear;
//   globalV2L: number; // 0..1
//   globalL2C: number; // 0..1
// }) {
//   const rows = data.map((row, i) => {
//     const wiggle = (i % 3) * 0.01;
//     const v2l = Math.max(0.05, Math.min(0.8, globalV2L + wiggle));
//     const l2c = Math.max(0.03, Math.min(0.6, globalL2C - wiggle / 2));
//     return { m: row.m, v2l, l2c };
//   });

//   const cell = (val: number, color: "cyan" | "violet") => {
//     const alpha = 0.15 + val * 0.6;
//     const bg = color === "cyan" ? `rgba(34,211,238,${alpha})` : `rgba(168,85,247,${alpha})`;
//     return { background: bg, border: "1px solid rgba(255,255,255,0.06)" } as React.CSSProperties;
//   };

//   return (
//     <Card className="p-4 md:p-5">
//       <h3 className="text-white font-semibold">Stage Cohorts (by month)</h3>
//       <div className="mt-3 grid grid-cols-3 text-xs">
//         <div className="text-white/70 px-2 py-1">Month</div>
//         <div className="text-white/70 px-2 py-1">Visit → Lead</div>
//         <div className="text-white/70 px-2 py-1">Lead → Conv</div>

//         {rows.map((r) => (
//           <React.Fragment key={r.m}>
//             <div className="px-2 py-1 text-white/85">{r.m}</div>
//             <div className="px-2 py-1 rounded-md" style={cell(r.v2l, "cyan")}>
//               {(r.v2l * 100).toFixed(1)}%
//             </div>
//             <div className="px-2 py-1 rounded-md" style={cell(r.l2c, "violet")}>
//               {(r.l2c * 100).toFixed(1)}%
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//       <div className="mt-2 text-[11px] text-white/60">
//         Darker = better performance in that month for the step.
//       </div>
//     </Card>
//   );
// }

// /* ------------------ Glossary copy ------------------ */
// const GLOSSARY = [
//   { term: "CTR", short: "Click-Through Rate", long: "CTR = (Clicks ÷ Impressions) × 100." },
//   { term: "Visit → Lead", short: "Visitor-to-Lead Rate", long: "V→L = (Leads ÷ Visits) × 100." },
//   { term: "Lead → Conv", short: "Lead-to-Conversion Rate", long: "L→C = (Conversions ÷ Leads) × 100." },
//   { term: "CVR", short: "Conversion Rate", long: "Overall conversions ÷ total audience (visits or impressions)." },
// ];

// /* ------------------ Main ------------------ */
// export default function ResultDashboard() {
//   const [tab, setTab] = useState<Tab>("Performance");
//   const [channel, setChannel] = useState<Channel>("All");
//   const [range, setRange] = useState<"3M" | "6M" | "YTD">("6M");
//   const [showGlossary, setShowGlossary] = useState(false);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowGlossary(false);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const data = useMemo(() => {
//     const rows = mutateByChannel(baseYear, channel);
//     if (range === "3M") return rows.slice(-3);
//     if (range === "6M") return rows.slice(-6);
//     return rows; // YTD
//   }, [channel, range]);

//   const totalSpend = data.reduce((a, b) => a + b.spend, 0);
//   const totalRev = data.reduce((a, b) => a + b.revenue, 0);
//   const convs = data.reduce((a, b) => a + b.conv, 0);
//   const roi = ((totalRev - totalSpend) / Math.max(totalSpend, 1)) * 100;

//   const conversions = Math.max(convs, 1);
//   const leads = Math.max(Math.round(conversions * 3.2), conversions + 1);
//   const visits = Math.max(Math.round(conversions * 8.5), leads + 1);
//   const impressions = Math.max(Math.round(conversions * 18), visits + 1);

//   const pct = (num: number, den: number) => num / den;
//   const ctr = (pct(visits, impressions) * 100).toFixed(1) + "%";
//   const v2l = (pct(leads, visits) * 100).toFixed(1) + "%";
//   const l2c = (pct(conversions, leads) * 100).toFixed(1) + "%";
//   const overallCVR = (pct(conversions, impressions) * 100).toFixed(1) + "%";
//   const drop1 = ((1 - pct(visits, impressions)) * 100).toFixed(1) + "%";
//   const drop2 = ((1 - pct(leads, visits)) * 100).toFixed(1) + "%";
//   const drop3 = ((1 - pct(conversions, leads)) * 100).toFixed(1) + "%";

//   return (
//     <section className="px-6 lg:px-20 py-10 md:py-14">
//       <SectionTitle>Live Results Dashboard</SectionTitle>

//       {/* Controls */}
//       <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-center gap-4">
//         {/* Channel */}
//         <div className="flex items-center gap-3">
//           <span className="text-white/70 text-xs uppercase tracking-wide flex items-center gap-1">
//             <Filter className="w-4 h-4 text-cyan-300" /> Channel
//           </span>
//           <div className="flex gap-2">
//             {channels.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setChannel(c)}
//                 className={`px-3 py-1.5 rounded-full text-sm border transition ${
//                   c === channel
//                     ? "text-white border-white/20 bg-white/10"
//                     : "text-white/75 border-white/10 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="hidden md:block h-6 w-px bg-white/10" />

//         {/* Timeline */}
//         <div className="flex items-center gap-3">
//           <span className="text-white/70 text-xs uppercase tracking-wide">Timeline</span>
//           <div className="flex gap-2">
//             {(["3M", "6M", "YTD"] as const).map((r) => (
//               <button
//                 key={r}
//                 onClick={() => setRange(r)}
//                 className={`px-3 py-1.5 rounded-full text-sm border transition ${
//                   r === range
//                     ? "text-white border-white/20 bg-white/10"
//                     : "text-white/75 border-white/10 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mt-6 flex items-center justify-center gap-2 border-b border-white/10">
//         {tabs.map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`relative px-4 py-2 text-sm font-medium transition-colors ${
//               t === tab ? "text-white" : "text-white/60 hover:text-white"
//             }`}
//           >
//             {t}
//             {t === tab && (
//               <motion.div
//                 layoutId="tab-underline"
//                 className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-neon"
//               />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* KPIs */}
//       <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//         <KPI icon={TrendingUp} label="Revenue" value={`$${totalRev.toFixed(1)}k`} delta="+8.4%" />
//         <KPI icon={Rocket} label="Ad Spend" value={`$${totalSpend.toFixed(1)}k`} delta="+4.1%" />
//         <KPI icon={MousePointerClick} label="Conversions" value={`${convs}`} delta="+5.7%" />
//         <KPI icon={Banknote} label="ROI" value={`${roi.toFixed(0)}%`} delta="+2.3%" />
//       </div>

//       {/* Content */}
//       <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
//         <AnimatePresence mode="wait">
//           {/* Performance */}
//           {tab === "Performance" && (
//             <>
//               <motion.div
//                 key="perf-main"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//                 className="xl:col-span-2"
//               >
//                 <Card className="p-4 md:p-5">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-white font-semibold">Spend vs Revenue</h3>
//                     <Gauge className="w-5 h-5 text-cyan-300" />
//                   </div>

//                   <div className="mt-2 flex items-center gap-4 text-xs text-white/80">
//                     <span className="inline-flex items-center gap-1">
//                       <span
//                         className="inline-block w-3 h-3 rounded-sm"
//                         style={{ background: "linear-gradient(180deg,#00C6FF,#00C6FF80)" }}
//                       />
//                       Spend (bar)
//                     </span>
//                     <span className="inline-flex items-center gap-1">
//                       <span className="inline-block w-4 h-[2px] bg-[#8A2BE2]" />
//                       Revenue (line)
//                     </span>
//                   </div>

//                   <div className="mt-2 h-[260px] md:h-[320px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="barCyan" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#00C6FF" stopOpacity={0.9} />
//                             <stop offset="100%" stopColor="#00C6FF" stopOpacity={0.35} />
//                           </linearGradient>
//                           <linearGradient id="lineViolet" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#8A2BE2" stopOpacity={1} />
//                             <stop offset="100%" stopColor="#8A2BE2" stopOpacity={0.5} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
//                         <XAxis dataKey="m" stroke="#9CA3AF" />
//                         <YAxis stroke="#9CA3AF" />
//                         <Tooltip
//                           contentStyle={{
//                             background: "rgba(0,0,0,0.75)",
//                             border: "1px solid rgba(255,255,255,0.1)",
//                             borderRadius: 12,
//                             backdropFilter: "blur(6px)",
//                             color: "white",
//                           }}
//                           itemStyle={{ color: "#fff" }}
//                           labelStyle={{ color: "#fff" }}
//                         />
//                         <Bar dataKey="spend" fill="url(#barCyan)" radius={[6, 6, 0, 0]} />
//                         <Line
//                           dataKey="revenue"
//                           type="monotone"
//                           stroke="url(#lineViolet)"
//                           strokeWidth={3}
//                           dot={{ r: 3, fill: "#8A2BE2" }}
//                           activeDot={{ r: 5 }}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </Card>
//               </motion.div>

//               <motion.div
//                 key="perf-side"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//               >
//                 <Card className="p-4 md:p-5">
//                   <h3 className="text-white font-semibold">Engagement Trend</h3>
//                   <div className="mt-2 h-[260px] md:h-[320px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
//                             <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
//                         <XAxis dataKey="m" stroke="#9CA3AF" />
//                         <YAxis stroke="#9CA3AF" />
//                         <Tooltip
//                           contentStyle={{
//                             background: "rgba(0,0,0,0.75)",
//                             border: "1px solid rgba(255,255,255,0.1)",
//                             borderRadius: 12,
//                             backdropFilter: "blur(6px)",
//                             color: "white",
//                           }}
//                           itemStyle={{ color: "#fff" }}
//                           labelStyle={{ color: "#fff" }}
//                         />
//                         <Area type="monotone" dataKey="conv" stroke="#22d3ee" strokeWidth={2} fill="url(#areaFill)" />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </Card>
//               </motion.div>
//             </>
//           )}

//           {/* Conversions */}
//           {tab === "Conversions" && (
//             <>
//               {/* LEFT: ladder + mini stats */}
//               <motion.div
//                 key="conv-left"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//                 className="xl:col-span-2 flex flex-col"
//               >
//                 <ConversionLadder
//                   impressions={impressions}
//                   visits={visits}
//                   leads={leads}
//                   conversions={conversions}
//                   ctr={ctr}
//                   v2l={v2l}
//                   l2c={l2c}
//                   overallCVR={overallCVR}
//                 />

//                 <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
//                     <div className="text-[11px] text-white/60">Impr → Visit</div>
//                     <div className="text-white font-semibold">
//                       {ctr} <span className="text-white/60">drop-off {drop1}</span>
//                     </div>
//                   </div>
//                   <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
//                     <div className="text-[11px] text-white/60">Visit → Lead</div>
//                     <div className="text-white font-semibold">
//                       {v2l} <span className="text-white/60">drop-off {drop2}</span>
//                     </div>
//                   </div>
//                   <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
//                     <div className="text-[11px] text-white/60">Lead → Conv</div>
//                     <div className="text-white font-semibold">
//                       {l2c} <span className="text-white/60">drop-off {drop3}</span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowGlossary(true)}
//                     className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left hover:bg-white/10 transition"
//                   >
//                     <div className="text-[11px] text-white/60 flex items-center gap-1">
//                       <HelpCircle className="w-3.5 h-3.5 text-cyan-300" /> Terminology
//                     </div>
//                     <div className="text-white font-semibold">Open quick definitions</div>
//                   </button>
//                 </div>
//               </motion.div>

//               {/* RIGHT: source mix + heatmap */}
//               <motion.div
//                 key="conv-right"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//                 className="space-y-6"
//               >
//                 <SourceMixPie conversions={conversions} channel={channel} />
//                 <StageHeatmap
//                   data={data}
//                   globalV2L={parseFloat(v2l) / 100}
//                   globalL2C={parseFloat(l2c) / 100}
//                 />
//               </motion.div>
//             </>
//           )}

//           {/* ROI */}
//           {tab === "ROI" && (
//             <>
//               <motion.div
//                 key="roi-main"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//                 className="xl:col-span-2"
//               >
//                 <Card className="p-4 md:p-5">
//                   <h3 className="text-white font-semibold">Return on Investment</h3>
//                   <div className="mt-2 h-[260px] md:h-[320px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#8A2BE2" stopOpacity={0.5} />
//                             <stop offset="100%" stopColor="#8A2BE2" stopOpacity={0.05} />
//                           </linearGradient>
//                           <linearGradient id="spFill" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
//                             <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.04} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
//                         <XAxis dataKey="m" stroke="#9CA3AF" />
//                         <YAxis stroke="#9CA3AF" />
//                         <Tooltip
//                           contentStyle={{
//                             background: "rgba(0,0,0,0.75)",
//                             border: "1px solid rgba(255,255,255,0.1)",
//                             borderRadius: 12,
//                             backdropFilter: "blur(6px)",
//                             color: "white",
//                           }}
//                           itemStyle={{ color: "#fff" }}
//                           labelStyle={{ color: "#fff" }}
//                         />
//                         <Area type="monotone" dataKey="revenue" stroke="#8A2BE2" fill="url(#revFill)" strokeWidth={2} />
//                         <Area type="monotone" dataKey="spend" stroke="#22d3ee" fill="url(#spFill)" strokeWidth={2} />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </Card>
//               </motion.div>

//               <motion.div
//                 key="roi-side"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -16 }}
//                 transition={{ duration: 0.35 }}
//                 className="flex"
//               >
//                 <Card className="w-full h-full flex items-center justify-center p-6 md:p-8" style={{ minHeight: 260 }}>
//                   <div className="text-center">
//                     <div className="text-white/70 text-sm">Current ROI</div>
//                     <div className="text-4xl md:text-5xl font-extrabold text-white mt-1">
//                       {roi.toFixed(0)}%
//                     </div>
//                     <div className="mt-3 text-xs text-white/70">
//                       Channel: <span className="text-white">{channel}</span>
//                     </div>
//                     <div className="mt-1 text-xs text-white/70">
//                       Range: <span className="text-white">{range}</span>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>

//       <p className="mt-4 text-center text-xs text-white/50">
//         * Demo data for UI/UX preview. Replace with your analytics to go live.
//       </p>

//       {/* Glossary Modal – offset to avoid navbar overlap */}
//       <AnimatePresence>
//         {showGlossary && (
//           <motion.div
//             role="dialog"
//             aria-modal="true"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="
//               fixed inset-0 z-[9999]
//               flex items-start justify-center
//               px-4
//               bg-black/80 backdrop-blur-sm
//               pt-[calc(72px+env(safe-area-inset-top))] sm:pt-[calc(88px+env(safe-area-inset-top))]
//             "
//           >
//             <motion.div
//               initial={{ scale: 0.96, y: 10, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.98, y: 6, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 220, damping: 26 }}
//               className="
//                 relative w-full sm:w-[95%] md:w-[820px] max-w-3xl
//                 rounded-xl border border-white/10 bg-[#0b0b0c]
//                 p-6
//                 overflow-y-auto
//                 max-h-[calc(100vh-140px)] sm:max-h-[calc(100vh-160px)]
//               "
//             >
//               <button
//                 onClick={() => setShowGlossary(false)}
//                 aria-label="Close terminology"
//                 className="absolute top-4 right-4 text-white/70 hover:text-white"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               <h4 className="text-xl md:text-2xl font-bold text-gradient-neon">Terminology</h4>
//               <p className="mt-1 text-sm text-white/70">
//                 Quick definitions for funnel & performance metrics used in this dashboard.
//               </p>

//               <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {GLOSSARY.map(({ term, short, long }) => (
//                   <div key={term} className="rounded-lg border border-white/10 bg-white/5 p-4">
//                     <div className="flex items-center gap-2">
//                       <Info className="h-4 w-4 text-cyan-300" />
//                       <div className="font-semibold text-white">{term}</div>
//                     </div>
//                     <div className="mt-1 text-sm text-white/80">{short}</div>
//                     <div className="mt-2 text-sm leading-relaxed text-white/70">{long}</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

