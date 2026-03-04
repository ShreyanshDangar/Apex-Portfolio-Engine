import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ShowcaseSection from '../components/landing/ShowcaseSection';
import ProcessSection from '../components/landing/ProcessSection';
import TechnologySection from '../components/landing/TechnologySection';
import ComparisonSection from '../components/landing/ComparisonSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <main className="landing-page" role="main">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <ProcessSection />
      <TechnologySection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};
export default LandingPage;