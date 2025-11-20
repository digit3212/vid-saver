import { DownloadedItem, VideoPlatform, DownloadOption } from "../types";

// وظيفة محاكاة لتجهيز البيانات وتوجيه المستخدم لأفضل الخدمات العالمية
// يعمل الموقع كوسيط ذكي (Smart Aggregator)

const determinePlatform = (url: string): VideoPlatform => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be')) return VideoPlatform.YOUTUBE;
  if (lowerUrl.includes('tiktok')) return VideoPlatform.TIKTOK;
  if (lowerUrl.includes('instagram')) return VideoPlatform.INSTAGRAM;
  if (lowerUrl.includes('facebook') || lowerUrl.includes('fb.watch') || lowerUrl.includes('fb.com')) return VideoPlatform.FACEBOOK;
  return VideoPlatform.UNKNOWN;
};

// --- Metadata Extraction Helpers ---

// Generic OEmbed Fetcher
const fetchOEmbedData = async (url: string) => {
  try {
    // Using noembed as a proxy
    const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (data && !data.error) {
      return {
        title: data.title,
        thumbnail: data.thumbnail_url || data.thumbnail_url_with_play_button,
        author: data.author_name
      };
    }
  } catch (e) {
    // Ignore
  }
  return null;
};

// YouTube: Extract ID and Fetch Real Metadata
const getYouTubeInfo = async (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[7].length === 11) ? match[7] : null;
  
  let title = "YouTube Video";
  let thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop";

  if (id) {
    thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; // High Quality Thumb
    const oembed = await fetchOEmbedData(url);
    if (oembed && oembed.title) {
      title = oembed.title;
    } else {
      title = `YouTube Video | ID: ${id}`;
    }
  }
  return { id, title, thumbnail };
};

// TikTok: Advanced Parsing
const getTikTokInfo = async (url: string) => {
  const oembed = await fetchOEmbedData(url);
  if (oembed && oembed.title) {
     return {
        id: Date.now().toString(),
        title: oembed.title,
        thumbnail: oembed.thumbnail || "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop"
     };
  }

  let title = "TikTok Video";
  let id = Date.now().toString();
  
  const userMatch = url.match(/@([a-zA-Z0-9_.-]+)/);
  const idMatch = url.match(/\/video\/(\d+)/);
  
  if (userMatch && idMatch) {
      title = `TikTok by ${userMatch[0]} | Video #${idMatch[1].substring(0, 6)}`;
      id = idMatch[1];
  } else if (url.includes('vm.tiktok') || url.includes('vt.tiktok')) {
      title = "TikTok Mobile Link (Ready)";
  }

  const thumbnail = "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop"; 
  
  return { id, title, thumbnail };
};

// Instagram: Advanced Parsing (Fixed for alphanumeric IDs)
const getInstagramInfo = async (url: string) => {
  const cleanUrl = url.split('?')[0];
  
  // Updated Regex to capture alphanumeric IDs correctly
  // Supports: /p/ID, /reel/ID, /stories/user/ID
  const regex = /(?:instagram\.com\/)(?:([a-zA-Z0-9_.]+)\/)?(p|reel|reels|tv|stories|share)\/([a-zA-Z0-9_-]+)/;
  const match = cleanUrl.match(regex);
  
  const id = match ? match[3] : Date.now().toString().substring(0, 10);
  const user = match && match[1] ? `@${match[1]}` : '';
  let type = match ? match[2] : 'Post';

  // Normalize types
  if (type === 'reel' || type === 'reels') type = 'Reel';
  if (type === 'tv') type = 'IGTV';
  if (type === 'p') type = 'Post';
  if (type === 'stories') type = 'Story';

  let title = `Instagram ${type}`;
  if (user) title += ` by ${user}`;
  if (id) title += ` | ID: ${id.substring(0, 8)}`;
  
  const thumbnail = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop";
  
  return { id, title, thumbnail };
};

// Facebook: Advanced Parsing (Fixed for alphanumeric IDs like share/v/xyz)
const getFacebookInfo = async (url: string) => {
  // Try OEmbed First
  const oembed = await fetchOEmbedData(url);
  if (oembed && oembed.title) {
    return {
        id: Date.now().toString(),
        title: oembed.title,
        thumbnail: oembed.thumbnail || "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?q=80&w=600&auto=format&fit=crop"
    };
  }

  let id = null;
  let type = 'Video';
  let pageName = '';

  // Attempt to extract Page Name
  const pageMatch = url.match(/facebook\.com\/([a-zA-Z0-9.]+)\//);
  if (pageMatch && !['watch', 'groups', 'share', 'reel', 'story'].includes(pageMatch[1])) {
      pageName = pageMatch[1];
  }

  // FIXED REGEX: Allow alphanumeric characters ([a-zA-Z0-9._-]+) instead of just digits (\d+)
  // Covers: share/v/XYZ, reel/XYZ, videos/XYZ
  const idRegex = /(?:videos\/|watch\?v=|vb\.\d+\/|posts\/|reel\/|share\/v\/|story_fbid=|fbid=)([a-zA-Z0-9._-]+)/;
  const matchId = url.match(idRegex);
  
  // Short URL extraction (fb.watch)
  const shortRegex = /(?:fb\.watch\/)([a-zA-Z0-9_-]+)/;
  
  if (matchId) {
      id = matchId[1];
  } else {
      const matchShort = url.match(shortRegex);
      if (matchShort) {
        id = matchShort[1];
        type = 'Clip';
      }
  }

  // Refine Type based on URL keywords
  if (url.includes('reel')) type = 'Reel';
  if (url.includes('story') || url.includes('stories')) type = 'Story';
  if (url.includes('live')) type = 'Live';
  if (url.includes('share')) type = 'Shared Video';

  let title = `Facebook ${type}`;
  if (pageName) title += ` by ${pageName}`;
  if (id) title += ` | ID: ${id.substring(0, 10)}...`; // Show part of the ID to confirm reading
  if (!id && !pageName) title = "Facebook Content (Ready)";

  const thumbnail = "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?q=80&w=600&auto=format&fit=crop";

  return { id: id || Date.now().toString(), title, thumbnail };
};


// Helper to get the best external service URL
const getServiceUrl = (platform: VideoPlatform, type: 'video' | 'audio'): string => {
    if (type === 'audio') {
        // Specialized Audio Downloaders (MP3 Only)
        switch (platform) {
            case VideoPlatform.YOUTUBE: return 'https://ytmp3.nu/en';
            case VideoPlatform.TIKTOK: return 'https://ssstik.io/download-tiktok-mp3';
            // Updated links as requested by user
            case VideoPlatform.INSTAGRAM: return 'https://notube.net/ar/youtube-app-272'; 
            case VideoPlatform.FACEBOOK: return 'https://notube.net/ar/youtube-app-272';
            default: return 'https://tuberipper.com/';
        }
    } else {
        // Specialized Video Downloaders
        switch (platform) {
            case VideoPlatform.YOUTUBE: return 'https://ssyoutube.com/en';
            case VideoPlatform.TIKTOK: return 'https://snaptik.app';
            case VideoPlatform.INSTAGRAM: return 'https://fastdl.app/en';
            case VideoPlatform.FACEBOOK: return 'https://fdown.net';
            default: return 'https://en.savefrom.net';
        }
    }
};

// Updated signature to accept manualPlatform override
export const processVideoUrl = async (url: string, manualPlatform: VideoPlatform | null = null): Promise<DownloadedItem> => {
  return new Promise(async (resolve, reject) => {
      if (!url.trim() || url.length < 5 || !url.includes('.')) {
        reject(new Error("الرجاء إدخال رابط صحيح"));
        return;
      }

      // Normalize URL
      let processedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        processedUrl = `https://${url}`;
      }

      // Determine platform
      let platform = manualPlatform;
      if (!platform) {
         platform = determinePlatform(processedUrl);
      }
      if (!platform || platform === VideoPlatform.UNKNOWN) {
          platform = determinePlatform(processedUrl);
      }
      
      const videoServiceUrl = getServiceUrl(platform, 'video');
      const audioServiceUrl = getServiceUrl(platform, 'audio');
      
      let title = "Video Download";
      let thumbnail = "";
      let duration = "--:--";

      // Process based on Platform
      try {
        if (platform === VideoPlatform.YOUTUBE) {
            const info = await getYouTubeInfo(processedUrl);
            title = info.title;
            thumbnail = info.thumbnail;
        } else if (platform === VideoPlatform.TIKTOK) {
            const info = await getTikTokInfo(processedUrl);
            title = info.title;
            thumbnail = info.thumbnail;
        } else if (platform === VideoPlatform.INSTAGRAM) {
            const info = await getInstagramInfo(processedUrl);
            title = info.title;
            thumbnail = info.thumbnail;
        } else if (platform === VideoPlatform.FACEBOOK) {
            const info = await getFacebookInfo(processedUrl);
            title = info.title;
            thumbnail = info.thumbnail;
        } else {
            title = "Video Link (Ready)";
            thumbnail = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop";
        }
      } catch (err) {
        console.error("Metadata extraction failed, using fallback", err);
        title = `${platform} Video (Ready)`;
        thumbnail = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop";
      }

      // Prepare Options
      let options: DownloadOption[] = [];

      if (platform === VideoPlatform.YOUTUBE) {
        options = [
            { label: "Server 1 (Fast)", quality: "1080p/4K", size: "Best Quality", format: "mp4", downloadUrl: videoServiceUrl, variant: 'video-standard' },
            { label: "Server 2", quality: "720p", size: "Fast", format: "mp4", downloadUrl: videoServiceUrl, variant: 'video-standard' },
            { label: "Audio Server (MP3)", quality: "High Quality", size: "MP3", format: "mp3", downloadUrl: audioServiceUrl, variant: 'audio' }
        ];
      } else if (platform === VideoPlatform.TIKTOK) {
          options = [
              { 
                  label: "Server Original", 
                  quality: "Watermark", 
                  size: "Fast", 
                  format: "mp4", 
                  downloadUrl: videoServiceUrl,
                  variant: 'video-watermark'
              },
              { 
                  label: "Server Premium", 
                  quality: "No Watermark", 
                  size: "Best Quality", 
                  format: "mp4", 
                  downloadUrl: videoServiceUrl,
                  variant: 'video-no-watermark'
              },
              { 
                  label: "Audio Server", 
                  quality: "MP3", 
                  size: "Audio", 
                  format: "mp3", 
                  downloadUrl: audioServiceUrl,
                  variant: 'audio'
              }
          ];
      } else {
          // Instagram, Facebook, etc.
          options = [
            { label: "Download Server", quality: "HD", size: "Auto", format: "mp4", downloadUrl: videoServiceUrl, variant: 'video-standard' },
            { label: "Audio Server (Only MP3)", quality: "MP3", size: "Audio", format: "mp3", downloadUrl: audioServiceUrl, variant: 'audio' }
          ];
      }

      const result: DownloadedItem = {
        id: Date.now().toString(),
        originalUrl: processedUrl,
        title: title,
        thumbnailUrl: thumbnail, 
        platform: platform,
        duration: duration,
        createdAt: new Date(),
        options: options
      };

      resolve(result);
  });
};