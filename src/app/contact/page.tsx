"use client";

import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { VantaBackground } from "@/components/VantaBackground";
import { AiAssistantInfo } from "@/components/AiAssistantInfo";
import { GetInTouchInfo } from "@/components/GetInTouchInfo";

const ContactPage = () => {
  return (
    <>
      <Toaster 
        position="top-center" 
        containerStyle={{
          zIndex: 9999,
        }}
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
      <div className="min-h-screen w-full bg-transparent text-foreground relative font-sans">
        
        <VantaBackground />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-28"
        >
          <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient-neon leading-tight mb-4">
              Connect with the Future
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
              Have a question or a brilliant idea? Reach out and let our AI-assisted platform guide your message.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-6xl mx-auto bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-slate-700"
          >

            {/* 1. AI Assistant (Mobile Only) - Appears on top */}
            <div className="lg:hidden mb-10">
              <AiAssistantInfo />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* 2. Contact Form - Middle on mobile, left on desktop */}
              <div>
                <ContactForm />
              </div>

              {/* 3. Info Column - Contains a hidden AI box for desktop and the Get in Touch box */}
              <div className="flex flex-col gap-10">
                {/* AI Assistant (Desktop Only) */}
                <div className="hidden lg:block">
                  <AiAssistantInfo />
                </div>

                {/* Get In Touch (Bottom on mobile, bottom-right on desktop) */}
                <div className="lg:pl-10 lg:border-l lg:border-slate-700">
                  <GetInTouchInfo />
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;