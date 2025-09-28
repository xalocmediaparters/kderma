import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  gradientFrom: string;
  gradientTo: string;
  headline: string;
  subtext: string;
  cta: string;
  image: string;
  mediaType: 'image' | 'video';
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      gradientFrom: '#a855f7', // lighter purple
      gradientTo: '#7c3aed', // brand purple
      headline: 'Glow That Lasts All Day',
      subtext: 'Discover the power of premium Korean skincare for radiant, healthy skin.',
      cta: 'Shop Skincare',
      image: '/src/assets/images/Hero section/slide1_anua.png',
      mediaType: 'image'
    },
    {
      id: 2,
      gradientFrom: '#7c3aed', // brand purple
      gradientTo: '#5b21b6', // medium purple
      headline: 'Beauty in Every Shade',
      subtext: 'From natural tones to bold colors—find your perfect K-Beauty look.',
      cta: 'Explore Makeup',
      image: '/src/assets/images/Hero section/slide1_cosrex.png',
      mediaType: 'image'
    },
    {
      id: 3,
      gradientFrom: '#9333ea', // vibrant purple
      gradientTo: '#6b21a8', // deeper purple
      headline: 'Indulge in Luxury Rituals',
      subtext: 'Reimagine skincare as self-care with masks, serums, and soothing treatments.',
      cta: 'Treat Yourself',
      image: '/src/assets/images/Hero section/slide2_etude.mp4',
      mediaType: 'video'
    },
    {
      id: 4,
      gradientFrom: '#6b21a8', // deep purple
      gradientTo: '#4c1d95', // darkest purple
      headline: 'Curated for You, Fresh from Korea',
      subtext: 'Be the first to shop our new arrivals & exclusive collections.',
      cta: 'Shop New Arrivals',
      image: '/src/assets/images/Hero section/slide3_beauty of joseon.png',
      mediaType: 'image'
    },
    {
      id: 5,
      gradientFrom: '#5b21b6', // medium purple
      gradientTo: '#4c1d95', // darkest purple
      headline: 'Exclusive Medicube Picks',
      subtext: 'Discover skincare favorites curated by Medicube experts.',
      cta: 'Shop Medicube',
      image: '/src/assets/images/Hero section/slide4_medicube.png',
      mediaType: 'image'
    }
  ];

  const activeSlide = slides[currentSlide];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleCTAClick = (ctaText: string) => {
    console.log(`${ctaText} clicked`);
  };

  return (
    <section className="relative h-screen min-h-[100vh] overflow-hidden">
      {/* Minimalist Static Background */}  
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(135deg, ${activeSlide.gradientFrom}20 0%, ${activeSlide.gradientTo}40 50%, ${activeSlide.gradientFrom}30 100%)`
        }}
      />
      
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 transition-colors duration-1000"
          style={{ backgroundColor: activeSlide.gradientTo }}
        />
        <div 
          className="absolute bottom-32 left-16 w-48 h-48 rounded-full opacity-3 transition-colors duration-1000"
          style={{ backgroundColor: activeSlide.gradientFrom }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-4 transition-colors duration-1000"
          style={{ backgroundColor: activeSlide.gradientTo }}
        />
      </div>

      {/* Content Grid Layout */}
      <div className="relative h-full flex items-center z-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Text Content - Left Column */}
            <div className="text-left space-y-6 lg:space-y-8">
              <div 
                className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight transition-colors duration-500"
                style={{ color: activeSlide.gradientTo }}
              >
                {activeSlide.headline}
              </div>
              
              <div className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-xl">
                {activeSlide.subtext}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleCTAClick(activeSlide.cta)}
                  className="inline-block text-white px-8 py-4 text-lg font-medium rounded-lg
                           hover:scale-[1.02] transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-offset-2
                           shadow-lg hover:shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${activeSlide.gradientFrom} 0%, ${activeSlide.gradientTo} 100%)`
                  }}
                >
                  {activeSlide.cta}
                </button>
              </div>
            </div>

            {/* Product Image - Right Column */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div 
                  key={currentSlide}
                  className="w-64 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl 
                           border border-white/20 transition-all duration-700 ease-out"
                  style={{
                    background: `linear-gradient(135deg, ${activeSlide.gradientFrom}10 0%, ${activeSlide.gradientTo}20 100%)`
                  }}
                >
                  {activeSlide.mediaType === 'video' ? (
                    <video
                      src={activeSlide.image}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover transition-opacity duration-700"
                      aria-label={`${activeSlide.headline} - KDerma Product Video`}
                    />
                  ) : (
                    <img
                      src={activeSlide.image}
                      alt={`${activeSlide.headline} - KDerma Product`}
                      className="w-full h-full object-cover transition-opacity duration-700"
                    />
                  )}
                </div>
                
                {/* Subtle accent */}
                <div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 transition-colors duration-700"
                  style={{ backgroundColor: activeSlide.gradientFrom }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositioned Navigation Arrows - Bottom corners */}
      <button
        onClick={prevSlide}
        className="absolute bottom-8 left-8 text-gray-600 hover:text-gray-900 p-3 
                   hover:bg-white/80 rounded-full transition-all duration-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-500/20
                   backdrop-blur-sm shadow-lg z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute bottom-8 right-8 text-gray-600 hover:text-gray-900 p-3 
                   hover:bg-white/80 rounded-full transition-all duration-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-500/20
                   backdrop-blur-sm shadow-lg z-30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators - Centered bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-10 h-2 transition-all duration-300 focus:outline-none rounded-full ${
              index === currentSlide
                ? 'opacity-80'
                : 'bg-gray-400 opacity-40 hover:opacity-60'
            }`}
            style={{
              backgroundColor: index === currentSlide ? activeSlide.gradientTo : undefined
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
