"use client";

import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";
import { CardContent } from "../ui/card";
import ThreeDCarousel from "../ui/three-d-carousel";
import type { ThreeDCarouselItem } from "../ui/three-d-carousel";
import { motion } from "motion/react";
import { useInView } from "motion/react";

export interface InitiativeItem {
  id: number;
  title: string;
  location: string;
  date?: string;
  imageUrl?: string;
}

interface InitiativesSectionProps {
  title?: string;
  subtitle?: string;
  initiatives: InitiativeItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  isMobileSwipe?: boolean;
}

const InitiativesSection = ({
  initiatives,
  title = "Our Initiatives",
  subtitle,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 450,
  isMobileSwipe = true,
}: InitiativesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const carouselItems: ThreeDCarouselItem[] = initiatives.map((initiative) => ({
    id: initiative.id,
    title: initiative.title,
    location: initiative.location,
    date: initiative.date,
    imageUrl: initiative.imageUrl,
  }));

  const renderCardContent = (item: ThreeDCarouselItem) => {
    const hasImage = item.imageUrl && item.imageUrl.trim() !== '';
    const hasDate = item.date && item.date.trim() !== '';

    return (
      <>
        {hasImage ? (
          <div
            className="relative bg-black p-4 sm:p-6 flex items-center justify-center h-64 sm:h-72 overflow-hidden"
            style={{
              backgroundImage: sectionInView ? `url(${item.imageUrl})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        ) : (
          <div className="relative bg-primary-blue p-4 sm:p-6 flex items-center justify-center h-64 sm:h-72 overflow-hidden">
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {item.title.toUpperCase()}
              </h3>
            </div>
          </div>
        )}

        <CardContent className="p-4 sm:p-6 flex flex-col relative" style={{ minHeight: 'auto', paddingBottom: hasDate ? '4rem' : '1rem' }}>
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground">
            {item.title}
          </h3>

          <div className="flex items-start sm:items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-blue shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-xs sm:text-sm font-medium wrap-break-word">{item.location}</span>
          </div>

          {hasDate && (
            <div className="absolute bottom-4 right-4 sm:bottom-3 sm:right-6 flex items-center text-gray-600">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-blue shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{item.date}</span>
            </div>
          )}
        </CardContent>
      </>
    );
  };

  if (!initiatives || initiatives.length === 0) {
    return null;
  }

  return (
    <section
      id="initiatives"
      ref={sectionRef}
      className="py-16 bg-linear-to-b from-white to-gray-50"
      style={{ overflow: 'visible' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="project-title mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              {subtitle}
            </p>
          )}
          <div className="section-underline"></div>
        </motion.div>

        <div style={{ overflow: 'visible', position: 'relative' }}>
          <ThreeDCarousel
            items={carouselItems}
            autoRotate={autoRotate}
            rotateInterval={rotateInterval}
            cardHeight={cardHeight}
            isMobileSwipe={isMobileSwipe}
            renderCardContent={renderCardContent}
          />
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;

