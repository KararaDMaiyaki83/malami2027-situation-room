'use client';

import React, { useState } from 'react';
import { LGACollationData } from '@/types/election';
import { formatNumber } from '@/lib/utils';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Search, 
  Download, 
  Eye, 
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

interface ChainOfCustodyDeskProps {
  lgas: LGACollationData[];
  initialLGA?: string;
}

export function ChainOfCustodyDesk({ lgas, initialLGA = 'Birnin Kebbi' }: ChainOfCustodyDeskProps) {
  const [selectedLGA, setSelectedLGA] = useState<string>(initialLGA);
  const [selectedWard, setSelectedWard] = useState<string>('Dangaladima');
  const [selectedPUForModal, setSelectedPUForModal] = useState<any | null>(null);

  const lgaData = lgas.find(l => l.name === selectedLGA) || lgas[0];

  const sampleWardsByLGA: Record<string, string[]> = {
    'Birnin Kebbi': ['Dangaladima', 'Nassarawa I', 'Nassarawa II', 'Kola', 'Marafa', 'Makera', 'Gwadangaji'],
    'Aliero': ['Aliero Dangaladima', 'Aliero Sabon Gari', 'Jiga Birni', 'Danwarai'],
    'Argungu': ['Argungu Central', 'Gulma', 'Alwasa', 'Felande'],
    'Zuru': ['Zuru Urban', 'Rikoto', 'Bedserawa', 'Manga Ushe'],
    'Jega': ['Jega Firchin', 'Jega Magaji', 'Alelu', 'Kimba'],
    'Danko/Wasagu': ['Ribah', 'Wasagu', 'Danko', 'Kanya']
  };

  const wards = sampleWardsByLGA[selectedLGA] || ['Ward 01 Central', 'Ward 02 North', 'Ward 03 South', 'Ward 04 East'];

  // Synthetic polling units generator for selected ward
  const pollingUnits = Array.from({ length: 12 }).map((_, i) => {
    const puNum = String(i + 1).padStart(3, '0');
    const adc = 160 + (i * 12) + (selectedLGA === 'Birnin Kebbi' ? 40 : 0);
    const apc = 80 + (i * 8);
    const pdp = 5 + (i * 2);
    const rej = 3 + (i % 3);
    const bivas = adc + apc + pdp + rej;
    
    return {
      puCode: `PU 21-${lgaData.id.replace('lga-', '')}-01-${puNum}`,
      puName: `Polling Unit ${puNum} (${i % 2 === 0 ? 'Primary School' : 'Dispensary Square'})`,
      bivasAccredited: bivas,
      adcVotes: adc,
      apcVotes: apc,
      pdpVotes: pdp,
      rejectedVotes: rej,
      ec8aUploaded: true,
      hasOvervoting: false,
      agentName: `Agent ${i % 2 === 0 ? 'Abubakar' : 'Ibrahim'} ${lgaData.name}`,
      timestamp: `16:${String(20 + i).padStart(2, '0')} WAT`
    };
  });

  const wardTotalADC = pollingUnits.reduce((a, b) => a + b.adcVotes, 0);
  const wardTotalAPC = pollingUnits.reduce((a, b) => a + b.apcVotes, 0);
  const wardTotalBIVAS = pollingUnits.reduce((a, b) => a + b.bivasAccredited, 0);
  const wardTotalRejected = pollingUnits.reduce((a, b) => a + b.rejectedVotes, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER EXPLANATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="max-w-3xl space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Chain of Results Custody (Audit Engine)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Unbroken Transmission: Polling Unit → Ward RAC → LGA Hall → State Headquarters
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every single vote is verified at each transition stage. The system automatically sums all constituent 
            <strong> Form EC8As</strong> and compares them against <strong>Form EC8B</strong> before the Ward Collation Officer signs off.
          </p>
        </div>

        {/* 4-Stage Custody Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-emerald-400">1. Polling Unit (PU)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded">Form EC8A</span>
            </div>
            <p className="text-[11px] text-slate-300">Agent records BIVAS, photographs Form EC8A, and transmits encrypted score.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-blue-400">2. Ward Collation (RAC)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded">Form EC8B</span>
            </div>
            <p className="text-[11px] text-slate-300">Ward Paralegal sums all incoming PU EC8As to prevent arithmetic alterations.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-purple-400">3. LGA Collation Hall</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded">Form EC8C</span>
            </div>
            <p className="text-[11px] text-slate-300">2 Litigation Counsels defend results; monitor Section 51 cancellations.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-400">4. State Collation HQ</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded">Form EC8D</span>
            </div>
            <p className="text-[11px] text-slate-300">State Returning Officer collation; live reconciliation against parallel tabulation.</p>
          </div>
        </div>
      </div>

      {/* SELECTION AND DRILLDOWN MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Selector Column */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            Geographic Navigator
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">1. Select Local Government Area (21 LGAs):</label>
              <select 
                value={selectedLGA}
                onChange={(e) => {
                  setSelectedLGA(e.target.value);
                  const firstWard = sampleWardsByLGA[e.target.value]?.[0] || 'Ward 01 Central';
                  setSelectedWard(firstWard);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-medium focus:border-emerald-500 focus:outline-none"
              >
                {lgas.map(l => (
                  <option key={l.id} value={l.name}>
                    {l.name} ({l.zone} • {l.totalPUs} PUs)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">2. Select Electoral Ward (Registration Area):</label>
              <select 
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-medium focus:border-emerald-500 focus:outline-none"
              >
                {wards.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-[11px]">
                <div className="text-slate-400">Assigned LGA Counsel: <strong className="text-slate-200">{lgaData.legalLeadName}</strong></div>
                <div className="text-slate-400">Ward Paralegal: <strong className="text-slate-200">Usman Dangaladima</strong></div>
                <div className="text-slate-400">Form EC8C Status: <span className="text-emerald-400 font-bold">In Progress (88% Collated)</span></div>
                <div className="text-slate-400">Section 51 Cancellations: <span className="text-amber-400 font-bold">{lgaData.cancelledPVCs} PVCs</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Table & Ward Form EC8B Reconciler */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base">
                {selectedLGA} LGA — {selectedWard} Ward ({pollingUnits.length} Polling Units)
              </h3>
              <p className="text-xs text-slate-400">Auditing raw Form EC8As against Ward Collation Form EC8B</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              FORM EC8B AUDIT MATCH CONFIRMED
            </span>
          </div>

          {/* Polling Units Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-2.5">PU Code</th>
                  <th className="p-2.5">Location Name</th>
                  <th className="p-2.5 font-mono">BIVAS</th>
                  <th className="p-2.5 text-emerald-400 font-mono">ADC</th>
                  <th className="p-2.5 text-blue-400 font-mono">APC</th>
                  <th className="p-2.5 text-purple-400 font-mono">PDP</th>
                  <th className="p-2.5 text-rose-400 font-mono">Rej</th>
                  <th className="p-2.5">Form EC8A</th>
                  <th className="p-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {pollingUnits.map((pu, idx) => (
                  <tr key={pu.puCode} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-2.5 font-mono text-slate-400">{pu.puCode}</td>
                    <td className="p-2.5 font-medium text-white">{pu.puName}</td>
                    <td className="p-2.5 font-mono font-bold text-white">{pu.bivasAccredited}</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-400">{pu.adcVotes}</td>
                    <td className="p-2.5 font-mono font-bold text-blue-400">{pu.apcVotes}</td>
                    <td className="p-2.5 font-mono text-purple-400">{pu.pdpVotes}</td>
                    <td className="p-2.5 font-mono text-rose-400">{pu.rejectedVotes}</td>
                    <td className="p-2.5">
                      <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Snapped
                      </span>
                    </td>
                    <td className="p-2.5">
                      <button 
                        onClick={() => setSelectedPUForModal(pu)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form EC8B Ward Collation Reconciliation Bar */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Ward Form EC8B Summary Tally:
              </span>
              <span className="text-slate-400 font-mono">
                Total BIVAS Accredited: <strong className="text-white">{formatNumber(wardTotalBIVAS)}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ADC Total</span>
                <span className="text-emerald-400 font-black">{formatNumber(wardTotalADC)}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">APC Total</span>
                <span className="text-blue-400 font-black">{formatNumber(wardTotalAPC)}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ADC Lead</span>
                <span className="text-emerald-300 font-black">+{formatNumber(wardTotalADC - wardTotalAPC)}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Rejected</span>
                <span className="text-rose-400 font-black">{formatNumber(wardTotalRejected)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1 flex justify-between items-center">
              <span>EC8B Form Status: <strong className="text-emerald-400">Countersigned by ADC Ward Paralegal</strong></span>
              <span>Duplicate copy securely routed to LGA Collation hall.</span>
            </div>
          </div>

        </div>

      </div>

      {/* PU INSPECTION MODAL */}
      {selectedPUForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div>
                <h4 className="font-bold text-white text-sm">{selectedPUForModal.puCode}</h4>
                <p className="text-xs text-slate-400">{selectedPUForModal.puName}</p>
              </div>
              <button 
                onClick={() => setSelectedPUForModal(null)}
                className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">BIVAS Accreditation:</span>
                <span className="font-bold text-white">{selectedPUForModal.bivasAccredited}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400 font-bold">ADC (Malami):</span>
                <span className="font-bold text-emerald-400">{selectedPUForModal.adcVotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400 font-bold">APC:</span>
                <span className="font-bold text-blue-400">{selectedPUForModal.apcVotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">PDP:</span>
                <span>{selectedPUForModal.pdpVotes}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Rejected:</span>
                <span>{selectedPUForModal.rejectedVotes}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px]">
                <span className="text-slate-400">Reporting Agent:</span>
                <span className="text-slate-200">{selectedPUForModal.agentName}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{selectedPUForModal.timestamp}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-slate-300">
              <span className="text-emerald-400 font-bold block mb-0.5">Forensic Audit Pass:</span>
              Total votes match BIVAS accreditation. Form EC8A image signed by presiding officer and police agent.
            </div>

            <button 
              onClick={() => setSelectedPUForModal(null)}
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
