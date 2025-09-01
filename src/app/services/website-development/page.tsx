"use client";

import BackgroundEffects from "@/components/global/BackgroundEffects";
import HeroSection from "@/components/webdev/HeroSection";
import CoreOfferings from "@/components/webdev/CoreOfferings";
import WhyChooseUs from "@/components/webdev/WhyChooseUs";
import Process from "@/components/webdev/Process";
import Benefits from "@/components/webdev/Benefits";
import CTASection from "@/components/webdev/CTASection";
import ClientLogos from "@/components/ClientLogos";
import {
  coreOfferings,
  whyChooseUs,
  processSteps,
  benefits,
} from "@/content/webdev-page-content";

export default function WebsiteDevelopmentPage() {
  const serviceName = "Website Development Services";

  const pageContent = `
    Hanstrix Technologies: ${serviceName}
    We craft high-performance, SEO-friendly sites that convert.

    Core Offerings:
    ${coreOfferings.map(c => `${c.title}: ${c.description}`).join("\n")}

    Why Choose Us:
    ${whyChooseUs.map(i => `${i.title}: ${i.description}`).join("\n")}

    Process:
    ${processSteps.map(p => `${p.title}: ${p.description}`).join("\n")}

    Benefits:
    ${benefits.map(b => `- ${b}`).join("\n")}
  `;

  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <HeroSection pageContent={pageContent} serviceName={serviceName} />
        <CoreOfferings />
        <WhyChooseUs />
        <Process />
        <Benefits />
        <CTASection />
        <div className="relative z-10 w-full px-6 pb-8">
          <ClientLogos />
        </div>
      </div>
    </main>
  );
}
