import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const ProjectsSlider: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: "Edu-Pilot",
      description: "AI-Powered course creation and study app built with Next.js, React.js and API keys of OpenAI and Gemini",
      tech: ["Next.js", "React.js", "OpenAI", "Gemini"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    },
    {
      title: "CarConnect", 
      description: "A premium solution for car rentals and ridesharing built with React.js, Node.js, TailwindCSS",
      tech: ["React.js", "Node.js", "TailwindCSS", "MongoDB"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600",
    },
    {
      title: "StudyNotion",
      description: "Study mobile app built with React Native used for course selling",
      tech: ["React Native", "Node.js", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
    }
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length]);

  // Animate project change
  useEffect(() => {
    gsap.fromTo(".project-slide", {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out"
    });
  }, [currentProject]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm border border-border">
      <div className="project-slide grid md:grid-cols-2">
        <div className="aspect-video md:aspect-auto">
          <img 
            src={projects[currentProject].image}
            alt={projects[currentProject].title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 gradient-text">
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
      
      {/* Project indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
  );
};

export default ProjectsSlider;