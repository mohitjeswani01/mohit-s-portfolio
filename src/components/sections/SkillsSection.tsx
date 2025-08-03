import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IconCloud from '@/components/magicui/icon-cloud';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate title
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    });

    // Animate icon cloud
    tl.fromTo(cloudRef.current, {
      scale: 0.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, 0.5);

    // Animate skill categories
    tl.fromTo(skillsRef.current?.children, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out'
    }, 1);

    return () => {
      tl.kill();
    };
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages:",
      skills: ["C", "JavaScript", "Java"]
    },
    {
      title: "Web Technologies:",
      skills: ["ReactJS", "Express.js", "Node.js", "Next.js", "TailwindCSS"]
    },
    {
      title: "Databases:",
      skills: ["MongoDB", "MySQL", "PostgreSQL"]
    },
    {
      title: "Core Concepts:",
      skills: ["Data Structures and Algorithms", "Object-Oriented Programming (OOP)", "Operating Systems (OS)", "Database Management Systems (DBMS)"]
    }
  ];

  const iconSlugs = [
    "typescript",
    "javascript",
    "java",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "postgresql",
    "mongodb",
    "mysql",
    "git",
    "github",
    "visualstudiocode",
    "tailwindcss",
    "c",
    "vercel"
  ];

  return (
    <section 
      id="skills"
      ref={containerRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe 
          src='https://my.spline.design/robotfloatinginspace-jU4T7zFi8d5QF4Rs3kFJ5EkI/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="3D Skills Background"
          className="opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-purple-950/40 to-blue-950/40" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          My Skills
        </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Icon Cloud */}
            <div ref={cloudRef} className="flex justify-center">
              <div className="w-full max-w-md h-96">
                <IconCloud iconSlugs={iconSlugs} />
              </div>
            </div>

            {/* Right Side - Skill Categories */}
            <div ref={skillsRef} className="space-y-6">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-white/90"
                      >
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 right-12 w-1 h-1 bg-secondary rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-30" />
    </section>
  );
};

export default SkillsSection;