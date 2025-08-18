import React from 'react';

import HeroSection from '../components/HeroSection';

import BenefitsSection from '../components/BenefitsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

import FeaturesSection from '../components/FeaturesSection';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <>
   <Navbar/>
      <HeroSection />
      <FeaturesSection/>
      <BenefitsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default HomePage;