"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Wand, Sparkles, AlertCircle } from 'lucide-react';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
import toast from 'react-hot-toast';

// Custom hook for the typing effect
const useTypingEffect = (text: string, speed: number = 20) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        setDisplayedText('');
        if (text) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    return displayedText;
};

export const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', phone: '', requirementsPrompt: '' });
    const [aiState, setAiState] = useState({ suggestion: '', feedback: '', intent: '', generatedMessage: '' });
    const [loading, setLoading] = useState({ subject: false, prompt: false, submit: false });
    const [phoneError, setPhoneError] = useState('');
    const [generationStatus, setGenerationStatus] = useState('');

    const typedMessage = useTypingEffect(aiState.generatedMessage, 20);
    
    useEffect(() => {
        if (typedMessage === aiState.generatedMessage && aiState.generatedMessage) {
            setFormData(prev => ({ ...prev, message: aiState.generatedMessage }));
        }
    }, [typedMessage, aiState.generatedMessage]);
    
    const fetchAiResponse = async (prompt: string, action: 'generateMessage' | 'suggestSubject' | 'analyzeTone' | 'detectIntent') => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, action }),
            });
            if (!response.ok) throw new Error('AI service is currently unavailable.');
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(`Error in ${action}:`, error);
            toast.error(error instanceof Error ? error.message : 'An AI error occurred.');
            return '';
        }
    };
    
    const handleGenerateMessage = async () => {
        if (!formData.requirementsPrompt.trim()) {
            toast.error("Please enter your requirements first.");
            return;
        }
        setLoading(prev => ({ ...prev, prompt: true }));
        setGenerationStatus("AI is generating...");
        setAiState(prev => ({ ...prev, generatedMessage: '' }));
        
        const [message, intent] = await Promise.all([
            fetchAiResponse(formData.requirementsPrompt, 'generateMessage'),
            fetchAiResponse(formData.requirementsPrompt, 'detectIntent'),
        ]);

        if (message) {
            setAiState(prev => ({ ...prev, generatedMessage: message, intent }));
            setGenerationStatus("Generation complete! Review and edit the message below.");
        } else {
            setGenerationStatus("Generation failed. Please try again.");
        }

        setLoading(prev => ({ ...prev, prompt: false }));
    };

    const handlePhoneChange = (value: string | undefined) => {
        setFormData(prev => ({ ...prev, phone: value || '' }));
        if (phoneError) {
            setPhoneError('');
        }
    };
    
    const handlePhoneBlur = () => {
        const { phone } = formData;
        if (phone && !isPossiblePhoneNumber(phone)) {
            setPhoneError('This phone number seems too short or too long.');
        } else {
            setPhoneError('');
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone && !isValidPhoneNumber(formData.phone)) {
            setPhoneError('Please enter a valid phone number for the selected country.');
            toast.error('Invalid phone number.');
            return;
        }
        
        setLoading(prev => ({...prev, submit: true}));
        const submissionToast = toast.loading('Sending your message...');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...formData, intent: aiState.intent}),
            });

            const result = await response.json();
            if (!response.ok) {
                 const errorMsg = result.errors ? Object.values(result.errors).join(', ') : result.message;
                 throw new Error(errorMsg || 'Failed to send message.');
            }
            
            toast.success(result.message, { id: submissionToast });
            setFormData({ name: '', email: '', subject: '', message: '', phone: '', requirementsPrompt: '' });
            setAiState({ suggestion: '', feedback: '', intent: '', generatedMessage: '' });
            setPhoneError('');
            setGenerationStatus('');

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An unknown error occurred.', { id: submissionToast });
        } finally {
             setLoading(prev => ({...prev, submit: false}));
        }
    };

    const inputClasses = "w-full p-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 text-foreground placeholder-muted-foreground";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Your Name" required />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="your@example.com" required />
            </div>
             <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1.5">Phone Number <span className="text-muted-foreground">(Optional)</span></label>
                <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    className="PhoneInput-container"
                    placeholder="Enter phone number"
                    labels={en}
                />
                <AnimatePresence>
                    {phoneError && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-400 mt-2 flex items-center gap-2">
                            <AlertCircle size={16} /> {phoneError}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div>
                 <label htmlFor="requirementsPrompt" className="block text-sm font-medium text-white mb-1.5">
                    What can we help you with?
                </label>
                <textarea 
                    id="requirementsPrompt" 
                    name="requirementsPrompt" 
                    value={formData.requirementsPrompt} 
                    onChange={handleChange} 
                    rows="3" 
                    className={inputClasses} 
                    placeholder="e.g., I need a custom AI chatbot for my e-commerce site..." 
                />
                <div className="flex justify-end mt-2">
                    <button 
                      type="button"
                      onClick={handleGenerateMessage}
                      disabled={loading.prompt}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                        {loading.prompt ? <Wand size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        Generate Message
                    </button>
                </div>
                <AnimatePresence>
                    {generationStatus && (
                         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm mt-2 flex items-center gap-2 ${generationStatus.includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
                            <Zap size={16} /> {generationStatus}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">Your Message</label>
                <textarea id="message" name="message" value={typedMessage || formData.message} onChange={handleChange} rows="5" className={inputClasses} placeholder="Your detailed message will appear here after generation..." required />
            </div>
            <div>
                 <label htmlFor="subject" className="block text-sm font-medium text-white mb-1.5">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} placeholder="A subject line will be suggested here" required />
            </div>
             <button type="submit" disabled={loading.submit} className="w-full py-3 px-6 bg-gradient-neon text-primary-foreground font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                 {loading.submit ? <><Wand size={20} className="animate-spin" /> Submitting...</> : <><Send size={20} /> Send Message</>}
            </button>
        </form>
    );
};