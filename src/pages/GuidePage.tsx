import React, { useState } from 'react';
import {
  Compass,
  Utensils,
  Landmark,
  Umbrella,
  ShoppingBag,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { LOCAL_GUIDE_DATA, HOTEL_INFO, GuidePlace } from '../data/hotelData';

export const GuidePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPlaces =
    activeCategory === 'all'
      ? LOCAL_GUIDE_DATA
      : LOCAL_GUIDE_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Insider Destination Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            The Machilipatnam Experience
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Curated by the local concierge team at SG GRAND. Discover authentic GI-tagged Bandar Laddu, fresh Bay of Bengal seafood, unique black soil beaches, and rich Dutch maritime heritage.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Highlights' },
            { id: 'food', label: 'Bandar Sweets & Seafood' },
            { id: 'beach', label: 'Manginapudi Beach' },
            { id: 'shopping', label: 'Kalamkari Handlooms' },
            { id: 'history', label: 'Port History & Heritage' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F172A] text-[#C5A880] shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPlaces.map((place: GuidePlace) => (
            <article
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={place.imageUrl}
                    alt={place.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C5A880]" />
                    <span>{place.distanceFromHotel}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#937149] bg-[#C5A880]/15 px-2 py-0.5 rounded">
                    {place.subtitle}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mt-2">
                    {place.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {place.description}
                  </p>

                  {/* Local Tip Box */}
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
                    <strong className="block text-amber-900 font-bold mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      SG Grand Local Tip:
                    </strong>
                    <span>{place.localTip}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Distance & Directions */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{place.distanceFromHotel}</span>
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(place.title + ' Machilipatnam')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 hover:text-[#937149] flex items-center gap-1"
                >
                  Map Route <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Front Desk Local Assistance Callout */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white">
              Want a Guided Beach Cab or Temple Tour?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our 24/7 Travel Desk arranges verified AC taxis for half-day temple visits (Chilakalapudi & Dattashram) and sunset drives to Manginapudi Beach at fixed local tariffs.
            </p>
          </div>

          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="px-6 py-3 bg-[#C5A880] hover:bg-[#d8bf9b] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow transition-all active:scale-95 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call Concierge: {HOTEL_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
