import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Zap,
  ArrowUpDown,
  Car,
  Compass,
  Clock,
  Tv,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PROPERTY_AMENITIES, AmenityItem } from '../data/hotelData';

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-[#C5A880]" />,
  Zap: <Zap className="w-6 h-6 text-[#C5A880]" />,
  ArrowUpDown: <ArrowUpDown className="w-6 h-6 text-[#C5A880]" />,
  Car: <Car className="w-6 h-6 text-[#C5A880]" />,
  Compass: <Compass className="w-6 h-6 text-[#C5A880]" />,
  Clock: <Clock className="w-6 h-6 text-[#C5A880]" />,
  Tv: <Tv className="w-6 h-6 text-[#C5A880]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C5A880]" />,
};

export const AmenitiesGrid: React.FC = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#937149] bg-[#C5A880]/15 px-3 py-1 rounded-full">
            Uncompromised Comfort
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
            Engineered for Modern Travelers & Families
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every convenience at SG GRAND has been tailored specifically for the coastal Andhra climate, wedding groups, and port delegates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROPERTY_AMENITIES.map((amenity) => {
            const isSelected = selectedAmenity?.id === amenity.id;
            return (
              <button
                key={amenity.id}
                onClick={() => setSelectedAmenity(isSelected ? null : amenity)}
                className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#C5A880] shadow-xl scale-[1.02]'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      {iconMap[amenity.iconName]}
                    </div>
                    {amenity.highlight && (
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-[#C5A880] text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Essential
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold mb-1.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {amenity.name}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {amenity.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/20 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-[#C5A880]' : 'text-slate-400'}>
                    {amenity.category}
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                    {isSelected ? 'Active Details' : 'Learn more →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Amenity Expanded Explainer Modal/Card */}
        {selectedAmenity && (
          <div className="mt-6 p-4 sm:p-6 bg-white rounded-2xl border border-[#C5A880]/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0F172A] rounded-xl shrink-0">
                {iconMap[selectedAmenity.iconName]}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedAmenity.name} Guarantee</h4>
                <p className="text-xs text-slate-600 mt-0.5">{selectedAmenity.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAmenity(null)}
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 border border-slate-300 rounded-lg shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
