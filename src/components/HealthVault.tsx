import React, { useState } from "react";
import { Lock, FileText, Upload, Plus, Trash2, ShieldCheck, Check, RefreshCw, Layers, Sparkles } from "lucide-react";

interface DocumentRecord {
  id: string;
  name: string;
  category: "Medical Report" | "Prescription" | "Vaccination" | "Insurance Card";
  fileSize: string;
  uploadedOn: string;
  backedUp: boolean;
}

const INITIAL_DOCUMENTS: DocumentRecord[] = [
  { id: "doc-1", name: "Apollo Cardiac Screening.pdf", category: "Medical Report", fileSize: "2.4 MB", uploadedOn: "12/06/2026", backedUp: true },
  { id: "doc-2", name: "Paracetamol Prescriptors.jpg", category: "Prescription", fileSize: "1.1 MB", uploadedOn: "14/06/2026", backedUp: true },
  { id: "doc-3", name: "Covaxin Vaccination Sheet.pdf", category: "Vaccination", fileSize: "840 KB", uploadedOn: "10/01/2025", backedUp: true },
  { id: "doc-4", name: "Star Health Insurance.pdf", category: "Insurance Card", fileSize: "4.8 MB", uploadedOn: "15/06/2026", backedUp: true }
];

interface HealthVaultProps {
  addNotification: (msg: string) => void;
  isDark: boolean;
}

export default function HealthVault({ addNotification, isDark }: HealthVaultProps) {
  const [docs, setDocs] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [docName, setDocName] = useState("");
  const [docCategory, setDocCategory] = useState<DocumentRecord["category"]>("Prescription");
  const [activeTab, setActiveTab] = useState<"all" | DocumentRecord["category"]>("all");

  const triggerUploadMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newDoc: DocumentRecord = {
            id: `doc-${Date.now()}`,
            name: docName.includes(".") ? docName : `${docName}.pdf`,
            category: docCategory,
            fileSize: `${(0.5 + Math.random() * 4).toFixed(1)} MB`,
            uploadedOn: "15/06/2026",
            backedUp: true
          };
          setDocs((prevDocs) => [newDoc, ...prevDocs]);
          setDocName("");
          addNotification(`🔒 Encrypted record uploaded & stored: ${newDoc.name}. Synced to cloud backups.`);
          return 0;
        }
        return prev + 25;
      });
    }, 400);
  };

  const deleteDoc = (id: string, name: string) => {
    setDocs((prevDocs) => prevDocs.filter((d) => d.id !== id));
    addNotification(`ℹ️ Document deleted from local device storage: ${name}`);
  };

  const filteredDocs = activeTab === "all" ? docs : docs.filter((d) => d.category === activeTab);

  return (
    <div className="space-y-6 text-left">
      
      {/* Encryption Banner */}
      <div className="p-4 bg-emerald-600/5 rounded-2xl border border-emerald-500/15 flex items-start gap-4">
        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
          <Lock className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
            FIPS Standard AES-256 Medical Cloud Vault
            <span className="inline-block px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase font-bold tracking-wider rounded">
              Encrypted
            </span>
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono mt-0.5">
            Your records are stored securely on-device with remote backup hashes. Doctors and paramedics can only query files after explicit SOS verification keys match: <span className="text-emerald-400 font-bold">SHA-256 E2E</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Upload Panel */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Add Clinical document</h3>
          
          <form onSubmit={triggerUploadMock} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Document Alias Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Brain MRI, Doctor Rx"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">File Classification</label>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none cursor-pointer"
              >
                <option value="Prescription">Prescription Receipt</option>
                <option value="Medical Report">Trauma Medical Report</option>
                <option value="Vaccination">Vaccination Sheet</option>
                <option value="Insurance Card">Health Insurance ID</option>
              </select>
            </div>

            {/* Simulated Drag & Drop Zone */}
            <div className="py-8 px-4 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all">
              <Upload className="h-7 w-7 text-slate-500 mb-2" />
              <span className="text-[11px] font-bold text-slate-300">Drag file here or click to browse</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Supports PDF, JPG, PNG up to 15MB</span>
            </div>

            {isUploading ? (
              <div className="space-y-2 p-3 bg-white/5 rounded-xl border border-white/5 animate-pulse">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400">Compacting and encrypting document...</span>
                  <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                </div>
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!docName.trim()}
                className={`w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                  !docName.trim() ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Plus className="h-4 w-4" /> Store with E2E Encryption
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Files List list */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Vault Registry</h3>
            <div className="flex flex-wrap gap-1">
              {["all", "Prescription", "Medical Report", "Vaccination", "Insurance Card"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === t
                      ? "bg-blue-600 text-white font-black"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {t === "all" ? "All" : t.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/10 border border-slate-900 rounded-2xl text-xs text-slate-500 font-mono">
                No matching files found under this tab category.
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-blue-600/15 text-blue-400 rounded-xl">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                        <span className="px-1.5 py-0.5 bg-white/5 text-slate-400 rounded uppercase font-bold tracking-widest text-[8px]">
                          {doc.category}
                        </span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.uploadedOn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.backedUp && (
                      <span className="p-1 px-2 bg-emerald-600/10 text-emerald-400 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider shrink-0 border border-emerald-500/10">
                        Secure Backup
                      </span>
                    )}
                    <button
                      onClick={() => deleteDoc(doc.id, doc.name)}
                      className="p-1.5 hover:bg-[#EF4444]/10 text-slate-500 hover:text-[#EF4444] rounded-lg transition-all cursor-pointer shrink-0"
                      title="Erase document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
