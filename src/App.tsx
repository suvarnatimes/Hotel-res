/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { CorporatePage } from './pages/CorporatePage';
import { GuidePage } from './pages/GuidePage';
import { RoomTier, ROOM_TIERS } from './data/hotelData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  // Booking state transferred across pages
  const [bookingRoomId, setBookingRoomId] = useState<string>('deluxe-king');
  const [bookingCheckIn, setBookingCheckIn] = useState<string>('');
  const [bookingCheckOut, setBookingCheckOut] = useState<string>('');

  // Lightbox modal state
  const [lightboxRoom, setLightboxRoom] = useState<RoomTier | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartBooking = (roomId?: string, checkIn?: string, checkOut?: string) => {
    if (roomId) setBookingRoomId(roomId);
    if (checkIn) setBookingCheckIn(checkIn);
    if (checkOut) setBookingCheckOut(checkOut);
    navigateTo('/book');
  };

  const handleOpenGallery = (room: RoomTier, index: number = 0) => {
    setLightboxRoom(room);
    setLightboxIndex(index);
  };

  const handleCloseGallery = () => {
    setLightboxRoom(null);
  };

  // Determine active view
  let pageContent: React.ReactNode = null;
  if (currentPath === '/rooms') {
    pageContent = (
      <RoomsPage
        onBookDirect={(id) => handleStartBooking(id)}
        onOpenGallery={handleOpenGallery}
      />
    );
  } else if (currentPath === '/book') {
    pageContent = (
      <BookingFlowPage
        initialRoomId={bookingRoomId}
        initialCheckIn={bookingCheckIn}
        initialCheckOut={bookingCheckOut}
      />
    );
  } else if (currentPath === '/corporate') {
    pageContent = <CorporatePage />;
  } else if (currentPath === '/guide') {
    pageContent = <GuidePage />;
  } else {
    // Default to HomePage
    pageContent = (
      <HomePage
        onNavigate={navigateTo}
        onBookDirect={handleStartBooking}
        onOpenGallery={handleOpenGallery}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-[#C5A880]/30 selection:text-slate-900">
      {/* Top Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content */}
      <main className="flex-1">{pageContent}</main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Sticky Mobile Conversion Bar (Visible on mobile/tablet) */}
      <StickyMobileBar onBookDirect={() => handleStartBooking(bookingRoomId)} />

      {/* High-Resolution Photo Walkthrough Modal */}
      <PhotoLightboxModal
        room={lightboxRoom}
        isOpen={Boolean(lightboxRoom)}
        initialIndex={lightboxIndex}
        onClose={handleCloseGallery}
        onBookDirect={(id) => handleStartBooking(id)}
      />
    </div>
  );
}
