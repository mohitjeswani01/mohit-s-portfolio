import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Database, Terminal, FileText, Github, Linkedin } from 'lucide-react';

// --- Configuration ---
const ROLES = [
  "SOFTWARE DEVELOPER",
  "DATA ANALYST",
  "PROBLEM SOLVER",
];

const TECH_STACK = [
  { name: "Java", icon: <Code2 size={16} /> },
  { name: "SQL", icon: <Database size={16} /> },
  { name: "React", icon: <Terminal size={16} /> },
  { name: "Next.js", icon: <FileText size={16} /> },
];

// --- Sub-Component: Decrypting Text Effect ---
const DecryptText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed of decryption
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="text-cyan-400 font-mono tracking-wider">{displayText}</span>;
};

const HomeSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // Rotate Roles Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500); // Change every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text-element", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(photoRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* Background: Technical Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Background: Glow Accent */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* --- Left Column: Text & Content --- */}
        <div className="space-y-8 text-center lg:text-left pt-10 lg:pt-0">

          {/* Status Badge */}
          <div className="hero-text-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-300">OPEN TO WORK</span>
          </div>

          <div className="space-y-4">
            <h2 className="hero-text-element text-lg md:text-xl text-gray-400 font-medium">
              Hello, I'm
            </h2>

            {/* Massive Name */}
            <h1 className="hero-text-element text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              MOHIT <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                JESWANI
              </span>
            </h1>

            {/* Dynamic Role (The Analyst Part) */}
            <div className="hero-text-element text-xl md:text-2xl font-medium h-8 flex justify-center lg:justify-start items-center gap-2">
              <span className="text-gray-500">&gt;</span>
              <DecryptText text={ROLES[roleIndex]} />
              <span className="animate-pulse text-cyan-400">_</span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-text-element text-base md:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Developer with an analyst’s mindset. I build end-to-end digital systems
            that combine engineering, data, and structured problem-solving.
            Experienced in workflow automation, data-driven decision systems,
            and full-stack development using Java, SQL, React, and Next.js.
          </p>

          {/* Tech Stack Ticker (Mini) */}
          <div className="hero-text-element flex flex-wrap gap-3 justify-center lg:justify-start">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-colors cursor-default">
                <span className="text-cyan-400">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="hero-text-element flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Button
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-none text-lg font-semibold tracking-wide"
              onClick={() => window.open('/mohit_jeswani_resume.pdf', '_blank')}
            >
              Download CV
            </Button>
          </div>
        </div>

        {/* --- Right Column: Visual/Analyst Profile --- */}
        <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
          <div ref={photoRef} className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">

            {/* Decorative Floating Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-[40px] opacity-40 animate-pulse"></div>

            {/* Glass Card Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-sm rounded-3xl transform rotate-3 transition-transform duration-500 hover:rotate-0 overflow-hidden">
              {/* Use your image here. Object-cover ensures it fills the card nicely */}
              <img
                src="/mohit-photo.png"
                alt="Mohit Jeswani"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
              />

              {/* Overlay Data Details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/10">
                <div className="flex justify-between items-center text-xs text-gray-300 font-mono">
                  <span>STATUS: ONLINE</span>
                  <span>LOC: MUMBAI</span>
                </div>
              </div>
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute -left-6 top-10 bg-[#0a0a0a] border border-gray-800 p-3 rounded-lg shadow-xl hidden md:block animate-bounce delay-700">
              <Database className="text-purple-400 mb-1" size={20} />
              <div className="text-[10px] text-gray-400 font-mono">DATA<br />ANALYTICS</div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -right-6 bottom-20 bg-[#0a0a0a] border border-gray-800 p-3 rounded-lg shadow-xl hidden md:block animate-bounce delay-1000">
              <Code2 className="text-cyan-400 mb-1" size={20} />
              <div className="text-[10px] text-gray-400 font-mono">WEB<br />DEVELOPMENT</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeSection;