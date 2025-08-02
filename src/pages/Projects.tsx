import React from 'react';
import Header from '../components/Header';
import ProjectsSection from '../components/sections/ProjectsSection';
import Footer from '../components/sections/Footer';

const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20 text-foreground min-h-screen">
      <Header />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default ProjectsPage;