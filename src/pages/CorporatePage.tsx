import React, { useState } from 'react';
import {
  Building2,
  Users,
  FileCheck,
  Percent,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  Car,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { HOTEL_INFO, ROOM_TIERS } from '../data/hotelData';
import { buildWhatsAppCorporateUrl } from '../utils/bookingCalculations';

export const CorporatePage: React.FC = () => {
  // Bulk Calculator State
  const [roomsCount, setRoomsCount] = useState<number>(8);
  const [nightsCount, setNightsCount] = useState<number>(2);
  const [roomType, setRoomType] = useState<string>('executive-twin');

  // Inquiry Form State
  const [contactName, setContactName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [gstinNumber, setGstinNumber] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [inquiryNotes, setInquiryNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Discount calculation based on rooms count
  let discountPercentage = 0;
  if (roomsCount >= 20) discountPercentage = 20;
  else if (roomsCount >= 10) discountPercentage = 15;
  else if (roomsCount >= 5) discountPercentage = 10;

  const basePricePerNight =
    roomType === 'deluxe-king' ? 2400 : roomType === 'executive-twin' ? 2800 : 4200;
  const standardTotal = basePricePerNight * roomsCount * nightsCount;
  const discountAmount = Math.round(standardTotal * (discountPercentage / 100));
  const discountedTotal = standardTotal - discountAmount;
  const bulkGst = Math.round(discountedTotal * 0.12);
  const finalCorporateTotal = discountedTotal + bulkGst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsAppCorporateUrl = buildWhatsAppCorporateUrl({
    name: contactName || 'Corporate Client',
    companyOrEvent: organization || 'Bulk Booking',
    roomsCount,
    dates: eventDate || 'Upcoming stay',
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A] text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Port Development & Convention Hospitality</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Corporate & Wedding Bulk Bookings
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Directly opposite Brundavan Theater and minutes from all major Bandar convention halls. We cater to port development engineers, government delegations, and grand wedding room blocks with tiered volume discounts and full GST invoice support.
          </p>
        </div>

        {/* 3 Pillars for Corporate / Wedding Planners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#0F172A] text-[#C5A880] rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Port Engineers & Govt Delegates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated Executive Twin rooms with dual workstations, high-speed 100Mbps Wi-Fi, 24/7 generator power backup, and fixed corporate GST invoicing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#937149] font-semibold flex items-center gap-1">
              <span>15 mins to Deep Sea Port Project</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-500/20 text-[#937149] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Wedding Guest Room Blocks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located right opposite Brundavan Theater and near Koneru Center Kalyana Mandapams. Large interconnected Grand Family Suites and dedicated parking for wedding guest convoys.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#937149] font-semibold flex items-center gap-1">
              <span>Ground-level bus & car parking</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-800 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Full GST Invoicing & Credit Terms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% compliant B2B tax invoices with company GSTIN, monthly billing options for long-term project teams, and dedicated relationship manager.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span>Direct hotel contract · No OTA markup</span>
            </div>
          </div>
        </div>

        {/* Interactive Bulk Calculator & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive 5+ Rooms Discount Calculator */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-serif font-bold text-slate-900">
                Bulk Stay Rate Calculator
              </h2>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                5+ Rooms Discount
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Number of Rooms ({roomsCount} Rooms)
                </label>
                <input
                  type="range"
                  min={5}
                  max={25}
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full accent-[#0F172A]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>5 Rooms (10% off)</span>
                  <span>10 Rooms (15% off)</span>
                  <span>20+ Rooms (20% off)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Number of Nights ({nightsCount} Nights)
                </label>
                <input
                  type="range"
                  min={1}
                  max={14}
                  value={nightsCount}
                  onChange={(e) => setNightsCount(Number(e.target.value))}
                  className="w-full accent-[#0F172A]"
                />
              </div>

              <div>
                <label htmlFor="corp-room-type" className="block font-semibold text-slate-700 mb-1">
                  Preferred Room Category
                </label>
                <select
                  id="corp-room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#C5A880]"
                >
                  <option value="deluxe-king">Deluxe King Room (Standard ₹2,400/nt)</option>
                  <option value="executive-twin">Executive Twin Room (Standard ₹2,800/nt)</option>
                  <option value="family-suite">Grand Family Suite (Standard ₹4,200/nt)</option>
                </select>
              </div>

              {/* Live Calculation Result Box */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 mt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Standard Direct Rate:</span>
                  <span className="line-through">₹{standardTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Volume Discount ({discountPercentage}% Off):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST (12%):</span>
                  <span>+₹{bulkGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-semibold text-xs text-slate-200">Total Estimated Tariff:</span>
                  <span className="text-xl font-bold text-[#C5A880]">
                    ₹{finalCorporateTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                <strong>Includes:</strong> Free breakfast options, early check-in coordination, dedicated check-in desk for group arrivals, and complimentary driver dorm facility.
              </div>
            </div>
          </div>

          {/* Right Column: Corporate / Wedding Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <h2 className="text-lg font-serif font-bold text-slate-900 pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
              <span>Send Bulk Booking Inquiry</span>
              <span className="text-xs font-sans text-slate-500 font-normal">
                Quick 15-Minute Response
              </span>
            </h2>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our Corporate & Group Bookings Manager will contact {contactName} at {phoneNumber} shortly with a custom quotation and GST invoice terms.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={whatsAppCorporateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs rounded-xl hover:bg-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="corp-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      id="corp-name"
                      type="text"
                      required
                      placeholder="e.g. Suresh Reddy"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="corp-org" className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Wedding Event Name *
                    </label>
                    <input
                      id="corp-org"
                      type="text"
                      required
                      placeholder="e.g. Navayuga Port Infra / Reddy Wedding"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="corp-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="corp-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9848012345"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="corp-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Corporate / Personal Email *
                    </label>
                    <input
                      id="corp-email"
                      type="email"
                      required
                      placeholder="e.g. suresh@company.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="corp-gstin" className="block text-xs font-semibold text-slate-700 mb-1">
                      Company GSTIN (for B2B Tax Credit)
                    </label>
                    <input
                      id="corp-gstin"
                      type="text"
                      placeholder="e.g. 37AAAAA0000A1Z5"
                      value={gstinNumber}
                      onChange={(e) => setGstinNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="corp-eventdate" className="block text-xs font-semibold text-slate-700 mb-1">
                      Expected Check-In Date *
                    </label>
                    <input
                      id="corp-eventdate"
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="corp-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Requirements (Meal plans, bus parking, early check-in)
                  </label>
                  <textarea
                    id="corp-notes"
                    rows={2}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="e.g. Need 10 rooms for 2 nights for wedding party visiting Brundavan Kalyana Mandapam. Request early check-in for 4 rooms."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 border border-[#C5A880]/30"
                  >
                    Submit Bulk Inquiry
                  </button>

                  <a
                    href={whatsAppCorporateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Inquiry</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
