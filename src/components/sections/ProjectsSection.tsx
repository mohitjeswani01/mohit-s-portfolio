import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate project cards from different directions
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards) {
      cards.forEach((card, index) => {
        const direction = index % 4;
        let fromVars: any = { opacity: 0, scale: 0.8 };
        
        switch (direction) {
          case 0:
            fromVars = { ...fromVars, x: -100, y: -100 };
            break;
          case 1:
            fromVars = { ...fromVars, x: 100, y: -100 };
            break;
          case 2:
            fromVars = { ...fromVars, x: -100, y: 100 };
            break;
          case 3:
            fromVars = { ...fromVars, x: 100, y: 100 };
            break;
        }

        tl.fromTo(card, fromVars, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, index * 0.1);
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with real-time inventory management and advanced analytics.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "🛒",
      link: "#"
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description: "An immersive 3D portfolio showcasing interactive animations and cutting-edge web technologies.",
      tech: ["Three.js", "GSAP", "React", "TypeScript"],
      image: "🎮",
      link: "#"
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and natural language processing.",
      tech: ["Next.js", "OpenAI", "Socket.io", "MongoDB"],
      image: "🤖",
      link: "#"
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for complex data visualization with real-time updates and filtering.",
      tech: ["D3.js", "React", "Python", "FastAPI"],
      image: "📊",
      link: "#"
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking app with workout planning and social features.",
      tech: ["React Native", "Firebase", "Redux", "Node.js"],
      image: "💪",
      link: "#"
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      description: "Secure voting platform built on blockchain technology ensuring transparency and immutability.",
      tech: ["Solidity", "Web3.js", "React", "Ethereum"],
      image: "🗳️",
      link: "#"
    }
  ];

  const handleCardHover = (projectId: number | null, event?: React.MouseEvent) => {
    setHoveredProject(projectId);
    
    if (projectId && event) {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Create glow effect that follows mouse
      gsap.to(card, {
        boxShadow: `${x/5}px ${y/5}px 50px hsl(var(--glow-cyan) / 0.4)`,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleCardClick = (project: Project) => {
    // Add click animation
    gsap.to(`.project-${project.id}`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="h-full flex flex-col px-4 md:pl-24 md:pr-8 py-8 md:py-12 overflow-y-auto"
    >
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text mb-4">
          Featured Projects
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          A showcase of my recent work, demonstrating expertise in modern web technologies 
          and creative problem-solving.
        </p>
        <div className="w-24 h-1 bg-gradient-primary rounded-full mt-6 mx-auto md:mx-0" />
      </div>

      {/* Projects Grid */}
      <div 
        ref={gridRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card project-${project.id} glass rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 group relative overflow-hidden`}
            onMouseEnter={(e) => handleCardHover(project.id, e)}
            onMouseLeave={() => handleCardHover(null)}
            onMouseMove={(e) => hoveredProject === project.id && handleCardHover(project.id, e)}
            onClick={() => handleCardClick(project)}
            style={{ 
              transform: hoveredProject === project.id ? 'rotateX(5deg) rotateY(5deg)' : 'rotateX(0deg) rotateY(0deg)',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Project Icon/Image */}
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {project.image}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-3 group-hover:text-glow transition-all duration-300">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border group-hover:border-primary/50 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View Project Link */}
            <div className="flex items-center text-primary font-medium text-sm group-hover:text-glow transition-all duration-300">
              View Project
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
            
            {/* Glowing border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-primary rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/2 right-4 w-2 h-2 bg-secondary rounded-full animate-float opacity-30" />
    </div>
  );
};

export default ProjectsSection;