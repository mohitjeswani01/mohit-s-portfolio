import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Preloader from './Preloader';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for navigation events from components
    const handleNavigation = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };

    window.addEventListener('navigate', handleNavigation as EventListener);

    return () => {
      window.removeEventListener('navigate', handleNavigation as EventListener);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Animate dashboard entrance
    gsap.fromTo('.dashboard', {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)'
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    });
  };

  const handleSectionChange = (newSection: string) => {
    if (isTransitioning || newSection === activeSection) return;

    setIsTransitioning(true);

    // Create smooth transition between sections
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSection(newSection);
        setIsTransitioning(false);
      }
    });

    // Animate current content out
    tl.to(contentRef.current, {
      x: -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power2.in'
    });

    // Animate new content in
    tl.fromTo(contentRef.current, {
      x: 100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power2.out',
      onStart: () => {
        // Small delay before starting the in animation
        setTimeout(() => {
          setActiveSection(newSection);
        }, 200);
      }
    });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="dashboard h-screen w-full bg-background overflow-hidden relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50 pointer-events-none" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-2xl animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 h-full flex">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden md:block">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-20 relative pb-16 md:pb-0">
          <div 
            ref={contentRef}
            className="h-full w-full"
          >
            {renderActiveSection()}
          </div>

          {/* Content overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/70 pointer-events-none" />
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />

      {/* Loading overlay for transitions */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-sm z-50 pointer-events-none" />
      )}

      {/* Version indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono opacity-50">
        v1.0.0
      </div>
    </div>
  );
};

export default Portfolio;