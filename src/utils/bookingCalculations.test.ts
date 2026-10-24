import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  calculateBookingPrice,
  buildWhatsAppBookingUrl,
  generateBookingReference,
  formatINR,
} from './bookingCalculations';

test('calculateNights calculates correct number of days', () => {
  assert.equal(calculateNights('2026-11-01', '2026-11-03'), 2);
  assert.equal(calculateNights('2026-11-01', '2026-11-02'), 1);
  // Same day or reverse defaults to 1 night
  assert.equal(calculateNights('2026-11-01', '2026-11-01'), 1);
  assert.equal(calculateNights('2026-11-05', '2026-11-01'), 1);
});

test('calculateBookingPrice computes base, 12% GST and direct savings accurately', () => {
  // Deluxe King: Direct ₹2,400, MMT ₹2,850 for 2 nights, 1 room
  const result = calculateBookingPrice(2400, 2850, 2, 1);
  
  assert.equal(result.nights, 2);
  assert.equal(result.roomsCount, 1);
  assert.equal(result.totalDirectBase, 4800);
  assert.equal(result.totalOtaBase, 5700);
  
  // 12% GST on ₹4,800 is ₹576
  assert.equal(result.gstAmount, 576);
  assert.equal(result.totalDirectAmount, 5376);
  
  // 12% GST on ₹5,700 is ₹684 -> total OTA ₹6,384
  assert.equal(result.totalOtaAmount, 6384);
  
  // Savings: 6,384 - 5,376 = 1,008
  assert.equal(result.totalDirectSavings, 1008);
});

test('buildWhatsAppBookingUrl produces required format and encoded parameters', () => {
  const url = buildWhatsAppBookingUrl({
    roomType: 'Deluxe AC King',
    checkIn: '2026-11-10',
    checkOut: '2026-11-12',
    adults: 2,
    children: 1,
    guestName: 'Rajesh Sharma',
  });

  assert.match(url, /^https:\/\/wa\.me\/919441865555\?text=/);
  assert.ok(url.includes(encodeURIComponent('Hello SG Grand, I want to reserve a Deluxe AC King')));
  assert.ok(url.includes(encodeURIComponent('2026-11-10 to 2026-11-12')));
  assert.ok(url.includes(encodeURIComponent('for 3 Guests')));
});

test('generateBookingReference produces SGG format', () => {
  const ref = generateBookingReference();
  assert.match(ref, /^SGG-\d{4}-\d{5}$/);
});

test('formatINR formats currency with rupee symbol', () => {
  const formatted = formatINR(2400);
  assert.ok(formatted.includes('2,400') || formatted.includes('2400'));
});
