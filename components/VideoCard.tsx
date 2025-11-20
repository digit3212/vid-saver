import React from 'react';
import { DownloadedItem, VideoPlatform } from '../types';
import { IconDownload, IconYoutube, IconTiktok, IconInstagram, IconFacebook, IconVideo, IconX } from './Icons';

interface VideoCardProps {
  item: DownloadedItem;
  onRemove: (id: string) => void;
  onSelect: (item: DownloadedItem) => void;
  t: any;
}

const getPlatformIcon = (platform: VideoPlatform) => {
  switch (platform) {
    case VideoPlatform.YOUTUBE: return <IconYoutube className="h-5 w-5 text-red-500" />;
    case VideoPlatform.TIKTOK: return <IconTiktok className="h-5 w-5 text-pink-500" />;
    case VideoPlatform.FACEBOOK: return <IconFacebook className="h-5 w-5 text-blue-500" />;
    case VideoPlatform.INSTAGRAM: return <IconInstagram className="h-5 w-5 text-purple-500" />;
    default: return <IconVideo className="h-5 w-5 text-slate-400" />;
  }
};

const VideoCard: React.FC<VideoCardProps> = ({ item, onRemove, onSelect, t }) => {
  
  return (
    <div className="group/card relative bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:border-fuchsia-500/30 transition-all duration-300 animate-fadeInUp hover:shadow-fuchsia-900/10 flex flex-col md:flex-row">
      
      {/* Remove Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        className={`absolute top-2 z-20 bg-slate-900/90 hover:bg-red-500 text-slate-400 hover:text-white p-1.5 rounded-full backdrop-blur-md transition-all duration-200 opacity-0 group-hover/card:opacity-100 transform hover:scale-110 border border-slate-700 hover:border-red-500 ${t.dir === 'rtl' ? 'left-2' : 'right-2'}`}
        title={t.remove}
      >
        <IconX className="h-4 w-4" />
      </button>

      {/* Thumbnail */}
      <div className="md:w-56 relative group cursor-pointer overflow-hidden shrink-0 aspect-video md:aspect-auto">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          {item.duration}
        </div>
        <div className="absolute top-2 left-2 bg-slate-900/90 p-1.5 rounded-full border border-white/10">
          {getPlatformIcon(item.platform)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight mb-2" dir="auto">
            {item.title}
          </h3>
          <a href={item.originalUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-fuchsia-400 truncate block max-w-[300px] transition-colors">
            {item.originalUrl}
          </a>
        </div>

        <button
          onClick={() => onSelect(item)}
          className="w-full md:w-fit self-end flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 active:scale-95 transition-all"
        >
          <IconDownload className="h-5 w-5" />
          <span>{t.downloadAction}</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;