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
      title: "Edu-Pilot",
      description: "AI-Powered course creation and study app built with Next.js, React.js and API keys of OpenAI and Gemini. Features intelligent course generation, interactive learning modules, and personalized study paths.",
      tech: ["Next.js", "React.js", "OpenAI", "Gemini API", "TailwindCSS"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      link: "https://edu-pilot.mohitcodes.xyz/",
      github: "https://github.com/mohitjeswani01/edu-pilot"
    },
    {
      title: "CarConnect",
      description: "A premium solution for car rentals and ridesharing built with React.js, Node.js, TailwindCSS. Includes real-time booking, payment integration, and user management system.",
      tech: ["React.js", "Node.js", "TailwindCSS", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600",
      link: "#",
      github: "https://github.com/mohitjeswani01/CarConnect"
    },
    {
      title: "StudyNotion",
      description: "Study mobile app built with React Native used for course selling. Features include course marketplace, video streaming, progress tracking, and payment gateway integration.",
      tech: ["React Native", "Node.js", "MongoDB", "Express", "Payment Gateway"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
      github: "https://github.com/mohitjeswani01/studynotion"
    },
    {
      title: "Clothing Shop",
      description: "Modern, interactive clothing shop webpage with 3D animations, smooth scrolling, and responsive design. Built with cutting-edge web technologies.",
      tech: ["React", "TypeScript", "Spline", "TailwindCSS"],
      image: "/clothing-shop.png",
      github: "https://github.com/mohitjeswani01/puja-home-couture-collection"
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
                {/* === CHANGE #1 IS HERE === */}
                <div className="flex gap-4">
                  {/* Conditionally render the Live Demo button */}
                  {projects[currentProject].link && projects[currentProject].link !== '#' && (
                    <a href={projects[currentProject].link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Live Demo
                      </Button>
                    </a>
                  )}
                  <a href={projects[currentProject].github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm">
                      GitHub
                    </Button>
                  </a>
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentProject ? 'bg-primary scale-125' : 'bg-primary/30'
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

                {/* === CHANGE #2 IS HERE === */}
                <div className="flex gap-3">
                  {/* Conditionally render the Live Demo button */}
                  {project.link && project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        Live Demo
                      </Button>
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" variant="ghost" className="w-full text-xs">
                      GitHub
                    </Button>
                  </a>
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
