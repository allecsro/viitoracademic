"use client";

import React, {
  useRef,
  useEffect,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./card";

export type ThreeDCarouselItem = {
  id: number;
  title: string;
  location: string;
  date?: string;
  imageUrl?: string;
};

interface ThreeDCarouselProps {
  items: ThreeDCarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  isMobileSwipe?: boolean;
  renderCardContent: (item: ThreeDCarouselItem) => React.ReactNode;
}

const ThreeDCarousel = ({
  items,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
  isMobileSwipe = true,
  renderCardContent,
}: ThreeDCarouselProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const minSwipeDistance = 50;

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
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    const currentRef = carouselRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold: 0.2 }
      );
      observer.observe(currentRef);
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        observer.disconnect();
      };
    }
    return undefined;
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobileSwipe) return;
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobileSwipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isMobileSwipe || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const getCardTransform = (index: number) => {
    if (index === active) {
      return { translateX: '0%', scale: 1, opacity: 1, zIndex: 20 };
    }
    if (index === (active + 1) % items.length) {
      return { translateX: '70%', scale: 0.85, opacity: 0.4, zIndex: 10 };
    }
    if (index === (active - 1 + items.length) % items.length) {
      return { translateX: '-70%', scale: 0.85, opacity: 0.4, zIndex: 10 };
    }
    return { translateX: '0%', scale: 0.7, opacity: 0, zIndex: 0 };
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="relative h-[450px] min-h-[400px] max-md:h-[500px] max-sm:h-[550px]"
        style={{ overflow: 'visible' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        ref={carouselRef}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full" style={{ overflow: 'visible' }}>
          {items.map((item, index) => {
            const transform = getCardTransform(index);
            return (
              <div
                key={item.id}
                className={`absolute w-full max-w-md px-4 sm:px-0 transition-all duration-500 ease-in-out`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${transform.translateX}), -50%) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  zIndex: transform.zIndex,
                }}
              >
              <Card
                className={`overflow-hidden bg-background border shadow-lg hover:shadow-xl flex flex-col w-full`}
                style={{ height: isMobile ? 'auto' : `${cardHeight}px`, minHeight: isMobile ? '400px' : `${cardHeight}px` }}
              >
                {renderCardContent(item)}
              </Card>
              </div>
            );
          })}
        </div>

        {!isMobile && (
          <>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
              onClick={() =>
                setActive((prev) => (prev - 1 + items.length) % items.length)
              }
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
              onClick={() => setActive((prev) => (prev + 1) % items.length)}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center items-center space-x-3 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === idx
                ? "bg-primary-blue w-5"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActive(idx)}
            aria-label={`Go to item ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default ThreeDCarousel;

