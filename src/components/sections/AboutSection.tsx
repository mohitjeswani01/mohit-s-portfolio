import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate bio from left
    tl.fromTo(bioRef.current, {
      x: -100,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate skills with stagger
    const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
    if (skillItems) {
      tl.fromTo(skillItems, {
        scale: 0,
        opacity: 0,
        rotateY: 180,
        filter: 'blur(5px)'
      }, {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, 0.4);
    }

    return () => {
      tl.kill();
    };
  }, []);

  const skills = [
    { name: 'React', icon: '⚛️', color: 'text-blue-400' },
    { name: 'TypeScript', icon: '📘', color: 'text-blue-600' },
    { name: 'Next.js', icon: '▲', color: 'text-white' },
    { name: 'GSAP', icon: '🎭', color: 'text-green-400' },
    { name: 'Three.js', icon: '🎲', color: 'text-yellow-400' },
    { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
    { name: 'Python', icon: '🐍', color: 'text-yellow-500' },
    { name: 'Design', icon: '🎨', color: 'text-pink-400' },
  ];

  return (
    <div 
      ref={containerRef} 
      className="h-full flex flex-col md:flex-row items-center px-4 md:pl-24 md:pr-8 gap-8 md:gap-16 py-8 md:py-0 overflow-y-auto md:overflow-hidden"
    >
      {/* Bio Section */}
      <div ref={bioRef} className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary rounded-full mb-8 mx-auto md:mx-0" />
        </div>

        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-foreground">
            I'm a passionate creative developer with over 5 years of experience 
            building modern web applications. I specialize in creating immersive, 
            interactive experiences that push the boundaries of what's possible on the web.
          </p>
          
          <p className="text-muted-foreground">
            My expertise spans across frontend and backend technologies, with a 
            particular focus on React, TypeScript, and animation libraries like GSAP. 
            I love combining technical excellence with creative design to deliver 
            exceptional user experiences.
          </p>
          
          <p className="text-muted-foreground">
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open-source projects, or experimenting with 3D graphics 
            and interactive installations.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">50+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">5+</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div ref={skillsRef} className="w-full md:w-1/2">
        <h3 className="text-xl md:text-2xl font-bold mb-8 text-center">Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-item glass rounded-2xl p-6 text-center hover:glow-hover transition-all duration-300 cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <div className={`font-semibold ${skill.color} group-hover:text-glow transition-all duration-300`}>
                {skill.name}
              </div>
            </div>
          ))}
        </div>

        {/* Additional decorative skill items */}
        <div className="mt-8 flex justify-center gap-4">
          {['🚀', '💡', '⚡'].map((icon, index) => (
            <div
              key={index}
              className="skill-item w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl hover:glow-hover transition-all duration-300 cursor-pointer animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float opacity-30" />
    </div>
  );
};

export default AboutSection;