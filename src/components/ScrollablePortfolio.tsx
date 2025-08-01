import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Preloader from './Preloader';
import Header from './Header';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AchievementsSection from './sections/AchievementsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

const ScrollablePortfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="bg-background text-foreground">
      <Header />
      
      <main>
        <HomeSection />
        <ProjectsSection />
        <AboutSection />
        <AchievementsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default ScrollablePortfolio;