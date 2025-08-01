import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: "Food Saver Platform",
      description: "A dynamic web application designed to efficiently distribute surplus food, connecting donors and recipients to reduce food waste and support communities in need.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=400",
      link: "#",
      github: "#"
    },
    {
      title: "AI Chat Application", 
      description: "Real-time chat application with AI integration using OpenAI API. Built with Socket.io for real-time communication.",
      tech: ["React", "Socket.io", "OpenAI", "Express"],
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400",
      link: "#",
      github: "#"
    },
    {
      title: "Task Management System",
      description: "Collaborative task management platform with drag-and-drop functionality, team collaboration, and progress tracking.",
      tech: ["Vue.js", "Firebase", "Vuetify", "PWA"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      link: "#",
      github: "#"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for data visualization using D3.js and Chart.js. Connects to multiple data sources with real-time updates.",
      tech: ["D3.js", "React", "Chart.js", "REST API"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      link: "#",
      github: "#"
    }
  ];

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

      // Featured project animation
      gsap.fromTo(featuredRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Grid animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(cards, {
          opacity: 0,
          y: 50,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate featured project
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text"
        >
          Featured Projects
        </h2>

        {/* Featured Project Carousel */}
        <div ref={featuredRef} className="mb-16">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto">
                <img 
                  src={projects[currentProject].image}
                  alt={projects[currentProject].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {projects[currentProject].title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {projects[currentProject].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentProject].tech.map((tech, index) => (
                    <span key={index} className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary border border-primary/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject ? 'bg-primary scale-125' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* More Projects Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={index}
              className="project-card group relative overflow-hidden rounded-2xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Live Demo
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 right-12 w-1 h-1 bg-secondary rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-30" />
    </section>
  );
};

export default ProjectsSection;