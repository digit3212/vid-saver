
import React, { useState, useEffect } from 'react';
import { IconDownload, IconLanguage, IconSmartphone, IconX, IconArrowRight, IconArrowLeft } from './Icons';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

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
      // Show custom modal instead of alert
      setShowInstallModal(true);
    }
  };

  return (
    <>
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

              {/* PWA Install Button */}
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

      {/* Install Instructions Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 relative shadow-2xl shadow-fuchsia-900/20">
            <button 
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1"
            >
              <IconX className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 mb-4 shadow-lg shadow-fuchsia-500/30">
                 <IconSmartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Cairo'] mb-2">
                {lang === 'ar' ? 'تثبيت التطبيق يدوياً' : 'Install App Manually'}
              </h3>
              <p className="text-slate-400 text-sm">
                {lang === 'ar' 
                  ? 'يبدو أن متصفحك لا يدعم التثبيت التلقائي. اتبع الخطوات التالية:' 
                  : 'Your browser does not support auto-install. Follow these steps:'}
              </p>
            </div>

            <div className="space-y-4">
              {/* iOS Instructions */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                  <span className="text-fuchsia-400"></span> iPhone (Safari)
                </h4>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside marker:text-fuchsia-500">
                  <li>{lang === 'ar' ? 'اضغط على زر "مشاركة" (Share) في أسفل المتصفح.' : 'Tap the "Share" button at the bottom.'}</li>
                  <li>{lang === 'ar' ? 'اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).' : 'Select "Add to Home Screen".'}</li>
                </ol>
              </div>

              {/* Android Instructions */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                  <span className="text-green-400">🤖</span> Android (Chrome)
                </h4>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside marker:text-green-500">
                  <li>{lang === 'ar' ? 'اضغط على الثلاث نقاط (Menu) في زاوية المتصفح.' : 'Tap the three dots (Menu) icon.'}</li>
                  <li>{lang === 'ar' ? 'اختر "تثبيت التطبيق" (Install App) أو "إضافة للشاشة".' : 'Select "Install App" or "Add to Home screen".'}</li>
                </ol>
              </div>
            </div>

            <button 
              onClick={() => setShowInstallModal(false)}
              className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {lang === 'ar' ? 'حسناً، فهمت' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
