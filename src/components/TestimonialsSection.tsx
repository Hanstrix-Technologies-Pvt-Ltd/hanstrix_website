import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "Hanstrix Technologies transformed our online presence. Their expertise in digital marketing drove a significant increase in our lead generation, and the support was excellent.",
    name: "John Doe",
    title: "CEO, Tech Solutions Inc.",
  },
  {
    quote: "The customized ERP solution they developed for us streamlined our operations and cut our costs by 20%. The team was professional and highly responsive.",
    name: "Jane Smith",
    title: "Operations Manager, Global Corp.",
  },
  {
    quote: "Their website development team is top-notch. They delivered a beautiful, fast, and secure website that has received nothing but praise from our users.",
    name: "Alex Johnson",
    title: "Founder, Innovate Co.",
  },
  {
    quote: "Hanstrix's AI solutions gave us a competitive edge. The predictive analytics they implemented completely changed how we make business decisions.",
    name: "Emily Davis",
    title: "Chief Data Officer, DataStream",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 animate-fade-in-up text-zinc-200">
          TESTIMONIALS
        </h2>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-roll-testimonials">
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div key={index} className="w-80 mx-4 my-2 flex-shrink-0">
              <Card className="bg-transparent border-white border-opacity-20 text-white p-6 h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <p className="italic text-md mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="text-right">
                    <p className="font-bold text-cyan-400">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;