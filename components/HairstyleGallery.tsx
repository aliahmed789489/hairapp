
import React from 'react';
import { HAIRSTYLES } from '../constants';
import { Hairstyle } from '../types';

interface HairstyleGalleryProps {
  selectedId: string | null;
  onSelect: (style: Hairstyle) => void;
  disabled: boolean;
}

const HairstyleGallery: React.FC<HairstyleGalleryProps> = ({ selectedId, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {HAIRSTYLES.map((style) => (
        <button
          key={style.id}
          disabled={disabled}
          onClick={() => onSelect(style)}
          className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
            selectedId === style.id 
              ? 'ring-2 ring-blue-500 scale-[0.98]' 
              : 'hover:ring-2 hover:ring-white/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <img 
            src={style.thumbnail} 
            alt={style.name}
            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-left">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{style.name}</span>
            <p className="text-[10px] text-gray-300 line-clamp-1">{style.description}</p>
          </div>
          {selectedId === style.id && (
            <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default HairstyleGallery;
