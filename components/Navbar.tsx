
import React, { useState, useEffect } from 'react';
import { IconDownload, IconLanguage, IconSmartphone } from './Icons';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else {
      // Fallback for iOS or when beforeinstallprompt is not supported
      alert(t.installDesc);
    }
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 shadow-lg shadow-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => scrollToSection('top')}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900 p-2 md:p-2.5 rounded-xl border border-white/10">
                <IconDownload className="h-5 w-5 md:h-6 md:w-6 text-transparent stroke-[3px] stroke-fuchsia-500" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 block">
                VidSaver
              </h1>
              <p className="text-[8px] md:text-[10px] text-slate-400 font-bold tracking-widest uppercase opacity-80 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('top')} 
                className="text-sm font-bold text-slate-400 hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                {t.home}
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-sm font-bold text-slate-400 hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                {t.features}
              </button>
            </div>

            {/* Mobile Features Button - Explicitly added for mobile view */}
            <button 
              onClick={() => scrollToSection('features')} 
              className="md:hidden text-[10px] font-bold text-slate-400 hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              {t.features}
            </button>

            {/* PWA Install Button - Visible on mobile now */}
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg font-bold shadow-lg shadow-fuchsia-500/30 transition-all active:scale-95"
            >
              <IconSmartphone className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-[10px] md:text-xs whitespace-nowrap">{t.installApp}</span>
            </button>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 md:gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg border border-slate-700 transition-all hover:border-fuchsia-500/50"
            >
              <IconLanguage className="h-3.5 w-3.5 md:h-4 md:w-4 text-fuchsia-400" />
              <span className="text-[10px] md:text-xs font-bold uppercase">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
