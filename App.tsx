
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LinkInput from './components/VideoGenerator';
import VideoCard from './components/VideoCard';
import DownloadSelection from './components/DownloadSelection';
import AdBanner from './components/AdBanner';
import { DownloadedItem, VideoPlatform } from './types';
import { PrivacyPolicy, TermsOfUse, AboutUs, ContactUs, DMCA, AdvertiseWithUs } from './components/InfoPages';
import { IconYoutube, IconTiktok, IconInstagram, IconFacebook, IconDownload, IconUsers, IconCheck, IconHelp, IconSmartphone, IconMegaphone, IconLink, IconGlobe, IconActivity, IconEye, IconServer, IconSparkles } from './components/Icons';
import CommentsSection from './components/CommentsSection';
import { adConfig } from './adConfig';

type PageView = 'home' | 'download' | 'privacy' | 'terms' | 'about' | 'contact' | 'dmca' | 'advertise';

const translations = {
  ar: {
    dir: 'rtl',
    subtitle: 'الأسرع والأقوى',
    home: 'الرئيسية',
    features: 'المميزات',
    installApp: 'تثبيت',
    installDesc: 'لتثبيت التطبيق على الآيفون:\n1. اضغط على زر المشاركة (Share) في الأسفل.\n2. اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).',
    heroTitle: 'احتفظ بما تحب..',
    heroSubtitle: 'بجودة لا تضاهى',
    heroDesc: 'منصة VidSaver تمنحك الحرية الكاملة لتحميل الفيديوهات من يوتيوب، فيسبوك، انستغرام وتيك توك بأعلى دقة وبدون أي تعقيدات.',
    placeholder: 'فضلاً ضع الرابط هنا.. نحن ندعم جميع المنصات ❤️',
    placeholderYoutube: 'فضلاً ضع رابط فيديو يوتيوب هنا..',
    placeholderTiktok: 'فضلاً ضع رابط فيديو تيك توك هنا..',
    placeholderFacebook: 'فضلاً ضع رابط فيديو فيسبوك هنا..',
    placeholderInstagram: 'فضلاً ضع رابط انستغرام (ريلز/بوست) هنا..',
    downloadBtn: 'بدء التحميل',
    supportedHint: 'ندعم بامتياز جميع المنصات العالمية: يوتيوب، فيسبوك، انستغرام، تيك توك',
    historyTitle: 'سجل التحميلات',
    clearAll: 'مسح الكل',
    remove: 'حذف من السجل',
    downloadAction: 'تحميل',
    emptyHistory: 'مكتبتك الخاصة',
    emptyHistoryDesc: 'الروابط التي تقوم بتحميلها ستظهر هنا تلقائياً لسهولة الوصول.',
    whyTitle: 'لماذا يختار الجميع VidSaver؟',
    feat1Title: 'سرعة البرق',
    feat1Desc: 'خوارزميات متطورة لمعالجة وتحميل الروابط في لحظات.',
    feat2Title: 'دقة فائقة 8K',
    feat2Desc: 'استمتع بتفاصيل لا مثيل لها مع دعم كامل لأعلى الجودات.',
    feat3Title: 'سهولة مطلقة',
    feat3Desc: 'واجهة مصممة لراحتك، تعمل بلمسة واحدة على أي جهاز.',
    footerRights: 'جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    contact: 'اتصل بنا',
    about: 'من نحن',
    dmca: 'حقوق الملكية (DMCA)',
    advertise: 'إعلن معنا',
    emailLabel: 'بريدك الإلكتروني',
    messageLabel: 'رسالتك',
    sendBtn: 'إرسال الرسالة',
    contactDesc: 'هل لديك استفسار أو اقتراح؟ املأ النموذج أدناه وسنتواصل معك.',
    orEmail: 'أو راسلنا مباشرة عبر:',
    statUsers: 'مستخدم نشط',
    statDownloads: 'عملية تحميل',
    statRating: 'تقييم المستخدمين',
    statVisits: 'زيارة يومية',
    statCountries: 'دولة مدعومة',
    statServer: 'حالة السيرفر',
    howToTitle: 'كيفية التحميل؟',
    faqTitle: 'الأسئلة الشائعة',
    step1: 'انسخ الرابط',
    step1Desc: 'انسخ رابط الفيديو من التطبيق.',
    step2: 'حدد المنصة',
    step2Desc: 'اختر زر المنصة بالأسفل.',
    step3: 'حمل الفيديو',
    step3Desc: 'الصق الرابط واضغط تحميل.',
  },
  en: {
    dir: 'ltr',
    subtitle: 'FAST & POWERFUL',
    home: 'Home',
    features: 'Features',
    installApp: 'Install',
    installDesc: 'To install on iPhone:\n1. Tap the Share button below.\n2. Select "Add to Home Screen".',
    heroTitle: 'Keep What You Love..',
    heroSubtitle: 'Unmatched Quality',
    heroDesc: 'VidSaver gives you complete freedom to download your favorite videos from YouTube, Facebook, Instagram, and TikTok in the highest resolution, hassle-free.',
    placeholder: 'Please paste your link here.. We support all apps ❤️',
    placeholderYoutube: 'Paste YouTube video link here..',
    placeholderTiktok: 'Paste TikTok video link here..',
    placeholderFacebook: 'Paste Facebook video link here..',
    placeholderInstagram: 'Paste Instagram link (Reels/Post) here..',
    downloadBtn: 'Start Download',
    supportedHint: 'Fully supporting all global platforms: YouTube, Facebook, Instagram, TikTok',
    historyTitle: 'Download History',
    clearAll: 'Clear All',
    remove: 'Remove from history',
    downloadAction: 'Download',
    emptyHistory: 'Your Library',
    emptyHistoryDesc: 'Links you download will appear here automatically for easy access.',
    whyTitle: 'Why Everyone Chooses VidSaver?',
    feat1Title: 'Lightning Speed',
    feat1Desc: 'Advanced algorithms to process and download links in moments.',
    feat2Title: 'Ultra HD 8K',
    feat2Desc: 'Enjoy unparalleled details with full support for highest qualities.',
    feat3Title: 'Absolute Simplicity',
    feat3Desc: 'Interface designed for your comfort, works with one touch on any device.',
    footerRights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    contact: 'Contact Us',
    about: 'About Us',
    dmca: 'DMCA Policy',
    advertise: 'Advertise with Us',
    emailLabel: 'Your Email',
    messageLabel: 'Your Message',
    sendBtn: 'Send Message',
    contactDesc: 'Have a question or suggestion? Fill out the form below and we will get back to you.',
    orEmail: 'Or email us directly at:',
    statUsers: 'Active Users',
    statDownloads: 'Downloads',
    statRating: 'User Rating',
    statVisits: 'Daily Visits',
    statCountries: 'Countries',
    statServer: 'Server Status',
    howToTitle: 'How to Download?',
    faqTitle: 'FAQ',
    step1: 'Copy Link',
    step1Desc: 'Copy video URL from the app.',
    step2: 'Select Platform',
    step2Desc: 'Choose the platform button below.',
    step3: 'Save Video',
    step3Desc: 'Paste link and hit download.',
  }
};

const App: React.FC = () => {
  const [items, setItems] = useState<DownloadedItem[]>([]);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedVideo, setSelectedVideo] = useState<DownloadedItem | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<VideoPlatform | null>(null);
  
  const t = translations[lang];

  // Inject Popunder Ad Globally
  useEffect(() => {
    if (adConfig.popunder && adConfig.popunder.trim() !== "") {
      // Create a temporary container to execute the script
      const div = document.createElement('div');
      div.innerHTML = adConfig.popunder;
      const scripts = div.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        if (scripts[i].src) {
           script.src = scripts[i].src;
           script.async = true;
        } else {
           script.innerHTML = scripts[i].innerHTML;
        }
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleItemProcessed = (item: DownloadedItem) => {
    setItems((prev) => [item, ...prev]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectVideo = (item: DownloadedItem) => {
    setSelectedVideo(item);
    setCurrentPage('download');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedVideo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlatformSelect = (platform: VideoPlatform) => {
    setSelectedPlatform(prev => prev === platform ? null : platform);
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-fuchsia-500/30 flex flex-col transition-all duration-300">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main className="flex-grow w-full">
        
        {currentPage === 'home' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 relative">
            
            {/* Decorative Background Blobs */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* AD BANNER (Top of Page - High Visibility) */}
            <div className="max-w-4xl mx-auto mb-4 relative z-20 animate-fadeInDown">
               <AdBanner slot="home-top" adCode={adConfig.bannerTopBottom} />
            </div>

            {/* Hero Section */}
            <header className="text-center mb-10 animate-fadeIn relative z-10">
              {/* Title - Responsive Layout to prevent clipping */}
              <div className="flex flex-wrap justify-center items-center gap-2 mb-6 py-4 px-2 md:px-4">
                <h1 className="text-3xl md:text-6xl font-['Cairo'] font-black text-white tracking-wide leading-relaxed flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
                  <span className="py-1">{t.heroTitle}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 animate-pulse py-1 pb-2 inline-block">
                    {t.heroSubtitle}
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
                {t.heroDesc}
              </p>

              {/* MOVED STEPS SECTION (How To) - Now Compact & Visible */}
              <div className="max-w-4xl mx-auto mb-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Step 1 */}
                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4 md:block md:text-center hover:bg-slate-800/60 transition-colors relative group">
                       <div className="absolute -top-3 -right-3 bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold border-4 border-[#0f172a] shadow-lg z-10">1</div>
                       <div className="bg-violet-500/20 w-12 h-12 rounded-full flex items-center justify-center font-bold text-violet-400 border border-violet-500/30 mx-auto shrink-0">
                          <IconLink className="h-5 w-5" />
                       </div>
                       <div className="text-left md:text-center">
                          <h3 className="font-bold text-white">{t.step1}</h3>
                          <p className="text-xs text-slate-400">{t.step1Desc}</p>
                       </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4 md:block md:text-center hover:bg-slate-800/60 transition-colors relative group">
                       <div className="absolute -top-3 -right-3 bg-fuchsia-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold border-4 border-[#0f172a] shadow-lg z-10">2</div>
                       <div className="bg-fuchsia-500/20 w-12 h-12 rounded-full flex items-center justify-center font-bold text-fuchsia-400 border border-fuchsia-500/30 mx-auto shrink-0">
                          <IconSmartphone className="h-5 w-5" />
                       </div>
                       <div className="text-left md:text-center">
                          <h3 className="font-bold text-white">{t.step2}</h3>
                          <p className="text-xs text-slate-400">{t.step2Desc}</p>
                       </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4 md:block md:text-center hover:bg-slate-800/60 transition-colors relative group">
                       <div className="absolute -top-3 -right-3 bg-orange-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold border-4 border-[#0f172a] shadow-lg z-10">3</div>
                       <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center font-bold text-orange-400 border border-orange-500/30 mx-auto shrink-0">
                          <IconDownload className="h-5 w-5" />
                       </div>
                       <div className="text-left md:text-center">
                          <h3 className="font-bold text-white">{t.step3}</h3>
                          <p className="text-xs text-slate-400">{t.step3Desc}</p>
                       </div>
                    </div>

                 </div>
              </div>

              {/* Platform Selection Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                
                {/* YouTube Button */}
                <button 
                  onClick={() => handlePlatformSelect(VideoPlatform.YOUTUBE)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg transform active:scale-95
                    ${selectedPlatform === VideoPlatform.YOUTUBE 
                      ? 'bg-red-600 border-red-500 text-white scale-105 shadow-red-600/40 ring-2 ring-red-500/50' 
                      : 'bg-slate-800/40 border-white/10 text-slate-400 hover:bg-red-600/10 hover:border-red-500/50 hover:text-red-500'
                    }`}
                >
                  <IconYoutube className={`h-6 w-6 ${selectedPlatform === VideoPlatform.YOUTUBE ? 'text-white' : 'text-red-500'}`} />
                  <span className="font-bold text-lg">YouTube</span>
                  {selectedPlatform === VideoPlatform.YOUTUBE && <IconCheck className="h-4 w-4 ml-1 animate-fadeIn" />}
                </button>

                {/* Facebook Button */}
                <button 
                  onClick={() => handlePlatformSelect(VideoPlatform.FACEBOOK)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg transform active:scale-95
                    ${selectedPlatform === VideoPlatform.FACEBOOK
                      ? 'bg-[#1877F2] border-blue-500 text-white scale-105 shadow-blue-600/40 ring-2 ring-blue-500/50' 
                      : 'bg-slate-800/40 border-white/10 text-slate-400 hover:bg-blue-600/10 hover:border-blue-500/50 hover:text-[#1877F2]'
                    }`}
                >
                  <IconFacebook className={`h-6 w-6 ${selectedPlatform === VideoPlatform.FACEBOOK ? 'text-white' : 'text-[#1877F2]'}`} />
                  <span className="font-bold text-lg">Facebook</span>
                  {selectedPlatform === VideoPlatform.FACEBOOK && <IconCheck className="h-4 w-4 ml-1 animate-fadeIn" />}
                </button>

                {/* Instagram Button */}
                <button 
                  onClick={() => handlePlatformSelect(VideoPlatform.INSTAGRAM)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg transform active:scale-95
                    ${selectedPlatform === VideoPlatform.INSTAGRAM
                      ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] border-pink-500 text-white scale-105 shadow-pink-600/40 ring-2 ring-pink-500/50' 
                      : 'bg-slate-800/40 border-white/10 text-slate-400 hover:bg-pink-600/10 hover:border-pink-500/50 hover:text-pink-500'
                    }`}
                >
                  <IconInstagram className={`h-6 w-6 ${selectedPlatform === VideoPlatform.INSTAGRAM ? 'text-white' : 'text-pink-500'}`} />
                  <span className="font-bold text-lg">Instagram</span>
                  {selectedPlatform === VideoPlatform.INSTAGRAM && <IconCheck className="h-4 w-4 ml-1 animate-fadeIn" />}
                </button>

                {/* TikTok Button */}
                <button 
                  onClick={() => handlePlatformSelect(VideoPlatform.TIKTOK)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg transform active:scale-95
                    ${selectedPlatform === VideoPlatform.TIKTOK
                      ? 'bg-black border-cyan-500 text-white scale-105 shadow-cyan-500/30 ring-2 ring-cyan-500/50' 
                      : 'bg-slate-800/40 border-white/10 text-slate-400 hover:bg-black/40 hover:border-cyan-500/50 hover:text-white'
                    }`}
                >
                  <IconTiktok className={`h-6 w-6 ${selectedPlatform === VideoPlatform.TIKTOK ? 'text-cyan-400' : 'text-slate-300'}`} />
                  <span className="font-bold text-lg">TikTok</span>
                  {selectedPlatform === VideoPlatform.TIKTOK && <IconCheck className="h-4 w-4 ml-1 animate-fadeIn" />}
                </button>

              </div>

              {/* Input Area */}
              <div className="mb-12">
                <LinkInput 
                  onItemProcessed={handleItemProcessed} 
                  t={t} 
                  selectedPlatform={selectedPlatform}
                />
              </div>
            </header>

            {/* Download History Section */}
            <section className="max-w-4xl mx-auto mb-8 animate-fadeIn bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/5 p-6 md:p-8 shadow-2xl shadow-black/20 relative z-20">
                 <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-1.5 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white font-['Cairo']">{t.historyTitle}</h2>
                      {items.length > 0 && (
                        <span className="bg-slate-800 text-fuchsia-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">{items.length}</span>
                      )}
                    </div>
                    {items.length > 0 && (
                      <button 
                        onClick={() => setItems([])}
                        className="text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all"
                      >
                        {t.clearAll}
                      </button>
                    )}
                 </div>

                 {items.length > 0 ? (
                   <div className="grid gap-4">
                     {items.map((item) => (
                       <VideoCard 
                          key={item.id} 
                          item={item} 
                          onRemove={handleRemoveItem}
                          onSelect={handleSelectVideo}
                          t={t}
                       />
                     ))}
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-10 text-slate-500 border-2 border-dashed border-slate-800/60 rounded-2xl bg-slate-900/20">
                      <div className="bg-slate-800/50 p-4 rounded-full mb-3 relative group">
                        <div className="absolute inset-0 bg-fuchsia-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <IconDownload className="h-8 w-8 opacity-40 relative z-10" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-300 mb-1">{t.emptyHistory}</h3>
                      <p className="text-sm opacity-60 font-medium">{t.emptyHistoryDesc}</p>
                   </div>
                 )}
            </section>

            {/* AD - STATS - AD (Sandwich) */}
            <div className="max-w-6xl mx-auto my-12 space-y-8">
               {/* Ad 1 */}
               <div className="max-w-4xl mx-auto">
                 <AdBanner slot="separator-ad-1" adCode={adConfig.bannerSquare} />
               </div>

               {/* Expanded Live Stats Separator - 6 Items */}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto py-8 border-y border-slate-800/50 bg-slate-900/20 rounded-3xl">
                  
                  {/* 1. Active Users */}
                  <div className="text-center px-2 border-r border-slate-800/50 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-white mb-1 flex items-center gap-1">
                        2M+
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconUsers className="h-3 w-3" /> {t.statUsers}
                    </div>
                  </div>

                  {/* 2. Downloads */}
                  <div className="text-center px-2 border-r border-slate-800/50 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-white mb-1">15M+</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconDownload className="h-3 w-3" /> {t.statDownloads}
                    </div>
                  </div>

                  {/* 3. Rating */}
                  <div className="text-center px-2 border-r border-slate-800/50 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-white mb-1 text-yellow-500">4.9</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconSparkles className="h-3 w-3 text-yellow-500" /> {t.statRating}
                    </div>
                  </div>

                  {/* 4. Daily Visits (New) */}
                  <div className="text-center px-2 border-r border-slate-800/50 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-fuchsia-400 mb-1">500K</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconEye className="h-3 w-3" /> {t.statVisits}
                    </div>
                  </div>

                  {/* 5. Countries (New) */}
                  <div className="text-center px-2 border-r border-slate-800/50 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-violet-400 mb-1">180+</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconGlobe className="h-3 w-3" /> {t.statCountries}
                    </div>
                  </div>

                  {/* 6. Server Status (New) */}
                  <div className="text-center px-2 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-green-400 mb-1">99.9%</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <IconServer className="h-3 w-3" /> {t.statServer}
                    </div>
                  </div>

               </div>

               {/* Ad 2 */}
               <div className="max-w-4xl mx-auto">
                 <AdBanner slot="separator-ad-2" adCode={adConfig.bannerSquare} />
               </div>
            </div>

            {/* Content Area: FAQ (SEO Rich Snippets) - HowTo Moved Up */}
            <div className="space-y-20 relative z-10">
              
              {/* FAQ Section */}
              <section className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                 <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 font-['Cairo'] flex items-center justify-center gap-2">
                   <IconHelp className="h-8 w-8 text-fuchsia-500" /> {t.faqTitle}
                 </h2>
                 <div className="space-y-4 text-slate-300">
                    <details className="group bg-slate-800/30 rounded-xl">
                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                          <span>{lang === 'ar' ? 'كيف أحمل فيديو تيك توك بدون علامة مائية؟' : 'How to download TikTok without watermark?'}</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                       </summary>
                       <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                          {lang === 'ar' ? 'انسخ الرابط من تيك توك، الصقه في VidSaver، ثم اختر خيار "بدون علامة مائية" من القائمة التي ستظهر لك.' : 'Copy link from TikTok, paste in VidSaver, and select "No Watermark" option from the generated list.'}
                       </div>
                    </details>
                    <details className="group bg-slate-800/30 rounded-xl">
                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                          <span>{lang === 'ar' ? 'هل VidSaver مجاني؟' : 'Is VidSaver free?'}</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                       </summary>
                       <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                          {lang === 'ar' ? 'نعم، الموقع مجاني 100% ولا يتطلب تسجيل حساب.' : 'Yes, it is 100% free and no registration required.'}
                       </div>
                    </details>
                    <details className="group bg-slate-800/30 rounded-xl">
                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                          <span>{lang === 'ar' ? 'هل يمكنني التحميل على الآيفون؟' : 'Can I download on iPhone?'}</span>
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                       </summary>
                       <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                          {lang === 'ar' ? 'بالتأكيد! موقعنا يعمل بكفاءة على جميع الأجهزة: آيفون (iOS)، أندرويد، ويندوز وماك.' : 'Absolutely! Our site works perfectly on all devices: iOS, Android, Windows, and Mac.'}
                       </div>
                    </details>
                 </div>
              </section>

              {/* Features Grid */}
              <section id="features" className="border-t border-white/5 pt-10">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-['Cairo']">{t.whyTitle}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  
                  <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5 hover:border-violet-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="bg-violet-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{t.feat1Title}</h3>
                    <p className="text-slate-400 leading-relaxed">{t.feat1Desc}</p>
                  </div>

                  <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5 hover:border-fuchsia-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="bg-fuchsia-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{t.feat2Title}</h3>
                    <p className="text-slate-400 leading-relaxed">{t.feat2Desc}</p>
                  </div>

                  <div className="bg-slate-800/30 p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="bg-orange-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{t.feat3Title}</h3>
                    <p className="text-slate-400 leading-relaxed">{t.feat3Desc}</p>
                  </div>

                </div>
              </section>

              {/* SEO CONTENT BLOCKS (Articles) - KEYWORD RICH */}
              <section className="max-w-4xl mx-auto pt-10 space-y-12 text-slate-400 leading-relaxed border-t border-white/5">
                  <article>
                    <h2 className="text-2xl font-bold text-white mb-4 font-['Cairo']">
                      {lang === 'ar' ? 'كيفية تحميل فيديو تيك توك بدون علامة مائية 2025' : 'How to Download TikTok Video Without Watermark 2025'}
                    </h2>
                    <p>
                      {lang === 'ar' 
                        ? 'يعتبر موقع VidSaver الأداة الأفضل لتحميل مقاطع تيك توك بدون الحقوق. الكثير من المستخدمين يبحثون عن طريقة لحفظ الفيديوهات بجودة HD لعرضها على منصات أخرى مثل يوتيوب شورتس أو ريلز انستغرام. بفضل تقنيتنا المتطورة، يمكنك بضغطة زر واحدة الحصول على الفيديو بصيغة MP4 نقية تماماً.' 
                        : 'VidSaver is the best tool to download TikTok videos without watermark. Many users are looking for a way to save videos in HD quality to repost on YouTube Shorts or Instagram Reels. With our advanced technology, you can get the clean MP4 video in one click.'}
                    </p>
                  </article>
                  <article>
                    <h2 className="text-2xl font-bold text-white mb-4 font-['Cairo']">
                      {lang === 'ar' ? 'تحويل فيديو يوتيوب إلى MP3 (صوت عالي الجودة)' : 'Convert YouTube Video to MP3 (High Quality Audio)'}
                    </h2>
                    <p>
                      {lang === 'ar' 
                        ? 'هل تريد استخراج الموسيقى من فيديو يوتيوب؟ يوفر لك VidSaver محول يوتيوب إلى MP3 سريع ومجاني. لا داعي لتثبيت برامج معقدة على الكمبيوتر أو تطبيقات على الموبايل. فقط انسخ الرابط، اختر "Audio Server"، وسيبدأ التحميل فوراً بأعلى جودة صوتية (320kbps) لتستمتع بها بدون إنترنت.' 
                        : 'Want to extract music from a YouTube video? VidSaver provides a fast and free YouTube to MP3 converter. No need to install complex software or apps. Just copy the link, select "Audio Server", and start downloading immediately in high audio quality (320kbps) for offline listening.'}
                    </p>
                  </article>
                  <article>
                    <h2 className="text-2xl font-bold text-white mb-4 font-['Cairo']">
                      {lang === 'ar' ? 'تنزيل ريلز انستغرام وفيسبوك بجودة 4K' : 'Download Instagram Reels & Facebook Videos in 4K'}
                    </h2>
                    <p>
                      {lang === 'ar' 
                        ? 'يدعم VidSaver تحميل الفيديوهات من جميع منصات ميتا (Facebook, Instagram). سواء كنت تريد حفظ "ستوري" قبل اختفائها، أو "ريلز" أعجبك، فإن أداتنا تضمن لك الحصول على النسخة الأصلية من الملف بدون أي ضغط أو تقليل في الجودة. نحن ندعم تحميل مقاطع الفيديو الطويلة والقصيرة (Stories, Reels, IGTV).' 
                        : 'VidSaver supports downloading videos from all Meta platforms (Facebook, Instagram). Whether you want to save a "Story" before it disappears, or a "Reel" you liked, our tool ensures you get the original file version without any compression. We support downloading long and short videos (Stories, Reels, IGTV).'}
                    </p>
                  </article>
              </section>
              
              {/* Comments System */}
              <div className="pb-10">
                <CommentsSection />
              </div>

              {/* AD BANNER (Before Footer) */}
              <div className="max-w-4xl mx-auto">
                 <AdBanner slot="home-footer" adCode={adConfig.bannerTopBottom} />
              </div>

            </div>
          </div>
        ) : (
          // Info Pages & Download Page Rendering
          <>
            {currentPage === 'download' && selectedVideo && (
              <DownloadSelection 
                item={selectedVideo} 
                lang={lang} 
                onBack={goHome} 
                t={t} 
              />
            )}
            {currentPage === 'privacy' && <PrivacyPolicy lang={lang} onBack={goHome} />}
            {currentPage === 'terms' && <TermsOfUse lang={lang} onBack={goHome} />}
            {currentPage === 'about' && <AboutUs lang={lang} onBack={goHome} />}
            {currentPage === 'contact' && <ContactUs lang={lang} onBack={goHome} t={t} />}
            {currentPage === 'dmca' && <DMCA lang={lang} onBack={goHome} />}
            {currentPage === 'advertise' && <AdvertiseWithUs lang={lang} onBack={goHome} t={t} />}
          </>
        )}
      </main>

      <footer className="border-t border-white/5 bg-slate-900 py-10 mt-auto">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 p-1.5 rounded-lg">
                 <IconDownload className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VidSaver</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400 mb-8">
              <button onClick={() => { setCurrentPage('privacy'); window.scrollTo(0,0); }} className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer">{t.privacy}</button>
              <button onClick={() => { setCurrentPage('terms'); window.scrollTo(0,0); }} className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer">{t.terms}</button>
              <button onClick={() => { setCurrentPage('dmca'); window.scrollTo(0,0); }} className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer">{t.dmca}</button>
              <button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }} className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer">{t.about}</button>
              <button onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }} className="hover:text-fuchsia-400 transition-colors bg-transparent border-none cursor-pointer">{t.contact}</button>
            </div>

            <div className="mb-6">
               <button 
                 onClick={() => { setCurrentPage('advertise'); window.scrollTo(0,0); }}
                 className="inline-flex items-center gap-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 px-4 py-2 rounded-full text-xs font-bold border border-fuchsia-500/20 transition-all"
               >
                 <IconMegaphone className="h-3 w-3" />
                 {t.advertise}
               </button>
            </div>

            <p className="text-slate-600 text-xs">
              VidSaver &copy; 2025. {t.footerRights}
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;
