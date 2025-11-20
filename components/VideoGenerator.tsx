import React, { useState, useEffect } from 'react';
import { IconLink, IconLoader, IconSearch } from './Icons';
import { DownloadedItem, VideoPlatform } from '../types';
import { processVideoUrl } from '../services/geminiService';

interface LinkInputProps {
  onItemProcessed: (item: DownloadedItem) => void;
  t: any;
  selectedPlatform: VideoPlatform | null;
}

const LinkInput: React.FC<LinkInputProps> = ({ onItemProcessed, t, selectedPlatform }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState(t.placeholder);

  useEffect(() => {
    if (!selectedPlatform) {
      setPlaceholder(t.placeholder);
      return;
    }

    switch (selectedPlatform) {
      case VideoPlatform.YOUTUBE:
        setPlaceholder(t.placeholderYoutube || 'Paste YouTube link...');
        break;
      case VideoPlatform.TIKTOK:
        setPlaceholder(t.placeholderTiktok || 'Paste TikTok link...');
        break;
      case VideoPlatform.FACEBOOK:
        setPlaceholder(t.placeholderFacebook || 'Paste Facebook link...');
        break;
      case VideoPlatform.INSTAGRAM:
        setPlaceholder(t.placeholderInstagram || 'Paste Instagram link...');
        break;
      default:
        setPlaceholder(t.placeholder);
    }
  }, [selectedPlatform, t]);

  const handleProcess = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Pass the manually selected platform to help the service logic
      const result = await processVideoUrl(url, selectedPlatform);
      onItemProcessed(result);
      setUrl(''); // Clear input on success
    } catch (err: any) {
      setError(err.message || "Error processing link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`bg-slate-800/40 border backdrop-blur-xl rounded-3xl p-2 md:p-3 shadow-2xl transition-all relative overflow-hidden
        ${selectedPlatform ? 'border-fuchsia-500/30 shadow-fuchsia-500/10' : 'border-white/10 shadow-black/20'}`}>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 opacity-50"></div>
        
        <form onSubmit={handleProcess} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1 group">
            <div className={`absolute inset-y-0 flex items-center pointer-events-none ${t.dir === 'rtl' ? 'right-0 pr-4' : 'left-0 pl-4'}`}>
              <IconLink className={`h-5 w-5 transition-colors ${selectedPlatform ? 'text-fuchsia-400' : 'text-slate-400'}`} />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
              }}
              placeholder={placeholder}
              className={`w-full h-14 bg-transparent border-none outline-none text-white placeholder-slate-500 text-base md:text-lg rounded-2xl focus:ring-0 ${t.dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className={`h-14 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
              ${loading 
                ? 'bg-slate-700 text-slate-400 w-full md:w-auto cursor-wait' 
                : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-orange-400 text-white shadow-lg shadow-fuchsia-500/25 w-full md:w-auto'
              }`}
          >
            {loading ? (
              <IconLoader className="animate-spin h-6 w-6" />
            ) : (
              <>
                <span>{t.downloadBtn}</span>
                <IconSearch className={`h-5 w-5 ${t.dir === 'rtl' ? 'order-last' : 'order-first'}`} />
              </>
            )}
          </button>
        </form>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-fadeIn flex items-center justify-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <p className="text-center text-slate-500 text-xs md:text-sm mt-6 font-medium">
        {t.supportedHint}
      </p>
    </div>
  );
};

export default LinkInput;