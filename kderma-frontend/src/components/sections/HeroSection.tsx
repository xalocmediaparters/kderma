import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidChrome from '../LiquidChrome';
import BlurText from '../ui/BlurText';
import slide1Image from '../../assets/images/Hero section/slide1_anua.png';
import slide2Video from '../../assets/images/Hero section/slide2_etude.mp4';
import slide3Image from '../../assets/images/Hero section/slide3_beauty of joseon.png';
import slide4Image from '../../assets/images/Hero section/slide4_medicube.png';

interface Slide {
  id: number;
  liquidChromeColor: [number, number, number];
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

  const slides: Slide[] = [
    {
      id: 1,
      liquidChromeColor: [0.4, 0.1, 0.5], // Purple tones
      overlayGradient: 'from-purple-900/70 via-purple-800/50 to-purple-900/70',
      headline: 'Glow That Lasts All Day',
      subtext: 'Discover the power of premium Korean skincare for radiant, healthy skin.',
      cta: 'Shop Skincare',
      image: slide1Image,
      mediaType: 'image'
    },
    {
      id: 2,
      liquidChromeColor: [0.48, 0.18, 0.56], // Deeper purple
      overlayGradient: 'from-purple-800/70 via-purple-700/50 to-purple-800/70',
      headline: 'Beauty in Every Shade',
      subtext: 'From natural tones to bold colors—find your perfect K-Beauty look.',
      cta: 'Explore Makeup',
      image: slide2Video,
      mediaType: 'video'
    },
    {
      id: 3,
      liquidChromeColor: [0.54, 0.24, 0.58], // Lighter purple
      overlayGradient: 'from-purple-700/70 via-purple-600/50 to-purple-700/70',
      headline: 'Indulge in Luxury Rituals',
      subtext: 'Reimagine skincare as self-care with masks, serums, and soothing treatments.',
      cta: 'Treat Yourself',
      image: slide3Image,
      mediaType: 'image'
    },
    {
      id: 4,
      liquidChromeColor: [0.29, 0.11, 0.35], // Dark purple
      overlayGradient: 'from-purple-900/80 via-purple-800/60 to-purple-900/80',
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
      {/* LiquidChrome Background */}
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
            <LiquidChrome
              baseColor={activeSlide.liquidChromeColor}
              speed={0.4}
              amplitude={0.6}
              frequencyX={3}
              frequencyY={2}
              interactive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay - Enhanced for better text readability */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.overlayGradient} z-10`}></div>
      
      {/* Additional text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-15"></div>

      {/* Main Product Image - positioned casually */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: currentSlide % 2 === 0 ? 2 : -1,
            y: [0, -8, 0],
          }}
          exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1],
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute top-1/2 right-6 lg:right-12 xl:right-24 transform -translate-y-1/2 z-25"
        >
          <div className="relative">
            {activeSlide.mediaType === 'video' ? (
              <video
                src={activeSlide.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-56 h-64 lg:w-72 lg:h-80 xl:w-80 xl:h-96 object-cover rounded-3xl 
                           shadow-2xl border-2 border-white/40"
              />
            ) : (
              <img
                src={activeSlide.image}
                alt={`${activeSlide.headline} - KDerma Product`}
                className="w-56 h-64 lg:w-72 lg:h-80 xl:w-80 xl:h-96 object-cover rounded-3xl 
                           shadow-2xl border-2 border-white/40"
              />
            )}
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            
            {/* Text Content - Left aligned, more space */}
            <div className="text-left space-y-8 relative">
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <BlurText
                      text={activeSlide.headline}
                      delay={100}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight 
                               drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_80%)]"
                    />
                    
                    <BlurText
                      text={activeSlide.subtext}
                      delay={50}
                      animateBy="words"
                      className="text-xl lg:text-2xl text-white font-light leading-relaxed max-w-2xl 
                               drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]"
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.div 
                  key={currentSlide + '-cta'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
                  className="pt-6"
                >
                  <button
                    onClick={() => handleCTAClick(activeSlide.cta)}
                    className="inline-block bg-white text-gray-900 px-8 py-3 text-lg font-medium rounded-xl
                             hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-white/50
                             shadow-2xl hover:shadow-3xl border border-white/20"
                  >
                    {activeSlide.cta}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary accent image - smaller, positioned casually */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`secondary-${currentSlide}`}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0,
            rotate: currentSlide % 2 === 0 ? -8 : 6,
            y: [0, 12, 0],
          }}
          exit={{ opacity: 0, scale: 0.8, x: -50 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }}
          className="absolute bottom-20 right-2 lg:bottom-32 lg:right-6 z-20"
        >
          <div className="relative">
            {activeSlide.mediaType === 'video' ? (
              <video
                src={activeSlide.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-32 h-36 lg:w-40 lg:h-48 object-cover rounded-2xl shadow-lg border-2 border-white/50"
              />
            ) : (
              <img
                src={activeSlide.image}
                alt=""
                className="w-32 h-36 lg:w-40 lg:h-48 object-cover rounded-2xl shadow-lg border-2 border-white/50"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:left-4 top-1/2 transform -translate-y-1/2
                 text-white/80 p-3 hover:bg-white/10 rounded-full
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20
                 backdrop-blur-sm z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2
                 text-white/80 p-3 hover:bg-white/10 rounded-full
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20
                 backdrop-blur-sm z-30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-8 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-8 h-1 transition-all duration-300 focus:outline-none rounded-full ${
              index === currentSlide
                ? 'bg-white/80'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </section>
  );
};

export default HeroSection;