import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ClipboardCheck, Megaphone, Calendar, DollarSign } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

interface Project {
  title: string;
  description: string;
  icon?: string;
}

interface ProjectsSectionProps {
  title: string;
  subtitle?: string;
  projects?: Project[];
}

export default function ProjectsSection({ title, subtitle, projects = [] }: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projectIcons = [
    ClipboardCheck,
    Megaphone,
    Calendar,
    DollarSign,
  ];

  return (
    <section id="projects" ref={ref} className="project-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="project-title mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">{subtitle}</p>
          )}
          <div className="project-underline"></div>
        </motion.div>

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project, index) => {
                  const IconComponent = projectIcons[index % projectIcons.length];
                  return (
                    <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="p-1 h-full"
                      >
                        <Card className="project-card h-[420px] flex flex-col max-[768px]:max-w-md max-[768px]:mx-auto max-[640px]:max-w-sm max-[640px]:mx-auto max-[520px]:max-w-xs max-[520px]:mx-auto">
                          <CardContent className="p-8 flex flex-col h-full">
                            <div className="mb-6 shrink-0">
                              <div className="project-icon-bg mb-6">
                                <IconComponent className="project-icon" />
                              </div>
                              <h3 className="project-card-title leading-tight">{project.title}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-base grow">{project.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12 max-[520px]:-left-6 max-[400px]:-left-8" />
              <CarouselNext className="right-0 md:-right-12 max-[520px]:-right-6 max-[400px]:-right-8" />
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  );
}
