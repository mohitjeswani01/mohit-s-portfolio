import React from 'react';
import Header from '../components/Header';
import AchievementsSection from '../components/sections/AchievementsSection';
import Footer from '../components/sections/Footer';

const AchievementsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20 text-foreground min-h-screen">
      <Header />
      <AchievementsSection />
      <Footer />
    </div>
  );
};

export default AchievementsPage;