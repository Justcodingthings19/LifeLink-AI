import { Hospital, Donor, Ambulance, DisasterAlert, FamilyMember, Volunteer } from "./types";

export const STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Kerala",
  "Maharashtra"
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"]
};

export const HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Apollo Emergency Hospital",
    type: "Trauma",
    rating: 4.8,
    bedsAvailable: 14,
    bloodStored: ["O+", "O-", "A+", "B+", "AB+"],
    distance: 2.1,
    state: "Telangana",
    city: "Hyderabad",
    phone: "+91 40 2360 7777",
    address: "Jubilee Hills, Road No. 72, Hyderabad",
    lat: 38,
    lng: 42,
    hasTrauma: true,
    emergencyRating: 9.8
  },
  {
    id: "h2",
    name: "NIMS (Nizam's Institute of Medical Sciences)",
    type: "Government",
    rating: 4.5,
    bedsAvailable: 45,
    bloodStored: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    distance: 4.3,
    state: "Telangana",
    city: "Hyderabad",
    phone: "+91 40 2348 9000",
    address: "Punjagutta, Hyderabad",
    lat: 44,
    lng: 48,
    hasTrauma: true,
    emergencyRating: 9.3
  },
  {
    id: "h3",
    name: "Fortis Cardiac Center",
    type: "Cardiac",
    rating: 4.9,
    bedsAvailable: 8,
    bloodStored: ["O+", "B+", "AB+", "A+"],
    distance: 3.5,
    state: "Karnataka",
    city: "Bengaluru",
    phone: "+91 80 6621 4444",
    address: "Bannerghatta Road, Opposite IIMB, Bengaluru",
    lat: 52,
    lng: 58,
    hasTrauma: false,
    emergencyRating: 9.9
  },
  {
    id: "h4",
    name: "Rainbow Children's Hospital",
    type: "Children",
    rating: 4.7,
    bedsAvailable: 22,
    bloodStored: ["O+", "A+", "B+"],
    distance: 1.8,
    state: "Telangana",
    city: "Hyderabad",
    phone: "+91 40 4466 5000",
    address: "Banjara Hills, Road No. 2, Hyderabad",
    lat: 40,
    lng: 50,
    hasTrauma: false,
    emergencyRating: 8.5
  },
  {
    id: "h5",
    name: "King George Hospital (KGH)",
    type: "Government",
    rating: 4.2,
    bedsAvailable: 80,
    bloodStored: ["A+", "B+", "O+", "AB+", "O-"],
    distance: 5.6,
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    phone: "+91 891 256 4891",
    address: "Maharanipeta, Visakhapatnam",
    lat: 32,
    lng: 60,
    hasTrauma: true,
    emergencyRating: 9.0
  },
  {
    id: "h6",
    name: "MIOT International Trauma Center",
    type: "Trauma",
    rating: 4.7,
    bedsAvailable: 19,
    bloodStored: ["O-", "A-", "AB-", "B-", "O+", "A+"],
    distance: 6.2,
    state: "Tamil Nadu",
    city: "Chennai",
    phone: "+91 44 4200 2288",
    address: "Manapakkam, Chennai",
    lat: 68,
    lng: 48,
    hasTrauma: true,
    emergencyRating: 9.7
  },
  {
    id: "h7",
    name: "KIMS Sunrise Hospital",
    type: "Private",
    rating: 4.6,
    bedsAvailable: 31,
    bloodStored: ["B+", "O+", "A+"],
    distance: 2.9,
    state: "Kerala",
    city: "Kochi",
    phone: "+91 484 290 5000",
    address: "Palarivattom, Kochi",
    lat: 78,
    lng: 39,
    hasTrauma: false,
    emergencyRating: 8.8
  },
  {
    id: "h8",
    name: "KEM Emergency Ward",
    type: "Government",
    rating: 4.1,
    bedsAvailable: 110,
    bloodStored: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    distance: 7.4,
    state: "Maharashtra",
    city: "Mumbai",
    phone: "+91 22 2410 7000",
    address: "Acharya Donde Marg, Parel, Mumbai",
    lat: 25,
    lng: 30,
    hasTrauma: true,
    emergencyRating: 9.1
  }
];

export const DONORS: Donor[] = [
  {
    id: "d1",
    name: "Ravi Shankar",
    bloodGroup: "O+",
    city: "Hyderabad",
    state: "Telangana",
    distance: 1.4,
    available: true,
    phone: "+91 98480 22338",
    completedDonations: 14,
    badge: "Elite Donor"
  },
  {
    id: "d2",
    name: "Ananya Deshmukh",
    bloodGroup: "AB-",
    city: "Mumbai",
    state: "Maharashtra",
    distance: 3.8,
    available: true,
    phone: "+91 91234 56789",
    completedDonations: 8,
    badge: "Active Hero"
  },
  {
    id: "d3",
    name: "Vikas Hegde",
    bloodGroup: "B+",
    city: "Bengaluru",
    state: "Karnataka",
    distance: 2.1,
    available: true,
    phone: "+91 99887 76655",
    completedDonations: 25,
    badge: "First Responder"
  },
  {
    id: "d4",
    name: "Meera Nair",
    bloodGroup: "O-",
    city: "Kochi",
    state: "Kerala",
    distance: 0.9,
    available: true,
    phone: "+91 94470 12345",
    completedDonations: 19,
    badge: "Elite Donor"
  },
  {
    id: "d5",
    name: "Karthik Raja",
    bloodGroup: "A+",
    city: "Chennai",
    state: "Tamil Nadu",
    distance: 4.5,
    available: false,
    phone: "+91 94440 98765",
    completedDonations: 5,
    badge: "Bronze"
  },
  {
    id: "d6",
    name: "Suresh Babu",
    bloodGroup: "A-",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    distance: 2.7,
    available: true,
    phone: "+91 98492 12110",
    completedDonations: 12,
    badge: "Active Hero"
  },
  {
    id: "d7",
    name: "Divya Teja",
    bloodGroup: "O+",
    city: "Hyderabad",
    state: "Telangana",
    distance: 4.1,
    available: false,
    phone: "+91 88866 55442",
    completedDonations: 3,
    badge: "Bronze"
  },
  {
    id: "d8",
    name: "Pranav Shah",
    bloodGroup: "B-",
    city: "Pune",
    state: "Maharashtra",
    distance: 5.2,
    available: true,
    phone: "+91 90040 12301",
    completedDonations: 11,
    badge: "First Responder"
  }
];

export const AMBULANCES: Ambulance[] = [
  {
    id: "a1",
    type: "ICU Ambulance",
    driverName: "Ramesh Kumar",
    driverPhone: "+91 98485 11001",
    vehicleNo: "TS 09 EA 4812",
    eta: 4,
    price: 3500,
    available: true,
    lat: 36,
    lng: 40
  },
  {
    id: "a2",
    type: "Basic Ambulance",
    driverName: "Satish Naidu",
    driverPhone: "+91 99080 34567",
    vehicleNo: "TS 07 EB 2040",
    eta: 8,
    price: 1500,
    available: true,
    lat: 41,
    lng: 51
  },
  {
    id: "a3",
    type: "Advanced Life Support",
    driverName: "Jagdish Singh",
    driverPhone: "+91 98660 78901",
    vehicleNo: "KA 03 AA 5599",
    eta: 6,
    price: 4800,
    available: true,
    lat: 53,
    lng: 60
  },
  {
    id: "a4",
    type: "Air Ambulance",
    driverName: "Capt. Shridhar",
    driverPhone: "+91 88899 77553",
    vehicleNo: "VT-LLK (HELI)",
    eta: 25,
    price: 95000,
    available: true,
    lat: 56,
    lng: 30
  }
];

export const DISASTER_ALERTS: DisasterAlert[] = [
  {
    id: "da1",
    title: "Cyclone warning in Coastal Andhra",
    type: "Cyclone",
    severity: "Critical",
    location: "Coastal AP & Visakhapatnam",
    state: "Andhra Pradesh",
    timestamp: "14/06/2026 21:00",
    details: "Severe Cyclone 'Laila-II' is expected to make landfall near Visakhapatnam with wind speeds up to 145 km/h. High wave sirens activated. Citizens are advised to evacuate low-lying coastal areas.",
    affectedRadiusKm: 120,
    coords: { x: 34, y: 62 }
  },
  {
    id: "da2",
    title: "Extreme Heatwave Red Alert",
    type: "Heatwave",
    severity: "Warning",
    location: "Nalgonda, Khammam & Hyderabad outskirts",
    state: "Telangana",
    timestamp: "14/06/2026 18:30",
    details: "Daytime temperatures expected to scale up to 47.5°C. Residents are strongly advised to remain indoors between 11:00 AM and 4:00 PM. Keep hydrated and check on vulnerable elderly citizens.",
    affectedRadiusKm: 250,
    coords: { x: 44, y: 46 }
  },
  {
    id: "da3",
    title: "Urban Flood Pre-Alert",
    type: "Flood",
    severity: "Severe",
    location: "Outer Ring Road (South), Bengaluru",
    state: "Karnataka",
    timestamp: "14/06/2026 20:15",
    details: "Unusual continuous downpour of 110mm has caused storm drains to overflow near Sarjapur and Bellandur. Avoid motor travel along lower flyover loops.",
    affectedRadiusKm: 45,
    coords: { x: 53, y: 56 }
  }
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "f1",
    name: "Arjun Pampana (Father)",
    relation: "Father",
    lastLocation: "Jubilee Hills Office, Hyderabad",
    battery: 89,
    status: "Safe",
    lastCheckIn: "14/06/2026 21:45",
    lat: 38,
    lng: 44
  },
  {
    id: "f2",
    name: "Lekhya Pampana (Sister)",
    relation: "Sister",
    lastLocation: "Begumpet Airport, Hyderabad",
    battery: 14,
    status: "SOS Panicked",
    lastCheckIn: "14/06/2026 22:15",
    lat: 43,
    lng: 48
  },
  {
    id: "f3",
    name: "Radha Pampana (Mother)",
    relation: "Mother",
    lastLocation: "Home - Banjara Hills",
    battery: 98,
    status: "Safe",
    lastCheckIn: "14/06/2026 22:10",
    lat: 40,
    lng: 49
  }
];

export const VOLUNTEERS: Volunteer[] = [
  { id: "v1", name: "Srinivas Rao", points: 2850, badge: "Guardian Gold", city: "Hyderabad", donations: 18, rank: 1 },
  { id: "v2", name: "Preethi Reddy", points: 2410, badge: "Elite Savior", city: "Bengaluru", donations: 12, rank: 2 },
  { id: "v3", name: "Amit Mahajan", points: 1950, badge: "Life Steward", city: "Mumbai", donations: 9, rank: 3 },
  { id: "v4", name: "Kiran Mathew", points: 1820, badge: "First Responder", city: "Kochi", donations: 11, rank: 4 },
  { id: "v5", name: "Deepa Selvan", points: 1540, badge: "Hope Bearer", city: "Chennai", donations: 6, rank: 5 }
];

export const INDIA_EMERGENCY_NUMBERS = [
  { number: "112", label: "National Emergency Line", desc: "All-in-one single response number" },
  { number: "108", label: "Medical Emergency & Ambulance", desc: "State-wide emergency medical transport" },
  { number: "100", label: "Police Control Room", desc: "Crime reporting and safety enforcement" },
  { number: "101", label: "Fire & Rescue Services", desc: "Disaster mitigation and tactical safety" }
];
