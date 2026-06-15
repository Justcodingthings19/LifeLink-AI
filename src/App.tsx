import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Flame,
  Ambulance as AmbIcon,
  User,
  RefreshCw,
  Search,
  Heart,
  MapPin,
  Phone,
  Navigation,
  Volume2,
  VolumeX,
  Send,
  Smartphone,
  MessageSquare,
  Check,
  Plus,
  Users,
  Menu,
  X,
  Info,
  Globe,
  Sun,
  Moon,
  Star,
  Award,
  ChevronsUp,
  Activity,
  FileText,
  Layers,
  Sparkles,
  Map,
  BadgeAlert,
  BatteryCharging,
  Sliders,
  BellRing
} from "lucide-react";
import { HOSPITALS, DONORS, AMBULANCES, DISASTER_ALERTS, FAMILY_MEMBERS, VOLUNTEERS, STATES, CITIES_BY_STATE, INDIA_EMERGENCY_NUMBERS } from "./data";
import { Hospital, Donor, Ambulance, DisasterAlert, FamilyMember, Volunteer } from "./types";
import InteractiveMap from "./components/InteractiveMap";
import { motion, AnimatePresence } from "motion/react";

// Import premium modular components
import PaymentSimulator from "./components/PaymentSimulator";
import GlobalSearchPanel from "./components/GlobalSearchPanel";
import TelehealthCenter from "./components/TelehealthCenter";
import HealthVault from "./components/HealthVault";
import DisasterHub from "./components/DisasterHub";

// Translations structure for India localization
const TRANSLATIONS = {
  English: {
    heroTitle: "Help Arrives Faster When Every Second Counts",
    heroDesc: "Find emergency help, blood donors, hospitals, ambulances, and disaster updates instantly through AI-powered assistance.",
    sosBtn: "🚨 Emergency SOS",
    donorBtn: "🩸 Find Blood Donor",
    hospitalBtn: "🏥 Find Hospital",
    liveTracker: "LIVE EMERGENCY RADAR",
    searchPlaceholder: "Search for clinics, donors, or safety bulletins...",
    emergencyContacts: "Emergency Contacts",
    etaText: "Estimated Response Time",
    statusText: "Status",
    bedsAvailable: "Beds Available",
    distance: "Distance",
    contact: "Contact",
    directions: "Directions",
    nationalHotlines: "National Emergency Dispatch Hotlines",
    bloodNetwork: "India Blood Donor Network",
    hospitalFinder: "Interactive Hospital Finder",
    ambulanceBooking: "Ambulance Booking & Tracking",
    disasterAlerts: "Real-Time Disaster Bulletins",
    aiAssistant: "LifeLink AI Medical Assistant",
    familyDashboard: "Family Safety Dashboard",
    communityHeader: "Volunteer Network & Leaderboard",
    aboutHeader: "About LifeLink AI",
    contactHeader: "Get in Touch / Request Partnership",
    activeRequest: "Active Emergency Request",
    completedDonations: "Successful Donations",
  },
  Telugu: {
    heroTitle: "ప్రతి సెకను విలువైనదే అయినప్పుడు సహాయం త్వరగా అందుతుంది",
    heroDesc: "కృత్రిమ మేధస్సు (AI) ద్వారా అత్యవసర సహాయం, రక్తదాతలు, ఆసుపత్రులు, అంబులెన్సులు మరియు విపత్తు వివరాలను తక్షణమే కనుగొనండి.",
    sosBtn: "🚨 అత్యవసర SOS",
    donorBtn: "🩸 రక్తదాతను కనుగొనండి",
    hospitalBtn: "🏥 ఆసుపత్రిని కనుగొనండి",
    liveTracker: "ప్రత్యక్ష అత్యవసర రాడార్",
    searchPlaceholder: "ఆసుపత్రులు, దాతలు లేదా రక్షణ బులెటిన్ల కోసం వెతకండి...",
    emergencyContacts: "అత్యవసర పరిచయాలు",
    etaText: "అంచనా వేసిన స్పందన సమయం",
    statusText: "స్థితి",
    bedsAvailable: "అందుబాటులో ఉన్న పడకలు",
    distance: "దూరం",
    contact: "సంప్రదించండి",
    directions: "మార్గదర్శకాలు",
    nationalHotlines: "జాతీయ అత్యవసర హాట్ లైన్లు",
    bloodNetwork: "ఇండియా బ్లడ్ డోనర్ నెట్ వర్క్",
    hospitalFinder: "ఆసుపత్రుల శోధన",
    ambulanceBooking: "అంబులెన్స్ బుకింగ్ & ట్రాకింగ్",
    disasterAlerts: "నిజ-సమయ విపత్తు హెచ్చరికలు",
    aiAssistant: "లైఫ్‌లింక్ AI వైద్య సహాయకుడు",
    familyDashboard: "కుటుంబ భద్రతా డాష్ బోర్డ్",
    communityHeader: "స్వచ్ఛంద సేవకుల నెట్ వర్క్",
    aboutHeader: "లైఫ్‌లింక్ AI గురించి",
    contactHeader: "భాగస్వామ్య అభ్యర్థన",
    activeRequest: "క్రియాశీల అత్యవసర అభ్యర్థన",
    completedDonations: "సఫలమైన రక్తదానాలు",
  },
  Hindi: {
    heroTitle: "हर सेकंड मायने रखता है, मदद तेजी से पहुंचती है",
    heroDesc: "AI-संचालित सहायता के माध्यम से आपातकालीन सहायता, रक्तदाता, अस्पताल, एम्बुलेंस और आपदा अपडेट तुरंत पाएं।",
    sosBtn: "🚨 इमरजेंसी SOS",
    donorBtn: "🩸 रक्तदाता खोजें",
    hospitalBtn: "🏥 अस्पताल खोजें",
    liveTracker: "लाइव इमरजेंसी रडार",
    searchPlaceholder: "अस्पतालों, रक्तदाताओं या सुरक्षा बुलेटिन खोजें...",
    emergencyContacts: "आपातकालीन संपर्क",
    etaText: "अनुमानित प्रतिक्रिया समय",
    statusText: "स्थिति",
    bedsAvailable: "उपलब्ध बेड",
    distance: "दूरी",
    contact: "संपर्क करें",
    directions: "दिशा-निर्देश",
    nationalHotlines: "राष्ट्रीय आपातकालीन हॉटलाइन",
    bloodNetwork: "भारत रक्तदाता नेटवर्क",
    hospitalFinder: "इंटरैक्टिव अस्पताल खोजक",
    ambulanceBooking: "एम्बुलेंस बुकिंग और ट्रैकिंग",
    disasterAlerts: "वास्तविक समय आपदा बुलेटिन",
    aiAssistant: "लाइफलिंक AI आपातकालीन सहायक",
    familyDashboard: "पारिवारिक सुरक्षा डैशबोर्ड",
    communityHeader: "स्वयंसेवक नेटवर्क और लीडरबोर्ड",
    aboutHeader: "लाइफलिंक AI के बारे में",
    contactHeader: "साझेदारी का अनुरोध / संपर्क करें",
    activeRequest: "सक्रिय आपातकालीन अनुरोध",
    completedDonations: "सफल रक्तदान",
  }
};

export default function App() {
  // Theme and Config
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("lifelink-theme");
    return saved === "light" ? "light" : "dark"; // Default to dark for elite premium feel
  });
  const [language, setLanguage] = useState<"English" | "Telugu" | "Hindi">("English");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data State allowing dynamic simulations!
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>(HOSPITALS);
  const [donorsList, setDonorsList] = useState<Donor[]>(DONORS);
  const [ambulancesList, setAmbulancesList] = useState<Ambulance[]>(AMBULANCES);
  const [alertsList, setAlertsList] = useState<DisasterAlert[]>(DISASTER_ALERTS);
  const [familyList, setFamilyList] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  const [volunteersList, setVolunteersList] = useState<Volunteer[]>(VOLUNTEERS);

  // Selected item tracking for map highlights
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(HOSPITALS[0]);
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | undefined>(AMBULANCES[0]);
  const [selectedAlert, setSelectedAlert] = useState<DisasterAlert | undefined>(DISASTER_ALERTS[0]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | undefined>(FAMILY_MEMBERS[1]);

  // SOS Simulation States
  const [sosActive, setSosActive] = useState(false);
  const [sosStatus, setSosStatus] = useState<"Dispatched" | "Arrived" | "Idle">("Idle");
  const [sosTimer, setSosTimer] = useState(0);
  const [userLocation, setUserLocation] = useState({ lat: 40, lng: 48 }); // Hyderabad city coordinates approximate center
  const [customContacts, setCustomContacts] = useState([
    { name: "Srinivas Rao (Local Volunteer)", phone: "+91 98480 11223" },
    { name: "Dr. Arundhati", phone: "+91 99080 88776" }
  ]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // Blood Search Filter States
  const [filterBloodGroup, setFilterBloodGroup] = useState("All");
  const [filterState, setFilterState] = useState("Telangana");
  const [filterCity, setFilterCity] = useState("All");
  const [distRange, setDistRange] = useState(10);
  const [requestBloodGroup, setRequestBloodGroup] = useState("O+");
  const [newDonorName, setNewDonorName] = useState("");
  const [newDonorPhone, setNewDonorPhone] = useState("");
  const [newDonorGroup, setNewDonorGroup] = useState("O+");
  const [newDonorState, setNewDonorState] = useState("Telangana");
  const [newDonorCity, setNewDonorCity] = useState("Hyderabad");

  // Hospital Filter State
  const [hospitalTypeFilter, setHospitalTypeFilter] = useState("All");

  // Ambulance Booking States
  const [bookedAmbulanceId, setBookedAmbulanceId] = useState<string | null>(null);
  const [ambulanceProgress, setAmbulanceProgress] = useState(0); // 0 to 1
  const [ambulanceEta, setAmbulanceEta] = useState(0);
  const [activeAmbulanceTab, setActiveAmbulanceTab] = useState<"Basic" | "ICU" | "Advanced" | "Air">("ICU");

  // AI Chatbot States (Interacts with our secure /api/chat express endpoint!)
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Welcome to LifeLink AI Emergency center. You can search first-aid guidelines immediately (e.g. 'burn treatment', 'Heimlich maneuver', 'CPR compressions') or ask about emergency support. Your location coordinates are active." }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechUttRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Volunteer Sign Up States
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerCity, setVolunteerCity] = useState("Hyderabad");
  const [registeredAsVolunteer, setRegisteredAsVolunteer] = useState(false);

  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", locationName: "", message: "", isPartnership: false });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Persistent alerts notification simulations
  const [notifications, setNotifications] = useState<string[]>([]);

  // 1-TAP SECURE DIRECT DIALER SYSTEM
  const [activeCallContact, setActiveCallContact] = useState<{ name: string; phone: string; type: "Audio" | "Video" | "Conference" } | null>(null);
  const [activeCallStatus, setActiveCallStatus] = useState<"connecting" | "ringing" | "connected" | "ended">("connecting");
  const [activeCallDuration, setActiveCallDuration] = useState(0);

  // SECURE UPI/CARD checkout state variables
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(500);
  const [checkoutPurpose, setCheckoutPurpose] = useState("");
  const [paymentsCallback, setPaymentsCallback] = useState<{ onPay: (txn: string) => void }>({ onPay: () => {} });

  // SMARTWATCH WEARABLE & QR CARDS
  const [activeWatchHeartRate, setActiveWatchHeartRate] = useState(72);
  const [isWatchSynced, setIsWatchSynced] = useState(true);
  const [offlineEmergencyMode, setOfflineEmergencyMode] = useState(false);
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false);

  // PREMIUM MEMBERSHIP PLANS
  const [userSubscriptionTier, setUserSubscriptionTier] = useState<"Free" | "Premium" | "Family" | "Corporate">("Free");

  // MEDICINES & PRESCRIPTIONS
  const [prescFileScanning, setPrescFileScanning] = useState(false);
  const [prescScanningProgress, setPrescScanningProgress] = useState(0);
  const [scannedMedItems, setScannedMedItems] = useState<string[]>([]);
  const [medDosageAlarms, setMedDosageAlarms] = useState<Array<{ name: string; time: string }>>([
    { name: "Paracetamol 650mg", time: "08:00 AM" },
    { name: "B-Complex Vitamin", time: "01:30 PM" }
  ]);
  const [newAlarmMedName, setNewAlarmMedName] = useState("");
  const [newAlarmTime, setNewAlarmTime] = useState("08:00 AM");

  // Track call duration
  useEffect(() => {
    let interval: any;
    if (activeCallContact && activeCallStatus === "connected") {
      interval = setInterval(() => {
        setActiveCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setActiveCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [activeCallContact, activeCallStatus]);

  // Simulate smartwatch heart rate jitter
  useEffect(() => {
    const timer = setInterval(() => {
      if (isWatchSynced) {
        setActiveWatchHeartRate((prev) => {
          const jitter = Math.random() > 0.5 ? 1 : -1;
          const newVal = prev + jitter;
          return Math.max(60, Math.min(110, newVal));
        });
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isWatchSynced]);

  // Apply Theme class
  useEffect(() => {
    localStorage.setItem("lifelink-theme", theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  // Simulated live telemetry coordinates stream / alerts generator
  useEffect(() => {
    const trackingInterval = setInterval(() => {
      // 1. Simulates small realistic GPS jitter
      setUserLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.05,
        lng: prev.lng + (Math.random() - 0.5) * 0.05,
      }));

      // 2. Simulates hospital bed counts ticking dynamically!
      setHospitalsList(prev =>
        prev.map(h => {
          if (Math.random() > 0.75) {
            const mod = Math.random() > 0.5 ? 1 : -1;
            return {
              ...h,
              bedsAvailable: Math.max(1, Math.min(150, h.bedsAvailable + mod))
            };
          }
          return h;
        })
      );
    }, 7000);

    return () => clearInterval(trackingInterval);
  }, []);

  // SOS Countdown timer simulation
  useEffect(() => {
    let timerId: any;
    if (sosActive && sosStatus === "Dispatched") {
      timerId = setInterval(() => {
        setSosTimer(prev => {
          if (prev <= 1) {
            setSosStatus("Arrived");
            addNotification("🚨 Paramedics and EMS dispatch team have arrived at your designated location!");
            clearInterval(timerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [sosActive, sosStatus]);

  // Ambulance Movement Simulation towards the user position on the map
  useEffect(() => {
    let timerId: any;
    if (bookedAmbulanceId) {
      setAmbulanceProgress(0);
      const chosenAmbulance = ambulancesList.find(a => a.id === bookedAmbulanceId);
      if (chosenAmbulance) {
        setAmbulanceEta(chosenAmbulance.eta);
      }

      timerId = setInterval(() => {
        setAmbulanceProgress(prev => {
          if (prev >= 1) {
            clearInterval(timerId);
            addNotification("🚑 Your reserved Ambulance vehicle has arrived!");
            return 1;
          }
          const nextVal = prev + 0.1;
          // Dynamically reduce remaining ETA
          setAmbulanceEta(oldEta => Math.max(1, Math.round(oldEta * (1 - nextVal))));
          return nextVal;
        });
      }, 3000);
    }
    return () => clearInterval(timerId);
  }, [bookedAmbulanceId]);

  const addNotification = (text: string) => {
    setNotifications(prev => [text, ...prev].slice(0, 5));
  };

  // One-Tap Emergency Dialing & Status Engine Hook
  const initiateCall = (name: string, phone: string, type: "Audio" | "Video" | "Conference" = "Audio") => {
    setActiveCallContact({ name, phone, type });
    setActiveCallStatus("connecting");
    
    setTimeout(() => {
      setActiveCallStatus("ringing");
    }, 1200);

    setTimeout(() => {
      setActiveCallStatus("connected");
      addNotification(`📞 Secure line connected to ${name} (${phone}). [${type} Session]`);
    }, 3800);
  };

  // Payment processing integration
  const triggerPayment = (amount: number, purpose: string, callback: (txn: string) => void) => {
    setCheckoutAmount(amount);
    setCheckoutPurpose(purpose);
    setPaymentsCallback({ onPay: callback });
    setCheckoutOpen(true);
  };

  const triggerSOS = () => {
    setSosActive(true);
    setSosStatus("Dispatched");
    setSosTimer(25); // seconds till arrival demo
    addNotification("🚨 CRITICAL: One-Tap SOS Broadcaster Engaged. Medical GPS dispatched to nearest trauma center!");
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosStatus("Idle");
    setSosTimer(0);
    addNotification("ℹ️ SOS Emergency Broadcaster Disarmed.");
  };

  // Chat API Submissions
  const sendChatMessage = async (e?: React.FormEvent, presetPhrase?: string) => {
    if (e) e.preventDefault();
    const query = presetPhrase || chatInput;
    if (!query.trim()) return;

    const userMsg = { role: "user" as const, text: query };
    setChatMessages(prev => [...prev, userMsg]);
    if (!presetPhrase) setChatInput("");
    setChatLoading(true);

    try {
      // Build relative prompt history
      const history = chatMessages.slice(-6).map(m => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history })
      });

      if (!response.ok) {
        throw new Error("Failed to contact chat server");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "ai", text: data.text }]);
      
      // Auto speech synthesis of AI response if desired
      speakText(data.text);

    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        { role: "ai", text: "System is experiencing heavy traffic, but immediately: Dial 112 or 108 if there is an active trauma event. For severe cuts, apply direct pressure; for burns, cool with clean water." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Text to Speech logic
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove markdowns from speech for elegant voice audio output
      const cleanText = text.replace(/[*#`🚨🏥🩸🩺]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300)); // Speak first 300 chars for brevity
      utterance.lang = language === "Telugu" ? "te-IN" : language === "Hindi" ? "hi-IN" : "en-IN";
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechUttRef.current = utterance;
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Registering donor
  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName || !newDonorPhone) return;

    const newDonor: Donor = {
      id: `d-${Date.now()}`,
      name: newDonorName,
      bloodGroup: newDonorGroup,
      state: newDonorState,
      city: newDonorCity,
      distance: 1.2 + Math.random() * 5,
      available: true,
      phone: newDonorPhone,
      completedDonations: 0,
      badge: "Bronze"
    };

    setDonorsList(prev => [newDonor, ...prev]);
    addNotification(`🩸 Successfully registered ${newDonorName} as an active ${newDonorGroup} donor in ${newDonorCity}!`);
    setNewDonorName("");
    setNewDonorPhone("");
  };

  // Add emergency contact
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    setCustomContacts(prev => [...prev, { name: newContactName, phone: newContactPhone }]);
    setNewContactName("");
    setNewContactPhone("");
    addNotification(`✅ Added custom emergency responder: ${newContactName}`);
  };

  // Register volunteer
  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName) return;

    const newVol: Volunteer = {
      id: `v-${Date.now()}`,
      name: volunteerName,
      points: 100,
      badge: "Hope Bearer",
      city: volunteerCity,
      donations: 0,
      rank: volunteersList.length + 1
    };

    setVolunteersList(prev => [...prev, newVol].sort((a,b) => b.points - a.points));
    setRegisteredAsVolunteer(true);
    addNotification(`🌟 Thank you ${volunteerName}! You are officially added to India's Disaster Relief network.`);
  };

  // Submit Contact
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    addNotification("📩 Partnership proposal submitted successfully. Lifelink executive will revert within 12 hours.");
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", phone: "", email: "", locationName: "", message: "", isPartnership: false });
    }, 4000);
  };

  // Helper translations tool
  const t = TRANSLATIONS[language];

  // Filtering lists based on search and visual controls
  const filteredHospitals = hospitalsList.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          h.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = hospitalTypeFilter === "All" || h.type === hospitalTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredDonors = donorsList.filter(d => {
    const matchesGroup = filterBloodGroup === "All" || d.bloodGroup === filterBloodGroup;
    const matchesState = d.state === filterState;
    const matchesCity = filterCity === "All" || d.city === filterCity;
    const matchesDist = d.distance <= distRange;
    return matchesGroup && matchesState && matchesCity && matchesDist;
  });

  // Background and style modes based on theme state
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#0B1220] text-white" : "bg-[#F3F4F6] text-slate-900";
  const glassPanelClass = isDark ? "backdrop-blur-xl bg-white/5 border border-white/10" : "backdrop-blur-xl bg-white/75 shadow-lg border border-slate-300/60";
  const innerCardClass = isDark ? "bg-slate-900/60 hover:bg-slate-900/90 border border-white/5" : "bg-white/80 hover:bg-white border border-slate-200";
  const textMutedClass = isDark ? "text-slate-400" : "text-slate-600";
  const textSubtleClass = isDark ? "text-slate-500" : "text-slate-400";
  const borderClass = isDark ? "border-white/10" : "border-slate-300";

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-300 font-sans flex flex-col relative overflow-x-hidden`}>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-12 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[600px] right-24 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[110px]"></div>
      </div>

      {/* STICKY NAVBAR */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b ${borderClass} ${isDark ? "bg-[#0B1220]/75" : "bg-white/75"} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveNav("home")}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#EF4444] to-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10">
              <span className="font-display font-black text-white text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight flex items-center">
                LifeLink <span className="text-[#EF4444] ml-1.5 font-black">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-slate-500">
                One Platform. Every Crisis.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex flex-wrap items-center gap-1.5 bg-slate-500/10 dark:bg-white/5 p-1 rounded-xl max-w-4xl">
            {[
              { id: "home", label: "Home" },
              { id: "sos", label: "SOS System" },
              { id: "telemedicine", label: "Telehealth ER" },
              { id: "blood", label: "Blood Donors" },
              { id: "hospitals", label: "Hospitals" },
              { id: "ambulances", label: "Ambulances" },
              { id: "medicine", label: "Drug Orders" },
              { id: "vault", label: "Health Vault" },
              { id: "alerts", label: "Disaster Hub" },
              { id: "family", label: "Family Safety" },
              { id: "community", label: "Community" },
              { id: "contact", label: "Contact" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeNav === item.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-bold"
                    : `${textMutedClass} hover:text-blue-500`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls Panel */}
          <div className="flex items-center space-x-3">
            
            {/* National Dispatch indicator */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg text-xs font-mono border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} relative`}>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-bold text-red-500">IND DISPATCH: 112</span>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <Globe className="h-3.5 w-3.5 text-slate-400 mr-1 hidden sm:inline" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className={`text-xs font-semibold px-2 py-1 rounded-lg border bg-transparent cursor-pointer ${isDark ? "border-white/10 text-slate-300" : "border-slate-300 text-slate-800"}`}
              >
                <option value="English" className="text-slate-900">ENG</option>
                <option value="Telugu" className="text-slate-900">TEL (తెలుగు)</option>
                <option value="Hindi" className="text-slate-900">HIN (हिन्दी)</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-lg border cursor-pointer transition-all ${isDark ? "border-white/10 hover:bg-white/5 text-amber-400" : "border-slate-300 hover:bg-slate-100 text-slate-700"}`}
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-blue-600/10 text-blue-500 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`xl:hidden fixed top-18 left-0 w-full z-30 p-6 shadow-2xl ${glassPanelClass} border-b ${borderClass}`}
          >
            <div className="flex flex-col space-y-2.5">
              {[
                { id: "home", label: "🏚️ Home Base" },
                { id: "sos", label: "🚨 Emergency SOS & Calling" },
                { id: "telemedicine", label: "🩺 Telehealth ER Consults" },
                { id: "blood", label: "🩸 Blood Donors & NGO Funds" },
                { id: "hospitals", label: "🏥 Locate Hospitals" },
                { id: "ambulances", label: "🚑 Book Ambulance" },
                { id: "medicine", label: "💊 pharmacy Drug Orders" },
                { id: "vault", label: "🔒 Encrypted health Vault" },
                { id: "alerts", label: "🌀 Climate Disaster Hub" },
                { id: "family", label: "👨‍👩‍👧 GPS Family Tracker" },
                { id: "community", label: "🤝 Volunteer Wing" },
                { id: "contact", label: "✉️ Corporate Partner Contacts" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    activeNav === item.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="h-px bg-slate-300 dark:bg-white/10 my-2"></div>
              
              <div className="flex justify-between items-center px-4 text-xs font-mono">
                <span className="text-red-500">Emergency lines:</span>
                <span>112 | 108 | 100</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIVE EVENT BANNER */}
      {notifications.length > 0 && (
        <div className="bg-red-600 text-white font-mono text-center text-xs py-2 px-4 shadow-md flex items-center justify-center space-x-2 shrink-0 z-10">
          <BellRing className="h-4 w-4 animate-bounce shrink-0" />
          <span className="font-bold tracking-wider uppercase">ALERTS UPDATED:</span>
          <span>{notifications[0]}</span>
        </div>
      )}

      {/* QUICK GLOBAL SEARCH ACCENT BAR */}
      <div className={`py-3 ${isDark ? "bg-slate-900/60 border-b border-white/5" : "bg-slate-200/50 border-b border-slate-300"} px-4 z-10`}>
        <div className="max-w-4xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-24 py-2 rounded-full text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none ${
              isDark ? "bg-[#0B1220] text-white border border-white/10" : "bg-white text-slate-950 border border-slate-300"
            }`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-slate-500/10 py-1 px-2.5 rounded-full uppercase">
            Filtered Dynamic Engine
          </span>
        </div>
      </div>

      {/* HERO SECTION - ONLY SHOWN ON HOME VIEW */}
      {activeNav === "home" && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#EF4444] text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              INDIA LOCALIZATION EMPOWERED • ₹ RUPEE SETTINGS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight uppercase">
              {t.heroTitle.split(" counts")[0]}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#2563EB]">
                Every Second
              </span>{" "}
              Counts
            </h1>

            <p className={`${textMutedClass} text-base sm:text-lg max-w-xl font-medium leading-relaxed`}>
              {t.heroDesc} Connect with validated blood donors, emergency hospitals, ICU ambulances, and real-time warnings near your city in seconds.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveNav("sos");
                  triggerSOS();
                }}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-uppercase shadow-lg shadow-red-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>🚨</span> Disseminate SOS
              </button>

              <button
                onClick={() => setActiveNav("blood")}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-uppercase shadow-lg shadow-blue-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>🩸</span> Find Blood Donor
              </button>

              <button
                onClick={() => setActiveNav("hospitals")}
                className={`px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm border transition-all cursor-pointer transform hover:-translate-y-0.5 ${
                  isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-white border-slate-300 hover:bg-slate-50 text-slate-900"
                }`}
              >
                <span>🏥</span> Locate Trauma Centers
              </button>
            </div>

            {/* Animated Counters Grid */}
            <div className="pt-8 border-t border-slate-400/25 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black tracking-tight text-red-500">10M+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">People Protected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black tracking-tight text-blue-500">100K+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Blood Donors</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black tracking-tight text-emerald-500">500+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Partner Hospitals</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black tracking-tight text-amber-500">₹0 Fee</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Community-first</div>
              </div>
            </div>

          </div>

          {/* Hero Right Dashboard Panel preview */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Embedded Live Map Display */}
            <div className={`${glassPanelClass} rounded-[32px] p-6 flex flex-col space-y-4 relative overflow-hidden shadow-2xl`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black tracking-widest font-mono text-red-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.liveTracker}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-500/10 py-1 px-2 rounded">
                  India Center
                </span>
              </div>

              {/* Main Map Box Component */}
              <InteractiveMap
                hospitals={filteredHospitals}
                ambulances={ambulancesList}
                alerts={alertsList}
                family={familyList}
                activeTab={activeNav}
                sosTriggered={sosActive}
                bookedAmbulanceId={bookedAmbulanceId || undefined}
                ambulanceProgress={ambulanceProgress}
                userLocation={userLocation}
              />

              {/* Fast Telemetry Strip */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl ${innerCardClass}`}>
                  <div className="text-slate-500 uppercase text-[9px] font-bold">Latitude Grid</div>
                  <div className="font-mono font-bold text-red-500">{userLocation.lat.toFixed(4)}° N</div>
                </div>
                <div className={`p-3 rounded-xl ${innerCardClass}`}>
                  <div className="text-slate-500 uppercase text-[9px] font-bold">Longitude Grid</div>
                  <div className="font-mono font-bold text-blue-500">{userLocation.lng.toFixed(4)}° E</div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* PRIMARY ACTIVE CONTENT ROUTING (SINGLE SCREEN TAB VIEWS WITH FULL SCOPE DISCIPLINE) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-15">
        
        {/* LEFT COLUMN: PRIMARY DYNAMIC ACTION WIDGETS */}
        <div className="lg:col-span-8 space-y-6">

          {/* SOS SYSTEM VIEW */}
          {activeNav === "sos" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-red-500 uppercase tracking-tight">🚨 Emergency SOS Wing</h2>
                  <span className="text-xs text-slate-500 font-medium">One-Tap Broadcast Coordinates to Local Agencies immediately.</span>
                </div>
                <span className="p-2 bg-red-600/10 text-red-500 rounded-xl">
                  <Activity className="h-5 w-5 animate-pulse" />
                </span>
              </div>

              {/* Big Red SOS Button */}
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-sm font-semibold max-w-sm mb-6 text-slate-400">
                  Pressing this button broadcasts your exact current coordinates to Apollo Hospital trauma responders, designated police patrols, and your emergency family contacts.
                </p>

                <div className="relative mb-8">
                  {sosActive && (
                    <div className="absolute -inset-8 bg-red-600/20 round-full rounded-full blur-xl animate-pulse"></div>
                  )}
                  <button
                    onClick={sosActive ? cancelSOS : triggerSOS}
                    className={`h-48 w-48 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all relative z-10 tracking-widest font-black uppercase ring-8 cursor-pointer ${
                      sosActive
                        ? "bg-slate-950 text-red-500 hover:bg-slate-900 border border-red-500 ring-red-500/20 glow-red"
                        : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 border border-red-400 ring-red-600/20"
                    }`}
                  >
                    <span className="text-4xl mb-1">🚨</span>
                    <span className="text-xs font-bold leading-none">{sosActive ? "DISARM" : "TAP TO BROADCAST"}</span>
                    <span className="text-lg font-black tracking-widest mt-1">{sosActive ? "SOS ON" : "SOS"}</span>
                  </button>
                </div>

                <div className="w-full max-w-md bg-red-500/5 border border-red-500/20 p-4 rounded-2xl mb-8">
                  <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 inline-block mr-2 animate-pulse"></span>
                    Broadcasting Frame Details:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 text-left">
                    <div>GPS Lat: <span className="text-slate-100 font-bold">{userLocation.lat.toFixed(6)}° N</span></div>
                    <div>GPS Lng: <span className="text-slate-100 font-bold">{userLocation.lng.toFixed(6)}° E</span></div>
                    <div>Local City: <span className="text-slate-100 font-bold">Hyderabad, TS</span></div>
                    <div>Primary Node: <span className="text-slate-100 font-bold">Apollo Trauma Desk</span></div>
                  </div>
                </div>

                {/* Simulated Response Timeline */}
                {sosActive && (
                  <div className="w-full max-w-md bg-slate-950/80 p-5 rounded-2xl border border-white/10 text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                        SOS Dispatched
                      </span>
                      <span className="text-xs font-mono text-slate-400">ETA: {sosTimer > 0 ? `${sosTimer}s` : "Arrived"}</span>
                    </div>

                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 transition-all duration-1000"
                        style={{ width: `${((25 - sosTimer) / 25) * 100}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-slate-400">
                      Our dispatch coordinators have notified Dr. Arundhati and nearby Apollo ICU Ambulance. Please sit tight and ensure your phone is accessible.
                    </p>
                  </div>
                )}
              </div>

              {/* Emergency Contact List Manager (Full Scope Reactivity) */}
              <div className="border-t border-slate-500/25 pt-6 mt-4">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <Users className="h-4.5 w-4.5 text-blue-500" />
                  Your Active Responders / Emergency Contacts
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {customContacts.map((contact, idx) => (
                    <div key={idx} className={`p-4 rounded-xl flex items-center justify-between ${innerCardClass}`}>
                      <div>
                        <div className="font-bold text-sm text-slate-200">{contact.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{contact.phone}</div>
                      </div>
                      <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-mono font-bold">
                        Notified
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add emergency contact form */}
                <form onSubmit={handleAddContact} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Configure New Custom Responder:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Name (e.g. Brother, Local Clinic)"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-lg border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone (+91 XXXXX XXXXX)"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-lg border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    Secure Custom Responder
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* BLOOD DONOR NETWORK VIEW */}
          {activeNav === "blood" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-red-500 uppercase tracking-tight">🩸 Blood Donor Network</h2>
                  <span className="text-xs text-slate-500 font-medium">Connect directly with certified community blood donors inside India.</span>
                </div>
                <span className="p-2 bg-red-600/10 text-red-500 rounded-xl">
                  <Heart className="h-5 w-5 fill-current animate-pulse" />
                </span>
              </div>

              {/* SEARCH FILTERS */}
              <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-600/20 mb-6 space-y-4">
                <div className="text-sm font-bold tracking-tight text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Tactical Selection Criteria
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1.5">Blood Group Required</label>
                    <select
                      value={filterBloodGroup}
                      onChange={(e) => setFilterBloodGroup(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-transparent cursor-pointer ${isDark ? "border-white/10 text-white" : "border-slate-300 text-slate-900"}`}
                    >
                      <option value="All" className="text-slate-900">All Blood Types</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => (
                        <option key={g} value={g} className="text-slate-900">{g}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1.5">State (Localization Default: IND)</label>
                    <select
                      value={filterState}
                      onChange={(e) => {
                        setFilterState(e.target.value);
                        setFilterCity("All");
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-transparent cursor-pointer ${isDark ? "border-white/10 text-white" : "border-slate-300 text-slate-900"}`}
                    >
                      {STATES.map(st => (
                        <option key={st} value={st} className="text-slate-900">{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1.5">City</label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-transparent cursor-pointer ${isDark ? "border-white/10 text-white" : "border-slate-300 text-slate-900"}`}
                    >
                      <option value="All" className="text-slate-900">All Cities</option>
                      {CITIES_BY_STATE[filterState]?.map(ct => (
                        <option key={ct} value={ct} className="text-slate-900">{ct}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase text-slate-400 font-bold mb-1.5">
                    <span>Proximity Radius Limit</span>
                    <span className="text-blue-400">{distRange} km</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={distRange}
                    onChange={(e) => setDistRange(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* LIST OF DONORS */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Matches Found ({filteredDonors.length})
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Real-Time Distance Synced</span>
                </div>

                {filteredDonors.length === 0 ? (
                  <div className="text-center py-10 bg-white/5 rounded-2xl text-slate-400 text-sm">
                    ⚠️ No compatible blood donors currently found matching filter selection inside {filterCity}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredDonors.map((donor) => (
                      <div key={donor.id} className={`p-4 rounded-2xl flex flex-col justify-between ${innerCardClass} transition-all`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-sm flex items-center gap-1.5">
                              {donor.name}
                              <span className="p-1 bg-red-600/10 text-[#EF4444] font-black text-xs rounded">
                                {donor.bloodGroup}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 text-left">
                              <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                              {donor.city}, {donor.state} ({donor.distance.toFixed(1)} km)
                            </div>
                          </div>
                          {donor.available ? (
                            <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-widest leading-none">
                              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                              Active
                            </span>
                          ) : (
                            <span className="bg-slate-500/20 text-slate-400 text-[10px] px-2 py-0.5 rounded-full">
                              Busy
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-500/10 pt-3 mt-3">
                          <div className="text-[10px] text-slate-500 font-medium">
                            <span className="font-bold text-blue-400">{donor.completedDonations}</span> Donations Completed
                          </div>
                          <a
                            href={`tel:${donor.phone}`}
                            onClick={() => addNotification(`📞 Opening cell call dialogue with direct blood donor ${donor.name}`)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all uppercase"
                          >
                            <Phone className="h-3 w-3" />
                            Request Urgently
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* POST AN EMERGENCY BLOOD REQUEST FORM (REACTIVE) */}
              <div className="border-t border-slate-500/25 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Submit general request alert */}
                <div className="p-5 rounded-2xl bg-red-600/5 border border-red-500/15">
                  <h3 className="text-sm font-bold text-red-500 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <BadgeAlert className="h-4.5 w-4.5" />
                    Broadcasting Emergency Group Request
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Need instant multiple donations? Submit an immediate urgent trigger to all compatible blood group holders in {filterCity}.
                  </p>
                  
                  <div className="flex gap-2">
                    <select
                      value={requestBloodGroup}
                      onChange={(e) => setRequestBloodGroup(e.target.value)}
                      className={`px-3 py-1.5 text-xs rounded-xl border bg-transparent cursor-pointer ${isDark ? "border-white/10 text-white" : "border-slate-300 text-slate-900"}`}
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(g => (
                        <option key={g} value={g} className="text-slate-900">{g}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addNotification(`📡 BROADCAST: All ${requestBloodGroup} users in ${filterState} have received a priority SMS alert!`)}
                      className="flex-1 px-4 py-2 bg-[#EF4444] text-white hover:bg-red-700 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase"
                    >
                      Broadcast to {requestBloodGroup} Donors
                    </button>
                  </div>
                </div>

                {/* Volunteer to donor network */}
                <form onSubmit={handleRegisterDonor} className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <Heart className="h-4.5 w-4.5 text-red-500" />
                    Join India's Blood Network
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    Voluntarily add your name to help save pregnant mothers and trauma surgery patients.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newDonorName}
                        onChange={(e) => setNewDonorName(e.target.value)}
                        className={`px-3 py-1.5 rounded-lg border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone No."
                        value={newDonorPhone}
                        onChange={(e) => setNewDonorPhone(e.target.value)}
                        className={`px-3 py-1.5 rounded-lg border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={newDonorGroup}
                        onChange={(e) => setNewDonorGroup(e.target.value)}
                        className={`px-2 py-1.5 rounded-lg border bg-slate-900 text-white outline-none cursor-pointer`}
                      >
                        {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(g => (
                          <option key={g} value={g} className="text-slate-900">{g}</option>
                        ))}
                      </select>
                      <select
                        value={newDonorState}
                        onChange={(e) => setNewDonorState(e.target.value)}
                        className={`px-2 py-1.5 rounded-lg border bg-slate-900 text-white outline-none cursor-pointer`}
                      >
                        {STATES.map(st => (
                          <option key={st} value={st} className="text-slate-900">{st}</option>
                        ))}
                      </select>
                      <select
                        value={newDonorCity}
                        onChange={(e) => setNewDonorCity(e.target.value)}
                        className={`px-2 py-1.5 rounded-lg border bg-slate-900 text-white outline-none cursor-pointer`}
                      >
                        {CITIES_BY_STATE[newDonorState]?.map(ct => (
                          <option key={ct} value={ct} className="text-slate-900">{ct}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer text-center uppercase"
                    >
                      Authenticate and Register as Active Donor
                    </button>
                  </div>
                </form>

              </div>

            </div>
          )}

          {/* HOSPITAL FINDER VIEW */}
          {activeNav === "hospitals" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">🏥 Hospital Finder</h2>
                  <span className="text-xs text-slate-500 font-medium">Verify live intensive care units, general beds availability and critical rating indices.</span>
                </div>
                <span className="p-2 bg-blue-600/10 text-blue-500 rounded-xl">
                  <Shield className="h-5 w-5 animate-pulse" />
                </span>
              </div>

              {/* Hospital type selectors */}
              <div className="flex flex-wrap gap-2 mb-6 text-xs">
                {["All", "Trauma", "Private", "Government", "Cardiac", "Children"].map(tType => (
                  <button
                    key={tType}
                    onClick={() => setHospitalTypeFilter(tType)}
                    className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold uppercase ${
                      hospitalTypeFilter === tType
                        ? "bg-blue-600 text-white border-blue-500 shadow-md"
                        : `${isDark ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`
                    }`}
                  >
                    {tType === "All" ? "All Divisions" : `${tType} Centers`}
                  </button>
                ))}
              </div>

              {/* Grid lists of compatible hospitals */}
              <div className="grid grid-cols-1 gap-3.5">
                {filteredHospitals.map((hosp) => {
                  const isSelected = selectedHospital?.id === hosp.id;
                  return (
                    <div
                      key={hosp.id}
                      onClick={() => setSelectedHospital(hosp)}
                      className={`p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "bg-blue-500/10 border-2 border-blue-500 shadow-lg"
                          : `${innerCardClass}`
                      }`}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-2xl shrink-0 ${isSelected ? "bg-blue-500 text-white" : "bg-red-500/10 text-[#EF4444]"}`}>
                          <Shield className="h-6 w-6" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="font-display font-black text-base flex flex-wrap items-center gap-2">
                            {hosp.name}
                            <span className="px-2 py-0.5 bg-blue-600/10 text-blue-400 text-[10px] rounded uppercase font-bold tracking-widest font-mono">
                              {hosp.type}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-500 font-medium text-left">{hosp.address} • {hosp.city}, {hosp.state}</p>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400 font-mono mt-2">
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {hosp.rating} Rating
                            </span>
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Activity className="h-3.5 w-3.5" />
                              {hosp.bedsAvailable} Beds Available
                            </span>
                            <span className="text-blue-400">
                              Dist: {hosp.distance} km
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-slate-500/10 pt-4 md:pt-0 mt-4 md:mt-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Trauma Index</span>
                          <span className="font-mono text-base font-black text-red-500 leading-none">{hosp.emergencyRating.toFixed(1)}/10</span>
                        </div>

                        <div className="flex gap-1.5 mt-2">
                          <a
                            href={`tel:${hosp.phone}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addNotification(`📞 Dialing trauma hotline for ${hosp.name}`);
                            }}
                            className="p-2 bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-500 rounded-lg text-xs font-bold transition-all"
                            title="Call Dispatch"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHospital(hosp);
                              addNotification(`🗺️ Routing customized GPS tracking path to ${hosp.name}`);
                            }}
                            className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 uppercase"
                          >
                            <Navigation className="h-3.5 w-3.5" />
                            Guide Path
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hospital Location Summary Block */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EF4444]/20 rounded-full text-[#EF4444]">
                    <span className="text-xl">🏥</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-mono tracking-wider font-bold block">Currently Selected Primary Center</span>
                    <span className="font-bold text-sm text-slate-200">{selectedHospital?.name || "None Selected"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block">AMBULANCE COMPATIBILITY STATUS</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">Direct Route Cleared</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* AMBULANCE BOOKING VIEW */}
          {activeNav === "ambulances" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">🚑 Ambulance Dispatch & Live Tracking</h2>
                  <span className="text-xs text-slate-500 font-medium font-mono text-left block">Instant air and road ICU emergency booking. Secure localized rates.</span>
                </div>
                <span className="p-2 bg-blue-600/10 text-blue-500 rounded-xl">
                  <AmbIcon className="h-5 w-5 animate-pulse" />
                </span>
              </div>

              {/* Ambulance category tabs */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {["Basic", "ICU", "Advanced", "Air"].map((lvl) => {
                  const isActive = activeAmbulanceTab === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setActiveAmbulanceTab(lvl as any)}
                      className={`py-3 rounded-2xl border text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-500 shadow-md scale-102"
                          : `${isDark ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`
                      }`}
                    >
                      <span className="block text-sm mb-0.5">
                        {lvl === "Basic" && "🩺"}
                        {lvl === "ICU" && "🚑"}
                        {lvl === "Advanced" && "🚨"}
                        {lvl === "Air" && "🚁"}
                      </span>
                      {lvl}
                    </button>
                  );
                })}
              </div>

              {/* Booked Ambulance progress bar if active */}
              {bookedAmbulanceId && (
                <div className="bg-emerald-600/10 border border-emerald-500/20 p-5 rounded-3xl my-6 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-bold tracking-widest font-mono uppercase flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Ambulance En Route
                    </span>
                    <span className="font-mono text-slate-400 font-extrabold text-xs">
                      Time Remaining: {ambulanceEta > 0 ? `${ambulanceEta} Mins` : "Arrived"}
                    </span>
                  </div>

                  <div className="h-2 bg-emerald-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000"
                      style={{ width: `${ambulanceProgress * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                    <span>Driver: Capt. Ramesh Kumar</span>
                    <a href="tel:+919848511001" className="text-emerald-400 font-bold hover:underline">
                      Call Dispatcher
                    </a>
                  </div>
                </div>
              )}

              {/* Grid display of Ambulance types with pricing localization Indian Rupee (₹) */}
              <div className="space-y-4">
                {ambulancesList.map((amb) => {
                  const isMatch = amb.type.includes(activeAmbulanceTab);
                  if (!isMatch) return null;

                  return (
                    <div key={amb.id} className={`p-5 rounded-2xl border ${innerCardClass} transition-all`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3.5 bg-blue-600/10 text-blue-500 rounded-2xl">
                            <AmbIcon className="h-7 w-7" />
                          </div>
                          <div>
                            <h3 className="font-display font-black text-base text-slate-100">{amb.type}</h3>
                            <p className="text-xs text-slate-500 font-mono">ID: {amb.vehicleNo} • Driver: {amb.driverName}</p>
                            
                            <div className="flex items-center gap-3 text-xs mt-2 text-slate-400 font-semibold">
                              <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                                <ClockIcon />
                                ETA: {amb.eta} Mins
                              </span>
                              <span>•</span>
                              <span>Available Online</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-0 border-slate-500/10 pt-4 sm:pt-0">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">Standard Rural Fee</span>
                          <span className="text-xl font-display font-black text-emerald-500 tracking-tight">₹{amb.price.toLocaleString("en-IN")}</span>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setBookedAmbulanceId(amb.id);
                              setSelectedAmbulance(amb);
                              addNotification(`🚑 DISPATCH CALL: ${amb.type} (${amb.vehicleNo}) reserved successfully. Base cost listed: ₹${amb.price}.`);
                            }}
                            className={`w-full sm:w-auto mt-2.5 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 text-xs font-black rounded-xl transition-all cursor-pointer uppercase`}
                          >
                            Book & Dynamic Track
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* GLOBAL SEARCH SYSTEM DISPLAY VIEW */}
          {activeNav === "search" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6 text-left">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">🔍 Global Emergency Search</h2>
                  <span className="text-xs text-slate-400 font-medium font-mono">Cross-referencing 10 indices: Clinics, Donors, Pharmacies, Police, Fire, NGOs...</span>
                </div>
              </div>

              <GlobalSearchPanel
                onSelectResult={(category, item) => {
                  if (category === "Hospital") {
                    setSelectedHospital(item);
                    addNotification(`📍 Point of Interest selected: Hospital ${item.name} mapped.`);
                  } else {
                    addNotification(`📍 Point of interest matching ${item.name} coordinate registered.`);
                  }
                  setActiveNav("home");
                }}
                onInitiateCall={(name, phone) => {
                  initiateCall(name, phone, "Audio");
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                language={language}
              />
            </div>
          )}

          {/* TELEMEDICINE & ONLINE CONSULTATION VIEW */}
          {activeNav === "telemedicine" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6 text-left">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">🩺 24/7 Telehealth Consultations</h2>
                  <span className="text-xs text-slate-500 font-medium">Verify credentials and match slots with validated online medical officers.</span>
                </div>
              </div>

              <TelehealthCenter
                onInitiatePayment={(amount, purpose, onSuccess) => {
                  triggerPayment(amount, purpose, (txnId) => {
                    onSuccess();
                  });
                }}
                addNotification={addNotification}
                isDark={isDark}
              />
            </div>
          )}

          {/* EMGERGENCY PRESCRIPTION & MEDS DELIVERIES */}
          {activeNav === "medicine" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl text-left space-y-6`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">💊 Pharmacy Drug Dispatch</h2>
                  <span className="text-xs text-slate-500 font-medium">Upload Rx prescriptions for instant home delivery or buy emergency aid kits.</span>
                </div>
                <span className="p-2 bg-blue-600/10 text-blue-400 rounded-xl">
                  <Activity className="h-5 w-5 animate-spin" />
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload prescription OCR scanner */}
                <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">OCR Prescription Scanner</h4>
                  
                  {prescFileScanning ? (
                    <div className="py-8 text-center space-y-2 animate-pulse">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
                      <span className="text-xs text-slate-300 font-mono block">Extracting drug chemical tags ({prescScanningProgress}%)...</span>
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        setPrescFileScanning(true);
                        setPrescScanningProgress(10);
                        let prog = 10;
                        const t = setInterval(() => {
                          prog += 30;
                          setPrescScanningProgress(prog);
                          if (prog >= 100) {
                            clearInterval(t);
                            setPrescFileScanning(false);
                            setScannedMedItems(["Amoxicillin 500mg (10 tabs)", "Ibuprofen 400mg (15 tabs)"]);
                            addNotification("🩺 OCR SCAN: Extracted pharmacy compounds successfully. Cart loaded.");
                          }
                        }, 400);
                      }}
                      className="py-10 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all"
                    >
                      <span className="text-3xl mb-2">📄</span>
                      <span className="text-xs font-bold text-slate-300">Upload Rx Script Photo</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-1">Simulates AI drug tag parsing on click</span>
                    </div>
                  )}

                  {scannedMedItems.length > 0 && (
                    <div className="p-3 bg-blue-900/10 rounded-xl border border-blue-500/10 space-y-2">
                       <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block">Scanned Compounds Found:</span>
                       {scannedMedItems.map((med, idx) => (
                         <div key={idx} className="flex justify-between items-center text-xs">
                           <span className="font-mono text-slate-200">{med}</span>
                           <button 
                             onClick={() => {
                               triggerPayment(240, `Prescription order: ${med}`, (txn) => {
                                 addNotification(`📦 DRUG DISPATCHED: Handover complete to courier unit. Delivery expected in 25 mins. [ID: ${txn}]`);
                                 setScannedMedItems([]);
                               });
                             }} 
                             className="px-2.5 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
                           >
                             Order (₹240)
                           </button>
                         </div>
                       ))}
                    </div>
                  )}
                </div>

                {/* Dosage Alarms scheduling catalog */}
                <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">Pills Intake Reminder Tracker</h4>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {medDosageAlarms.map((alm, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950/85 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">{alm.name}</span>
                        <span className="font-mono text-[#EF4444] bg-[#EF4444]/15 px-2 py-0.5 rounded font-black">{alm.time}</span>
                      </div>
                    ))}
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newAlarmMedName.trim()) return;
                      setMedDosageAlarms(prev => [...prev, { name: newAlarmMedName, time: newAlarmTime }]);
                      setNewAlarmMedName("");
                      addNotification(`⏰ DOSAGE ALARM: Reminder set for ${newAlarmMedName} at ${newAlarmTime}.`);
                    }}
                    className="grid grid-cols-1 gap-2 border-t border-slate-800/60 pt-3"
                  >
                    <input 
                      type="text" 
                      placeholder="Med Name (e.g. Lipitor)" 
                      value={newAlarmMedName}
                      onChange={(e) => setNewAlarmMedName(e.target.value)}
                      className={`px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 font-mono`}
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                       <input 
                         type="text" 
                         placeholder="e.g. 09:30 PM" 
                         value={newAlarmTime}
                         onChange={(e) => setNewAlarmTime(e.target.value)}
                         className={`px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 font-mono`}
                         required
                       />
                       <button type="submit" className="px-3 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase cursor-pointer">Set Alarm</button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Instant Emergency Aid kits buy */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                 <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">Emergency Aid Rapid Kits (Instant Rider Dispatch)</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Cardiac Trauma Pocket Kit", price: 350, desc: "Aspirin, nitro tablets, pulse tracker meter" },
                      { name: "Haemorrhage Bleed Stop Kit", price: 420, desc: "Coagulant tourniquets, sterile wraps, gauzes" },
                      { name: "Asthma Emergency Resus", price: 290, desc: "Salbutamol inhalers, respiratory guidelines booklet" }
                    ].map((kit, idx) => (
                      <div key={idx} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between text-left">
                        <div>
                          <h5 className="font-bold text-xs text-slate-200">{kit.name}</h5>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-mono">{kit.desc} </p>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-900">
                          <span className="text-sm font-bold text-emerald-400">₹{kit.price}</span>
                          <button 
                            onClick={() => {
                              triggerPayment(kit.price, `Purchase of ${kit.name}`, (txn) => {
                                addNotification(`🚚 RAPID DISPATCH: Rider coordinates active. ${kit.name} left nearest hub. [ID: ${txn}]`);
                              });
                            }}
                            className="px-2.5 py-1 bg-red-650 hover:bg-red-700 text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer"
                          >
                            Buy Rapid
                          </button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* SECURE DIGITAL RECORDS VAULT VIEW */}
          {activeNav === "vault" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-400/20 pb-4 mb-6 text-left animate-fade-in">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">🔒 Digital Records Storage</h2>
                  <span className="text-xs text-slate-500 font-medium font-mono">Store medical reports, vaccination profiles, and diagnostic scans under peer encryption safeguards.</span>
                </div>
              </div>

              <HealthVault addNotification={addNotification} isDark={isDark} />
            </div>
          )}

          {/* DISASTER MANAGEMENT OUTPOST & CLIMATE WARNINGS */}
          {activeNav === "alerts" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-400/10 pb-4 mb-6 text-left">
                <div>
                  <h2 className="text-2xl font-display font-black text-amber-500 uppercase tracking-tight">🌀 Disaster Management Outpost</h2>
                  <span className="text-xs text-slate-500 font-medium">Configure climate tracking feeds, search designated safety shelters and tactical camps.</span>
                </div>
              </div>

              <DisasterHub
                onCall={(phone) => initiateCall(`Crisis Dispatch Desk`, phone, "Audio")}
                isDark={isDark}
              />
            </div>
          )}

          {/* FAMILY DASHBOARD VIEW */}
          {activeNav === "family" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-emerald-400 uppercase tracking-tight">👨‍👩‍👧 Family Safety Hub</h2>
                  <span className="text-xs text-slate-500 font-medium">Coordinate live GPS check-ins, tracking alerts and safety status flags.</span>
                </div>
                <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <User className="h-5 w-5 animate-pulse" />
                </span>
              </div>

              {/* Family statuses cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {familyList.map((fam) => {
                  const isPanicked = fam.status === "SOS Panicked";
                  return (
                    <div
                      key={fam.id}
                      onClick={() => setSelectedFamilyMember(fam)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        selectedFamilyMember?.id === fam.id 
                          ? "border-emerald-400 ring-2 ring-emerald-500/20 bg-emerald-600/5 shadow-xl"
                          : `${innerCardClass}`
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-slate-200">{fam.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">{fam.relation}</span>
                        </div>
                        
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${
                          isPanicked ? "bg-red-600 text-white animate-pulse" : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                          {fam.status}
                        </span>
                      </div>

                      <div className="space-y-2 mt-4 text-xs">
                        <div className="flex justify-between text-slate-500 font-mono text-[10px]">
                          <span>Battery status:</span>
                          <span className={`font-bold flex items-center gap-1 ${fam.battery < 20 ? "text-red-500" : "text-emerald-400"}`}>
                            <BatteryCharging className="h-3 w-3 shrink-0" />
                            {fam.battery}%
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400 leading-snug line-clamp-1 border-t border-slate-500/10 pt-2.5 text-left">
                          <MapPin className="h-3 w-3 inline mr-1 text-slate-500" />
                          {fam.lastLocation}
                        </div>
                      </div>

                      {isPanicked && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addNotification(`🚨 EXTREME ALERT: Dispensing emergency rescue vector coordinates to assist ${fam.name}!`);
                          }}
                          className="w-full mt-3 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold transition-all hover:bg-red-700 uppercase"
                        >
                          Disseminate Help
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Family safe checkpoint broadcaster */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-left">
                  <span className="font-bold text-sm text-slate-200 block mb-0.5">Need a quick reassurance broadcast?</span>
                  <span className="text-xs text-slate-500">Tap here to mark your device coordinate state as perfectly safe to all units.</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addNotification("👨‍👩‍👧 Broadcast success: Family updated with safe check-in coordinate confirmation.");
                  }}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs rounded-xl transition-all cursor-pointer uppercase"
                >
                  Send "I Am Safe" Check-In
                </button>
              </div>

            </div>
          )}

          {/* COMMUNITY SECTION */}
          {activeNav === "community" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-red-500 uppercase tracking-tight">🤝 Community Relief network</h2>
                  <span className="text-xs text-slate-500 font-medium">Join verified disaster defense volunteers and local civic leaders throughout India.</span>
                </div>
                <span className="p-2 bg-red-600/10 text-red-500 rounded-xl">
                  <Award className="h-5 w-5 animate-bounce" />
                </span>
              </div>

              {/* Leaderboard stats header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${innerCardClass} text-left`}>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-0.5">Top Hyderabad Squad Rank</div>
                  <div className="text-2xl font-display font-black text-blue-500">9.86 Lakh Points</div>
                </div>
                <div className={`p-4 rounded-2xl ${innerCardClass} text-left`}>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-0.5">Active Volunteer Responders</div>
                  <div className="text-2xl font-display font-black text-emerald-500">14,892 Online</div>
                </div>
              </div>

              {/* Leaderboard Table listing */}
              <div className="space-y-3.5 mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">🎖️ Active Leaderboard & Badges</h3>
                
                <div className="space-y-2">
                  {volunteersList.map((vol) => (
                    <div key={vol.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="p-1 px-2.5 bg-blue-600/10 text-blue-400 font-bold rounded">
                          #{vol.rank}
                        </span>
                        <div>
                          <div className="font-bold text-slate-200">{vol.name}</div>
                          <div className="text-[10px] text-slate-500">{vol.city} • {vol.donations} Blood Units</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block font-bold text-emerald-400">{vol.points} Pts</span>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block">{vol.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign up form */}
              {!registeredAsVolunteer ? (
                <form onSubmit={handleRegisterVolunteer} className="p-5 rounded-2xl bg-blue-600/5 border border-blue-600/15">
                  <div className="text-sm font-bold text-slate-200 mb-1 flex items-center gap-1">
                    <Sparkles className="h-4.5 w-4.5 text-blue-400" />
                    Enlist as certified Rescue Volunteer
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Ready to mobilize during flood storms or urgent blood transport transfers click to join the circle.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300 text-slate-900"}`}
                      required
                    />
                    <select
                      value={volunteerCity}
                      onChange={(e) => setVolunteerCity(e.target.value)}
                      className={`px-3 py-2 text-xs rounded-xl border bg-slate-950 text-white outline-none cursor-pointer`}
                    >
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Visakhapatnam">Visakhapatnam</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase"
                  >
                    Agree to Codes of conduct & Join Squad
                  </button>
                </form>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-center text-xs text-slate-300">
                  🎉 Registration successful. Welcome to the squad! Keep notifications active to receive coordinates.
                </div>
              )}

            </div>
          )}

          {/* ABOUT PLATFORM VIEW */}
          {activeNav === "about" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl text-left`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">💡 About LifeLink AI</h2>
                  <span className="text-xs text-slate-500 font-medium">Securing unified, hyper-fast emergency communication rails for humanity.</span>
                </div>
                <span className="p-2 bg-blue-600/10 text-blue-500 rounded-xl">
                  <Info className="h-5 w-5" />
                </span>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <p>
                  LifeLink AI leverages advanced artificial intelligence and low-latency geospatial mapping infrastructure to bridge the critical gap between life-threatening situations and medical services.
                </p>
                <p>
                  By localizing search vectors in India, we ensure ambulance vehicles sync seamlessly using localized Indian currency (₹), DD/MM/YYYY date grids, and precise mobile patterns.
                </p>
                
                <h3 className="text-sm font-bold text-slate-100 uppercase mt-6">Core Operational Goals:</h3>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Zero Bottlenecks:</strong> Connecting critical patient requests with volunteer blood donors in under 60 seconds.</li>
                  <li><strong>Real-time Synchronization:</strong> Keeping intensive care unit (ICU) bed counts tracked across cities like Hyderabad and Bengaluru.</li>
                  <li><strong>Active Meteorological Warnings:</strong> Providing immediate defensive warnings regarding cyclones, floods, and severe heatwaves.</li>
                </ul>
              </div>
            </div>
          )}

          {/* CONTACT & PARTNERSHIP VIEW */}
          {activeNav === "contact" && (
            <div className={`${glassPanelClass} rounded-3xl p-6 relative overflow-hidden shadow-2xl`}>
              <div className="flex items-center justify-between border-b border-slate-500/25 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-black text-blue-500 uppercase tracking-tight">✉️ Contact / Partner proposal</h2>
                  <span className="text-xs text-slate-500 font-medium">Join our growing ecosystem page. Integrate hospitals, blood banks or police stations.</span>
                </div>
                <span className="p-2 bg-blue-600/10 text-blue-500 rounded-xl">
                  <MessageSquare className="h-5 w-5" />
                </span>
              </div>

              {contactSuccess ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 text-slate-200 rounded-2xl">
                  <Check className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                  <span className="block font-bold text-sm">Thank You for Connecting!</span>
                  <span className="text-xs text-slate-400">Our liaison officer has registered your Indian hospital details.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300 text-slate-900"}`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Mobile (+91)</label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        placeholder="+91 "
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300 text-slate-900"}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">City / Region</label>
                      <input
                        type="text"
                        value={contactForm.locationName}
                        onChange={(e) => setContactForm({...contactForm, locationName: e.target.value})}
                        className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300"}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id="isPartnership"
                      checked={contactForm.isPartnership}
                      onChange={(e) => setContactForm({...contactForm, isPartnership: e.target.checked})}
                      className="accent-blue-600 rounded"
                    />
                    <label htmlFor="isPartnership" className="text-xs text-slate-300 font-bold cursor-pointer">
                      This is a formal Hospital / Blood Bank Partnership Request
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Message or Trauma Facility Details</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${isDark ? "bg-[#0B1220] border-white/10" : "bg-white border-slate-300 text-slate-900"}`}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Submit Proposal / Secure Message
                  </button>
                </form>
              )}

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: INTEGRATED INTERACTIVE TELEMETRY MAP + AI ASSISTANT WIDGETS */}
        <div className="lg:col-span-4 space-y-6">

          {/* 24/7 AI EMERGENCY ASSISTANT FLOATING CHAT PANEL */}
          <div className={`${glassPanelClass} rounded-[32px] p-5 flex flex-col space-y-4 relative overflow-hidden shadow-2xl h-[520px]`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-500/10">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    {t.aiAssistant}
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">24/7 Secure Server</p>
                </div>
              </div>

              {/* Speech Sound feedback indicator */}
              {isSpeaking ? (
                <button onClick={stopSpeaking} className="p-1 px-2 bg-red-600/20 text-red-500 text-[10px] font-bold rounded flex items-center gap-1">
                  <Volume2 className="h-3.5 w-3.5 animate-bounce" /> Mute
                </button>
              ) : (
                <span className="text-[10px] text-slate-500">Vol Ready</span>
              )}
            </div>

            {/* MESSAGE INTERACTION PANEL */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl text-xs max-w-[85%] text-left whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white/5 border border-white/5 text-slate-200 mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {chatLoading && (
                <div className="p-3 bg-white/5 border border-white/5 text-slate-300 rounded-2xl mr-auto max-w-[60%] flex items-center gap-2 text-xs">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Thinking first aid...
                </div>
              )}
            </div>

            {/* Preset Helpful search phrases */}
            <div className="pt-2 border-t border-slate-500/10">
              <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-2">Instant Emergency Checklists</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => sendChatMessage(undefined, "First aid steps for severe burns")}
                  className="px-2 py-1 bg-white/5 border border-whit/5 hover:bg-white/10 rounded-lg text-[9px] tracking-wide text-slate-400"
                >
                  🔥 Burn help
                </button>
                <button
                  onClick={() => sendChatMessage(undefined, "CPR instructions step by step")}
                  className="px-2 py-1 bg-white/5 border border-whit/5 hover:bg-white/10 rounded-lg text-[9px] tracking-wide text-slate-400"
                >
                  ❤️ CPR Steps
                </button>
                <button
                  onClick={() => sendChatMessage(undefined, "What to do for snake byte venom")}
                  className="px-2 py-1 bg-white/5 border border-whit/5 hover:bg-white/10 rounded-lg text-[9px] tracking-wide text-slate-400"
                >
                  🐍 Snake Bite
                </button>
              </div>
            </div>

            {/* SEND FORM */}
            <form onSubmit={sendChatMessage} className="relative mt-2">
              <input
                type="text"
                placeholder="Ask e.g. Choking rescue..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className={`w-full pl-3 pr-10 py-2 rounded-xl text-xs outline-none ${
                  isDark ? "bg-[#0B1220] border border-white/10 text-white" : "bg-white border border-slate-300 text-slate-950"
                }`}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:text-blue-400 shrink-0 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* NATIONAL HOTLINE ACCIDENTS CARD */}
          <div className={`${glassPanelClass} rounded-3xl p-5 shadow-xl`}>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#EF4444] mb-4 flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              {t.nationalHotlines}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {INDIA_EMERGENCY_NUMBERS.map((n) => (
                <a
                  key={n.number}
                  href={`tel:${n.number}`}
                  onClick={() => addNotification(`📞 Opening cell call to ${n.number}`)}
                  className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${innerCardClass}`}
                >
                  <span className="text-xl font-display font-black text-red-500">{n.number}</span>
                  <span className="text-[10px] text-slate-200 mt-0.5 leading-none font-bold">{n.label.split(" & ")[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* PORTABLE MOBILE APP SHOWCASE */}
          <div className={`${glassPanelClass} rounded-3xl p-5 shadow-xl relative overflow-hidden bg-gradient-to-br from-blue-900/10 to-transparent flex flex-col justify-between`}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-mono">Mobile Showcase</span>
                <span className="text-[10px] bg-red-600/15 text-red-400 px-2 py-0.5 rounded">Companion App</span>
              </div>
              <h4 className="font-display font-black text-sm text-slate-100 mb-1 leading-tight text-left">Get LifeLink AI on your Mobile</h4>
              <p className="text-[11px] text-slate-400 mb-4 text-left">Track ambulance vehicles natively with continuous device locks on Android & iOS.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => addNotification("📲 Starting LifeLink companion android APK package download dialog...")}
                className="py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] rounded-lg tracking-wide text-slate-200 cursor-pointer uppercase text-center font-bold"
              >
                📥 For Android
              </button>
              <button
                type="button"
                onClick={() => addNotification("📲 Opening companion Apple App Store verification layout link...")}
                className="py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] rounded-lg tracking-wide text-slate-200 cursor-pointer uppercase text-center font-bold"
              >
                📥 For iPhone
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* PREMIUM VISUAL TESTIMONIALS CAROUSEL SECTION */}
      <section className={`py-12 ${isDark ? "bg-[#0b1220]/70 border-t border-white/5" : "bg-slate-200/50 border-t border-slate-300"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-display font-black tracking-tight text-center mb-8 uppercase text-slate-200">
            Approved by Paramedics, Emergency Volunteers & Families
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-3xl ${glassPanelClass} text-left`}>
              <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                "Our Hyderabad hospital wing integrated with the LifeLink trauma feed. We reduce medical critical responder ETA to just 18 minutes."
              </p>
              <span className="block font-bold text-xs text-slate-200">Dr. Arundhati</span>
              <span className="text-[10px] text-slate-500 font-mono block">Apollo Trauma Lead, Hyderabad</span>
            </div>

            <div className={`p-6 rounded-3xl ${glassPanelClass} text-left`}>
              <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                "Found rare O- blood donor matching group criteria in under 4 minutes during emergency surgery. Excellent India localization!"
              </p>
              <span className="block font-bold text-xs text-slate-200">Preethi Reddy</span>
              <span className="text-[10px] text-slate-500 font-mono block">Voluntarily Saved Mother, Bengaluru</span>
            </div>

            <div className={`p-6 rounded-3xl ${glassPanelClass} text-left`}>
              <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                "The family safety live check-in tracks location instantly. Disasters map warnings alert us of bad storms before leaving home."
              </p>
              <span className="block font-bold text-xs text-slate-200">Amit Mahajan</span>
              <span className="text-[10px] text-slate-500 font-mono block">Mumbai Citizen User</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 border-t border-white/5 py-12 px-4 relative z-10 font-sans mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-base">L</span>
              </div>
              <span className="text-base font-bold text-slate-200">LifeLink AI</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-left">
              India's leading futuristic unified crisis and trauma support interface. Connect blood donors, live intensive clinics and emergency flight dispatch systems in under 60s.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-3">Quick Navigation</h4>
            <ul className="text-xs space-y-2 text-left">
              <li><button onClick={() => setActiveNav("home")} className="hover:text-blue-500 transition-colors">Home Base</button></li>
              <li><button onClick={() => setActiveNav("sos")} className="hover:text-blue-500 transition-colors">Emergency SOS Broadcast</button></li>
              <li><button onClick={() => setActiveNav("blood")} className="hover:text-blue-500 transition-colors">Blood Donors Network</button></li>
              <li><button onClick={() => setActiveNav("hospitals")} className="hover:text-blue-500 transition-colors">Locate Partner Hospitals</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-3">Community & Safety</h4>
            <ul className="text-xs space-y-2 text-left">
              <li><button onClick={() => setActiveNav("alerts")} className="hover:text-blue-500 transition-colors">Disaster Weather Bulletins</button></li>
              <li><button onClick={() => setActiveNav("family")} className="hover:text-blue-500 transition-colors">Family GPS Safety Check-in</button></li>
              <li><button onClick={() => setActiveNav("community")} className="hover:text-blue-500 transition-colors">Join Squad Volunteers</button></li>
              <li><button onClick={() => setActiveNav("contact")} className="hover:text-blue-500 transition-colors">Request Partnership Interface</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-3">Indian Localization</h4>
            <ul className="text-xs space-y-2 text-left">
              <li>Currency: <span className="text-emerald-400 font-bold">₹ Indian Rupee</span></li>
              <li>Date Structure: <span className="text-slate-300 font-mono">DD/MM/YYYY</span></li>
              <li>Default Mobile: <span className="text-slate-300 font-mono">+91 XXXXX XXXXX</span></li>
              <li>National Emergency: <span className="text-red-500 font-bold">112 (National Dial)</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <p>© 2026 LifeLink AI. Designed for elite public safety coordinates tracking. Active India Wide.</p>
          <div className="flex gap-4 mt-4 sm:mt-0 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Rescue</a>
            <a href="#" className="hover:text-slate-200 text-slate-350">Status: Operational</a>
          </div>
        </div>

      {/* ======================================================== */}
      {/* 1. GLOBAL ONE-TAP DIRECT CALL STATUS DIALING SCREEN OVERLAY */}
      {activeCallContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-lg bg-[#0c1220] border-2 border-[#EF4444]/30 rounded-[32px] p-6 shadow-2xl overflow-hidden flex flex-col text-slate-100">
            {/* Red alert gradient glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-blue-600"></div>
            <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
              Secure Channel Encrypted
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#EF4444] font-bold block mb-1">
                  LifeLink emergency line [{activeCallContact.type}]
                </span>
                <h3 className="text-xl font-display font-black text-white leading-tight">
                  Dialing {activeCallContact.name}
                </h3>
                <span className="font-mono text-xs text-blue-400 mt-1 block">Phone: {activeCallContact.phone}</span>
              </div>
            </div>

            <div className="py-8 bg-slate-950/60 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden mb-6">
              {/* Dynamic waveform visualizer based on call state */}
              <div className="h-16 flex items-end justify-center gap-1.5 mb-4">
                {activeCallStatus === "connecting" && (
                  <span className="text-xs font-mono text-slate-500 animate-pulse">Establishing cellular handshake...</span>
                )}
                {activeCallStatus === "ringing" && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-serif italic text-blue-400 animate-bounce">Ringing Line...</span>
                    <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-mono">Mobile handshaked</span>
                  </div>
                )}
                {activeCallStatus === "connected" && (
                  Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.floor(10 + Math.random() * 45)}px`,
                        animationDuration: `${300 + i * 80}ms`
                      }}
                    ></div>
                  ))
                )}
              </div>

              {/* Status details */}
              <div className="z-10 bg-slate-900/80 px-4 py-1 rounded-full border border-white/5 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                Connection Code: {activeCallStatus.toUpperCase()} {activeCallStatus === "connected" && `• ${Math.floor(activeCallDuration / 60).toString().padStart(2, "0")}:${(activeCallDuration % 60).toString().padStart(2, "0")}`}
              </div>
            </div>

            {/* Conference / Dispatch Buttons bar */}
            {activeCallStatus === "connected" && (
              <div className="mb-6 space-y-3 col-span-2">
                 <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest text-left">Conference & Dispatch Actions</span>
                 <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        addNotification(`📞 PATCHING: Inviting nearest trauma pediatrician and cardiologist to active line...`);
                      }}
                      className="p-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/15 rounded-xl text-left text-xs font-bold transition-all cursor-pointer"
                    >
                      🗣️ Conf Call Family
                    </button>
                    <button
                      onClick={() => {
                        addNotification(`📞 DISPATCH COORD: Sending live SOS heart coordinates to call recipient...`);
                      }}
                      className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/15 rounded-xl text-left text-xs font-bold transition-all cursor-pointer"
                    >
                      🚀 Send Live telemetry
                    </button>
                    <button
                      onClick={() => {
                        addNotification(`📞 ALERT TEAM: Mobilised nearest responder NGO squad on active line coordinates.`);
                      }}
                      className="p-2.5 bg-red-650/10 hover:bg-red-650/20 text-[#EF4444] border border-red-500/15 rounded-xl text-left text-xs font-bold transition-all col-span-2 cursor-pointer text-center"
                    >
                      🤝 Patch Local Rescue Squad
                    </button>
                 </div>
              </div>
            )}

            {/* Reject/Hangup button */}
            <button
              onClick={() => {
                setActiveCallStatus("ended");
                setTimeout(() => {
                  setActiveCallContact(null);
                }, 800);
              }}
              className="w-full py-4 bg-[#EF4444] hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer shadow-lg shadow-red-950"
            >
              Hang Up / Close Secure Line
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. GLOBAL PAYMENT SIMULATOR MODAL PANEL */}
      <PaymentSimulator
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        amount={checkoutAmount}
        paymentFor={checkoutPurpose}
        onSuccess={(txnId) => {
          paymentsCallback.onPay(txnId);
        }}
      />

      {/* ======================================================== */}
      {/* 3. LOCKSCREEN EMERGENCY MEDICAL QR CARD PORTAL */}
      {qrcodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-left">
          <div className="relative w-full max-w-sm bg-[#0c1220] border-2 border-emerald-500/20 p-6 rounded-[32px] text-slate-100 flex flex-col text-center shadow-2xl">
            <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full mx-auto mb-4 border border-emerald-500/20">
              💔 Lock Code
            </span>
            <h3 className="text-xl font-display font-black uppercase text-white tracking-tight leading-none">Smart Emergency Lock QR</h3>
            <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed font-mono">
              Place this medical profile QR code on your lockscreen wallpaper. Paramedics can instantly read your crucial health stats without unlocking your device.
            </p>

            {/* Mimic QR Code Canvas Grid Layout */}
            <div className="p-6 bg-white rounded-3xl mx-auto mb-4 border-4 border-slate-900 shadow-inner flex flex-col items-center">
              <div className="grid grid-cols-6 gap-1 h-36 w-36 bg-slate-100">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${(i % 3 === 0 || i % 4 === 1 || i < 6 || i > 30) ? "bg-slate-950" : "bg-white"}`}
                  ></div>
                ))}
              </div>
              <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-blue-600 mt-3 block">
                AES-256 SECURED VSTATS
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl mb-4 text-left text-xs font-mono space-y-1">
              <div>• Group: <span className="font-bold text-red-500">AB Negative</span></div>
              <div>• Allergy: <span className="font-bold text-slate-200">Penicillin Pen-IV</span></div>
              <div>• Emergency Contact: <span className="font-bold text-slate-200">+91 94440 12389</span></div>
            </div>

            <button
              onClick={() => setQrcodeModalOpen(false)}
              className="py-2.5 px-5 w-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer font-mono"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. FLOATING WEARABLE SMARTWATCH & MEMBERSHIP MANAGER CONTROLLER */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none">
        
        {/* Watch Pulse Stream */}
        {isWatchSynced && (
          <div className="pointer-events-auto bg-slate-900/90 border border-blue-500/20 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all animate-fade-in text-left">
             <div className="h-10 w-10 bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/20 rounded-xl flex items-center justify-center font-black relative shrink-0">
               <span>⌚</span>
               <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-emerald-500 rounded-full border border-slate-900 animate-ping"></span>
             </div>
             <div>
                <span className="text-[8px] uppercase tracking-widest font-bold text-slate-500 font-mono block">Fitbit live telemetry synced</span>
                <span className="text-xs font-bold text-slate-200 block">Watch Pulse: <span className="text-[#EF4444] font-mono font-black">{activeWatchHeartRate} BPM</span></span>
                <span className="text-[10px] text-emerald-400 font-mono">Geofence Safe Radius</span>
             </div>
          </div>
        )}

        {/* Dynamic Sandbox Utility tools */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setQrcodeModalOpen(true)}
            className="p-3 bg-slate-900/95 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-bold text-xs"
            title="Open Emergency wallpaper QR Generator"
          >
            📋 QR ID
          </button>

          <button
             onClick={() => {
               // Initiate Payment to Upgrade
               const planPrice = userSubscriptionTier === "Free" ? 1999 : 0;
               if (planPrice > 0) {
                 triggerPayment(planPrice, `LifeLink Premium Lifesaver dispatch tier`, (txn) => {
                   setUserSubscriptionTier("Premium");
                   addNotification(`👑 LEVEL UP: Thank you! You have been upgraded to the Premium Priority Dispatch Tier (Active). [ID: ${txn}]`);
                 });
               } else {
                 addNotification(`👑 USER LEVEL: You are already a Premium responder! Fast-lane access is locked on.`);
               }
             }}
             className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold"
          >
             👑 {userSubscriptionTier === "Free" ? "UPGRADE (₹1,999)" : "TIER: PREMIUM ACTIVE"}
          </button>
        </div>

      </div>
      </footer>

    </div>
  );
}

// Micro icons
function ClockIcon() {
  return (
    <svg className="h-3 w-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
