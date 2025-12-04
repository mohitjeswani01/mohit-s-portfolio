import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IconCloud from '@/components/magicui/icon-cloud'; // Preserving your import path

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cloudWrapperRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Updated Slugs: Added Python, Docker, Linux, and Testing tools to show depth.
  const iconSlugs = [
    "java",
    "python",
    "c",
    "javascript",
    "typescript",
    "react",
    "nextdotjs",
    "nodedotjs",
    "express",
    "html5",
    "css3",
    "tailwindcss",
    "postgresql",
    "mysql",
    "mongodb",
    "git",
    "github",
    "visualstudiocode",
    "docker",
    "linux",
    "postman",
    "vercel"
  ];

  // Data Structure: Clean, precise, separated by domain.
  const skillCategories = [
    {
      title: "Core Engineering",
      color: "text-blue-400",
      skills: ["Java (OOP)", "Data Structures", "Algorithms", "DBMS", "OS Architecture"]
    },
    {
      title: "Data & Analytics",
      color: "text-yellow-400",
      skills: ["Python", "SQL (Advanced)", "Excel", "Power BI", "Tableau", "Pandas"]
    },
    {
      title: "Full Stack Web",
      color: "text-purple-400",
      skills: ["React.js", "Next.js", "Node.js", "Express", "TailwindCSS", "REST APIs"]
    },
    {
      title: "Infrastructure & Tools",
      color: "text-green-400",
      skills: ["Git/GitHub", "MongoDB", "PostgreSQL", "VS Code", "Postman"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation (Precision Slide)
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      });

      // 2. Cloud Animation (Scale & Fade)
      gsap.from(cloudWrapperRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.1)", // Slight bounce for 3D feel
        scrollTrigger: {
          trigger: cloudWrapperRef.current,
          start: "top 75%",
        }
      });

      // 3. Skills List Stagger (Cascading Entry)
      gsap.from(".skill-category-item", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="min-h-screen py-24 px-4 bg-slate-950 relative overflow-hidden flex items-center"
    >
      {/* Background: Subtle Radial Glow to highlight the Cloud */}
      <div className="absolute top-1/2 left-0 md:left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Arsenal</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A hybrid stack bridging the gap between <span className="text-slate-200 font-medium">Application Development</span> and <span className="text-slate-200 font-medium">Data Intelligence</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: The Interactive Cloud (The "Toy") */}
          <div ref={cloudWrapperRef} className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Optional: Add a subtle border ring behind the cloud for structure */}
              <div className="absolute inset-0 rounded-full border border-slate-800/50 animate-pulse-slow" />
              <IconCloud iconSlugs={iconSlugs} />
            </div>
          </div>

          {/* RIGHT: The Structured Data (The "Facts") */}
          <div ref={categoriesRef} className="space-y-8 order-1 lg:order-2">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category-item group">
                {/* Category Title */}
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${category.color}`}>
                  <span className="w-8 h-[2px] bg-current opacity-50 group-hover:w-12 transition-all duration-300" />
                  {category.title}
                </h3>

                {/* Badge Grid */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all duration-200 cursor-default shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;