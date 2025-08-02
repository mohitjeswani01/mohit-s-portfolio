import React from 'react';
import Header from '../components/Header';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20 text-foreground min-h-screen">
      <Header />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ContactPage;