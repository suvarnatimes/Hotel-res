import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ROOM_TIERS } from '../data/hotelData';
import { calculateNights } from '../utils/bookingCalculations';

interface DirectBookingBarProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialRoomId?: string;
  initialAdults?: number;
  initialChildren?: number;
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    roomId: string;
    adults: number;
    children: number;
  }) => void;
  className?: string;
}

export const DirectBookingBar: React.FC<DirectBookingBarProps> = ({
  initialCheckIn,
  initialCheckOut,
  initialRoomId = 'deluxe-king',
  initialAdults = 2,
  initialChildren = 0,
  onSearch,
  className = '',
}) => {
  // Helper to format ISO date to YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || tomorrowStr);
  const [roomId, setRoomId] = useState<string>(initialRoomId);
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);

  const nights = calculateNights(checkIn, checkOut);
  const selectedRoom = ROOM_TIERS.find((r) => r.id === roomId) || ROOM_TIERS[0];

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    // Ensure checkOut is at least 1 day after checkIn
    if (newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      roomId,
      adults,
      children,
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 sm:p-6 ${className}`}>
      {/* Top Direct Guarantee Callout */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#C5A880]/15 text-[#937149] rounded-lg">
            <Sparkles className="w-4 h-4 text-[#937149]" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            Best Direct Rate Guarantee
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-emerald-700 font-medium">
            Save ₹300–₹790/night vs OTAs
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1 text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Free Early Check-in (avail.)
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            No Booking Fees
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Check-In Date */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="check-in-input" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            Check-In Date
          </label>
          <input
            id="check-in-input"
            type="date"
            min={todayStr}
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880] transition-all"
            required
          />
        </div>

        {/* Check-Out Date */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="check-out-input" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            Check-Out Date
            <span className="text-[11px] font-normal text-slate-500 ml-auto">({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
          </label>
          <input
            id="check-out-input"
            type="date"
            min={checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880] transition-all"
            required
          />
        </div>

        {/* Room Category */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="room-category-select" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
            Room Category
          </label>
          <select
            id="room-category-select"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880] transition-all"
          >
            {ROOM_TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} (₹{tier.directPrice.toLocaleString('en-IN')}/nt)
              </option>
            ))}
          </select>
        </div>

        {/* Guests (Adults & Children) */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C5A880]" />
            Guests
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              aria-label="Adults count"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-2 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#C5A880]"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
            <select
              aria-label="Children count"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-2 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-[#C5A880]"
            >
              {[0, 1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Child' : 'Kids'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Big CTA Button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full h-[44px] bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm rounded-xl px-4 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] border border-[#C5A880]/30 hover:border-[#C5A880]"
          >
            <span className="text-[#C5A880]">Check Availability</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>
      </form>

      {/* Summary Micro Bar */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600">
        <div>
          Selected: <strong className="text-slate-900">{selectedRoom.name}</strong> ·{' '}
          <span>{nights} {nights === 1 ? 'night' : 'nights'}</span> ·{' '}
          <span className="text-emerald-700 font-semibold">
            Direct Rate: ₹{(selectedRoom.directPrice * nights).toLocaleString('en-IN')}
          </span>{' '}
          <span className="text-slate-400 line-through">
            ₹{(selectedRoom.otaPrice * nights).toLocaleString('en-IN')}
          </span>
        </div>
        <div className="text-emerald-700 font-medium">
          Instant Direct Savings: ₹{(selectedRoom.savingsPerNight * nights).toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};
