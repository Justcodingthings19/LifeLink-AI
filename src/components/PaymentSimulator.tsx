import React, { useState, useEffect } from "react";
import { Check, CreditCard, ShieldCheck, Wallet, RefreshCw, Smartphone, ArrowRight, Lock } from "lucide-react";

interface PaymentSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  paymentFor: string;
  onSuccess: (txnId: string) => void;
}

export default function PaymentSimulator({ isOpen, onClose, amount, paymentFor, onSuccess }: PaymentSimulatorProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "wallet">("upi");
  const [upiProvider, setUpiProvider] = useState<"gpay" | "phonepe" | "paytm">("gpay");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "pin" | "success">("idle");
  const [pinCode, setPinCode] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (paymentState === "processing") {
      const t = setTimeout(() => {
        if (paymentMethod === "upi") {
          setPaymentState("pin");
        } else {
          setPaymentState("success");
        }
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [paymentState, paymentMethod]);

  useEffect(() => {
    let interval: any;
    if (paymentState === "success") {
      setCountdown(3);
      interval = setInterval(() => {
        setCountdown((p) => {
          if (p <= 1) {
            clearInterval(interval);
            const mockTxn = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
            onSuccess(mockTxn);
            onClose();
            // reset state
            setPaymentState("idle");
            setPinCode("");
            return 3;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentState]);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentState("processing");
  };

  const submitPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length >= 4) {
      setPaymentState("processing");
      setTimeout(() => {
        setPaymentState("success");
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-blue-500/20 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex justify-between items-center border-b border-slate-700/50 pb-4 mb-4 z-10">
          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest font-mono">LifeLink Secure Pay</h4>
            <h3 className="text-xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> Secure Checkout
            </h3>
          </div>
          {paymentState !== "processing" && paymentState !== "success" && (
            <button
              onClick={onClose}
              className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-slate-400 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {paymentState === "idle" && (
          <form onSubmit={handlePay} className="space-y-4 z-10 flex-1 overflow-y-auto pr-1">
            <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-mono">Payment For</span>
                <span className="font-bold text-sm text-slate-100">{paymentFor}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Amount Due</span>
                <span className="text-2xl font-display font-black text-emerald-400">₹{amount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Methods Selectors */}
            <div>
              <span className="block text-xs uppercase text-slate-400 font-bold mb-2">Select Payment Mode</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`py-2.5 px-1 bg-slate-900 border text-xs font-bold rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                    paymentMethod === "upi" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Smartphone className="h-4.5 w-4.5" />
                  UPI (Instant)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-2.5 px-1 bg-slate-900 border text-xs font-bold rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                    paymentMethod === "card" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <CreditCard className="h-4.5 w-4.5" />
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`py-2.5 px-1 bg-slate-900 border text-xs font-bold rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                    paymentMethod === "wallet" ? "border-blue-500 bg-blue-500/10" : "border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Wallet className="h-4.5 w-4.5" />
                  Net Banking
                </button>
              </div>
            </div>

            {/* Sub-panels */}
            {paymentMethod === "upi" && (
              <div className="space-y-3.5 p-4 bg-slate-900/50 rounded-2xl border border-white/5 animate-fade-in">
                <span className="block text-[10px] uppercase text-slate-400 font-bold tracking-wider">Choose your UPI Terminal</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUpiProvider("gpay")}
                    className={`p-2 bg-slate-900 text-xs font-mono font-bold rounded-lg border text-center cursor-pointer ${
                      upiProvider === "gpay" ? "border-emerald-500 bg-emerald-500/5 text-emerald-400" : "border-slate-800 text-slate-400"
                    }`}
                  >
                    Google Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiProvider("phonepe")}
                    className={`p-2 bg-slate-900 text-xs font-mono font-bold rounded-lg border text-center cursor-pointer ${
                      upiProvider === "phonepe" ? "border-purple-500 bg-purple-500/5 text-purple-400" : "border-slate-800 text-slate-400"
                    }`}
                  >
                    PhonePe
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiProvider("paytm")}
                    className={`p-2 bg-slate-900 text-xs font-mono font-bold rounded-lg border text-center cursor-pointer ${
                      upiProvider === "paytm" ? "border-blue-500 bg-blue-500/5 text-blue-400" : "border-slate-800 text-slate-400"
                    }`}
                  >
                    Paytm
                  </button>
                </div>
                <div className="text-xs text-slate-500 font-mono text-center flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3 shrink-0" /> NPCI Verified • Unified Payments Interface
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-3 p-4 bg-slate-900/50 rounded-2xl border border-white/5 animate-fade-in">
                <div>
                  <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    className="w-full bg-slate-950 border border-slate-700/50 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-blue-500 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                      className="w-full bg-slate-950 border border-slate-700/50 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-blue-500 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">CVV Security</label>
                    <input
                      type="password"
                      required
                      placeholder="xxx"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      className="w-full bg-slate-950 border border-slate-700/50 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-blue-500 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-2 animate-fade-in">
                <span className="block text-[10px] uppercase text-slate-400 font-bold">Select Reputable National Bank</span>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white outline-none cursor-pointer">
                  <option value="sbi">State Bank of India (SBI)</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-950"
            >
              Pay Securely <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {paymentState === "processing" && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center z-10">
            <RefreshCw className="h-10 w-10 text-blue-500 animate-spin" />
            <div>
              <h4 className="font-bold text-slate-200">Processing Secure Transaction...</h4>
              <p className="text-xs text-slate-500 mt-1">Verifying encrypted payment token nodes. Do not refresh.</p>
            </div>
          </div>
        )}

        {paymentState === "pin" && (
          <form onSubmit={submitPin} className="py-6 flex flex-col items-center justify-center space-y-4 text-center z-10 animate-fade-in">
            <div className="p-3.5 bg-blue-500/10 text-blue-500 rounded-full">
              <Lock className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-sm font-mono">Enter 4-Digit UPI Secure PIN</h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1">To finalize charge validation with {upiProvider.toUpperCase()}</p>
            </div>
            <input
              type="password"
              placeholder="••••"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="px-6 py-3 bg-slate-950 border-2 border-slate-700 text-center text-white tracking-widest text-2xl font-bold rounded-2xl outline-none focus:border-blue-500 w-36"
              required
            />
            <button
              type="submit"
              disabled={pinCode.length < 4}
              className={`px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase ${
                pinCode.length < 4 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Confirm PIN
            </button>
          </form>
        )}

        {paymentState === "success" && (
          <div className="py-10 flex flex-col items-center justify-center space-y-4 text-center z-10 animate-scale-up">
            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30">
              <Check className="h-9 w-9 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-emerald-400 uppercase tracking-widest">Payment Authorised!</h4>
              <p className="text-xs text-slate-400 mt-1">Transaction Completed Successfully</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl text-left text-xs font-mono w-full space-y-1.5 border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-500">Receiver:</span>
                <span className="font-bold text-slate-300">LifeLink India Corp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt For:</span>
                <span className="font-bold text-slate-300">{paymentFor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Charged Amount:</span>
                <span className="font-bold text-emerald-400 font-sans font-extrabold">₹{amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Code:</span>
                <span className="text-blue-500 font-bold">AES-256 E2E Verified</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono animate-pulse block">
              Auto returning in {countdown} ...
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
