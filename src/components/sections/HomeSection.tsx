import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HomeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate Spline container
    tl.fromTo(splineRef.current, {
      scale: 0.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Animate headline with staggered character animation
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      tl.fromTo(chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, 0.5);
    }

    // Animate subline
    tl.fromTo(sublineRef.current, {
      opacity: 0,
      y: 30,
      filter: 'blur(5px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, 1);

    // Animate buttons
    tl.fromTo(buttonsRef.current?.children, {
      opacity: 0,
      y: 50,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, 1.3);

    return () => {
      tl.kill();
    };
  }, []);

  const handleHireClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    // Create ripple effect
    gsap.to('.resume-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
    
    // Open resume
    window.open('/resume.pdf', '_blank');
  };

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block" style={{ perspective: '1000px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      id="home"
      ref={containerRef} 
      className="min-h-screen relative overflow-hidden"
    >
      {/* Full-screen 3D Spline Background */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full z-0"
      >
        <iframe 
          src='https://my.spline.design/robotfloatinginspace-jU4T7zFi8d5QF4Rs3kFJ5EkI/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="3D Robot Animation"
        />
      </div>

      {/* Content Layout */}
      <div className="relative z-10 h-full min-h-screen flex items-center px-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Side - Photo */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl hover:border-primary transition-all duration-300 hover:scale-105">
                <img 
                  src="/mohit-photo.png" 
                  alt="Mohit Jeswani" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full border border-primary/20 animate-spin slow"></div>
            </div>
          </div>

          {/* Center - 3D Robot (Hidden on mobile, visible on large screens) */}
          <div className="hidden lg:flex justify-center order-2">
            <div className="w-96 h-96 flex items-center justify-center">
              {/* The robot iframe will be positioned absolutely, this is just for spacing */}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 order-3 lg:order-3">
            <div>
              <h1 
                ref={headlineRef}
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              >
                <div className="gradient-text text-glow">
                  {splitText("MOHIT JESWANI")}
                </div>
                <div className="text-lg md:text-2xl lg:text-3xl font-medium text-white/90 mt-4">
                  {splitText("Software Developer")}
                </div>
              </h1>
              
              <p 
                ref={sublineRef}
                className="text-sm md:text-base text-white/80 leading-relaxed mt-6"
              >
                Crafting immersive digital experiences with cutting-edge technologies. 
                Passionate about creating beautiful, functional, and innovative web applications.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start mt-8">
              <Button
                size="lg"
                onClick={handleHireClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl glow-cyan hover:glow-hover transition-all duration-300 hover:scale-105"
              >
                Hire Me
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleResumeClick}
                className="resume-btn border-2 border-white/50 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:border-white hover:glow-cyan backdrop-blur-sm"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full animate-float opacity-60 z-10" />
      <div className="absolute bottom-32 left-32 w-1 h-1 bg-secondary rounded-full animate-ping opacity-40 z-10" />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-30 z-10" />
    </section>
  );
};

export default HomeSection;