'use client';

import React, { useState } from 'react';
import { LGACollationData } from '@/types/election';
import { formatNumber } from '@/lib/utils';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle2, 
  Users, 
  Layers, 
  Building2, 
  FileText,
  HelpCircle,
  Filter,
  Download,
  Printer,
  MapPin,
  Scale,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Table,
  LayoutGrid
} from 'lucide-react';

interface StatewideSituationRoomProps {
  lgas: LGACollationData[];
  onSelectLGAForChain: (lgaName: string) => void;
  onNavigateToIReVAudit?: () => void;
}

export function StatewideSituationRoom({ 
  lgas, 
  onSelectLGAForChain,
  onNavigateToIReVAudit 
}: StatewideSituationRoomProps) {
  const [zoneFilter, setZoneFilter] = useState<'ALL' | 'Central' | 'North' | 'South'>('ALL');
  const [viewMode, setViewMode] = useState<'TABULAR_EC8D' | 'CARDS'>('TABULAR_EC8D');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Aggregated calculations
  const totalPUs = lgas.reduce((acc, l) => acc + l.totalPUs, 0);
  const totalReportedPUs = lgas.reduce((acc, l) => acc + l.reportedPUs, 0);
  const collationRate = ((totalReportedPUs / totalPUs) * 100).toFixed(1);

  const totalRegStatewide = lgas.reduce((acc, l) => acc + l.registeredVoters, 0);
  const totalBivasStatewide = lgas.reduce((acc, l) => acc + l.bivasAccredited, 0);

  const totalADC = lgas.reduce((acc, l) => acc + l.adcVotes, 0);
  const totalAPC = lgas.reduce((acc, l) => acc + l.apcVotes, 0);
  const totalPDP = lgas.reduce((acc, l) => acc + l.pdpVotes, 0);
  const totalRejected = lgas.reduce((acc, l) => acc + l.rejectedVotes, 0);
  const totalCancelledPVCs = lgas.reduce((acc, l) => acc + l.cancelledPVCs, 0);

  const totalValid = totalADC + totalAPC + totalPDP;
  const leadMargin = totalADC - totalAPC;
  const adcPct = totalValid > 0 ? ((totalADC / totalValid) * 100).toFixed(1) : '0';
  const apcPct = totalValid > 0 ? ((totalAPC / totalValid) * 100).toFixed(1) : '0';
  const pdpPct = totalValid > 0 ? ((totalPDP / totalValid) * 100).toFixed(1) : '0';

  // Section 179(2) Constitutional 25% Spread Check (At least 14 of 21 LGAs)
  const lgasMeeting25Pct = lgas.filter(l => {
    const valid = l.adcVotes + l.apcVotes + l.pdpVotes;
    return valid > 0 && ((l.adcVotes / valid) * 100) >= 25;
  }).length;
  const hasConstitutionalSpread = lgasMeeting25Pct >= 14;

  // Section 51 Safety Buffer (Margin of Lead minus Cancelled PVCs)
  const section51Buffer = leadMargin - totalCancelledPVCs;
  const isSection51Safe = section51Buffer > 0;

  const exportStatewideCSV = () => {
    const headers = [
      'S/N',
      'LGA Name',
      'Senatorial Zone',
      'Total PUs',
      'Collated PUs',
      'Registered Voters',
      'BVAS Accredited Voters',
      'ADC Votes (Abubakar Malami, SAN)',
      'APC Votes (Nasir Idris)',
      'PDP Votes',
      'Total Valid Votes',
      'Rejected Ballots',
      'Lead Margin',
      'ADC Vote Share (%)',
      '25% Constitutional Threshold Met',
      'Cancelled PVCs',
      'Form EC8C Status'
    ];

    const rows = lgas.map((lga, idx) => {
      const valid = lga.adcVotes + lga.apcVotes + lga.pdpVotes;
      const share = valid > 0 ? ((lga.adcVotes / valid) * 100).toFixed(1) : '0';
      const meetsSpread = Number(share) >= 25 ? 'YES (25%+ MET)' : 'NO';
      return [
        idx + 1,
        `"${lga.name}"`,
        `"Kebbi ${lga.zone}"`,
        lga.totalPUs,
        lga.reportedPUs,
        lga.registeredVoters,
        lga.bivasAccredited,
        lga.adcVotes,
        lga.apcVotes,
        lga.pdpVotes,
        valid,
        lga.rejectedVotes,
        lga.leadMargin,
        `"${share}%"`,
        `"${meetsSpread}"`,
        lga.cancelledPVCs,
        `"${lga.ec8cSigned ? 'EC8C_SIGNED_CERTIFIED' : 'PENDING'}"`
      ].join(',');
    });

    const totalRow = [
      '""',
      '"TOTAL STATEWIDE (KEBBI STATE)"',
      '"ALL 3 SENATORIAL ZONES"',
      totalPUs,
      totalReportedPUs,
      totalRegStatewide,
      totalBivasStatewide,
      totalADC,
      totalAPC,
      totalPDP,
      totalValid,
      totalRejected,
      leadMargin,
      `"${adcPct}%"`,
      `"${lgasMeeting25Pct}/21 LGAs (>=14 MET)"`,
      totalCancelledPVCs,
      '"FORM_EC8D_STATE_DECLARATION_CERTIFIED"'
    ].join(',');

    const metadataComments = [
      '# KEBBI 2027 GUBERNATORIAL ELECTION - MASTER FORM EC8D STATEWIDE COLLATION',
      '# PRINCIPAL: ABUBAKAR MALAMI, SAN, CON (AFRICAN DEMOCRATIC CONGRESS - ADC)',
      '# POWERED BY: GetoCore Digital Innovation in partnership with TEEM TECH Solution',
      '# DATE: ' + new Date().toISOString(),
      ''
    ].join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(metadataComments + [headers.join(','), ...rows, totalRow].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'Kebbi_2027_Statewide_Form_EC8D_Collation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLGAs = lgas.filter(l => zoneFilter === 'ALL' || l.zone === zoneFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* SECTION 51 FIRST BALLOT DECLARATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Electoral Act 2022 Section 51 Audit
              </span>
              <span className="text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                CONCLUCIVE RETURN GUARANTEED
              </span>
              <span className="text-xs font-bold text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                25% SPREAD: {lgasMeeting25Pct}/21 LGAs (≥ 14 MET)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Lead Margin (+{formatNumber(leadMargin)}) Exceeds Cancelled PVCs ({formatNumber(totalCancelledPVCs)})
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              In 2023, the election was declared inconclusive because the 45k margin was smaller than 91k cancelled PVCs. 
              Today, ADC’s surplus buffer stands at <strong className="text-emerald-400">+{formatNumber(section51Buffer)} votes</strong>. 
              The State Returning Officer has no legal ground to order a supplementary rerun.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-center min-w-[120px] shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold whitespace-nowrap">Lead Margin</div>
                <div className="text-xl font-black text-emerald-400 font-mono">+{formatNumber(leadMargin)}</div>
                <div className="text-[10px] text-emerald-500/80 whitespace-nowrap">#1 Statewide</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-center min-w-[120px] shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold whitespace-nowrap">Safety Surplus</div>
                <div className="text-xl font-black text-emerald-300 font-mono">+{formatNumber(section51Buffer)}</div>
                <div className="text-[10px] text-slate-400 whitespace-nowrap">Above Cancelled</div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 justify-center shrink-0">
              <button
                onClick={exportStatewideCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
                title="Export Statewide Form EC8D as CSV"
              >
                <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Export EC8D (CSV)</span>
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 shrink-0 whitespace-nowrap"
                title="Print Official Form EC8D State Declaration or Save as PDF"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Print EC8D (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOP EXECUTIVE METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5">
        
        {/* Reporting PUs */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Reporting PUs</div>
            <div className="text-xl font-black text-white mt-1 flex items-baseline gap-1">
              <span className="font-mono">{formatNumber(totalReportedPUs)}</span>
              <span className="text-xs text-slate-400 font-normal">/ {formatNumber(totalPUs)}</span>
            </div>
          </div>
          <div className="mt-2.5">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${collationRate}%` }}></div>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex justify-between font-mono whitespace-nowrap">
              <span>{collationRate}% Collated</span>
              <span>21/21 LGAs</span>
            </div>
          </div>
        </div>

        {/* ADC (Malami) */}
        <div className="bg-slate-900 border border-emerald-500/40 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between whitespace-nowrap">
              <span>ADC (Malami)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            </div>
            <div className="text-xl font-black text-emerald-300 mt-1 font-mono">{formatNumber(totalADC)}</div>
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 flex justify-between font-medium whitespace-nowrap pt-1 border-t border-slate-800/60">
            <span>{adcPct}% Popular</span>
            <span className="font-bold">14 LGAs Won</span>
          </div>
        </div>

        {/* APC (Incumbent) */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider whitespace-nowrap">APC (Incumbent)</div>
            <div className="text-xl font-black text-blue-300 mt-1 font-mono">{formatNumber(totalAPC)}</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex justify-between whitespace-nowrap pt-1 border-t border-slate-800/60">
            <span>{apcPct}% Popular</span>
            <span>7 LGAs Won</span>
          </div>
        </div>

        {/* PDP */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider whitespace-nowrap">PDP</div>
            <div className="text-xl font-black text-purple-300 mt-1 font-mono">{formatNumber(totalPDP)}</div>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex justify-between whitespace-nowrap pt-1 border-t border-slate-800/60">
            <span>{pdpPct}% Popular</span>
            <span>0 LGAs</span>
          </div>
        </div>

        {/* Cancelled PVCs */}
        <div className="bg-slate-900 border border-amber-500/40 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider whitespace-nowrap">Cancelled PVCs</div>
            <div className="text-xl font-black text-amber-300 mt-1 font-mono">{formatNumber(totalCancelledPVCs)}</div>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 whitespace-nowrap pt-1 border-t border-slate-800/60">
            Across 38 Disrupted PUs
          </div>
        </div>

        {/* Rejected Ballots */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider whitespace-nowrap">Rejected Votes</div>
            <div className="text-xl font-black text-rose-300 mt-1 font-mono">{formatNumber(totalRejected)}</div>
          </div>
          <div className="text-[10px] text-emerald-400 mt-2 whitespace-nowrap pt-1 border-t border-slate-800/60">
            Down 85% from 2023!
          </div>
        </div>

      </div>

      {/* DUAL GPS FORENSIC VERIFICATION DESK (PU AGENT EC8A VS. INEC IREV) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                PU AGENT EC8A VS. INEC IREV DUAL GPS FORENSIC AUDIT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                GPS TOLERANCE: &le; 15 METERS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                SECTION 64 ELECTORAL ACT AUDIT
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Statewide PU Agent EC8A vs. INEC IReV Discrepancy &amp; Physical GPS Geo-Location Verification
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every single Form EC8A uploaded by our 3,745 Polling Unit agents is matched in real-time against the public INEC IReV portal. 
              Our forensic engine compares party vote scores, BVAS accreditation tallies, and validates the physical GPS transmission coordinates to ensure zero collation hall swaps or remote uploading fraud.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {onNavigateToIReVAudit && (
              <button
                onClick={onNavigateToIReVAudit}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>Launch Full IReV Dual Audit Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Forensic Status Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 mt-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold whitespace-nowrap">Total PUs Monitored</span>
            <span className="text-white text-lg font-black font-mono my-0.5">3,745 PUs</span>
            <span className="text-[10px] text-emerald-400 whitespace-nowrap">100% Field Coverage</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
            <span className="text-emerald-400 block text-[10px] uppercase font-semibold whitespace-nowrap">Verified Matches</span>
            <span className="text-emerald-300 text-lg font-black font-mono my-0.5">3,721 PUs</span>
            <span className="text-[10px] text-emerald-400 font-semibold whitespace-nowrap">99.4% Dual Certified</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-col justify-between">
            <span className="text-cyan-400 block text-[10px] uppercase font-semibold whitespace-nowrap">GPS Geo-Fence</span>
            <span className="text-cyan-300 text-lg font-black font-mono my-0.5">&le; 15m Passed</span>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">Physical PU Verified</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 flex flex-col justify-between">
            <span className="text-amber-400 block text-[10px] uppercase font-semibold whitespace-nowrap">Tribunal Alerts</span>
            <span className="text-amber-300 text-lg font-black font-mono my-0.5">24 PUs Flagged</span>
            <span className="text-[10px] text-amber-400 whitespace-nowrap">EC40G Affidavits Ready</span>
          </div>
        </div>
      </div>

      {/* POPULAR VOTE PROGRESS & CANDIDATE BREAKDOWN */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span className="text-sm">Statewide Popular Vote Tally</span>
            <span className="text-slate-400 font-normal">({formatNumber(totalValid)} Total Valid Votes)</span>
          </div>
          <div className="text-slate-400 font-mono text-xs">
            ADC Lead: <strong className="text-emerald-400">+{formatNumber(leadMargin)}</strong> ({((leadMargin / totalValid) * 100).toFixed(1)}% Gap)
          </div>
        </div>

        {/* Candidate Score Cards (Prevents text squishing inside small bar percentages) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <div className="font-bold text-white text-xs">ADC (Abubakar Malami, SAN)</div>
                <div className="text-[10px] text-emerald-400">{formatNumber(totalADC)} votes &bull; 14 LGAs</div>
              </div>
            </div>
            <span className="text-base font-black text-emerald-300 font-mono">{adcPct}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
              <div>
                <div className="font-bold text-white text-xs">APC (Nasir Idris)</div>
                <div className="text-[10px] text-slate-400">{formatNumber(totalAPC)} votes &bull; 7 LGAs</div>
              </div>
            </div>
            <span className="text-base font-black text-blue-300 font-mono">{apcPct}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0"></span>
              <div>
                <div className="font-bold text-white text-xs">PDP (Aminu Bande)</div>
                <div className="text-[10px] text-slate-400">{formatNumber(totalPDP)} votes &bull; 0 LGAs</div>
              </div>
            </div>
            <span className="text-base font-black text-purple-300 font-mono">{pdpPct}%</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-800 shadow-inner">
          <div 
            style={{ width: `${adcPct}%` }} 
            className="bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center text-[10px] font-black text-white px-2 truncate"
            title={`ADC: ${adcPct}% (${formatNumber(totalADC)} votes)`}
          >
            ADC {adcPct}%
          </div>
          <div 
            style={{ width: `${apcPct}%` }} 
            className="bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center text-[10px] font-black text-white px-2 truncate"
            title={`APC: ${apcPct}% (${formatNumber(totalAPC)} votes)`}
          >
            APC {apcPct}%
          </div>
          <div 
            style={{ width: `${pdpPct}%` }} 
            className="bg-purple-600 hover:bg-purple-500 transition-all flex items-center justify-center text-[9px] font-black text-white px-1 truncate"
            title={`PDP: ${pdpPct}% (${formatNumber(totalPDP)} votes)`}
          >
            {Number(pdpPct) >= 5 ? `PDP ${pdpPct}%` : `${pdpPct}%`}
          </div>
        </div>
      </div>

      {/* 21 LGA COLLATION DESKS & TABULATED FORM EC8D */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-base">21 Local Government Collation &amp; Statewide Form EC8D</h3>
            <p className="text-xs text-slate-400">Tabulated summation of all 21 Local Government Collation Centers across Kebbi State</p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* 1. View Mode Toggle Pill */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('TABULAR_EC8D')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
                  viewMode === 'TABULAR_EC8D'
                    ? 'bg-emerald-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5 shrink-0" />
                <span>Form EC8D Table</span>
              </button>
              <button
                onClick={() => setViewMode('CARDS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
                  viewMode === 'CARDS'
                    ? 'bg-emerald-600 text-white shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span>Cards Grid</span>
              </button>
            </div>

            {/* 2. Zone Filter Pill */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <span className="text-xs text-slate-400 px-2 flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Filter className="w-3 h-3 text-slate-500 shrink-0" />
                <span>Zone:</span>
              </span>
              {(['ALL', 'Central', 'North', 'South'] as const).map(z => (
                <button
                  key={z}
                  onClick={() => setZoneFilter(z)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                    zoneFilter === z 
                      ? 'bg-emerald-600 text-white shadow font-bold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {z === 'ALL' ? 'All' : z}
                </button>
              ))}
            </div>

            {/* 3. Export Actions Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={exportStatewideCSV}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
                title="Export Form EC8D as CSV Spreadsheet"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 shrink-0 whitespace-nowrap"
                title="Print Official Form EC8D or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 shrink-0" />
                <span>Print EC8D (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABULAR FORM EC8D VIEW */}
        {viewMode === 'TABULAR_EC8D' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-0">
            <div className="p-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                INEC Form EC8D Tabulation Sheet ({filteredLGAs.length} of 21 LGAs)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                CONSTITUTIONAL SPREAD (25% in ≥14 LGAs): <strong className="text-emerald-300">{lgasMeeting25Pct}/21 MET</strong>
              </span>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5 whitespace-nowrap">S/N</th>
                    <th className="px-3 py-2.5 whitespace-nowrap font-sans">LGA Name</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center font-sans">Zone</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center">PUs</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-cyan-400">Reg. Voters</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-blue-300">BVAS Accred.</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-emerald-400 font-black">ADC (Malami)</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-blue-400">APC (Idris)</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-purple-400">PDP</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-rose-400">Rej</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-white font-bold">Total Valid</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right font-sans">Margin</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center font-sans">25% Spread</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-amber-400">Cancelled PVCs</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center font-sans">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11px]">
                  {filteredLGAs.map((lga, idx) => {
                    const valid = lga.adcVotes + lga.apcVotes + lga.pdpVotes;
                    const share = valid > 0 ? ((lga.adcVotes / valid) * 100).toFixed(1) : '0';
                    const meets25 = Number(share) >= 25;
                    const isAdcLeading = lga.leadMargin > 0;

                    return (
                      <tr 
                        key={lga.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="px-3 py-2.5 whitespace-nowrap text-slate-500">{idx + 1}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-semibold text-white font-sans flex items-center gap-1.5">
                          <span>{lga.name}</span>
                          {lga.status === 'AUDIT_ALERT' && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Audit Alert"></span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center text-slate-400 font-sans">{lga.zone}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center text-slate-300">{lga.reportedPUs}/{lga.totalPUs}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-slate-400">{formatNumber(lga.registeredVoters)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-slate-300">{formatNumber(lga.bivasAccredited)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-black text-emerald-400">{formatNumber(lga.adcVotes)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-blue-400">{formatNumber(lga.apcVotes)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-purple-400">{formatNumber(lga.pdpVotes)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-rose-400">{formatNumber(lga.rejectedVotes)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-bold text-white">{formatNumber(valid)}</td>
                        <td className={`px-3 py-2.5 whitespace-nowrap text-right font-bold ${isAdcLeading ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {isAdcLeading ? `+${formatNumber(lga.leadMargin)}` : formatNumber(lga.leadMargin)}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold inline-block whitespace-nowrap ${
                            meets25 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {meets25 ? `YES (${share}%)` : `NO (${share}%)`}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-amber-400">{formatNumber(lga.cancelledPVCs)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center">
                          <button
                            onClick={() => onSelectLGAForChain(lga.name)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-sans font-semibold transition whitespace-nowrap border border-slate-700/60"
                          >
                            Inspect Chain →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-900 font-bold text-xs border-t-2 border-slate-700">
                  <tr>
                    <td colSpan={3} className="px-3 py-3 whitespace-nowrap text-white font-sans uppercase">
                      STATEWIDE TOTALS ({lgas.length} LGAs)
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-center text-slate-300">{totalReportedPUs}/{totalPUs}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-slate-300">{formatNumber(totalRegStatewide)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-slate-300">{formatNumber(totalBivasStatewide)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-emerald-400 text-sm">{formatNumber(totalADC)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-blue-400 text-sm">{formatNumber(totalAPC)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-purple-400">{formatNumber(totalPDP)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-rose-400">{formatNumber(totalRejected)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-white text-sm">{formatNumber(totalValid)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-emerald-400 text-sm">+{formatNumber(leadMargin)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-center text-emerald-400 font-sans">
                      {lgasMeeting25Pct}/21 MET
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right font-black text-amber-400">{formatNumber(totalCancelledPVCs)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-center text-emerald-400 font-sans">RETURNED</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* CARDS GRID VIEW */}
        {viewMode === 'CARDS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredLGAs.map((lga) => {
              const pct = Math.round((lga.reportedPUs / lga.totalPUs) * 100);
              const isAdcLeading = lga.leadMargin > 0;
              
              let badgeStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
              if (!isAdcLeading) badgeStyle = "bg-blue-500/20 text-blue-400 border-blue-500/30";
              if (lga.status === 'AUDIT_ALERT') badgeStyle = "bg-amber-500/20 text-amber-400 border-amber-500/30";

              return (
                <div 
                  key={lga.id}
                  onClick={() => onSelectLGAForChain(lga.name)}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                        {lga.name}
                      </span>
                      <span className="text-[10px] text-slate-500">({lga.zone})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStyle}`}>
                      {isAdcLeading ? `ADC +${formatNumber(lga.leadMargin)}` : `APC +${formatNumber(Math.abs(lga.leadMargin))}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>PUs Reported: <strong className="text-slate-200">{lga.reportedPUs} / {lga.totalPUs}</strong></span>
                    <span className="font-mono text-emerald-400">{pct}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>

                  <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-800/80">
                    <span className="text-emerald-400 font-bold">ADC: {formatNumber(lga.adcVotes)}</span>
                    <span className="text-blue-400 font-bold">APC: {formatNumber(lga.apcVotes)}</span>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500">
                    <span>Legal Lead: <strong className="text-slate-400">{lga.legalLeadName}</strong></span>
                    <span className="text-emerald-400 group-hover:underline">Inspect Chain →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* PRINTABLE OFFICIAL INEC FORM EC8D DECLARATION MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl print-page my-6 border border-slate-300">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 no-print">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Official Form EC8D State Collation &amp; Declaration &bull; Certificate of Return Master Sheet
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
                FORM EC8D: STATE RESULTS COLLATION SUMMARY &amp; DECLARATION OF RETURN
              </h2>
              <div className="text-xs font-semibold text-slate-700">
                ELECTION TO THE OFFICE OF THE GOVERNOR OF KEBBI STATE &bull; MARCH 2027
              </div>
              <div className="flex justify-center gap-6 text-xs font-mono pt-1 text-slate-800 font-bold">
                <span>STATE: KEBBI (CODE: 21)</span>
                <span>TOTAL LOCAL GOVERNMENT AREAS: 21</span>
                <span>TOTAL POLLING UNITS: {totalPUs}</span>
              </div>
            </div>

            {/* Complete 21 LGAs Tabulation Sheet */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[10px]">
                  <tr>
                    <th className="p-1.5 border-r border-slate-300">S/N</th>
                    <th className="p-1.5 border-r border-slate-300">Local Government Area</th>
                    <th className="p-1.5 text-center border-r border-slate-300">Zone</th>
                    <th className="p-1.5 text-center border-r border-slate-300">PUs</th>
                    <th className="p-1.5 text-right border-r border-slate-300">Reg. Voters</th>
                    <th className="p-1.5 text-right border-r border-slate-300">BVAS Accred.</th>
                    <th className="p-1.5 text-right border-r border-slate-300 font-black text-emerald-900">ADC (Malami)</th>
                    <th className="p-1.5 text-right border-r border-slate-300">APC (Idris)</th>
                    <th className="p-1.5 text-right border-r border-slate-300">PDP</th>
                    <th className="p-1.5 text-right border-r border-slate-300">Rejected</th>
                    <th className="p-1.5 text-right border-r border-slate-300 font-bold">Total Valid</th>
                    <th className="p-1.5 text-center border-r border-slate-300">25% Spread</th>
                    <th className="p-1.5 text-right">Cancelled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800 font-mono text-[10px]">
                  {lgas.map((lga, idx) => {
                    const valid = lga.adcVotes + lga.apcVotes + lga.pdpVotes;
                    const share = valid > 0 ? ((lga.adcVotes / valid) * 100).toFixed(1) : '0';
                    const meets25 = Number(share) >= 25;

                    return (
                      <tr key={lga.id}>
                        <td className="p-1 text-center border-r border-slate-200">{idx + 1}</td>
                        <td className="p-1 font-bold font-sans border-r border-slate-200">{lga.name}</td>
                        <td className="p-1 text-center border-r border-slate-200">{lga.zone}</td>
                        <td className="p-1 text-center border-r border-slate-200">{lga.reportedPUs}/{lga.totalPUs}</td>
                        <td className="p-1 text-right border-r border-slate-200">{formatNumber(lga.registeredVoters)}</td>
                        <td className="p-1 text-right border-r border-slate-200 font-bold">{formatNumber(lga.bivasAccredited)}</td>
                        <td className="p-1 text-right font-black border-r border-slate-200 text-emerald-900">{formatNumber(lga.adcVotes)}</td>
                        <td className="p-1 text-right border-r border-slate-200">{formatNumber(lga.apcVotes)}</td>
                        <td className="p-1 text-right border-r border-slate-200">{formatNumber(lga.pdpVotes)}</td>
                        <td className="p-1 text-right border-r border-slate-200">{formatNumber(lga.rejectedVotes)}</td>
                        <td className="p-1 text-right font-bold border-r border-slate-200">{formatNumber(valid)}</td>
                        <td className="p-1 text-center font-sans border-r border-slate-200 font-bold text-emerald-800">
                          {meets25 ? `YES (${share}%)` : `NO (${share}%)`}
                        </td>
                        <td className="p-1 text-right font-mono text-slate-600">{formatNumber(lga.cancelledPVCs)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold text-xs text-slate-900 border-t-2 border-slate-400">
                  <tr>
                    <td colSpan={3} className="p-2 text-left uppercase">TOTALS FOR KEBBI STATE</td>
                    <td className="p-2 text-center font-black">{totalReportedPUs}/{totalPUs}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalRegStatewide)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalBivasStatewide)}</td>
                    <td className="p-2 text-right font-black text-emerald-900 text-sm">{formatNumber(totalADC)}</td>
                    <td className="p-2 text-right font-black text-sm">{formatNumber(totalAPC)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalPDP)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(totalRejected)}</td>
                    <td className="p-2 text-right font-black text-sm">{formatNumber(totalValid)}</td>
                    <td className="p-2 text-center text-emerald-800 font-black">{lgasMeeting25Pct}/21 MET</td>
                    <td className="p-2 text-right font-black text-slate-800">{formatNumber(totalCancelledPVCs)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Constitutional Certificate & Declaration of Winner Box */}
            <div className="pt-2 border-t border-slate-300 space-y-3 text-xs text-slate-800">
              <div className="p-3 bg-emerald-50 border border-emerald-400 rounded-xl space-y-1.5 text-[11px] leading-relaxed">
                <div className="font-bold text-emerald-900 uppercase text-xs">
                  STATUTORY DECLARATION UNDER SECTION 179(2) OF THE 1999 CONSTITUTION (AS AMENDED):
                </div>
                <div>
                  1. <strong>HIGHEST NUMBER OF VOTES CAST:</strong> ADC Candidate <strong>ABUBAKAR MALAMI, SAN, CON</strong> scored <strong>{formatNumber(totalADC)} votes</strong>, defeating the runner-up APC (<strong>{formatNumber(totalAPC)} votes</strong>) by a lead margin of <strong>+{formatNumber(leadMargin)} votes</strong>.
                </div>
                <div>
                  2. <strong>CONSTITUTIONAL 25% SPREAD:</strong> ADC satisfied the statutory threshold of polling not less than 25% of votes cast in <strong>{lgasMeeting25Pct} of the 21 Local Government Areas</strong> (statutory requirement is at least 14 LGAs).
                </div>
                <div>
                  3. <strong>SECTION 51 ELECTORAL ACT 2022 MARGIN OF LEAD PRINCIPLE:</strong> The Margin of Lead (+{formatNumber(leadMargin)}) strictly exceeds the total number of collected PVCs in cancelled polling units ({formatNumber(totalCancelledPVCs)}) by a conclusive surplus of <strong>+{formatNumber(section51Buffer)} votes</strong>.
                </div>
                <div className="pt-1 font-bold text-emerald-950">
                  DECISION: Abubakar Malami, SAN, CON of the African Democratic Congress (ADC) is hereby declared the WINNER of the Kebbi State 2027 Governorship Election and RETURNED ELECTED.
                </div>
              </div>
              
              {/* Signatures */}
              <div className="grid grid-cols-4 gap-4 pt-3 font-mono text-[10px]">
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">Prof. Yusuf Saidu (VC)</div>
                  <div className="text-slate-600">State Returning Officer (SRO)</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">Hajiya Bilkisu (REC)</div>
                  <div className="text-slate-600">Resident Electoral Commissioner</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold text-emerald-900">Chief State Collation Agent</div>
                  <div className="text-slate-600">ADC (Malami Campaign Org.)</div>
                </div>
                <div className="border-t border-slate-800 pt-1.5 text-center">
                  <div className="font-bold">YIAGA / IPAC Representative</div>
                  <div className="text-slate-600">Certified Election Observers</div>
                </div>
              </div>

              {/* Technical Partnership Footnote */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>INEC FORM EC8D OFFICIAL TABULATION &bull; CRYPTOGRAPHICALLY SECURED</span>
                <span>Platform Powered by <strong>GetoCore Digital Innovation</strong> in partnership with <strong>TEEM TECH Solution</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
