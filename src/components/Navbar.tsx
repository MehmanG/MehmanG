import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, MessageCircle, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled ? "bg-theme-surface/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:scale-105 transition-all duration-300">
          <Logo size="sm" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-theme-accent hover:scale-110",
                location.pathname === link.path ? "text-theme-accent font-semibold" : "text-theme-text"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-theme-bg/50 border border-theme-border text-theme-text hover:text-theme-accent transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a 
              href="https://wa.me/918796326678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] text-neutral-950 font-bold text-sm rounded-full shadow-md hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:bg-[#20ba5a] transition-all duration-300 flex items-center gap-1.5"
            >
              <MessageCircle size={16} className="fill-current" />
              Connect With Us
            </a>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-theme-bg/50 border border-theme-border text-theme-text hover:text-theme-accent transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-theme-heading focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-theme-surface border-t border-theme-border mt-2 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-all duration-300",
                    location.pathname === link.path ? "text-theme-accent font-semibold" : "text-theme-text"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-theme-border">
                <a 
                  href="https://wa.me/918796326678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 w-full bg-[#25D366] text-neutral-950 font-bold text-base rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} className="fill-current" />
                  Connect With Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
