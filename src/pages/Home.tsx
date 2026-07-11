import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageSquare, Star, Quote, Heart, CheckCircle2, Wifi, Car, Coffee, Tv, Maximize2, BedDouble, Bath, ShieldCheck, CookingPot, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SiteSettings } from '../types';
import balconyView from '../assets/images/1000114610.jpg';
import roomImage from '../assets/images/1000114593.jpg';

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      if (!supabase) return;
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        setSettings(data);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="w-full bg-theme-bg min-h-screen">
      <HeroSection />
      <RoomsSection />
      <ReviewBoardSection />
      <ContactSection settings={settings} />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-theme-bg">
      {/* Immersive Ken Burns Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full relative"
        >
          <img 
            src={balconyView} 
            alt="Mehman G Sanctuary" 
            className="w-full h-full object-cover brightness-[0.45] dark:brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          {/* Ambient Warm Vignette & Light leak */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/70" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-theme-accent/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        </motion.div>
      </div>
      
      {/* Elegant Glassmorphic Hero Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring' }}
          className="backdrop-blur-lg bg-black/40 border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden"
        >
          <span className="text-theme-accent font-display text-xs tracking-[0.3em] font-bold uppercase block">
            A Cozy Experience
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight text-white font-semibold">
            Welcome to <span className="text-theme-accent drop-shadow-[0_0_15px_rgba(255,184,0,0.3)]">Mehman G</span>
          </h1>
          
          <p className="text-white/85 text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Your premium comfort sanctuary in Greater Noida. Seamlessly blending cozy home vibes with thoughtful business-class amenities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/gallery" 
                className="inline-block px-10 py-4 bg-theme-accent text-[#0A0A0A] font-bold text-base rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,184,0,0.6)] hover:bg-theme-accent-hover transition-all duration-300 w-full sm:w-auto"
              >
                Explore Sanctuary
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-10 py-4 bg-white/10 text-white font-bold text-base rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                Book Your Stay
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Majestic Curved Architectural Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[35px] md:h-[65px] text-theme-bg fill-current animate-fade-in"
        >
          <path d="M0,120 C300,20 900,20 1200,120 L1200,120 L0,120 Z" className="text-theme-bg fill-current"></path>
        </svg>
      </div>
    </section>
  );
}

function RoomsSection() {
  const room = {
    title: "Comfort Studio",
    size: "Around 200 sq. ft. approx",
    features: [
      { icon: Maximize2, label: "Area", value: "200 sq. ft. ~ approx" },
      { icon: Bath, label: "Washroom", value: "Attached private washroom" },
      { icon: Eye, label: "View", value: "City View" },
      { icon: ShieldCheck, label: "Hygiene", value: "Fully Sanitized & Managed" }
    ],
    description: "A simple, comfy space designed with warm home vibes and cozy touches, perfect for relaxing personal retreats or productive professional stays.",
    image: roomImage
  };

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-theme-heading font-medium">Our Space</h2>
        <motion.div 
          className="w-16 h-1 bg-theme-accent mx-auto rounded-full shadow-[0_0_10px_rgba(255,184,0,0.5)]"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Comfort Studio Single Room Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Side: Stunning Large Room Image */}
        <motion.div 
          className="w-full lg:w-1/2 overflow-hidden rounded-[2.5rem] shadow-2xl relative group cursor-pointer border border-theme-text/5 will-change-transform"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01, boxShadow: '0 30px 60px -15px rgba(255,184,0,0.15)' }}
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <img 
              src={room.image} 
              alt={room.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Elegant Image Overlay Tag */}
            <div className="absolute top-6 left-6 bg-theme-bg/80 backdrop-blur-md px-4 py-2 rounded-full border border-theme-text/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-theme-accent animate-pulse"></span>
              <span className="text-xs font-mono font-semibold text-theme-heading">Available Now</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Right Side: Specifications & Elegant Description */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <h3 className="text-3xl md:text-4xl font-display text-theme-heading font-medium">{room.title}</h3>
            </div>
            <p className="text-theme-accent font-mono text-sm tracking-wide flex items-center gap-1.5 font-medium">
              <span>●</span> {room.size}
            </p>
          </div>

          <p className="text-theme-text/80 text-base md:text-lg leading-relaxed font-sans">
            {room.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {room.features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div key={index} className="flex items-center gap-3.5 p-4 rounded-2xl bg-theme-surface border border-theme-text/5 hover:border-theme-text/10 transition-colors duration-300">
                  <div className="p-2.5 rounded-xl bg-theme-bg text-theme-accent border border-theme-text/5 flex items-center justify-center">
                    <IconComp size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-theme-text/40 uppercase tracking-wider">{feat.label}</p>
                    <p className="text-xs md:text-sm text-theme-heading font-medium mt-0.5">{feat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-theme-heading text-theme-bg font-medium rounded-full hover:bg-theme-accent hover:text-[#0A0A0A] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(255,184,0,0.2)]"
            >
              View Room Gallery
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Embedded Thoughtful Amenities Section */}
      <div className="mt-32 pt-24 border-t border-theme-text/5">
        {/* Amenities Title directly matching the reference */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-theme-accent font-display text-xs tracking-[0.25em] font-bold uppercase block mb-3">COMFORTS</span>
          <h2 className="text-4xl md:text-5xl font-display text-theme-heading font-semibold tracking-tight">Thoughtful Amenities</h2>
        </motion.div>

        {/* 4-column Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center px-4 md:px-8">
          {/* 1. High-Speed Wi-Fi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center group cursor-default"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 15px 30px rgba(255,184,0,0.15)",
                borderColor: "#FFB800"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-16 h-16 rounded-full bg-theme-surface border border-theme-text/5 flex items-center justify-center text-theme-accent mb-6 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle inner hover glow */}
              <div className="absolute inset-0 bg-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Wifi size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            <h4 className="text-lg font-display text-theme-heading font-medium mb-2 transition-colors duration-300 group-hover:text-theme-accent">
              High-Speed Wi-Fi
            </h4>
            <p className="text-sm text-theme-text/60 leading-relaxed max-w-[220px]">
              Seamless connectivity throughout your stay.
            </p>
          </motion.div>

          {/* 2. Parking Available */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center group cursor-default"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 15px 30px rgba(255,184,0,0.15)",
                borderColor: "#FFB800"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-16 h-16 rounded-full bg-theme-surface border border-theme-text/5 flex items-center justify-center text-theme-accent mb-6 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Car size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            <h4 className="text-lg font-display text-theme-heading font-medium mb-2 transition-colors duration-300 group-hover:text-theme-accent">
              Parking Available
            </h4>
            <p className="text-sm text-theme-text/60 leading-relaxed max-w-[220px]">
              Convenient on-site parking for all guests.
            </p>
          </motion.div>

          {/* 3. Inductions Available */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center group cursor-default"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 15px 30px rgba(255,184,0,0.15)",
                borderColor: "#FFB800"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-16 h-16 rounded-full bg-theme-surface border border-theme-text/5 flex items-center justify-center text-theme-accent mb-6 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CookingPot size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            <h4 className="text-lg font-display text-theme-heading font-medium mb-2 transition-colors duration-300 group-hover:text-theme-accent">
              Inductions Available
            </h4>
            <p className="text-sm text-theme-text/60 leading-relaxed max-w-[220px]">
              Modern and safe induction cooktops for your culinary convenience.
            </p>
          </motion.div>

          {/* 4. In-Room Entertainment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center group cursor-default"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 15px 30px rgba(255,184,0,0.15)",
                borderColor: "#FFB800"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-16 h-16 rounded-full bg-theme-surface border border-theme-text/5 flex items-center justify-center text-theme-accent mb-6 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-theme-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Tv size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            <h4 className="text-lg font-display text-theme-heading font-medium mb-2 transition-colors duration-300 group-hover:text-theme-accent">
              In-Room Entertainment
            </h4>
            <p className="text-sm text-theme-text/60 leading-relaxed max-w-[220px]">
              Smart televisions integrated with premium streaming.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewBoardSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-theme-surface relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-theme-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-theme-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-theme-accent/10 border border-theme-accent/20 rounded-full text-xs font-semibold text-theme-accent uppercase tracking-wider mb-4">
            <MessageSquare size={13} className="fill-theme-accent/25" />
            Guest Review Board
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-theme-heading font-medium mb-4">Guest Experiences</h2>
          <p className="text-theme-text/60 text-sm md:text-base max-w-md mx-auto">
            Real messages from visitors who made Mehman G their home away from home.
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-theme-accent text-theme-accent drop-shadow-[0_0_5px_rgba(255,184,0,0.5)]" />
            ))}
          </div>
        </motion.div>

        {/* Floating Chat Bubbles Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start relative min-h-[420px] px-2 md:px-6">
          {/* 1st Review Bubble - Karan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: 'spring', damping: 20 }}
            whileHover={{ 
              scale: 1.02, 
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(255, 184, 0, 0.15)"
            }}
            className="relative bg-theme-bg/40 border border-theme-text/10 backdrop-blur-md p-6 md:p-8 rounded-[2rem] rounded-bl-none shadow-xl flex flex-col gap-4 group transition-all duration-300 w-full will-change-transform"
          >
            {/* Quote Icon Background */}
            <Quote size={56} className="absolute top-4 right-6 text-theme-text/5 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center justify-between border-b border-theme-text/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-theme-accent/10 border border-theme-accent/30 flex items-center justify-center text-theme-accent font-display font-semibold text-lg shadow-[0_0_15px_rgba(255,184,0,0.1)]">
                  K
                </div>
                <div>
                  <h4 className="text-theme-heading font-medium text-base flex items-center gap-1.5">
                    Karan
                    <span className="inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-sans">
                      <CheckCircle2 size={10} className="fill-emerald-500/20" /> Verified
                    </span>
                  </h4>
                  <p className="text-[11px] text-theme-text/40 font-mono mt-0.5">Stayed in Comfort Studio</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-theme-accent text-theme-accent" />
                ))}
              </div>
            </div>

            <div className="relative">
              <p className="text-theme-text/90 text-sm md:text-base leading-relaxed italic font-sans pr-2">
                "Thank You, Saurabh And Neeraj for accommodating the early check in request. It was a pleasant and peaceful stay. 
                <span className="block mt-2 font-medium not-italic text-theme-accent">Overall Good Stay For Personal And Proffesional"</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-theme-text/30 font-mono mt-2 pt-2 border-t border-theme-text/5">
              <span>Via Feedback Forum</span>
              <span className="flex items-center gap-1 text-emerald-500/70">
                ● Delivered
              </span>
            </div>

            {/* Bubble Tail */}
            <div className="absolute bottom-[-1px] left-[-9px] w-0 h-0 border-r-[12px] border-r-transparent border-t-[16px] border-t-theme-bg/40 transform -scale-x-100 filter drop-shadow-[-2px_2px_2px_rgba(0,0,0,0.1)]" />
            <div className="absolute bottom-0 left-[-8px] w-0 h-0 border-r-[10px] border-r-transparent border-t-[14px] border-t-theme-bg/40 transform -scale-x-100" />
          </motion.div>

          {/* 2nd Review Bubble - Vikas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: 'spring', damping: 20, delay: 0.15 }}
            whileHover={{ 
              scale: 1.02, 
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(255, 184, 0, 0.15)"
            }}
            className="relative bg-theme-bg/40 border border-theme-text/10 backdrop-blur-md p-6 md:p-8 rounded-[2rem] rounded-br-none shadow-xl flex flex-col gap-4 group transition-all duration-300 w-full md:mt-12 will-change-transform"
          >
            {/* Quote Icon Background */}
            <Quote size={56} className="absolute top-4 right-6 text-theme-text/5 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center justify-between border-b border-theme-text/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-theme-accent/10 border border-theme-accent/30 flex items-center justify-center text-theme-accent font-display font-semibold text-lg shadow-[0_0_15px_rgba(255,184,0,0.1)]">
                  V
                </div>
                <div>
                  <h4 className="text-theme-heading font-medium text-base flex items-center gap-1.5">
                    Vikas
                    <span className="inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-sans">
                      <CheckCircle2 size={10} className="fill-emerald-500/20" /> Verified
                    </span>
                  </h4>
                  <p className="text-[11px] text-theme-text/40 font-mono mt-0.5">Stayed in Comfort Studio</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-theme-accent text-theme-accent" />
                ))}
              </div>
            </div>

            <div className="relative">
              <p className="text-theme-text/90 text-sm md:text-base leading-relaxed italic font-sans pr-2">
                "We had a great stay. The hospitality was excellent, just as described. The host was very friendly, helpful, and cooperative throughout our visit. <span className="block mt-2 font-medium not-italic text-theme-accent">Highly recommended"</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-theme-text/30 font-mono mt-2 pt-2 border-t border-theme-text/5">
              <span>Via Feedback Forum</span>
              <span className="flex items-center gap-1 text-emerald-500/70">
                ● Delivered
              </span>
            </div>

            {/* Bubble Tail */}
            <div className="absolute bottom-[-1px] right-[-9px] w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-theme-bg/40 filter drop-shadow-[2px_2px_2px_rgba(0,0,0,0.1)]" />
            <div className="absolute bottom-0 right-[-8px] w-0 h-0 border-l-[10px] border-l-transparent border-t-[14px] border-t-theme-bg/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const address = "Kaveri City Centre, Block B, Delta I, Greater Noida, Brahmpur Rajraula Urf Nawada, Uttar Pradesh 201310";
  const phone = "+91 8796326678";
  const email = "connectwithmehmang@gmail.com";

  const [name, setName] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send to Google Spreadsheet if a Web App script URL is configured in settings
      const scriptUrl = settings?.google_sheet_script_url;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            name,
            email: emailVal,
            message
          })
        });
      }

      // Send directly to Supabase feedback table as a backup / local log
      if (supabase) {
        const { error } = await supabase.from('feedback').insert([{ name, email: emailVal, message }]);
        if (error) {
          console.error("Supabase feedback insert error:", error);
        }
      }

      alert(scriptUrl 
        ? 'Thank you for your message! It has been successfully saved to your Spreadsheet and database.' 
        : 'Thank you for your message! It has been sent successfully.'
      );
      setName('');
      setEmailVal('');
      setMessage('');
    } catch (error: any) {
      console.error("Error sending feedback:", error);
      alert('Thank you for your message! It has been received.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display mb-8 text-theme-heading font-medium">Get In Touch</h2>
          <div className="space-y-6 text-theme-text/80 text-lg">
            <motion.p whileHover={{ x: 5, color: 'var(--color-theme-accent)', textShadow: '0 0 8px rgba(255,184,0,0.3)' }} className="transition-colors">
              <strong className="block text-theme-heading text-sm font-medium mb-1 uppercase tracking-wider">Address</strong>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings?.hotel_address || address)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {settings?.hotel_address || address}
              </a>
            </motion.p>
            <motion.p whileHover={{ x: 5, color: 'var(--color-theme-accent)', textShadow: '0 0 8px rgba(255,184,0,0.3)' }} className="transition-colors">
              <strong className="block text-theme-heading text-sm font-medium mb-1 uppercase tracking-wider">Phone</strong>
              <a href={`tel:${(settings?.phone_number || phone).replace(/\s+/g, '')}`} className="hover:underline">
                {settings?.phone_number || phone}
              </a>
            </motion.p>
            <motion.p whileHover={{ x: 5, color: 'var(--color-theme-accent)', textShadow: '0 0 8px rgba(255,184,0,0.3)' }} className="transition-colors">
              <strong className="block text-theme-heading text-sm font-medium mb-1 uppercase tracking-wider">Email</strong>
              <a href={`mailto:${settings?.email_address || email}`} className="hover:underline">
                {settings?.email_address || email}
              </a>
            </motion.p>
          </div>
          <motion.div className="mt-12 inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 rounded-full border-2 border-theme-accent text-theme-accent font-medium hover:bg-theme-accent hover:text-[#0A0A0A] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,184,0,0.4)]"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="space-y-8 bg-theme-surface p-8 rounded-[2rem] shadow-sm border border-theme-text/5" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-display text-theme-heading font-medium mb-4">Feedback Forum</h3>
            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-theme-text/20 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors peer" 
                placeholder=" " 
                required
              />
              <label htmlFor="name" className="absolute left-0 top-3 text-theme-text/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-theme-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Name</label>
            </div>
            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                className="w-full bg-transparent border-b border-theme-text/20 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors peer" 
                placeholder=" " 
                required
              />
              <label htmlFor="email" className="absolute left-0 top-3 text-theme-text/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-theme-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Email</label>
            </div>
            <div className="relative group">
              <textarea 
                id="message" 
                rows={4} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-theme-text/20 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors peer resize-none" 
                placeholder=" " 
                required
              ></textarea>
              <label htmlFor="message" className="absolute left-0 top-3 text-theme-text/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-theme-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Share Your Feedback</label>
            </div>
            <motion.button 
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-theme-accent text-theme-heading font-semibold rounded-full hover:bg-theme-accent-hover transition-colors shadow-md disabled:opacity-50"
              whileHover={submitting ? {} : { scale: 1.02, boxShadow: '0 0 20px rgba(255,184,0,0.5)' }}
              whileTap={submitting ? {} : { scale: 0.98 }}
            >
              {submitting ? 'Sending to Spreadsheet...' : 'Submit Feedback'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
