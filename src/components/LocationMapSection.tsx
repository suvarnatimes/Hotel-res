import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ExternalLink, Train, Umbrella, Landmark, Compass } from 'lucide-react';
import { HOTEL_INFO, NEARBY_ATTRACTIONS, AttractionItem } from '../data/hotelData';

export const LocationMapSection: React.FC = () => {
  const [activeAttraction, setActiveAttraction] = useState<AttractionItem>(NEARBY_ATTRACTIONS[0]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transit':
        return <Train className="w-4 h-4 text-[#C5A880]" />;
      case 'beach':
        return <Umbrella className="w-4 h-4 text-[#C5A880]" />;
      case 'temple':
        return <Landmark className="w-4 h-4 text-[#C5A880]" />;
      default:
        return <Compass className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#937149] bg-[#C5A880]/15 px-3 py-1 rounded-full">
              Prime Central Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              Stay in the Heart of Machilipatnam
            </h2>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{HOTEL_INFO.address}</span>
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Godugupet+Machilipatnam+Opp+Brundavan+Theater"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-[#C5A880] hover:bg-[#d8bf9b] rounded-xl transition-all shadow-sm w-fit"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Dual Layout: Interactive Attractions List & Interactive Map Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Attractions Driving Times */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Click a destination to inspect travel route:
              </h3>
              {NEARBY_ATTRACTIONS.map((item) => {
                const isActive = activeAttraction.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveAttraction(item)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start justify-between gap-3 ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#C5A880] shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${isActive ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {item.name}
                        </div>
                        <p className={`text-[11px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 font-bold text-xs text-[#C5A880]">
                        <Clock className="w-3 h-3" />
                        <span>{item.driveTimeMins} mins</span>
                      </div>
                      <span className={`text-[10px] ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.distanceKm} km away
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Travel Desk Cab Booking Note */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block font-semibold mb-0.5">Need a cab or auto rickshaw?</strong>
              Our 24/7 Front Travel Desk books private AC cabs for Manginapudi Beach, Vijayawada Airport (VGA), and Chilakalapudi temple tours at fixed transparent rates.
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Active Route Card */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            {/* Active Destination Ribbon */}
            <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A880] font-bold">Driving from SG GRAND to:</span>
                <span className="font-semibold text-white">{activeAttraction.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{activeAttraction.driveTimeMins} min drive ({activeAttraction.distanceKm} km)</span>
                <a
                  href={activeAttraction.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A880] hover:underline flex items-center gap-1"
                >
                  Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-100">
              <iframe
                title="SG GRAND Location & Attractions Map Machilipatnam"
                src="https://maps.google.com/maps?q=Godugupet,+Machilipatnam,+Andhra+Pradesh+521001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Hotel Marker Banner */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg max-w-xs text-xs">
                <div className="font-bold text-slate-900 font-serif text-sm">SG GRAND Hotel & Suites</div>
                <p className="text-slate-600 text-[11px] mt-0.5">Opp. Brundavan Theater, Godugupet</p>
                <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Free Covered Parking On-Site
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
