import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Image from 'next/image';
import CursorGlow from '@/components/CursorGlow';
import DigitalGridOverlay from '@/components/DigitalGridOverlay';
import ClientLogos from '@/components/ClientLogos';
import Counters from '@/components/Counters';

export default function Home() {
  return (
    <main className="relative z-0">
      {/* Background for the entire Home page content */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Main_BG2.jpg"
          alt="Main Background"
          fill={true}
          className="fixed object-cover"
        />
      </div>

      {/* Overlays & Effects for the Home page only */}
      <CursorGlow />
      <DigitalGridOverlay />

      <div className="relative z-10">
        <HeroSection />
        <div id='about'>
          <AboutSection />
        </div>
        <ServicesSection />
        <div className="relative z-10 w-full ">
          <ClientLogos />
        </div>
        <TestimonialsSection />
        <Counters/>
      </div>
    </main>
  );
}

