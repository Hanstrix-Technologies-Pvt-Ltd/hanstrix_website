// Import all section components (existing and planned for ERP)
import HeroSection from "@/components/erp/HeroSection";
import Features from "@/components/erp/Features";
import HowItWorks from "@/components/erp/HowItWorks";
import WhyChooseUs from "@/components/erp/WhyChooseUs";
import IndustriesServed from "@/components/erp/IndustriesServed";
import KeyFeatures from "@/components/erp/KeyFeatures";
import CTASection from "@/components/erp/CTASection";
import StatsCounters from "@/components/erp/StatsCounters";
import BackgroundEffects from "@/components/global/BackgroundEffects";

// Import centralized ERP content
import {
  erpSolutions,
  howItWorksErp,
  whyChooseUsErp,
  industries,
  keyFeatures,
} from "@/content/erp-page-content";

export default function ERPPage() {
  // Consolidate page content for the AI Summary button
  const serviceName = "ERP Solutions";
  const pageContent = `
    Service: ${serviceName}

    Our Core Solutions:
    ${erpSolutions.map(s => `${s.title}: ${s.description}`).join("\n")}

    Our Process:
    ${howItWorksErp.map(step => `${step.title}: ${step.description}`).join("\n")}

    Key Features:
    ${keyFeatures.join("\n")}

    Industries We Serve:
    ${industries.map(ind => `${ind.name}: ${ind.description}`).join("\n")}

    Why Choose Us:
    ${whyChooseUsErp.map(item => `${item.title}: ${item.description}`).join("\n")}
  `;

  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />

      {/* Page content wrapper */}
      <div className="relative z-10">
        <HeroSection pageContent={pageContent} serviceName={serviceName} />
        <StatsCounters />
        <Features />
        <HowItWorks />
        <IndustriesServed />
        <KeyFeatures />
        <WhyChooseUs />
        <CTASection />
      </div>
    </main>
  );
}
