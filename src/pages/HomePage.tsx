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
  Clock,
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax Background */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center bg-slate-950 overflow-hidden text-white pt-10 pb-28 sm:pb-36">
        {/* Exterior Luxury Hotel Background with Parallax/Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Rating Pill Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-[#C5A880]/40 text-xs sm:text-sm text-slate-200 mb-4 sm:mb-6 backdrop-blur-md shadow-lg">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-white">5.0 / 5.0 on Google</span>
            <span className="text-slate-500">·</span>
            <span className="text-[#C5A880] font-medium">Opp. Brundavan Theater, Godugupet</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto text-balance">
            Luxury & Comfort In The Heart of{' '}
            <span className="text-[#C5A880] italic">Machilipatnam</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Spotless sanitized rooms, whisper-quiet inverter AC, and 24/7 silent generator power backup. Book direct to eliminate OTA middleman fees.
          </p>

          {/* Core Hook Badge */}
          <div className="mt-5 sm:mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-4 rounded-2xl bg-amber-500/10 border border-[#C5A880]/30 text-xs sm:text-sm text-[#dfc79b]">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <strong className="text-white font-semibold">Best Rate Guarantee:</strong>
            <span>Save ₹300 to ₹790 per night + Free Early Check-in (subject to availability)</span>
          </div>
        </div>

        {/* Floating Direct Booking Engine Container */}
        <div className="mt-8 lg:mt-0 lg:absolute lg:-bottom-12 left-0 right-0 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectBookingBar
            onSearch={(params) => {
              onBookDirect(params.roomId, params.checkIn, params.checkOut);
            }}
          />
        </div>
      </section>

      {/* Spacer to accommodate the overlapping floating booking engine on desktop */}
      <div className="hidden lg:block h-20 bg-slate-50" />

      {/* Social Proof Strip */}
      <section className="bg-slate-100/80 border-b border-slate-200 py-3.5 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-4 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rated 5.0/5 Stars on Google</span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Spotless Sanitized Rooms (Hospital-Grade Hygiene)</span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#937149]" />
            <span>24/7 Silent Generator Power Backup</span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#937149]" />
            <span>Opposite Brundavan Theater, Godugupet</span>
          </div>
        </div>
      </section>

      {/* Room Categories Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#937149] bg-[#C5A880]/15 px-3 py-1 rounded-full">
              Accommodation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              Signature Rooms & Executive Suites
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every room features premium bedding, 43" Smart TV, solar hot water, and complimentary high-speed Wi-Fi.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/rooms')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-[#937149] transition-colors"
          >
            <span>View Full Tariff & Room Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TariffComparisonTable onBookDirect={(id) => onBookDirect(id)} />
      </div>

      {/* Location & Nearby Attractions Section */}
      <LocationMapSection />

      {/* Verified Guest Reviews Slider */}
      <ReviewsSlider />

      {/* Direct Contact & Bulk Wedding Inquiry Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-800/60 border border-slate-700/80 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
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

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
            {/* One-Tap Direct Call Button */}
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#937149]" />
              <span>Call Front Desk: {HOTEL_INFO.phone}</span>
            </a>

            {/* Instant WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20want%20to%20inquire%20about%20a%20corporate/wedding%20bulk%20room%20block.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
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
