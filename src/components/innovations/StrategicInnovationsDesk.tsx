'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Scale, 
  Radio, 
  Mic, 
  Navigation, 
  TrendingUp, 
  Video, 
  HeartHandshake, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  FileText, 
  PhoneCall, 
  MapPin, 
  AlertTriangle,
  Play,
  Download,
  Share2,
  Lock
} from 'lucide-react';

export function StrategicInnovationsDesk() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'LEGAL' | 'OFFLINE' | 'VOICE' | 'TRANSIT' | 'GOTV' | 'CITIZEN' | 'KHADIMIYYA'>('ALL');
  const [dossierGenerated, setDossierGenerated] = useState<boolean>(false);
  const [transitSimulating, setTransitSimulating] = useState<boolean>(false);
  const [transitDeviation, setTransitDeviation] = useState<boolean>(false);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [copiedUSSD, setCopiedUSSD] = useState<boolean>(false);

  const handleSimulateTransit = () => {
    setTransitSimulating(true);
    setTransitDeviation(false);
    setTimeout(() => {
      setTransitDeviation(true);
    }, 2500);
  };

  const handleCopyUSSD = () => {
    navigator.clipboard?.writeText('*384*2027*210101004*185*60*12*257#');
    setCopiedUSSD(true);
    setTimeout(() => setCopiedUSSD(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>VISION 2027 • STRATEGIC DIFFERENTIATORS</span>
            </div>
            
            {/* Tech Partner Accreditation & Print Button */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href="/kebbi_2027_technical_team_defense_brief.html"
                target="_blank"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:scale-105"
                title="Open or print the official Technical Evaluation & Competitive Defense brief prepared for Malami's Technical Committee"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Print Committee Brief (PDF)</span>
              </a>

              <div className="flex items-center gap-2 text-xs bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Powered by</span>
                <strong className="text-emerald-400">GetoCore</strong>
                <span className="text-slate-600">×</span>
                <strong className="text-amber-300">TEEM TECH</strong>
                <span className="text-slate-500 hidden sm:inline">| IT: Fatima Sulaiman Umar</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              What Makes This Web App <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Unique From Thousands</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard election monitoring apps only show pie charts and simple forms. To guarantee victory for <strong>Abubakar Malami, SAN, CON</strong> in Kebbi 2027, our engineering partnership has architected <strong>7 proprietary technological breakthroughs</strong> that transform raw data into an impregnable legal shield and an unbeatable field mobilization engine.
            </p>
          </div>

          {/* Key Executive Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-medium">Court Admissibility</div>
              <div className="text-lg font-black text-emerald-400 font-mono">100% Sec 84</div>
              <div className="text-[10px] text-slate-500">Tribunal-Ready SHA-256</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-medium">Zero-Network Shield</div>
              <div className="text-lg font-black text-amber-300 font-mono">2G USSD / SMS</div>
              <div className="text-[10px] text-slate-500">Works Without Internet</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-medium">Voice-AI Speed</div>
              <div className="text-lg font-black text-teal-400 font-mono">3 Seconds</div>
              <div className="text-[10px] text-slate-500">Hausa Spoken EEC8A Entry</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80">
              <div className="text-[11px] text-slate-400 font-medium">Community Network</div>
              <div className="text-lg font-black text-blue-400 font-mono">3,745 PUs</div>
              <div className="text-[10px] text-slate-500">Khadimiyya Grassroots Grid</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7 STRATEGIC INNOVATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INNOVATION 1: TRIBUNAL-READY 1-CLICK AFFIDAVIT DOSSIER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                PATENT INNOVATION #1
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">1. Tribunal-Ready 1-Click Affidavit &amp; Evidence Vault</h3>
              <p className="text-xs text-slate-400 mt-1">
                Nigeria's first automated petition compiler strictly complying with <strong>Sections 84 &amp; 137 of the Evidence Act 2011</strong> and Section 64 of Electoral Act 2022.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-emerald-400">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Generic apps leave lawyers stranded trying to collect paper affidavits within the statutory 21-day window. Our engine bundles the PU Agent's stamped EC8A photo, the scraped INEC IReV sheet, the BVAS accreditation serial log, and dual GPS coordinates into a verified, sworn Court Exhibit Dossier ready for filing in 60 seconds.
              </p>
            </div>
          </div>

          <div className="pt-2">
            {!dossierGenerated ? (
              <button
                onClick={() => setDossierGenerated(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Simulate 1-Click Tribunal Exhibit Generation</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Dossier #EPT/KB/GOV/2027/001 Sealed</span>
                  </div>
                  <span className="font-mono text-[10px]">SHA-256: e8f9...4b12</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Ready for Senior Advocates: Includes Form EC8A photo, IReV comparative table, GPS geofence mismatch certificate, and sworn affidavit under Section 84.
                </div>
                <button
                  onClick={() => setDossierGenerated(false)}
                  className="text-[10px] text-slate-400 hover:text-white underline block"
                >
                  Reset Simulation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* INNOVATION 2: 2G USSD & ENCRYPTED SMS MESH GATEWAY */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                PATENT INNOVATION #2
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">2. 2G USSD &amp; Encrypted SMS Mesh Protocol</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero-Internet Transmission for remote riverine Yauri, Bagudo border posts, and rugged Zuru terrain.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-amber-300">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                When rivals go blind because 3G/4G internet is jammed or down, our agents dial a short USSD string or send a 160-character encrypted SMS. The Situation Room automatically decodes the payload, validates BVAS parity, and updates the statewide dashboard in real-time.
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">*384*2027*210101004*185*60*12*257#</span>
              <button
                onClick={handleCopyUSSD}
                className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedUSSD ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-center font-mono">
              Format: *Code*Year*PUCode*ADC*APC*PDP*BVASAccreditation# (Zero Data Required)
            </div>
          </div>
        </div>

        {/* INNOVATION 3: BILINGUAL HAUSA VOICE-AI FORM FILLER */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                PATENT INNOVATION #3
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">3. "Malami Murya" — Hausa Voice-AI Form Filler</h3>
              <p className="text-xs text-slate-400 mt-1">
                Audio-to-Data AI Engine for rural agents under bright sunlight and intense crowd pressure.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-teal-400">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Rural polling agents do not need to struggle typing small numbers. The agent presses one button and speaks naturally in Hausa. The AI model extracts the candidate scores, verifies arithmetic against BVAS, and reads back the confirmation for instant submission in 3 seconds.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVoicePlaying(!voicePlaying)}
                    className="p-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-semibold text-slate-200">Hausa Spoken Input Demo</span>
                </div>
                <span className="text-[10px] text-teal-400 font-mono">0:04 Audio</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 italic">
                "Mun gama ƙidaya a Mazabar Dangaladima PU 004: Masu zaɓe 257, ADC kuri'u 185, APC 60, PDP 12."
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>Extracted &amp; Verified: ADC=185, APC=60, PDP=12, BVAS=257 (Zero Over-Voting)</span>
              </div>
            </div>
          </div>
        </div>

        {/* INNOVATION 4: LIVE RAC TRANSIT GPS ESCORT & ANTI-SNATCHING BEACON */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                PATENT INNOVATION #4
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">4. Live RAC Transit GPS Escort &amp; Anti-Snatching Beacon</h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time satellite surveillance of the most dangerous phase: Polling Unit &rarr; Ward RAC Transit.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-rose-400">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                90% of ballot box hijackings occur while walking from the PU to the Ward Collation Center. When our agent begins escorting the Presiding Officer, they activate the transit beacon. If the route deviates &gt;200m or halts in an unauthorized house for &gt;7 minutes, an emergency alarm sounds in the Situation Room.
              </p>
            </div>
          </div>

          <div className="pt-2">
            {!transitSimulating ? (
              <button
                onClick={handleSimulateTransit}
                className="w-full py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Simulate Ballot Escort Telemetry</span>
              </button>
            ) : (
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono text-[11px]">Beacon ID: #ESCORT-KB-004</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Active GPS</span>
                </div>
                {transitDeviation ? (
                  <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                      <span>CRITICAL ALERT: ROUTE DEVIATION DETECTED</span>
                    </div>
                    <p className="text-[10px] text-rose-200">
                      Presiding Officer deviated 340m off RAC corridor toward private compound. Rapid Motorbike Unit &amp; Police DPO auto-dispatched!
                    </p>
                  </div>
                ) : (
                  <div className="text-emerald-400 flex items-center gap-2 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>In Transit along designated Birnin Kebbi Ward 01 corridor (Normal)</span>
                  </div>
                )}
                <button
                  onClick={() => setTransitSimulating(false)}
                  className="text-[10px] text-slate-400 hover:text-white underline block pt-1"
                >
                  Reset Escort Simulation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* INNOVATION 5: TURNOUT VELOCITY HEATMAP & GOTV SURGE ENGINE */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                PATENT INNOVATION #5
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">5. Turnout Velocity Heatmap &amp; Real-Time GOTV Surge</h3>
              <p className="text-xs text-slate-400 mt-1">
                Historical 2023 Comparative Analytics to eliminate low turnout in SAN Malami strongholds.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-blue-400">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Most campaigns discover voter apathy after polls close at 2:30 PM. Our system tracks turnout rate per hour. By 11:30 AM, if Birnin Kebbi, Argungu, or Gwandu PUs are behind the 2023 victory pace, the app triggers automated WhatsApp voice broadcasts from SAN Malami to grassroots mobilizers to surge voter lines before the queue closes.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>Kebbi Central Turnout Velocity (11:30 AM)</span>
              <span className="font-bold text-amber-300 font-mono">38.4% (Lagging Target)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full w-[38%]" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
              <span>Target: 65.0%</span>
              <span className="text-emerald-400 font-bold">1-Click Dispatch: 4,200 SMS to Ward Mobilizers</span>
            </div>
          </div>
        </div>

        {/* INNOVATION 6: CITIZEN TRUTH-STREAM & VIDEO VAULT */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                PATENT INNOVATION #6
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">6. Citizen Truth-Stream &amp; Video Verification Vault</h3>
              <p className="text-xs text-slate-400 mt-1">
                Crowdsourced Video Evidence with Cryptographic Timestamping &amp; Whistleblower Protection.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-purple-400">Why It Outclasses Others:</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Voters can record 15-second video clips of ballot tampering or vote-buying. The app automatically scrubs voter personal data to protect whistleblowers, burns immutable GPS coordinates into the video frames, and routes them to our Legal Rapid Response team to petition the Resident Electoral Commissioner within 15 minutes.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <div>
                <div className="font-bold text-white">Live Citizen Video Feed</div>
                <div className="text-[10px] text-slate-400">18 Incidents Verified Across 21 LGAs</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
              LEGAL CERTIFIED
            </span>
          </div>
        </div>

      </div>

      {/* INNOVATION 7: KHADIMIYYA FOUNDATION SYNERGY MATRIX */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
              <HeartHandshake className="w-4 h-4" />
              <span>PATENT INNOVATION #7 • THE HUMAN ADVANTAGE</span>
            </div>
            <h3 className="text-xl font-black text-white">
              7. Khadimiyya Foundation Grassroots Synergy Matrix
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No software can win an election without human loyalty. This platform seamlessly connects with the <strong>Khadimiyya for Justice and Development Initiative</strong> network across all 225 wards. If any polling unit agent is arrested, intimidated, or bought, a vetted Khadimiyya community health worker or youth coordinator in that specific polling unit automatically steps in as an authorized secondary validator.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1 shrink-0">
            <div className="text-2xl font-black text-amber-300 font-mono">10,000+</div>
            <div className="text-xs font-bold text-white">Vetted Volunteers</div>
            <div className="text-[10px] text-slate-500">Khadimiyya Ward Backup Grid</div>
          </div>
        </div>
      </div>

      {/* TECHNICAL PARTNERSHIP & SUPPORT CONTACT FOOTER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">OFFICIAL SYSTEM ARCHITECTS</span>
            <h4 className="text-base font-bold text-white">GetoCore Digital Innovation × TEEM TECH Solution</h4>
          </div>
          <div className="text-xs text-slate-400">
            Enterprise Electoral Engineering Directorate
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1.5">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Lead IT Technical Officer</div>
            <div className="text-sm font-bold text-emerald-400">Fatima Sulaiman Umar</div>
            <p className="text-[11px] text-slate-400">
              Statewide Cloud Architect &bull; Cryptographic Protocol Lead &bull; Situation Room Tech Operations.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1.5">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Direct Engineering Hotlines</div>
            <div className="text-sm font-bold text-amber-300 font-mono flex items-center gap-2">
              <a href="tel:08035533332" className="hover:underline flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>08035533332</span>
              </a>
              <span className="text-slate-600">/</span>
              <a href="tel:09035328748" className="hover:underline">
                <span>09035328748</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              Direct technical access for Abubakar Malami, SAN, CON &amp; Campaign Executives.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-1.5 sm:col-span-2 lg:col-span-1">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Executive Value Proposition</div>
            <div className="text-sm font-bold text-white">Zero Vulnerability Protocol</div>
            <p className="text-[11px] text-slate-400">
              Combining cutting-edge software with Section 84 judicial rigor to make victory unassailable.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
