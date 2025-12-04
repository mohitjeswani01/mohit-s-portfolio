import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Header from './Header';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AchievementsSection from './sections/AchievementsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ProjectsSlider from './ProjectsSlider';

const ScrollablePortfolio: React.FC = () => {
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
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Header />

      <main>
        <HomeSection />
        <div className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Featured Projects
            </h2>
            <ProjectsSlider />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScrollablePortfolio;