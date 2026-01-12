import React from 'react';
import Navbar from '../app/components/landing/Navbar';
import Hero from '../app/components/landing/Hero';
import Brands from '../app/components/landing/Brands';
import Stats from '../app/components/landing/Stats';
import JobOffers from '../app/components/landing/JobOffers';
import TopCompanies from '../app/components/landing/TopCompanies';
import Community from '../app/components/landing/Community';
import WhyChooseUs from '../app/components/landing/WhyChooseUs';
import Testimonials from '../app/components/landing/Testimonials';
import FooterCTA from '../app/components/landing/FooterCTA';
import Footer from '../app/components/landing/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-dark">
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Stats />
        <JobOffers />
        <TopCompanies />
        <Community />
        <WhyChooseUs />
        <Testimonials />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;