import React from 'react';
import { 
  Download, 
  Play, 
  Video, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Link,
  Youtube,
  Facebook,
  Instagram,
  Music,
  FileVideo,
  Search,
  X,
  Languages,
  Shield,
  FileText,
  Users,
  Mail,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Copyright,
  Ban,
  Sparkles,
  Megaphone,
  HelpCircle,
  Smartphone,
  Globe,
  Activity,
  Eye,
  Server
} from 'lucide-react';

export const IconDownload = ({ className }: { className?: string }) => <Download className={className} />;
export const IconPlay = ({ className }: { className?: string }) => <Play className={className} />;
export const IconVideo = ({ className }: { className?: string }) => <Video className={className} />;
export const IconLoader = ({ className }: { className?: string }) => <Loader2 className={className} />;
export const IconError = ({ className }: { className?: string }) => <AlertCircle className={className} />;
export const IconCheck = ({ className }: { className?: string }) => <CheckCircle className={className} />;
export const IconLink = ({ className }: { className?: string }) => <Link className={className} />;
export const IconYoutube = ({ className }: { className?: string }) => <Youtube className={className} />;
export const IconFacebook = ({ className }: { className?: string }) => <Facebook className={className} />;
export const IconInstagram = ({ className }: { className?: string }) => <Instagram className={className} />;
export const IconTiktok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
export const IconMusic = ({ className }: { className?: string }) => <Music className={className} />;
export const IconHeadphones = ({ className }: { className?: string }) => <Headphones className={className} />;
export const IconFileVideo = ({ className }: { className?: string }) => <FileVideo className={className} />;
export const IconSearch = ({ className }: { className?: string }) => <Search className={className} />;
export const IconX = ({ className }: { className?: string }) => <X className={className} />;
export const IconLanguage = ({ className }: { className?: string }) => <Languages className={className} />;

// New Icons for Pages and Features
export const IconShield = ({ className }: { className?: string }) => <Shield className={className} />;
export const IconFileText = ({ className }: { className?: string }) => <FileText className={className} />;
export const IconUsers = ({ className }: { className?: string }) => <Users className={className} />;
export const IconMail = ({ className }: { className?: string }) => <Mail className={className} />;
export const IconArrowLeft = ({ className }: { className?: string }) => <ArrowLeft className={className} />;
export const IconArrowRight = ({ className }: { className?: string }) => <ArrowRight className={className} />;
export const IconCopyright = ({ className }: { className?: string }) => <Copyright className={className} />;
export const IconBan = ({ className }: { className?: string }) => <Ban className={className} />;
export const IconSparkles = ({ className }: { className?: string }) => <Sparkles className={className} />;
export const IconMegaphone = ({ className }: { className?: string }) => <Megaphone className={className} />;
export const IconHelp = ({ className }: { className?: string }) => <HelpCircle className={className} />;
export const IconSmartphone = ({ className }: { className?: string }) => <Smartphone className={className} />;

// Stats Icons
export const IconGlobe = ({ className }: { className?: string }) => <Globe className={className} />;
export const IconActivity = ({ className }: { className?: string }) => <Activity className={className} />;
export const IconEye = ({ className }: { className?: string }) => <Eye className={className} />;
export const IconServer = ({ className }: { className?: string }) => <Server className={className} />;