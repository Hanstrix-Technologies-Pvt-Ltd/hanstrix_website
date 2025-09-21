import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="relative py-8 sm:py-10 min-h-screen">
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-8">
        {/* Our Vision and Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16 animate-fade-in-up">
          <Card className="bg-transparent border-white border-opacity-20 text-zinc-200 p-4 sm:p-5 md:p-6 shadow-lg card-glow-hover"> 
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-gradient-neon mb-2">Our Vision</CardTitle> 
            </CardHeader>
            <CardContent className="text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                To be a global leader in innovative technology solutions, empowering businesses to transform digitally, achieve sustainable growth, and drive positive change through cutting-edge website development, digital marketing, AI & ML, and customized ERP software.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-white border-opacity-20 text-zinc-200 p-4 sm:p-5 md:p-6 shadow-lg card-glow-hover animate-staggered-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-gradient-neon mb-2">Our Mission</CardTitle> {/* Added mb to title */}
            </CardHeader>
            <CardContent className="text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                At Hanstrix Technologies, our mission is to deliver tailored, result-oriented digital solutions that help businesses of all sizes accelerate growth, enhance operational efficiency, and maximize market impact. We are committed to excellence, innovation, and building lasting partnerships through technology-driven success.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why choose Hanstrix Technologies? */}
        <div className="mt-16 md:mt-24 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
            Why choose Hanstrix Technologies?
          </h2>
          <ul className="max-w-3xl mx-auto space-y-3 text-white text-base leading-relaxed">
            <li className="flex items-start lg:text-2xl space-x-2"> 
              <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Expertise in full-stack development and online marketing.</span>
            </li>
            <li className="flex items-start lg:text-2xl space-x-2"> 
              <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Proven success in implementing industry-specific AI and ERP solutions.</span>
            </li>
            <li className="flex items-start lg:text-2xl space-x-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Dedicated project management and ongoing technical support.</span>
            </li>
          </ul>
          <p className="max-w-3xl mx-auto lg:text-xl text-base leading-relaxed mt-4 md:mt-8 text-center md:text-left text-white">
            Unlock your business’s true potential —{" "}
            <Link href="#contact" className="text-cyan-400 hover:text-cyan-500 transition-colors">
              contact us
            </Link>{" "}
            and let Hanstrix Technologies guide your journey to digital success!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
