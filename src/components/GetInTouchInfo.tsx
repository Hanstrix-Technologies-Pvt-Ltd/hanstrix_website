import { Mail, Phone, MapPin } from 'lucide-react';

export const GetInTouchInfo = () => {
  return (
    <div className="pt-10 border-t border-slate-700 lg:pt-0 lg:border-t-0">

      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 flex-nowrap">
        <MapPin className="text-cyan-400 flex-shrink-0" size={32} />
        <span className="text-gradient-neonsubtle">Get in Touch Directly</span>
      </h2>
      <div className="space-y-6 text-foreground">
        <div className="flex items-start gap-4">
          <Mail className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-lg text-white">Email Us</h3>
            <p className="text-muted-foreground">info@your-ai-startup.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="text-purple-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-lg text-white">Call Us</h3>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="text-pink-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-lg text-white">Our Office</h3>
            <p className="text-muted-foreground">123 AI Avenue, Innovation Park, Hyderabad, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};