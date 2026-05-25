import React, { useEffect, useMemo, useState } from 'react';

const BRAND_NAME = 'SavvySurgeon';

const TREATMENT_GROUPS = ['Medical', 'Aesthetic', 'Wellness'];

const TREATMENTS = [
  { id: 'cardiac', group: 'Medical', title: 'Cardiac Sciences', icon: 'CS', packageFrom: 500, value: 94, specialty: 'Cardiac Surgery' },
  { id: 'orthopedics', group: 'Medical', title: 'Orthopedics', icon: 'OR', packageFrom: 2200, value: 94, specialty: 'Orthopedics' },
  { id: 'oncology', group: 'Medical', title: 'Oncology', icon: 'ON', packageFrom: 600, value: 90, specialty: 'Oncology' },
  { id: 'spine', group: 'Medical', title: 'Spine Surgery', icon: 'SP', packageFrom: 4000, value: 90, specialty: 'Orthopedics' },
  { id: 'urology', group: 'Medical', title: 'Urology', icon: 'UR', packageFrom: 3000, value: 92, specialty: 'Orthopedics' },
  { id: 'infertility', group: 'Medical', title: 'Infertility', icon: 'IF', packageFrom: 2000, value: 94, specialty: 'Oncology' },
  { id: 'hair', group: 'Aesthetic', title: 'Hair Transplant', icon: 'HT', packageFrom: 2000, value: 95, specialty: 'Orthopedics' },
  { id: 'dental', group: 'Aesthetic', title: 'Dental Treatment', icon: 'DN', packageFrom: 1000, value: 91, specialty: 'Cardiac Surgery' },
  { id: 'plastic', group: 'Aesthetic', title: 'Plastic Surgery', icon: 'PS', packageFrom: 2000, value: 95, specialty: 'Orthopedics' },
  { id: 'wellness', group: 'Wellness', title: 'Health and Wellness', icon: 'HW', packageFrom: 200, value: 95, specialty: 'Cardiac Surgery' },
  { id: 'neuro-wellness', group: 'Wellness', title: 'Neuro-Wellness', icon: 'NW', packageFrom: 400, value: 94, specialty: 'Oncology' },
  { id: 'ophthalmology', group: 'Medical', title: 'Ophthalmology', icon: 'OP', packageFrom: 600, value: 95, specialty: 'Ophthalmology' },
];

const TREATMENT_IMAGES = {
  cardiac: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=800&q=80',
  orthopedics: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  oncology: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
  spine: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80',
  urology: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80',
  infertility: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
  hair: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
  dental: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
  plastic: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  wellness: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  'neuro-wellness': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
  ophthalmology: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
};

const HOSPITALS = [
  {
    id: 'apollo',
    name: 'Apollo Heart and Multispeciality',
    city: 'Chennai',
    country: 'India',
    specialty: 'Cardiac Surgery',
    rating: '4.9',
    doctors: 18,
    value: 92,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cardiac Sciences', 'Dental Treatment', 'Health and Wellness'],
    doctor: 'Dr. Anika Raman',
    doctorTitle: 'Cardiothoracic Surgeon',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    doctorFee: 45,
    experience: '18 years',
    cost: { package: 500, flight: 650, visa: 85, local: 140, stay: 432, service: 180 },
    established: 1983,
    beds: 720,
    icuBeds: 96,
    operatingRooms: 18,
    accreditations: ['JCI aligned workflow', 'NABH care standards', 'International patient desk'],
    languages: ['English', 'Hindi', 'Arabic'],
    infrastructure: ['Hybrid cath lab', 'Cardiac ICU recovery', 'Digital records review', 'Family stay partners'],
    doctorFocus: ['CABG', 'Valve repair', 'Angioplasty', 'Heart failure care'],
  },
  {
    id: 'mednova',
    name: 'MedNova Surgical Center',
    city: 'Istanbul',
    country: 'Turkey',
    specialty: 'Orthopedics',
    rating: '4.8',
    doctors: 11,
    value: 93,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    tags: ['Orthopedics', 'Spine Surgery', 'Urology', 'Hair Transplant', 'Plastic Surgery'],
    doctor: 'Dr. Selim Kara',
    doctorTitle: 'Joint Replacement Specialist',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
    doctorFee: 60,
    experience: '16 years',
    cost: { package: 2200, flight: 820, visa: 40, local: 160, stay: 564, service: 220 },
    established: 2008,
    beds: 340,
    icuBeds: 42,
    operatingRooms: 12,
    accreditations: ['International mobility rehab', 'Joint replacement excellence', 'Sports injury pathway'],
    languages: ['English', 'Turkish', 'Russian'],
    infrastructure: ['Robotic operating theatre', 'Dedicated rehab floor', 'Recovery suites', 'Interpreter service'],
    doctorFocus: ['Knee replacement', 'Hip replacement', 'Spine stabilization', 'Sports injury repair'],
  },
  {
    id: 'lotus',
    name: 'Lotus Oncology Institute',
    city: 'Singapore',
    country: 'Singapore',
    specialty: 'Oncology',
    rating: '4.9',
    doctors: 9,
    value: 95,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    tags: ['Oncology', 'Infertility', 'Neuro-Wellness'],
    doctor: 'Dr. Mei Tan',
    doctorTitle: 'Surgical Oncologist',
    doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
    doctorFee: 80,
    experience: '20 years',
    cost: { package: 600, flight: 930, visa: 30, local: 180, stay: 780, service: 260 },
    established: 1997,
    beds: 410,
    icuBeds: 58,
    operatingRooms: 14,
    accreditations: ['Oncology center accreditation', 'Tumor board program', 'Global second opinion desk'],
    languages: ['English', 'Mandarin', 'Malay'],
    infrastructure: ['Tumor board room', 'Private infusion suites', 'PET-CT planning', 'Tele follow-up desk'],
    doctorFocus: ['Breast oncology', 'GI oncology', 'Surgical oncology', 'Second opinion review'],
  },
  {
    id: 'sight-avenue',
    name: 'The Sight Avenue',
    city: 'New Delhi',
    country: 'India',
    specialty: 'Ophthalmology',
    rating: '5.0',
    doctors: 14,
    value: 95,
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ophthalmology', 'Health and Wellness'],
    doctor: 'Dr. Suraj Munjal',
    doctorTitle: 'Medical Director - Ophthalmology',
    doctorImage: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80',
    doctorFee: 55,
    experience: '17+ years',
    cost: { package: 600, flight: 520, visa: 85, local: 120, stay: 380, service: 160 },
    established: 2018,
    beds: 80,
    icuBeds: 12,
    operatingRooms: 6,
    accreditations: ['Ophthalmology excellence program', 'International patient desk', 'Digital diagnostics pathway'],
    languages: ['English', 'Hindi', 'Arabic'],
    infrastructure: ['Modular eye OT', 'Cornea diagnostics', 'Laser vision suite', 'Retina imaging'],
    doctorFocus: ['Cornea transplant', 'Glaucoma eye', 'Lazy eye', 'Laser eye surgery'],
  },
];

HOSPITALS.push(
  {
    id: 'bangkok-recovery',
    name: 'Bangkok Recovery Hospital',
    city: 'Bangkok',
    country: 'Thailand',
    specialty: 'Plastic Surgery',
    rating: '4.7',
    doctors: 21,
    value: 91,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Plastic Surgery', 'Hair Transplant', 'Health and Wellness'],
    doctor: 'Dr. Narin Sopa',
    doctorTitle: 'Aesthetic & Reconstructive Surgeon',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80',
    doctorFee: 50,
    experience: '15 years',
    cost: { package: 2000, flight: 760, visa: 45, local: 120, stay: 620, service: 180 },
    established: 2011,
    beds: 220,
    icuBeds: 26,
    operatingRooms: 8,
    accreditations: ['Cosmetic care board', 'International patient desk', 'Recovery stay pathway'],
    languages: ['English', 'Thai', 'Arabic'],
    infrastructure: ['Aesthetic OT', 'Recovery suites', 'Wellness rehab floor', 'Medical concierge'],
    doctorFocus: ['Rhinoplasty', 'Body contouring', 'Hair restoration', 'Scar revision'],
  },
  {
    id: 'istanbul-hair',
    name: 'Istanbul Hair & Aesthetic Center',
    city: 'Istanbul',
    country: 'Turkey',
    specialty: 'Hair Transplant',
    rating: '4.8',
    doctors: 16,
    value: 94,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hair Transplant', 'Plastic Surgery'],
    doctor: 'Dr. Elif Aydin',
    doctorTitle: 'Hair Restoration Specialist',
    doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
    doctorFee: 40,
    experience: '12 years',
    cost: { package: 2000, flight: 820, visa: 40, local: 130, stay: 480, service: 150 },
    established: 2014,
    beds: 90,
    icuBeds: 8,
    operatingRooms: 5,
    accreditations: ['Hair restoration program', 'International patient desk', 'Digital follow-up'],
    languages: ['English', 'Turkish', 'Russian'],
    infrastructure: ['FUE labs', 'Graft planning room', 'Recovery lounge', 'Photo follow-up studio'],
    doctorFocus: ['FUE transplant', 'DHI transplant', 'Beard transplant', 'Hairline design'],
  },
  {
    id: 'delhi-spine',
    name: 'Delhi Spine & Ortho Institute',
    city: 'New Delhi',
    country: 'India',
    specialty: 'Orthopedics',
    rating: '4.8',
    doctors: 22,
    value: 93,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80',
    tags: ['Orthopedics', 'Spine Surgery', 'Health and Wellness'],
    doctor: 'Dr. Kavya Mehra',
    doctorTitle: 'Spine & Joint Replacement Surgeon',
    doctorImage: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80',
    doctorFee: 38,
    experience: '19 years',
    cost: { package: 2600, flight: 520, visa: 85, local: 110, stay: 390, service: 150 },
    established: 2005,
    beds: 310,
    icuBeds: 34,
    operatingRooms: 9,
    accreditations: ['Spine excellence pathway', 'NABH care standards', 'International rehab desk'],
    languages: ['English', 'Hindi', 'Arabic'],
    infrastructure: ['Navigation spine OT', 'Rehab gym', 'Pain clinic', 'Robotic joint suite'],
    doctorFocus: ['Spine stabilization', 'Knee replacement', 'Hip replacement', 'Pain management'],
  },
  {
    id: 'singapore-fertility',
    name: 'Singapore Fertility & Women Center',
    city: 'Singapore',
    country: 'Singapore',
    specialty: 'Infertility',
    rating: '4.9',
    doctors: 13,
    value: 92,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    tags: ['Infertility', 'Health and Wellness'],
    doctor: 'Dr. Aisha Lim',
    doctorTitle: 'Fertility Medicine Specialist',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    doctorFee: 90,
    experience: '14 years',
    cost: { package: 2500, flight: 930, visa: 30, local: 170, stay: 740, service: 230 },
    established: 2009,
    beds: 120,
    icuBeds: 10,
    operatingRooms: 5,
    accreditations: ['Embryology lab standards', 'Patient counseling desk', 'Women health program'],
    languages: ['English', 'Mandarin', 'Malay'],
    infrastructure: ['IVF lab', 'Embryology suite', 'Counseling rooms', 'Day care unit'],
    doctorFocus: ['IVF', 'ICSI', 'Fertility preservation', 'Hormonal treatment'],
  },
  {
    id: 'dubai-urology',
    name: 'Dubai UroCare Hospital',
    city: 'Dubai',
    country: 'UAE',
    specialty: 'Urology',
    rating: '4.7',
    doctors: 17,
    value: 90,
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=80',
    tags: ['Urology', 'General Medicine'],
    doctor: 'Dr. Omar Rahman',
    doctorTitle: 'Urology & Robotic Surgery Consultant',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
    doctorFee: 85,
    experience: '18 years',
    cost: { package: 3000, flight: 700, visa: 90, local: 180, stay: 820, service: 260 },
    established: 2012,
    beds: 260,
    icuBeds: 32,
    operatingRooms: 7,
    accreditations: ['Robotic surgery program', 'International patient services', 'Urology excellence desk'],
    languages: ['English', 'Arabic', 'Hindi'],
    infrastructure: ['Robotic OT', 'Stone clinic', 'Dialysis support', 'Executive suites'],
    doctorFocus: ['Kidney stones', 'Prostate surgery', 'Robotic urology', 'Uro-oncology'],
  },
  {
    id: 'seoul-dental',
    name: 'Seoul Smile Dental Hospital',
    city: 'Seoul',
    country: 'South Korea',
    specialty: 'Dental Treatment',
    rating: '4.8',
    doctors: 19,
    value: 91,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
    tags: ['Dental Treatment', 'Plastic Surgery'],
    doctor: 'Dr. Hana Kim',
    doctorTitle: 'Implant & Smile Design Specialist',
    doctorImage: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?auto=format&fit=crop&w=900&q=80',
    doctorFee: 65,
    experience: '13 years',
    cost: { package: 1000, flight: 980, visa: 55, local: 160, stay: 690, service: 200 },
    established: 2015,
    beds: 70,
    icuBeds: 4,
    operatingRooms: 4,
    accreditations: ['Digital smile design', 'Implant center', 'International dental desk'],
    languages: ['English', 'Korean', 'Japanese'],
    infrastructure: ['3D dental lab', 'Implant suite', 'Smile design studio', 'Sedation support'],
    doctorFocus: ['Dental implants', 'Veneers', 'Smile design', 'Full mouth rehab'],
  },
  {
    id: 'mumbai-wellness',
    name: 'Mumbai Wellness & Preventive Care',
    city: 'Mumbai',
    country: 'India',
    specialty: 'Health and Wellness',
    rating: '4.6',
    doctors: 28,
    value: 95,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    tags: ['Health and Wellness', 'Neuro-Wellness', 'General Medicine'],
    doctor: 'Dr. Rohan Shah',
    doctorTitle: 'Preventive Medicine Physician',
    doctorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
    doctorFee: 30,
    experience: '11 years',
    cost: { package: 200, flight: 520, visa: 85, local: 90, stay: 320, service: 120 },
    established: 2017,
    beds: 160,
    icuBeds: 16,
    operatingRooms: 3,
    accreditations: ['Preventive health program', 'Executive screening desk', 'Rehab care pathway'],
    languages: ['English', 'Hindi', 'Arabic'],
    infrastructure: ['Screening lab', 'Wellness gym', 'Nutrition rooms', 'Rehab studio'],
    doctorFocus: ['Executive checkup', 'Neuro wellness', 'Lifestyle medicine', 'Rehab planning'],
  },
  {
    id: 'madrid-quiron',
    name: 'QuironSalud International Hospital',
    city: 'Madrid',
    country: 'Spain',
    specialty: 'General Medicine',
    rating: '4.9',
    doctors: 35,
    value: 92,
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80',
    tags: ['General Medicine', 'Cardiac Sciences', 'Oncology', 'Orthopedics'],
    doctor: 'Dr. Elena Garcia',
    doctorTitle: 'International Patient Care Consultant',
    doctorImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80',
    doctorFee: 95,
    experience: '21 years',
    cost: { package: 1800, flight: 1100, visa: 90, local: 210, stay: 900, service: 290 },
    established: 1955,
    beds: 850,
    icuBeds: 110,
    operatingRooms: 22,
    accreditations: ['European hospital group', 'International patient program', 'Advanced diagnostics pathway'],
    languages: ['English', 'Spanish', 'French'],
    infrastructure: ['Advanced imaging', 'Hybrid OTs', 'Private suites', 'International lounge'],
    doctorFocus: ['Second opinion', 'Diagnostics', 'Complex surgery', 'Family care planning'],
  },
);

HOSPITALS.push(
  ...[
    ['toronto-cardiac', 'Toronto Heart Institute', 'Toronto', 'Canada', 'Cardiac Surgery', 'Dr. Liam Carter', 'Interventional Cardiologist', 'Cardiac Sciences'],
    ['london-cancer', 'London Precision Oncology Centre', 'London', 'United Kingdom', 'Oncology', 'Dr. Amelia Brooks', 'Medical Oncologist', 'Oncology'],
    ['berlin-ortho', 'Berlin Joint & Mobility Clinic', 'Berlin', 'Germany', 'Orthopedics', 'Dr. Lukas Weber', 'Orthopedic Trauma Surgeon', 'Orthopedics'],
    ['riyadh-spine', 'Riyadh Advanced Spine Hospital', 'Riyadh', 'Saudi Arabia', 'Spine Surgery', 'Dr. Noor Al Saud', 'Minimally Invasive Spine Surgeon', 'Spine Surgery'],
    ['doha-women', 'Doha Women & Fertility Hospital', 'Doha', 'Qatar', 'Infertility', 'Dr. Leena Faris', 'Reproductive Medicine Consultant', 'Infertility'],
    ['kuala-lumpur-dental', 'KL Digital Dental Center', 'Kuala Lumpur', 'Malaysia', 'Dental Treatment', 'Dr. Aaron Tan', 'Cosmetic Dentist', 'Dental Treatment'],
    ['vienna-urology', 'Vienna Robotic Urology Clinic', 'Vienna', 'Austria', 'Urology', 'Dr. Sofia Klein', 'Robotic Urology Surgeon', 'Urology'],
    ['lisbon-wellness', 'Lisbon Neuro Wellness Center', 'Lisbon', 'Portugal', 'Neuro-Wellness', 'Dr. Mateo Silva', 'Neuro Rehabilitation Specialist', 'Neuro-Wellness'],
    ['bangalore-eye', 'Bangalore Vision Super Specialty', 'Bangalore', 'India', 'Ophthalmology', 'Dr. Priya Nair', 'Retina & Cataract Surgeon', 'Ophthalmology'],
    ['paris-aesthetic', 'Paris Aesthetic Surgery Institute', 'Paris', 'France', 'Plastic Surgery', 'Dr. Claire Moreau', 'Plastic & Reconstructive Surgeon', 'Plastic Surgery'],
  ].map(([id, name, city, country, specialty, doctor, doctorTitle, tag], index) => ({
    id,
    name,
    city,
    country,
    specialty,
    rating: index % 3 === 0 ? '4.9' : '4.8',
    doctors: 12 + index,
    value: 90 + (index % 6),
    image: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    ][index % 4],
    tags: [tag, 'Health and Wellness', 'General Medicine'],
    doctor,
    doctorTitle,
    doctorImage: [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80',
    ][index % 4],
    doctorFee: 45 + index * 5,
    experience: `${10 + index} years`,
    cost: { package: 900 + index * 260, flight: 650 + index * 45, visa: 40 + index * 5, local: 120 + index * 12, stay: 420 + index * 38, service: 160 + index * 12 },
    established: 1998 + index,
    beds: 160 + index * 45,
    icuBeds: 18 + index * 4,
    operatingRooms: 5 + (index % 8),
    accreditations: ['International patient program', 'Specialty excellence pathway', 'Digital care coordination'],
    languages: ['English', 'Arabic', 'Spanish'],
    infrastructure: ['Advanced diagnostics', 'Private recovery suites', 'International desk', 'Tele follow-up'],
    doctorFocus: [tag, 'Second opinion', 'Procedure planning', 'Recovery support'],
  })),
);

const DESTINATIONS = [
  {
    country: 'India',
    line: 'Advanced hospitals, high-volume surgeons, and value-driven care.',
    packageFrom: 500,
    hospitals: 180,
    doctors: 240,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    country: 'Turkey',
    line: 'Popular for orthopedics, cosmetic care, hair restoration, and recovery stays.',
    packageFrom: 2200,
    hospitals: 95,
    doctors: 130,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    country: 'Singapore',
    line: 'Premium oncology, second opinions, and coordinated family support.',
    packageFrom: 600,
    hospitals: 48,
    doctors: 90,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    country: 'Thailand',
    line: 'Comfort-led recovery, wellness programs, and cosmetic treatment packages.',
    packageFrom: 1000,
    hospitals: 76,
    doctors: 115,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
  },
];

const WHY_US = [
  ['Transparent service scope', 'See what is included in the hospital quote, travel plan, stay, and care support.'],
  ['Dedicated expert', 'A coordinator helps with reports, hospital quote, visa, hotel, and pickup.'],
  ['Cost comparison', 'See package, travel, visa, local transport, stay, and service estimate.'],
  ['Doctor confidence', 'Compare specialty, experience, consultation fee, and hospital association.'],
];

const CURRENCIES = {
  USD: { code: 'USD', rate: 1 },
  INR: { code: 'INR', rate: 83 },
  AED: { code: 'AED', rate: 3.67 },
  EUR: { code: 'EUR', rate: 0.92 },
};

const FEATURED_TREATMENTS = [
  {
    id: 'orthopedics',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    description: 'Joint replacement, spine support, sports injury care, rehab planning, and recovery stay estimates.',
  },
  {
    id: 'cardiac',
    image: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1000&q=80',
    description: 'Cardiac surgery, angioplasty, second opinion, ICU planning, and family stay budget comparison.',
  },
  {
    id: 'oncology',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80',
    description: 'Cancer surgery, diagnostics, chemo coordination, pathology review, and doctor-led treatment options.',
  },
  {
    id: 'hair',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    description: 'Hair transplant packages with graft estimate, hotel, pickup, medication, and follow-up visibility.',
  },
];

function formatCurrency(value, currency = 'USD') {
  const current = CURRENCIES[currency] ?? CURRENCIES.USD;
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: current.code,
    maximumFractionDigits: 0,
  }).format(value * current.rate);
}

function totalCost(hospital, treatment) {
  const packageCost = treatment && hospital.tags.includes(treatment.title) ? treatment.packageFrom : hospital.cost.package;
  return packageCost + hospital.cost.flight + hospital.cost.visa + hospital.cost.local + hospital.cost.stay + hospital.cost.service;
}

function getTreatmentImage(treatment) {
  return TREATMENT_IMAGES[treatment.id] ?? TREATMENT_IMAGES.wellness;
}

function StarRating({ rating }) {
  return (
    <span className="star-rating" aria-label={`${rating} star rating`}>
      <span>*****</span>
      <strong>{rating}</strong>
    </span>
  );
}

const SEARCH_ALIASES = {
  cardiac: ['cariac', 'heart', 'cardiology', 'bypass', 'cabg', 'angioplasty'],
  orthopedics: ['ortho', 'bone', 'joint', 'knee', 'hip', 'arthritis'],
  oncology: ['cancer', 'tumor', 'chemo', 'radiation'],
  spine: ['back pain', 'disc', 'spinal', 'neck pain'],
  urology: ['kidney', 'stone', 'prostate', 'urine'],
  infertility: ['ivf', 'fertility', 'pregnancy'],
  hair: ['hair loss', 'baldness', 'graft'],
  dental: ['teeth', 'implant', 'smile'],
  plastic: ['cosmetic', 'aesthetic', 'rhinoplasty'],
  ophthalmology: ['eye', 'cataract', 'lasik', 'retina'],
};

function normalizeSearch(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getSearchOptions(query) {
  const search = normalizeSearch(query);
  if (!search) return [];

  const options = [];
  TREATMENTS.forEach((treatment) => {
    const aliases = SEARCH_ALIASES[treatment.id] ?? [];
    const haystack = normalizeSearch([treatment.title, treatment.group, treatment.specialty, ...aliases].join(' '));
    if (haystack.includes(search) || aliases.some((alias) => normalizeSearch(alias).includes(search))) {
      options.push({ type: 'Treatment', label: treatment.title, meta: `${treatment.group} package estimate`, treatment });
    }
  });

  HOSPITALS.forEach((hospital) => {
    const haystack = normalizeSearch([hospital.name, hospital.city, hospital.country, hospital.specialty, hospital.doctor, ...hospital.tags, ...hospital.doctorFocus].join(' '));
    if (haystack.includes(search)) {
      options.push({ type: 'Hospital', label: hospital.name, meta: `${hospital.city}, ${hospital.country}`, hospital });
      options.push({ type: 'Doctor', label: hospital.doctor, meta: `${hospital.doctorTitle} - ${hospital.name}`, hospital });
    }
  });

  DESTINATIONS.forEach((destination) => {
    if (normalizeSearch(destination.country).includes(search)) {
      options.push({ type: 'Destination', label: destination.country, meta: `${destination.hospitals} hospitals, ${destination.doctors} doctors`, destination });
    }
  });

  return options.slice(0, 8);
}

function Breadcrumbs({ items }) {
  return (
    <div className="profile-breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.onClick ? (
            <button onClick={item.onClick} type="button">{item.label}</button>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <em>/</em>}
        </React.Fragment>
      ))}
    </div>
  );
}

function hospitalGallery(hospital) {
  return [
    hospital.image,
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1000&q=80',
  ];
}

const DOCTOR_EDUCATION = [
  'MBBS from a reputed medical college',
  'MS / specialist training in the core clinical department',
  'Advanced fellowship and comprehensive specialty training',
  'International clinical exposure and high-volume procedure experience',
];

const PATIENT_REVIEWS = [
  ['Jean Luc Bernard', 'France', 'The team explained the treatment plan, hospital stay, and travel estimate before I confirmed my visit.'],
  ['Fewzan Abdella', 'Ethiopia', 'Doctor profile, procedure cost, and hospital coordination were clear from the first consultation.'],
  ['Maria Gomez', 'Spain', 'The care coordinator helped compare hospitals and understand the complete recovery budget.'],
];

const FOOTER_COLUMNS = [
  ['Treatments', ['Cardiac Surgery', 'Orthopedics', 'Oncology', 'Spine Surgery', 'Ophthalmology', 'Hair Transplant']],
  ['Destinations', ['India hospitals', 'Turkey hospitals', 'Singapore care', 'Thailand wellness', 'Medical visa help', 'Recovery stays']],
  ['Patient Services', ['Cost estimate', 'Doctor opinion', 'Hospital quote', 'Travel planning', 'Airport pickup', 'Follow-up care']],
  ['Resources', ['Hospital listings', 'Doctor profiles', 'Treatment packages', 'Patient reviews', 'FAQs', 'Support centre']],
];

function Header({ currency, page, setCurrency, setPage }) {
  const nav = [
    ['home', 'Home'],
    ['treatments', 'Treatments'],
    ['destinations', 'Destinations'],
    ['hospitals', 'Hospitals'],
    ['doctors', 'Doctors'],
    ['planner', 'Plan My Journey'],
    ['login', 'Login'],
  ];

  return (
    <header className="site-header">
      <button className="brand-lockup" onClick={() => setPage('home')} type="button">
        <span className="brand-mark">S</span>
        <span>
          <strong>{BRAND_NAME}</strong>
          <small>Medical treatment abroad</small>
        </span>
      </button>
      <nav>
        {nav.map(([id, label]) => (
          <button className={page === id ? 'active' : ''} key={id} onClick={() => setPage(id)} type="button">
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <label className="currency-switch">
          <span>Currency</span>
          <select aria-label="Currency" onChange={(event) => setCurrency(event.target.value)} value={currency}>
            {Object.keys(CURRENCIES).map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </label>
        <button className="header-cta" onClick={() => setPage('planner')} type="button">
          Get cost estimate
        </button>
      </div>
    </header>
  );
}

function Hero({ onFindCare, onSelectSearchOption, query, searchOptions, setQuery, selectedCountry, setSelectedCountry, setPage }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>Discover treatments across borders.</h1>
        <p>
          Compare hospitals, doctors, treatment packages, flights, visa, stay, and local support
          in one transparent medical travel budget before you make an inquiry.
        </p>
        <div className="hero-search">
          <label>
            Search treatments, hospitals, doctors
            <input onChange={(event) => setQuery(event.target.value)} placeholder="Orthopedics, Oncology, Dr. Selim..." value={query} />
            {searchOptions.length > 0 && (
              <div className="search-suggestions">
                {searchOptions.map((option) => (
                  <button key={`${option.type}-${option.label}`} onClick={() => onSelectSearchOption(option)} type="button">
                    <span>{option.type}</span>
                    <strong>{option.label}</strong>
                    <small>{option.meta}</small>
                  </button>
                ))}
              </div>
            )}
          </label>
          <label>
            Where
            <select onChange={(event) => setSelectedCountry(event.target.value)} value={selectedCountry}>
              <option>All destinations</option>
              {DESTINATIONS.map((item) => (
                <option key={item.country}>{item.country}</option>
              ))}
            </select>
          </label>
          <button onClick={onFindCare} type="button">Find care</button>
        </div>
        <div className="journey-steps">
          <span>1,200+ patient reviews</span>
          <span>22 hospitals</span>
          <span>Transparent budget</span>
        </div>
        <div className="hero-action-row">
          <button onClick={() => setPage('planner')} type="button">Quick cost plan</button>
          <button onClick={() => setPage('doctors')} type="button">View doctors</button>
        </div>
      </div>
      <div className="hero-visual">
        <img alt="Doctor supporting international patient planning" src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80" />
        <div className="care-card">
          <strong>Care Plan Ready</strong>
          <span>Reports, quote, visa, stay, pickup, and follow-up organized in one estimate.</span>
        </div>
      </div>
    </section>
  );
}

function FeaturedTreatments({ money, setPage, setSelectedTreatment }) {
  return (
    <section className="page-section featured-treatment-section">
      <div className="section-heading">
        <div>
          <h2>Popular Treatment Journeys</h2>
          <p>Shortlist treatments by real-world needs, package scope, hospital match, and total journey budget.</p>
        </div>
      </div>
      <div className="featured-carousel" aria-label="Featured treatment carousel">
        {FEATURED_TREATMENTS.map((feature) => {
          const treatment = TREATMENTS.find((item) => item.id === feature.id);
          return (
            <article className="featured-treatment-card" key={feature.id}>
              <img alt={treatment.title} src={feature.image} />
              <div>
                <span>{treatment.group}</span>
                <strong>{treatment.title}</strong>
                <p>{feature.description}</p>
                <em>Estimated package from {money(treatment.packageFrom)}</em>
                <button
                  aria-label={`View ${treatment.title} treatment details`}
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setPage('treatment-detail');
                  }}
                  type="button"
                >
                  View details
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Treatments({ activeGroup, money, setActiveGroup, selectedTreatment, setPage, setSelectedTreatment }) {
  const items = activeGroup === 'All' ? TREATMENTS : TREATMENTS.filter((item) => item.group === activeGroup);

  return (
    <section className="page-section" id="treatments">
      <div className="section-heading">
        <div>
          <h2>All Treatments</h2>
          <p>Find the right speciality and compare estimated starting packages.</p>
        </div>
        <div className="tab-row">
          {['All', ...TREATMENT_GROUPS].map((group) => (
            <button className={activeGroup === group ? 'active' : ''} key={group} onClick={() => setActiveGroup(group)} type="button">
              {group}
            </button>
          ))}
        </div>
      </div>
      <div className="treatment-grid">
        {items.map((item) => (
          <button
            className={selectedTreatment?.id === item.id ? 'treatment-card active' : 'treatment-card'}
            key={item.id}
            onClick={() => {
              setSelectedTreatment(item);
              setPage('treatment-detail');
            }}
            type="button"
          >
            <span>{item.icon}</span>
            <img alt={item.title} src={getTreatmentImage(item)} />
            <strong>{item.title}</strong>
            <small>{item.value}% rated value for money</small>
            <em>Package starting from {money(item.packageFrom)}</em>
          </button>
        ))}
      </div>
    </section>
  );
}

function Destinations({ money, setPage, setSelectedCountry }) {
  return (
    <section className="page-section destination-section" id="destinations">
      <div className="section-heading">
        <div>
          <h2>Top Medical Destinations</h2>
          <p>Explore places known for expert doctors, affordable care, and comfortable recovery.</p>
        </div>
      </div>
      <div className="destination-grid">
        {DESTINATIONS.map((destination) => (
          <button
            className="destination-card"
            key={destination.country}
            onClick={() => {
              setSelectedCountry(destination.country);
              setPage('hospitals');
            }}
            type="button"
          >
            <img alt={destination.country} src={destination.image} />
            <div>
              <strong>{destination.country}</strong>
              <p>{destination.line}</p>
              <span>From {money(destination.packageFrom)}</span>
            </div>
            <div className="destination-metrics">
              <span>{destination.hospitals} Hospitals</span>
              <span>{destination.doctors} Doctors</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Hospitals({ hospitals, money, selectedTreatment, setPage, setSelectedHospital }) {
  return (
    <section className="page-section" id="hospitals">
      <div className="section-heading">
        <div>
          <h2>Top Hospitals</h2>
          <p>Compare providers by destination, speciality, doctors, value, and full estimated budget.</p>
        </div>
      </div>
      <div className="hospital-grid">
        {hospitals.map((hospital) => (
          <button
            className="hospital-card"
            key={hospital.id}
            onClick={() => {
              setSelectedHospital(hospital);
              setPage('hospital-detail');
            }}
            type="button"
          >
            <img alt={hospital.name} src={hospital.image} />
            <div className="hospital-body">
              <span>{hospital.city}, {hospital.country}</span>
              <strong>{hospital.name}</strong>
              <p>{hospital.specialty} - {hospital.value}% value for money</p>
              <div className="cost-row">
                <span>Package {money(selectedTreatment && hospital.tags.includes(selectedTreatment.title) ? selectedTreatment.packageFrom : hospital.cost.package)}</span>
                <span>Total {money(totalCost(hospital, selectedTreatment))}</span>
              </div>
              <div className="rating-row">
                <span>{hospital.rating} rating</span>
                <span>{hospital.doctors} doctors</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Doctors({ hospitals, isCarousel = false, money, setPage, setSelectedHospital }) {
  return (
    <section className={isCarousel ? 'page-section doctors-section carousel-mode' : 'page-section doctors-section'} id="doctors">
      <div className="section-heading">
        <div>
          <h2>Top Doctors Worldwide</h2>
          <p>Review specialist experience, hospital association, and consultation fee.</p>
        </div>
      </div>
      <div className="doctor-grid">
        {hospitals.map((hospital) => (
          <button
            className="doctor-card"
            key={hospital.doctor}
            onClick={() => {
              setSelectedHospital(hospital);
              setPage('doctor-detail');
            }}
            type="button"
          >
            <img alt={hospital.doctor} src={hospital.doctorImage} />
            <div>
              <strong>{hospital.doctor}</strong>
              <p>{hospital.doctorTitle}</p>
              <StarRating rating={hospital.rating} />
              <span>{hospital.experience} - {hospital.name}</span>
              <em>{money(hospital.doctorFee)} consult</em>
              <small>View profile</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function TreatmentDetail({ hospitals, money, selectedTreatment, setPage, setSelectedHospital }) {
  const relatedHospitals = hospitals.filter((hospital) => hospital.tags.includes(selectedTreatment.title) || hospital.specialty === selectedTreatment.specialty);
  const matchedHospitals = relatedHospitals.length ? relatedHospitals : hospitals;
  const suggestedHospitals = [
    ...matchedHospitals,
    ...hospitals.filter((hospital) => !matchedHospitals.some((item) => item.id === hospital.id)),
  ];
  const bestMatches = suggestedHospitals.slice(0, 5);
  const suggestedDoctors = suggestedHospitals.slice(0, 10);

  return (
    <section className="detail-page">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => setPage('home') },
          { label: 'Treatments', onClick: () => setPage('treatments') },
          { label: selectedTreatment.title },
        ]}
      />
      <div className="detail-hero">
        <div>
          <span>{selectedTreatment.group} treatment</span>
          <h1>{selectedTreatment.title} abroad with transparent budget planning</h1>
          <p>Compare hospital packages, travel, stay, consultation, local support, and recovery planning before you submit reports.</p>
          <div className="detail-metrics">
            <strong>{money(selectedTreatment.packageFrom)} starting package</strong>
            <strong>{selectedTreatment.value}% value score</strong>
            <strong>{suggestedHospitals.length} hospital options</strong>
          </div>
          <div className="top-cta-row">
            <button onClick={() => setPage('planner')} type="button">Request treatment plan</button>
            <button onClick={() => setPage('hospitals')} type="button">Compare hospitals</button>
          </div>
        </div>
        <img alt={selectedTreatment.title} src={getTreatmentImage(selectedTreatment)} />
      </div>
      <div className="treatment-command-bar">
        <article>
          <span>Patient rating</span>
          <strong><StarRating rating="4.9" /></strong>
          <small>1,200+ reviews for cost clarity and hospital response</small>
        </article>
        <article>
          <span>Starting package</span>
          <strong>{money(selectedTreatment.packageFrom)}</strong>
          <small>Before flights, stay, visa and local support</small>
        </article>
        <article>
          <span>Quote speed</span>
          <strong>48h</strong>
          <small>Typical report review and hospital quote window</small>
        </article>
        <article>
          <span>Best match</span>
          <strong>{bestMatches[0].city}</strong>
          <small>{bestMatches[0].name}</small>
        </article>
      </div>
      <section className="cost-transparency-section">
        <div>
          <span>Cost transparency engine</span>
          <h2>Build a realistic treatment budget before you travel</h2>
          <p>
            This module is the core value: every patient can understand hospital package, doctor consult,
            flights, visa, local transport, stay, care coordination, and buffer before sending an inquiry.
          </p>
          <div className="budget-explain-grid">
            <span><strong>1</strong> Choose treatment and destination</span>
            <span><strong>2</strong> Compare hospitals and doctors</span>
            <span><strong>3</strong> Customize travel and stay assumptions</span>
            <span><strong>4</strong> Request appointment with a clear estimate</span>
          </div>
        </div>
        <div className="budget-preview-card">
          <strong>{money(totalCost(matchedHospitals[0], selectedTreatment))}</strong>
          <span>Example total estimate</span>
          <small>Based on {bestMatches[0].name}, treatment package, flights, visa, local transport, stay, and care coordination.</small>
          <button onClick={() => {
            setSelectedHospital(bestMatches[0]);
            setPage('hospital-detail');
          }} type="button">
            Customize full budget
          </button>
        </div>
      </section>
      <div className="treatment-care-grid">
        <div className="detail-panel">
          <h2>What this journey includes</h2>
          <div className="included-grid">
            {['Doctor opinion', 'Hospital quote', 'Visa guidance', 'Airport pickup', 'Hotel estimate', 'Follow-up plan'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="detail-panel treatment-detail-media">
          <img alt="" src={getTreatmentImage(selectedTreatment)} />
          <div>
            <span>{selectedTreatment.title}</span>
            <h2>Live API ready budget model</h2>
            <p>
              Demo estimates today. Later this same layout can pull live hospital packages,
              doctor fees, flights, visa, hotel and pickup pricing through real APIs.
            </p>
          </div>
        </div>
        <div className="detail-panel">
          <h2>Best matches</h2>
          <div className="mini-list">
            {bestMatches.map((hospital) => (
              <button
                key={hospital.id}
                onClick={() => {
                  setSelectedHospital(hospital);
                  setPage('hospital-detail');
                }}
                type="button"
              >
                <img alt="" src={hospital.image} />
                <span>
                  <strong>{hospital.name}</strong>
                  <small>{hospital.city}, {hospital.country} - Total estimate {money(totalCost(hospital, selectedTreatment))}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="suggestion-section">
        <article className="detail-panel">
          <h2>Suggested hospitals</h2>
          <div className="suggestion-card-grid">
            {suggestedHospitals.slice(0, 12).map((hospital) => (
              <button
                key={hospital.id}
                onClick={() => {
                  setSelectedHospital(hospital);
                  setPage('hospital-detail');
                }}
                type="button"
              >
                <img alt="" src={hospital.image} />
                <strong>{hospital.name}</strong>
                <span>{hospital.city}, {hospital.country}</span>
                <StarRating rating={hospital.rating} />
                <em>Total estimate {money(totalCost(hospital, selectedTreatment))}</em>
              </button>
            ))}
          </div>
        </article>
        <article className="detail-panel">
          <h2>Suggested doctors</h2>
          <div className="suggestion-card-grid doctors">
            {suggestedDoctors.map((hospital) => (
              <button
                key={hospital.doctor}
                onClick={() => {
                  setSelectedHospital(hospital);
                  setPage('doctor-detail');
                }}
                type="button"
              >
                <img alt="" src={hospital.doctorImage} />
                <strong>{hospital.doctor}</strong>
                <span>{hospital.doctorTitle}</span>
                <StarRating rating={hospital.rating} />
                <em>{money(hospital.doctorFee)} consult</em>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function HospitalDetail({ money, selectedHospital, selectedTreatment, setPage }) {
  const basePackage = selectedTreatment && selectedHospital.tags.includes(selectedTreatment.title) ? selectedTreatment.packageFrom : selectedHospital.cost.package;
  const gallery = hospitalGallery(selectedHospital);
  const [activeTab, setActiveTab] = useState('About');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [budget, setBudget] = useState({
    package: basePackage,
    flight: selectedHospital.cost.flight,
    visa: selectedHospital.cost.visa,
    local: selectedHospital.cost.local,
    stay: selectedHospital.cost.stay,
    service: selectedHospital.cost.service,
  });
  const rows = [
    ['package', 'Treatment package', 100, 30000],
    ['flight', 'Flights', 100, 3000],
    ['visa', 'Visa', 0, 600],
    ['local', 'Local transport', 20, 1000],
    ['stay', 'Stay estimate', 100, 5000],
    ['service', 'Care coordination', 0, 1500],
  ];
  const customTotal = Object.values(budget).reduce((sum, value) => sum + Number(value), 0);

  return (
    <section className="profile-page">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => setPage('home') },
          { label: 'Hospitals', onClick: () => setPage('hospitals') },
          { label: selectedHospital.country, onClick: () => setPage('destinations') },
          { label: selectedHospital.name },
        ]}
      />
      <div className="hospital-profile-hero">
        <div className="gallery-mosaic">
          <button className="gallery-image-button gallery-main" onClick={() => setGalleryOpen(true)} type="button">
            <img alt={`${selectedHospital.name} main`} src={gallery[0]} />
          </button>
          {gallery.slice(1).map((image, index) => (
            <button className="gallery-image-button" key={image} onClick={() => setGalleryOpen(true)} type="button">
              <img alt={`${selectedHospital.name} gallery ${index + 1}`} src={image} />
            </button>
          ))}
          <button className="gallery-open-button" onClick={() => setGalleryOpen(true)} type="button">All pictures</button>
        </div>
        <aside className="appointment-card">
          <span>Request appointment</span>
          <h3>Get a hospital quote</h3>
          <input placeholder="Full name" />
          <input placeholder="Phone / WhatsApp" />
          <select defaultValue={selectedTreatment?.title ?? selectedHospital.specialty}>
            {[selectedHospital.specialty, ...selectedHospital.tags].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button onClick={() => setPage('planner')} type="button">Request Appointment</button>
          <small>Reports, cost estimate, visa, stay, pickup and follow-up support can be planned from here.</small>
        </aside>
      </div>

      <div className="profile-title-row">
        <div>
          <span>{selectedHospital.city}, {selectedHospital.country}</span>
          <h1>{selectedHospital.name}</h1>
          <p>{selectedHospital.specialty} hospital with international patient support, transparent budget planning, and coordinated recovery assistance.</p>
        </div>
        <div className="rating-card">
          <strong>{selectedHospital.rating}</strong>
          <span>Patient rating</span>
          <small>{selectedHospital.value}% value score</small>
        </div>
      </div>

      <div className="profile-tabs">
        {['About', 'Specialisation', 'Doctors', 'Gallery', 'Infrastructure', 'Reviews'].map((item) => (
          <button className={activeTab === item ? 'active' : ''} key={item} onClick={() => setActiveTab(item)} type="button">
            {item}
          </button>
        ))}
      </div>

      <div className="profile-layout">
        <div className="profile-main">
          {activeTab === 'About' && (
            <article className="detail-panel hospital-about">
              <h2>About the hospital</h2>
              <p>
                {selectedHospital.name} brings specialist-led treatment, modern infrastructure,
                multilingual coordination, and dedicated international patient assistance into one journey.
                The experience is designed around clinical confidence, cultural comfort, family support,
                and a visible estimate before the patient travels.
              </p>
              <p>
                The hospital profile can later pull live doctor availability, treatment packages,
                gallery images, insurance acceptance, hotel options, and care coordinator availability from real APIs.
              </p>
              <div className="hospital-stat-row">
                <span><strong>{selectedHospital.established}</strong><small>Established</small></span>
                <span><strong>{selectedHospital.beds}</strong><small>Beds</small></span>
                <span><strong>{selectedHospital.icuBeds}</strong><small>ICU beds</small></span>
                <span><strong>{selectedHospital.operatingRooms}</strong><small>Operation theatres</small></span>
              </div>
            </article>
          )}

          {activeTab === 'Specialisation' && (
            <article className="detail-panel">
              <h2>Team & Specialisation</h2>
              <div className="tag-cloud">
                {[...selectedHospital.tags, ...selectedHospital.doctorFocus, 'International patient care', 'Remote follow-up'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          )}

          {activeTab === 'Doctors' && (
            <article className="detail-panel profile-doctor-strip">
              <img alt={selectedHospital.doctor} src={selectedHospital.doctorImage} />
              <div>
                <span>Featured doctor</span>
                <h2>{selectedHospital.doctor}</h2>
                <p>{selectedHospital.doctorTitle} with {selectedHospital.experience} experience.</p>
                <StarRating rating={selectedHospital.rating} />
                <strong>{money(selectedHospital.doctorFee)} consultation</strong>
                <button onClick={() => setPage('doctor-detail')} type="button">View doctor profile</button>
              </div>
            </article>
          )}

          {activeTab === 'Gallery' && (
            <article className="detail-panel">
              <h2>Gallery</h2>
              <div className="inline-gallery">
                {gallery.map((image, index) => (
                  <img alt={`${selectedHospital.name} interior ${index + 1}`} key={image} src={image} />
                ))}
              </div>
            </article>
          )}

          {activeTab === 'Infrastructure' && (
            <>
              <article className="detail-panel">
                <h2>Infrastructure</h2>
                <div className="feature-list">
                  {selectedHospital.infrastructure.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
              <article className="detail-panel">
                <h2>Accreditations & certificates</h2>
                <div className="certificate-grid">
                  {selectedHospital.accreditations.map((item) => (
                    <span key={item}><strong>{item.split(' ')[0]}</strong><small>{item}</small></span>
                  ))}
                </div>
              </article>
            </>
          )}

          {activeTab === 'Reviews' && (
            <article className="detail-panel">
              <h2>Reviews & patient stories</h2>
              <div className="review-grid">
                {PATIENT_REVIEWS.map(([name, country, review]) => (
                  <blockquote key={name}>
                    <StarRating rating="5.0" />
                    <strong>{name}</strong>
                    <span>{country}</span>
                    <p>{review}</p>
                  </blockquote>
                ))}
              </div>
            </article>
          )}
        </div>

      </div>
      <section className="full-budget-section">
        <div className="budget-section-intro">
          <span>Cost transparency planner</span>
          <h2>Customize the full patient journey budget</h2>
          <p>Separate hospital package, travel, visa, local transport, stay and care coordination. This is the main decision layer before the patient requests an appointment.</p>
          <div className="budget-deep-copy">
            <h3>What this estimate explains</h3>
            <ul>
              <li>Hospital package is only one part of the journey.</li>
              <li>Travel and stay can change destination affordability.</li>
              <li>Care coordination keeps pickup, reports, follow-up, and support visible.</li>
            </ul>
          </div>
        </div>
        <div className="budget-workbench">
          <div className="budget-total-card">
            <span>Total journey estimate</span>
            <strong>{money(customTotal)}</strong>
            <small>Includes treatment, travel, visa, stay, local transport, and care coordination.</small>
          </div>
          <div className="budget-pill-row">
            <span>Editable</span>
            <span>API ready</span>
            <span>Transparent</span>
          </div>
          <div className="budget-customizer">
            {rows.map(([key, label, min, max]) => (
              <label key={key}>
                <span>
                  <small>{label}</small>
                  <strong>{money(Number(budget[key]))}</strong>
                </span>
                <input
                  max={max}
                  min={min}
                  onChange={(event) => setBudget((current) => ({ ...current, [key]: Number(event.target.value) }))}
                  step="10"
                  type="range"
                  value={budget[key]}
                />
              </label>
            ))}
          </div>
          <div className="cost-table budget-breakdown-grid">
            {rows.map(([key, label]) => (
              <span key={key}>
                <small>{label}</small>
                <strong>{money(Number(budget[key]))}</strong>
              </span>
            ))}
            <span className="total-line">
              <small>Total estimate</small>
              <strong>{money(customTotal)}</strong>
            </span>
          </div>
        </div>
      </section>
      {galleryOpen && (
        <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label={`${selectedHospital.name} gallery`}>
          <div className="gallery-dialog">
            <button className="modal-close" onClick={() => setGalleryOpen(false)} type="button">x</button>
            <span>{selectedHospital.name}</span>
            <h2>Hospital gallery</h2>
            <div className="gallery-dialog-grid">
              {gallery.map((image, index) => (
                <img alt={`${selectedHospital.name} full gallery ${index + 1}`} key={image} src={image} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function DoctorDetail({ money, selectedHospital, setPage }) {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <section className="profile-page">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => setPage('home') },
          { label: 'Doctors', onClick: () => setPage('doctors') },
          { label: selectedHospital.specialty, onClick: () => setPage('treatments') },
          { label: selectedHospital.doctor },
        ]}
      />
      <div className="doctor-hero-v2">
        <div className="doctor-portrait-wrap">
          <img alt={selectedHospital.doctor} src={selectedHospital.doctorImage} />
        </div>
        <div className="doctor-hero-copy">
          <span>{selectedHospital.doctorTitle}</span>
          <h1>{selectedHospital.doctor}</h1>
          <p>Specialist doctor profile with hospital association, experience, procedures, consultation fee, education, patient reviews, and appointment request in one place.</p>
          <div className="doctor-metric-row">
            <strong><StarRating rating={selectedHospital.rating} /><small>Rating</small></strong>
            <strong>50,000+<small>Surgeries</small></strong>
            <strong>{selectedHospital.experience}<small>Experience</small></strong>
          </div>
          <button onClick={() => setPage('planner')} type="button">Request Appointment</button>
        </div>
        <aside className="appointment-card doctor-appointment-card">
          <span>Get a consultation</span>
          <h3>Book with {selectedHospital.doctor.split(' ').slice(0, 2).join(' ')}</h3>
          <input placeholder="Full name" />
          <input placeholder="Phone / WhatsApp" />
          <textarea placeholder="Describe symptoms or upload reports later" rows="4" />
          <button onClick={() => setPage('planner')} type="button">Request Appointment</button>
        </aside>
      </div>

      <div className="profile-tabs">
        {['About', 'Education', 'Experience', 'Hospitals', 'Treatments', 'Reviews', 'FAQs'].map((item) => (
          <button className={activeTab === item ? 'active' : ''} key={item} onClick={() => setActiveTab(item)} type="button">
            {item}
          </button>
        ))}
      </div>

      <div className="profile-layout">
        <div className="profile-main">
          {activeTab === 'About' && (
            <article className="detail-panel">
              <h2>About</h2>
              <p>
                {selectedHospital.doctor} is a senior {selectedHospital.specialty} specialist associated with {selectedHospital.name}.
                The profile focuses on procedure transparency, hospital association, medical travel readiness,
                consultation fee, and treatment estimates before the patient requests an appointment.
              </p>
            </article>
          )}

          {activeTab === 'Education' && (
            <article className="detail-panel">
              <h2>Education</h2>
              <div className="feature-list numbered">
                {DOCTOR_EDUCATION.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          )}

          {activeTab === 'Experience' && (
            <article className="detail-panel">
              <h2>Experience</h2>
              <div className="feature-list numbered">
                <span>Current role: {selectedHospital.doctorTitle} at {selectedHospital.name}</span>
                <span>International patient consultations and report reviews</span>
                <span>High-volume specialty procedures and follow-up pathways</span>
                <span>Medical travel planning with hospital coordination</span>
              </div>
            </article>
          )}

          {activeTab === 'Hospitals' && (
            <article className="detail-panel">
              <h2>Hospitals</h2>
              <div className="doctor-hospital-card wide">
                <img alt={selectedHospital.name} src={selectedHospital.image} />
                <div>
                  <strong>{selectedHospital.name}</strong>
                  <p>{selectedHospital.city}, {selectedHospital.country}</p>
                  <StarRating rating={selectedHospital.rating} />
                  <span>{selectedHospital.doctors} doctors - {selectedHospital.value}% value score</span>
                  <button onClick={() => setPage('hospital-detail')} type="button">View hospital</button>
                </div>
              </div>
            </article>
          )}

          {activeTab === 'Treatments' && (
            <article className="detail-panel">
              <h2>Treatments</h2>
              <div className="doctor-treatment-grid">
                {selectedHospital.doctorFocus.map((item, index) => (
                  <article key={item}>
                    <img alt={item} src={getTreatmentImage(TREATMENTS[index % TREATMENTS.length])} />
                    <strong>{item}</strong>
                    <span>Packages starting from {money(index < 2 ? 2000 : 600 + index * 300)}</span>
                    <button onClick={() => setPage('planner')} type="button">Chat now</button>
                  </article>
                ))}
              </div>
            </article>
          )}

          {activeTab === 'Reviews' && (
            <article className="detail-panel">
              <h2>Testimonials</h2>
              <div className="review-grid">
                {PATIENT_REVIEWS.slice(0, 2).map(([name, country, review]) => (
                  <blockquote key={name}>
                    <StarRating rating="5.0" />
                    <strong>{name}</strong>
                    <span>{country}</span>
                    <p>{review}</p>
                  </blockquote>
                ))}
              </div>
            </article>
          )}

          {activeTab === 'FAQs' && (
            <article className="detail-panel">
              <h2>FAQs</h2>
              <div className="feature-list numbered">
                <span>What reports are needed for the first medical opinion?</span>
                <span>Can I compare hospital package, stay, and travel together?</span>
                <span>How soon can the doctor review my medical history?</span>
                <span>Is follow-up care available after I return home?</span>
              </div>
            </article>
          )}
        </div>
        <aside className="profile-side">
          <article className="detail-panel sticky-summary">
            <h2>Quick summary</h2>
            <div className="cost-table">
              <span><small>Consultation</small><strong>{money(selectedHospital.doctorFee)}</strong></span>
              <span><small>Hospital</small><strong>{selectedHospital.name}</strong></span>
              <span><small>Location</small><strong>{selectedHospital.city}</strong></span>
              <span className="total-line"><small>Appointment</small><strong>Available</strong></span>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

function CostComparison({ money, selectedHospital, selectedTreatment }) {
  const currentTotal = totalCost(selectedHospital, selectedTreatment);

  return (
    <section className="comparison-section">
      <div>
        <h2>Global Cost Comparison</h2>
        <p>Affordable care, transparent costs, expert guidance.</p>
        <span>Compare your selected plan against an average market range before you speak to a care expert.</span>
      </div>
      <div className="comparison-card">
        <div>
          <span>Prices with {BRAND_NAME}</span>
          <strong>{money(currentTotal)}</strong>
        </div>
        <div>
          <span>Prices without planning</span>
          <strong>{money(Math.round(currentTotal * 1.35))}</strong>
        </div>
        <button type="button">Get best price</button>
      </div>
    </section>
  );
}

function Planner({ money, selectedTreatment, selectedHospital }) {
  return (
    <section className="planner-section" id="planner">
      <div>
        <h2>Help Me Plan My Treatment Abroad</h2>
        <p>Get one clear estimate for hospital package, doctor consult, flights, visa, stay, pickup, and local support.</p>
        <div className="planner-summary">
          <span>Treatment: {selectedTreatment?.title ?? selectedHospital.specialty}</span>
          <span>Hospital: {selectedHospital.name}</span>
          <span>Budget: {money(totalCost(selectedHospital, selectedTreatment))}</span>
        </div>
      </div>
      <form className="consult-form">
        <h3>Request Consultation</h3>
        <select defaultValue={selectedTreatment?.title ?? 'Orthopedics'}>
          {TREATMENTS.map((item) => (
            <option key={item.id}>{item.title}</option>
          ))}
        </select>
        <input placeholder="Full name" />
        <input placeholder="Phone number" />
        <textarea placeholder="Tell us what treatment support you need" rows="4" />
        <button type="button">Request Consultation</button>
      </form>
    </section>
  );
}

function HomeReviews() {
  return (
    <section className="page-section home-reviews">
      <div className="section-heading">
        <div>
          <h2>Patients trust the journey</h2>
          <p>Ratings and reviews focused on doctor clarity, hospital response, and complete budget transparency.</p>
        </div>
        <StarRating rating="4.9" />
      </div>
      <div className="review-grid">
        {PATIENT_REVIEWS.map(([name, country, review]) => (
          <blockquote key={name}>
            <StarRating rating="5.0" />
            <strong>{name}</strong>
            <span>{country}</span>
            <p>{review}</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('Patient');

  return (
    <section className="auth-page">
      <div className="auth-visual">
        <span>Patient area</span>
        <h1>{mode === 'login' ? 'Welcome back to your care journey.' : 'Create your medical travel profile.'}</h1>
        <p>Save treatment plans, compare hospitals, track estimates, and request doctor opinions from one dashboard.</p>
        <div className="auth-benefits">
          <span>Saved cost estimates</span>
          <span>Doctor opinion requests</span>
          <span>Hospital shortlists</span>
        </div>
      </div>
      <form className="auth-form">
        <div className="auth-toggle">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')} type="button">Login</button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')} type="button">Sign up</button>
        </div>
        <h2>{mode === 'login' ? 'Login' : 'Sign up'}</h2>
        {mode === 'signup' && (
          <div className="patient-type-grid">
            {['Patient', 'Family member', 'Medical coordinator'].map((item) => (
              <button className={role === item ? 'active' : ''} key={item} onClick={() => setRole(item)} type="button">
                <strong>{item}</strong>
                <span>{item === 'Patient' ? 'Planning my own care' : item === 'Family member' ? 'Helping someone travel' : 'Managing patient cases'}</span>
              </button>
            ))}
          </div>
        )}
        {mode === 'signup' && <input placeholder="Full name" />}
        <input placeholder="Email or phone number" />
        <input placeholder="Password" type="password" />
        {mode === 'signup' && (
          <>
            <select defaultValue="Orthopedics">
              {TREATMENTS.map((item) => (
                <option key={item.id}>{item.title}</option>
              ))}
            </select>
            <select defaultValue="Budget planning">
              <option>Budget planning</option>
              <option>Doctor second opinion</option>
              <option>Hospital shortlisting</option>
              <option>Travel and stay support</option>
            </select>
          </>
        )}
        <button type="button">{mode === 'login' ? 'Login' : 'Create account'}</button>
        <p>{mode === 'login' ? 'Demo login only for UI flow.' : 'Demo signup only. Backend auth can connect later.'}</p>
      </form>
    </section>
  );
}

function JourneyModal({ onClose, setPage }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Quick medical journey planner">
      <div className="journey-modal">
        <button className="modal-close" onClick={onClose} type="button">x</button>
        <span>Plan smarter</span>
        <h2>Build a quick medical travel estimate</h2>
        <p>Select a treatment, compare hospitals and doctors, then see a demo budget for package, flights, visa, stay, pickup and care support.</p>
        <div className="modal-steps">
          <span>Choose treatment</span>
          <span>Compare hospitals</span>
          <span>Estimate total cost</span>
        </div>
        <div className="modal-treatment-grid">
          {TREATMENTS.slice(0, 6).map((item) => (
            <button key={item.id} type="button">
              <img alt={item.title} src={getTreatmentImage(item)} />
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <button
          className="modal-primary"
          onClick={() => {
            onClose();
            setPage('planner');
          }}
          type="button"
        >
          Quick plan my medical journey
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <strong>{BRAND_NAME}</strong>
        <p>Medical treatment abroad, top hospitals, doctors, destinations, and transparent cost estimates for every patient journey.</p>
        <div className="footer-trust-row">
          <span>ISO</span>
          <span>NABH</span>
          <span>IATA</span>
          <span>24/7</span>
        </div>
      </div>
      <div className="footer-grid">
        {FOOTER_COLUMNS.map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Transparent estimates</span>
        <span>Verified hospital profiles</span>
        <span>International patient support</span>
        <span>2026 {BRAND_NAME}</span>
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All destinations');
  const [activeGroup, setActiveGroup] = useState('All');
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENTS[1]);
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[1]);
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowJourneyModal(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredHospitals = useMemo(() => {
    const search = normalizeSearch(query);
    return HOSPITALS.filter((hospital) => {
      const matchesCountry = selectedCountry === 'All destinations' || hospital.country === selectedCountry;
      const matchesTreatment = !selectedTreatment || hospital.tags.includes(selectedTreatment.title) || hospital.specialty === selectedTreatment.specialty;
      const haystack = normalizeSearch([hospital.name, hospital.city, hospital.country, hospital.specialty, hospital.doctor, ...hospital.tags, ...hospital.doctorFocus].join(' '));
      return matchesCountry && matchesTreatment && (!search || haystack.includes(search));
    });
  }, [query, selectedCountry, selectedTreatment]);

  const shownHospitals = filteredHospitals.length ? filteredHospitals : HOSPITALS;
  const money = (value) => formatCurrency(value, currency);
  const searchOptions = useMemo(() => getSearchOptions(query), [query]);

  const openSearchOption = (option) => {
    if (!option) {
      setPage(query.trim() ? 'hospitals' : 'treatments');
      return;
    }
    if (option.treatment) {
      setSelectedTreatment(option.treatment);
      setPage('treatment-detail');
    } else if (option.hospital && option.type === 'Doctor') {
      setSelectedHospital(option.hospital);
      setPage('doctor-detail');
    } else if (option.hospital) {
      setSelectedHospital(option.hospital);
      const matchedTreatment = TREATMENTS.find((item) => option.hospital.tags.includes(item.title) || option.hospital.specialty === item.specialty);
      if (matchedTreatment) setSelectedTreatment(matchedTreatment);
      setPage('hospital-detail');
    } else if (option.destination) {
      setSelectedCountry(option.destination.country);
      setPage('hospitals');
    }
  };

  const handleFindCare = () => {
    openSearchOption(searchOptions[0]);
  };

  const showHome = page === 'home';

  return (
    <div className="site-shell">
      <Header currency={currency} page={page} setCurrency={setCurrency} setPage={setPage} />
      {(showHome || page === 'planner') && (
        <Hero
          onFindCare={handleFindCare}
          onSelectSearchOption={openSearchOption}
          query={query}
          searchOptions={searchOptions}
          selectedCountry={selectedCountry}
          setPage={setPage}
          setQuery={setQuery}
          setSelectedCountry={setSelectedCountry}
        />
      )}
      <main>
        {showHome && <FeaturedTreatments money={money} setPage={setPage} setSelectedTreatment={setSelectedTreatment} />}
        {(showHome || page === 'destinations') && <Destinations money={money} setPage={setPage} setSelectedCountry={setSelectedCountry} />}
        {(showHome || page === 'treatments') && (
          <Treatments
            activeGroup={activeGroup}
            money={money}
            selectedTreatment={selectedTreatment}
            setActiveGroup={setActiveGroup}
            setPage={setPage}
            setSelectedTreatment={setSelectedTreatment}
          />
        )}
        {(showHome || page === 'hospitals') && (
          <Hospitals hospitals={shownHospitals} money={money} selectedTreatment={selectedTreatment} setPage={setPage} setSelectedHospital={setSelectedHospital} />
        )}
        {(showHome || page === 'doctors') && <Doctors hospitals={showHome ? HOSPITALS : shownHospitals} isCarousel={showHome} money={money} setPage={setPage} setSelectedHospital={setSelectedHospital} />}
        {page === 'treatment-detail' && (
          <TreatmentDetail
            hospitals={HOSPITALS}
            money={money}
            selectedTreatment={selectedTreatment}
            setPage={setPage}
            setSelectedHospital={setSelectedHospital}
          />
        )}
        {page === 'hospital-detail' && <HospitalDetail money={money} selectedHospital={selectedHospital} selectedTreatment={selectedTreatment} setPage={setPage} />}
        {page === 'doctor-detail' && <DoctorDetail money={money} selectedHospital={selectedHospital} setPage={setPage} />}
        {page === 'login' && <AuthPage />}
        {showHome && (
          <section className="why-section">
            {WHY_US.map(([title, body]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </section>
        )}
        {showHome && <HomeReviews />}
        {(showHome || page === 'planner') && <CostComparison money={money} selectedHospital={selectedHospital} selectedTreatment={selectedTreatment} />}
        {(showHome || page === 'planner') && <Planner money={money} selectedHospital={selectedHospital} selectedTreatment={selectedTreatment} />}
      </main>
      <Footer />
      {showJourneyModal && <JourneyModal onClose={() => setShowJourneyModal(false)} setPage={setPage} />}
    </div>
  );
}

export default App;

