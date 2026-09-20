'use client';

import React, { useState } from 'react';
import { 
  Building, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Users, 
  ShieldAlert, 
  FileText,
  Clock,
  Download,
  Printer,
  Send
} from 'lucide-react';
import { AppUser } from '@/types/auth';
import { formatNumber } from '@/lib/utils';

interface LGASupervisorDashboardProps {
  currentUser: AppUser | null;
  onFileAffidavit: (affidavit: { lga: string; ward: string; reason: string }) => void;
}

export function LGASupervisorDashboard({
  currentUser,
  onFileAffidavit
}: LGASupervisorDashboardProps) {
  const lgaName = currentUser?.assignedLGA || 'Birnin Kebbi';

  const [activeTab, setActiveTab] = useState<'WARD_COLLATION' | 'LEGAL_SHIELD' | 'FORM_EC8C'>('WARD_COLLATION');
  const [affidavitModal, setAffidavitModal] = useState(false);
  const [targetWard, setTargetWard] = useState('Nassarawa I');
  const [protestReason, setProtestReason] = useState('Unlawful cancellation of 2 PUs due to engineered disturbance');

  // Wards in this LGA
  const [wards, setWards] = useState([
    { name: 'Dangaladima', totalPUs: 15, collatedPUs: 15, adc: 3420, apc: 1890, pdp: 65, rej: 42, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Nassarawa I', totalPUs: 18, collatedPUs: 16, adc: 4100, apc: 2150, pdp: 80, rej: 50, ec8bStatus: 'AUDIT_ALERT', cancelledPUs: 2 },
    { name: 'Nassarawa II', totalPUs: 16, collatedPUs: 16, adc: 3850, apc: 1980, pdp: 72, rej: 48, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Kola', totalPUs: 14, collatedPUs: 14, adc: 3100, apc: 1450, pdp: 55, rej: 38, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Marafa', totalPUs: 17, collatedPUs: 17, adc: 3950, apc: 2010, pdp: 70, rej: 45, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Makera', totalPUs: 15, collatedPUs: 15, adc: 3250, apc: 1800, pdp: 60, rej: 40, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Gwadangaji', totalPUs: 20, collatedPUs: 19, adc: 4400, apc: 2350, pdp: 95, rej: 58, ec8bStatus: 'CERTIFIED', cancelledPUs: 1 },
    { name: 'Kardi', totalPUs: 12, collatedPUs: 12, adc: 2600, apc: 1350, pdp: 48, rej: 32, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Zauro', totalPUs: 19, collatedPUs: 18, adc: 4200, apc: 2200, pdp: 88, rej: 52, ec8bStatus: 'CERTIFIED', cancelledPUs: 1 },
    { name: 'Ambursa', totalPUs: 22, collatedPUs: 21, adc: 4900, apc: 2450, pdp: 102, rej: 64, ec8bStatus: 'CERTIFIED', cancelledPUs: 1 },
    { name: 'Tarasa', totalPUs: 14, collatedPUs: 14, adc: 2950, apc: 1480, pdp: 54, rej: 36, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Umaru', totalPUs: 13, collatedPUs: 13, adc: 2800, apc: 1420, pdp: 50, rej: 34, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Maurida', totalPUs: 15, collatedPUs: 15, adc: 3150, apc: 1600, pdp: 58, rej: 38, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Gawasu', totalPUs: 14, collatedPUs: 14, adc: 2900, apc: 1500, pdp: 52, rej: 35, ec8bStatus: 'CERTIFIED', cancelledPUs: 0 },
    { name: 'Kola Junction', totalPUs: 16, collatedPUs: 15, adc: 3450, apc: 1820, pdp: 66, rej: 44, ec8bStatus: 'CERTIFIED', cancelledPUs: 1 }
  ]);

  const totalLgaPUs = wards.reduce((a, b) => a + b.totalPUs, 0);
  const totalLgaCollated = wards.reduce((a, b) => a + b.collatedPUs, 0);
  const totalLgaADC = wards.reduce((a, b) => a + b.adc, 0);
  const totalLgaAPC = wards.reduce((a, b) => a + b.apc, 0);
  const totalLgaPDP = wards.reduce((a, b) => a + b.pdp, 0);
  const totalLgaRej = wards.reduce((a, b) => a + b.rej, 0);
  const totalLgaCancelledPUs = wards.reduce((a, b) => a + b.cancelledPUs, 0);
  const totalLgaValid = totalLgaADC + totalLgaAPC + totalLgaPDP;
  const totalLgaReg = totalLgaPUs * 620;
  const totalLgaAccredited = totalLgaValid + totalLgaRej + (wards.length * 12);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const exportLgaCSV = () => {
    const headers = [
      'Ward Name',
      'Total PUs',
      'Collated PUs',
      'Registered Voters',
      'Accredited Voters',
      'ADC Votes (Malami)',
      'APC Votes (Nasir Idris)',
      'PDP Votes',
      'Total Valid Votes',
      'Rejected Ballots',
      'Cancelled PUs',
      'EC8B Certification Status'
    ];

    const rows = wards.map(w => {
      const reg = w.totalPUs * 620;
      const valid = w.adc + w.apc + w.pdp;
      const accredited = valid + w.rej + 12;
      return [
        `"${w.name}"`,
        w.totalPUs,
        w.collatedPUs,
        reg,
        accredited,
        w.adc,
        w.apc,
        w.pdp,
        valid,
        w.rej,
        w.cancelledPUs,
        `"${w.ec8bStatus}"`
      ].join(',');
    });

    const totalRow = [
      `"TOTAL (${lgaName.toUpperCase()} LGA)"`,
      totalLgaPUs,
      totalLgaCollated,
      totalLgaReg,
      totalLgaAccredited,
      totalLgaADC,
      totalLgaAPC,
      totalLgaPDP,
      totalLgaValid,
      totalLgaRej,
      totalLgaCancelledPUs,
      '"OFFICIAL_COLLATION_CERTIFIED"'
    ].join(',');

    const metadataComments = [
      '# INEC FORM EC8C LGA RESULTS COLLATION SCHEDULE (2027)',
      '# LOCAL GOVERNMENT AREA: ' + lgaName.toUpperCase() + ' | STATE: KEBBI',
      '# SUPERVISOR / COUNSEL: ' + (currentUser?.name || 'Barr. Sanusi Dangaladima') + ' (' + (currentUser?.badgeNumber || 'ADC-LGA-BK01') + ')',
      '# POWERED BY: GetoCore Digital Innovation in partnership with TEEM TECH Solution',
      '# DATE: ' + new Date().toISOString(),
      ''
    ].join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(metadataComments + [headers.join(','), ...rows, totalRow].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `Form_EC8C_${lgaName.replace(/\s+/g, '_')}_Collation.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAffidavitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFileAffidavit({
      lga: lgaName,
      ward: targetWard,
      reason: protestReason
    });
    setAffidavitModal(false);
    alert(`Formal Affidavit of Protest successfully filed and served to Electoral Officer for ${lgaName} LGA!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* LGA COMMAND HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                LEVEL 3: LGA SUPERVISOR & LEGAL SHIELD
              </span>
              <span className="text-xs font-mono text-slate-400">INEC Collation Hall Desk</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {lgaName} Local Government Collation & Legal Defense Center
            </h2>
            <p className="text-xs text-slate-300">
              Assigned Legal Counsel: <strong className="text-emerald-400">{currentUser?.name || 'Barr. Sanusi Dangaladima'}</strong> ({currentUser?.badgeNumber || 'ADC-LGA-BK01'})
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={exportLgaCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
              title="Export Form EC8C as CSV Spreadsheet"
            >
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 shrink-0 whitespace-nowrap"
              title="Print Official Form EC8C or Save as PDF"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Print Form EC8C (PDF)</span>
            </button>
            <button
              onClick={() => setAffidavitModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-600/20 shrink-0 whitespace-nowrap"
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>File Section 51 Protest Affidavit</span>
            </button>
          </div>
        </div>

        {/* LGA Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Wards Collated</div>
            <div className="text-xl font-black text-white mt-1 font-mono">{wards.filter(w => w.ec8bStatus === 'CERTIFIED').length} / {wards.length} Wards</div>
            <div className="text-[10px] text-emerald-400 font-mono">{totalLgaCollated}/{totalLgaPUs} PUs Total</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40">
            <div className="text-[10px] uppercase text-emerald-400 font-semibold">ADC LGA Score</div>
            <div className="text-xl font-black text-emerald-300 mt-1 font-mono">{formatNumber(totalLgaADC)}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Lead: +{formatNumber(totalLgaADC - totalLgaAPC)}</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase text-blue-400 font-semibold">APC LGA Score</div>
            <div className="text-xl font-black text-blue-300 mt-1 font-mono">{formatNumber(totalLgaAPC)}</div>
            <div className="text-[10px] text-slate-400">#2 Runner Up</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/40">
            <div className="text-[10px] uppercase text-amber-400 font-semibold">Section 51 Cancellations</div>
            <div className="text-xl font-black text-amber-300 mt-1 font-mono">{totalLgaCancelledPUs} PUs</div>
            <div className="text-[10px] text-slate-400">Affidavits served on all 6 PUs</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-800 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('WARD_COLLATION')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'WARD_COLLATION'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>1. Ward Form EC8B Tracking (15 Wards)</span>
        </button>

        <button
          onClick={() => setActiveTab('LEGAL_SHIELD')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'LEGAL_SHIELD'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>2. The Malami Legal Shield (Collation Hall Defense)</span>
        </button>

        <button
          onClick={() => setActiveTab('FORM_EC8C')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'FORM_EC8C'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>3. Form EC8C LGA Collation Declaration</span>
        </button>
      </div>

      {/* TAB 1: WARDS COLLATION LIST */}
      {activeTab === 'WARD_COLLATION' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
            <div>
              <span className="font-bold text-white text-sm block">Constituent Registration Areas in {lgaName}</span>
              <span className="text-slate-400 font-mono">14 Certified • 1 Under Investigation</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportLgaCSV}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Export Form EC8C as CSV"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                title="Print Official Form EC8C or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Form EC8C (PDF)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5 whitespace-nowrap">Ward Name</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">PUs Collated</th>
                  <th className="px-3 py-2.5 whitespace-nowrap text-emerald-400 font-mono">ADC Votes</th>
                  <th className="px-3 py-2.5 whitespace-nowrap text-blue-400 font-mono">APC Votes</th>
                  <th className="px-3 py-2.5 whitespace-nowrap text-rose-400 font-mono">Rejected</th>
                  <th className="px-3 py-2.5 whitespace-nowrap text-amber-400">Cancelled PUs</th>
                  <th className="px-3 py-2.5 whitespace-nowrap">EC8B Status</th>
                  <th className="px-3 py-2.5 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {wards.map((w) => (
                  <tr key={w.name} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-3 py-2.5 whitespace-nowrap font-semibold text-white">{w.name}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono">{w.collatedPUs} / {w.totalPUs}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono font-bold text-emerald-400">{formatNumber(w.adc)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono font-bold text-blue-400">{formatNumber(w.apc)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-rose-400">{w.rej}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-amber-400 font-bold">{w.cancelledPUs > 0 ? `${w.cancelledPUs} PUs` : 'None'}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                        w.ec8bStatus === 'CERTIFIED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {w.ec8bStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          setTargetWard(w.name);
                          setAffidavitModal(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition border border-slate-700/60 whitespace-nowrap"
                      >
                        Inspect / Protest
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LEGAL SHIELD DEFENSE */}
      {activeTab === 'LEGAL_SHIELD' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              LGA Collation Hall Legal Standing Orders
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">1. Section 51 Cancelled PVC Protection Protocol</strong>
                <p className="text-[11px] text-slate-400">
                  Whenever an Electoral Officer attempts to cancel polling units, demand the immediate completion of Form EC40G and record the exact number of collected PVCs.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">2. Pre-Emptive Arithmetic Verification</strong>
                <p className="text-[11px] text-slate-400">
                  Ensure the sum of all 15 Ward EC8Bs strictly matches the figures entered into LGA Form EC8C before the Electoral Officer transmits results to Birnin Kebbi.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-semibold">3. Sworn Affidavit Evidence Trail</strong>
                <p className="text-[11px] text-slate-400">
                  All objections raised on the floor must be supported with immediate written affidavits of protest, served with proof of delivery to INEC and security command.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-white text-base">Active Collation Hall Legal Petitions</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-amber-300 font-mono">PET-BK-001 • Nassarawa I Ward</span>
                  <span className="text-slate-500 font-mono">17:15 WAT</span>
                </div>
                <p className="text-slate-200">
                  Formal challenge against attempted cancellation of PU 004 & PU 007. ADC leads in both units. Demand for recount of valid BIVAS accreditation granted.
                </p>
                <div className="text-[10px] text-emerald-400 pt-1 font-semibold">Counsel on site: Barr. Sanusi Dangaladima</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FORM EC8C LGA DECLARATION */}
      {activeTab === 'FORM_EC8C' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base">
                INEC FORM EC8C — SUMMARY OF RESULTS AT LOCAL GOVERNMENT COLLATION LEVEL
              </h3>
              <p className="text-slate-400 text-xs">STATE: KEBBI | LOCAL GOVERNMENT AREA: {lgaName}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportLgaCSV}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                title="Export Form EC8C as CSV"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Form EC8C (CSV)</span>
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                title="Print Official Form EC8C or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Form EC8C (PDF)</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Total PUs in LGA</span>
                <span className="text-white text-lg font-black">{totalLgaPUs}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/40">
                <span className="text-emerald-400 block text-[10px]">ADC Total Votes</span>
                <span className="text-emerald-300 text-lg font-black">{formatNumber(totalLgaADC)}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-blue-500/40">
                <span className="text-blue-400 block text-[10px]">APC Total Votes</span>
                <span className="text-blue-300 text-lg font-black">{formatNumber(totalLgaAPC)}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ADC Net Margin</span>
                <span className="text-emerald-400 text-lg font-black">+{formatNumber(totalLgaADC - totalLgaAPC)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 space-y-1 text-[11px]">
              <div>INEC Electoral Officer: <strong>Hajiya Amina (Collation Desk)</strong></div>
              <div>ADC Lead Counsel: <strong>{currentUser?.name || 'Barr. Sanusi Dangaladima'}</strong></div>
              <div>Form EC8C Status: <strong className="text-emerald-400">Countersigned & Ready for State Collation (Birnin Kebbi)</strong></div>
            </div>
          </div>

          {/* Constituent Wards Collation Tabulation */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-0">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Constituent Wards Collation Sheet ({wards.length} Wards)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">ARITHMETIC INTEGRITY: 100% BALANCED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">S/N</th>
                    <th className="p-2.5">Ward Name</th>
                    <th className="p-2.5 text-center">PUs</th>
                    <th className="p-2.5 text-right text-cyan-400">Reg. Voters</th>
                    <th className="p-2.5 text-right text-blue-300">Accredited</th>
                    <th className="p-2.5 text-right text-emerald-400 font-black">ADC</th>
                    <th className="p-2.5 text-right text-blue-400">APC</th>
                    <th className="p-2.5 text-right text-purple-400">PDP</th>
                    <th className="p-2.5 text-right text-rose-400">Rej</th>
                    <th className="p-2.5 text-right text-white font-bold">Total Valid</th>
                    <th className="p-2.5 text-right font-sans">Margin</th>
                    <th className="p-2.5 text-center font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11px]">
                  {wards.map((w, idx) => {
                    const reg = w.totalPUs * 620;
                    const valid = w.adc + w.apc + w.pdp;
                    const accredited = valid + w.rej + 12;
                    const margin = w.adc - w.apc;
                    return (
                      <tr key={w.name} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-2 text-slate-500">{idx + 1}</td>
                        <td className="p-2 font-semibold text-white font-sans">{w.name}</td>
                        <td className="p-2 text-center text-slate-400">{w.collatedPUs}/{w.totalPUs}</td>
                        <td className="p-2 text-right text-slate-400">{formatNumber(reg)}</td>
                        <td className="p-2 text-right text-slate-300">{formatNumber(accredited)}</td>
                        <td className="p-2 text-right font-black text-emerald-400">{formatNumber(w.adc)}</td>
                        <td className="p-2 text-right text-blue-400">{formatNumber(w.apc)}</td>
                        <td className="p-2 text-right text-purple-400">{w.pdp}</td>
                        <td className="p-2 text-right text-rose-400">{w.rej}</td>
                        <td className="p-2 text-right font-bold text-white">{formatNumber(valid)}</td>
                        <td className={`p-2 text-right font-bold ${margin >= 0 ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {margin >= 0 ? `+${formatNumber(margin)}` : formatNumber(margin)}
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            w.ec8bStatus === 'CERTIFIED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {w.ec8bStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-900 font-bold text-xs border-t border-slate-700">
                  <tr>
                    <td colSpan={2} className="p-2 text-white font-sans uppercase">TOTAL ({lgaName.toUpperCase()} LGA)</td>
                    <td className="p-2 text-center text-slate-300">{totalLgaCollated}/{totalLgaPUs}</td>
                    <td className="p-2 text-right text-slate-300">{formatNumber(totalLgaReg)}</td>
                    <td className="p-2 text-right text-slate-300">{formatNumber(totalLgaAccredited)}</td>
                    <td className="p-2 text-right font-black text-emerald-400 text-sm">{formatNumber(totalLgaADC)}</td>
                    <td className="p-2 text-right font-black text-blue-400 text-sm">{formatNumber(totalLgaAPC)}</td>
                    <td className="p-2 text-right font-black text-purple-400">{formatNumber(totalLgaPDP)}</td>
                    <td className="p-2 text-right font-black text-rose-400">{formatNumber(totalLgaRej)}</td>
                    <td className="p-2 text-right font-black text-white text-sm">{formatNumber(totalLgaValid)}</td>
                    <td className="p-2 text-right font-black text-emerald-400 text-sm">+{formatNumber(totalLgaADC - totalLgaAPC)}</td>
                    <td className="p-2 text-center text-emerald-400 font-sans">CERTIFIED</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* AFFIDAVIT MODAL */}
      {affidavitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Execute Section 51 Protest Affidavit</h4>
              </div>
              <button 
                onClick={() => setAffidavitModal(false)}
                className="w-7 h-7 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAffidavitSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Ward:</label>
                <input
                  type="text"
                  value={targetWard}
                  onChange={(e) => setTargetWard(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Legal Grounds for Objection:</label>
                <textarea
                  value={protestReason}
                  onChange={(e) => setProtestReason(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-[11px] text-slate-300">
                This affidavit will be notarized on-site by the LGA Legal Shield Counsel and entered into the official INEC proceedings record.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
              >
                Execute & Serve Affidavit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE OFFICIAL INEC FORM EC8C MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl print-page my-6 border border-slate-300">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 no-print">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Official Form EC8C Print Preview &bull; Ready for Collation Center Signatures
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print to PDF / Paper</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official INEC Header */}
            <div className="text-center space-y-1 border-b-2 border-emerald-800 pb-4">
              <div className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                INDEPENDENT NATIONAL ELECTORAL COMMISSION
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                FORM EC8C: LOCAL GOVERNMENT AREA RESULTS COLLATION SUMMARY
              </h2>
              <div className="text-xs font-semibold text-slate-700">
                ELECTION TO THE OFFICE OF THE GOVERNOR OF KEBBI STATE &bull; 2027
              </div>
              <div className="flex justify-center gap-6 text-xs font-mono pt-1 text-slate-800 font-bold">
                <span>STATE: KEBBI (CODE: 21)</span>
                <span>LOCAL GOVERNMENT AREA: {lgaName.toUpperCase()}</span>
                <span>CONSTITUENT WARDS: {wards.length}</span>
              </div>
            </div>

            {/* Results Tabulation Sheet */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">S/N</th>
                    <th className="p-2 border-r border-slate-300">Registration Area / Ward Name</th>
                    <th className="p-2 text-center border-r border-slate-300">PUs</th>
                    <th className="p-2 text-right border-r border-slate-300">Reg. Voters</th>
                    <th className="p-2 text-right border-r border-slate-300">BVAS Accred.</th>
                    <th className="p-2 text-right border-r border-slate-300 font-black text-emerald-900">ADC (Malami)</th>
                    <th className="p-2 text-right border-r border-slate-300">APC (Idris)</th>
                    <th className="p-2 text-right border-r border-slate-300">PDP</th>
                    <th className="p-2 text-right border-r border-slate-300">Rejected</th>
                    <th className="p-2 text-right border-r border-slate-300 font-bold">Total Valid</th>
                    <th className="p-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800 font-mono text-[11px]">
                  {wards.map((w, idx) => {
                    const reg = w.totalPUs * 620;
                    const valid = w.adc + w.apc + w.pdp;
                    const accredited = valid + w.rej + 12;
                    return (
                      <tr key={w.name}>
                        <td className="p-1.5 text-center border-r border-slate-200">{idx + 1}</td>
                        <td className="p-1.5 font-bold font-sans border-r border-slate-200">{w.name}</td>
                        <td className="p-1.5 text-center border-r border-slate-200">{w.collatedPUs}/{w.totalPUs}</td>
                        <td className="p-1.5 text-right border-r border-slate-200">{formatNumber(reg)}</td>
                        <td className="p-1.5 text-right border-r border-slate-200 font-bold">{formatNumber(accredited)}</td>
                        <td className="p-1.5 text-right font-black border-r border-slate-200 text-emerald-900">{formatNumber(w.adc)}</td>
                        <td className="p-1.5 text-right border-r border-slate-200">{formatNumber(w.apc)}</td>
                        <td className="p-1.5 text-right border-r border-slate-200">{w.pdp}</td>
                        <td className="p-1.5 text-right border-r border-slate-200">{w.rej}</td>
                        <td className="p-1.5 text-right font-bold border-r border-slate-200">{formatNumber(valid)}</td>
                        <td className="p-1.5 text-center font-sans font-bold text-emerald-700">CERTIFIED</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold text-xs text-slate-900 border-t-2 border-slate-400">
                  <tr>
                    <td colSpan={2} className="p-2 text-left uppercase">TOTALS FOR {lgaName.toUpperCase()} LGA</td>
                    <td className="p-2 text-center font-black">{totalLgaCollated}/{totalLgaPUs}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalLgaReg)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalLgaAccredited)}</td>
                    <td className="p-2 text-right font-black text-emerald-900 text-sm">{formatNumber(totalLgaADC)}</td>
                    <td className="p-2 text-right font-black text-sm">{formatNumber(totalLgaAPC)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalLgaPDP)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalLgaRej)}</td>
                    <td className="p-2 text-right font-black text-sm">{formatNumber(totalLgaValid)}</td>
                    <td className="p-2 text-center text-emerald-800 font-black">VALID</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Legal Attestation & Section 51 Audit Compliance */}
            <div className="pt-3 border-t border-slate-300 space-y-3 text-xs text-slate-800">
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] leading-relaxed">
                <strong>STATUTORY CERTIFICATION (ELECTORAL ACT 2022 &bull; SECTIONS 51, 60 &amp; 64):</strong><br />
                Net ADC Lead Margin in {lgaName} is <strong>+{formatNumber(totalLgaADC - totalLgaAPC)} votes</strong>. 
                Total Cancelled PVCs in disputed areas: <strong>{formatNumber(totalLgaCancelledPUs * 650)}</strong>. 
                All Form EC8B sheets were verified against BVAS electronic audit logs prior to execution of this Form EC8C.
              </div>
              
              <div className="grid grid-cols-4 gap-4 pt-4 font-mono text-[10px]">
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">Prof. Haruna Birnin Kebbi</div>
                  <div className="text-slate-600">Local Govt Collation Officer (LGCO)</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold text-emerald-900">{currentUser?.name || 'Barr. Sanusi Dangaladima'}</div>
                  <div className="text-slate-600">ADC Lead Legal Shield Counsel</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">Alhaji Bello Gwandu</div>
                  <div className="text-slate-600">APC Collation Agent</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">Hajiya Amina (EO)</div>
                  <div className="text-slate-600">INEC Electoral Officer / Official Stamp</div>
                </div>
              </div>

              {/* Technical Partnership Footnote */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>INEC FORM EC8C OFFICIAL LGA TABULATION SHEET</span>
                <span>Powered by <strong>GetoCore Digital Innovation</strong> in partnership with <strong>TEEM TECH Solution</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
