import React, { useState, useEffect } from "react";
import { Search, Mic, Trash2, TrendingUp, Sparkles, MapPin, Phone, MessageSquare, Heart, Shield, Activity, RefreshCw } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  category: "Hospital" | "Ambulance" | "Blood Donor" | "Pharmacy" | "Police Station" | "Fire Station" | "NGO" | "Emergency Services" | "Doctor" | "Medical Shop";
  subText: string;
  distance: number;
  phone: string;
  available: boolean;
  city: string;
}

const SEARCH_DATABASE: SearchResult[] = [
  // Hospitals
  { id: "h1", name: "Apollo Emergency Traumas", category: "Hospital", subText: "24/7 Multi-Specialty, 14 beds left", distance: 2.1, phone: "+91 40 2360 7777", available: true, city: "Hyderabad" },
  { id: "h2", name: "NIMS Emergency Ward", category: "Hospital", subText: "State super-specialty, 45 beds left", distance: 4.3, phone: "+91 40 2348 9000", available: true, city: "Hyderabad" },
  { id: "h3", name: "Fortis Cardiac Emergency", category: "Hospital", subText: "Cardiac Critical specialists", distance: 3.5, phone: "+91 80 6621 4444", available: true, city: "Bengaluru" },
  // Ambulances
  { id: "a1", name: "Ramesh ICU Fleet", category: "Ambulance", subText: "Advanced cardiac life support", distance: 1.5, phone: "+91 98485 11001", available: true, city: "Hyderabad" },
  { id: "a4", name: "Capt. Shridhar Air Rescue", category: "Ambulance", subText: "Medevac Helicopter emergency wings", distance: 25.0, phone: "+91 88899 77553", available: true, city: "Hyderabad" },
  // Blood Donors
  { id: "d1", name: "Ravi Shankar (O+)", category: "Blood Donor", subText: "Elite donor, 14 successful donations", distance: 1.4, phone: "+91 98480 22338", available: true, city: "Hyderabad" },
  { id: "d2", name: "Ananya Deshmukh (AB-)", category: "Blood Donor", subText: "Rare blood type, 8 donations", distance: 3.8, phone: "+91 91234 56789", available: true, city: "Mumbai" },
  // Pharmacies & Medical Shops
  { id: "p1", name: "Apollo Pharmacy Gachibowli", category: "Pharmacy", subText: "24-Hours Emergency drug dispatch", distance: 1.1, phone: "+91 40 4012 3456", available: true, city: "Hyderabad" },
  { id: "p2", name: "MedPlus Jubilee Hills", category: "Medical Shop", subText: "Home drug dispatch with 10% discount", distance: 2.3, phone: "+91 40 4099 8877", available: true, city: "Hyderabad" },
  // Police & Fire Stations
  { id: "ps1", name: "Banjara Hills Police Wing", category: "Police Station", subText: "Urgent patrol dispatch and civil safety", distance: 1.9, phone: "100", available: true, city: "Hyderabad" },
  { id: "fs1", name: "Secunderabad Fire & Rescue", category: "Fire Station", subText: "Tactical flame containment crew", distance: 4.8, phone: "101", available: true, city: "Hyderabad" },
  // NGOs
  { id: "ng1", name: "Red Cross Hyderabad Chapter", category: "NGO", subText: "Free disaster assistance & medical rehabilitation", distance: 3.2, phone: "+91 40 2323 1212", available: true, city: "Hyderabad" },
  // Doctors
  { id: "dr1", name: "Dr. Arundhati Pampana", category: "Doctor", subText: "Senior Cardiologist & ER Specialist", distance: 2.1, phone: "+91 99080 88776", available: true, city: "Hyderabad" },
  { id: "dr2", name: "Dr. Sandeep Mehta", category: "Doctor", subText: "Emergency Pediatrician & Trauma lead", distance: 3.4, phone: "+91 94440 12389", available: true, city: "Hyderabad" }
];

interface GlobalSearchPanelProps {
  onSelectResult: (category: string, item: any) => void;
  onInitiateCall: (name: string, phone: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  language: "English" | "Telugu" | "Hindi";
}

export default function GlobalSearchPanel({ onSelectResult, onInitiateCall, searchQuery, setSearchQuery, language }: GlobalSearchPanelProps) {
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("lifelink-search-history");
    return saved ? JSON.parse(saved) : ["ICU Ambulance Jubilee Hills", "Apollo trauma beds", "Rare AB- blood donor"];
  });
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceWave, setVoiceWave] = useState<number[]>([12, 24, 8, 30, 16, 22, 10, 4, 18, 35, 14]);

  // Handle saving search queries to history
  const addQueryToHistory = (q: string) => {
    if (!q || q.trim().length < 3) return;
    const clean = q.trim();
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      localStorage.setItem("lifelink-search-history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("lifelink-search-history");
  };

  // Sound wave simulator for voice search
  useEffect(() => {
    let t: any;
    if (isVoiceActive) {
      t = setInterval(() => {
        setVoiceWave(Array.from({ length: 14 }, () => Math.floor(5 + Math.random() * 35)));
      }, 120);

      // Timeout voice simulation after 3.8s
      const endT = setTimeout(() => {
        setIsVoiceActive(false);
        const voiceMockOptions = ["Apollo Emergency", "O+ Blood Donors", "ICU Ambulance Rescue", "Nearest Pharmacy"];
        const phrase = voiceMockOptions[Math.floor(Math.random() * voiceMockOptions.length)];
        setSearchQuery(phrase);
        addQueryToHistory(phrase);
      }, 3500);

      return () => {
        clearInterval(t);
        clearTimeout(endT);
      };
    }
  }, [isVoiceActive]);

  const toggleVoiceSearch = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  // Filter matching results
  const q = searchQuery.toLowerCase().trim();
  const filteredResults = q
    ? SEARCH_DATABASE.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.subText.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q)
      )
    : [];

  const trendingSearches = [
    "Ambulance Flight 🚁",
    "Heatwave Safety 🌞",
    "Vaccine Report Vault 📁",
    "112 Police Emergency 🚨",
    "NGO Red cross 🤝"
  ];

  return (
    <div className="space-y-4">
      {/* Search Input Box */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-slate-400">
          <Search className="h-4.5 w-4.5" />
        </span>
        <input
          type="text"
          placeholder="Search Hospitals, Ambulances, Donors, Pharmacies, NGOs, Police, Doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-28 py-4 bg-slate-950/80 border border-blue-500/15 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 text-slate-100 font-medium text-sm transition-all shadow-inner"
        />

        {/* Voice Trigger Buttons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={toggleVoiceSearch}
            className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isVoiceActive ? "bg-red-600 text-white animate-pulse" : "bg-white/5 text-blue-400 hover:bg-white/10"
            }`}
            title="Start voice command system"
          >
            <Mic className="h-4 w-4" />
          </button>
          <span className="hidden sm:inline-block text-[9px] uppercase bg-slate-500/10 font-mono text-slate-400 py-1 px-2 rounded-lg">
            Smart Global
          </span>
        </div>
      </div>

      {/* Voice Simulation Waveform Banner */}
      {isVoiceActive && (
        <div className="p-4 bg-blue-900/10 border border-blue-500/25 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-mono text-slate-300">listening for emergency commands (Simplex Engine)...</span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {voiceWave.map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-red-500 to-blue-500 rounded-full transition-all duration-100"
                style={{ height: `${h}px` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Results or Helper Dashboard */}
      {q ? (
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-500/10 space-y-3.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 tracking-wider">
            <span>Filtered Search Results ({filteredResults.length})</span>
            <button onClick={() => addQueryToHistory(searchQuery)} className="text-blue-400 hover:underline">
              Save to history
            </button>
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500 font-mono">
              No direct matches in local index. Triggering AI assist search query...
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="p-2.5 rounded-xl bg-blue-600/15 text-blue-400 text-sm font-semibold shrink-0">
                      {item.category === "Hospital" && "🏥"}
                      {item.category === "Ambulance" && "🚑"}
                      {item.category === "Blood Donor" && "🩸"}
                      {item.category === "Pharmacy" && "💊"}
                      {item.category === "Medical Shop" && "🛒"}
                      {item.category === "NGO" && "🤝"}
                      {item.category === "Doctor" && "🩺"}
                      {item.category === "Police Station" && "👮"}
                      {item.category === "Fire Station" && "🔥"}
                    </span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-100">{item.name}</h4>
                        <span className="px-2 py-0.5 bg-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-serif font-semibold rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{item.subText}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 inline text-slate-600" />
                          {item.distance} km away ({item.city})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 select-none sm:self-center">
                    <button
                      onClick={() => onInitiateCall(item.name, item.phone)}
                      className="p-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="h-3.5 w-3.5" /> Call Now
                    </button>
                    <button
                      onClick={() => onSelectResult(item.category, item)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      View Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* History */}
          <div className="p-5 rounded-3xl bg-slate-900/10 border border-slate-500/10 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Search History</span>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-slate-500 hover:text-red-400 p-1 rounded transition-all">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <span className="text-xs text-slate-500 font-mono italic block py-4">No recent queries saved.</span>
            ) : (
              <div className="space-y-1.5">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchQuery(h)}
                    className="w-full text-left p-2 hover:bg-white/5 hover:text-blue-400 text-slate-300 rounded-lg text-xs font-mono truncate transition-all block focus:ring-1 focus:ring-blue-500"
                  >
                    🔍 {h}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trending & AI Recommendations */}
          <div className="space-y-4">
            {/* Trending */}
            <div className="p-4 rounded-3xl bg-slate-900/10 border border-slate-500/10 text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-3 flex items-center gap-1.5">
                <TrendingUp className="h-4.5 w-4.5 text-amber-500" /> Trending Emergencies Search
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(item.split(" ").slice(0, 2).join(" "))}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-mono rounded-xl transition-all cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-500/15 text-left space-y-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-400" /> AI Location recommendation
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                Based on current GPS node. Severe Cyclone hazard mapped 34km East. Apollo traumatology center remains the fastest path for pediatric emergencies.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
