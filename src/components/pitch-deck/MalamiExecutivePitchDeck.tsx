'use client';

import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  TrendingUp, 
  Scale, 
  Award, 
  Users, 
  CheckCircle2, 
  Landmark,
  Printer,
  Download,
  FileText,
  Smartphone,
  Radio,
  MapPin,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export function MalamiExecutivePitchDeck({ onOpenBudget }: { onOpenBudget?: () => void }) {
  const [slide, setSlide] = useState<number>(1);
  const totalSlides = 8;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Slide Control Header with PPTX & PDF Print buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm whitespace-nowrap">Executive Presentation Mode &bull; Abubakar Malami, SAN</div>
            <div className="text-xs text-slate-400 font-mono">Slide {slide} of {totalSlides}</div>
          </div>
        </div>

        {/* Quick-action buttons & Slide Navigation */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/kebbi_2027_malami_presentation_deck.html"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow whitespace-nowrap"
              title="Open printable presentation deck with 1-click PDF print"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>Print Slides (PDF)</span>
            </a>

            <a
              href="/api/download?file=pdf"
              download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pdf"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow whitespace-nowrap"
              title="Download official presentation PDF (16:9 Landscape)"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Download PDF</span>
            </a>

            <a
              href="/api/download?file=pptx"
              download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap"
              title="Download editable Microsoft PowerPoint (.pptx) file"
            >
              <Download className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Download (.pptx)</span>
            </a>

            <a
              href="/kebbi_2027_financial_implications_budget.html"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap"
              title="View complete itemized budget proposal"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Master Budget (₦329M)</span>
            </a>
          </div>

          {/* Clean Self-Contained Slide Navigation Capsule */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button 
              onClick={() => setSlide(s => Math.max(1, s - 1))}
              disabled={slide === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition shrink-0"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-amber-300 px-2 min-w-[50px] text-center shrink-0">
              {slide} / {totalSlides}
            </span>
            <button 
              onClick={() => setSlide(s => Math.min(totalSlides, s + 1))}
              disabled={slide === totalSlides}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition shrink-0"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SLIDE CANVAS */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 min-h-[490px] shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* SLIDE 1: EXECUTIVE CHARTER & STRATEGIC OPPORTUNITY */}
        {slide === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block">
                SLIDE 1: STRATEGIC OPPORTUNITY &bull; EXECUTIVE CHARTER
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">ADC &bull; KEBBI 2027</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              2027 is Not Starting from Scratch: <br/>
              <span className="text-emerald-400">Closing a 48,000-Vote Gap with an Unbeatable Candidate</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">2023 Margin Deficit</div>
                <div className="text-2xl font-black text-rose-400 mt-1">48,285</div>
                <div className="text-[11px] text-slate-500">Only 6.18% of valid votes</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Discarded Ballots</div>
                <div className="text-2xl font-black text-amber-400 mt-1">19,082</div>
                <div className="text-[11px] text-slate-500">39.5% of the winning margin!</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Dormant Registered Voters</div>
                <div className="text-2xl font-black text-sky-400 mt-1">1.23 Million</div>
                <div className="text-[11px] text-slate-500">60.6% of electorate stayed home</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Executive Mandate:</strong> The ruling party scraped through due to opposition complacency and collation collapse. Abubakar Malami, SAN possesses the grassroots machinery (Khadimiyya), legal stature, and regional coalitions to comfortably erase this deficit and establish an insurmountable lead.
            </div>
          </div>
        )}

        {/* SLIDE 2: WHY PDP LOST & HOW MALAMI SOLVES IT */}
        {slide === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 inline-block">
                SLIDE 2: STRATEGIC LESSONS &bull; FORENSIC AUDIT
              </span>
              <span className="text-xs text-rose-400 font-mono font-bold">2023 TRAP VS. 2027 ANTIDOTE</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Addressing the 4 Fatal Structural Flaws of 2023
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">1. Candidate Charisma Mismatch</strong>
                <p className="text-slate-300 text-[11px]">PDP ran a detached retired general. Nasir Idris won by weaponizing his teacher/unionist base.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Advantage: Khadimiyya Foundation touch in all 225 wards.</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">2. Section 51 Cancellation Trap</strong>
                <p className="text-slate-300 text-[11px]">142 polling units cancelled due to engineered over-voting, wiping out 60k opposition votes.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: Legal Shield with 42 litigation lawyers &amp; 225 paralegals.</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">3. 19,082 Wasted Ballots</strong>
                <p className="text-slate-300 text-[11px]">Rural voters smudged ink or folded horizontally into opposing boxes.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: 500k sample ballots &amp; vertical-fold tutorials.</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">4. Southern Kebbi Alienation</strong>
                <p className="text-slate-300 text-[11px]">Zuru &amp; Yauri felt excluded from power rotation and left vulnerable to bandits.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: Deputy Governorship pledge &amp; security guard treaty.</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: 4-TIER OPERATIONAL ARCHITECTURE */}
        {slide === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 inline-block">
                SLIDE 3: OPERATIONAL ARCHITECTURE &bull; 4-TIER HIERARCHY
              </span>
              <span className="text-xs text-blue-400 font-mono font-bold">STRICT ROLE CONTAINMENT</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Impenetrable Electoral Command: 3,745 PUs to State Command
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-sky-800/40 space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400">TIER 1</span>
                <strong className="text-white block font-semibold pt-1">3,745 PU Agents</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  6-stage phaser reporting: PO arrival, BVAS 000 check, queue cutoff at 2:30pm, counting, EC8A photo upload. Strict PU scoping.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-800/40 space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">TIER 2</span>
                <strong className="text-white block font-semibold pt-1">225 RA Supervisors</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Ward RAC collation oversight. Reconciliation of constituent PUs into Form EC8B. Instant CSV export &amp; motorbike rapid escort.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-purple-800/40 space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400">TIER 3</span>
                <strong className="text-white block font-semibold pt-1">21 LGA Supervisors</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Assigned Legal Counsel at each INEC Collation Hall. Form EC8C audit, filing Section 51 protest affidavits to EO, fast vehicles.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-800/40 space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">TIER 4</span>
                <strong className="text-white block font-semibold pt-1">State Command HQ</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Birnin Kebbi Situation Room. Live PVT vs IReV audit, Section 179(2) 25% spread tracker, direct telephone link to SAN Malami.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: TECHNOLOGY ARCHITECTURE (GETOCORE × TEEM TECH) */}
        {slide === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-block">
                SLIDE 4: TECHNOLOGY INFRASTRUCTURE &bull; TELEMETRY ENGINE
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">GETOCORE × TEEM TECH</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Proprietary Telemetry Engine &amp; Cryptographic Security
            </h2>
            <p className="text-xs text-slate-400 -mt-2">
              Cloud-native, zero-plaintext architecture designed to operate seamlessly across high-density and zero-network zones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-800/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <strong className="text-emerald-400 block text-sm font-bold">1. Offline-First PWA Engine</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Built with Next.js 14, TypeScript &amp; Service Workers. SAN Malami portrait featured on mobile home screen icon. Functions 100% offline in rural/riverine LGAs (Sakaba, Bagudo, Danko-Wasagu), auto-syncing upon signal acquisition. 16+ hrs battery life.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-sky-800/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <strong className="text-sky-400 block text-sm font-bold">2. Dual GPS &amp; IReV Audit</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Automated scraper continuously audits public INEC IReV uploads against PU Agent Form EC8As. Any electronic transmission originating &gt;15 meters from physical polling unit GPS coordinates triggers an instant Tampering Alert for legal challenge.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-800/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <strong className="text-amber-400 block text-sm font-bold">3. Bilingual AI Legal Copilot</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Real-time copilot with instant English and Hausa toggle (EN | HA). Guides agents through BVAS bypasses, Section 51 objections, and connects with encrypted SMS fallback gateway (500k SMS capacity) and toll-free emergency hotline (0800-ADC-MALAMI).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: ELECTORAL MATHEMATICS & CONSTITUTIONAL CRITERIA */}
        {slide === 5 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block">
                SLIDE 5: ELECTORAL MATHEMATICS &bull; STATUTORY WINNING CRITERIA
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">SECTION 179(2) &amp; SECTION 51</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Securing the Mandate: Insurmountable Lead &amp; 25% Spread
            </h2>
            <p className="text-xs text-slate-400 -mt-2">
              Fulfilling both mandatory constitutional tests on the first ballot to prevent rerun declarations and post-election litigation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-800/40 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span>Section 179(2) 25% Spread Across 14+ LGAs</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>The Statutory Rule:</strong> Candidate must win highest votes AND poll not less than 25% of votes cast in at least 2/3 of all LGAs (14 of 21 LGAs).
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div className="text-emerald-400 font-bold">&bull; Central Base (7/7 LGAs):</div>
                  <div className="text-slate-300">Birnin Kebbi, Gwandu, Jega, Kalgo, Aliero, Maiyama, Bunza</div>
                  <div className="text-emerald-400 font-bold pt-1">&bull; Southern Coalition (7/7 LGAs):</div>
                  <div className="text-slate-300">Zuru, Danko-Wasagu, Sakaba, Fakai, Yauri, Ngaski, Shanga</div>
                  <div className="text-emerald-400 font-bold pt-1">&bull; Northern Border Parity (6/7 LGAs):</div>
                  <div className="text-slate-300">Argungu, Augie, Dandi, Arewa, Suru, Bagudo</div>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold">ADC Target: 25%+ in all 21 LGAs, totally bulletproof.</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-amber-800/40 space-y-2">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Section 51 Surplus Margin Shield (+75k Target)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>The Margin of Lead Trap:</strong> If Lead Margin &lt; Cancelled PVCs, Returning Officer must declare election INCONCLUSIVE.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300"><span>Projected ADC Votes:</span><span className="text-emerald-400 font-bold">468,540 (54.5%)</span></div>
                  <div className="flex justify-between text-slate-300"><span>Projected APC Votes:</span><span className="text-rose-400 font-bold">341,210 (39.7%)</span></div>
                  <div className="flex justify-between border-t border-slate-800 pt-1 text-white font-bold"><span>Projected Lead Margin:</span><span className="text-amber-400">+127,330 votes</span></div>
                  <div className="flex justify-between text-slate-400"><span>Statewide Cancelled PVCs:</span><span>52,300 votes</span></div>
                  <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-300 font-bold"><span>Net Surplus Safety Buffer:</span><span className="text-emerald-400 text-xs">+75,030 buffer</span></div>
                </div>
                <div className="text-[11px] text-emerald-400 font-bold">Outcome: Direct first-ballot declaration of Abubakar Malami SAN!</div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: ROLLOUT ROADMAP & SIMULATION DRILLS */}
        {slide === 6 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
                SLIDE 6: STATEWIDE ROLLOUT ROADMAP &bull; SIMULATION DRILLS
              </span>
              <span className="text-xs text-purple-400 font-mono font-bold">3 PHASES TO E-DAY</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Statewide Implementation Timeline &amp; Simulation Drills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400">PHASE 1 (M - 2)</span>
                <strong className="text-white block font-bold">Provisioning &amp; Setup</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Custom software deployment &amp; stress testing</li>
                  <li>• Khadimiyya &amp; ADC ward coordinator recruitment</li>
                  <li>• Print 4,200 laminated QR ID badges</li>
                  <li>• Procure 3,745 backup power banks</li>
                  <li>• Birnin Kebbi Situation Room facility outfitting</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">PHASE 2 (M - 1)</span>
                <strong className="text-white block font-bold">Zonal Training &amp; Mock Drill</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Zonal workshops in Central, North &amp; South</li>
                  <li>• Live dry-run simulation across all 21 LGAs</li>
                  <li>• BVAS zero-reading &amp; mock EC8A capture</li>
                  <li>• SMS gateway &amp; satellite comms stress test</li>
                  <li>• Serve legal protocols on INEC REC &amp; CP</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-800/40 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">PHASE 3 (E-DAY)</span>
                <strong className="text-white block font-bold">E-Day Execution Protocols</strong>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• <strong>07:00 AM:</strong> Arrival &amp; BVAS 000 verification</li>
                  <li>• <strong>02:30 PM:</strong> Queue cutoff enforcement</li>
                  <li>• <strong>04:30 PM:</strong> Form EC8A snapping &amp; push</li>
                  <li>• <strong>08:00 PM:</strong> EC8B/EC8C live reconciliation</li>
                  <li>• <strong>02:00 AM:</strong> Form EC8D State Declaration Defense</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: FINANCIAL IMPLICATIONS (MASTER BUDGET) */}
        {slide === 7 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block">
                SLIDE 7: FINANCIAL IMPLICATIONS &bull; MASTER BUDGET
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                Turnkey Budget: ₦329,000,000
              </span>
            </div>

            <h2 className="text-2xl font-black text-white">
              7 Cost Centers &bull; ₦87,850 Per Polling Unit Total Mandate Defense
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 flex justify-between">
                  <span>Department / Cost Center</span>
                  <span>Amount (₦)</span>
                </div>
                <div className="flex justify-between text-slate-300"><span>1. PU Agents (3,745 PUs + 375 Runners)</span><span className="font-mono font-bold text-white">₦121.7M</span></div>
                <div className="flex justify-between text-slate-300"><span>2. Ward (RA) Supervisors (225 Wards)</span><span className="font-mono font-bold text-white">₦23.6M</span></div>
                <div className="flex justify-between text-slate-300"><span>3. LGA Legal Shield Leads (21 LGAs)</span><span className="font-mono font-bold text-white">₦14.2M</span></div>
                <div className="flex justify-between text-slate-300"><span>4. Situation Room HQ (Birnin Kebbi)</span><span className="font-mono font-bold text-white">₦37.6M</span></div>
                <div className="flex justify-between text-slate-300"><span>5. Software Engine &amp; Cloud (GetoCore × TEEM TECH)</span><span className="font-mono font-bold text-emerald-400">₦50.0M</span></div>
                <div className="flex justify-between text-slate-300"><span>6. Field Kits, Badges &amp; 3,745 Power Banks</span><span className="font-mono font-bold text-white">₦44.1M</span></div>
                <div className="flex justify-between text-slate-300"><span>7. Legal Shield, CTC Fund &amp; Contingency</span><span className="font-mono font-bold text-white">₦37.8M</span></div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold border-b border-slate-800 pb-1">Phased 3-Tranche Drawdown Schedule</div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-blue-400">Tranche 1 (40%) &bull; T - 60 Days</div>
                    <div className="text-[10px] text-slate-400">Platform setup, power banks, badges</div>
                  </div>
                  <span className="font-mono font-bold text-white">₦131.6M</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-amber-400">Tranche 2 (35%) &bull; T - 21 Days</div>
                    <div className="text-[10px] text-slate-400">Training, data &amp; statewide mock drill</div>
                  </div>
                  <span className="font-mono font-bold text-white">₦115.1M</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-emerald-400">Tranche 3 (25%) &bull; T - 5 Days</div>
                    <div className="text-[10px] text-slate-400">D-Day honoraria, collation defense &amp; CTCs</div>
                  </div>
                  <span className="font-mono font-bold text-white">₦82.3M</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: GOVERNANCE & STRATEGIC SIGN-OFF */}
        {slide === 8 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
                SLIDE 8: GOVERNANCE &amp; STRATEGIC SIGN-OFF
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">PROJECT COMMISSIONING</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              Financial Accountability Controls &amp; Commissioning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400">Governance &amp; Anti-Fraud Safeguards:</div>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Direct Account Crediting:</strong> Field payments sent via BVN/phone numbers tied to assigned Polling Unit codes. Zero cash leakage.</li>
                  <li>• <strong>Milestone-Linked Escrow:</strong> Tranches released only after verified delivery of each phase (e.g. 100% badge verification before Tranche 2).</li>
                  <li>• <strong>Permanent Capital Assets:</strong> Laptops, video walls, inverters, and Starlink terminals remain permanent foundation property.</li>
                  <li>• <strong>Real-time Telemetry:</strong> Financial dashboard tracking disbursements across all 21 LGAs.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-600/40 space-y-3">
                <div className="font-bold text-amber-300">Executive Action Required:</div>
                <p className="text-slate-300 text-xs">
                  Formal sign-off on the ₦329M Budget and commissioning of <strong>GetoCore Digital Innovation &amp; TEEM TECH Solution</strong> as Lead Systems Architects.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400">Lead IT Technical Officer: <strong className="text-emerald-400">Fatima Sulaiman Umar</strong></div>
                  <div className="text-amber-400 font-mono flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Hotlines: 08035533332 / 09035328748</span>
                  </div>
                </div>
                <div className="pt-1 flex flex-wrap gap-2">
                  <a
                    href="/api/download?file=pdf"
                    download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pdf"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download PDF Deck</span>
                  </a>
                  <a
                    href="/api/download?file=pptx"
                    download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
                    className="py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download .pptx</span>
                  </a>
                  <a
                    href="/kebbi_2027_financial_implications_budget.html"
                    target="_blank"
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>Budget (₦329M)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Footer */}
        <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-slate-800 text-xs text-slate-500">
          <span>Abubakar Malami (SAN) Election 2027 Situation Room • Official Platform by the Technical Team</span>
          <span className="text-[11px] text-slate-400">
            Powered by <strong className="text-emerald-400">GetoCore Digital Innovation</strong> &amp; <strong className="text-amber-300">TEEM TECH Solution</strong> (Kaduna&apos;s #1 IT Companies with Election Ideas) | IT: Fatima Sulaiman Umar (08035533332 / 09035328748)
          </span>
        </div>

      </div>

    </div>
  );
}
