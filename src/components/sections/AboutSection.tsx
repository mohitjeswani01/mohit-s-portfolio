import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  LineChart,
  Server,
  GraduationCap,
  MapPin,
  Mail,
  BrainCircuit
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Column Animation
      gsap.from(leftColumnRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // 2. Skill Cards Stagger
      gsap.from(".tech-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 80%",
        }
      });

      // 3. Stat/Info Items
      gsap.from(".info-item", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 75%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // SEGMENTED SKILLS DATA (Developer vs Analyst)
  const devSkills = [
    { name: 'Java (OOP)', icon: Code2, color: 'text-orange-500' },
    { name: 'React & Next.js', icon: Cpu, color: 'text-blue-400' },
    { name: 'Node.js System', icon: Server, color: 'text-green-500' },
  ];

  const dataSkills = [
    { name: 'Python & Pandas', icon: Terminal, color: 'text-yellow-400' },
    { name: 'SQL & Warehousing', icon: Database, color: 'text-slate-300' },
    { name: 'Business Insights', icon: BrainCircuit, color: 'text-purple-400' },
    { name: 'Data Visualization', icon: LineChart, color: 'text-red-400' },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center bg-slate-950 py-20 px-6 overflow-hidden relative"
      id="about"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* --- LEFT COLUMN: The Narrative (Identity) --- */}
        <div ref={leftColumnRef} className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Mohit Jeswani</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Engineering Logic,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Data-Driven Insight.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              I don't just write code; I architect solutions. As a final-year Computer Engineering student,
              I operate at the intersection of <strong>Full-Stack Development</strong> and <strong>Data Analytics</strong>.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mt-4">
              My approach merges the structural discipline of Java OOP with the analytical power of Python and SQL.
              Whether it's building a decentralized app or Data Insights, I focus on scalability and clarity.
            </p>
          </div>

          {/* Key Stats / Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="info-item p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-white font-bold">B.E. Computer Eng.</h4>
                <p className="text-slate-400 text-sm">VESIT (CGPA: 7.03)</p>
                <p className="text-slate-500 text-xs mt-1">Class of 2026</p>
              </div>
            </div>

            <div className="info-item p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h4 className="text-white font-bold">Location</h4>
                <p className="text-slate-400 text-sm">Mumbai, India</p>
                <p className="text-slate-500 text-xs mt-1">Open to Relocation</p>
              </div>
            </div>

            <div className="info-item p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3 md:col-span-2">
              <Mail className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h4 className="text-white font-bold">Contact</h4>
                <p className="text-slate-400 text-sm">jeswanimohit959@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: The Arsenal (Skills) --- */}
        <div ref={rightColumnRef} className="relative">

          {/* Section 1: Development Stack */}
          <div className="mb-10">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" /> System Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devSkills.map((skill) => (
                <div key={skill.name} className="tech-card group flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors">
                  <div className={`p-2 rounded-lg bg-slate-950 ${skill.color}`}>
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Analytics & Data (NEW SECTION) */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-green-400" /> Data Intelligence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dataSkills.map((skill) => (
                <div key={skill.name} className="tech-card group flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-500/50 transition-colors">
                  <div className={`p-2 rounded-lg bg-slate-950 ${skill.color}`}>
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Float */}
          <div className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-slate-700 rounded-full opacity-20 animate-spin-slow pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;