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
  FileText
} from 'lucide-react';

export function MalamiExecutivePitchDeck({ onOpenBudget }: { onOpenBudget?: () => void }) {
  const [slide, setSlide] = useState<number>(1);
  const totalSlides = 7;

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
              href="/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
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
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 min-h-[460px] shadow-2xl flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* SLIDE 1: STRATEGIC OPPORTUNITY */}
        {slide === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block">
              SLIDE 1: STRATEGIC OPPORTUNITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              2027 is Not Starting from Scratch: <br/>
              <span className="text-emerald-400">Closing a 48,000-Vote Gap with an Unbeatable Candidate</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>Core Pitch:</strong> The ruling party did not achieve a mandate of overwhelming popularity; they scraped through due to opposition complacency and collation collapse. SAN Malami has the exact profile to consolidate the opposition.
            </p>
          </div>
        )}

        {/* SLIDE 2: OPPOSITION LAPSES SOLVED */}
        {slide === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 inline-block">
              SLIDE 2: WHY PDP LOST & HOW MALAMI SOLVES IT
            </span>
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
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: Legal Shield with 42 litigation lawyers & 225 paralegals.</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">3. 19,082 Wasted Ballots</strong>
                <p className="text-slate-300 text-[11px]">Rural women smudged ink or folded horizontally into opposing boxes.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: 500k sample ballots & vertical-fold tutorials.</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-400 block font-semibold">4. Southern Kebbi Alienation</strong>
                <p className="text-slate-300 text-[11px]">Zuru & Yauri felt excluded from power rotation and left vulnerable to bandits.</p>
                <span className="text-emerald-400 font-bold block pt-1">Malami Solution: Deputy Governorship pledge & security guard treaty.</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: MATHEMATICAL PATHWAY */}
        {slide === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              SLIDE 3: THE MATHEMATICAL VICTORY FORMULA
            </span>
            <h2 className="text-2xl font-black text-white">
              Overturning the Deficit: Delivering a +73,000 Vote Surge
            </h2>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400"><span>2023 Baseline Deficit:</span> <span className="text-rose-400 font-bold">-48,285</span></div>
              <div className="flex justify-between text-emerald-400"><span>Pillar 1: Kebbi Central Landslide Surge (Malami Base):</span> <span className="font-bold">+55,000</span></div>
              <div className="flex justify-between text-emerald-400"><span>Pillar 2: Kebbi South Equity & Security Consolidation:</span> <span className="font-bold">+30,000</span></div>
              <div className="flex justify-between text-emerald-400"><span>Pillar 3: Kebbi North Border & Agrarian Parity:</span> <span className="font-bold">+5,000</span></div>
              <div className="flex justify-between text-emerald-400"><span>Pillar 4: Recovery of Wasted/Rejected Ballots:</span> <span className="font-bold">+12,000</span></div>
              <div className="flex justify-between text-emerald-400"><span>Pillar 5: Anti-Cancellation Ballot Protection (Legal Shield):</span> <span className="font-bold">+20,000</span></div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>PROJECTED ADC VICTORY MARGIN:</span>
                <span className="text-emerald-300 text-base">+73,715 VOTES</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: MONITORING SYSTEM */}
        {slide === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 inline-block">
              SLIDE 4: THE COMMAND CENTER ARCHITECTURE
            </span>
            <h2 className="text-2xl font-black text-white">
              Surpassing Atiku & Jika Hanta Situation Rooms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-blue-400 block font-semibold">PU-to-Collation Custody</strong>
                <p className="text-slate-300 text-[11px]">Unbroken audit from Form EC8A (PU) → EC8B (Ward) → EC8C (LGA) → EC8D (State).</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-blue-400 block font-semibold">3-Tier Comms Fallback</strong>
                <p className="text-slate-300 text-[11px]">Encrypted App (70%) + USSD/SMS (26.2%) + VHF Radio Repeaters (3.8%) for remote riverine Bagudo.</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-blue-400 block font-semibold">Automated BIVAS Audit</strong>
                <p className="text-slate-300 text-[11px]">Instant detection of votes &gt; BIVAS to eliminate Section 51 cancellations on the spot.</p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: ACTION PROTOCOL */}
        {slide === 5 && (
          <div className="space-y-5 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
              SLIDE 5: IMMEDIATE EXECUTION ROADMAP
            </span>
            <h2 className="text-2xl font-black text-white">
              Next Immediate Steps for the Malami Campaign High Command
            </h2>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</span>
                <span>Formally commission the ADC 2027 Directorate of Electoral Intelligence & Situation Room.</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</span>
                <span>Integrate Khadimiyya Foundation ward coordinators into "Operation Fortify 225".</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</span>
                <span>Finalize negotiations on the Southern Kebbi (Zuru & Yauri) Charter of Equity.</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</span>
                <span>Execute state-wide simulation test of the 3,745 Polling Unit agent network.</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: FINANCIAL IMPLICATIONS & MASTER BUDGET */}
        {slide === 6 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-block">
                SLIDE 6: FINANCIAL IMPLICATIONS (MASTER BUDGET)
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

        {/* SLIDE 7: GOVERNANCE & SIGN-OFF */}
        {slide === 7 && (
          <div className="space-y-4 animate-in fade-in">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              SLIDE 7: GOVERNANCE &amp; STRATEGIC SIGN-OFF
            </span>
            <h2 className="text-2xl font-black text-white">
              Financial Accountability Controls &amp; Commissioning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400">Governance &amp; Anti-Fraud Safeguards:</div>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong>Direct Account Crediting:</strong> Field payments sent via BVN/phone numbers tied to assigned Polling Unit codes. Zero cash leakage.</li>
                  <li>• <strong>Milestone-Linked Escrow:</strong> Tranches released only after verified delivery of each phase.</li>
                  <li>• <strong>Permanent Capital Assets:</strong> Laptops, video walls, inverters, and Starlink terminals remain permanent foundation property.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-600/40 space-y-3">
                <div className="font-bold text-amber-300">Executive Action Required:</div>
                <p className="text-slate-300 text-xs">
                  Formal sign-off on the ₦329M Budget and commissioning of <strong>GetoCore Digital Innovation &amp; TEEM TECH Solution</strong> as Lead Systems Architects.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400">Lead IT Technical Officer: <strong className="text-emerald-400">Fatima Sulaiman Umar</strong></div>
                  <div className="text-amber-400 font-mono">Hotlines: 08035533332 / 09035328748</div>
                </div>
                <div className="pt-1 flex gap-2">
                  <a
                    href="/kebbi_2027_financial_implications_budget.html"
                    target="_blank"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center text-xs transition"
                  >
                    View Full Printable Budget
                  </a>
                  <a
                    href="/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
                    download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                  >
                    Download .pptx
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
