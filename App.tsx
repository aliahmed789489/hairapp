
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import HairstyleGallery from './components/HairstyleGallery';
import { editHairstyle } from './services/geminiService';
import { Hairstyle, ProcessingState, ImageAsset } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageAsset>({ original: null, edited: null });
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({ status: 'idle' });

  const handleImageSelection = useCallback((base64: string) => {
    setImages({ original: base64, edited: null });
  }, []);

  const handleStyleSelection = useCallback((style: Hairstyle) => {
    setSelectedStyle(style);
  }, []);

  const handleProcess = async () => {
    if (!images.original || !selectedStyle) return;

    setProcessing({ status: 'processing', message: 'Analyzing face and applying style...' });
    
    try {
      const result = await editHairstyle(images.original, selectedStyle.prompt);
      setImages(prev => ({ ...prev, edited: result }));
      setProcessing({ status: 'success' });
    } catch (error) {
      console.error('AI Processing Error:', error);
      setProcessing({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Failed to apply hairstyle. Please try again.' 
      });
    }
  };

  const handleReset = () => {
    setImages({ original: null, edited: null });
    setSelectedStyle(null);
    setProcessing({ status: 'idle' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            HAIRFORCE AI
          </h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-semibold">Precision Virtual Barbershop</p>
        </div>
        <div className="flex gap-2">
           {images.original && (
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-tighter"
            >
              Start Over
            </button>
           )}
        </div>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-8">
          <section className="glass p-6 rounded-3xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">1</span>
              Original Portrait
            </h2>
            <ImageUploader 
              onImageSelected={handleImageSelection} 
              currentImage={images.original} 
              disabled={processing.status === 'processing'}
            />
          </section>

          <section className="glass p-6 rounded-3xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
              Choose Hairstyle
            </h2>
            <HairstyleGallery 
              selectedId={selectedStyle?.id || null} 
              onSelect={handleStyleSelection}
              disabled={processing.status === 'processing' || !images.original}
            />
          </section>

          <button
            onClick={handleProcess}
            disabled={!images.original || !selectedStyle || processing.status === 'processing'}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
              ${(!images.original || !selectedStyle || processing.status === 'processing')
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-[0.98]'
              }
            `}
          >
            {processing.status === 'processing' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Apply Style
              </>
            )}
          </button>
        </div>

        {/* Right Column: Preview/Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass rounded-3xl p-4 md:p-8 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Output Preview
              </h2>
              {images.edited && (
                <a 
                  href={images.edited} 
                  download="hairforce-style.png"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold transition-colors"
                >
                  Download Result
                </a>
              )}
            </div>

            <div className="relative flex-grow rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
              {processing.status === 'processing' && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
                  <p className="text-white font-medium animate-pulse">{processing.message}</p>
                </div>
              )}

              {images.edited ? (
                <img src={images.edited} alt="Styled Result" className="w-full h-full object-contain" />
              ) : images.original ? (
                <div className="relative w-full h-full">
                   <img src={images.original} alt="Original" className="w-full h-full object-contain opacity-30 grayscale" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-6">
                        <p className="text-white/60 font-medium text-lg">Select a style and click Apply</p>
                        <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">The AI will transform your hair while keeping everything else perfectly intact.</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="text-center p-12 text-white/20">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xl font-medium">No Image Uploaded</p>
                </div>
              )}

              {processing.status === 'error' && (
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-200 text-sm">{processing.message}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="glass p-4 rounded-2xl">
               <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Preservation</h3>
               <p className="text-sm text-white/80">Face identity and skin tone are locked.</p>
             </div>
             <div className="glass p-4 rounded-2xl">
               <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Physics</h3>
               <p className="text-sm text-white/80">Lighting & shadows matched to your room.</p>
             </div>
             <div className="glass p-4 rounded-2xl">
               <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Quality</h3>
               <p className="text-sm text-white/80">High-fidelity texture and strand detail.</p>
             </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-5xl py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs gap-4">
        <p>© 2024 HairForce AI Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            Powered by Gemini
          </span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
