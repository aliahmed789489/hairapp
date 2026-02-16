
export interface Hairstyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  prompt: string;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  message?: string;
}

export interface ImageAsset {
  original: string | null;
  edited: string | null;
}
