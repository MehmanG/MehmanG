import React from 'react';
import { cn } from '../lib/utils';
import logoImg from '../assets/logo/logo.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  // Dimension mappings for responsive layouts matching the image sizes
  const sizeClasses = {
    xs: {
      wrapper: 'flex-row items-center gap-2',
      img: 'h-6 w-auto min-w-[24px]',
      text: 'text-base',
      subtext: 'hidden'
    },
    sm: {
      wrapper: 'flex-row items-center gap-2.5',
      img: 'h-9 w-auto min-w-[36px]',
      text: 'text-xl',
      subtext: 'hidden'
    },
    md: {
      wrapper: 'flex-col items-center gap-1.5',
      img: 'h-16 w-auto min-h-[64px]',
      text: 'text-2xl',
      subtext: 'text-[9px] tracking-[0.35em]'
    },
    lg: {
      wrapper: 'flex-col items-center gap-2',
      img: 'h-24 w-auto min-h-[96px]',
      text: 'text-3xl',
      subtext: 'text-[11px] tracking-[0.4em]'
    },
    xl: {
      wrapper: 'flex-col items-center gap-3',
      img: 'h-32 w-auto min-h-[128px]',
      text: 'text-4xl',
      subtext: 'text-[13px] tracking-[0.4em]'
    },
    '2xl': {
      wrapper: 'flex-col items-center gap-4',
      img: 'h-44 w-auto min-h-[176px]',
      text: 'text-5xl',
      subtext: 'text-[16px] tracking-[0.45em]'
    }
  };

  const config = sizeClasses[size];

  return (
    <div className={cn("flex select-none items-center justify-center", config.wrapper, className)}>
      {/* Real Image Logo imported from /src/assets/logo */}
      <img
        src={logoImg}
        alt="Mehman G Logo"
        className={cn("transition-all duration-300 object-contain hover:scale-105", config.img)}
        referrerPolicy="no-referrer"
      />

      {/* Optional Brand Text Content (For when logo image doesn't include text, or if they want it) */}
      {showText && (
        <div className="flex flex-col items-center">
          <h1 className={cn("font-display font-bold tracking-tight text-theme-heading transition-colors duration-500", config.text)}>
            Mehman <span className="text-theme-accent">G</span>
          </h1>
          {size !== 'xs' && size !== 'sm' && (
            <div className={cn("flex items-center justify-center w-full uppercase text-theme-text/60 font-display font-medium mt-0.5", config.subtext)}>
              <span className="h-[1px] w-6 bg-theme-text/20 mr-2 inline-block"></span>
              Hotel
              <span className="h-[1px] w-6 bg-theme-text/20 ml-2 inline-block"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
