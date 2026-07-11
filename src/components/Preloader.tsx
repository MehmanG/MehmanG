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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-theme-bg"
      initial={{ y: 0 }}
      animate={{ y: isLoaded ? '-100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Logo container as a Rounded Edge Square with a subtle luxurious glow */}
        <div className="relative flex items-center justify-center">
          {/* Golden Rotating Halo Ring */}
          <motion.div
            className="absolute w-36 h-36 border border-theme-accent/30 border-t-theme-accent border-r-theme-accent rounded-full opacity-60"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <motion.div 
            className="w-28 h-28 bg-theme-surface border border-theme-text/10 rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(255,184,0,0.3)] relative overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
          >
            {/* Ambient inner gold glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-theme-accent/5 via-transparent to-theme-accent/10 pointer-events-none" />
            
            {/* Render Logo logomark without text */}
            <Logo size="md" showText={false} />
          </motion.div>
        </div>

        {/* Elegant typography below the glowing logo badge */}
        <motion.div 
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl font-display font-bold tracking-wider text-theme-heading">
            Mehman <span className="text-theme-accent">G</span>
          </h1>
          <div className="flex items-center justify-center w-full uppercase text-theme-text/40 font-display font-medium text-[10px] tracking-[0.45em] mt-2">
            <span className="h-[1px] w-5 bg-theme-text/10 mr-2 inline-block"></span>
            Hotel
            <span className="h-[1px] w-5 bg-theme-text/10 ml-2 inline-block"></span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
