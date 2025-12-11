import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  images?: string[];
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
}

export default function HeroSection({
  title,
  subtitle,
  images,
  button1Text,
  button1Link,
  button2Text,
  button2Link,
}: HeroSectionProps) {
  // Use images from CMS only (no fallback)
  const heroImages = images || [];
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const preloadedImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const hasPreloadedRef = useRef(false);

  // Preload all images on component mount or when images change
  useEffect(() => {
    // If no images provided, mark as loaded immediately
    if (heroImages.length === 0) {
      setImagesPreloaded(true);
      setIsLoaded(true);
      return;
    }

    // Reset preload state when images change
    hasPreloadedRef.current = false;
    preloadedImagesRef.current.clear();
    setImagesPreloaded(false);
    setIsLoaded(false);

    const preloadImages = () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          // Check if already preloaded
          if (preloadedImagesRef.current.has(src)) {
            resolve(null);
            return;
          }

          const img = new Image();
          img.onload = () => {
            preloadedImagesRef.current.set(src, img);
            resolve(null);
          };
          img.onerror = reject;
          img.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesPreloaded(true);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.warn('Some images failed to preload:', error);
          setImagesPreloaded(true);
          setIsLoaded(true);
        });
    };

    preloadImages();
  }, [heroImages]);

  // Auto-rotate background images
  useEffect(() => {
    if (!imagesPreloaded || heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesPreloaded, heroImages.length]);

  return (
    <section id="hero" className="relative h-screen flex items-center -mt-16 w-full max-w-full max-[500px]:z-0">
      {/* Full-width Background Image Carousel - Render all images, control visibility */}
      <div className="absolute inset-0 w-full h-full z-0">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1,
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: index === currentImageIndex ? 'auto' : 'none' }}
          >
            <img
              src={src}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </motion.div>
        ))}
      </div>

      {/* Dark Overlay with Transparent Opacity */}
      <div className="absolute inset-0 w-full h-full bg-linear-to-br from-[rgba(17,56,94,0.45)] via-[rgba(17,56,94,0.50)] to-[rgba(17,56,94,0.45)] z-10"></div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="max-w-3xl max-[900px]:mx-auto max-[900px]:text-center">
          {/* Subtitle */}
          {subtitle && (
            <motion.div
              className="mb-4 max-[900px]:flex max-[900px]:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-white text-lg md:text-xl font-semibold uppercase tracking-wider max-[900px]:text-center" style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)'
              }}>
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight max-[900px]:text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {title.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4 max-[900px]:mr-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                {word}
                {index === title.split(' ').length - 1 && (
                  <span className="text-accent-blue">.</span>
                )}
                {' '}
              </motion.span>
            ))}
          </motion.h1>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8 max-[900px]:justify-center max-[900px]:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {button1Text && button1Link && (
              <motion.a
                href={button1Link}
                className="hero-btn-primary-modern group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {button1Text}
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </motion.a>
            )}
            {button2Text && button2Link && (
              <motion.a
                href={button2Link}
                className="hero-btn-secondary-modern"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {button2Text}
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 bg-accent-blue'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
