import React, { useState, useEffect } from "react";
import { Hospital, Ambulance, DisasterAlert, FamilyMember } from "../types";
import { Shield, Ambulance as AmbIcon, Award, User, Flame, Compass, RefreshCw, Layers } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveMapProps {
  hospitals: Hospital[];
  ambulances: Ambulance[];
  alerts: DisasterAlert[];
  family: FamilyMember[];
  activeTab: string;
  onSelectHospital?: (h: Hospital) => void;
  onSelectAmbulance?: (a: Ambulance) => void;
  onSelectAlert?: (alert: DisasterAlert) => void;
  onSelectFamily?: (fam: FamilyMember) => void;
  selectedId?: string;
  sosTriggered?: boolean;
  bookedAmbulanceId?: string;
  ambulanceProgress?: number; // 0 to 1
  userLocation?: { lat: number; lng: number };
}

export default function InteractiveMap({
  hospitals,
  ambulances,
  alerts,
  family,
  activeTab,
  onSelectHospital,
  onSelectAmbulance,
  onSelectAlert,
  onSelectFamily,
  selectedId,
  sosTriggered,
  bookedAmbulanceId,
  ambulanceProgress = 0,
  userLocation = { lat: 45, lng: 45 }
}: InteractiveMapProps) {
  const [mapType, setMapType] = useState<"radar" | "hybrid" | "disaster">("radar");
  const [pulseScale, setPulseScale] = useState(1);

  // Periodic heartbeat animation for visual fidelity
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(p => (p === 1 ? 1.05 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Calculate coordinates for the booked ambulance moving toward the user
  const getAmbulanceCoords = (amb: Ambulance) => {
    if (bookedAmbulanceId === amb.id) {
      const currentLat = amb.lat + (userLocation.lat - amb.lat) * ambulanceProgress;
      const currentLng = amb.lng + (userLocation.lng - amb.lng) * ambulanceProgress;
      return { lat: currentLat, lng: currentLng };
    }
    return { lat: amb.lat, lng: amb.lng };
  };

  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden glass shadow-2xl border border-white/10 flex flex-col">
      {/* Map Control Bar */}
      <div className="absolute top-4 left-4 z-20 flex space-x-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs shadow-lg">
        <button
          onClick={() => setMapType("radar")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            mapType === "radar"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Tactical Radar
        </button>
        <button
          onClick={() => setMapType("hybrid")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            mapType === "hybrid"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Thermal Grid
        </button>
        <button
          onClick={() => setMapType("disaster")}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            mapType === "disaster"
              ? "bg-red-600 text-white shadow-lg shadow-red-900/35"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Disaster Warnings
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-emerald-400">
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        LIVE NODE TRACKER
      </div>

      {/* Map Graphic Area */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden select-none">
        {/* Glowing Radar Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/15 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-blue-500/25 rounded-full"></div>
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Dynamic Scan Line */}
        {mapType === "radar" && (
          <div className="absolute inset-0 origin-center pointer-events-none animate-[spin_8s_linear_infinite]"
               style={{ background: 'conic-gradient(from 0deg, rgba(37,99,235,0.15) 0deg, transparent 90deg, transparent 360deg)' }}
          ></div>
        )}

        {/* User Marker */}
        <div
          style={{ left: `${userLocation.lng}%`, top: `${userLocation.lat}%` }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 group"
        >
          {sosTriggered ? (
            <div className="relative">
              <span className="ping-animated bg-red-500 absolute -inset-6 rounded-full block"></span>
              <span className="animate-ping bg-red-400 absolute -inset-3 rounded-full opacity-75"></span>
              <div className="relative bg-red-600 text-white p-3 rounded-full shadow-2xl glow-red border border-red-400 z-10 flex items-center justify-center">
                <Compass className="h-5 w-5 animate-spin" />
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white font-display text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-md shadow-md shadow-red-950 border border-red-400 whitespace-nowrap">
                SOS ACTIVE
              </div>
            </div>
          ) : (
            <div className="relative">
              <span className="animate-ping bg-blue-500 absolute -inset-2 rounded-full opacity-50"></span>
              <div className="relative bg-blue-600 text-white p-2.5 rounded-full shadow-xl shadow-blue-900 border border-blue-400 z-10">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-200 border border-slate-700/80 font-mono text-[9px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                My GPS Location
              </div>
            </div>
          )}
        </div>

        {/* Connection Vector Lines (Paths from booked ambulance / nearest hospital to user) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {ambulances.map((amb) => {
            const isBooked = bookedAmbulanceId === amb.id;
            if (isBooked) {
              const ambCoords = getAmbulanceCoords(amb);
              return (
                <g key={`path-${amb.id}`}>
                  <line
                    x1={`${amb.lng}%`}
                    y1={`${amb.lat}%`}
                    x2={`${userLocation.lng}%`}
                    y2={`${userLocation.lat}%`}
                    stroke="rgba(37, 99, 235, 0.25)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={`${ambCoords.lng}%`}
                    y1={`${ambCoords.lat}%`}
                    x2={`${userLocation.lng}%`}
                    y2={`${userLocation.lat}%`}
                    stroke="#22C55E"
                    strokeWidth="3"
                    className="animate-[dash_2s_linear_infinite]"
                    strokeDasharray="8 4"
                  />
                  <circle
                    cx={`${ambCoords.lng}%`}
                    cy={`${ambCoords.lat}%`}
                    r="8"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                </g>
              );
            }
            return null;
          })}

          {/* Connect Family Member to user under safety dashboard */}
          {activeTab === "family" && family.map((fam) => (
            <line
              key={`line-fam-${fam.id}`}
              x1={`${fam.lng}%`}
              y1={`${fam.lat}%`}
              x2={`${userLocation.lng}%`}
              y2={`${userLocation.lat}%`}
              stroke="rgba(34, 197, 94, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          ))}
        </svg>

        {/* Hospital Markers */}
        {(mapType === "radar" || mapType === "hybrid") &&
          hospitals.map((hosp) => {
            const isSelected = selectedId === hosp.id;
            return (
              <button
                key={hosp.id}
                onClick={() => onSelectHospital?.(hosp)}
                style={{ left: `${hosp.lng}%`, top: `${hosp.lat}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 cursor-pointer"
              >
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isSelected 
                    ? "bg-red-500 text-white scale-110 ring-4 ring-red-500/30 shadow-xl"
                    : "bg-slate-900/90 text-red-400 group-hover:bg-red-950/60 group-hover:text-red-300 ring-1 ring-white/10"
                }`}>
                  <Shield className="h-4 w-4" />
                </div>
                {/* Micro tooltip */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-red-500/20 text-[10px] text-slate-100 font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  {hosp.name} ({hosp.bedsAvailable} Beds)
                </div>
              </button>
            );
          })}

        {/* Ambulance Markers */}
        {(mapType === "radar" || mapType === "hybrid") &&
          ambulances.map((amb) => {
            const isSelected = selectedId === amb.id;
            const isBooked = bookedAmbulanceId === amb.id;
            const coords = getAmbulanceCoords(amb);

            return (
              <button
                key={amb.id}
                onClick={() => onSelectAmbulance?.(amb)}
                style={{ left: `${coords.lng}%`, top: `${coords.lat}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-25 group transition-all duration-300 cursor-pointer"
              >
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isBooked
                    ? "bg-emerald-500 text-white scale-125 glow-green border border-emerald-300"
                    : isSelected
                    ? "bg-blue-500 text-white scale-110 ring-4 ring-blue-500/30 shadow-xl"
                    : "bg-slate-900/90 text-blue-400 group-hover:bg-blue-950/60 group-hover:text-blue-300 ring-1 ring-white/10"
                }`}>
                  <AmbIcon className={`h-4 w-4 ${isBooked ? "animate-bounce" : ""}`} />
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-blue-500/20 text-[10px] text-slate-100 font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  {isBooked ? `Ambulance (ETA: ${Math.max(1, Math.round(amb.eta * (1 - ambulanceProgress)))} Mins)` : amb.type}
                </div>
              </button>
            );
          })}

        {/* Disaster Warning Markers */}
        {(mapType === "disaster" || mapType === "radar") &&
          alerts.map((alert) => {
            const isSelected = selectedId === alert.id;
            return (
              <button
                key={alert.id}
                onClick={() => onSelectAlert?.(alert)}
                style={{ left: `${alert.coords.y}%`, top: `${alert.coords.x}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              >
                {/* Large danger area circle */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
                  style={{
                    width: `${alert.affectedRadiusKm / 1.5}px`,
                    height: `${alert.affectedRadiusKm / 1.5}px`,
                    background: alert.severity === "Critical" ? "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)" : "radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)",
                    border: alert.severity === "Critical" ? "1px dashed rgba(239, 68, 68, 0.25)" : "1px dashed rgba(245, 158, 11, 0.2)"
                  }}
                ></div>

                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-500 text-black scale-110 glow-blue shadow-xl border border-amber-300"
                    : "bg-slate-900/95 text-amber-500 ring-1 ring-amber-500/30 animate-pulse"
                }`}>
                  <Flame className="h-4 w-4" />
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-amber-500/30 text-[10px] text-slate-100 font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  {alert.title} ({alert.severity})
                </div>
              </button>
            );
          })}

        {/* Family Member Markers */}
        {activeTab === "family" &&
          family.map((fam) => {
            const isSelected = selectedId === fam.id;
            const isPanicked = fam.status === "SOS Panicked";
            return (
              <button
                key={fam.id}
                onClick={() => onSelectFamily?.(fam)}
                style={{ left: `${fam.lng}%`, top: `${fam.lat}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              >
                {isPanicked && (
                  <span className="ping-animated bg-red-500 absolute -inset-3 rounded-full opacity-60"></span>
                )}
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isPanicked
                    ? "bg-red-600 text-white scale-110 glow-red border border-red-300"
                    : isSelected
                    ? "bg-green-500 text-white scale-110 ring-4 ring-green-500/30"
                    : "bg-slate-900/90 text-green-400 group-hover:bg-slate-800 ring-1 ring-white/10"
                }`}>
                  <User className="h-4 w-4" />
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-green-500/20 text-[10px] text-slate-100 font-sans px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  {fam.name} ({fam.status})
                </div>
              </button>
            );
          })}
      </div>

      {/* Map Legend */}
      <div className="px-4 py-3 bg-slate-950 border-t border-white/5 grid grid-cols-4 gap-2 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded bg-red-500 mr-2"></div>
          <span>Hospitals</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded bg-blue-500 mr-2"></div>
          <span>Ambulances</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded bg-amber-500 mr-2 animate-pulse"></div>
          <span>Disasters</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded bg-teal-500 mr-2"></div>
          <span>Family Group</span>
        </div>
      </div>
    </div>
  );
}
