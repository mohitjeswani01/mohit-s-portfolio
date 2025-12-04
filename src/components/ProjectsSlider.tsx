import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const ProjectsSlider: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Edu-Pilot",
      description: "AI-Powered course creation engine. Leverages OpenAI & Gemini APIs to generate intelligent study paths and adaptive learning modules.",
      tech: ["Next.js", "TypeScript", "GenAI", "Tailwind"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      role: "AI Engineer",
      // Specific Links for Edu-Pilot
      links: {
        demo: "https://edu-pilot.mohitcodes.xyz/",
        source: "https://github.com/mohitjeswani01/edu-pilot"
      }
    },
    {
      title: "CarConnect",
      description: "Enterprise vehicle rental platform. Features real-time booking states, complex SQL relationship modeling, and secure payment gateways.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      role: "Full Stack Dev",
      // No Demo, Specific Source
      links: {
        demo: null,
        source: "https://github.com/mohitjeswani01/CarConnect"
      }
    },
    {
      title: "StudyNotion",
      description: "Cross-platform LMS mobile application. Handles video streaming chunks, offline synchronization, and course marketplace logic.",
      tech: ["React Native", "Redux", "Node.js"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      role: "Mobile Dev",
      // No Demo, Specific Source
      links: {
        demo: null,
        source: "https://github.com/mohitjeswani01/studynotion"
      }
    }
  ];

  // Auto-slide logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, currentProject]);

  // Animation Logic
  const animateSlide = () => {
    if (slideRef.current) {
      gsap.fromTo(slideRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const handleNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    animateSlide();
  };

  const handlePrev = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    animateSlide();
  };

  // Helper to open links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4 py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-2xl">

        {/* Main Grid Layout */}
        <div ref={slideRef} className="grid md:grid-cols-2 min-h-[400px]">

          {/* Image Side */}
          <div className="relative h-64 md:h-full overflow-hidden group">
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src={projects[currentProject].image}
              alt={projects[currentProject].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white">
              {projects[currentProject].role}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-slate-950/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                {projects[currentProject].title}
              </h3>
              <div className="flex gap-2">
                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNext} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {projects[currentProject].description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {projects[currentProject].tech.map((tech, index) => (
                <span key={index} className="px-3 py-1 text-xs font-medium rounded-md bg-slate-900 text-blue-300 border border-slate-700/50">
                  {tech}
                </span>
              ))}
            </div>

            {/* DYNAMIC BUTTONS SECTION */}
            <div className="mt-auto flex gap-4">

              {/* Primary Button: Only shows if a demo link exists (Edu-Pilot) */}
              {projects[currentProject].links.demo && (
                <Button
                  onClick={() => openLink(projects[currentProject].links.demo!)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6"
                >
                  Live Preview <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              )}

              {/* Secondary Button: Always shows Source Code */}
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700"
                onClick={() => openLink(projects[currentProject].links.source)}
              >
                <Github className="mr-2 w-4 h-4" /> Source Code
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
          <div
            key={currentProject}
            className="h-full bg-blue-500 animate-progress origin-left"
            style={{ animationDuration: '5000ms', animationPlayState: isHovered ? 'paused' : 'running' }}
          />
        </div>

      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation-name: progress;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default ProjectsSlider;