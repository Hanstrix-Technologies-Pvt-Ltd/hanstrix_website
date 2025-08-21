"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AiSummaryButton from "@/components/AISummaryButton";
import { Search, Rocket, Users, Edit, BarChart, Mail, TrendingUp, Compass } from "lucide-react";
import ClientLogos from "@/components/ClientLogos";

export default function DigitalMarketingPage() {
  const coreServices = [
    { title: "Search Engine Optimization (SEO)", description: "Maximize your visibility on Google and other search engines through keyword research, technical optimization, and quality link building, driving organic website traffic.", icon: Search },
    { title: "Pay-Per-Click (PPC) Advertising", description: "Attract targeted leads fast with Google Ads, Bing Ads, and social ads. We optimize every campaign for cost-efficiency and high ROI.", icon: Rocket },
    { title: "Social Media Marketing", description: "Increase your reach and engagement with strategic content, community management, and paid campaigns across Facebook, Instagram, Snapchat, and LinkedIn.", icon: Users },
    { title: "Content Marketing", description: "Boost your brand authority through well-crafted blog posts, articles, videos, and downloadable guides that educate and convert your audience.", icon: Edit },
    { title: "Email Marketing", description: "Crafting personalized email campaigns to nurture leads, build customer loyalty, and drive repeat business.", icon: Mail },
    { title: "Analytics & Reporting", description: "Track every click, lead, and conversion. Our transparent dashboards provide actionable insights for continual campaign improvement.", icon: BarChart },
  ];

  const strategicPillars = [
    { title: "Data-Driven Decisions", description: "Every strategy is informed by in-depth market research and performance analytics to ensure optimal results and continuous improvement.", icon: BarChart },
    { title: "Precision Targeting", description: "We identify and reach your ideal customers with highly specific campaigns, minimizing waste and maximizing engagement.", icon: Compass },
    { title: "Conversion Optimization", description: "Beyond traffic, our focus is on turning visitors into valuable leads and loyal customers through optimized funnels and compelling calls-to-action.", icon: Rocket },
    { title: "Continuous Adaptation", description: "The digital landscape is always changing. We constantly monitor trends, competitor activities, and campaign performance to adapt and refine your strategy.", icon: TrendingUp },
  ];

  const whyEssential = [
    "**Expand Brand Reach:** Connect with a wider audience online and build stronger brand recognition.",
    "**Generate Qualified Leads:** Attract potential customers who are genuinely interested in your products or services.",
    "**Maximize ROI:** Achieve better results with optimized spending and clear, measurable outcomes.",
    "**Enhance Customer Engagement:** Foster stronger relationships with your audience through personalized interactions.",
    "**Stay Competitive:** Adapt to market changes and outperform competitors with cutting-edge strategies.",
    "**Gain Actionable Insights:** Understand your audience and campaign performance with detailed analytics.",
  ];

  // Consolidating all content, including JSX text, for AI summary
  const pageContent = `
    Digital Marketing Services | Boost Your Brand & Sales Online
    Comprehensive Digital Marketing Solutions for Every Business

    Hanstrix Technologies delivers powerful digital marketing services that increase your online visibility, attract qualified leads, and improve your return on investment. We develop data-driven online marketing campaigns designed to grow your brand and revenue.

    Our Digital Marketing Services:
    ${coreServices.map(s => `${s.title}: ${s.description}`).join("\n")}

    Our Strategic Pillars:
    ${strategicPillars.map(p => `${p.title}: ${p.description}`).join("\n")}

    Why Digital Marketing is Essential for Your Business:
    ${whyEssential.join("\n")}

    Ready to transform your online presence and achieve your business goals? Partner with Hanstrix Technologies for expert digital marketing solutions.
  `;

  return (
    <div className="min-h-screen w-full text-white bg-cover bg-center relative" style={{ backgroundImage: "url('/images/bg3.jpg')" }}>
      <div className="absolute inset-0 bg-black/90 z-0" />

      <div className="relative z-10 pt-24 md:pt-32 lg:pt-24">
        {/* Hero Section */}
        <section className="relative px-6 sm:px-12 lg:px-20 py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col lg:flex-row items-center gap-6 md:gap-8 min-h-[calc(100vh-100px)] lg:min-h-0">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-neon leading-tight mb-4">
              Digital Marketing Services
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-4xl text-white font-semibold mb-4">
              Boost Your Brand & Sales Online
            </h2>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Hanstrix Technologies delivers powerful digital marketing services that increase your online visibility, attract qualified leads, and improve your return on investment. We develop data-driven online marketing campaigns designed to grow your brand and revenue.
            </p>
            <p className="mt-3 text-sm md:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto lg:mx-0">
              From SEO to social media, we provide comprehensive solutions tailored to your specific business goals, ensuring you connect with your audience and build lasting authority online.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <AiSummaryButton content={pageContent} serviceName="Digital Marketing Services" />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center lg:mt-0 max-w-[500px] lg:max-w-none mx-auto h-[250px] sm:h-[300px] md:h-[350px] lg:h-auto">
            <Image
              src="/images/DigiMarket.png"
              alt="Digital Marketing Illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-full object-contain"
              priority
            />
          </div>
        </section>

        {/* Core Services Section */}
        <section className="px-4 sm:px-6 lg:px-20 py-5 md:py-10 lg:py-15 bg-gradient-to-br from-black/50 to-gray-900/50 rounded-lg mx-4 sm:mx-6 lg:mx-20 shadow-xl border border-gray-700">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-10 text-center">
            Our Core Digital Marketing Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => (
            <Card key={idx} className="bg-black/60 border border-gray-700 rounded-xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-start gap-4 card-glow-hover">
                <div className="flex items-center gap-4">
                <service.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <CardTitle className="text-xl md:text-2xl font-semibold text-gradient-neonsubtle">
                    {service.title}
                </CardTitle>
                </div>
                <CardContent className="p-0">
                <p className="text-gray-300 text-base md:text-lg">{service.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </section>

        {/* Strategic Pillars Section */}
        <section className="px-6 sm:px-12 lg:px-20 py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-10 text-center">
            Our Strategic Pillars: How We Drive Your Growth
          </h2>
          {/* Desktop View */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategicPillars.map((pillar, idx) => (
              <Card key={idx} className="bg-black/40 border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-start gap-4 hover:scale-105 transition-all duration-300 card-glow-hover">
                <div className="flex items-center gap-4">
                  <pillar.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <CardTitle className="text-xl md:text-2xl font-semibold text-gradient-neonsubtle">
                    {pillar.title}
                  </CardTitle>
                </div>
                <CardContent className="p-0">
                  <p className="text-gray-300 text-base md:text-lg">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Mobile View */}
          <ul className="lg:hidden space-y-4 list-inside text-white text-base md:text-lg">
            {strategicPillars.map((pillar, idx) => (
              <li key={idx} className="flex items-start gap-3 before:content-['➣'] before:text-cyan-400 before:text-2xl">
                <span className="flex-1">
                  <strong className="text-gradient-neonsubtle">{pillar.title}</strong> - {pillar.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-6 md:py-10 bg-gray-900/60 rounded-lg mx-5 sm:mx-12 lg:mx-20 shadow-xl border border-gray-700 mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-neon mb-10 text-center">
            Why Digital Marketing Is Essential For Your Business
        </h2>   
        {/* Desktop View */}
        <ul className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white text-base md:text-lg list-none p-0">
            {whyEssential.map((benefit, idx) => {
            const parts = benefit.split('**');
            return (
                <li key={idx} className="flex items-start gap-3 before:content-['✅'] before:text-cyan-400 before:text-2xl">
                <span className="flex-1">
                    <strong className="text-white">{parts[1]}</strong>{parts[2]}
                </span>
                </li>
            );
            })}
        </ul>
        {/* Mobile View */}
        <ul className="sm:hidden space-y-4 list-inside text-white text-base md:text-lg">
            {whyEssential.map((benefit, idx) => {
            const parts = benefit.split('**');
            return (
                <li key={idx} className="flex items-start gap-2 before:content-['➣'] before:text-cyan-400 before:text-2xl">
                <span className="flex-1">
                    <strong className="text-cyan-500">{parts[1]}</strong>{parts[2]}
                </span>
                </li>
            );
            })}
        </ul>
        </section>

        <section className="text-center px-6 sm:px-12 lg:px-20 py-16 bg-black/50 border-t border-gray-700">
          <h2 className="text-2xl md:text-4xl font-bold text-gradient-neon mb-6">
            Ready to Make Your Online Presence Impactful?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Partner with Hanstrix Technologies for expert digital marketing solutions that deliver real results.
          </p>
          <a href="/contact" className="inline-block bg-gradient-neon text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            Boost Your Brand
          </a>
        </section>

        <div className="relative z-10 w-full pt-6 pb-6 md:pt-15 md:pb-15">
          <ClientLogos />   
        </div>
      </div>
    </div>
  );
}