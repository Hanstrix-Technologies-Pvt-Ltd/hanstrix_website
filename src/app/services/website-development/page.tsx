"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AiSummaryButton from "@/components/AISummaryButton";
import { Lightbulb, Zap, TrendingUp, Code, CheckCircle2 } from "lucide-react";
import ClientLogos from "@/components/ClientLogos";

export default function WebsiteDevelopmentPage() {
  const coreOfferings = [
    { title: "Custom Website Design", description: "Visually appealing, branded websites that truly reflect your business identity. Modern, user-friendly, and tailored to achieve your goals." },
    { title: "Responsive & Mobile-Friendly", description: "Seamless Browse experience across smartphones, tablets, and desktops. Enhances user engagement and boosts search rankings." },
    { title: "SEO-Optimized Build", description: "Meta tags, lightning-fast loading, image optimization, and structured data to help you rank higher in search results." },
    { title: "E-Commerce Solutions", description: "Secure payments, real-time inventory, intuitive catalogs, and smooth checkout flows to maximize sales." },
    { title: "Website Maintenance & Support", description: "Regular updates, security patches, and proactive monitoring to keep your site running 24/7." },
  ];

  const features = [
    { title: "Strategic Design & UX", description: "User-centric designs that are intuitive and guide visitors effortlessly.", icon: Lightbulb },
    { title: "Performance Driven", description: "Optimized for speed and efficiency for every device.", icon: Zap },
    { title: "Scalable Architecture", description: "Built to grow with your business and adapt to future needs.", icon: TrendingUp },
    { title: "Modern Technologies", description: "We use Next.js, React, Tailwind, and modern CSS for robust solutions.", icon: Code },
    { title: "Security By Design", description: "Enterprise-grade security integrated at every layer of your site.", icon: CheckCircle2 },
  ];

  const processSteps = [
    { title: "Discovery & Strategy", description: "In-depth consultation to define goals, target audience, and a clear roadmap." },
    { title: "UI/UX Design", description: "Crafting intuitive interfaces and engaging experiences for users." },
    { title: "Development & Coding", description: "Building with clean, efficient, and scalable code using modern stacks." },
    { title: "Testing & QA", description: "Rigorous multi-device testing for flawless performance." },
    { title: "Deployment & Launch", description: "Smooth and secure go-live with optimal configuration." },
    { title: "Post-Launch Support", description: "Ongoing updates, monitoring, and optimizations." },
  ];

  const benefits = [
    "Higher search visibility and traffic.",
    "Intuitive UX/UI interactions.",
    "Latest tech for a future-proof website.",
    "Scalable solutions for evolving needs.",
    "Strong brand credibility online.",
    "Lower costs with efficient web systems.",
  ];

  // Consolidating all content into a single string to be sent to the AI
  const pageContent = `
    Hanstrix Technologies: Website Development Services.
    We specialize in crafting High-Performance, SEO-Friendly Digital Experiences tailored to your brand and business goals. We build powerful online presences that drive leads, amplify brand visibility, and convert visitors into loyal customers.

    Core Offerings:
    ${coreOfferings.map(c => `${c.title} - ${c.description}`).join("\n")}

    Features:
    ${features.map(f => `${f.title} - ${f.description}`).join("\n")}

    Process Steps:
    ${processSteps.map(p => `${p.title} - ${p.description}`).join("\n")}

    Benefits:
    ${benefits.join("\n")}
    `;

  return (
    <div className="min-h-screen w-full text-white bg-cover bg-center relative" style={{ backgroundImage: "url('/images/bg3.jpg')" }}>
      <div className="absolute inset-0 bg-black/90 z-0" />

      <div className="relative z-10">
        <section className="relative px-6 sm:px-12 lg:px-20 pt-25 lg:pt-32 pb-12 flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gradient-neon">
              Website Development Services
            </h1>
            <p className="mt-4 text-base md:text-xl lg:text-3xl text-white leading-snug">
              Crafting High-Performance, SEO-Friendly Digital Experiences tailored to your brand and business goals.
            </p>
            <p className="mt-3 text-base md:text-lg lg:text-2xl text-white leading-relaxed">
              At Hanstrix Technologies, we specialize in building powerful online presences that drive leads, amplify brand visibility, and convert visitors into loyal customers.
            </p>
            <div className="mt-4">
              <AiSummaryButton content={pageContent} serviceName="Website Development Services" />
            </div>
          </div>
          <div className="flex-1 lg:mt-0">
            <Image
              src="/images/webdev.png"
              alt="Web Development Illustration"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-full h-auto"
              priority
            />
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 lg:py-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8">
            Our Core Website Development Services
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {coreOfferings.map((item, idx) => (
              <Card key={idx} className="bg-black/40 border border-white rounded-2xl hover:scale-105 transition-transform duration-300 w-full sm:w-[45%] lg:w-[30%] card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-gradient-neonsubtle">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-base md:text-lg">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8">
            Why Choose Hanstrix?
          </h2>
          <div className="hidden lg:flex flex-wrap justify-center gap-6">
            {features.map((f, idx) => (
              <Card key={idx} className="bg-black/40 border border-white rounded-2xl hover:scale-105 transition-transform duration-300 w-[30%] card-glow-hover">
                <CardHeader className="flex items-center gap-3">
                  <f.icon className="w-6 h-6 text-cyan-400" />
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-gradient-neonsubtle">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-base md:text-lg">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Mobile View */}
          <ul className="lg:hidden space-y-3 list-inside text-white text-base md:text-lg">
            {features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2 before:content-['➣'] before:text-cyan-400">
                <span>{f.title} - {f.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 lg:py-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8">
            Our Development Process
          </h2>
          <div className="hidden lg:flex flex-wrap justify-center gap-6">
            {processSteps.map((step, idx) => (
              <Card key={idx} className="bg-black/40 border border-white rounded-2xl hover:scale-105 transition-transform duration-300 w-[30%] card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-gradient-neonsubtle">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-base md:text-lg">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Mobile View */}
          <ul className="lg:hidden space-y-3 list-inside text-white text-base md:text-lg">
            {processSteps.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2 before:content-['➣'] before:text-cyan-400">
                <span>{p.title} - {p.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-12 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-8">
            Benefits of Working With Us
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-3 w-full sm:w-[45%] lg:w-[30%]">
                <span className="before:content-['➣'] before:text-cyan-400 before:text-lg text-white text-base md:text-lg">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section - Website Development Focus */}
        <section className="text-center px-6 sm:px-12 lg:px-20 py-16 bg-black/50 border-t border-gray-700">
          <h2 className="text-2xl md:text-4xl font-bold text-gradient-neon mb-6">
            Ready to bring your vision to life?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Partner with Hanstrix Technologies to build a powerful and modern website that drives growth and defines your online presence.
          </p>
          <a href="/contact" className="inline-block bg-gradient-neon text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            Start Your Project
          </a>
        </section>

        <div className="relative z-10 w-full pb-6 py-2 md:py-5">
          <ClientLogos />
        </div>
      </div>
    </div>
  );
}