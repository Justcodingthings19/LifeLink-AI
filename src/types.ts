export interface Hospital {
  id: string;
  name: string;
  type: "Government" | "Private" | "Trauma" | "Cardiac" | "Children";
  rating: number;
  bedsAvailable: number;
  bloodStored: string[];
  distance: number; // in km
  state: string;
  city: string;
  phone: string;
  address: string;
  lat: number; // custom map coords X %
  lng: number; // custom map coords Y %
  hasTrauma: boolean;
  emergencyRating: number;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  city: string;
  state: string;
  distance: number;
  available: boolean;
  phone: string;
  completedDonations: number;
  badge: "Elite Donor" | "Active Hero" | "First Responder" | "Bronze";
}

export interface Ambulance {
  id: string;
  type: "Basic Ambulance" | "ICU Ambulance" | "Advanced Life Support" | "Air Ambulance";
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
  eta: number; // in mins
  price: number; // in INR
  available: boolean;
  lat: number;
  lng: number;
}

export interface DisasterAlert {
  id: string;
  title: string;
  type: "Flood" | "Cyclone" | "Earthquake" | "Heatwave" | "Fire";
  severity: "Critical" | "Warning" | "Severe" | "Moderate";
  location: string;
  state: string;
  timestamp: string;
  details: string;
  affectedRadiusKm: number;
  coords: { x: number; y: number };
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  lastLocation: string;
  battery: number;
  status: "Safe" | "At Work" | "At School" | "SOS Panicked";
  lastCheckIn: string;
  lat: number;
  lng: number;
}

export interface Volunteer {
  id: string;
  name: string;
  points: number;
  badge: string;
  city: string;
  donations: number;
  rank: number;
}
