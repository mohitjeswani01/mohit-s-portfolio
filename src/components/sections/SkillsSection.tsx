import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Icons animation
      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll('.skill-icon');
        gsap.fromTo(icons, {
          opacity: 0,
          scale: 0.5,
          rotation: -180
        }, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: iconsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Skills categories animation
      if (skillsRef.current) {
        const categories = skillsRef.current.querySelectorAll('.skill-category');
        gsap.fromTo(categories, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages:",
      skills: [
        { name: "JavaScript", color: "bg-yellow-500" },
        { name: "Java", color: "bg-red-500" },
        { name: "Python", color: "bg-blue-500" }
      ]
    },
    {
      title: "Web Technologies:",
      skills: [
        { name: "React.js", color: "bg-cyan-500" },
        { name: "Express.js", color: "bg-gray-500" },
        { name: "Node.js", color: "bg-green-500" }
      ]
    },
    {
      title: "Database Systems:",
      skills: [
        { name: "MongoDB", color: "bg-green-600" },
        { name: "Oracle SQL", color: "bg-red-600" },
        { name: "MySQL", color: "bg-blue-600" },
        { name: "ChromaDB", color: "bg-purple-500" }
      ]
    },
    {
      title: "Data Science & Machine Learning:",
      skills: [
        { name: "Langchain", color: "bg-indigo-500" },
        { name: "Groq", color: "bg-orange-500" }
      ]
    },
    {
      title: "Mathematical & Statistical Tools:",
      skills: [
        { name: "NumPy", color: "bg-blue-400" },
        { name: "Pandas", color: "bg-purple-600" },
        { name: "Matplotlib", color: "bg-green-400" }
      ]
    }
  ];

  return (
    <section 
      id="skills"
      ref={containerRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          My Skills
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Floating skill icons */}
          <div ref={iconsRef} className="relative h-96 lg:h-[500px]">
            {/* Decorative floating icons */}
            <div className="skill-icon absolute top-0 left-8 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
              <span className="text-2xl">⚛️</span>
            </div>
            <div className="skill-icon absolute top-12 right-12 w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-secondary/20">
              <span className="text-3xl">🐍</span>
            </div>
            <div className="skill-icon absolute top-32 left-20 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/20">
              <span className="text-xl">☕</span>
            </div>
            <div className="skill-icon absolute top-48 right-8 w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
              <span className="text-2xl">🗄️</span>
            </div>
            <div className="skill-icon absolute bottom-32 left-12 w-18 h-18 bg-secondary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-secondary/20">
              <span className="text-2xl">🌐</span>
            </div>
            <div className="skill-icon absolute bottom-16 right-16 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/20">
              <span className="text-2xl">📊</span>
            </div>
            <div className="skill-icon absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
              <span className="text-3xl">🤖</span>
            </div>
          </div>

          {/* Right side - Skill categories */}
          <div ref={skillsRef} className="space-y-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-sm font-medium">{skill.name}</span>
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