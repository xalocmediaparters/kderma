import React from 'react';
import HeroSection from '../sections/HeroSection';
import { ObsessionsSection, RadianceSection, VideoCarouselSection } from '../sections';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <ObsessionsSection />
      <RadianceSection />
      <VideoCarouselSection />
    </div>
  );
};

export default HomePage;
