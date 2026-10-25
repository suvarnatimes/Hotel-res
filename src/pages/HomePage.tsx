import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Phone,
  MessageCircle,
  ArrowRight,
  Zap,
  MapPin,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { HOTEL_INFO, ROOM_TIERS, RoomTier } from '../data/hotelData';
import { DirectBookingBar } from '../components/DirectBookingBar';
import { RoomCard } from '../components/RoomCard';
import { AmenitiesGrid } from '../components/AmenitiesGrid';
import { LocationMapSection } from '../components/LocationMapSection';
import { ReviewsSlider } from '../components/ReviewsSlider';
import { TariffComparisonTable } from '../components/TariffComparisonTable';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onBookDirect: (roomId?: string, checkIn?: string, checkOut?: string) => void;
  onOpenGallery: (room: RoomTier, index?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookDirect,
  onOpenGallery,
}) => {
  return (
    <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-8 pb-12 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
        {/* Hotel Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/75 to-[#0F172A]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Rating Pill Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 border border-[#C5A880]/40 text-xs sm:text-sm text-slate-200 mb-4 backdrop-blur-md shadow-lg">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-white">5.0 / 5.0 on Google</span>
            <span className="text-slate-500">·</span>
            <span className="text-[#C5A880] font-medium truncate">Godugupet, Machilipatnam</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-2xl sm:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] w-full max-w-full lg:max-w-4xl mx-auto text-balance">
            Luxury & Comfort In The Heart of{' '}
            <span className="text-[#C5A880] italic">Machilipatnam</span>
          </h1>

          <p className="mt-3.5 sm:mt-5 text-xs sm:text-lg text-slate-300 font-light w-full max-w-full lg:max-w-2xl mx-auto leading-relaxed">
            Spotless sanitized rooms, whisper-quiet inverter AC, and 24/7 silent generator power backup. Book direct to eliminate OTA middleman fees.
          </p>

          {/* Core Hook Badge */}
          <div className="mt-4 sm:mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-3.5 rounded-2xl bg-amber-500/10 border border-[#C5A880]/30 text-xs sm:text-sm text-[#dfc79b]">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <strong className="text-white font-semibold">Best Rate Guarantee:</strong>
            <span>Save ₹300 to ₹790/night + Free Early Check-in</span>
          </div>
        </div>

        {/* Direct Booking Engine Container */}
        <div className="relative lg:absolute lg:bottom-[-3rem] lg:left-0 lg:right-0 z-30 w-full max-w-6xl mx-auto mt-6 lg:mt-0">
          <DirectBookingBar
            onSearch={(params) => {
              onBookDirect(params.roomId, params.checkIn, params.checkOut);
            }}
          />
        </div>
      </section>

      {/* Spacer on Desktop for overlapping booking bar */}
      <div className="hidden lg:block h-20 bg-slate-50" />

      {/* Social Proof Strip */}
      <section className="bg-slate-100/90 border-b border-slate-200 py-3 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium text-center">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Rated 5.0/5 Stars on Google</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Spotless Sanitized Rooms</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#937149] shrink-0" />
            <span>24/7 Power Backup</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#937149] shrink-0" />
            <span>Opposite Brundavan Theater</span>
          </div>
        </div>
      </section>

      {/* Room Categories Showcase */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#937149] bg-[#C5A880]/15 px-3 py-1 rounded-full">
              Accommodation
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              Signature Rooms & Executive Suites
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every room features premium bedding, 43" Smart TV, solar hot water, and complimentary high-speed Wi-Fi.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/rooms')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-[#937149] transition-colors w-fit"
          >
            <span>View Full Tariff & Room Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ROOM_TIERS.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBookDirect={(id) => onBookDirect(id)}
              onOpenGallery={(r, idx) => onOpenGallery(r, idx)}
            />
          ))}
        </div>
      </section>

      {/* Property Amenities Grid */}
      <AmenitiesGrid />

      {/* Direct vs OTA Tariff Comparison Table */}
      <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TariffComparisonTable onBookDirect={(id) => onBookDirect(id)} />
      </div>

      {/* Location & Nearby Attractions Section */}
      <LocationMapSection />

      {/* Verified Guest Reviews Slider */}
      <ReviewsSlider />

      {/* Direct Contact & Bulk Wedding Inquiry Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-800/60 border border-slate-700/80 p-6 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#C5A880] flex items-center justify-center md:justify-start gap-1.5">
              <Users className="w-4 h-4" />
              Corporate & Wedding Room Blocks
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Visiting for a Wedding or Port Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Located directly opposite Brundavan Theater and minutes from all major Bandar convention halls. We offer special group rates for 5+ rooms, complete GST invoice assistance, and bus/van parking.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
            {/* One-Tap Direct Call Button */}
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="w-full sm:w-auto px-5 py-3 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#937149]" />
              <span>Call Front Desk: {HOTEL_INFO.phone}</span>
            </a>

            {/* Instant WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20want%20to%20inquire%20about%20a%20corporate/wedding%20bulk%20room%20block.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => onNavigate('/corporate')}
              className="text-xs text-[#C5A880] hover:underline text-center pt-1"
            >
              Learn about corporate discounts →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
