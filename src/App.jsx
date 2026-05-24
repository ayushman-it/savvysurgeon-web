import React, { useMemo, useRef, useState } from 'react';

const SPECIALTIES = ['Cardiac Surgery', 'Orthopedics', 'Oncology', 'Fertility'];
const TREATMENT_GROUPS = [
  { id: 'all', label: 'All treatments', type: 'All', procedures: [] },
  { id: 'medical', label: 'Medical', type: 'Medical', procedures: ['CABG', 'Valve repair', 'Knee replacement', 'Hip replacement', 'Breast oncology', 'GI oncology'] },
  { id: 'aesthetic', label: 'Aesthetic', type: 'Aesthetic', procedures: ['Hair transplant', 'Rhinoplasty', 'Body contouring', 'Dental implants'] },
  { id: 'wellness', label: 'Wellness', type: 'Wellness', procedures: ['Executive health check', 'Rehab program', 'Preventive screening'] },
];
const DESTINATION_FILTERS = ['All destinations', 'India', 'Turkey', 'Singapore', 'Thailand', 'UAE', 'South Korea'];
const BUDGET_FILTERS = [
  { label: 'Any budget', min: 0, max: Infinity },
  { label: 'Under $3k', min: 0, max: 3000 },
  { label: '$3k-$8k', min: 3000, max: 8000 },
  { label: '$8k+', min: 8000, max: Infinity },
];
const BRAND_NAME = 'SavvySurgeon';
const BRAND_TAGLINE = '';

const HOSPITALS = [
  {
    id: 'apollo-chennai',
    name: 'Apollo Heart and Multispeciality',
    city: 'Chennai',
    country: 'India',
    specialty: 'Cardiac Surgery',
    treatmentType: 'Medical',
    rating: '4.9',
    valueScore: 92,
    packageFrom: 500,
    surgeons: 18,
    leadSurgeon: 'Dr. Anika Raman',
    surgeonTitle: 'Cardiothoracic Surgeon',
    doctorExperience: '18 years',
    doctorFee: 45,
    intro: 'High-volume cardiac destination with international patient coordination and ICU-backed recovery.',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    surgeonImage:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    procedures: ['CABG', 'Valve repair', 'Angioplasty', 'Heart failure care'],
    facilities: ['Hybrid cath lab', 'International patient lounge', 'Private ICU recovery', '24x7 care desk'],
    support: ['Visa letter support', 'Airport pickup', 'Translator on request', 'Guest stay partners'],
    certifications: ['JCI aligned workflow', 'Cardiac center of excellence', 'International patient services'],
    languages: ['English', 'Hindi', 'Arabic'],
    contact: '+91 44 4400 8800',
    accommodation: 'Hospital recovery rooms and nearby serviced apartments available',
    availability: 'Video review within 3 hours',
    cost: {
      treatment: 7200,
      flight: 650,
      visa: 85,
      local: 140,
      stayNight: 72,
      other: 180,
    },
  },
  {
    id: 'mednova-istanbul',
    name: 'MedNova Surgical Center',
    city: 'Istanbul',
    country: 'Turkey',
    specialty: 'Orthopedics',
    treatmentType: 'Medical',
    rating: '4.8',
    valueScore: 93,
    packageFrom: 2200,
    surgeons: 11,
    leadSurgeon: 'Dr. Selim Kara',
    surgeonTitle: 'Joint Replacement Specialist',
    doctorExperience: '16 years',
    doctorFee: 60,
    intro: 'Focused on joint replacement and mobility recovery with travel concierge support.',
    image:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    surgeonImage:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
    procedures: ['Knee replacement', 'Hip replacement', 'Sports injury repair', 'Spine stabilization'],
    facilities: ['Robotic operating theatre', 'Dedicated rehab floor', 'Recovery suites', 'Mobility assessment desk'],
    support: ['Hotel transfer desk', 'Companion support', 'Physio pathway', 'Interpreter service'],
    certifications: ['Joint replacement excellence', 'Sports injury pathway', 'International mobility rehab'],
    languages: ['English', 'Turkish', 'Russian'],
    contact: '+90 212 880 2210',
    accommodation: 'Partner hotels and rehabilitation stay packages',
    availability: 'Same-day response for travel cases',
    cost: {
      treatment: 9100,
      flight: 820,
      visa: 40,
      local: 160,
      stayNight: 94,
      other: 220,
    },
  },
  {
    id: 'lotus-singapore',
    name: 'Lotus Oncology Institute',
    city: 'Singapore',
    country: 'Singapore',
    specialty: 'Oncology',
    treatmentType: 'Medical',
    rating: '4.9',
    valueScore: 95,
    packageFrom: 600,
    surgeons: 9,
    leadSurgeon: 'Dr. Mei Tan',
    surgeonTitle: 'Surgical Oncologist',
    doctorExperience: '20 years',
    doctorFee: 80,
    intro: 'Multidisciplinary oncology care with tumor-board decisions and coordinator-led planning.',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    surgeonImage:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
    procedures: ['Breast oncology', 'GI oncology', 'Day care chemotherapy', 'Second opinion review'],
    facilities: ['Tumor board room', 'Private infusion suites', 'Cancer care coordination', 'Family counseling rooms'],
    support: ['Digital records intake', 'Insurance desk', 'Family counseling', 'Tele follow-up'],
    certifications: ['Oncology center accreditation', 'Multidisciplinary treatment board', 'Global second opinion desk'],
    languages: ['English', 'Mandarin', 'Malay'],
    contact: '+65 6510 8888',
    accommodation: 'Premium recovery suites and nearby family stay support',
    availability: 'Next business day response',
    cost: {
      treatment: 12000,
      flight: 930,
      visa: 30,
      local: 180,
      stayNight: 130,
      other: 260,
    },
  },
];

const APP_SCREENS = [
  { id: 'home', label: 'Home' },
  { id: 'patient', label: 'Patient' },
  { id: 'search', label: 'Search' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'surgeon', label: 'Surgeon' },
  { id: 'video', label: 'Live Call' },
  { id: 'support', label: 'Support' },
  { id: 'cost', label: 'Cost' },
  { id: 'request', label: 'Request' },
];

const AUTH_ONLY_SCREENS = new Set(['patient', 'video', 'support']);

const FEATURE_COLUMNS = [
  {
    title: 'Core vision',
    points: [
      'Global listing platform for hospitals and surgeons',
      'Verified healthcare discovery for local and international patients',
      'Treatment-first comparison with request-based conversion',
    ],
  },
  {
    title: 'Search and trust',
    points: [
      'Filter by country, city, hospital, surgeon, specialization, and treatment',
      'Detailed hospital and surgeon profiles',
      'Associated hospitals, qualifications, experience, and facilities',
    ],
  },
  {
    title: 'Medical travel',
    points: [
      'Flight, visa, transport, stay, and treatment transparency',
      'Planning support for overseas patients',
      'Clear consultation and treatment inquiry flow',
    ],
  },
];

const ROLE_CARDS = [
  'Patients search, compare, and request consultations',
  'Doctors manage profiles and availability',
  'Hospitals manage listings and surgeons',
  'Admin handles approvals, users, and platform control',
];

const TIMELINE = [
  { title: 'Phase 1', body: 'Responsive web application with patient portal, dashboards, admin, database, and deployment.' },
  { title: 'Phase 2', body: 'Android and iOS application design, API integration, testing, and mobile rollout.' },
  { title: 'SEO layer', body: 'Treatment page optimization, healthcare keywords, indexing, schema, and visibility growth.' },
  { title: 'Commercials', body: 'Web build INR 30,000, optional SEO from INR 6,000, support from INR 3,000 to 5,000.' },
  { title: 'Payments', body: '50 percent start, 30 percent mid development, and 20 percent on final delivery.' },
  { title: 'Expansion', body: 'Video consultation, telemedicine, online payments, medical tourism packages, and multilingual support.' },
];

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1580281657527-47ce28f1d0bf?auto=format&fit=crop&w=900&q=80',
];

const HOME_HERO_IMAGE =
  'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80';
const BOOK_APPOINTMENT_DOCTOR_IMAGE =
  'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&w=900&q=80';
const BOOKING_CITIES = ['Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'Delhi'];

const ONBOARDING_SLIDES = [
  {
    id: 'discover',
    step: 'Step 1 of 3',
    title: 'Find trusted hospitals for the treatment you need.',
    body: 'Browse verified care centers by treatment, location, and readiness before taking the next step.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'specialists',
    step: 'Step 2 of 3',
    title: 'See surgeons, facilities, and support in one clear flow.',
    body: 'Review lead doctors, hospital infrastructure, and patient support services without jumping across pages.',
    image:
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'travel',
    step: 'Step 3 of 3',
    title: 'Plan your medical journey with fewer surprises.',
    body: 'Estimate treatment, stay, transport, and consultation steps before you send your request.',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  },
];

const HOME_HIGHLIGHTS = [
  {
    title: 'Search globally',
    body: 'Discover verified hospitals and surgeons by country, city, treatment, and specialization.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Compare treatment options',
    body: 'Review facilities, associated surgeons, and procedure-specific care pathways before choosing.',
    image:
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Plan the journey',
    body: 'Estimate travel, stay, visa, and treatment costs in one transparent patient flow.',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
  },
];

const BODY_PART_CATEGORIES = [
  {
    id: 'eye',
    icon: '◉',
    title: 'Eye care',
    body: 'Cataract, Lasik, retina review, glaucoma care',
    image:
      'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'heart',
    icon: '♥',
    title: 'Heart and chest',
    body: 'Cardiology, bypass surgery, valve review, chest pain workup',
    image:
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bones',
    icon: '⟟',
    title: 'Bones and joints',
    body: 'Knee pain, ACL injury, hip replacement, spine review',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'women',
    icon: '◔',
    title: 'Women health',
    body: 'Fibroid review, PCOS, pelvic pain, infertility care',
    image:
      'https://images.unsplash.com/photo-1666214277657-b0b4f6dd1d8c?auto=format&fit=crop&w=900&q=80',
  },
];

const REQUEST_STEPS = [
  'Select hospital or surgeon',
  'Choose surgical ailment and concern',
  'Share medical information',
  'Choose consultation or visit type',
  'Receive response and next steps',
];

const PATIENT_BOOKINGS = [
  {
    id: 'booking-1',
    title: 'Video consult with Dr. Anika Raman',
    hospital: 'Apollo Heart and Multispeciality',
    time: 'Fri, 4:30 PM',
    status: 'Confirmed',
  },
  {
    id: 'booking-2',
    title: 'Records review with care coordinator',
    hospital: 'SavvySurgeon coordination desk',
    time: 'Sat, 11:00 AM',
    status: 'Pending payment',
  },
];

const APPOINTMENT_SLOTS = ['Today, 6:00 PM', 'Fri, 4:30 PM', 'Sat, 11:00 AM', 'Mon, 9:30 AM'];

const PAYMENT_HISTORY = [
  { id: 'pay-1', label: 'Advance consultation fee', amount: 180, status: 'Paid' },
  { id: 'pay-2', label: 'Medical records translation', amount: 65, status: 'Due' },
];

const SUPPORT_TOPICS = ['Booking help', 'Payment issue', 'Video call issue', 'Medical records upload'];

const SUPPORT_MESSAGES = [
  { id: 'msg-1', side: 'them', text: 'Hello, I can help you with your booking, payment, or live consultation setup.' },
  { id: 'msg-2', side: 'me', text: 'I need help confirming my appointment and checking if my reports were received.' },
  { id: 'msg-3', side: 'them', text: 'Your reports are available. I can escalate the final confirmation after payment is cleared.' },
];

const HOME_ACTION_VISUALS = {
  profile: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=80',
  booking: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
  video: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
  support: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80',
};

const BOOKING_CATEGORIES = [
  {
    id: 'orthopedics',
    title: 'Knee and Joints related',
    subtitle: 'Orthopedics',
    short: 'KJ',
    ailments: ['ACL injury', 'Arthritis', 'Hip replacement', 'Knee replacement'],
  },
  {
    id: 'ophthalmology',
    title: 'Eye related',
    subtitle: 'Ophthalmology',
    short: 'EY',
    ailments: ['Cataract', 'Lasik', 'Glaucoma', 'Squinteye'],
  },
  {
    id: 'general',
    title: 'General Surgery',
    subtitle: 'General Surgery',
    short: 'GS',
    ailments: ['Gallbladder stone', 'Hernia', 'Appendix', 'Laparoscopic procedure'],
  },
  {
    id: 'proctology',
    title: 'Anus related',
    subtitle: 'Proctology',
    short: 'PR',
    ailments: ['Piles', 'Fissure', 'Fistula', 'Rectal pain'],
  },
  {
    id: 'cardiology',
    title: 'Cardiology related',
    subtitle: 'Cardiology',
    short: 'CA',
    ailments: ['Chest pain review', 'Angioplasty review', 'Valve issue', 'Heart rhythm concern'],
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Surgery related',
    subtitle: 'Cosmetic',
    short: 'CS',
    ailments: ['Hair transplant', 'Rhinoplasty', 'Skin revision', 'Body contouring'],
  },
  {
    id: 'urology',
    title: 'Kidney related',
    subtitle: 'Urology',
    short: 'UR',
    ailments: ['Kidney stone', 'Prostate issue', 'Urinary blockage', 'Ureter issue'],
  },
  {
    id: 'gynaecology',
    title: 'Gynaecology related',
    subtitle: 'Gynaecology',
    short: 'GY',
    ailments: ['Fibroid review', 'PCOS', 'Infertility review', 'Pelvic pain'],
  },
];

const BOOKING_CATEGORY_SPECIALTY = {
  orthopedics: 'Orthopedics',
  cardiology: 'Cardiac Surgery',
};

const BOTTOM_SECTIONS = [
  {
    title: 'SEO and visibility',
    items: [
      'Healthcare keyword research and on-page SEO setup',
      'Meta tags, structured data, indexing, sitemap, and technical SEO',
      'Treatment and hospital pages designed to improve search visibility',
    ],
  },
  {
    title: 'Commercial and support',
    items: [
      'Phase 1 web platform development: INR 30,000 including dashboards and deployment support',
      'Optional maintenance: bug fixing, minor updates, technical support, and server help',
      'Monthly support range: INR 3,000 to 5,000',
    ],
  },
  {
    title: 'Payment and next steps',
    items: [
      'Payment terms: 50 percent project start, 30 percent mid development, 20 percent final delivery',
      'Domain and hosting by client, initial deployment by development team',
      'Next step: confirm scope, clarify additions, and begin execution',
    ],
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function BrandMark({ compact = false }) {
  return (
    <span className={compact ? 'mini-mark' : 'brand-mark'}>
      <svg aria-hidden="true" className="brand-mark-icon" viewBox="0 0 24 24">
        <path d="M7 4.5h10a2 2 0 0 1 2 2v13H5v-13a2 2 0 0 1 2-2Z" fill="currentColor" opacity="0.18" />
        <path d="M12 7.5v7M8.5 11h7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M9 19.5v-3h6v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    </span>
  );
}

function NavIcon({ children }) {
  return (
    <svg aria-hidden="true" className="nav-icon" fill="none" viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <NavIcon>
      <path d="M4 10.5L12 4l8 6.5V20H4v-9.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.5 20v-5h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function SearchIcon() {
  return (
    <NavIcon>
      <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function CostIcon() {
  return (
    <NavIcon>
      <path d="M4 7.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M4 9.5h16" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 14h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function RequestIcon() {
  return (
    <NavIcon>
      <path d="M7 5h10a2 2 0 0 1 2 2v12l-3.2-2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function PatientIcon() {
  return (
    <NavIcon>
      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function VideoIcon() {
  return (
    <NavIcon>
      <rect x="4" y="7" width="10.5" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14.5 10.3 20 7.8v8.4l-5.5-2.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function SupportIcon() {
  return (
    <NavIcon>
      <path d="M7 5h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5.2L8 19v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.5 10.2h5M9.5 13h3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function SidebarIcon() {
  return (
    <NavIcon>
      <path d="M5 7h14M5 12h14M5 17h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </NavIcon>
  );
}

function ScreenButton({ active, children, onClick }) {
  return (
    <button className={active ? 'screen-chip active' : 'screen-chip'} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function App() {
  const [activeScreen, setActiveScreen] = useState('intro');
  const [selectedHospitalId, setSelectedHospitalId] = useState(HOSPITALS[0].id);
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedTreatmentGroup, setSelectedTreatmentGroup] = useState('all');
  const [selectedProcedure, setSelectedProcedure] = useState('All procedures');
  const [selectedDestination, setSelectedDestination] = useState('All destinations');
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_FILTERS[0].label);
  const [selectedSupportFilter, setSelectedSupportFilter] = useState('Any support');
  const [tripNights, setTripNights] = useState(6);
  const [withCompanion, setWithCompanion] = useState(true);
  const [requestMode, setRequestMode] = useState('Video consultation');
  const [introStep, setIntroStep] = useState(0);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authRole, setAuthRole] = useState('Patient');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientProfile, setPatientProfile] = useState({
    name: 'Rahul Mehta',
    email: 'rahul.mehta@example.com',
    country: 'India',
  });
  const [appointmentSlot, setAppointmentSlot] = useState(APPOINTMENT_SLOTS[1]);
  const [supportTopic, setSupportTopic] = useState(SUPPORT_TOPICS[0]);
  const [supportRequest, setSupportRequest] = useState('Need help confirming payment and final appointment timing.');
  const [callMuted, setCallMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [bookingCity, setBookingCity] = useState(BOOKING_CITIES[0]);
  const [callbackNumber, setCallbackNumber] = useState('+91 98765 43210');
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);
  const [servicesDrawerOpen, setServicesDrawerOpen] = useState(false);
  const [bookingSheetStep, setBookingSheetStep] = useState('category');
  const [selectedBookingCategoryId, setSelectedBookingCategoryId] = useState(BOOKING_CATEGORIES[1].id);
  const [selectedAilment, setSelectedAilment] = useState('Cataract');
  const swipeStartX = useRef(0);

  const hospitals = useMemo(() => {
    const search = query.trim().toLowerCase();
    const treatmentGroup = TREATMENT_GROUPS.find((group) => group.id === selectedTreatmentGroup) ?? TREATMENT_GROUPS[0];
    const budget = BUDGET_FILTERS.find((item) => item.label === selectedBudget) ?? BUDGET_FILTERS[0];
    return HOSPITALS.filter((hospital) => {
      const matchesSpecialty = selectedSpecialty === 'All' || hospital.specialty === selectedSpecialty;
      const matchesTreatment = treatmentGroup.type === 'All' || hospital.treatmentType === treatmentGroup.type;
      const matchesProcedure = selectedProcedure === 'All procedures' || hospital.procedures.includes(selectedProcedure);
      const matchesDestination = selectedDestination === 'All destinations' || hospital.country === selectedDestination;
      const matchesBudget = hospital.packageFrom >= budget.min && hospital.packageFrom <= budget.max;
      const matchesSupport = selectedSupportFilter === 'Any support' || hospital.support.includes(selectedSupportFilter);
      const haystack = [
        hospital.name,
        hospital.city,
        hospital.country,
        hospital.specialty,
        hospital.treatmentType,
        hospital.leadSurgeon,
        hospital.surgeonTitle,
        ...hospital.languages,
        ...hospital.certifications,
        ...hospital.procedures,
      ]
        .join(' ')
        .toLowerCase();

      return matchesSpecialty && matchesTreatment && matchesProcedure && matchesDestination && matchesBudget && matchesSupport && (!search || haystack.includes(search));
    });
  }, [query, selectedBudget, selectedDestination, selectedProcedure, selectedSpecialty, selectedSupportFilter, selectedTreatmentGroup]);

  const selectedTreatmentMeta = TREATMENT_GROUPS.find((group) => group.id === selectedTreatmentGroup) ?? TREATMENT_GROUPS[0];
  const availableProcedures = ['All procedures', ...new Set(
    (selectedTreatmentMeta.type === 'All'
      ? HOSPITALS.flatMap((hospital) => hospital.procedures)
      : selectedTreatmentMeta.procedures)
      .filter(Boolean),
  )];

  const selectedHospital = hospitals.find((hospital) => hospital.id === selectedHospitalId)
    ?? HOSPITALS.find((hospital) => hospital.id === selectedHospitalId)
    ?? HOSPITALS[0];

  const selectedBookingCategory = BOOKING_CATEGORIES.find((category) => category.id === selectedBookingCategoryId)
    ?? BOOKING_CATEGORIES[0];

  const stayCost = selectedHospital.cost.stayNight * tripNights;
  const companionCost = withCompanion ? 240 : 0;
  const totalCost =
    selectedHospital.cost.treatment +
    selectedHospital.cost.flight +
    selectedHospital.cost.visa +
    selectedHospital.cost.local +
    selectedHospital.cost.other +
    stayCost +
    companionCost;
  const pendingPayment = 245;
  const patientFirstName = patientProfile.name.split(' ')[0];

  const patientHubActions = [
    { label: 'Profile', meta: 'Identity and care preferences', action: () => openProtectedScreen('patient') },
    { label: 'Bookings', meta: 'Upcoming visits and consultations', action: () => openProtectedScreen('patient') },
    { label: 'Video call', meta: 'Join live consultation room', action: () => openProtectedScreen('video') },
    { label: 'Payments', meta: 'Clear due amounts and invoices', action: () => setActiveScreen('cost') },
    { label: 'Support', meta: 'Chat with care team', action: () => openProtectedScreen('support') },
    { label: 'Book appointment', meta: 'Pick ailment and slot', action: () => openBookingFlow() },
  ];

  const cities = [...new Set(HOSPITALS.map((hospital) => `${hospital.city}, ${hospital.country}`))];

  const homeActions = [
    {
      id: 'profile',
      title: isLoggedIn ? 'My patient profile' : 'Unlock patient dashboard',
      body: isLoggedIn ? 'Open bookings, payments, and profile' : 'Login from a bottom sheet on this screen',
      image: HOME_ACTION_VISUALS.profile,
      action: () => (isLoggedIn ? setActiveScreen('patient') : setAuthSheetOpen(true)),
    },
    {
      id: 'booking',
      title: 'Book an appointment',
      body: 'Select surgical ailment first, then continue with the request flow',
      image: HOME_ACTION_VISUALS.booking,
      action: () => openBookingFlow(),
    },
    {
      id: 'video',
      title: 'Live consultation room',
      body: 'Join active video calls, mute camera, and request live support',
      image: HOME_ACTION_VISUALS.video,
      action: () => openProtectedScreen('video'),
    },
    {
      id: 'support',
      title: 'Support chat request',
      body: 'Reach the care desk for payment, reports, and booking issues',
      image: HOME_ACTION_VISUALS.support,
      action: () => openProtectedScreen('support'),
    },
  ];

  function openHospital(hospitalId, targetScreen = 'hospital') {
    setSelectedHospitalId(hospitalId);
    setActiveScreen(targetScreen);
  }

  function goToIntroStep(step) {
    setIntroStep(Math.max(0, Math.min(step, ONBOARDING_SLIDES.length - 1)));
  }

  function handleIntroSwipeStart(event) {
    swipeStartX.current = event.touches[0]?.clientX ?? 0;
  }

  function handleIntroSwipeEnd(event) {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - swipeStartX.current;

    if (Math.abs(delta) < 45) {
      return;
    }

    if (delta < 0) {
      goToIntroStep(introStep + 1);
      return;
    }

    goToIntroStep(introStep - 1);
  }

  function openProtectedScreen(screenId) {
    if (!isLoggedIn) {
      setAuthSheetOpen(true);
      setActiveScreen('home');
      return;
    }

    setActiveScreen(screenId);
  }

  function openBookingFlow() {
    setBookingSheetOpen(true);
    setBookingSheetStep('category');
  }

  function closeBookingFlow() {
    setBookingSheetOpen(false);
    setBookingSheetStep('category');
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    setAuthSheetOpen(false);
    setActiveScreen('patient');
  }

  function updatePatientProfile(field, value) {
    setPatientProfile((current) => ({ ...current, [field]: value }));
  }

  function handleBookingCategorySelect(categoryId) {
    const category = BOOKING_CATEGORIES.find((item) => item.id === categoryId) ?? BOOKING_CATEGORIES[0];
    setSelectedBookingCategoryId(category.id);
    setSelectedAilment(category.ailments[0]);
    setBookingSheetStep('ailment');
  }

  function confirmAilmentSelection(ailment) {
    setSelectedAilment(ailment);
    setRequestMode('Video consultation');
    closeBookingFlow();
    setActiveScreen('request');
  }

  function handleAppointmentCardSubmit() {
    setRequestMode('Video consultation');
    setActiveScreen('request');
  }

  return (
    <div className="app-canvas">
      <aside className="desktop-context">
        <section className="presentation-hero">
          <BrandMark />
          <div>
            <p className="eyebrow">{BRAND_NAME}</p>
            <h1>{BRAND_NAME} hospital and surgeon discovery platform.</h1>
            <p className="desktop-copy">
              {BRAND_NAME} is designed as a patient-first surgical discovery app with professional
              hospital listings, guided consultations, and coordinated treatment planning.
            </p>

            <div className="proof-strip">
              <span>Auth + patient access</span>
              <span>Bookings and live consultations</span>
              <span>Support chat and payments</span>
              <span>Transparent cost breakdowns</span>
            </div>

            <div className="desktop-visual-grid">
              {FEATURE_IMAGES.map((image, index) => (
                <article className={`visual-card visual-card-${index + 1}`} key={image}>
                  <img alt="Healthcare product preview" src={image} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="client-flow">
          <div className="client-overview-grid">
            {FEATURE_COLUMNS.map((column) => (
              <article className="client-panel" key={column.title}>
                <p>{column.title}</p>
                <h2>{column.title === 'Core vision' ? 'Project overview and platform vision' : column.title}</h2>
                <div className="feature-list">
                  {column.points.map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="client-flow-header">
            <p>Healthcare product map</p>
            <h2>Every section below is designed from the proposal scope, not just visual filler.</h2>
          </div>

          <div className="flow-timeline">
            {TIMELINE.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </article>
            ))}
          </div>

          <div className="reference-panel">
            <p>Platform modules and user roles</p>
            <span>Patient Web Portal, Doctor Dashboard, Hospital Dashboard, Admin Management Panel, and Central Database System.</span>
            <div className="role-grid">
              {ROLE_CARDS.map((role) => (
                <span className="role-pill" key={role}>
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="bottom-sections">
            {BOTTOM_SECTIONS.map((section) => (
              <article className="bottom-panel" key={section.title}>
                <p>{section.title}</p>
                <div className="bottom-list">
                  {section.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </aside>

      <section className="phone-stage">
        <div className="phone-frame">
          <div className={activeScreen === 'intro' ? 'screen intro-screen' : 'screen'}>
            {activeScreen !== 'intro' && (
              <div className="screen-top">
                <div className="screen-brand">
                  <BrandMark compact />
                  <div>
                    <p>{BRAND_NAME}</p>
                    <h2>Hospitals</h2>
                  </div>
                </div>
                <button aria-label="Open services" className="sidebar-toggle" onClick={() => setServicesDrawerOpen(true)} type="button">
                  <SidebarIcon />
                </button>
              </div>
            )}

            {activeScreen !== 'intro' && (
              <div className="screen-selector">
                {APP_SCREENS.map((screen) => (
                  <ScreenButton
                    active={activeScreen === screen.id}
                    key={screen.id}
                    onClick={() => {
                      if (AUTH_ONLY_SCREENS.has(screen.id)) {
                        openProtectedScreen(screen.id);
                        return;
                      }

                      setActiveScreen(screen.id);
                    }}
                  >
                    {screen.label}
                  </ScreenButton>
                ))}
              </div>
            )}

            <div className={activeScreen === 'intro' ? 'screen-body intro-body' : 'screen-body'}>
              {activeScreen === 'intro' && (
                <div
                  className="screen-view onboarding-view"
                  onTouchEnd={handleIntroSwipeEnd}
                  onTouchStart={handleIntroSwipeStart}
                >
                  <button className="onboarding-skip" onClick={() => setActiveScreen('home')} type="button">
                    Skip
                  </button>
                  <div className="onboarding-track" style={{ transform: `translateX(-${introStep * 100}%)` }}>
                    {ONBOARDING_SLIDES.map((slide) => (
                      <article
                        className="onboarding-slide"
                        key={slide.id}
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(7, 22, 31, 0.12), rgba(7, 22, 31, 0.9) 60%, rgba(4, 15, 22, 0.98)), url(${slide.image})`,
                        }}
                      >
                        <div className="onboarding-copy">
                          <div className="splash-brand-lockup">
                            <BrandMark />
                            <div>
                              <strong>{BRAND_NAME}</strong>
                              <small>Verified hospitals and surgeons</small>
                            </div>
                          </div>
                          <p>{slide.step}</p>
                          <h2>{slide.title}</h2>
                          <span>{slide.body}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="onboarding-footer">
                    <div className="onboarding-progress">
                      {ONBOARDING_SLIDES.map((slide, index) => (
                        <button
                          aria-label={`Go to ${slide.step}`}
                          className={introStep === index ? 'progress-dot active' : 'progress-dot'}
                          key={slide.id}
                          onClick={() => goToIntroStep(index)}
                          type="button"
                        />
                      ))}
                    </div>
                    <div className="onboarding-meta">
                      <span>Swipe</span>
                      <strong>{ONBOARDING_SLIDES[introStep].step}</strong>
                    </div>
                    <div className="intro-actions">
                      {introStep > 0 && (
                        <button className="secondary-action" onClick={() => goToIntroStep(introStep - 1)} type="button">
                          Previous
                        </button>
                      )}
                      <button
                        className="primary-action"
                        onClick={() => {
                          if (introStep === ONBOARDING_SLIDES.length - 1) {
                            setActiveScreen('home');
                            return;
                          }

                          goToIntroStep(introStep + 1);
                        }}
                        type="button"
                      >
                        {introStep === ONBOARDING_SLIDES.length - 1 ? 'Enter app' : 'Next screen'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeScreen === 'home' && (
                <div className="screen-view app-scroll">
                  <section className="module-card disease-directory-card">
                    <div className="section-heading">
                      <h3>Disease listings</h3>
                      <button className="mini-chip active" onClick={() => openBookingFlow()} type="button">
                        View all
                      </button>
                    </div>
                    <div className="disease-chip-grid">
                      {BOOKING_CATEGORIES.slice(0, 8).map((category) => (
                        <button
                          className={selectedBookingCategoryId === category.id ? 'disease-chip active' : 'disease-chip'}
                          key={category.id}
                          onClick={() => {
                            setSelectedBookingCategoryId(category.id);
                            setSelectedAilment(category.ailments[0]);
                            setSelectedSpecialty(BOOKING_CATEGORY_SPECIALTY[category.id] ?? 'All');
                          }}
                          type="button"
                        >
                          <span>{category.short}</span>
                          <strong>{category.title}</strong>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="module-card hospital-listing-card priority-directory-card">
                    <div className="section-heading">
                      <h3>Hospital listings</h3>
                    </div>
                    <div className="list-stack compact-list-stack">
                      {hospitals.map((hospital) => (
                        <button
                          className="list-card featured-hospital-card compact-provider-card"
                          key={hospital.id}
                          onClick={() => openHospital(hospital.id, 'hospital')}
                          type="button"
                        >
                          <img alt={hospital.name} className="card-thumb" src={hospital.image} />
                          <div className="compact-provider-copy">
                            <div className="hospital-card-topline">
                              <span className="hospital-chip">{hospital.treatmentType}</span>
                              <span className="hospital-city">{hospital.city}, {hospital.country}</span>
                            </div>
                            <strong>{hospital.name}</strong>
                            <p>{hospital.specialty} - {hospital.valueScore}% value for money</p>
                            <div className="provider-metrics">
                              <span>From {formatCurrency(hospital.packageFrom)}</span>
                              <span>{hospital.rating} rating</span>
                              <span>{hospital.surgeons} doctors</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="module-card priority-directory-card">
                    <div className="section-heading">
                      <h3>Doctor listings</h3>
                    </div>
                    <div className="doctor-list compact-list-stack">
                      {hospitals.map((hospital) => (
                        <button
                          className="doctor-card"
                          key={hospital.leadSurgeon}
                          onClick={() => openHospital(hospital.id, 'surgeon')}
                          type="button"
                        >
                          <img alt={hospital.leadSurgeon} src={hospital.surgeonImage} />
                          <div>
                            <strong>{hospital.leadSurgeon}</strong>
                            <p>{hospital.surgeonTitle}</p>
                            <span>{hospital.doctorExperience} - {hospital.city}</span>
                            <div className="provider-metrics compact">
                              <span>{formatCurrency(hospital.doctorFee)} consult</span>
                              <span>{hospital.languages.slice(0, 2).join(', ')}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="hero-card">
                    <div className="hero-card-grid">
                      <div>
                        <p>{isLoggedIn ? 'Patient area ready' : 'Patient portal'}</p>
                        <h3>{isLoggedIn ? `Welcome back, ${patientFirstName}.` : 'Search treatment options before booking the journey.'}</h3>
                        <span>
                          Compare hospitals, surgeon expertise, support services, and estimated travel costs.
                        </span>
                        <label className="search-field home-search">
                          <span>Start with treatment, city, or hospital name</span>
                          <input
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Example: Cardiac surgery in Chennai"
                            value={query}
                          />
                        </label>
                        <div className="dual-action">
                          <button className="primary-action" onClick={() => setActiveScreen('search')} type="button">
                            Explore hospitals
                          </button>
                          <button
                            className="secondary-action"
                            onClick={() => {
                              if (isLoggedIn) {
                                setActiveScreen('patient');
                                return;
                              }

                              setAuthSheetOpen(true);
                            }}
                            type="button"
                          >
                            {isLoggedIn ? 'Patient area' : 'Login'}
                          </button>
                        </div>
                      </div>
                      <div className="hero-image-panel">
                        <img alt="Doctor speaking with a patient in a hospital consultation room" src={HOME_HERO_IMAGE} />
                        <div className="hero-image-copy">
                            <strong>{BRAND_NAME}</strong>
                            <span>Human support from discovery to appointment booking</span>
                          </div>
                      </div>
                    </div>
                  </section>

                  <section className="module-card consultation-card">
                    <div className="consultation-visual">
                      <div className="consultation-copy">
                        <h3>India&apos;s fastest growing surgery network</h3>
                        <p>Trusted across India for safe, guided surgery care.</p>
                      </div>
                      <div className="consultation-doctor-wrap">
                        <div className="doctor-orbit" />
                        <img
                          alt="Doctor standing with folded arms for consultation booking"
                          className="consultation-doctor"
                          src={BOOK_APPOINTMENT_DOCTOR_IMAGE}
                        />
                        <div className="consultation-stat stat-top-left">
                          <strong>2,00,000+</strong>
                          <span>Surgeries</span>
                        </div>
                        <div className="consultation-stat stat-top-right">
                          <strong>10,000+</strong>
                          <span>Surgeons</span>
                        </div>
                        <div className="consultation-stat stat-bottom-left">
                          <strong>25+</strong>
                          <span>Cities</span>
                        </div>
                        <div className="consultation-stat stat-bottom-right">
                          <strong>1,000+</strong>
                          <span>Hospitals</span>
                        </div>
                      </div>
                    </div>

                    <div className="consultation-form-card">
                      <div className="consultation-form-header">
                        <h3>Book your consultation today</h3>
                        <p>Get a Call Back Within 15 Minutes</p>
                      </div>

                      <div className="consultation-form-fields">
                        <label className="booking-field">
                          <span>City</span>
                          <select onChange={(event) => setBookingCity(event.target.value)} value={bookingCity}>
                            {BOOKING_CITIES.map((city) => (
                              <option key={city}>{city}</option>
                            ))}
                          </select>
                        </label>

                        <button className="booking-select-card" onClick={() => openBookingFlow()} type="button">
                          <div>
                            <span>Surgical ailment</span>
                            <strong>{selectedAilment}</strong>
                          </div>
                          <span className="booking-chevron">⌄</span>
                        </button>

                        <label className="booking-field">
                          <span>Name</span>
                          <input
                            onChange={(event) => updatePatientProfile('name', event.target.value)}
                            placeholder="Name*"
                            value={patientProfile.name}
                          />
                        </label>

                        <label className="booking-field">
                          <span>Contact Number</span>
                          <input
                            onChange={(event) => setCallbackNumber(event.target.value)}
                            placeholder="Contact Number*"
                            value={callbackNumber}
                          />
                        </label>
                      </div>

                      <button className="primary-action consultation-submit" onClick={() => handleAppointmentCardSubmit()} type="button">
                        Book appointment
                      </button>
                    </div>
                  </section>

                  <section className="module-card access-panel">
                    <div className="section-heading">
                      <h3>Patient access and quick actions</h3>
                    </div>
                    <div className="action-grid">
                      {homeActions.map((item) => (
                        <button
                          className="action-tile image-action-tile"
                          key={item.id}
                          onClick={item.action}
                          style={{ backgroundImage: `linear-gradient(180deg, rgba(53, 35, 22, 0.08), rgba(53, 35, 22, 0.78)), url(${item.image})` }}
                          type="button"
                        >
                          <div className="image-action-copy">
                            <strong>{item.title}</strong>
                            <span>{item.body}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  {isLoggedIn && (
                    <section className="module-card patient-summary-card summary-with-image">
                      <div className="section-heading">
                        <h3>Logged-in patient snapshot</h3>
                      </div>
                      <div className="patient-inline-summary">
                        <div>
                          <strong>{patientProfile.name}</strong>
                          <span>{selectedAilment} consultation selected</span>
                        </div>
                        <button className="mini-chip active" onClick={() => setActiveScreen('patient')} type="button">
                          View care hub
                        </button>
                      </div>
                      <img alt="Patient records and appointment planning desk" className="summary-image" src={FEATURE_IMAGES[2]} />
                    </section>
                  )}

                  <section className="metrics-row">
                    <div>
                      <strong>120+</strong>
                      <span>Verified providers</span>
                    </div>
                    <div>
                      <strong>40+</strong>
                      <span>Treatments mapped</span>
                    </div>
                    <div>
                      <strong>24/7</strong>
                      <span>Request intake</span>
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Popular specializations</h3>
                    </div>
                    <div className="chip-grid">
                      <button
                        className={selectedSpecialty === 'All' ? 'mini-chip active' : 'mini-chip'}
                        onClick={() => setSelectedSpecialty('All')}
                        type="button"
                      >
                        All
                      </button>
                      {SPECIALTIES.map((item) => (
                        <button
                          className={selectedSpecialty === item ? 'mini-chip active' : 'mini-chip'}
                          key={item}
                          onClick={() => {
                            setSelectedSpecialty(item);
                            setActiveScreen('search');
                          }}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>How the patient flow works</h3>
                    </div>
                    <div className="journey-list">
                      {HOME_HIGHLIGHTS.map((item) => (
                        <article className="journey-step journey-step-media" key={item.title}>
                          <img alt={item.title} className="journey-thumb" src={item.image} />
                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                </div>
              )}

              {activeScreen === 'patient' && (
                <div className="screen-view app-scroll">
                  {!isLoggedIn ? (
                    <section className="module-card auth-gate">
                      <p>Patient area</p>
                      <h3>Login first to open profile, bookings, video calls, and payments.</h3>
                      <span>Use the auth bottom sheet from home to continue as a patient or attendant.</span>
                      <button className="primary-action" onClick={() => setAuthSheetOpen(true)} type="button">
                        Open auth bottom sheet
                      </button>
                    </section>
                  ) : (
                    <>
                      <section className="profile-hero patient-hero">
                        <p>Patient area</p>
                        <h3>{patientProfile.name}</h3>
                        <span>{selectedAilment} flow active with {selectedHospital.name}</span>
                      </section>

                      <section className="module-card">
                        <div className="patient-profile-header">
                          <div className="patient-avatar">{patientFirstName.slice(0, 2).toUpperCase()}</div>
                          <div>
                            <strong>{patientProfile.name}</strong>
                            <span>{patientProfile.email}</span>
                          </div>
                        </div>
                        <div className="detail-grid">
                          <div>
                            <span>Country</span>
                            <strong>{patientProfile.country}</strong>
                          </div>
                          <div>
                            <span>Ailment selected</span>
                            <strong>{selectedAilment}</strong>
                          </div>
                          <div>
                            <span>Primary hospital</span>
                            <strong>{selectedHospital.name}</strong>
                          </div>
                          <div>
                            <span>Next slot</span>
                            <strong>{appointmentSlot}</strong>
                          </div>
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Care hub</h3>
                        </div>
                        <div className="action-grid">
                          {patientHubActions.map((item) => (
                            <button className="action-tile" key={item.label} onClick={item.action} type="button">
                              <strong>{item.label}</strong>
                              <span>{item.meta}</span>
                            </button>
                          ))}
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>My bookings</h3>
                        </div>
                        <div className="booking-stack">
                          {PATIENT_BOOKINGS.map((booking) => (
                            <article className="booking-card" key={booking.id}>
                              <div className="booking-row">
                                <strong>{booking.title}</strong>
                                <span className="booking-status">{booking.status}</span>
                              </div>
                              <p>{booking.hospital}</p>
                              <span>{booking.time}</span>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Appointment scheduling</h3>
                        </div>
                        <div className="slot-grid">
                          {APPOINTMENT_SLOTS.map((slot) => (
                            <button
                              className={appointmentSlot === slot ? 'slot-chip active' : 'slot-chip'}
                              key={slot}
                              onClick={() => setAppointmentSlot(slot)}
                              type="button"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <div className="detail-grid">
                          <div>
                            <span>Selected slot</span>
                            <strong>{appointmentSlot}</strong>
                          </div>
                          <div>
                            <span>Consultation mode</span>
                            <strong>{requestMode}</strong>
                          </div>
                          <div>
                            <span>Selected ailment</span>
                            <strong>{selectedAilment}</strong>
                          </div>
                          <div>
                            <span>Coordinator</span>
                            <strong>{BRAND_NAME} patient desk</strong>
                          </div>
                        </div>
                        <div className="dual-action">
                          <button className="secondary-action" onClick={() => openBookingFlow()} type="button">
                            Change ailment
                          </button>
                          <button className="primary-action" onClick={() => setActiveScreen('video')} type="button">
                            Join video waiting room
                          </button>
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Payment section</h3>
                        </div>
                        <div className="payment-panel">
                          <div>
                            <span>Outstanding amount</span>
                            <strong>{formatCurrency(pendingPayment)}</strong>
                          </div>
                          <button className="mini-chip active" onClick={() => setActiveScreen('cost')} type="button">
                            Review estimate
                          </button>
                        </div>
                        <div className="cost-list payment-history-list">
                          {PAYMENT_HISTORY.map((item) => (
                            <div key={item.id}>
                              <span>{item.label} · {item.status}</span>
                              <strong>{formatCurrency(item.amount)}</strong>
                            </div>
                          ))}
                        </div>
                      </section>
                    </>
                  )}
                </div>
              )}

              {activeScreen === 'search' && (
                <div className="screen-view app-scroll">
                  <section className="search-panel">
                    <p>Treatment planner search</p>
                    <label className="search-field">
                      <span>Country, city, hospital, surgeon, specialization, treatment</span>
                      <input
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by city, treatment, or surgeon"
                        value={query}
                      />
                    </label>
                    <div className="planner-steps">
                      <div className="planner-step active">
                        <span>1</span>
                        <strong>Select treatment</strong>
                      </div>
                      <div className={selectedProcedure === 'All procedures' ? 'planner-step' : 'planner-step active'}>
                        <span>2</span>
                        <strong>Choose procedure</strong>
                      </div>
                    </div>
                    <div className="filter-block">
                      <span>Treatment category</span>
                      <div className="chip-grid">
                        {TREATMENT_GROUPS.map((group) => (
                          <button
                            className={selectedTreatmentGroup === group.id ? 'mini-chip active' : 'mini-chip'}
                            key={group.id}
                            onClick={() => {
                              setSelectedTreatmentGroup(group.id);
                              setSelectedProcedure('All procedures');
                            }}
                            type="button"
                          >
                            {group.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="filter-select-grid">
                      <label>
                        Procedure
                        <select onChange={(event) => setSelectedProcedure(event.target.value)} value={selectedProcedure}>
                          {availableProcedures.map((procedure) => (
                            <option key={procedure}>{procedure}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Destination
                        <select onChange={(event) => setSelectedDestination(event.target.value)} value={selectedDestination}>
                          {DESTINATION_FILTERS.map((destination) => (
                            <option key={destination}>{destination}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Starting package
                        <select onChange={(event) => setSelectedBudget(event.target.value)} value={selectedBudget}>
                          {BUDGET_FILTERS.map((budget) => (
                            <option key={budget.label}>{budget.label}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Care support
                        <select onChange={(event) => setSelectedSupportFilter(event.target.value)} value={selectedSupportFilter}>
                          <option>Any support</option>
                          <option>Visa letter support</option>
                          <option>Translator on request</option>
                          <option>Airport pickup</option>
                          <option>Interpreter service</option>
                          <option>Hotel transfer desk</option>
                          <option>Insurance desk</option>
                        </select>
                      </label>
                    </div>
                    <div className="destination-strip">
                      {DESTINATION_FILTERS.slice(1).map((destination) => (
                        <button
                          className={selectedDestination === destination ? 'destination-chip active' : 'destination-chip'}
                          key={destination}
                          onClick={() => setSelectedDestination(destination)}
                          type="button"
                        >
                          {destination}
                        </button>
                      ))}
                    </div>
                    <div className="chip-grid">
                      <button
                        className={selectedSpecialty === 'All' ? 'mini-chip active' : 'mini-chip'}
                        onClick={() => setSelectedSpecialty('All')}
                        type="button"
                      >
                        All
                      </button>
                      {SPECIALTIES.map((item) => (
                        <button
                          className={selectedSpecialty === item ? 'mini-chip active' : 'mini-chip'}
                          key={item}
                          onClick={() => setSelectedSpecialty(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="filter-note">
                      Inspired by treatment-first discovery and two-step medical journey planners: category, procedure, destination, budget, accreditation, support, hospital, and doctor signals all stay visible while shortlisting.
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>{hospitals.length} matched providers</h3>
                    </div>
                    <div className="list-stack">
                      {hospitals.length === 0 && (
                        <div className="empty-state">
                          <strong>No providers match these filters</strong>
                          <span>Try a wider budget, another destination, or all procedures.</span>
                        </div>
                      )}
                      {hospitals.map((hospital) => (
                        <button
                          className="search-card provider-card"
                          key={hospital.id}
                          onClick={() => openHospital(hospital.id, 'hospital')}
                          type="button"
                        >
                          <img alt={hospital.name} className="card-thumb" src={hospital.image} />
                          <div className="provider-card-copy">
                            <div className="hospital-card-topline">
                              <span className="hospital-chip">{hospital.treatmentType}</span>
                              <span className="hospital-city">{hospital.city}, {hospital.country}</span>
                            </div>
                            <strong>{hospital.name}</strong>
                            <p>{hospital.specialty} - {hospital.valueScore}% value for money</p>
                            <div className="provider-metrics">
                              <span>From {formatCurrency(hospital.packageFrom)}</span>
                              <span>{hospital.rating} rating</span>
                              <span>{hospital.surgeons} doctors</span>
                            </div>
                            <div className="hospital-card-tags">
                              {hospital.procedures.slice(0, 3).map((item) => (
                                <span className="hospital-tag" key={item}>{item}</span>
                              ))}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Doctor listings</h3>
                    </div>
                    <div className="doctor-list">
                      {hospitals.length === 0 && (
                        <div className="empty-state">
                          <strong>No doctors match these filters</strong>
                          <span>Reset destination or support filters to see more specialists.</span>
                        </div>
                      )}
                      {hospitals.map((hospital) => (
                        <button
                          className="doctor-card"
                          key={`${hospital.id}-doctor`}
                          onClick={() => openHospital(hospital.id, 'surgeon')}
                          type="button"
                        >
                          <img alt={hospital.leadSurgeon} src={hospital.surgeonImage} />
                          <div>
                            <strong>{hospital.leadSurgeon}</strong>
                            <p>{hospital.surgeonTitle}</p>
                            <span>{hospital.doctorExperience} - {hospital.name}</span>
                            <div className="provider-metrics compact">
                              <span>{formatCurrency(hospital.doctorFee)} consult</span>
                              <span>{hospital.languages.slice(0, 2).join(', ')}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeScreen === 'hospital' && (
                <div className="screen-view app-scroll">
                  <section
                    className="profile-hero photo-hero"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(14,37,55,0.18), rgba(14,37,55,0.88)), url(${selectedHospital.image})` }}
                  >
                    <p>Hospital profile</p>
                    <h3>{selectedHospital.name}</h3>
                    <span>{selectedHospital.city}, {selectedHospital.country} - {selectedHospital.rating} rating</span>
                  </section>

                  <section className="module-card listing-summary-card">
                    <div className="provider-metrics">
                      <span>From {formatCurrency(selectedHospital.packageFrom)}</span>
                      <span>{selectedHospital.valueScore}% value</span>
                      <span>{selectedHospital.availability}</span>
                    </div>
                    <div className="hospital-card-tags">
                      {selectedHospital.certifications.map((item) => (
                        <span className="hospital-tag" key={item}>{item}</span>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Hospital information</h3>
                    </div>
                    <p className="section-copy">{selectedHospital.intro}</p>
                    <div className="detail-grid">
                      <div>
                        <span>Specialization</span>
                        <strong>{selectedHospital.specialty}</strong>
                      </div>
                      <div>
                        <span>Lead surgeon</span>
                        <strong>{selectedHospital.leadSurgeon}</strong>
                      </div>
                      <div>
                        <span>Associated surgeons</span>
                        <strong>{selectedHospital.surgeons}</strong>
                      </div>
                      <div>
                        <span>Consult path</span>
                        <strong>Request based</strong>
                      </div>
                      <div>
                        <span>Languages</span>
                        <strong>{selectedHospital.languages.join(', ')}</strong>
                      </div>
                      <div>
                        <span>Package from</span>
                        <strong>{formatCurrency(selectedHospital.packageFrom)}</strong>
                      </div>
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Facilities and treatments</h3>
                    </div>
                    <div className="tag-grid">
                      {selectedHospital.procedures.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="tag-grid warm">
                      {selectedHospital.support.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Infrastructure and contact</h3>
                    </div>
                    <div className="detail-grid detail-grid-compact">
                      <div>
                        <span>Facilities</span>
                        <strong>{selectedHospital.facilities[0]}</strong>
                      </div>
                      <div>
                        <span>Contact</span>
                        <strong>{selectedHospital.contact}</strong>
                      </div>
                      <div>
                        <span>Accommodation</span>
                        <strong>{selectedHospital.accommodation}</strong>
                      </div>
                      <div>
                        <span>Response time</span>
                        <strong>{selectedHospital.availability}</strong>
                      </div>
                    </div>
                  </section>

                  <div className="dual-action">
                    <button className="secondary-action" onClick={() => openBookingFlow()} type="button">
                      Book appointment
                    </button>
                    <button className="primary-action" onClick={() => setActiveScreen('surgeon')} type="button">
                      Surgeon profile
                    </button>
                  </div>
                </div>
              )}

              {activeScreen === 'surgeon' && (
                <div className="screen-view app-scroll">
                  <section
                    className="profile-hero surgeon photo-hero"
                    style={{ backgroundImage: `linear-gradient(180deg, rgba(12,56,76,0.22), rgba(12,56,76,0.86)), url(${selectedHospital.surgeonImage})` }}
                  >
                    <p>Surgeon profile</p>
                    <h3>{selectedHospital.leadSurgeon}</h3>
                    <span>{selectedHospital.surgeonTitle}</span>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Professional profile</h3>
                    </div>
                    <div className="detail-grid">
                      <div>
                        <span>Associated hospital</span>
                        <strong>{selectedHospital.name}</strong>
                      </div>
                      <div>
                        <span>Experience</span>
                        <strong>{selectedHospital.doctorExperience}</strong>
                      </div>
                      <div>
                        <span>Qualifications</span>
                        <strong>International certifications</strong>
                      </div>
                      <div>
                        <span>Consultation mode</span>
                        <strong>Video and visit planning</strong>
                      </div>
                      <div>
                        <span>Consultation fee</span>
                        <strong>{formatCurrency(selectedHospital.doctorFee)}</strong>
                      </div>
                      <div>
                        <span>Languages</span>
                        <strong>{selectedHospital.languages.join(', ')}</strong>
                      </div>
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Procedure focus</h3>
                    </div>
                    <div className="tag-grid">
                      {selectedHospital.procedures.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Qualifications and certifications</h3>
                    </div>
                    <div className="journey-list compact">
                      {selectedHospital.certifications.map((item) => (
                        <div className="journey-step" key={item}>
                          <strong>{item}</strong>
                          <p>Supports stronger trust and profile credibility for international patients.</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="dual-action">
                    <button className="secondary-action" onClick={() => openBookingFlow()} type="button">
                      Select ailment flow
                    </button>
                    <button className="primary-action" onClick={() => setActiveScreen('request')} type="button">
                      Request consultation
                    </button>
                  </div>
                </div>
              )}

              {activeScreen === 'video' && (
                <div className="screen-view app-scroll">
                  {!isLoggedIn ? (
                    <section className="module-card auth-gate">
                      <p>Live call</p>
                      <h3>Login first to join video consultation.</h3>
                      <span>Use the patient auth bottom sheet to access your live room and appointments.</span>
                      <button className="primary-action" onClick={() => setAuthSheetOpen(true)} type="button">
                        Open auth bottom sheet
                      </button>
                    </section>
                  ) : (
                    <>
                      <section className="profile-hero video-hero">
                        <p>Live consultation</p>
                        <h3>Dr. {selectedHospital.leadSurgeon.replace('Dr. ', '')}</h3>
                        <span>{appointmentSlot} · {selectedAilment}</span>
                      </section>

                      <section className="call-stage">
                        <div className="call-window remote">
                          <span className="call-chip">Doctor live</span>
                          <strong>{selectedHospital.leadSurgeon}</strong>
                          <p>{selectedHospital.surgeonTitle}</p>
                        </div>
                        <div className="call-window self">
                          <span className="call-chip muted">You</span>
                          <strong>{patientProfile.name}</strong>
                          <p>{cameraEnabled ? 'Camera on' : 'Camera off'}</p>
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Call controls</h3>
                        </div>
                        <div className="control-row">
                          <button className={callMuted ? 'control-chip active' : 'control-chip'} onClick={() => setCallMuted((value) => !value)} type="button">
                            {callMuted ? 'Unmute' : 'Mute'}
                          </button>
                          <button className={cameraEnabled ? 'control-chip active' : 'control-chip'} onClick={() => setCameraEnabled((value) => !value)} type="button">
                            {cameraEnabled ? 'Camera on' : 'Camera off'}
                          </button>
                          <button className="control-chip" onClick={() => setActiveScreen('support')} type="button">
                            Request support
                          </button>
                        </div>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Appointment details</h3>
                        </div>
                        <div className="detail-grid">
                          <div>
                            <span>Hospital</span>
                            <strong>{selectedHospital.name}</strong>
                          </div>
                          <div>
                            <span>Ailment flow</span>
                            <strong>{selectedAilment}</strong>
                          </div>
                          <div>
                            <span>Coordinator</span>
                            <strong>Support desk online</strong>
                          </div>
                          <div>
                            <span>Chat escalation</span>
                            <strong>Available during call</strong>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </div>
              )}

              {activeScreen === 'support' && (
                <div className="screen-view app-scroll">
                  {!isLoggedIn ? (
                    <section className="module-card auth-gate">
                      <p>Support</p>
                      <h3>Login first to send support requests and open chat.</h3>
                      <span>After login, patients can raise payment issues, booking issues, and call issues.</span>
                      <button className="primary-action" onClick={() => setAuthSheetOpen(true)} type="button">
                        Open auth bottom sheet
                      </button>
                    </section>
                  ) : (
                    <>
                      <section className="request-hero support-hero">
                        <p>Support and chat request</p>
                        <h3>Talk to the patient support team</h3>
                        <span>Use chat for booking help, payment support, report upload issues, and live call escalation.</span>
                      </section>

                      <section className="module-card">
                        <div className="section-heading">
                          <h3>Live support chat</h3>
                        </div>
                        <div className="chat-thread">
                          {SUPPORT_MESSAGES.map((message) => (
                            <div className={message.side === 'me' ? 'chat-bubble me' : 'chat-bubble'} key={message.id}>
                              {message.text}
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="module-card form-card">
                        <label>
                          Support topic
                          <select onChange={(event) => setSupportTopic(event.target.value)} value={supportTopic}>
                            {SUPPORT_TOPICS.map((topic) => (
                              <option key={topic}>{topic}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Request details
                          <textarea onChange={(event) => setSupportRequest(event.target.value)} rows="4" value={supportRequest} />
                        </label>
                        <div className="dual-action">
                          <button className="secondary-action" onClick={() => setActiveScreen('video')} type="button">
                            Back to live call
                          </button>
                          <button className="primary-action" type="button">
                            Send support request
                          </button>
                        </div>
                      </section>
                    </>
                  )}
                </div>
              )}

              {activeScreen === 'cost' && (
                <div className="screen-view app-scroll">
                  <section className="cost-hero">
                    <p>Cost transparency system</p>
                    <h3>{formatCurrency(totalCost)}</h3>
                    <span>Total estimated medical travel cost for {selectedHospital.name}</span>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Trip planning</h3>
                    </div>
                    <label className="range-label">
                      <span>Stay duration: {tripNights} nights</span>
                      <input
                        max="14"
                        min="3"
                        onChange={(event) => setTripNights(Number(event.target.value))}
                        type="range"
                        value={tripNights}
                      />
                    </label>
                    <label className="check-line">
                      <input
                        checked={withCompanion}
                        onChange={(event) => setWithCompanion(event.target.checked)}
                        type="checkbox"
                      />
                      Add companion support estimate
                    </label>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Cost breakdown</h3>
                    </div>
                    <div className="cost-list">
                      <div><span>Treatment estimate</span><strong>{formatCurrency(selectedHospital.cost.treatment)}</strong></div>
                      <div><span>Flight charges</span><strong>{formatCurrency(selectedHospital.cost.flight)}</strong></div>
                      <div><span>Visa and documentation</span><strong>{formatCurrency(selectedHospital.cost.visa)}</strong></div>
                      <div><span>Local transport</span><strong>{formatCurrency(selectedHospital.cost.local)}</strong></div>
                      <div><span>Accommodation</span><strong>{formatCurrency(stayCost)}</strong></div>
                      <div><span>Other service charges</span><strong>{formatCurrency(selectedHospital.cost.other)}</strong></div>
                      {withCompanion && (
                        <div><span>Companion support</span><strong>{formatCurrency(companionCost)}</strong></div>
                      )}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Payment section</h3>
                    </div>
                    <div className="payment-panel">
                      <div>
                        <span>Current due</span>
                        <strong>{formatCurrency(pendingPayment)}</strong>
                      </div>
                      <button className="mini-chip active" onClick={() => openProtectedScreen('patient')} type="button">
                        Open patient area
                      </button>
                    </div>
                    <div className="filter-note">
                      Payment can unlock final confirmation, report processing, and video appointment readiness.
                    </div>
                  </section>
                </div>
              )}

              {activeScreen === 'request' && (
                <div className="screen-view app-scroll">
                  <section className="request-hero">
                    <p>Consultation request</p>
                    <h3>Send your case to {selectedHospital.name}</h3>
                    <span>Structured intake for consultation, visit scheduling, and treatment inquiry.</span>
                  </section>

                  <section className="module-card ailment-summary">
                    <div className="section-heading">
                      <h3>Book an appointment flow</h3>
                      <button className="mini-chip active" onClick={() => openBookingFlow()} type="button">
                        Change
                      </button>
                    </div>
                    <div className="detail-grid">
                      <div>
                        <span>Surgical category</span>
                        <strong>{selectedBookingCategory.title}</strong>
                      </div>
                      <div>
                        <span>Selected ailment</span>
                        <strong>{selectedAilment}</strong>
                      </div>
                    </div>
                  </section>

                  <section className="module-card form-card">
                    <label>
                      Consultation type
                      <select onChange={(event) => setRequestMode(event.target.value)} value={requestMode}>
                        <option>Video consultation</option>
                        <option>Doctor visit request</option>
                        <option>Treatment inquiry</option>
                      </select>
                    </label>
                    <label>
                      Patient name
                      <input defaultValue={patientProfile.name} />
                    </label>
                    <label>
                      Country
                      <input defaultValue={patientProfile.country} />
                    </label>
                    <label>
                      Medical information
                      <textarea defaultValue={`Need support for ${selectedAilment} consultation and a full travel estimate before booking.`} rows="4" />
                    </label>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Request flow</h3>
                    </div>
                    <div className="journey-list compact">
                      {REQUEST_STEPS.map((step, index) => (
                        <div className="journey-step" key={step}>
                          <strong>{String(index + 1).padStart(2, '0')} {step}</strong>
                          <p>Structured for easier response and conversion from hospital and surgeon teams.</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="module-card">
                    <div className="section-heading">
                      <h3>Request summary</h3>
                    </div>
                    <div className="detail-grid">
                      <div>
                        <span>Hospital</span>
                        <strong>{selectedHospital.name}</strong>
                      </div>
                      <div>
                        <span>Lead surgeon</span>
                        <strong>{selectedHospital.leadSurgeon}</strong>
                      </div>
                      <div>
                        <span>Mode</span>
                        <strong>{requestMode}</strong>
                      </div>
                      <div>
                        <span>Ailment</span>
                        <strong>{selectedAilment}</strong>
                      </div>
                    </div>
                  </section>

                  <div className="dual-action">
                    <button className="secondary-action" onClick={() => openProtectedScreen('support')} type="button">
                      Need help?
                    </button>
                    <button className="primary-action" onClick={() => setActiveScreen('cost')} type="button">
                      Review cost before submit
                    </button>
                  </div>
                </div>
              )}
            </div>

            {activeScreen !== 'intro' && (
              <nav className="bottom-nav">
                <button className={activeScreen === 'home' ? 'active' : ''} onClick={() => setActiveScreen('home')} type="button">
                  <HomeIcon />
                  <span>Home</span>
                </button>
                <button className={activeScreen === 'patient' ? 'active' : ''} onClick={() => openProtectedScreen('patient')} type="button">
                  <PatientIcon />
                  <span>Patient</span>
                </button>
                <button className={activeScreen === 'video' ? 'active' : ''} onClick={() => openProtectedScreen('video')} type="button">
                  <VideoIcon />
                  <span>Video</span>
                </button>
                <button className={activeScreen === 'support' ? 'active' : ''} onClick={() => openProtectedScreen('support')} type="button">
                  <SupportIcon />
                  <span>Support</span>
                </button>
              </nav>
            )}

            {servicesDrawerOpen && (
              <div className="sheet-backdrop drawer-backdrop" onClick={() => setServicesDrawerOpen(false)} role="presentation">
                <aside className="services-drawer" onClick={(event) => event.stopPropagation()} role="presentation">
                  <div className="drawer-header">
                    <div>
                      <p>{BRAND_NAME}</p>
                      <h3>Browse services</h3>
                    </div>
                    <button className="drawer-close" onClick={() => setServicesDrawerOpen(false)} type="button">
                      ×
                    </button>
                  </div>

                  <div className="drawer-section">
                    <details open>
                      <summary>Hospitals by city</summary>
                      <div className="drawer-list">
                        {cities.map((city) => (
                          <button className="drawer-item" key={city} onClick={() => setServicesDrawerOpen(false)} type="button">
                            {city}
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>

                  <div className="drawer-section">
                    <details>
                      <summary>Hospitals by disease</summary>
                      <div className="drawer-list nested">
                        {BOOKING_CATEGORIES.map((category) => (
                          <details className="drawer-nested" key={category.id}>
                            <summary>{category.title}</summary>
                            <div className="drawer-list">
                              {category.ailments.map((ailment) => (
                                <button
                                  className="drawer-item"
                                  key={ailment}
                                  onClick={() => {
                                    setSelectedBookingCategoryId(category.id);
                                    setSelectedAilment(ailment);
                                    setServicesDrawerOpen(false);
                                    setActiveScreen('request');
                                  }}
                                  type="button"
                                >
                                  {ailment}
                                </button>
                              ))}
                            </div>
                          </details>
                        ))}
                      </div>
                    </details>
                  </div>

                  <div className="drawer-section">
                    <details>
                      <summary>Hospital directory</summary>
                      <div className="drawer-list">
                        {HOSPITALS.map((hospital) => (
                          <button
                            className="drawer-item hospital"
                            key={hospital.id}
                            onClick={() => {
                              openHospital(hospital.id, 'hospital');
                              setServicesDrawerOpen(false);
                            }}
                            type="button"
                          >
                            <strong>{hospital.name}</strong>
                            <span>{hospital.city}, {hospital.country}</span>
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>
                </aside>
              </div>
            )}

            {authSheetOpen && (
              <div className="sheet-backdrop" onClick={() => setAuthSheetOpen(false)} role="presentation">
                <div className="bottom-sheet auth-sheet" onClick={(event) => event.stopPropagation()} role="presentation">
                  <div className="sheet-handle" />
                  <div className="sheet-header">
                    <p>Patient authentication</p>
                    <h3>Continue to bookings, payments, live calls, and support.</h3>
                  </div>
                  <div className="mode-switch">
                    {['Patient', 'Attendant'].map((role) => (
                      <button
                        className={authRole === role ? 'mode-pill active' : 'mode-pill'}
                        key={role}
                        onClick={() => setAuthRole(role)}
                        type="button"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <form className="sheet-form" onSubmit={handleAuthSubmit}>
                    <label>
                      Full name
                      <input onChange={(event) => updatePatientProfile('name', event.target.value)} value={patientProfile.name} />
                    </label>
                    <label>
                      Email
                      <input onChange={(event) => updatePatientProfile('email', event.target.value)} type="email" value={patientProfile.email} />
                    </label>
                    <label>
                      Country
                      <input onChange={(event) => updatePatientProfile('country', event.target.value)} value={patientProfile.country} />
                    </label>
                    <div className="sheet-note">Role: {authRole}. This demo opens the patient area right after login.</div>
                    <div className="dual-action">
                      <button className="secondary-action" onClick={() => setAuthSheetOpen(false)} type="button">
                        Cancel
                      </button>
                      <button className="primary-action" type="submit">
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {bookingSheetOpen && (
              <div className="sheet-backdrop" onClick={closeBookingFlow} role="presentation">
                <div className="bottom-sheet booking-sheet" onClick={(event) => event.stopPropagation()} role="presentation">
                  <div className="sheet-handle" />

                  {bookingSheetStep === 'category' && (
                    <>
                      <div className="sheet-header">
                        <p>Book your consultation today</p>
                        <h3>Select your surgical ailment</h3>
                      </div>
                      <div className="ailment-list">
                        {BOOKING_CATEGORIES.map((category) => (
                          <button className="ailment-row" key={category.id} onClick={() => handleBookingCategorySelect(category.id)} type="button">
                            <span className="ailment-icon">{category.short}</span>
                            <span className="ailment-copy">
                              <strong>{category.title}</strong>
                              <small>{category.subtitle}</small>
                            </span>
                            <span className="ailment-arrow">›</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {bookingSheetStep === 'ailment' && (
                    <>
                      <div className="sheet-header compact">
                        <button className="sheet-back-button" onClick={() => setBookingSheetStep('category')} type="button">
                          ←
                        </button>
                        <div>
                          <p>Select your ailment</p>
                          <h3>Showing {selectedBookingCategory.ailments.length} {selectedBookingCategory.subtitle} ailments</h3>
                        </div>
                        <span className="ailment-icon small">{selectedBookingCategory.short}</span>
                      </div>
                      <div className="ailment-option-list">
                        {selectedBookingCategory.ailments.map((ailment) => (
                          <button className="ailment-option" key={ailment} onClick={() => confirmAilmentSelection(ailment)} type="button">
                            <span className="ailment-icon">{selectedBookingCategory.short}</span>
                            <span className="ailment-copy">
                              <strong>{ailment}</strong>
                              <small>{selectedBookingCategory.subtitle}</small>
                            </span>
                            <span className={selectedAilment === ailment ? 'option-radio active' : 'option-radio'} />
                          </button>
                        ))}
                        <button className="more-ailments" onClick={() => setBookingSheetStep('category')} type="button">
                          Can&apos;t find? See all surgical ailments
                          <span>›</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
