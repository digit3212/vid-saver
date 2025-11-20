import React from 'react';
import { IconArrowLeft, IconArrowRight, IconMail, IconShield, IconFileText, IconUsers, IconCopyright, IconMegaphone, IconCheck } from './Icons';
import AdBanner from './AdBanner';

interface PageProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  t?: any;
}

const BackButton = ({ lang, onBack }: { lang: 'ar' | 'en', onBack: () => void }) => (
  <button 
    onClick={onBack}
    className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors mb-6 font-bold group"
  >
    {lang === 'ar' ? <IconArrowRight className="h-4 w-4 group-hover:-mr-1 transition-all" /> : <IconArrowLeft className="h-4 w-4 group-hover:-ml-1 transition-all" />}
    {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
  </button>
);

export const PrivacyPolicy: React.FC<PageProps> = ({ lang, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl text-fuchsia-400">
            <IconShield className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed relative z-10">
          <p>
            {lang === 'ar' 
              ? 'نحن في VidSaver نولي اهتماماً كبيراً لخصوصية زوارنا. هذه الوثيقة تحدد أنواع المعلومات التي قد نجمعها وكيفية استخدامها.'
              : 'At VidSaver, we prioritize the privacy of our visitors. This document outlines the types of information we collect and how it is used.'}
          </p>

          <h3 className="text-xl font-bold text-white mt-8">
            {lang === 'ar' ? 'جمع البيانات' : 'Data Collection'}
          </h3>
          <p>
            {lang === 'ar'
              ? 'نحن لا نقوم بتخزين أي فيديوهات أو ملفات على خوادمنا. جميع عمليات التحميل تتم مباشرة من خوادم المصدر (مثل يوتيوب أو تيك توك) إلى جهازك. نحن لا نحتفظ بسجل للروابط التي تقوم بتحميلها.'
              : 'We do not store any videos or files on our servers. All downloads are processed directly from the source servers (like YouTube or TikTok) to your device. We do not keep logs of the links you download.'}
          </p>
        </div>
        
        <div className="relative z-10 mt-8">
            <AdBanner slot="privacy-bottom" />
        </div>
      </div>
    </div>
  );
};

export const TermsOfUse: React.FC<PageProps> = ({ lang, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl text-orange-400">
            <IconFileText className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}
          </h1>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed relative z-10">
          <p>
            {lang === 'ar' 
              ? 'باستخدامك لموقع VidSaver، فإنك توافق على الالتزام بشروط الاستخدام التالية:'
              : 'By using VidSaver, you agree to comply with the following terms of use:'}
          </p>

          <ul className="list-disc list-inside space-y-3 marker:text-fuchsia-500">
            <li>
              {lang === 'ar'
               ? 'يجب استخدام الخدمة للأغراض الشخصية فقط.'
               : 'The service must be used for personal purposes only.'}
            </li>
             <li>
              {lang === 'ar'
               ? 'أنت المسؤول الوحيد عن أي انتهاك لحقوق الملكية الفكرية.'
               : 'You are solely responsible for any intellectual property rights violations.'}
            </li>
          </ul>
        </div>

        <div className="relative z-10 mt-8">
            <AdBanner slot="terms-bottom" />
        </div>
      </div>
    </div>
  );
};

export const DMCA: React.FC<PageProps> = ({ lang, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl text-red-400">
            <IconCopyright className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {lang === 'ar' ? 'حقوق الملكية (DMCA)' : 'DMCA Policy'}
          </h1>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed relative z-10">
          <p>
            {lang === 'ar'
              ? 'موقع VidSaver يحترم حقوق الملكية الفكرية للآخرين ويطلب من مستخدميه القيام بذلك أيضاً.'
              : 'VidSaver respects the intellectual property rights of others and requests its users to do the same.'}
          </p>
          <p>
            {lang === 'ar'
              ? 'نحن لا نستضيف أي مقاطع فيديو على خوادمنا. جميع الفيديوهات يتم تحميلها مباشرة من خوادم المنصات الأصلية (CDNs).'
              : 'We do not host any videos on our servers. All videos are downloaded directly from the original platform servers (CDNs).'}
          </p>
          <p className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            {lang === 'ar'
              ? 'إذا كنت تعتقد أن عملك المحمي بحقوق الطبع والنشر قد تم نسخه بطريقة تشكل انتهاكاً للحقوق، يرجى إرسال إشعار عبر صفحة "اتصل بنا" أو البريد الإلكتروني.'
              : 'If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please submit a notification via our "Contact Us" page or email.'}
          </p>
        </div>

        <div className="relative z-10 mt-8">
            <AdBanner slot="dmca-bottom" />
        </div>
      </div>
    </div>
  );
};

export const AboutUs: React.FC<PageProps> = ({ lang, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl -mr-32 -mb-32 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl text-purple-400">
            <IconUsers className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {lang === 'ar' ? 'من نحن' : 'About Us'}
          </h1>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed relative z-10">
          <p>
            {lang === 'ar'
              ? 'VidSaver هو أداة مجانية مصممة لمساعدة المستخدمين على تحميل الفيديوهات.'
              : 'VidSaver is a free tool designed to help users download videos.'}
          </p>
          <p className="font-bold text-white">
            {lang === 'ar'
              ? 'نحن فريق من المبدعون نسعى دائماً لتقديم أفضل الحلول التقنية.'
              : 'We are a team of creators always striving to provide the best technical solutions.'}
          </p>
        </div>
        
        <div className="relative z-10 mt-8">
            <AdBanner slot="about-bottom" />
        </div>
      </div>
    </div>
  );
};

export const AdvertiseWithUs: React.FC<PageProps> = ({ lang, onBack, t }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-fuchsia-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-fuchsia-900/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-10 border-b border-slate-700 pb-6 relative z-10">
          <div className="p-4 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-fuchsia-500/30">
            <IconMegaphone className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white mb-1">
              {lang === 'ar' ? 'إعلن معنا' : 'Advertise With Us'}
            </h1>
            <p className="text-slate-400 text-sm">
               {lang === 'ar' ? 'وصل علامتك التجارية لملايين المستخدمين' : 'Reach millions of users with your brand'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
           {/* Stats Section */}
           <div className="space-y-8">
              <h3 className="text-xl font-bold text-white mb-4">
                 {lang === 'ar' ? 'لماذا تعلن في VidSaver؟' : 'Why advertise on VidSaver?'}
              </h3>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-2xl font-black text-fuchsia-400">2M+</div>
                    <div className="text-sm text-slate-300">
                       {lang === 'ar' ? 'زائر شهري نشط' : 'Monthly Active Users'}
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-2xl font-black text-violet-400">15M+</div>
                    <div className="text-sm text-slate-300">
                       {lang === 'ar' ? 'تحميل فيديو شهرياً' : 'Monthly Video Downloads'}
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-2xl font-black text-orange-400">TOP</div>
                    <div className="text-sm text-slate-300">
                       {lang === 'ar' ? 'ترتيب عالي في جوجل' : 'High Google Ranking'}
                    </div>
                 </div>
              </div>

              <div className="text-slate-400 text-sm leading-relaxed mt-6">
                 {lang === 'ar' 
                  ? 'نوفر مساحات إعلانية مميزة (بانرات) في أماكن استراتيجية تضمن أعلى معدل ظهور ونقر، بأسعار تنافسية ومرونة في التعاقد.'
                  : 'We provide premium ad spaces (banners) in strategic locations ensuring high visibility and CTR, with competitive pricing and flexible contracts.'}
              </div>
           </div>

           {/* Contact Form */}
           <div>
             <h3 className="text-xl font-bold text-white mb-6">
                 {lang === 'ar' ? 'ابدأ حملتك الآن' : 'Start Your Campaign'}
             </h3>
             <form 
                action="https://formspree.io/f/mrbjejqj" 
                method="POST"
                className="space-y-4 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50"
              >
                <input type="hidden" name="subject" value="Advertising Inquiry" />
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {lang === 'ar' ? 'البريد الرسمي' : 'Business Email'}
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-fuchsia-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {lang === 'ar' ? 'تفاصيل العرض' : 'Proposal Details'}
                  </label>
                  <textarea 
                    name="message" 
                    rows={4}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-fuchsia-500 outline-none resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-fuchsia-500/20 transition-all"
                >
                  {lang === 'ar' ? 'طلب عرض أسعار' : 'Request Quote'}
                </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export const ContactUs: React.FC<PageProps> = ({ lang, onBack, t }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fadeIn">
      <BackButton lang={lang} onBack={onBack} />
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
          <div className="p-3 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl text-pink-400">
            <IconMail className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
          </h1>
        </div>

        <div className="space-y-8 text-slate-300 relative z-10">
          <form 
            action="https://formspree.io/f/mrbjejqj" 
            method="POST"
            className="space-y-6 bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                {t?.emailLabel || 'Your Email'}
              </label>
              <input 
                type="email" 
                name="email" 
                id="email"
                required
                placeholder="example@email.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-fuchsia-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                {t?.messageLabel || 'Your Message'}
              </label>
              <textarea 
                name="message" 
                id="message"
                rows={5}
                required
                placeholder="..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-fuchsia-500 outline-none resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-fuchsia-500/20"
            >
              {t?.sendBtn || 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};