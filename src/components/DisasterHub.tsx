import React, { useState } from "react";
import { AlertTriangle, Compass, Flame, Radio, Shield, MapPin, Phone, Users, Home, Info, Sparkles } from "lucide-react";

interface DisasterType {
  id: string;
  name: "Floods" | "Cyclones" | "Earthquakes" | "Heatwaves" | "Forest Fires" | "Pandemics";
  icon: string;
  severity: "Critical Risk" | "Moderate Threat" | "Low Watch";
  colorClass: string;
  safeShelter: string;
  shelterDistance: number;
  reliefCamps: string;
  suppliesStatus: "Stocked" | "Moderate" | "En Route";
  emergencyHelpline: string;
}

const DISASTERS_DATA: DisasterType[] = [
  {
    id: "dis-1",
    name: "Cyclones",
    icon: "🌀",
    severity: "Critical Risk",
    colorClass: "text-[#EF4444] border-red-500/25 bg-red-600/5",
    safeShelter: "Visakhapatnam Government School Shelter (VGS-1)",
    shelterDistance: 1.8,
    reliefCamps: "KGH Relief Camp & Food Distribution Arena",
    suppliesStatus: "Stocked",
    emergencyHelpline: "1088 (Disaster Helpline)"
  },
  {
    id: "dis-2",
    name: "Heatwaves",
    icon: "🌞",
    severity: "Moderate Threat",
    colorClass: "text-amber-500 border-amber-500/25 bg-amber-500/5",
    safeShelter: "Nalgonda Cool Hub & hydration Center",
    shelterDistance: 4.2,
    reliefCamps: "Red Cross Hydration Camp Desk B",
    suppliesStatus: "Moderate",
    emergencyHelpline: "112 (State Control Room)"
  },
  {
    id: "dis-3",
    name: "Floods",
    icon: "🌊",
    severity: "Critical Risk",
    colorClass: "text-[#EF4444] border-red-500/25 bg-red-600/5",
    safeShelter: "Sarjapur Elevated Sports Stadium Complex, Bengaluru",
    shelterDistance: 2.1,
    reliefCamps: "Bellandur Relief Arena & Free Meds Center",
    suppliesStatus: "En Route",
    emergencyHelpline: "1088 (Urban Flooding desk)"
  },
  {
    id: "dis-4",
    name: "Earthquakes",
    icon: "🫨",
    severity: "Low Watch",
    colorClass: "text-blue-500 border-blue-500/25 bg-blue-500/5",
    safeShelter: "Open Ground - Gachibowli Athletic Stadium Arena",
    shelterDistance: 5.6,
    reliefCamps: "Gachibowli Volunteer Tent encampment",
    suppliesStatus: "Stocked",
    emergencyHelpline: "1088"
  },
  {
    id: "dis-5",
    name: "Forest Fires",
    icon: "🌲🔥",
    severity: "Low Watch",
    colorClass: "text-blue-500 border-blue-500/25 bg-blue-500/5",
    safeShelter: "Tirupati Foothills Forest Watch Station",
    shelterDistance: 12.4,
    reliefCamps: "First Responder Fire Command Center",
    suppliesStatus: "Stocked",
    emergencyHelpline: "101 (Fire Division)"
  },
  {
    id: "dis-6",
    name: "Pandemics",
    icon: "🦠",
    severity: "Moderate Threat",
    colorClass: "text-amber-500 border-amber-500/25 bg-amber-500/5",
    safeShelter: "Fever Isolation Clinic Wing, NIMS Hospital",
    shelterDistance: 4.3,
    reliefCamps: "District Vaccine & Diagnostic Outpost Center",
    suppliesStatus: "Stocked",
    emergencyHelpline: "1075 (National Health Help)"
  }
];

interface DisasterHubProps {
  onCall: (phone: string) => void;
  isDark: boolean;
}

export default function DisasterHub({ onCall, isDark }: DisasterHubProps) {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>(DISASTERS_DATA[0]);
  const [activeFeeds, setActiveFeeds] = useState<Array<{ time: string; msg: string; flag: "critical" | "info" }>>([
    { time: "22:15", msg: "Cyclone Laila-II landfall confirmed near Vizag port. Wave sirens active.", flag: "critical" },
    { time: "21:30", msg: "Gachibowli relief camp reports receiving 500 units of emergency hydration supplies.", flag: "info" },
    { time: "20:45", msg: "Flood warning issued for Bellandur lower-level residential societies.", flag: "critical" }
  ]);
  const [newPostText, setNewPostText] = useState("");

  const handlePostFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setActiveFeeds((prev) => [
      { time: "Just Now", msg: newPostText, flag: "info" },
      ...prev
    ]);
    setNewPostText("");
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Risk Zone alerts strip */}
      <div className="p-4 bg-red-650/10 border-2 border-red-500/30 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-red-600 text-white rounded-2xl shrink-0 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-extrabold text-[#EF4444] text-sm uppercase tracking-wider">Coastal Andhra & Outer Ring Road (Red Alert)</h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5 leading-relaxed">
              Wind velocities of 145km/h mapped. Do not utilize lower underpass sections. Coastal evacuations are overseen by state relief officers.
            </p>
          </div>
        </div>
        <button
          onClick={() => onCall("1088")}
          className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-lg shadow-red-950"
        >
          Dial Disaster SOS (1088)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column: Specific Disasters list */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Classified Catastrophes</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {DISASTERS_DATA.map((dis) => {
              const isSelected = selectedDisaster.id === dis.id;
              return (
                <button
                  key={dis.id}
                  onClick={() => setSelectedDisaster(dis)}
                  className={`p-3.5 border-2 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 scale-102 shadow-lg"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-400"
                  }`}
                >
                  <span className="text-3xl mb-1.5 block">{dis.icon}</span>
                  <span className="text-xs font-black text-slate-200 block truncate w-full">{dis.name}</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-500 mt-1">
                    {dis.severity}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Shelter and Camp details details */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Defense coordinates: {selectedDisaster.name}
          </h3>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-800">
              <span className="font-bold text-slate-300 uppercase tracking-wider font-mono">Designated Safe shelters</span>
              <span className="px-2 py-0.5 bg-red-500/15 text-red-400 rounded text-[9px] font-bold font-mono">
                {selectedDisaster.severity}
              </span>
            </div>

            <div className="space-y-4">
              {/* Box 1: Shelters */}
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold font-mono">
                  <Home className="h-4 w-4 text-emerald-400 shrink-0" /> Localized Safe Shelter Spot
                </span>
                <p className="text-sm font-bold text-slate-100 pl-5">{selectedDisaster.safeShelter}</p>
                <p className="text-[10px] text-slate-500 pl-5 font-mono">
                  Distance: <span className="text-emerald-400 font-bold">{selectedDisaster.shelterDistance} km away</span> • High-ground structural shelter
                </p>
              </div>

              {/* Box 2: Relief Camps */}
              <div className="space-y-1 border-t border-slate-800/60 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold font-mono">
                  <Users className="h-4 w-4 text-blue-400 shrink-0" /> District Relief Camp Arena
                </span>
                <p className="text-sm font-bold text-slate-100 pl-5">{selectedDisaster.reliefCamps}</p>
                <p className="text-[10px] text-slate-500 pl-5 font-mono">
                  Emergency Supplies: <span className="text-blue-400 font-bold">{selectedDisaster.suppliesStatus}</span>
                </p>
              </div>

              {/* Box 3: Helpline */}
              <div className="space-y-1.5 border-t border-slate-800/60 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500">Fast-dispatch Hotline</span>
                  <span className="font-bold font-mono text-red-500 text-base">{selectedDisaster.emergencyHelpline}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onCall(selectedDisaster.emergencyHelpline.split(" ")[0])}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg border border-white/5 transition-all text-center cursor-pointer"
                >
                  Dial Direct Line
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Real-time Bulletins Forum */}
      <div className="p-5 rounded-3xl bg-slate-900/10 border border-slate-500/10 text-left space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Radio className="h-4 w-4 text-emerald-400 animate-pulse" /> Live Disaster Bulletin board
        </h3>

        {/* Input to Post Relief Notice */}
        <form onSubmit={handlePostFeed} className="relative">
          <input
            type="text"
            placeholder="Volunteer notification alert? Post here e.g. 'Jubilee Water levels decreasing'"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-4 pr-24 text-xs text-slate-100 outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            disabled={!newPostText.trim()}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              !newPostText.trim() ? "opacity-55 pointer-events-none" : ""
            }`}
          >
            Broadcast
          </button>
        </form>

        {/* Feed List */}
        <div className="space-y-2.5">
          {activeFeeds.map((feed, idx) => (
            <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 flex items-start gap-3">
              <span className={`p-1 px-1.5 rounded text-[9px] font-bold font-mono text-center uppercase shrink-0 ${
                feed.flag === "critical" ? "bg-red-650/15 text-red-500" : "bg-blue-650/15 text-blue-400"
              }`}>
                {feed.time}
              </span>
              <p className="text-xs text-slate-300 leading-normal font-mono">{feed.msg}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
