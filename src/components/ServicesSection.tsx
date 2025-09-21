import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "AI & Machine Learning",
    description: "Stay competitive with AI and machine learning solutions from Hanstrix Technologies. We help organizations harness the power of real-time data and intelligent automation to drive smarter decisions. Our expertise includes:",
    listItems: [
      "Generative AI",
      "Natural Language Processing (NLP)",
      "Predictive Analytics",
      "Computer Vision",
      "Machine Learning Operations (MLOps)",
      "Data Annotation and Management",
    ],
    imageSrc: "/images/AI.png",
    alt: "AI & Machine Learning",
    href: "/services/ai-ml",
  },
  {
    title: "ERP Solutions",
    description: "We offer customized ERP software to streamline your business processes, enhance operational efficiency, and reduce costs. Our solutions integrate all aspects of your business, from finance and human resources to inventory and sales. Our ERP services include:",
    listItems: [
      "Custom ERP Software Development",
      "ERP Implementation and Integration",
      "Module Customization",
      "Data Migration and Support",
    ],
    imageSrc: "/images/ERP.png",
    alt: "ERP Solutions",
    href: "/services/erp-software", 
  },
  {
    title: "Website Development",
    description: "We build responsive, high-performance websites using modern technologies like React, Next.js, Tailwind CSS, and Express.js. Our solutions are SEO-optimized, fast, and seamless across devices—whether it's a landing page, blog, or full-stack platform. Our key areas of focus include:",
    listItems: [
      "Responsive Design",
      "Content Management",
      "User Settings",
      "Apps Development",
      "Web Coding",
      "UI/UX Layout",
      "Rigorous Testing Features",
      "Web Analytics",
    ],
    imageSrc: "/images/webdev.png",
    alt: "Web Development",
    href: "/services/website-development", 
  },
  {
    title: "Digital Marketing",
    description: "We deliver powerful digital marketing services that increase your online visibility, attract qualified leads, and improve your return on investment. Our strategies are built on a foundation of data-driven insights. Our services include:",
    listItems: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Pay-Per-Click (PPC) campaigns",
      "Content Marketing",
      "Web Analytics",
    ],
    imageSrc: "/images/DigiMarket.png",
    alt: "Digital Marketing",
    href: "/services/digital-marketing", 
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-8 min-h-screen">
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 animate-fade-in-up">
          Our Services
        </h2>

        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-24 items-center animate-fade-in-up ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="order-1 md:order-2 w-full md:w-1/2 lg:w-1/2 xl:w-[45%]">
              <Image
                src={service.imageSrc}
                alt={service.alt}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-2 md:order-1 w-full md:w-1/2 lg:w-1/2 xl:w-[55%]">
              <Card className="bg-transparent border-white border-opacity-20 text-zinc-200 p-4 sm:p-6 md:p-8 shadow-lg card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gradient-neon">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-base sm:text-lg leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {service.listItems.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2 text-base sm:text-lg">
                        <span className="text-cyan-400 font-bold">&#8226;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={service.href} passHref>
                    <Button className="w-full sm:w-auto px-6 py-3 text-lg font-semibold rounded-lg shadow-lg
                                        bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700
                                        text-white transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
