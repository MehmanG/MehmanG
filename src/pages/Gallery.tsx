import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;
      const { data, error } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
      if (!error && data) {
        setImages(data);
      }
    }
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-theme-bg pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-display text-theme-heading font-medium mb-4">The Gallery</h1>
        <motion.div 
          className="w-16 h-1 bg-theme-accent mx-auto rounded-full shadow-[0_0_10px_rgba(255,184,0,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {images.length === 0 ? (
        <div className="text-center text-theme-text/50 py-20 flex-grow">Loading gallery or no images found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.08, type: 'spring', damping: 18 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] group cursor-pointer shadow-sm border border-theme-text/5 will-change-transform"
              onClick={() => setSelectedImage(img.image_url)}
              whileHover={{ y: -8, scale: 1.01, boxShadow: '0 20px 40px -10px rgba(255,184,0,0.2)' }}
            >
              <motion.img 
                src={img.image_url} 
                alt={img.alt_text}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-theme-bg/90 p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage} 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              alt="Enlarged view"
            />
            <motion.button 
              className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-theme-heading hover:text-theme-accent shadow-lg transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,184,0,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
