import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily or safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client successfully initialized.");
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined; starting in Simulated AI Demo Mode.");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI:", err);
}

// 24/7 AI chatbot endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Safe fallback if key is missing
  if (!ai || !process.env.GEMINI_API_KEY) {
    const demoResponse = getSimulatedEmergencyResponse(message);
    return res.json({
      text: demoResponse,
      simulated: true
    });
  }

  try {
    const systemPrompt = `You are LifeLink AI Assistant, an elite, compassionate emergency medical response companion and public safety bot.
Target Country: India. Support languages: English, Telugu, Hindi.
Provide concise, actionable, step-by-step first-aid guidance, immediate emergency checklists, and prep tips.
Always advise calling local emergency services (112, 108) first for serious conditions.
Use bullet points and bold headers for instant readability under stress.
Strict constraint: Do not exceed 250 words. Do not use flowery descriptors. Keep it direct and helpful.`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I apologize, I could not formulate a response at this moment. Please call 112 for urgent help.";
    return res.json({ text: reply, simulated: false });

  } catch (err: any) {
    console.error("Gemini API Error:", err);
    // Graceful error fallback
    const fallbackText = `[Server API Fallback] There was an issue reaching the live AI service. Here is immediate guided first aid:\n\n` + getSimulatedEmergencyResponse(message);
    return res.json({ text: fallbackText, simulated: true });
  }
});

// Mock emergency instructions when Gemini API key is not ready
function getSimulatedEmergencyResponse(prompt: string): string {
  const q = prompt.toLowerCase();
  
  if (q.includes("burn")) {
    return `🚨 **IMMEDIATE FIRST AID: BURNS GUIDE** 🚨
1. **Cool immediately:** Run cool (not cold/ice) water over the burn for 10-20 minutes.
2. **Remove tight items:** Remove rings, anklets, or clothing gently before swelling starts.
3. **Do NOT pop blisters:** Leave blisters intact to avoid infection.
4. **Protect the burn:** Apply a sterile non-stick bandage or clean plastic wrap.
5. **Call Emergency (112 / 108)** if the burn is large, on the face, hands, feet, or is charred/white.`;
  }
  
  if (q.includes("chok") || q.includes("cough")) {
    return `🚨 **IMMEDIATE FIRST AID: CHOKING (HEIMLICH MANEUVER)** 🚨
If the person can talk or cough strongly, let them try to cough it out. If they cannot speak or breathe:
1. **Deliver 5 Back Blows:** Stand behind them, bend them forward, and strike their back hard 5 times with the heel of your hand between the shoulder blades.
2. **Deliver 5 Abdominal Thrusts:** Wrap your arms around their waist. Make a fist with one hand and grasp it with your other. Place it just above the navel and pull quickly upward and inward.
3. **Alternate:** Repeat 5 back blows and 5 abdominal thrusts until the blockage is cleared or the person loses consciousness (at which point, begin CPR).
4. **Call Ambulance (108)** immediately!`;
  }

  if (q.includes("heart") || q.includes("cpr") || q.includes("chest") || q.includes("stroke")) {
    return `🚨 **IMMEDIATE COMPRESSION-ONLY CPR (HEART ATTACK)** 🚨
1. **Check response:** Call out. Try to awake them. Check for chest breathing structure.
2. **Call 108 / 112:** Shout for help and request an Automated External Defibrillator (AED) immediately.
3. **Position Hands:** Place the heel of one hand in the center of the chest (sternum) and your other hand directly on top, interlocking fingers.
4. **Push Hard & Fast:** Push down 2 inches at a rate of 100-120 compressions per minute (to the beat of 'Staying Alive'). Allow complete chest recoil.
5. **Keep going:** Do not stop until professional paramedics arrive, an AED is ready, or the patient restarts responsive breathing.`;
  }

  if (q.includes("bleed") || q.includes("wound") || q.includes("cut")) {
    return `🚨 **IMMEDIATE FIRST AID: SEVERE BLEEDING** 🚨
1. **Apply Direct Pressure:** Use a clean cloth, sterile bandage, or your gloved hand to push directly on the wound.
2. **Elevate:** If possible, elevate the injured limb above the level of the heart to slow progress.
3. **Do NOT remove soaked cloth:** If blood leaks through, add another cloth on top. Do not peel off the original layer.
4. **Tourniquet (If life-threatening):** If bleeding persists on a limb, apply a tight wrap 2 inches above the wound.
5. **Call 108** for quick professional ambulance transport.`;
  }

  if (q.includes("snake") || q.includes("bite") || q.includes("poison")) {
    return `🚨 **IMMEDIATE FIRST AID: SNAKE BITES** 🚨
1. **Keep calm and still:** Keep the bitten limb below heart level to slow venom spread. Do not run or panic.
2. **Remove items:** Remove rings, watches, or tight jewelry before swelling rises.
3. **Do NOT cut or suck:** Never cut the bite wound or try to suck out venom. Do not apply tourniquets or ice.
4. **Wash and cover:** Clean gently with water and wrap with a loose, clean dry bandage.
5. **Identify/Remember:** Note the snake's color and head shape if safe to do so.
6. **Call 112 / 108:** Rush to a Trauma Center immediately to secure Anti-Venom Serum (AVS).`;
  }

  return `🩺 **LIFELINK SAFETY PORTAL** 🩺
I am the LifeLink AI Emergency Assistant. I am here to help you navigate critical incidents. Here are core guidelines:
* **Call for Backup:** In any critical crisis, dial **112** (National Emergency) or **108** (Ambulance).
* **Stay Calm:** Control your breathing, ensure your safety first before assisting others.
* **First Aid Search:** You can ask me specific tasks like "Severe bleeding", "CPR steps", "Choking Heimlich", or "Thermal burns".
* **Interactive Tooling:** Utilize the dashboards around this website to coordinate:
  - **🚨 Emergency SOS:** Pinpoint location and alert nearest responders.
  - **🩸 Blood Network:** Search or request and sync with live local donor cards.
  - **🏥 Hospital Finder:** Interactive hospital listings and distance calculations.
  - **🚑 Booking:** Fast ICU, air, or ground medical transport coordination.`;
}

// Vite middleware configuration for Development vs Production
const setupServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring server with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production files from dist/...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LifeLink AI] High-Performance Server booted at http://0.0.0.0:${PORT}`);
  });
};

setupServer().catch((error) => {
  console.error("Critical crash during server boots:", error);
});
