export enum VideoPlatform {
  YOUTUBE = 'YouTube',
  TIKTOK = 'TikTok',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  UNKNOWN = 'Unknown'
}

export type OptionVariant = 'video-watermark' | 'video-no-watermark' | 'audio' | 'video-standard';

export interface DownloadOption {
  label: string;
  size: string;
  quality: string;
  format: string;
  downloadUrl: string;
  variant: OptionVariant;
}

export interface DownloadedItem {
  id: string;
  originalUrl: string;
  title: string;
  thumbnailUrl: string;
  platform: VideoPlatform;
  duration: string;
  options: DownloadOption[];
  createdAt: Date;
}

export interface ProcessState {
  isProcessing: boolean;
  error: string | null;
}