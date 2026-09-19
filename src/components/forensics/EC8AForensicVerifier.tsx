'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Download, 
  FileText, 
  RefreshCw 
} from 'lucide-react';

export function EC8AForensicVerifier() {
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [bivasAccredited, setBivasAccredited] = useState<number>(342);
  const [adcVotes, setAdcVotes] = useState<number>(214);
  const [apcVotes, setApcVotes] = useState<number>(118);
  const [pdpVotes, setPdpVotes] = useState<number>(6);
  const [rejectedVotes, setRejectedVotes] = useState<number>(4);

  const totalVotesCast = adcVotes + apcVotes + pdpVotes + rejectedVotes;
  const isOvervoting = totalVotesCast > bivasAccredited;
  const overvotingDiff = totalVotesCast - bivasAccredited;

  const handleSimulateTamper = (tamper: boolean) => {
    setIsTampered(tamper);
    if (tamper) {
      setApcVotes(168); // Over-voting trigger
    } else {
      setApcVotes(118);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-2">
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
          The Malami Legal Shield (Forensic Audit Engine)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Form EC8A & BIVAS Automated Mathematical Cross-Check
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Automated compliance verification under Section 51(2) of the Electoral Act 2022. 
          If Total Votes Cast exceed BIVAS Accredited Voters, the system immediately generates an official 
          <strong> Affidavit of Protest</strong> and dispatches the LGA Litigation Counsel before Form EC8B can be signed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Scanned Form EC8A Inspector Container */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-sm">Form EC8A Scanned Copy Inspector</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
              PU ID: 21-01-04-008
            </span>
          </div>

          {/* Form Representation */}
          <div className="bg-amber-50/5 border-2 border-dashed border-slate-700 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-center border-b border-slate-700 pb-2">
              <div className="font-black text-white text-sm">INDEPENDENT NATIONAL ELECTORAL COMMISSION</div>
              <div className="text-[11px] text-amber-300">FORM EC8A — STATEMENT OF RESULT OF POLL FROM POLLING UNIT</div>
              <div className="text-[10px] text-slate-400">STATE: KEBBI | LGA: BIRNIN KEBBI | WARD: DANGALADIMA</div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between p-1 bg-slate-950/60 rounded">
                <span>1. Registered Voters:</span>
                <span className="font-bold text-white">750</span>
              </div>
              <div className="flex justify-between p-1 bg-slate-950/60 rounded">
                <span>2. Accredited Voters on BIVAS:</span>
                <span className="font-bold text-emerald-400 font-mono">{bivasAccredited}</span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-2 space-y-1">
              <div className="font-bold text-slate-200 text-xs">VOTES SCORED BY PARTIES:</div>
              <div className="flex justify-between"><span>ADC (Abubakar Malami):</span> <span className="font-bold text-emerald-400">{adcVotes}</span></div>
              <div className="flex justify-between"><span>APC (Nasir Idris):</span> <span className="font-bold text-blue-400">{apcVotes}</span></div>
              <div className="flex justify-between"><span>PDP:</span> <span className="font-bold text-purple-400">{pdpVotes}</span></div>
              <div className="flex justify-between text-rose-400"><span>Rejected Ballots:</span> <span className="font-bold">{rejectedVotes}</span></div>
              <div className="flex justify-between border-t border-slate-700 pt-1 font-bold text-white">
                <span>TOTAL VALID + REJECTED:</span>
                <span className={`font-mono text-sm ${isOvervoting ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {totalVotesCast} {isOvervoting && `(+${overvotingDiff} Excess!)`}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-2 flex justify-between text-[10px] text-slate-400">
              <span>Presiding Officer: M. Danladi</span>
              <span className="text-emerald-400 font-bold">ADC Agent Signed: YES</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button 
              onClick={() => handleSimulateTamper(false)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                !isTampered ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Test Valid Match
            </button>
            <button 
              onClick={() => handleSimulateTamper(true)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                isTampered ? 'bg-rose-600 text-white' : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
              }`}
            >
              Simulate Over-Voting Sabotage (+50 Ballots)
            </button>
          </div>
        </div>

        {/* Audit Verdict & Legal Shield Action */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-sm">Automated Legal Audit Findings</h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
              isOvervoting 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              {isOvervoting ? 'CRITICAL: SECTION 51 VIOLATION' : '100% COMPLIANT (CERTIFIED)'}
            </span>
          </div>

          {/* Verdict Box */}
          <div className="space-y-3 text-xs">
            {isOvervoting ? (
              <>
                <div className="p-3.5 bg-rose-950/30 rounded-xl border border-rose-500/40 space-y-1">
                  <strong className="text-rose-300 text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Over-Voting Detected Under Section 51(2)
                  </strong>
                  <p className="text-slate-300">
                    Total votes cast ({totalVotesCast}) exceed accredited voters on BIVAS ({bivasAccredited}) by 
                    <strong className="text-rose-400"> {overvotingDiff} ballots</strong>.
                  </p>
                </div>

                <div className="p-3.5 bg-amber-950/30 rounded-xl border border-amber-500/40 space-y-2">
                  <strong className="text-amber-300 text-xs flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    "The Malami Legal Shield" Rapid Intervention Protocol:
                  </strong>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                    <li>Dispatched <strong>Barr. Sanusi Dangaladima</strong> (Birnin Kebbi LGA Legal Lead).</li>
                    <li>Auto-generated Form EC8A Protest Notice served to Electoral Officer.</li>
                    <li>Sworn Affidavit of Fact executed documenting BIVAS screen at 16:30 WAT.</li>
                    <li>Demanded quarantine of the 50 excess ballots prior to Ward Form EC8B collation.</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Section 51 Compliance (Zero Over-Voting)</strong>
                    <span className="text-slate-400">Total votes cast (342) equals exactly the number of accredited voters registered by BIVAS (342). Internal arithmetic reconciled.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Digital Cryptographic Stamp</strong>
                    <span className="text-slate-400">SHA-256 hash generated and time-stamped. Admissible under Section 84 of the Nigerian Evidence Act.</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Agent Endorsement Match</strong>
                    <span className="text-slate-400">Signature matches accredited Khadimiyya / ADC field agent database for PU 21-01-04-008.</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <strong>Tribunal Admissibility:</strong> All audited Form EC8As are automatically archived in dual encrypted cloud and offline servers, ready for immediate tender in the Kebbi State Governorship Election Petition Tribunal.
          </div>
        </div>

      </div>

    </div>
  );
}
