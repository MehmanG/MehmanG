import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SiteSettings } from '../types';
import Logo from './Logo';

export default function Footer() {
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

  const instagramUrl = settings?.instagram_url || "https://www.instagram.com/mehmang_/";
  const facebookUrl = settings?.facebook_url || "https://facebook.com";

  return (
    <footer className="bg-theme-surface border-t border-theme-text/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo size="sm" />
        <div className="text-theme-text/70 text-sm">
          &copy; {new Date().getFullYear()} Mehman G. All rights reserved.
        </div>
        <div className="flex gap-8 items-center">
          {[
            { name: "Instagram", url: instagramUrl },
            { name: "Facebook", url: facebookUrl }
          ].map(social => (
            <a 
              key={social.name} 
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,184,0,0.6)] transform inline-block text-base md:text-lg font-bold tracking-wide border-b border-theme-accent/30 hover:border-theme-accent pb-0.5"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
