import React, { useState } from 'react';
import {
  Bed,
  Maximize2,
  Users,
  Wifi,
  Tv,
  Droplets,
  Wind,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { RoomTier } from '../data/hotelData';
import { buildWhatsAppBookingUrl } from '../utils/bookingCalculations';

interface RoomCardProps {
  room: RoomTier;
  onBookDirect: (roomId: string) => void;
  onOpenGallery: (room: RoomTier, index?: number) => void;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onBookDirect,
  onOpenGallery,
  checkInDate = '2026-11-01',
  checkOutDate = '2026-11-02',
  adults = 2,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = room.gallery.length > 0 ? room.gallery.map((g) => g.url) : [room.featuredImage];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsAppUrl = buildWhatsAppBookingUrl({
    roomType: room.name,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    adults: adults,
  });

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Photo Showcase Carousel */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={images[photoIndex]}
          alt={`${room.name} view ${photoIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Direct Rate Saving Badge */}
        <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md border border-[#C5A880]/40 text-xs px-2.5 py-1 rounded-lg text-white font-medium flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Save ₹{room.savingsPerNight} / night direct</span>
        </div>

        {/* View Full Walkthrough Gallery Button */}
        <button
          onClick={() => onOpenGallery(room, photoIndex)}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5"
          title="Open photo walkthrough"
          aria-label={`View full photo gallery for ${room.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="hidden sm:inline font-medium">Gallery ({images.length})</span>
        </button>

        {/* Prev / Next photo buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-opacity opacity-80 hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-opacity opacity-80 hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dimension & Bed Pill Bar inside bottom of photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
              <Maximize2 className="w-3 h-3 text-[#C5A880]" />
              {room.sqft} sq.ft
            </span>
            <span className="flex items-center gap-1 font-medium bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
              <Users className="w-3 h-3 text-[#C5A880]" />
              Up to {room.maxAdults} Guests
            </span>
          </div>

          <div className="flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === photoIndex ? 'bg-[#C5A880] w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Room Title & Tagline */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
              {room.name}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{room.tagline}</p>

          {/* Bed Type & Ideal For */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 border-t border-b border-slate-100 py-2.5">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span className="font-medium text-slate-800">{room.bedType}</span>
            </div>
            <div className="text-[11px] text-slate-500 pl-6">
              Ideal for: {room.idealFor}
            </div>
          </div>

          {/* Amenities Pills */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded">
              <Wifi className="w-3 h-3 text-slate-500" />
              Free Wi-Fi (100Mbps)
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded">
              <Tv className="w-3 h-3 text-slate-500" />
              Smart 4K TV
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded">
              <Droplets className="w-3 h-3 text-slate-500" />
              24/7 Hot Water
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded">
              <Wind className="w-3 h-3 text-slate-500" />
              Inverter AC
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded">
              <Sparkles className="w-3 h-3 text-slate-500" />
              Daily Housekeeping
            </span>
          </div>
        </div>

        {/* Pricing & Dual CTA Section */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          {/* Price Stack */}
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-sans text-slate-900">
                  ₹{room.directPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">/ night</span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{room.otaPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                Best Rate Guarantee · +12% GST
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#937149] bg-[#C5A880]/15 px-2 py-0.5 rounded">
                Direct Perk: Early Check-in
              </span>
            </div>
          </div>

          {/* Dual CTAs: Book Direct & Reserve on WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => onBookDirect(room.id)}
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span>Book Direct @ ₹{room.directPrice.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Reserve on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
