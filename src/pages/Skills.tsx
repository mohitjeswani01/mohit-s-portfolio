import React from 'react';
import Header from '../components/Header';
import SkillsSection from '../components/sections/SkillsSection';
import Footer from '../components/sections/Footer';

const SkillsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20 text-foreground min-h-screen">
      <Header />
      <SkillsSection />
      <Footer />
    </div>
  );
};

export default SkillsPage;