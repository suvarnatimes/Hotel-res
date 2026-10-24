/**
 * Pure calculation and utility functions for SG GRAND Booking Engine
 */

export interface PriceBreakdown {
  nights: number;
  roomsCount: number;
  baseRatePerNight: number;
  otaRatePerNight: number;
  totalDirectBase: number;
  totalOtaBase: number;
  gstRate: number; // e.g., 0.12 for 12%
  gstAmount: number;
  totalDirectAmount: number;
  totalOtaAmount: number;
  totalDirectSavings: number;
}

/**
 * Calculates number of nights between two YYYY-MM-DD date strings.
 * Defaults to 1 night if check-out is equal to or before check-in.
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = outDate.getTime() - inDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Calculates full price breakdown including GST and OTA savings
 */
export function calculateBookingPrice(
  baseRatePerNight: number,
  otaRatePerNight: number,
  nights: number,
  roomsCount: number = 1
): PriceBreakdown {
  const safeNights = Math.max(1, nights);
  const safeRooms = Math.max(1, roomsCount);

  const totalDirectBase = baseRatePerNight * safeNights * safeRooms;
  const totalOtaBase = otaRatePerNight * safeNights * safeRooms;
  
  // Standard Indian GST for rooms under ₹7,500/night is 12%
  const gstRate = 0.12;
  const gstAmount = Math.round(totalDirectBase * gstRate);
  const totalDirectAmount = totalDirectBase + gstAmount;

  // OTA tax is also 12% on the higher OTA rate
  const otaGstAmount = Math.round(totalOtaBase * gstRate);
  const totalOtaAmount = totalOtaBase + otaGstAmount;

  const totalDirectSavings = totalOtaAmount - totalDirectAmount;

  return {
    nights: safeNights,
    roomsCount: safeRooms,
    baseRatePerNight,
    otaRatePerNight,
    totalDirectBase,
    totalOtaBase,
    gstRate,
    gstAmount,
    totalDirectAmount,
    totalOtaAmount,
    totalDirectSavings,
  };
}

/**
 * Builds the official WhatsApp concierge URL with pre-filled check-in, check-out, room choice, and guest count
 */
export function buildWhatsAppBookingUrl(params: {
  phone?: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  guestName?: string;
}): string {
  const phone = params.phone || '919441865555';
  const totalGuests = params.adults + (params.children || 0);
  
  const text = `Hello SG Grand, I want to reserve a ${params.roomType} from ${params.checkIn} to ${params.checkOut} for ${totalGuests} Guests${params.guestName ? ` (Name: ${params.guestName})` : ''}. Please confirm availability and direct discount rate.`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a WhatsApp URL for Corporate / Wedding inquiry
 */
export function buildWhatsAppCorporateUrl(params: {
  name: string;
  companyOrEvent: string;
  roomsCount: number;
  dates: string;
  phone?: string;
}): string {
  const phone = params.phone || '919441865555';
  const text = `Hello SG Grand, I would like to inquire about a bulk booking for ${params.roomsCount} rooms for ${params.companyOrEvent} (Dates: ${params.dates}). Contact: ${params.name}. Please share corporate tariff with GST invoice support.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an authentic Booking Reference ID
 */
export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `SGG-${year}-${randomNum}`;
}

/**
 * Formats a currency number in INR (e.g. ₹2,400)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
