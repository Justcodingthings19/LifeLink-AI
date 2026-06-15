import React, { useState, useEffect } from "react";
import { Video, Phone, Calendar, RefreshCw, Star, X, Check, Camera, Mic, Volume2, ShieldAlert, Sparkles, Send } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: "General Physician" | "Cardiologist" | "Neurologist" | "Pediatrician" | "Dermatologist" | "Psychologist" | "Emergency Doctor";
  rating: number;
  experience: number;
  fees: number;
  online: boolean;
  avatar: string;
}

const DOCTORS: Doctor[] = [
  { id: "dr1", name: "Dr. Arundhati Pampana", specialty: "Emergency Doctor", rating: 4.9, experience: 14, fees: 600, online: true, avatar: "👩🏽‍⚕️" },
  { id: "dr2", name: "Dr. Sandeep Mehta", specialty: "Cardiologist", rating: 4.8, experience: 20, fees: 800, online: true, avatar: "👨🏻‍⚕️" },
  { id: "dr3", name: "Dr. Lekhya Sastry", specialty: "Pediatrician", rating: 4.7, experience: 8, fees: 500, online: true, avatar: "👩🏼‍⚕️" },
  { id: "dr4", name: "Dr. Preethi Nair", specialty: "Neurologist", rating: 4.9, experience: 12, fees: 900, online: false, avatar: "👩🏽‍⚕️" },
  { id: "dr5", name: "Dr. Amit Malhotra", specialty: "General Physician", rating: 4.6, experience: 10, fees: 400, online: true, avatar: "👨🏽‍⚕️" },
  { id: "dr6", name: "Dr. Rachel Fernandes", specialty: "Psychologist", rating: 4.8, experience: 9, fees: 550, online: true, avatar: "👩🏻‍⚕️" },
  { id: "dr7", name: "Dr. Kiran Babu", specialty: "Dermatologist", rating: 4.5, experience: 11, fees: 500, online: false, avatar: "👨🏼‍⚕️" }
];

interface TelehealthCenterProps {
  onInitiatePayment: (amount: number, purpose: string, onSuccess: () => void) => void;
  addNotification: (msg: string) => void;
  isDark: boolean;
}

export default function TelehealthCenter({ onInitiatePayment, addNotification, isDark }: TelehealthCenterProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [callStatus, setCallStatus] = useState<"connecting" | "ringing" | "connected" | "ended">("connecting");
  const [callType, setCallType] = useState<"video" | "voice">("video");
  
  // Call controls state
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  // Appointment states
  const [bookingDoc, setBookingDoc] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [isBooked, setIsBooked] = useState(false);

  // Video call duration ticker
  useEffect(() => {
    let t: any;
    if (showCallScreen && callStatus === "connected") {
      t = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(t);
  }, [showCallScreen, callStatus]);

  // Handle call lifecycle simulation
  const startCall = (doc: Doctor, type: "video" | "voice") => {
    setCallType(type);
    setSelectedDoctor(doc);
    setShowCallScreen(true);
    setCallStatus("connecting");
    setIsMicMuted(false);
    setIsCameraOn(true);

    setTimeout(() => {
      setCallStatus("ringing");
    }, 1500);

    setTimeout(() => {
      setCallStatus("connected");
      addNotification(`📞 Connected live with ${doc.name} for consulting session.`);
    }, 4500);
  };

  const endCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      setShowCallScreen(false);
      setSelectedDoctor(null);
    }, 1500);
    addNotification(`📞 Telemedicine video call with ${selectedDoctor?.name} concluded.`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) return;

    onInitiatePayment(bookingDoc?.fees || 500, `Video slot with ${bookingDoc?.name}`, () => {
      setIsBooked(true);
      addNotification(`🗓️ Appointment slot reserved with ${bookingDoc?.name} on ${bookingDate} at ${bookingTime}. Reminder alerts configured.`);
      setTimeout(() => {
        setIsBooked(false);
        setBookingDoc(null);
        setBookingDate("");
      }, 3500);
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Overview */}
      <div className="p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        <div>
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-blue-400" /> Trauma & Emergency Telemedicine Center
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Directly secure video/voice links with validated Indian medical specialists inside 60 seconds. Standard consultation rates apply.
          </p>
        </div>
        <span className="shrink-0 text-xs text-slate-400 font-bold bg-[#EF4444]/15 text-[#EF4444] px-2.5 py-1 rounded">
          24/7 ER Squad
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Doctors list */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 text-left">Online Doctors</h3>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className={`p-4 rounded-2xl border transition-all ${
                  doc.online ? "bg-slate-900/60 border-slate-800" : "bg-slate-950/20 border-slate-900 opacity-60"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-slate-800 text-2xl flex items-center justify-center rounded-xl relative shrink-0">
                      <span>{doc.avatar}</span>
                      {doc.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm text-slate-200">{doc.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{doc.specialty}</p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mt-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-500 font-normal font-mono">• {doc.experience} Years Exp</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">FEES</span>
                    <span className="text-sm font-bold text-emerald-400">₹{doc.fees}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-500/10">
                  {doc.online ? (
                    <>
                      <button
                        onClick={() => startCall(doc, "video")}
                        className="flex-1 py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Video className="h-3.5 w-3.5" /> Video Call
                      </button>
                      <button
                        onClick={() => startCall(doc, "voice")}
                        className="py-1 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        title="Voice consult"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <span className="flex-1 py-1 text-center bg-slate-900/40 text-slate-500 rounded-lg text-xs font-mono">
                      Doctor offline • schedule slot below
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setBookingDoc(doc);
                      setIsBooked(false);
                    }}
                    className="py-1 px-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold border border-white/5 cursor-pointer"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment scheduler container */}
        <div className="text-left">
          {bookingDoc ? (
            <form onSubmit={handleBookSubmit} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-bold">Appointment slot configuration</span>
                <button
                  type="button"
                  onClick={() => setBookingDoc(null)}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {isBooked ? (
                <div className="py-12 text-center text-xs text-slate-300 flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-emerald-400 text-sm">Consultation Reserved!</h4>
                  <p className="max-w-xs text-slate-400 leading-relaxed font-mono">
                    ₹{bookingDoc.fees} deposit acknowledged. Check-in coordinates credentials has been shared with your registered mobile.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white/5 rounded-2xl flex items-center gap-3">
                    <div className="text-2xl">{bookingDoc.avatar}</div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">Scheduling slot with: {bookingDoc.name}</h4>
                      <p className="text-[10px] text-slate-500">{bookingDoc.specialty} • Fees: ₹{bookingDoc.fees}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Select Consultation Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Select Time slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                        <option value="11:30 AM">11:30 AM - 12:00 PM</option>
                        <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                        <option value="04:30 PM">04:30 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" /> Deposit ₹{bookingDoc.fees} & Book Slot
                  </button>
                </>
              )}
            </form>
          ) : (
            <div className="p-5 rounded-3xl bg-slate-900/10 border border-slate-500/10 h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="p-4 bg-blue-500/5 text-blue-400 rounded-full">
                <Video className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-sm text-slate-300">Consultation Planner</h4>
              <p className="text-xs text-slate-500 max-w-xs font-mono leading-relaxed">
                Select a trauma doctor from the list, then configure scheduled time blocks with zero administrative bottlenecks.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Simulated Call Overlay */}
      {showCallScreen && selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-6 text-slate-100">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                {selectedDoctor.avatar}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-slate-100">{selectedDoctor.name}</h4>
                <p className="text-xs text-slate-500 font-mono">{selectedDoctor.specialty}</p>
              </div>
            </div>

            <div className="px-4 py-1.5 bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 rounded-full text-xs font-mono uppercase font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping"></span>
              {callStatus === "connecting" && "Handshaking..."}
              {callStatus === "ringing" && "Ringing..."}
              {callStatus === "connected" && `Connected: ${formatTime(callDuration)}`}
              {callStatus === "ended" && "Disconnecting..."}
            </div>
          </div>

          {/* Core Communication Stage */}
          <div className="flex-1 my-6 flex items-center justify-center relative rounded-3xl bg-slate-900 border border-white/5 overflow-hidden shadow-2xl">
            {callType === "video" ? (
              <>
                {/* Simulated Doc camera stream */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4 font-mono select-none">
                  {callStatus === "connected" ? (
                    <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center relative">
                      {/* Doctor avatar background overlay */}
                      <span className="text-9xl animate-pulse block mb-4">{selectedDoctor.avatar}</span>
                      <span className="text-sm font-bold text-slate-200">Simulating Live Consulting Feed...</span>
                      <span className="text-xs text-slate-500 max-w-sm mt-1 text-center">
                        Dr. {selectedDoctor.name.split(" ")[2]} is viewing your telemetry and heart-rate sync coordinates...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin" />
                      <span>Negotiating clinical frame rate pipeline...</span>
                    </div>
                  )}
                </div>

                {/* Patient self stream preview inside bottom right corner */}
                {isCameraOn && (
                  <div className="absolute bottom-4 right-4 w-28 h-36 bg-slate-950 border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center text-center animate-fade-in z-20">
                    <span className="text-2xl">👤</span>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-blue-400 mt-2">Self Webcam</span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <span className="text-7xl animate-pulse">{selectedDoctor.avatar}</span>
                <h4 className="font-bold text-lg text-slate-200">Voice-Only Private consultation</h4>
                <div className="flex items-center gap-1.5 h-8">
                  {[24, 18, 45, 12, 38, 14, 29, 6].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-blue-500 rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 150}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Float emergency first-aid checklist drawer */}
            <div className="absolute left-4 top-4 max-w-xs bg-slate-950/80 p-4 border border-white/10 rounded-2xl text-left hidden sm:block">
              <h5 className="text-[10px] uppercase font-mono font-bold text-red-500 tracking-wider mb-1 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3 shrink-0" /> Trauma ER Checklist
              </h5>
              <ul className="text-[10px] text-slate-400 space-y-1 font-mono">
                <li>• Keep head stabilized comfortably</li>
                <li>• Check local pulse at neck region</li>
                <li>• Ensure ambient room is oxygenated</li>
              </ul>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-white/10">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMicMuted ? "bg-[#EF4444] text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
              title={isMicMuted ? "Unmute microphone" : "Mute microphone"}
            >
              <Mic className="h-5 w-5" />
            </button>

            {callType === "video" && (
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  !isCameraOn ? "bg-[#EF4444] text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
                title={isCameraOn ? "Close webcam stream" : "Open webcam stream"}
              >
                <Camera className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={endCall}
              className="px-6 py-3 bg-[#EF4444] hover:bg-red-700 text-white rounded-full text-xs font-bold transition-all uppercase tracking-widest cursor-pointer"
            >
              Disconnect
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
