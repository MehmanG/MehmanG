import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Logo from './Logo';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-theme-bg"
      initial={{ y: 0 }}
      animate={{ y: isLoaded ? '-100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-theme-accent/20 border-t-theme-accent rounded-full shadow-[0_0_15px_rgba(255,184,0,0.4)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        >
          <Logo size="lg" />
        </motion.div>
      </div>
    </motion.div>
  );
}
