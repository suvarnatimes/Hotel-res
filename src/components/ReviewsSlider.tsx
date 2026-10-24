import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { VERIFIED_REVIEWS } from '../data/hotelData';

export const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VERIFIED_REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VERIFIED_REVIEWS.length) % VERIFIED_REVIEWS.length);
  };

  const currentReview = VERIFIED_REVIEWS[currentIndex];

  return (
    <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-white font-bold text-sm ml-2">5.0 / 5.0 Rating on Google</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Loved by Families, Executives & Port Delegates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Read real feedback from verified guests who booked directly with SG GRAND Machilipatnam.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-[#C5A880] hover:text-slate-950 text-white transition-colors border border-slate-700"
              aria-label="Previous guest review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-[#C5A880] hover:text-slate-950 text-white transition-colors border border-slate-700"
              aria-label="Next guest review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Review Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-xl relative">
          <Quote className="w-12 h-12 text-[#C5A880]/20 absolute top-6 right-6 pointer-events-none" />

          <div className="max-w-4xl">
            {/* Stars & Room Info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-[#C5A880] font-semibold">
                Stayed in: {currentReview.roomBooked}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Direct Booking
              </span>
            </div>

            {/* Review Title & Body */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
              "{currentReview.title}"
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentReview.comment}
            </p>

            {/* Author Attribution */}
            <div className="mt-6 pt-5 border-t border-slate-700/70 flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="block text-white text-sm font-semibold">{currentReview.author}</strong>
                <span className="text-xs text-slate-400">{currentReview.roleOrLocation}</span>
              </div>
              <span className="text-xs text-slate-500">{currentReview.stayDate}</span>
            </div>
          </div>
        </div>

        {/* Thumbnails / Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {VERIFIED_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-[#C5A880]' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Jump to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
