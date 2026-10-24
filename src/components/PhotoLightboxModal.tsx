import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ShieldCheck } from 'lucide-react';
import { RoomTier } from '../data/hotelData';

interface PhotoLightboxModalProps {
  room: RoomTier | null;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  onBookDirect?: (roomId: string) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  room,
  isOpen,
  initialIndex = 0,
  onClose,
  onBookDirect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen || !room) return null;

  const filteredGallery =
    filterCategory === 'all'
      ? room.gallery
      : room.gallery.filter((img) => img.category === filterCategory);

  const activeImage = filteredGallery[currentIndex] || filteredGallery[0] || {
    url: room.featuredImage,
    caption: room.name,
    category: 'bedroom',
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${room.name} Photo Gallery Walkthrough`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
    >
      <div className="relative w-full max-w-5xl bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0F172A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-white">{room.name}</span>
              <span className="text-xs text-[#C5A880] border border-[#C5A880]/40 px-2 py-0.5 rounded">
                {room.sqft} sq.ft
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">High-Definition Photo Walkthrough</p>
          </div>

          <div className="flex items-center gap-3">
            {onBookDirect && (
              <button
                onClick={() => {
                  onClose();
                  onBookDirect(room.id);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-[#C5A880] hover:bg-[#d8bf9b] rounded-lg transition-colors"
              >
                Book This Room @ ₹{room.directPrice.toLocaleString('en-IN')}/nt
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs overflow-x-auto">
          <span className="text-slate-400 font-medium">Filter View:</span>
          {['all', 'bedroom', 'bathroom', 'desk', 'wardrobe', 'lounge'].map((cat) => {
            const hasCat =
              cat === 'all' || room.gallery.some((img) => img.category === cat);
            if (!hasCat) return null;
            return (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-[#C5A880] text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Main Photo Showcase Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[480px]">
          <img
            src={activeImage.url}
            alt={activeImage.caption || room.name}
            className="max-h-[65vh] w-full object-contain select-none transition-opacity duration-300"
          />

          {/* Navigation Arrows */}
          {filteredGallery.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#C5A880] hover:text-slate-950 text-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#C5A880] hover:text-slate-950 text-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Counter Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm rounded text-xs text-slate-200 border border-slate-700">
            {currentIndex + 1} / {filteredGallery.length}
          </div>
        </div>

        {/* Caption & Specs Footer */}
        <div className="px-5 py-3.5 bg-[#0F172A] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-medium text-white">{activeImage.caption}</span>
            <span className="text-slate-600">·</span>
            <span className="text-[#C5A880] capitalize">{activeImage.category} View</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Real Hotel Photos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
