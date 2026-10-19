import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
  }>;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % images.length);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  const current = images[currentIndex] || images[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onSelectIndex((currentIndex + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizador de foto: ${current.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 md:p-6"
          onClick={onClose}
        >
          {/* Botão Fechar */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar galeria"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-3 rounded-full bg-stone-900/90 hover:bg-stone-800 active:scale-95 text-stone-200 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-stone-700/60 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Prev button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={handlePrev}
            aria-label="Imagem anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all hover:scale-105 active:scale-95 z-40 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-stone-700/60 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Next button */}
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            onClick={handleNext}
            aria-label="Próxima imagem"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all hover:scale-105 active:scale-95 z-40 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-stone-700/60 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center p-1 sm:p-2"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-stone-950 max-h-[62vh] sm:max-h-[72vh] flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-auto h-auto max-h-[62vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl sm:rounded-2xl select-none"
                />
              </AnimatePresence>
            </div>

            <motion.div
              key={`caption-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-3 sm:mt-4 text-center text-white max-w-xl px-2"
            >
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{current.category}</span>
              </div>
              <h4 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-white leading-tight">
                {current.title}
              </h4>
              <p className="text-[11px] sm:text-xs md:text-sm text-stone-300 mt-1 line-clamp-2 sm:line-clamp-none">
                {current.description}
              </p>
              
              {/* Indicador de fotos em bolinhas / thumbnails */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectIndex(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-amber-400'
                        : 'w-2 bg-stone-600 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
