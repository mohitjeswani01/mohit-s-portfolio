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
    { name: 'javascript', icon: '🟨', color: 'text-blue-600' },
    { name: 'Next.js', icon: '▲', color: 'text-white' },
    { name: 'Java', icon: '☕', color: 'text-green-400' },
    { name: 'Node.js', icon: '🟢', color: 'text-green-500' },
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
            Hi, I'm Mohit Jeswani, a dedicated B.E. Computer Engineering student with hands-on experience in web development and AI applications.
          </p>

          <p className="text-muted-foreground">
            I developed dynamic full-stack applications using the MERN stack and integrating AI solutions. My goal is to bridge creativity and technology to build impactful solutions for real-world challenges.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground">Vivekanand Education Society's Institute of Technology</h4>
              <p className="text-muted-foreground">B.E. Computer Engineering (CGPA: 7.03)</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Featured Projects</h3>
            <div className="space-y-4">
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">Edu-Pilot</h4>
                <p className="text-muted-foreground">AI-Powered course creation and study app built with Next.js, React.js and API keys of OpenAI and Gemini</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">CarConnect</h4>
                <p className="text-muted-foreground">A premium solution for car rentals and ridesharing built with React.js, Node.js, TailwindCSS</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">StudyNotion</h4>
                <p className="text-muted-foreground">Study mobile app built with React Native used for course selling</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Contact</h3>
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
              <p className="text-muted-foreground">📧 jeswanimohit959@gmail.com</p>
              <p className="text-muted-foreground">📍 Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">Skills & Technologies</h3>
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Programming</h4>
                <p className="text-muted-foreground text-sm">C, JavaScript, Java</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Web Technologies</h4>
                <p className="text-muted-foreground text-sm">ReactJS, Express.js, Node.js, Next.js, TailwindCSS</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Databases</h4>
                <p className="text-muted-foreground text-sm">MongoDB, MySQL, PostgreSQL</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Core Concepts</h4>
                <p className="text-muted-foreground text-sm">DSA, OOP, OS, DBMS</p>
              </div>
            </div>
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