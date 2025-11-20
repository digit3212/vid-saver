import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
  adCode?: string; // Optional: For direct code injection later
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, className = "", adCode }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adCode && bannerRef.current) {
        // Safety mechanism to inject script tags if provided
        bannerRef.current.innerHTML = adCode;
        const scripts = bannerRef.current.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement("script");
            if (scripts[i].src) {
                script.src = scripts[i].src;
            } else {
                script.innerHTML = scripts[i].innerHTML;
            }
            document.body.appendChild(script);
        }
    }
  }, [adCode]);

  // If no real code is provided yet, show the placeholder
  if (!adCode) {
      return (
        <div className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center p-4 my-6 relative overflow-hidden mx-auto max-w-full ${className}`}>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Advertisement / إعلان</span>
          <div className="w-full h-24 md:h-[90px] bg-slate-700/20 rounded-lg flex items-center justify-center text-slate-500 text-xs border border-dashed border-slate-600/30">
            مساحة إعلانية (Place Your Ad Code Here)
          </div>
        </div>
      );
  }

  return (
    <div ref={bannerRef} className={`ad-container my-6 flex justify-center overflow-hidden ${className}`}>
        {/* Real Ad will render here */}
    </div>
  );
};

export default AdBanner;