export interface RoomTier {
  id: string;
  name: string;
  tagline: string;
  sqft: number;
  bedType: string;
  maxAdults: number;
  maxChildren: number;
  directPrice: number;
  otaPrice: number;
  savingsPerNight: number;
  featuredImage: string;
  gallery: {
    url: string;
    caption: string;
    category: 'bedroom' | 'bathroom' | 'desk' | 'wardrobe' | 'lounge';
  }[];
  amenities: string[];
  description: string;
  idealFor: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  highlight?: boolean;
}

export interface AttractionItem {
  id: string;
  name: string;
  category: 'transit' | 'beach' | 'temple' | 'heritage' | 'commercial';
  distanceKm: number;
  driveTimeMins: number;
  description: string;
  directionsUrl: string;
}

export interface GuestReview {
  id: string;
  author: string;
  roleOrLocation: string;
  stayDate: string;
  rating: number;
  title: string;
  comment: string;
  roomBooked: string;
  verifiedDirect: boolean;
}

export interface GuidePlace {
  id: string;
  title: string;
  category: 'food' | 'history' | 'beach' | 'temple' | 'shopping';
  subtitle: string;
  description: string;
  localTip: string;
  distanceFromHotel: string;
  imageUrl: string;
}

export const HOTEL_INFO = {
  name: 'SG GRAND',
  legalName: 'SG Grand Hotel & Suites',
  tagline: "Machilipatnam's Top-Rated Luxury Stay",
  address: 'Godugupet, Opp. Brundavan Theater, Machilipatnam, Andhra Pradesh 521001',
  phone: '+91 94418 65555',
  rawPhone: '919441865555',
  email: 'stay@sggrandhotel.com',
  googleRating: 5.0,
  reviewsCount: 312,
  checkInTime: '12:00 PM',
  checkOutTime: '11:00 AM',
  directBookingPerks: [
    'Best Rate Guarantee (Save ₹300–₹790 per night vs MMT & Goibibo)',
    'Priority Early Check-In from 10:00 AM (Subject to availability)',
    'Zero Middleman Convenience Fees',
    'Instant WhatsApp Concierge Support with Hotel Management',
    'Flexible Date Rescheduling with 24-hr advance notice',
  ],
  coreHook: 'Best Rate Guarantee • Save ₹300 per night when booking direct + Free Early Check-in subject to availability',
  socialProofBanner: 'Rated 5.0/5 Stars on Google | Spotless Sanitized Rooms | 24/7 Power Backup | Opposite Brundavan Theater',
};

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King AC Room',
    tagline: 'Refined comfort for couples and solo business travelers',
    sqft: 280,
    bedType: '1 King-Size Bed (Orthopedic Pocket Spring)',
    maxAdults: 2,
    maxChildren: 1,
    directPrice: 2400,
    otaPrice: 2850,
    savingsPerNight: 450,
    featuredImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
        caption: 'Spacious Deluxe Bedroom with King Bed & Warm Ambient Lighting',
        category: 'bedroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        caption: 'Modern En-Suite Bathroom with 24/7 Pressurized Hot Shower',
        category: 'bathroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85',
        caption: 'Dedicated Executive Work Desk with Universal Power Plugs',
        category: 'desk',
      },
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85',
        caption: 'Built-in Wardrobe, Electronic Safe & Luggage Rack',
        category: 'wardrobe',
      },
    ],
    amenities: [
      'High-Speed Wi-Fi (100 Mbps)',
      '43" Smart Android TV',
      'Whisper-Silent Inverter AC',
      '24/7 Solar Hot Water',
      'Daily Sanitized Housekeeping',
      'Complimentary Mineral Water',
      'Electric Tea/Coffee Kettle',
      'Intercom & Room Service',
    ],
    description:
      'Immaculately maintained and quiet, the Deluxe King Room offers crisp 400TC Egyptian cotton linens, blackout curtains, and sound-dampened double glazing right in the heart of Godugupet.',
    idealFor: 'Couples, solo executives, port consultants & visiting doctors',
  },
  {
    id: 'executive-twin',
    name: 'Executive Twin Room',
    tagline: 'Tailored for corporate colleagues, friends & engineers',
    sqft: 320,
    bedType: '2 Individual Twin Beds (Custom Spring Support)',
    maxAdults: 2,
    maxChildren: 1,
    directPrice: 2800,
    otaPrice: 3350,
    savingsPerNight: 550,
    featuredImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
        caption: 'Two Twin Beds with Individual Sconce Reading Lights',
        category: 'bedroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
        caption: 'Spacious Sparkling Bathroom with Premium Vanity & Toiletries',
        category: 'bathroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
        caption: 'Workstation Setup with Laptop Ports & Ergonomic Seating',
        category: 'desk',
      },
      {
        url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=85',
        caption: 'Full-Height Wardrobe & Suit Hangers',
        category: 'wardrobe',
      },
    ],
    amenities: [
      'Twin Ergonomic Beds',
      'High-Speed Wi-Fi (100 Mbps)',
      '43" Smart 4K TV with OTT',
      'Dual Reading Lights',
      'Executive Desk & Chair',
      '24/7 Silent Power Generator',
      'Complimentary Bottled Water',
      'Express Laundry on Request',
    ],
    description:
      'Designed specifically for project teams, maritime port engineers, and traveling companions. Features dual dedicated work desks, twin beds, and ample charging outlets for high productivity.',
    idealFor: 'Business colleagues, port engineers, defense & govt delegates',
  },
  {
    id: 'family-suite',
    name: 'Grand Family Suite',
    tagline: 'Expansive interconnected suite for families & wedding groups',
    sqft: 480,
    bedType: '1 King Bed + 2 Twin Beds (Connected Living Area)',
    maxAdults: 4,
    maxChildren: 2,
    directPrice: 4200,
    otaPrice: 4990,
    savingsPerNight: 790,
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
        caption: 'Master Suite Area with King Bed & Interconnected Lounge',
        category: 'bedroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
        caption: 'Sitting Lounge with Sofa, Coffee Table & Smart TV',
        category: 'lounge',
      },
      {
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85',
        caption: 'Oversized Family Bathroom with Double Mirrors & Rain Shower',
        category: 'bathroom',
      },
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
        caption: 'Deep Wardrobes with Special Storage for Wedding Attire',
        category: 'wardrobe',
      },
    ],
    amenities: [
      'Accommodates 4–6 Guests',
      '2 Smart TVs (50" + 43")',
      'Dual Inverter ACs',
      'Plush Living Lounge with Sofa',
      'Mini Refrigerator',
      '24/7 Hot Water & Power Backup',
      'Complimentary Tea/Coffee Bar',
      'Express In-Room Dining Service',
    ],
    description:
      'The crown jewel of SG GRAND. A two-zone interconnected suite with generous living space, multiple seating areas, double air-conditioning, and ample luggage space for wedding celebrations.',
    idealFor: 'Families visiting Machilipatnam, wedding entourages & leisure groups',
  },
];

export const PROPERTY_AMENITIES: AmenityItem[] = [
  {
    id: 'room-service',
    name: '24-Hour Room Service',
    category: 'Dining & Comfort',
    description: 'Fresh hot Andhra meals, snacks, and midnight coffee delivered right to your door.',
    iconName: 'UtensilsCrossed',
    highlight: true,
  },
  {
    id: 'power-backup',
    name: 'Silent Generator Power Backup',
    category: 'Infrastructure',
    description: 'Heavy-duty silent Cummins generator guarantees uninterrupted AC & lighting 24/7.',
    iconName: 'Zap',
    highlight: true,
  },
  {
    id: 'elevator',
    name: 'High-Speed Modern Elevator',
    category: 'Accessibility',
    description: 'Smooth multi-floor lift access directly from the covered parking to all guest suites.',
    iconName: 'ArrowUpDown',
    highlight: false,
  },
  {
    id: 'parking',
    name: 'Covered Free Car Parking',
    category: 'Convenience',
    description: 'Dedicated ground-level secured parking with 24/7 CCTV surveillance & driver lounge.',
    iconName: 'Car',
    highlight: true,
  },
  {
    id: 'travel-desk',
    name: 'Travel & Local Cab Desk',
    category: 'Assistance',
    description: 'Direct taxi bookings for Manginapudi Beach, Vijayawada Airport, and coastal sightseeing.',
    iconName: 'Compass',
    highlight: false,
  },
  {
    id: 'express-checkin',
    name: 'Express Check-In & Check-Out',
    category: 'Front Desk',
    description: 'Fast digital ID verification so you reach your room within 60 seconds of arrival.',
    iconName: 'Clock',
    highlight: true,
  },
  {
    id: 'smart-tv',
    name: '43" & 50" Smart 4K TVs',
    category: 'Entertainment',
    description: 'Crisp displays pre-equipped with YouTube, OTT streaming apps, and satellite channels.',
    iconName: 'Tv',
    highlight: false,
  },
  {
    id: 'sanitization',
    name: 'Hospital-Grade Sanitization',
    category: 'Hygiene',
    description: 'Freshly laundered 400TC linens, UV-sanitized keys, and spotless modern washrooms.',
    iconName: 'ShieldCheck',
    highlight: true,
  },
];

export const NEARBY_ATTRACTIONS: AttractionItem[] = [
  {
    id: 'railway-station',
    name: 'Machilipatnam Railway Station (MTM)',
    category: 'transit',
    distanceKm: 2.5,
    driveTimeMins: 7,
    description: 'Main rail junction with daily express trains to Vijayawada, Hyderabad, Visakhapatnam, and Bangalore.',
    directionsUrl: 'https://maps.google.com/?q=Machilipatnam+Railway+Station',
  },
  {
    id: 'koneru-center',
    name: 'Koneru Center & Main Market',
    category: 'commercial',
    distanceKm: 1.1,
    driveTimeMins: 3,
    description: 'The vibrant heart of Machilipatnam. Famous for authentic Bandar Laddu shops, gold jewelers, and Kalamkari textile boutiques.',
    directionsUrl: 'https://maps.google.com/?q=Koneru+Center+Machilipatnam',
  },
  {
    id: 'manginapudi-beach',
    name: 'Manginapudi Black Soil Beach',
    category: 'beach',
    distanceKm: 11.0,
    driveTimeMins: 18,
    description: 'Unique coast featuring natural black soil sand and calm waters. Ideal for evening sunset strolls and fresh coastal sea breezes.',
    directionsUrl: 'https://maps.google.com/?q=Manginapudi+Beach+Machilipatnam',
  },
  {
    id: 'chilakalapudi-temple',
    name: 'Chilakalapudi Panduranga Swamy Temple',
    category: 'temple',
    distanceKm: 4.2,
    driveTimeMins: 10,
    description: 'Renowned spiritual landmark resembling Pandharpur, drawing pilgrims from all across South India.',
    directionsUrl: 'https://maps.google.com/?q=Panduranga+Swamy+Temple+Chilakalapudi',
  },
  {
    id: 'dattashram',
    name: 'Dattashram & Shiva Temple',
    category: 'temple',
    distanceKm: 4.5,
    driveTimeMins: 10,
    description: 'Serene coastal ashram and temple complex located near the ancient port canal.',
    directionsUrl: 'https://maps.google.com/?q=Dattashram+Machilipatnam',
  },
  {
    id: 'port-area',
    name: 'Machilipatnam Deep Sea Port Development Zone',
    category: 'commercial',
    distanceKm: 7.5,
    driveTimeMins: 15,
    description: 'Mega infrastructure port project attracting maritime engineers, EPC contractors, and government delegations.',
    directionsUrl: 'https://maps.google.com/?q=Machilipatnam+Port',
  },
];

export const VERIFIED_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Venkata Satyanarayana R.',
    roleOrLocation: 'Hyderabad • Family Trip',
    stayDate: 'October 2026',
    rating: 5,
    title: 'Spotless rooms, exceptional cleanliness & family comfort',
    comment:
      'We visited Machilipatnam for our niece’s wedding at Brundavan convention. SG GRAND is literally opposite Brundavan Theater, making logistics seamless. The rooms were spotless, AC was chilled, and generator kicked in immediately during a power cut. Best stay in Bandar without question.',
    roomBooked: 'Grand Family Suite',
    verifiedDirect: true,
  },
  {
    id: 'rev-2',
    author: 'Commander Sandeep M.',
    roleOrLocation: 'Visakhapatnam • Port Project Consultant',
    stayDate: 'September 2026',
    rating: 5,
    title: 'Saved ₹1,200 booking direct + WhatsApp team is fantastic',
    comment:
      'I stay here every time I inspect the Bandar Port project. Booking directly on their website was ₹300/night cheaper than MakeMyTrip. The manager accommodated my 10 AM early check-in without charging a rupee extra. Quiet rooms, fast Wi-Fi for video meetings.',
    roomBooked: 'Executive Twin Room',
    verifiedDirect: true,
  },
  {
    id: 'rev-3',
    author: 'Priyanka & Karthik V.',
    roleOrLocation: 'Bengaluru • Weekend Temple Visit',
    stayDate: 'August 2026',
    rating: 5,
    title: '5-star hospitality in Machilipatnam',
    comment:
      'We came to visit Chilakalapudi Panduranga Swamy temple and Manginapudi beach. The hotel feels brand new, clean white sheets, sparkling clean washrooms, and safe covered parking for our car. The front desk even guided us to the authentic Thatha Rao Bandar Laddu shop.',
    roomBooked: 'Deluxe King AC Room',
    verifiedDirect: true,
  },
  {
    id: 'rev-4',
    author: 'Dr. Srinivas Rao K.',
    roleOrLocation: 'Vijayawada • Medical Conference',
    stayDate: 'July 2026',
    rating: 5,
    title: 'Cleanest hotel in town with reliable generator backup',
    comment:
      'Coastal AP can have erratic power fluctuations, but SG Grand has heavy generator backup that runs the ACs seamlessly. Courteous staff, prompt room service with piping hot tea, and hassle-free GST invoice for corporate reimbursement.',
    roomBooked: 'Deluxe King AC Room',
    verifiedDirect: true,
  },
];

export const OTA_COMPARISON = [
  {
    feature: 'Price per Night (Deluxe King)',
    direct: '₹2,400',
    ota: '₹2,850',
    benefit: 'Save ₹450 / night instantly',
  },
  {
    feature: 'OTA Convenience Fee Markup',
    direct: '₹0 (Zero middleman fee)',
    ota: '₹200 – ₹350 added at checkout',
    benefit: '100% transparent pricing',
  },
  {
    feature: 'Early Check-In (Subject to avail.)',
    direct: 'Free Priority from 10:00 AM',
    ota: 'Charged half-day or refused',
    benefit: 'Relax right after morning train',
  },
  {
    feature: 'Direct WhatsApp Concierge',
    direct: 'Direct line to Hotel Manager',
    ota: 'Automated call center chatbot',
    benefit: 'Instant human assistance',
  },
  {
    feature: 'Room Upgrades',
    direct: 'Highest priority for direct guests',
    ota: 'Lowest allocation tier',
    benefit: 'Best available room views',
  },
  {
    feature: 'Modifications & Rescheduling',
    direct: 'Direct call flexibility',
    ota: 'Heavy cancellation penalties',
    benefit: 'Zero stress for changing plans',
  },
];

export const LOCAL_GUIDE_DATA: GuidePlace[] = [
  {
    id: 'bandar-laddu',
    title: 'Authentic Bandar Laddu (Thatha Rao & Local Sweets)',
    category: 'food',
    subtitle: 'GI-Tagged Geographical Heritage Sweet',
    description:
      'Machilipatnam is world-famous for "Bandar Laddu" (also called Thokkudu Laddu), prepared with roasted gram flour, ghee, and pure sugar syrup pounded traditionally into a smooth, melt-in-your-mouth delicacy.',
    localTip: 'Visit Thatha Rao Sweets near Koneru Center (3 mins from hotel). Ask for freshly packed warm laddus and Bandar Halwa to take home.',
    distanceFromHotel: '1.2 km (4 mins drive)',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coastal-seafood',
    title: 'Coastal Andhra Seafood Specialities',
    category: 'food',
    subtitle: 'Fresh Catch from Bay of Bengal',
    description:
      'Machilipatnam’s coastal cuisine is celebrated for spicy Bandar Royyala Vepudu (Prawn Fry), fiery Chepala Pulusu (Fish Tamarind Gravy), and crab masala made with freshly ground local Andhra spices.',
    localTip: 'Ask the SG GRAND front desk for daily restaurant recommendations or order fresh local prawn fry through our in-room dining.',
    distanceFromHotel: 'On-site / within 1 km',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'manginapudi-guide',
    title: 'Manginapudi Black Soil Beach & Lighthouse',
    category: 'beach',
    subtitle: 'Unique Coastal Shoreline & Gentle Waves',
    description:
      'Unlike usual golden beaches, Manginapudi features a unique black soil bed. The waters are shallow and calm, making it a favorite for relaxing beach walks and family picnics.',
    localTip: 'Best visited around 4:30 PM to 6:30 PM for sunset. Enjoy fresh tender coconuts and roasted corn along the promenade.',
    distanceFromHotel: '11 km (18 mins drive)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kalamkari-craft',
    title: 'Machilipatnam (Pedana) Handloom Kalamkari',
    category: 'shopping',
    subtitle: 'Ancient Natural Dye Block-Printing',
    description:
      'Machilipatnam Kalamkari is an exquisite ancient textile craft utilizing hand-carved teakwood blocks and organic vegetable dyes (madder root, indigo, pomegranate rind) on pure cotton.',
    localTip: 'Take a quick 15-minute drive to Pedana block-printing workshops. You can purchase genuine Kalamkari sarees, bedspreads, and dupattas directly from artisan looms.',
    distanceFromHotel: '8 km (14 mins drive)',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'historical-bandar',
    title: 'Bandar Maritime Heritage & Dutch Cemetery',
    category: 'history',
    subtitle: '17th-Century Dutch & British Trade Port',
    description:
      'Machilipatnam was one of the most prominent sea trading ports along the Coromandel Coast from the 16th to 19th centuries, frequented by Portuguese, Dutch, French, and British East India Company ships.',
    localTip: 'Explore the preserved Dutch Cemetery and Old Bandar Fort structures near the canal gate to soak in centuries of maritime history.',
    distanceFromHotel: '5.2 km (12 mins drive)',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
  },
];
