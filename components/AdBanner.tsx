
import React from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
  adCode?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = "", adCode }) => {
  // 1. Validation: If no code, show placeholder
  if (!adCode || adCode.trim() === "" || adCode.includes("ضع كود")) {
      return (
        <div className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center p-4 my-6 mx-auto max-w-full ${className}`}>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Advertisement</span>
          <div className="w-[320px] h-[50px] bg-slate-700/20 rounded-lg flex items-center justify-center text-slate-500 text-xs border border-dashed border-slate-600/30">
            Ad Space
          </div>
        </div>
      );
  }

  // 2. Dimension Detection (Auto-resize iframe based on ad type)
  let width = 320;
  let height = 50; // Default to mobile banner size

  if (adCode.includes("'width' : 728")) {
      width = 728;
      height = 90;
  } else if (adCode.includes("'width' : 300") && adCode.includes("'height' : 250")) {
      width = 300;
      height = 250;
  } else if (adCode.includes("'width' : 320")) {
      width = 320;
      height = 50;
  }

  // 3. Construct Iframe Content (The "Capsule")
  // We add basic styles to ensure the ad is centered and has no margin inside the iframe
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        ${adCode}
      </body>
    </html>
  `;

  return (
    <div className={`flex justify-center items-center my-6 overflow-hidden ${className}`}>
      <iframe
        title="Advertisement"
        srcDoc={iframeContent}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default AdBanner;
