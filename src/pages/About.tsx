import React from 'react';
import Header from '../components/Header';
import AboutSection from '../components/sections/AboutSection';
import Footer from '../components/sections/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20 text-foreground min-h-screen">
      <Header />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default AboutPage;