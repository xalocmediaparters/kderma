import React, { useState, useRef, useEffect } from 'react';
import { ProductGrid } from '../product';
import { mockProducts } from '../../data/products';
import ShinyText from '../ui/ShinyText';
import CircularGallery from '../ui/CircularGallery';
import LogoLoop from '../LogoLoop';

interface VideoData {
  id: number;
  src: string;
  title: string;
  thumbnail: string;
}

interface CarouselItem extends VideoData {
  uniqueKey: string;
  isClone: boolean;
  cloneType?: 'start' | 'end';
  originalIndex: number;
}

const originalVideoData: VideoData[] = [
  {
    id: 1,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'K-Beauty Tutorial 1',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+1'
  },
  {
    id: 2,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'K-Beauty Tutorial 2',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+2'
  },
  {
    id: 3,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'K-Beauty Tutorial 3',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+3'
  },
  {
    id: 4,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'K-Beauty Tutorial 4',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+4'
  },
  {
    id: 5,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'K-Beauty Tutorial 5',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+5'
  },
  {
    id: 6,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'K-Beauty Tutorial 6',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+6'
  },
  {
    id: 7,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'K-Beauty Tutorial 7',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+7'
  },
  {
    id: 8,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'K-Beauty Tutorial 8',
    thumbnail: 'https://via.placeholder.com/225x400/f5f5f5/666666?text=Video+8'
  }
];

// Create infinite carousel data with cloned slides
const createInfiniteCarouselData = () => {
  // Clone last 2 items at the beginning
  const cloneStart = originalVideoData.slice(-2).map((video, index) => ({
    ...video,
    id: `clone-start-${video.id}`,
    uniqueKey: `start-${video.id}-${index}`,
    isClone: true,
    cloneType: 'start' as const,
    originalIndex: originalVideoData.length - 2 + index
  }));

  // Original items
  const original = originalVideoData.map((video, index) => ({
    ...video,
    id: `original-${video.id}`,
    uniqueKey: `original-${video.id}-${index}`,
    isClone: false,
    originalIndex: index
  }));

  // Clone first 2 items at the end
  const cloneEnd = originalVideoData.slice(0, 2).map((video, index) => ({
    ...video,
    id: `clone-end-${video.id}`,
    uniqueKey: `end-${video.id}-${index}`,
    isClone: true,
    cloneType: 'end' as const,
    originalIndex: index
  }));

  return [...cloneStart, ...original, ...cloneEnd];
};

export const VideoCarouselSection: React.FC = () => {
  const carouselData = createInfiniteCarouselData();
  const originalLength = originalVideoData.length;
  const startOffset = 2; // Number of cloned items at start
  
  const [centerIndex, setCenterIndex] = useState(startOffset + Math.floor(originalLength / 2)); // Start in middle of original items
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);
  const isLoopingRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const itemWidth = 240; // video width + gap

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });
  };

  const startAutoplayAllVideos = (excludeIndex?: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== excludeIndex) {
        video.muted = true;
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay might be blocked, that's OK
        });
      }
    });
  };

  const getLogicalIndex = (physicalIndex: number) => {
    const item = carouselData[physicalIndex];
    return item ? item.originalIndex : 0;
  };

  const scrollToPosition = (index: number, smooth: boolean = true) => {
    if (!containerRef.current || isTransitioningRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const scrollPosition = (index * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  const centerVideo = (targetIndex: number, shouldPlay: boolean = false) => {
    if (isLoopingRef.current || isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    
    // Pause ALL videos first
    pauseAllVideos();
    setPlayingIndex(null);
    
    // Update center index
    setCenterIndex(targetIndex);
    
    // Scroll to center the video
    scrollToPosition(targetIndex, true);
    
    // Start playing the centered video if requested
    if (shouldPlay) {
      setTimeout(() => {
        const video = videoRefs.current[targetIndex];
        if (video) {
          video.muted = false;
          video.currentTime = 0;
          video.play().then(() => {
            setPlayingIndex(targetIndex);
          }).catch((error) => {
            console.log('Autoplay with sound prevented:', error);
            // Fallback to muted play
            video.muted = true;
            video.play().then(() => {
              setPlayingIndex(targetIndex);
            });
          });
        }
      }, 300);
    }
    
    // Start autoplay for all other videos (muted) after transition
    setTimeout(() => {
      startAutoplayAllVideos(shouldPlay ? targetIndex : undefined);
      isTransitioningRef.current = false;
    }, 500);
  };

  const handleVideoClick = (index: number) => {
    if (index === centerIndex) {
      // Toggle play/pause for center video
      const video = videoRefs.current[index];
      if (playingIndex === index) {
        // Pause current video and start autoplay for others
        if (video) {
          video.pause();
          video.muted = true;
          video.currentTime = 0;
        }
        setPlayingIndex(null);
        // Restart muted autoplay for all videos
        setTimeout(() => {
          startAutoplayAllVideos();
        }, 100);
      } else {
        // Pause all videos first, then play center with sound
        pauseAllVideos();
        setPlayingIndex(null);
        
        setTimeout(() => {
          if (video) {
            video.muted = false;
            video.currentTime = 0;
            video.play().then(() => {
              setPlayingIndex(index);
            }).catch(() => {
              // Fallback to muted
              video.muted = true;
              video.play().then(() => {
                setPlayingIndex(index);
              });
            });
          }
        }, 100);
      }
    } else {
      // Center and play the clicked video
      centerVideo(index, true);
    }
  };

  const handlePrevious = () => {
    const newIndex = centerIndex - 1;
    if (newIndex >= 0) {
      centerVideo(newIndex, false);
    }
  };

  const handleNext = () => {
    const newIndex = centerIndex + 1;
    if (newIndex < carouselData.length) {
      centerVideo(newIndex, false);
    }
  };

  // Infinite scroll loop management
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      if (isLoopingRef.current || isTransitioningRef.current) return;

      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const currentIndex = Math.round((scrollLeft + containerWidth / 2 - itemWidth / 2) / itemWidth);
        
        // Update center index for visual effects
        if (currentIndex !== centerIndex && currentIndex >= 0 && currentIndex < carouselData.length) {
          setCenterIndex(currentIndex);
        }

        // Check for infinite loop conditions
        const item = carouselData[currentIndex] as unknown as CarouselItem;

        if (item?.isClone && !isLoopingRef.current) {
          isLoopingRef.current = true;

          let targetIndex: number;

          if (item.cloneType === 'start') {
            // We're in the cloned start items, jump to the equivalent position at the end of original items
            // Clone start items are the last 2 original items, so map them to the end of the original section
            targetIndex = startOffset + originalLength - (2 - item.originalIndex);
          } else {
            // We're in the cloned end items, jump to the equivalent position at the start of original items
            // Clone end items are the first 2 original items, so map them to the start of the original section
            targetIndex = startOffset + item.originalIndex;
          }

          // Instant jump without animation
          setTimeout(() => {
            scrollToPosition(targetIndex, false);
            setCenterIndex(targetIndex);

            setTimeout(() => {
              isLoopingRef.current = false;
            }, 100);
          }, 50);
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [centerIndex, carouselData.length, startOffset, originalLength, itemWidth]);

  // Touch/swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // Initialize all videos with muted autoplay
  useEffect(() => {
    setTimeout(() => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = true;
          video.play().catch(() => {
            // Autoplay might be blocked
          });
        }
      });
    }, 1000);
  }, []);

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current) {
      scrollToPosition(centerIndex, false);
    }
  }, []);

  return (
    <>
      <section className="py-12 px-4" style={{ backgroundColor: '#F8E7F6' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
              K-Beauty in Motion
            </h2>
            <div className="w-16 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows - Desktop */}
            <button
              onClick={handlePrevious}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-full items-center justify-center hover:bg-opacity-100 hover:border-gray-300 transition-all duration-200 shadow-lg"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200 rounded-full items-center justify-center hover:bg-opacity-100 hover:border-gray-300 transition-all duration-200 shadow-lg"
              aria-label="Next video"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Video Carousel */}
            <div
              ref={containerRef}
              className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {carouselData.map((video, index) => {
                const isCenter = index === centerIndex;
                const isPlaying = playingIndex === index;
                const scale = isCenter ? 'scale-110' : 'scale-100';
                const opacity = isCenter ? 'opacity-100' : 'opacity-70';
                const shadow = isCenter ? 'shadow-2xl' : 'shadow-lg';

                return (
                  <div
                    key={video.uniqueKey}
                    className={`relative flex-shrink-0 cursor-pointer transform transition-all duration-500 ease-in-out ${scale} ${opacity} ${shadow}`}
                    style={{
                      width: '224px' // 9:16 aspect ratio base width
                    }}
                    onClick={() => handleVideoClick(index)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-100">
                      <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        src={video.src}
                        poster={video.thumbnail}
                        className="w-56 h-96 object-cover"
                        loop
                        playsInline
                        muted={playingIndex !== index}
                      />

                      {/* Play/Pause Overlay - Only show on center video when not playing */}
                      {isCenter && !isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                          <div className="w-16 h-16 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Playing Indicator */}
                      {isPlaying && (
                        <div className="absolute top-3 right-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                        </div>
                      )}

                      {/* Sound Icon for playing video */}
                      {isPlaying && (
                        <div className="absolute top-3 left-3">
                          <div className="w-7 h-7 bg-black bg-opacity-50 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Title - Only show for center video */}
                    {isCenter && (
                      <div className="mt-3 text-center px-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {video.title}
                        </h3>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dots Indicator - Shows only original videos */}
            <div className="flex justify-center mt-8 space-x-2">
              {originalVideoData.map((_, index) => {
                const currentLogicalIndex = getLogicalIndex(centerIndex);
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const targetIndex = startOffset + index;
                      centerVideo(targetIndex, false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentLogicalIndex
                        ? 'bg-gray-800 w-6'
                        : 'bg-gray-400 w-2 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* New Royal Radiance Collection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-wide">
              Royal Radiance Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Luxury Korean skincare crafted to illuminate and rejuvenate, fit for modern royalty.
            </p>
          </div>
          <ProductGrid products={mockProducts.slice(0, 8)} />

          {/* Moved Featured Posters Section */}
          <div className="mt-12">
            <ShinyText
              text="Featured Posters"
              className="text-2xl md:text-3xl mb-6"
              style={{ fontFamily: '"Nura", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300, color: '#36454F' }}
            />
            <CircularGallery
              items={[
                { image: 'https://picsum.photos/800/600?random=1', text: 'Elegant Beauty' },
                { image: 'https://picsum.photos/800/600?random=2', text: 'Natural Glow' },
                { image: 'https://picsum.photos/800/600?random=3', text: 'Radiant Skin' },
                { image: 'https://picsum.photos/800/600?random=4', text: 'Luxury Care' },
                { image: 'https://picsum.photos/800/600?random=5', text: 'Premium Essence' },
                { image: 'https://picsum.photos/800/600?random=6', text: 'Hydrating Mask' },
                { image: 'https://picsum.photos/800/600?random=7', text: 'Anti-Aging Serum' },
                { image: 'https://picsum.photos/800/600?random=8', text: 'Brightening Cream' },
                { image: 'https://picsum.photos/800/600?random=9', text: 'Soothing Toner' },
                { image: 'https://picsum.photos/800/600?random=10', text: 'Revitalizing Oil' },
                { image: 'https://picsum.photos/800/600?random=11', text: 'Gentle Cleanser' },
                { image: 'https://picsum.photos/800/600?random=12', text: 'Nourishing Lotion' },
                { image: 'https://picsum.photos/800/600?random=13', text: 'Exfoliating Scrub' },
                { image: 'https://picsum.photos/800/600?random=14', text: 'Calming Mist' },
                { image: 'https://picsum.photos/800/600?random=15', text: 'Firming Gel' }
              ]}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              font="bold 24px 'Nura', sans-serif"
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        </div>
      </section>

      {/* KDerma's Got Your Back Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-wide">
              KDerma's Got Your Back
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Exclusive services designed to keep your skincare journey effortless.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "try on shades",
              "meet your match",
              "chat with experts",
              "subscribe to save"
            ].map((tag, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">
                      {tag.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                    {tag}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover personalized {tag.toLowerCase()} experiences tailored just for you.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The KDerma Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-wide">
              The KDerma Brands
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A handpicked collection of Korea's most loved skincare and beauty labels.
            </p>
          </div>

          <div style={{ height: '120px', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
            <LogoLoop
              logos={[
                { name: 'anua', logo: '/api/placeholder/120/80', color: '#E8F5E8' },
                { name: 'innisfree', logo: '/api/placeholder/120/80', color: '#E8F8E8' },
                { name: 'medicube', logo: '/api/placeholder/120/80', color: '#F0F8FF' },
                { name: 'cosrx', logo: '/api/placeholder/120/80', color: '#FFF5F5' },
                { name: 'etude', logo: '/api/placeholder/120/80', color: '#FFF0F8' },
                { name: 'beauty of joseon', logo: '/api/placeholder/120/80', color: '#F8F5E8' },
                { name: 'tonymoly', logo: '/api/placeholder/120/80', color: '#F5F8FF' },
                { name: 'skin1004', logo: '/api/placeholder/120/80', color: '#F8F8F0' }
              ].map(brand => ({
                src: brand.logo,
                alt: brand.name,
                title: brand.name,
                href: `#${brand.name}`
              }))}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={30}
              pauseOnHover
              scaleOnHover
              fadeOut
              ariaLabel="Brand logos"
            />
          </div>
        </div>
      </section>

      <style>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </>
  );
};