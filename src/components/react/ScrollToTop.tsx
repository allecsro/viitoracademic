import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', toggleVisibility);

    // Check initial scroll position
    toggleVisibility();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group border border-white/10"
          style={{ backgroundColor: '#11385E' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2B5E8C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#11385E';
          }}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          {/* Gradient overlay for depth */}
          <div 
            className="absolute inset-0 rounded-full opacity-100 group-hover:opacity-90 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom right, #11385E, #2B5E8C)'
            }}
          />
          
          {/* Icon with animation */}
          <motion.div
            className="relative z-10"
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronUp 
              className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.div>
          
          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: 'rgba(17, 56, 94, 0.3)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
