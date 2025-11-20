import React, { useEffect } from 'react';
import { IconMegaphone } from './Icons';

const CommentsSection: React.FC = () => {
  useEffect(() => {
    // Disqus Configuration
    // @ts-ignore
    window.disqus_config = function () {
      this.page.url = window.location.href; 
      this.page.identifier = 'vidsaver-app-main'; 
    };

    // Load Disqus Script
    const script = document.createElement('script');
    script.src = 'https://vidsaver-demo.disqus.com/embed.js'; // Using a demo shortname for functionality
    script.setAttribute('data-timestamp', (+new Date()).toString());
    (document.head || document.body).appendChild(script);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <section className="max-w-4xl mx-auto mt-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <div className="bg-fuchsia-500/10 p-2 rounded-lg text-fuchsia-400">
           <IconMegaphone className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-white font-['Cairo']">
          تعليقات المستخدمين
        </h2>
      </div>
      <div className="bg-slate-100 rounded-xl p-4 min-h-[300px]">
        <div id="disqus_thread"></div>
        <noscript>
          Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
      <p className="text-center text-slate-500 text-xs mt-4">
        We value your feedback to improve VidSaver.
      </p>
    </section>
  );
};

export default CommentsSection;