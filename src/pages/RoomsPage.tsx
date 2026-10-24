import React from 'react';
import {
  Bed,
  Maximize2,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Eye,
  ShieldCheck,
  Zap,
  Wifi,
} from 'lucide-react';
import { ROOM_TIERS, RoomTier } from '../data/hotelData';
import { TariffComparisonTable } from '../components/TariffComparisonTable';
import { buildWhatsAppBookingUrl } from '../utils/bookingCalculations';

interface RoomsPageProps {
  onBookDirect: (roomId: string) => void;
  onOpenGallery: (room: RoomTier, index?: number) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onBookDirect, onOpenGallery }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#937149] bg-[#C5A880]/15 px-3 py-1 rounded-full">
            Transparent Hospitality
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mt-3">
            Rooms & Luxury Suites
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineered with acoustic soundproofing, 24/7 silent generator power backup, and hospital-grade sanitization. Enjoy direct savings of up to ₹790 per night compared to MakeMyTrip and Goibibo.
          </p>
        </div>

        {/* Detailed Room Cards Stack */}
        <div className="space-y-12 mb-16">
          {ROOM_TIERS.map((room, index) => {
            const isReversed = index % 2 === 1;
            const whatsAppUrl = buildWhatsAppBookingUrl({
              roomType: room.name,
              checkIn: '2026-11-01',
              checkOut: '2026-11-02',
              adults: room.maxAdults,
            });

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Photo Gallery Column (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-900 flex flex-col justify-between p-4 sm:p-6">
                    {/* Main Featured Photo */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
                      <img
                        src={room.featuredImage}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span className="font-semibold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                          {room.name} · {room.sqft} sq.ft
                        </span>
                        <button
                          onClick={() => onOpenGallery(room, 0)}
                          className="bg-[#C5A880] text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View All {room.gallery.length} Photos</span>
                        </button>
                      </div>
                    </div>

                    {/* Gallery Thumbnails (Bedroom, Bathroom, Desk, Wardrobe) */}
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {room.gallery.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => onOpenGallery(room, idx)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 hover:border-[#C5A880] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                          aria-label={`View ${item.caption}`}
                        >
                          <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[10px] text-slate-200 py-0.5 px-1 truncate capitalize text-center">
                            {item.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Details & Pricing Column (5 cols) */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-[#937149] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {room.idealFor}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                        {room.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">{room.tagline}</p>
                      <p className="text-xs text-slate-700 leading-relaxed mt-3">
                        {room.description}
                      </p>

                      {/* Room Specs Grid */}
                      <div className="mt-5 grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span><strong>Area:</strong> {room.sqft} sq.ft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span><strong>Bed:</strong> {room.bedType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span><strong>Occupancy:</strong> {room.maxAdults} Adults, {room.maxChildren} Child</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span><strong>Power:</strong> 100% Generator Backup</span>
                        </div>
                      </div>

                      {/* Amenities Checklist */}
                      <div className="mt-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                          In-Room Amenities Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                          {room.amenities.map((amenity, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price Block & Action CTAs */}
                    <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold font-sans text-slate-900">
                              ₹{room.directPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-500">/ night</span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{room.otaPrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                            Direct Booking Savings: ₹{room.savingsPerNight} / night
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-semibold text-slate-600 block">
                            Taxes: 12% GST
                          </span>
                          <span className="text-[11px] text-[#937149] font-medium">
                            Early Check-in Included
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          onClick={() => onBookDirect(room.id)}
                          className="py-3 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          <span>Book Direct @ ₹{room.directPrice.toLocaleString('en-IN')}</span>
                          <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                        </button>

                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl shadow-sm transition-colors text-center flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Reserve on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Tariff & OTA Comparison Section */}
        <TariffComparisonTable onBookDirect={(id) => onBookDirect(id)} />
      </div>
    </div>
  );
};
