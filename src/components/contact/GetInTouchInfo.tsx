import { Mail, Phone, MapPin } from "lucide-react";

export const GetInTouchInfo = () => {
  return (
    <div className="pt-6 sm:pt-8 border-t border-slate-700 lg:pt-0 lg:border-t-0">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-5 flex items-center gap-3 flex-nowrap">
        <span className="text-gradient-neonsubtle">Get in Touch Directly</span>
      </h2>

      <div className="space-y-5 text-foreground">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Email Us</h3>
            <a
              href="mailto:info@hanstrix.com"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
              aria-label="Email info at hanstrix dot com"
            >
              info@hanstrix.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Call Us</h3>
            <a
              href="tel:+919876543210"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
              aria-label="Call plus nine one nine eight seven six five four three two one zero"
            >
              +91 98765 43210
            </a>
          </div>
        </div>

        {/* Address (optional: link to maps) */}
        <div className="flex items-start gap-3">
          <MapPin className="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-base sm:text-lg text-white">Our Office</h3>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded">
              123 AI Avenue, Innovation Park, Hyderabad, India
            </p>
            {/* Or make it clickable: */}
            {/*
            <a
              href="https://www.google.com/maps/search/?api=1&query=123%20AI%20Avenue%2C%20Innovation%20Park%2C%20Hyderabad%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-muted-foreground hover:text-white underline decoration-cyan-400/70 underline-offset-2 hover:decoration-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded"
            >
              123 AI Avenue, Innovation Park, Hyderabad, India
            </a>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};
