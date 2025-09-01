import type { Metadata } from "next";
import BackgroundEffects from "@/components/global/BackgroundEffects";
import ClientLogos from "@/components/ClientLogos";

// Sections
import HeroSection from "@/components/digital/HeroSection";
import CoreServices from "@/components/digital/CoreServices";
import StrategicPillars from "@/components/digital/StrategicPillars";
import WhyEssential from "@/components/digital/WhyEssential";
import CTASection from "@/components/digital/CTASection";
// import ResultsDashboard from "@/components/digital/ResultDashboard";

// Content
import {
  pageContent,
  serviceName,
} from "@/content/digitalmarketing-page-content";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Hanstrix Technologies",
  description:
    "Data-driven SEO, PPC, Social, Content, and Email marketing that grows your brand, leads, and revenue.",
};

export default function DigitalMarketingPage() {
  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      <div className="relative z-10">
        <HeroSection pageContent={pageContent} serviceName={serviceName} />
        <CoreServices />
        <StrategicPillars />
        <WhyEssential />
        {/* <ResultsDashboard /> */}
        <CTASection />
        <div className="px-6 sm:px-12 lg:px-20 pb-10">
          <ClientLogos />
        </div>
      </div>
    </main>
  );
}
