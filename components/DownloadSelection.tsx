import React, { useState } from 'react';
import { DownloadedItem, VideoPlatform } from '../types';
import { IconArrowRight, IconArrowLeft, IconVideo, IconHeadphones, IconDownload, IconBan, IconSparkles, IconMusic, IconCheck, IconLink } from './Icons';
import AdBanner from './AdBanner';

interface DownloadSelectionProps {
  item: DownloadedItem;
  lang: 'ar' | 'en';
  onBack: () => void;
  t: any;
}

const DownloadSelection: React.FC<DownloadSelectionProps> = ({ item, lang, onBack, t }) => {
  const [copied, setCopied] = useState(false);

  const handleExternalDownload = async (serviceUrl: string) => {
    // 1. Copy the original URL to clipboard
    try {
        await navigator.clipboard.writeText(item.originalUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    } catch (err) {
        console.error("Failed to copy", err);
    }

    // 2. Redirect to the external service
    window.open(serviceUrl, '_blank');
  };

  const isTikTok = item.platform === VideoPlatform.TIKTOK;

  // Helper for Standard Layout
  const videoOptions = item.options.filter(opt => opt.variant === 'video-standard');
  const audioOptions = item.options.filter(opt => opt.variant === 'audio');

  // Helpers for TikTok Layout
  const tiktokWatermark = item.options.find(opt => opt.variant === 'video-watermark');
  const tiktokNoWatermark = item.options.find(opt => opt.variant === 'video-no-watermark');
  const tiktokAudio = item.options.find(opt => opt.variant === 'audio');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 transition-colors mb-8 font-bold group"
      >
        {lang === 'ar' ? <IconArrowRight className="h-5 w-5 group-hover:-mr-1 transition-all" /> : <IconArrowLeft className="h-5 w-5 group-hover:-ml-1 transition-all" />}
        {lang === 'ar' ? 'العودة للسجل' : 'Back to History'}
      </button>

      <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
        
        {/* Header / Video Preview */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <img 
            src={item.thumbnailUrl} 
            alt={item.title} 
            className="w-full h-full object-cover opacity-60 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end gap-6">
            <img 
              src={item.thumbnailUrl} 
              alt={item.title} 
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl border-2 border-white/20 shadow-xl hidden md:block"
            />
            <div className="mb-2">
               <span className="inline-block bg-fuchsia-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2 shadow-lg shadow-fuchsia-500/30">
                 {item.platform}
               </span>
               <h1 className="text-xl md:text-3xl font-black text-white leading-tight line-clamp-2 drop-shadow-lg" dir="auto">
                 {item.title}
               </h1>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-slate-900/80 backdrop-blur-xl">
          
          {/* Success Toast / Hint */}
          {copied ? (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center gap-2 text-green-400 animate-fadeIn">
                  <IconCheck className="h-5 w-5" />
                  <span className="font-bold">{lang === 'ar' ? 'تم نسخ الرابط! الصقه في الصفحة التالية.' : 'Link Copied! Paste it on the next page.'}</span>
              </div>
          ) : (
              <div className="mb-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center gap-2 text-violet-300 text-sm text-center">
                  <IconLink className="h-4 w-4" />
                  <span>
                      {lang === 'ar' 
                       ? 'عند الضغط على تحميل، سيتم نسخ الرابط تلقائياً وتحويلك لسيرفر التحميل المباشر.' 
                       : 'Clicking download will copy the link and redirect you to the direct download server.'}
                  </span>
              </div>
          )}

          {/* AD BANNER TOP */}
          <AdBanner slot="download-top" />

          {isTikTok ? (
             /* --- TIKTOK SPECIAL 3-SECTION LAYOUT --- */
             <div className="space-y-8">
                
                {/* Section 1: With Watermark (Standard) */}
                {tiktokWatermark && (
                  <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-slate-700/50 p-2 rounded-lg text-slate-400">
                            <IconVideo className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-300">
                            {lang === 'ar' ? 'سيرفر عادي (مع علامة)' : 'Standard Server (Watermark)'}
                        </h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">{tiktokWatermark.quality}</div>
                        <button onClick={() => handleExternalDownload(tiktokWatermark.downloadUrl)} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg font-bold transition-colors text-sm">
                            {lang === 'ar' ? 'تحميل' : 'Download'}
                        </button>
                    </div>
                  </div>
                )}

                {/* Section 2: No Watermark (Premium/Highlighted) */}
                {tiktokNoWatermark && (
                  <div className="relative bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border-2 border-fuchsia-500/50 rounded-2xl p-6 shadow-lg shadow-fuchsia-500/10 overflow-hidden group hover:border-fuchsia-400 transition-all">
                    <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                        {lang === 'ar' ? 'السيرفر السريع' : 'FAST SERVER'}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-fuchsia-500 p-2.5 rounded-lg text-white shadow-lg shadow-fuchsia-500/30">
                            <IconBan className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white flex items-center gap-2">
                                {lang === 'ar' ? 'بدون علامة مائية' : 'No Watermark'}
                                <IconSparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                            </h3>
                            <p className="text-xs text-fuchsia-200 opacity-80">
                                {lang === 'ar' ? 'تحميل مباشر وسريع' : 'Direct Fast Download'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 bg-black/20 p-3 rounded-xl">
                         <div className="text-sm font-mono text-fuchsia-100">HD Quality</div>
                         <button 
                            onClick={() => handleExternalDownload(tiktokNoWatermark.downloadUrl)}
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-fuchsia-500/30 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {lang === 'ar' ? 'تحميل الآن' : 'Download Now'}
                            <IconDownload className="h-5 w-5" />
                        </button>
                    </div>
                  </div>
                )}

                {/* Section 3: Audio (Distinct) */}
                {tiktokAudio && (
                  <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-500/30 rounded-2xl p-5 hover:bg-orange-900/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
                            <IconMusic className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-orange-100">
                            {lang === 'ar' ? 'سيرفر الصوت (MP3)' : 'Audio Server (MP3)'}
                        </h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-orange-200/60">{tiktokAudio.quality}</div>
                        <button onClick={() => handleExternalDownload(tiktokAudio.downloadUrl)} className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-lg font-bold transition-colors text-sm shadow-lg shadow-orange-600/20">
                            {lang === 'ar' ? 'تحميل الصوت' : 'Download MP3'}
                        </button>
                    </div>
                  </div>
                )}

             </div>
          ) : (
             /* --- STANDARD LAYOUT (Youtube/FB/etc) --- */
             <div className="space-y-10">
                 {/* Video Section */}
                 <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                        <div className="bg-violet-500/20 p-2 rounded-lg text-violet-400">
                            <IconVideo className="h-5 w-5" />
                        </div>
                        {lang === 'ar' ? 'سيرفرات الفيديو' : 'Video Servers'}
                    </h3>
                    <div className="grid gap-3">
                        {videoOptions.map((option, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-slate-800/40 border border-slate-700/50 hover:border-violet-500/50 p-4 rounded-2xl transition-all group hover:bg-slate-800/80">
                                <div className="flex items-center gap-4 mb-3 md:mb-0">
                                    <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold text-xs">DL</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg text-slate-200">{option.label}</span>
                                            {option.quality.includes('1080') && <span className="bg-violet-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">HD</span>}
                                        </div>
                                        <div className="text-sm text-slate-500">{option.quality}</div>
                                    </div>
                                </div>
                                <button onClick={() => handleExternalDownload(option.downloadUrl)} className="flex items-center justify-center gap-2 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 hover:border-transparent py-2.5 px-6 rounded-xl font-bold transition-all w-full md:w-auto">
                                    <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                                    <IconDownload className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Audio Section */}
                 {audioOptions.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                            <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400">
                                <IconHeadphones className="h-5 w-5" />
                            </div>
                            {lang === 'ar' ? 'سيرفرات الصوت' : 'Audio Servers'}
                        </h3>
                        <div className="grid gap-3">
                            {audioOptions.map((option, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-orange-500/5 to-transparent border border-orange-500/20 hover:border-orange-500/50 p-4 rounded-2xl transition-all group hover:bg-orange-500/10">
                                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                                        <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">MP3</div>
                                        <div>
                                            <div className="flex items-center gap-2"><span className="font-bold text-lg text-slate-200">{option.label}</span></div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleExternalDownload(option.downloadUrl)} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 py-2.5 px-6 rounded-xl font-bold transition-all w-full md:w-auto">
                                        <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                                        <IconHeadphones className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                 )}
             </div>
          )}
          
          {/* AD BANNER BOTTOM */}
          <AdBanner slot="download-bottom" />

        </div>
      </div>
    </div>
  );
};

export default DownloadSelection;