
import { Hairstyle } from './types';

export const HAIRSTYLES: Hairstyle[] = [
  {
    id: 'fade-pompadour',
    name: 'Executive Pompadour',
    description: 'Clean mid-fade with a textured voluminous top.',
    thumbnail: 'https://picsum.photos/seed/hair1/300/300',
    prompt: 'A classic professional pompadour with a clean mid-fade on the sides. The top has natural texture and volume.'
  },
  {
    id: 'buzz-cut',
    name: 'Precision Buzz',
    description: 'Minimalist uniform length with sharp edge-up.',
    thumbnail: 'https://picsum.photos/seed/hair2/300/300',
    prompt: 'A precise, uniform buzz cut with a sharp surgical edge-up and clean tapered neckline.'
  },
  {
    id: 'side-part',
    name: 'Modern Side Part',
    description: 'Sleek professional side part with tapered sides.',
    thumbnail: 'https://picsum.photos/seed/hair3/300/300',
    prompt: 'A sleek, professional side part hairstyle with a subtle hard part and tapered sides.'
  },
  {
    id: 'textured-crop',
    name: 'Urban Textured Crop',
    description: 'Forward-styled fringe with high skin fade.',
    thumbnail: 'https://picsum.photos/seed/hair4/300/300',
    prompt: 'A modern textured French crop with messy forward-styled fringe and a high skin fade.'
  },
  {
    id: 'slick-back',
    name: 'Classic Slick Back',
    description: 'Low-shine traditional slick back with soft taper.',
    thumbnail: 'https://picsum.photos/seed/hair5/300/300',
    prompt: 'A classic traditional slick back hairstyle with natural flow and soft tapered sides.'
  },
  {
    id: 'braids-fade',
    name: 'Braided Top Fade',
    description: 'Intricate braids with a clean drop fade.',
    thumbnail: 'https://picsum.photos/seed/hair6/300/300',
    prompt: 'Clean, professional box braids on top with a sharp drop fade around the ears and back.'
  }
];

export const SYSTEM_INSTRUCTION = `Apply a professional hairstyle to this person. 
Keep the same face, facial features, skin tone, expression, and identity completely unchanged. 
Do not modify the background or the person's clothing. 
Make the hairstyle look realistic, professionally cut, and naturally blended with the head shape. 
Match lighting, shadows, and hair texture to the original photo. 
High detail, photorealistic, premium barbershop quality.`;
