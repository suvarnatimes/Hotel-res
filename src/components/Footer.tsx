import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#080d1a] text-slate-400 border-t border-slate-800 text-xs pb-20 lg:pb-12">
      {/* Direct Booking Hook Banner */}
      <div className="bg-[#0F172A] border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Direct Booking Zero-Commission Promise</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Save up to ₹790 per night, enjoy complimentary early check-in (subject to availability), and receive immediate personal concierge service straight on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20want%20to%20reserve%20a%20room.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl flex items-center gap-2 transition-colors shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={() => {
                onNavigate('/book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#d8bf9b] text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-colors shadow"
            >
              <span>Instant Direct Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Hotel Brand */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-white tracking-wider">
                SG GRAND
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880] border border-[#C5A880]/40 px-1.5 py-0.5 rounded">
                HOTEL & SUITES
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The highest-rated luxury accommodation in Machilipatnam, Andhra Pradesh. Spotless sanitized rooms, 24/7 silent generator power backup, and dedicated hospitality for families, port engineers, and wedding parties.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>5.0★ Google Verified Business</span>
            </div>
          </div>

          {/* Col 2: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">Hotel Location & Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Godugupet, Opp. Brundavan Theater, Machilipatnam, Andhra Pradesh 521001</span>
              </li>
              <li>
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{HOTEL_INFO.phone} (Front Desk 24/7)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{HOTEL_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Rooms & OTA Tariff Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Online Reservation Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/corporate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Corporate & Wedding Bulk Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('/guide');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Machilipatnam Food & Travel Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wide uppercase text-xs">Stay Policies</h4>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-300">Standard Check-In:</strong> 12:00 PM
              </p>
              <p>
                <strong className="text-slate-300">Standard Check-Out:</strong> 11:00 AM
              </p>
              <p>
                <strong className="text-[#C5A880]">Direct Booking Advantage:</strong> Priority early check-in from 10:00 AM without extra charge (subject to room availability).
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Valid government-issued photo ID (Aadhaar / Passport / Driving License / Voter ID) mandatory for all adult guests.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SG GRAND Hotel & Suites, Machilipatnam. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Direct Booking Engine</span>
            <span>·</span>
            <span>GST Invoice Compliant</span>
            <span>·</span>
            <span>Zero Booking Fees</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
