import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isWindowLoaded = document.readyState === 'complete';
    let isMinTimeElapsed = false;

    const completeLoading = () => {
      setIsLoaded(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    };

    const checkAndComplete = () => {
      if (isWindowLoaded && isMinTimeElapsed) {
        completeLoading();
      }
    };

    const handleLoad = () => {
      isWindowLoaded = true;
      checkAndComplete();
    };

    if (!isWindowLoaded) {
      window.addEventListener('load', handleLoad);
    }

    // Ensure a minimum loading animation duration for visual polish
    const timer = setTimeout(() => {
      isMinTimeElapsed = true;
      checkAndComplete();
    }, 1500);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-theme-bg"
      initial={{ y: 0 }}
      animate={{ y: isLoaded ? '-100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Decorative background glow ambient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(255,184,0,0.06),transparent_100%)] pointer-events-none" />

      <div className="flex flex-col items-center justify-center px-4 relative z-10 select-none">
        {/* Typographic Header */}
        <div className="relative py-8 px-12 flex flex-col items-center">
          {/* Subtle glowing backdrop behind text */}
          <div className="absolute inset-0 bg-theme-accent/5 rounded-[40px] blur-3xl opacity-85" />

          {/* Top Decorative Expanding Accent Line */}
          <motion.div 
            className="h-[1px] bg-gradient-to-r from-transparent via-theme-accent to-transparent w-40 md:w-56 mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Main Brand Title with spacing, glowing drop shadow, and staggered motion */}
          <motion.div
            className="flex flex-col items-center gap-1 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.25em] text-theme-heading leading-none">
              MEHMAN <span className="font-semibold text-theme-accent drop-shadow-[0_0_20px_rgba(255,184,0,0.4)]">G</span>
            </h1>
          </motion.div>

          {/* Bottom Decorative Expanding Accent Line */}
          <motion.div 
            className="h-[1px] bg-gradient-to-r from-transparent via-theme-accent to-transparent w-40 md:w-56 mt-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Minimalist Premium Loading Bar Indicator */}
        <div className="w-24 md:w-32 h-[2px] bg-theme-text/10 rounded-full overflow-hidden mt-6 relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-theme-accent/70 via-theme-accent to-theme-accent/70 rounded-full"
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ position: 'absolute', width: '60%' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
