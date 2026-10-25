import React from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface StickyMobileBarProps {
  onBookDirect: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onBookDirect }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800/80 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-2xl lg:hidden flex items-center justify-between gap-3 max-w-full box-border">
      {/* Hotel Name & Starting Rate */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-serif font-bold text-white text-xs sm:text-sm truncate">SG GRAND</span>
          <span className="text-[10px] text-[#C5A880] font-bold flex items-center gap-0.5 shrink-0">
            <Sparkles className="w-2.5 h-2.5" />
            Direct
          </span>
        </div>
        <div className="flex items-baseline gap-1 text-xs">
          <span className="text-white font-bold text-sm font-sans">₹2,400</span>
          <span className="text-slate-400 text-[10px]">/nt</span>
          <span className="text-slate-500 line-through text-[10px]">₹2,850</span>
        </div>
      </div>

      {/* Conversion Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Instant WhatsApp Button */}
        <a
          href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20want%20to%20reserve%20a%20room%20at%20direct%20discount%20rate.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl font-bold text-xs flex items-center gap-1 shadow active:scale-95"
          aria-label="Book on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Book Direct Button */}
        <button
          onClick={onBookDirect}
          className="px-3.5 py-2.5 bg-[#C5A880] hover:bg-[#d8bf9b] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow active:scale-95 transition-all"
        >
          <span>Book Direct</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
};
