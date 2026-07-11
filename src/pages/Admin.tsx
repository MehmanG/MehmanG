import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SiteSettings, GalleryImage } from '../types';
import { Copy, Check, ExternalLink, Trash2, Upload, AlertCircle, MessageSquare, Mail, Calendar, User } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-theme-bg flex items-center justify-center text-theme-text">Loading...</div>;
  }

  // Strict email check
  const allowedEmails = [
    'connectwithmehmang@gmail.com',
    import.meta.env.VITE_ADMIN_EMAIL
  ].filter(Boolean);

  if (session && !allowedEmails.includes(session.user.email)) {
    // Unauthorized
    supabase?.auth.signOut();
    return (
      <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center text-theme-text">
        <motion.h1 
          className="text-4xl font-display text-red-500 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Access Denied
        </motion.h1>
        <p className="mb-8 text-theme-text/70">Your email is not authorized for the admin dashboard.</p>
        <motion.button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-theme-accent text-[#0A0A0A] rounded-full font-medium shadow-md hover:bg-theme-accent-hover transition-colors"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,184,0,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Home
        </motion.button>
      </div>
    );
  }

  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return <Dashboard session={session} />;
}

function Login({ onLogin }: { onLogin: (session: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('Database connection not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid credentials. Make sure you have created this user in your Supabase Authentication dashboard.');
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md bg-theme-surface p-10 rounded-[2rem] shadow-xl border border-theme-text/5"
      >
        <h2 className="text-3xl font-display mb-8 text-center text-theme-heading font-medium">Admin Access</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 mb-6 text-sm rounded-lg border border-red-100">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-theme-bg border border-theme-text/10 rounded-xl p-3 text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme-bg border border-theme-text/10 rounded-xl p-3 text-theme-text focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all"
              required
            />
          </div>
          <motion.button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-theme-accent text-[#0A0A0A] font-medium rounded-full shadow-md hover:bg-theme-accent-hover transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(255,184,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function Dashboard({ session }: { session: any }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>({ 
    id: '', 
    hotel_address: '', 
    phone_number: '', 
    email_address: '', 
    map_coordinates: '', 
    instagram_url: '', 
    facebook_url: '',
    google_sheet_script_url: ''
  });
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  async function fetchData() {
    if (!supabase) return;
    setLoadingFeedbacks(true);
    const [settingsRes, galleryRes, feedbackRes] = await Promise.all([
      supabase.from('site_settings').select('*').single(),
      supabase.from('gallery').select('*').order('display_order', { ascending: true }),
      supabase.from('feedback').select('*').order('created_at', { ascending: false })
    ]);
    if (settingsRes.data) {
      setSettings(settingsRes.data);
    }
    if (galleryRes.data) setImages(galleryRes.data);
    if (feedbackRes.data) {
      setFeedbacks(feedbackRes.data);
    }
    setLoadingFeedbacks(false);
  }

  const deleteFeedback = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const { error } = await supabase.from('feedback').delete().eq('id', id);
      if (error) throw error;
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch (error: any) {
      alert('Failed to delete message: ' + error.message);
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    // Create a payload copy without the empty id
    const payload: any = { ...settings };
    if (!payload.id) {
      delete payload.id;
    }

    let error = null;
    let data = null;

    if (settings.id) {
      // Existing row, update it
      const response = await supabase.from('site_settings').update(payload).eq('id', settings.id).select();
      error = response.error;
      data = response.data;
    } else {
      // No ID yet, insert a new row and let the database generate the ID (whether UUID or Serial)
      const response = await supabase.from('site_settings').insert([payload]).select();
      error = response.error;
      data = response.data;
    }

    if (error) {
      alert(error.message);
    } else {
      if (data && data[0]) {
        setSettings(data[0]);
      }
      alert('Settings updated successfully!');
      fetchData();
    }
  };

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!supabase) throw new Error("Supabase not initialized");
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const files: File[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const f = event.target.files[i];
        if (f) files.push(f);
      }
      const remainingSlots = 25 - images.length;
      
      if (remainingSlots <= 0) {
        throw new Error('Maximum limit of 25 photos reached.');
      }

      let filesToUpload = files;
      if (files.length > remainingSlots) {
        alert(`Only ${remainingSlots} photo slots remaining. Only the first ${remainingSlots} photos will be uploaded.`);
        filesToUpload = files.slice(0, remainingSlots);
      }

      const uploadedImages: any[] = [];
      
      for (let i = 0; i < filesToUpload.length; i++) {
        setUploading(`Uploading (${i + 1}/${filesToUpload.length})...`);
        const file = filesToUpload[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file);
        if (uploadError) {
          throw new Error(`Failed to upload "${file.name}": ${uploadError.message}. Make sure you have created a public bucket named 'gallery' in your Supabase Storage dashboard.`);
        }

        const { data } = supabase.storage.from('gallery').getPublicUrl(filePath);
        
        uploadedImages.push({
          image_url: data.publicUrl,
          alt_text: file.name.split('.')[0] || 'Uploaded image',
          display_order: images.length + i
        });
      }

      if (uploadedImages.length > 0) {
        setUploading('Saving to database...');
        const { error: insertError } = await supabase.from('gallery').insert(uploadedImages);
        if (insertError) throw insertError;
      }

      fetchData();
      alert(`Successfully uploaded ${uploadedImages.length} images!`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(null);
    }
  };

  const deleteImage = async (id: string, url: string) => {
    if (!supabase) return;
    try {
      const fileName = url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('gallery').remove([fileName]);
      }
      await supabase.from('gallery').delete().eq('id', id);
      fetchData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, type: 'spring' }}
          className="text-center z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-wide flex flex-col items-center gap-6">
            <motion.span 
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring' }}
              className="flex items-center justify-center bg-theme-accent text-[#0A0A0A] w-20 h-20 rounded-2xl text-4xl font-bold shadow-[0_0_40px_rgba(255,184,0,0.4)]"
            >
              M<span className="text-white">G</span>
            </motion.span>
            Welcome To Mehman G
          </h1>
        </motion.div>
        {/* Decorative background pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-theme-accent/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-12 border-b border-theme-text/10 pb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-display text-theme-heading font-medium">Admin Dashboard</h1>
          <p className="text-theme-text/70 mt-2 text-sm">Logged in as {session.user.email}</p>
        </motion.div>
        <motion.button 
          onClick={() => supabase?.auth.signOut()}
          className="text-theme-text/70 hover:text-theme-heading text-sm border border-theme-text/20 rounded-full px-5 py-2 hover:bg-theme-text/5 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Out
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Settings Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-theme-surface p-8 rounded-[2rem] shadow-sm border border-theme-text/5"
        >
          <h2 className="text-2xl font-display mb-6 text-theme-heading">Global Settings Manager</h2>
          <form onSubmit={handleSettingsUpdate} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Hotel Address</label>
              <input type="text" value={settings.hotel_address} onChange={(e) => setSettings({...settings, hotel_address: e.target.value})} className="w-full bg-theme-bg border border-theme-text/10 rounded-xl py-2 px-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Phone Number</label>
              <input type="text" value={settings.phone_number} onChange={(e) => setSettings({...settings, phone_number: e.target.value})} className="w-full bg-theme-bg border border-theme-text/10 rounded-xl py-2 px-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Email Address</label>
              <input type="email" value={settings.email_address} onChange={(e) => setSettings({...settings, email_address: e.target.value})} className="w-full bg-theme-bg border border-theme-text/10 rounded-xl py-2 px-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Instagram Link</label>
              <input type="url" value={settings.instagram_url || ''} onChange={(e) => setSettings({...settings, instagram_url: e.target.value})} placeholder="https://www.instagram.com/mehmang_/" className="w-full bg-theme-bg border border-theme-text/10 rounded-xl py-2 px-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-theme-text/70 mb-2 uppercase tracking-wider">Facebook Link</label>
              <input type="url" value={settings.facebook_url || ''} onChange={(e) => setSettings({...settings, facebook_url: e.target.value})} placeholder="https://facebook.com" className="w-full bg-theme-bg border border-theme-text/10 rounded-xl py-2 px-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors" />
            </div>

            <div className="pt-4">
              <motion.button 
                type="submit" 
                className="px-8 py-3 bg-theme-accent text-[#0A0A0A] rounded-full font-medium hover:bg-theme-accent-hover transition-colors shadow-md"
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(255,184,0,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Save Settings
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Gallery Manager */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-theme-surface p-8 rounded-[2rem] shadow-sm border border-theme-text/5 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-display text-theme-heading">Gallery Manager</h2>
              <p className="text-xs text-theme-text/60 font-mono mt-1">{images.length} / 25 Photos</p>
            </div>
            <div>
              <motion.label 
                className={`cursor-pointer px-5 py-2 border-2 border-theme-accent text-theme-accent rounded-full text-sm font-medium transition-all inline-block shadow-sm ${images.length >= 25 || !!uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-theme-accent hover:text-white'}`}
                whileHover={images.length >= 25 || !!uploading ? {} : { scale: 1.05, boxShadow: '0 0 15px rgba(255,184,0,0.4)' }}
                whileTap={images.length >= 25 || !!uploading ? {} : { scale: 0.95 }}
              >
                {uploading ? uploading : 'Upload Photos'}
                <input type="file" className="hidden" accept="image/*" onChange={uploadImages} disabled={!!uploading || images.length >= 25} multiple />
              </motion.label>
            </div>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {images.map((img) => (
              <motion.div 
                key={img.id} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-5 bg-theme-bg/50 p-4 rounded-[1.5rem] border border-theme-text/5 hover:border-theme-text/20 transition-all hover:shadow-md"
              >
                <div className="relative group overflow-hidden rounded-xl w-24 h-24 shrink-0">
                  <img src={img.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <input 
                    type="text" 
                    value={img.alt_text || ''} 
                    onChange={async (e) => {
                      const newText = e.target.value;
                      setImages(images.map(i => i.id === img.id ? {...i, alt_text: newText} : i));
                      if (supabase) await supabase.from('gallery').update({ alt_text: newText }).eq('id', img.id);
                    }}
                    className="bg-transparent border-b border-theme-text/20 text-sm text-theme-text focus:outline-none focus:border-theme-accent w-full py-1.5 transition-colors placeholder:text-theme-text/30"
                    placeholder="Describe this image..."
                  />
                  <div className="text-[10px] text-theme-text/40 font-mono mt-2 uppercase tracking-widest">Order: {img.display_order}</div>
                </div>
                <motion.button 
                  onClick={() => deleteImage(img.id, img.image_url)}
                  className="text-red-400 hover:text-red-600 p-3 rounded-full hover:bg-red-500/10 transition-colors shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Delete image"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
            {images.length === 0 && (
              <div className="text-theme-text/50 text-sm text-center py-12 flex flex-col items-center gap-3">
                <Upload size={32} className="text-theme-text/20" />
                <p>No images in gallery.<br/>Upload some photos to get started.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Feedbacks Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 bg-theme-surface p-8 rounded-[2rem] border border-theme-text/5 shadow-sm"
      >
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-theme-text/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-theme-accent/10 rounded-xl text-theme-accent">
              <MessageSquare size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-display font-medium text-theme-heading">Contact Form Submissions</h2>
              <p className="text-xs text-theme-text/60 mt-1">Manage guest feedback and booking inquiries received from the contact form</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-theme-accent/10 text-theme-accent text-xs font-semibold rounded-full font-mono">
            {feedbacks.length} Messages
          </span>
        </div>

        {loadingFeedbacks ? (
          <div className="text-center py-12 text-theme-text/50 text-sm">Loading feedbacks...</div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-16 text-theme-text/40 text-sm flex flex-col items-center gap-3 bg-theme-bg/30 rounded-2xl border border-dashed border-theme-text/10">
            <MessageSquare size={36} className="text-theme-text/20" />
            <p className="font-medium">No messages received yet.</p>
            <p className="text-xs text-theme-text/50 max-w-xs">When users fill out the contact form on your home page, their messages will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <motion.div
                key={fb.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-theme-bg/40 p-6 rounded-2xl border border-theme-text/5 hover:border-theme-text/10 transition-all shadow-sm hover:shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-theme-accent/10 rounded-full flex items-center justify-center text-theme-accent font-bold shrink-0 text-sm">
                        {fb.name ? fb.name.substring(0, 2).toUpperCase() : '??'}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-theme-heading flex items-center gap-1.5">
                          <User size={12} className="text-theme-text/40" />
                          {fb.name || 'Anonymous'}
                        </h4>
                        <a
                          href={`mailto:${fb.email}`}
                          className="text-xs text-theme-accent hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Mail size={10} />
                          {fb.email || 'No email provided'}
                        </a>
                      </div>
                    </div>
                    <span className="text-[10px] text-theme-text/40 font-mono flex items-center gap-1 bg-theme-text/5 px-2 py-1 rounded">
                      <Calendar size={10} />
                      {new Date(fb.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="bg-neutral-950/20 p-4 rounded-xl border border-theme-text/5 min-h-[80px]">
                    <p className="text-xs text-theme-text/80 whitespace-pre-wrap leading-relaxed">
                      {fb.message}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t border-theme-text/5">
                  <motion.button
                    onClick={() => deleteFeedback(fb.id)}
                    className="text-red-400 hover:text-red-500 text-xs font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 size={13} />
                    Delete Message
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
