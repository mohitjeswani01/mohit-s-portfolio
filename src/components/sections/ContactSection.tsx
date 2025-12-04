import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Copy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Added Subject field for professionalism
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Left Column (Info)
      gsap.from(leftColRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Animate Right Column (Form)
      gsap.from(rightColRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2, // Slight delay for visual hierarchy
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({ description: `${field} copied to clipboard!` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully",
      description: "Thanks for reaching out! I'll check my inbox and get back to you shortly.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen py-24 px-4 bg-slate-950 relative overflow-hidden flex items-center"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-900/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT COLUMN: Context & Contact Info */}
          <div ref={leftColRef} className="flex flex-col justify-center">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-8 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Opportunities
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Let's start a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Conversation.
              </span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
              Whether you have a question about my stack, a project proposal, or just want to discuss the latest in AI — I'm all ears.
            </p>

            <div className="space-y-6">
              {/* Email Block */}
              <div className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Email</p>
                  <p className="text-slate-200 font-medium">jeswanimohit959@gmail.com</p>
                </div>
                <button
                  onClick={() => copyToClipboard("jeswanimohit959@gmail.com", "Email")}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedField === "Email" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Block */}
              <div className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500 font-medium">Phone</p>
                  <p className="text-slate-200 font-medium">+91 72764 23350</p>
                </div>
                <button
                  onClick={() => copyToClipboard("+917276423350", "Phone")}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                  title="Copy Phone"
                >
                  {copiedField === "Phone" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Block */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="p-3 bg-green-500/10 text-green-400 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Location</p>
                  <p className="text-slate-200 font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div ref={rightColRef} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20" />

            <form
              onSubmit={handleSubmit}
              className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl"
            >
              <div className="space-y-6">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                      placeholder="Please enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                      placeholder="mohit@example.com"
                    />
                  </div>
                </div>

                {/* Subject Field - PROFESSIONAL ADDITION */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    placeholder="Project Proposal / Hiring / Consulting"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                    placeholder="Tell me about your requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;