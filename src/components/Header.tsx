import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Terminal,
  ChevronRight
} from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get current path

  // 1. Scroll Detection Logic (Only for visual style)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Skills', path: '/skills' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg shadow-blue-900/5'
        : 'bg-transparent py-5 border-b border-transparent'
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">

          {/* BRAND LOGO - Tech Persona */}
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-lg group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
              <Terminal className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Mohit<span className="text-blue-500">.dev</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">

            {/* Socials (Hidden on tiny screens) */}
            <div className="hidden sm:flex items-center gap-3 border-r border-slate-800 pr-4">
              <a
                href="https://github.com/mohitjeswani01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohit-jeswani-a06838309/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Resume Button (CTA) */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
              onClick={() => window.open('/mohit_jeswani_resume.pdf', '_blank')}
            >
              Resume
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="flex flex-col p-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-left group"
            >
              <span className={`text-base font-medium ${location.pathname === item.path ? 'text-blue-400' : 'text-slate-300'
                }`}>
                {item.label}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          {/* Mobile Socials */}
          <div className="flex items-center justify-center gap-6 pt-4 mt-4 border-t border-slate-800">
            <a href="https://github.com/mohitjeswani01" className="text-slate-400 hover:text-white"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/mohit-jeswani-a06838309/" className="text-slate-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;