import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Rooms & Tariffs', path: '/rooms' },
    { label: 'Direct Booking Engine', path: '/book' },
    { label: 'Corporate & Weddings', path: '/corporate' },
    { label: 'Machilipatnam Guide', path: '/guide' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 text-white shadow-md">
      {/* Top Value Banner */}
      <div className="bg-[#1e293b] border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 text-[#C5A880] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              Direct Booking Guarantee:
            </span>
            <span>Save ₹300/night vs MMT · Free Early Check-in · 0% Commission</span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              Opp. Brundavan Theater, Godugupet
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>5.0 / 5.0 Google Rated Stay</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex flex-col text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
          aria-label="SG Grand Hotel Home"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-white group-hover:text-[#C5A880] transition-colors">
              SG GRAND
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880] border border-[#C5A880]/40 px-1.5 py-0.5 rounded">
              HOTEL & SUITES
            </span>
          </div>
          <span className="text-[11px] text-slate-400 tracking-wide flex items-center gap-1">
            <span>Godugupet, Machilipatnam</span>
            <span>·</span>
            <span className="text-amber-400 flex items-center gap-0.5">
              5.0 ★ Google Rating
            </span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={`text-sm tracking-wide transition-colors relative py-1 ${
                currentPath === link.path
                  ? 'text-[#C5A880] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Contact & CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Direct Phone Call Button */}
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all hover:border-slate-500"
            title="Call SG GRAND Front Desk"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{HOTEL_INFO.phone}</span>
          </a>

          {/* Instant WhatsApp Quick Button */}
          <a
            href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20direct%20booking%20tariff.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Book Direct CTA */}
          <button
            onClick={() => handleLinkClick('/book')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-[#C5A880] hover:bg-[#d8bf9b] rounded-lg transition-all shadow-md active:scale-95"
          >
            Book Direct
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="p-2 text-slate-200 bg-slate-800 border border-slate-700 rounded-lg"
            aria-label="Call Hotel"
          >
            <Phone className="w-4 h-4 text-[#C5A880]" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  currentPath === link.path
                    ? 'bg-slate-800 text-[#C5A880] font-medium'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${HOTEL_INFO.rawPhone}?text=Hello%20SG%20Grand,%20I%20want%20to%20reserve%20a%20room.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-emerald-950 bg-emerald-400 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => handleLinkClick('/book')}
              className="py-2.5 px-3 text-xs font-semibold text-slate-950 bg-[#C5A880] rounded-lg text-center"
            >
              Book Direct
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
