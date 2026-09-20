import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-12 py-8 text-center text-xs text-slate-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-3">
        
        {/* Campaign & Directorate Title */}
        <div>
          <p className="font-bold text-white text-base tracking-tight">
            Abubakar Malami (SAN) Election 2027 Situation Room
          </p>
          <p className="text-xs text-emerald-400 font-semibold mt-0.5">
            Official Situation Room Platform by the Technical Team &bull; Kebbi State Central Collation Command
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            African Democratic Congress (ADC) 🤝 Directorate of Electoral Strategy, ICT &amp; Legal Defense
          </p>
        </div>

        {/* Technical Partner Co-Branding Banner */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <span className="text-slate-400 font-medium">Powered by</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GetoCore Digital Innovation</span>
          </div>
          <span className="text-slate-500 text-xs font-semibold">&amp;</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/70 border border-amber-500/50 text-amber-300 font-bold shadow-sm">
            <span>🤝</span>
            <span>TEEM TECH Solution</span>
          </div>
          <span className="text-[11px] text-amber-300 font-semibold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            Kaduna&apos;s #1 IT Companies with Election Ideas
          </span>
        </div>

        {/* Technical Leadership & Direct Support Desk */}
        <div className="pt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400">IT Technical Officer:</span>
            <span className="font-semibold text-emerald-400">Fatima Sulaiman Umar</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800 font-mono">
            <span className="text-slate-400">Support Desk:</span>
            <a href="tel:08035533332" className="text-amber-400 hover:text-amber-300 hover:underline">08035533332</a>
            <span className="text-slate-600">/</span>
            <a href="tel:09035328748" className="text-amber-400 hover:text-amber-300 hover:underline">09035328748</a>
          </div>
        </div>

        {/* Telemetry & Compliance Tagline */}
        <div className="pt-1 text-[10px] text-slate-600 font-mono flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>End-to-End Cryptographic Audit Chain</span>
          <span>•</span>
          <span>Dual GPS Geo-Fence Telemetry</span>
          <span>•</span>
          <span>Section 51 Electoral Act AI Engine</span>
          <span>•</span>
          <span>Zero-Plaintext Tier 4 Infrastructure</span>
        </div>

      </div>
    </footer>
  );
}
