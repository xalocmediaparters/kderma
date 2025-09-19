import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Silk from '../components/Silk';
import BlurText from '../ui/BlurText';

interface Slide {
  id: number;
  silkColor: string;
  overlayGradient: string;
  headline: string;
  subtext: string;
  cta: string;
  image: string;
  mediaType: 'image' | 'video';
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock images for demonstration - replace with your actual imports
  const slide1Image = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop";
  const slide2Video = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const slide3Image = "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&h=600&fit=crop";
  const slide4Image = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop";

  const slides: Slide[] = [
    {
      id: 1,
      silkColor: '#662483',
      overlayGradient: 'from-purple-900/60 via-purple-800/40 to-purple-900/60',
      headline: 'Glow That Lasts All Day',
      subtext: 'Discover the power of premium Korean skincare for radiant, healthy skin.',
      cta: 'Shop Skincare',
      image: slide1Image,
      mediaType: 'image'
    },
    {
      id: 2,
      silkColor: '#7B2D8E',
      overlayGradient: 'from-purple-800/60 via-purple-700/40 to-purple-800/60',
      headline: 'Beauty in Every Shade',
      subtext: 'From natural tones to bold colors—find your perfect K-Beauty look.',
      cta: 'Explore Makeup',
      image: slide2Video,
      mediaType: 'video'
    },
    {
      id: 3,
      silkColor: '#8A3C95',
      overlayGradient: 'from-purple-700/60 via-purple-600/40 to-purple-700/60',
      headline: 'Indulge in Luxury Rituals',
      subtext: 'Reimagine skincare as self-care with masks, serums, and soothing treatments.',
      cta: 'Treat Yourself',
      image: slide3Image,
      mediaType: 'image'
    },
    {
      id: 4,
      silkColor: '#4A1D5A',
      overlayGradient: 'from-purple-900/70 via-purple-800/50 to-purple-900/70',
      headline: 'Curated for You, Fresh from Korea',
      subtext: 'Be the first to shop our new arrivals & exclusive collections.',
      cta: 'Shop New Arrivals',
      image: slide4Image,
      mediaType: 'image'
    }
  ];

  const activeSlide = slides[currentSlide];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Increased to 7 seconds for more viewing time

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleCTAClick = (ctaText: string): void => {
    console.log(`${ctaText} clicked`);
  };

  return (
    <section className="relative h-screen min-h-[100vh] overflow-hidden hero-section">
      {/* Silk Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <Silk 
              speed={4} 
              scale={1.5} 
              color={activeSlide.silkColor} 
              noiseIntensity={1.2} 
              rotation={0.05} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.overlayGradient} z-10`}></div>

      {/* Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="space-y-6"
                >
                  <BlurText
                    text={activeSlide.headline}
                    delay={100}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight drop-shadow-2xl"
                  />
                  
                  <BlurText
                    text={activeSlide.subtext}
                    delay={50}
                    animateBy="words"
                    className="text-xl lg:text-2xl text-white text-opacity-95 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-lg"
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div 
                key={currentSlide + '-cta'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                className="pt-4"
              >
                <button
                  onClick={() => handleCTAClick(activeSlide.cta)}
                  className="inline-block bg-white/90 backdrop-blur-md text-gray-900 px-12 py-4 text-lg font-medium rounded-lg
                           hover:bg-white hover:scale-105 transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                           shadow-2xl hover:shadow-3xl"
                  style={{
                    boxShadow: `0 25px 50px -12px ${activeSlide.silkColor}40`
                  }}
                >
                  {activeSlide.cta}
                </button>
              </motion.div>
            </div>

            {/* Media Container */}
            <div className="flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-lg"
                >
                  {activeSlide.mediaType === 'video' ? (
                    <div className="relative">
                      <video
                        src={activeSlide.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-80 lg:h-96 object-cover shadow-2xl rounded-xl"
                        style={{
                          boxShadow: `0 25px 50px -12px ${activeSlide.silkColor}60, 0 0 30px ${activeSlide.silkColor}30`
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={activeSlide.image}
                        alt={`${activeSlide.headline} - KDerma`}
                        className="w-full h-80 lg:h-96 object-cover shadow-2xl rounded-xl"
                        style={{
                          boxShadow: `0 25px 50px -12px ${activeSlide.silkColor}60, 0 0 30px ${activeSlide.silkColor}30`
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 
                 text-white p-4 hover:bg-white hover:bg-opacity-20 rounded-full
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30
                 backdrop-blur-md z-30 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 
                 text-white p-4 hover:bg-white hover:bg-opacity-20 rounded-full
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30
                 backdrop-blur-md z-30 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 transition-all duration-300 focus:outline-none backdrop-blur-sm shadow-sm rounded-full ${
              index === currentSlide
                ? 'bg-white shadow-lg'
                : 'bg-white bg-opacity-50 hover:bg-opacity-70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Minimal slide counter */}
      <div className="absolute top-8 right-8 text-white text-opacity-90 text-sm font-light z-30 backdrop-blur-sm bg-black bg-opacity-30 px-4 py-2 rounded-full shadow-lg">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
};

export default HeroSection;