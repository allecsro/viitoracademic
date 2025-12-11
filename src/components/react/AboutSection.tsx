import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface AboutSectionProps {
  title?: string;
  content?: string;
  image?: string;
}

export default function AboutSection({ title, content, image = '/Images/Hero section/HS-1.jpg' }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = image;
  }, [image]);

  // Don't render if neither title nor content is provided
  if (!title && !content) {
    return null;
  }

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center hero-bg-gradient py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px] order-2 lg:order-1"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-medium-blue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <motion.img
                  src={image}
                  alt={title || "About"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={imageLoaded ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary-blue/20 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-medium-blue rounded-full opacity-10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={image ? "order-1 lg:order-2" : "order-1 lg:col-span-2"}
          >
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-blue mb-6">
                  {title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>
                <motion.div
                  className="w-24 h-1 bg-medium-blue mb-8"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 96 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>
            )}

            {content && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
                {content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-lg md:text-xl text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
