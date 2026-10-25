import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BedDouble,
  Users,
  Building,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  QrCode,
  Phone,
  Mail,
  User,
  AlertCircle,
} from 'lucide-react';
import { ROOM_TIERS, HOTEL_INFO, RoomTier } from '../data/hotelData';
import {
  calculateNights,
  calculateBookingPrice,
  buildWhatsAppBookingUrl,
  generateBookingReference,
} from '../utils/bookingCalculations';

interface BookingFlowPageProps {
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export const BookingFlowPage: React.FC<BookingFlowPageProps> = ({
  initialRoomId = 'deluxe-king',
  initialCheckIn,
  initialCheckOut,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [roomId, setRoomId] = useState<string>(initialRoomId);
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || todayStr);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || tomorrowStr);
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [govtIdType, setGovtIdType] = useState<string>('Aadhaar Card');
  const [arrivalTime, setArrivalTime] = useState<string>('12:00 PM - 02:00 PM');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [paymentOption, setPaymentOption] = useState<'online' | 'pay_at_hotel' | 'whatsapp'>('online');
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [showUpiModal, setShowUpiModal] = useState<boolean>(false);

  useEffect(() => {
    if (initialRoomId) setRoomId(initialRoomId);
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
  }, [initialRoomId, initialCheckIn, initialCheckOut]);

  const selectedRoom: RoomTier =
    ROOM_TIERS.find((r) => r.id === roomId) || ROOM_TIERS[0];
  const nights = calculateNights(checkIn, checkOut);
  const price = calculateBookingPrice(
    selectedRoom.directPrice,
    selectedRoom.otaPrice,
    nights,
    roomsCount
  );

  const handleCheckInChange = (newDate: string) => {
    setCheckIn(newDate);
    if (newDate >= checkOut) {
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full legal name.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!email.trim() || !email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToStep2 = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalizeBooking = (option: 'online' | 'pay_at_hotel' | 'whatsapp') => {
    setPaymentOption(option);

    if (option === 'whatsapp') {
      const url = buildWhatsAppBookingUrl({
        roomType: selectedRoom.name,
        checkIn,
        checkOut,
        adults: adults * roomsCount,
        children: children,
        guestName: fullName,
      });
      window.open(url, '_blank');
      return;
    }

    if (option === 'online') {
      setShowUpiModal(true);
      return;
    }

    const ref = generateBookingReference();
    setConfirmedBookingRef(ref);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOnlinePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowUpiModal(false);
      const ref = generateBookingReference();
      setConfirmedBookingRef(ref);
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Step Indicator */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between max-w-xl mx-auto bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
              {[
                { number: 1, label: 'Dates & Room' },
                { number: 2, label: 'Guest Details' },
                { number: 3, label: 'Confirmation' },
              ].map((s) => (
                <div key={s.number} className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                      step >= s.number
                        ? 'bg-[#0F172A] text-[#C5A880] ring-2 ring-[#C5A880]'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step > s.number ? '✓' : s.number}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      step === s.number ? 'text-slate-900 block' : 'text-slate-400 hidden sm:inline'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Select Dates & Room Tier */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Step 1: Choose Dates & Room
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Guaranteed lowest direct rates with free early check-in.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Best Direct Rate
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div>
                  <label htmlFor="step1-checkin" className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-In Date (from 12:00 PM)
                  </label>
                  <input
                    id="step1-checkin"
                    type="date"
                    min={todayStr}
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="step1-checkout" className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-Out Date (till 11:00 AM)
                  </label>
                  <input
                    id="step1-checkout"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Room Category:
                </label>
                {ROOM_TIERS.map((tier) => {
                  const isSelected = tier.id === roomId;
                  return (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setRoomId(tier.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#0F172A] text-white border-[#C5A880] ring-1 ring-[#C5A880] shadow-md'
                          : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={tier.featuredImage}
                          alt={tier.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base">{tier.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-[#C5A880] text-slate-950 font-bold'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {tier.sqft} sq.ft
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {tier.bedType}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
                        <div className="text-sm sm:text-base font-bold font-sans">
                          ₹{tier.directPrice.toLocaleString('en-IN')}
                          <span className="text-[10px] font-normal opacity-80">/nt</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 px-1.5 py-0.5 rounded sm:bg-transparent sm:p-0">
                          Save ₹{tier.savingsPerNight}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                <div>
                  <label htmlFor="step1-rooms" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Rooms
                  </label>
                  <select
                    id="step1-rooms"
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#C5A880]"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="step1-adults" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Adults
                  </label>
                  <select
                    id="step1-adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#C5A880]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adults
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="step1-kids" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Kids
                  </label>
                  <select
                    id="step1-kids"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-xs font-medium focus:ring-2 focus:ring-[#C5A880]"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} Kids
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="w-full min-h-[46px] px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border border-[#C5A880]/40"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] shrink-0" />
                </button>
              </div>
            </div>

            {/* Price Summary Panel */}
            <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
              <h2 className="text-lg font-serif font-bold text-slate-900 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <span>Stay Price Breakdown</span>
                <span className="text-[11px] font-sans text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Zero Fees
                </span>
              </h2>

              <div className="py-3.5 space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Room Tier:</span>
                  <strong className="text-slate-900">{selectedRoom.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Stay Duration:</span>
                  <span>{nights} {nights === 1 ? 'Night' : 'Nights'} ({checkIn} to {checkOut})</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span>Base Tariff ({roomsCount} Room × {nights} Nts):</span>
                  <span className="font-semibold text-slate-900">
                    ₹{price.totalDirectBase.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Applicable GST (12%):</span>
                  <span>₹{price.gstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-2 mt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-300">Total Direct Amount:</span>
                  <span className="text-2xl font-bold font-sans text-[#C5A880]">
                    ₹{price.totalDirectAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>MakeMyTrip / Goibibo Price:</span>
                  <span className="line-through">₹{price.totalOtaAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Direct Savings:
                  </span>
                  <span>₹{price.totalDirectSavings.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Guest Details Form */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Step 2: Guest Information
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hotel registry & check-in details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <form onSubmit={handleProceedToStep3} className="space-y-4">
              <div>
                <label htmlFor="step2-fullname" className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Guest Full Name (as per Govt ID) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <input
                    id="step2-fullname"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="step2-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (for WhatsApp Confirmation) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      id="step2-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="step2-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (for Booking Voucher & GST) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      id="step2-email"
                      type="email"
                      required
                      placeholder="e.g. rajesh@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="step2-govtid" className="block text-xs font-semibold text-slate-700 mb-1">
                    Govt ID Type *
                  </label>
                  <select
                    id="step2-govtid"
                    value={govtIdType}
                    onChange={(e) => setGovtIdType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="step2-arrival" className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Arrival Time *
                  </label>
                  <select
                    id="step2-arrival"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value="10:00 AM - 12:00 PM (Early Check-In Request)">
                      10:00 AM - 12:00 PM (Early Check-In Request)
                    </option>
                    <option value="12:00 PM - 02:00 PM (Standard)">
                      12:00 PM - 02:00 PM (Standard)
                    </option>
                    <option value="02:00 PM - 06:00 PM">02:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 10:00 PM (Evening Train Arrival)">
                      06:00 PM - 10:00 PM (Evening Train Arrival)
                    </option>
                    <option value="Late Night (After 10:00 PM)">
                      Late Night (After 10:00 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="step2-requests" className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Requests / GST Details (Optional)
                </label>
                <textarea
                  id="step2-requests"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Near elevator, GSTIN for corporate invoice"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-[#C5A880] focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border border-[#C5A880]/40 min-h-[46px]"
                >
                  <span>Select Payment & Confirm</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] shrink-0" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Confirmation Options */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Step 3: Select Confirmation Option
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Total Payable: <strong className="text-slate-900 font-sans">₹{price.totalDirectAmount.toLocaleString('en-IN')}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Option A */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-900 text-[#C5A880] rounded-xl shrink-0 mt-0.5">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">
                        Option A: Instant Online Payment
                      </h2>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      GPay, PhonePe, Paytm, BHIM UPI, or Cards. Guarantees your room reservation 100%.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleFinalizeBooking('online')}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Pay ₹{price.totalDirectAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                </button>
              </div>

              {/* Option B */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl shrink-0 mt-0.5 border border-amber-200">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">
                        Option B: Pay at Hotel
                      </h2>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Zero advance payment required today. Pay at check-in. Instant confirmation synced to WhatsApp.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleFinalizeBooking('pay_at_hotel')}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[#C5A880] hover:bg-[#d8bf9b] text-slate-950 font-bold text-xs rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Confirm Pay at Hotel</span>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>

              {/* Option C */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-500 text-white rounded-xl shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-emerald-950">
                        Option C: Book via WhatsApp
                      </h2>
                    </div>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Opens WhatsApp chat with pre-filled check-in details. Talk directly to hotel management.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleFinalizeBooking('whatsapp')}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Voucher */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:m-0 print:border-none">
            <div className="bg-[#0F172A] text-white p-6 sm:p-8 text-center relative">
              <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
                Reservation Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Thank You, {fullName}!
              </h1>
              <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-slate-800 border border-[#C5A880]/50 text-xs font-mono font-bold text-[#C5A880]">
                Booking Ref: {confirmedBookingRef}
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-5 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-[11px] font-bold uppercase text-slate-400">Property</h3>
                  <div className="font-bold text-slate-900 text-sm">SG GRAND Hotel & Suites</div>
                  <p>Godugupet, Opp. Brundavan Theater, Machilipatnam</p>
                  <p>Ph: <strong>+91 94418 65555</strong></p>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold uppercase text-slate-400">Guest</h3>
                  <div className="font-bold text-slate-900 text-sm">{fullName}</div>
                  <p>Phone: {phone}</p>
                  <p>ID: <strong>{govtIdType}</strong></p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Check-In</span>
                  <strong className="text-slate-900 text-xs">{checkIn}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Check-Out</span>
                  <strong className="text-slate-900 text-xs">{checkOut}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Room</span>
                  <strong className="text-slate-900 text-xs">{selectedRoom.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Guests</span>
                  <strong className="text-slate-900 text-xs">{adults} Adults</strong>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 space-y-1.5">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount (Inc 12% GST):</span>
                  <span className="text-emerald-700 font-sans">
                    ₹{price.totalDirectAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Payment Mode:</span>
                  <span className="font-semibold text-slate-800">
                    {paymentOption === 'online' ? 'Paid Online via UPI / Card' : 'Pay at Hotel during Check-in'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 print:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-300 min-h-[44px]"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Voucher</span>
                </button>

                <a
                  href={buildWhatsAppBookingUrl({
                    roomType: selectedRoom.name,
                    checkIn,
                    checkOut,
                    adults: adults * roomsCount,
                    children,
                    guestName: fullName,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Sync with WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* UPI Modal */}
        {showUpiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200">
              <div className="text-center mb-4">
                <div className="w-10 h-10 bg-slate-900 text-[#C5A880] rounded-xl flex items-center justify-center mx-auto mb-2">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Instant Direct Payment
                </h3>
                <p className="text-xs text-slate-500">
                  Pay ₹{price.totalDirectAmount.toLocaleString('en-IN')} to SG GRAND Hotel
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center mb-4 text-center">
                <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-300 shadow-inner flex items-center justify-center mb-2">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=9441865555@upi&pn=SG%20GRAND%20Hotel&am=2688&cu=INR"
                    alt="UPI Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-mono font-bold text-slate-800">
                  UPI ID: 9441865555@upi
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleCompleteOnlinePayment}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow min-h-[44px]"
                >
                  {isProcessingPayment ? (
                    <span>Verifying Transaction...</span>
                  ) : (
                    <>
                      <span>Simulate Successful UPI Payment</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowUpiModal(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
