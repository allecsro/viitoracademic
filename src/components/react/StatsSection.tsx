import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Users, GraduationCap, Calendar, Building2 } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  backgroundImage?: string;
}

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const numValue = parseInt(value.replace(/\D/g, ''));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setDisplayValue(numValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numValue]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection({ stats, backgroundImage }: StatsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Icons for each stat
  const statIcons = [Users, GraduationCap, Calendar, Building2];

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let sectionTopPosition = 0;
    let isInitialized = false;
    
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // Initialize section position on first render
        if (!isInitialized) {
          sectionTopPosition = ref.current.offsetTop;
          isInitialized = true;
        }
        
        // Calculate parallax offset - faster movement
        // When section is in view, move background at different speed
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          // Calculate how much we've scrolled since section entered viewport
          // Parallax speed: 2.5x for desktop, 1.5x for mobile (less aggressive on mobile)
          const parallaxSpeed = isMobile ? 1.5 : 2;
          
          // Calculate scroll progress relative to section
          const scrollProgress = (window.scrollY - sectionTopPosition) / (sectionHeight + windowHeight);
          
          // For mobile, use smaller movement range to prevent blank space
          // Mobile: 20% max movement, Desktop: 50% max movement
          const maxMovement = isMobile ? sectionHeight * 0.2 : sectionHeight * 0.5;
          const parallaxOffset = scrollProgress * maxMovement * parallaxSpeed;
          
          // Clamp to ensure we stay within image bounds
          const clampedOffset = Math.max(-maxMovement, Math.min(maxMovement, parallaxOffset));
          setScrollY(clampedOffset);
        } else {
          // Reset when out of view - use smaller offset for mobile
          const maxMovement = isMobile ? sectionHeight * 0.2 : sectionHeight * 0.5;
          if (sectionTop + sectionHeight < 0) {
            // Section is above viewport
            setScrollY(-maxMovement);
          } else if (sectionTop > windowHeight) {
            // Section is below viewport
            setScrollY(maxMovement);
          } else {
            setScrollY(0);
          }
        }
      }
    };

    const optimizedScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  return (
    <section
      id="stats"
      ref={ref} 
      className="stats-section-bg relative overflow-hidden"
      style={{
        backgroundPosition: `center ${scrollY}px`,
      }}
    >
      {/* Background Image with Parallax */}
      <div 
        className="stats-section-parallax-bg"
        style={{
          transform: `translate3d(0, ${scrollY}px, 0)`,
          ...(backgroundImage && isInView ? { backgroundImage: `url(${backgroundImage})` } : {}),
        }}
      />
      
      {/* Overlay with reduced opacity */}
      <div className="stats-section-overlay" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const numMatch = stat.number.match(/(\d+)(.*)/);
            const numValue = numMatch ? numMatch[1] : stat.number;
            const suffix = numMatch ? numMatch[2] : (stat.suffix || '');
            const IconComponent = statIcons[index % statIcons.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white opacity-90 shrink-0" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    {isInView ? <AnimatedNumber value={numValue} suffix={suffix} /> : '0'}
                  </div>
                </div>
                <div className="text-lg md:text-xl text-white font-semibold opacity-90">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
