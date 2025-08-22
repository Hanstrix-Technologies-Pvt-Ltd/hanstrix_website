// Import all section components (existing and planned)
import HeroSection from "@/components/aiml/HeroSection";
import Features from "@/components/aiml/Features";
import InteractiveShowcase from "@/components/aiml/InteractiveShowcase";
import HowItWorks from "@/components/aiml/HowItWorks"; // To be created
import WhyChooseUs from "@/components/aiml/WhyChooseUs"; // To be created
import BusinessApplications from "@/components/aiml/BusinessApplications"; // To be created
import CaseStudies from "@/components/aiml/CaseStudies";
import StatsCounters from "@/components/aiml/StatsCounters";
import CTASection from "@/components/aiml/CTASection";
import BackgroundEffects from "@/components/global/BackgroundEffects";

// Import the centralized content
import {
  coreSolutions,
  howItWorks,
  businessApplications,
  whyChooseUs,
} from "@/content/aiml-page-content";

export default function AIMLPage() {
  // Consolidate all page content for the AI Summary button
  const serviceName = "AI & ML Solutions";
  const pageContent = `
    Service: ${serviceName}

    Our Core Solutions:
    ${coreSolutions.map(s => `${s.title}: ${s.description}`).join("\n")}

    Our Process:
    ${howItWorks.map(step => `${step.title}: ${step.description}`).join("\n")}

    Key Business Applications:
    ${businessApplications.map(app => `${app.title}: ${app.description}`).join("\n")}

    Why Choose Us:
    ${whyChooseUs.map(item => `${item.title}: ${item.description}`).join("\n")}
  `;

  return (
    <main className="relative text-white overflow-x-hidden">
      <BackgroundEffects />
      
      {/* Page content is wrapped in a relative div to stack above the fixed background */}
      <div className="relative z-10">
        <HeroSection pageContent={pageContent} serviceName={serviceName} />
        <StatsCounters />
        <Features />
        <HowItWorks /> 
        <InteractiveShowcase />
        <WhyChooseUs />
        <BusinessApplications />
        <CaseStudies />
        <CTASection />
      </div>
    </main>
  );
}
