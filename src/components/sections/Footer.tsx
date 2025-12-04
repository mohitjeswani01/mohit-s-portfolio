import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUp,
  MapPin,
  Terminal,
  Cpu
} from 'lucide-react';

const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 overflow-hidden pt-20 pb-10">

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/10 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* COLUMN 1: Brand Identity (Span 4) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Mohit Jeswani</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Bridging the gap between complex data systems and intuitive user interfaces.
              Engineering scalable solutions for the modern web.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/mohitjeswani01"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohit-jeswani-a06838309/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Navigation (Span 2 or 3) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="text-slate-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">About Me</a>
              </li>
              <li>
                <a href="/projects" className="text-slate-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Projects</a>
              </li>
              <li>
                <a href="/skills" className="text-slate-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Tech Stack</a>
              </li>
              <li>
                <a href="/achievements" className="text-slate-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Achievements</a>
              </li>
              <li>
                <a href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors inline-block hover:translate-x-1 duration-200">Contact Me</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Contact Details (Span 4) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors mt-0.5" />
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold mb-0.5">Email</span>
                  <a href="mailto:jeswanimohit959@gmail.com" className="text-slate-300 hover:text-white transition-colors text-sm">
                    jeswanimohit959@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors mt-0.5" />
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold mb-0.5">Phone</span>
                  <span className="text-slate-300 text-sm">+91 72764 23350</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors mt-0.5" />
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold mb-0.5">Base</span>
                  <span className="text-slate-300 text-sm">Mumbai, Maharashtra</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Scroll To Top (Hidden on mobile usually, but nice to have) */}
          <div className="md:col-span-12 lg:col-span-2 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm font-medium"
            >
              Back to Top
              <span className="p-2 bg-slate-900 border border-slate-800 rounded-lg group-hover:-translate-y-1 transition-transform">
                <ArrowUp className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {currentYear} Mohit Jeswani. Engineered with <span className="text-blue-500 hover:animate-pulse">React</span> & <span className="text-cyan-500 hover:animate-pulse">Tailwind</span>.
          </p>

          <div className="flex gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;