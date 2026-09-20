import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Eye, 
  Search, 
  Filter, 
  Download, 
  FileCheck, 
  Smartphone, 
  Radio, 
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  AlertOctagon,
  Scale,
  Hash
} from 'lucide-react';
import { INITIAL_PVT_IREV_RECORDS } from '@/lib/kebbiElectoralData';
import { PVTIReVAuditRecord } from '@/types/election';

export function IReVPVTAuditDesk() {
  const [records, setRecords] = useState<PVTIReVAuditRecord[]>(INITIAL_PVT_IREV_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState<PVTIReVAuditRecord>(INITIAL_PVT_IREV_RECORDS[1]); // Default to Bagudo with variance
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VARIANCE' | 'ACCREDITATION' | 'TIME_LAG' | 'MATCHED' | 'FLAGGED'>('ALL');
  const [lgaFilter, setLgaFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Statistics
  const totalAudited = records.length;
  const matchedCount = records.filter(r => r.status === 'MATCHED').length;
  const varianceCount = records.filter(r => r.status === 'VOTE_VARIANCE').length;
  const accreditationCount = records.filter(r => r.status === 'ACCREDITATION_MISMATCH').length;
  const timeLagCount = records.filter(r => r.status === 'TIME_LAG_ALERT').length;
  const flaggedCount = records.filter(r => r.flaggedForTribunal).length;

  const filteredRecords = records.filter(r => {
    if (statusFilter === 'VARIANCE' && r.status !== 'VOTE_VARIANCE') return false;
    if (statusFilter === 'ACCREDITATION' && r.status !== 'ACCREDITATION_MISMATCH') return false;
    if (statusFilter === 'TIME_LAG' && r.status !== 'TIME_LAG_ALERT') return false;
    if (statusFilter === 'MATCHED' && r.status !== 'MATCHED') return false;
    if (statusFilter === 'FLAGGED' && !r.flaggedForTribunal) return false;
    if (lgaFilter !== 'ALL' && r.lga.toLowerCase() !== lgaFilter.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return r.puCode.toLowerCase().includes(q) || r.puName.toLowerCase().includes(q) || r.ward.toLowerCase().includes(q) || r.lga.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFlagTribunal = (id: string) => {
    setRecords(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, flaggedForTribunal: !r.flaggedForTribunal };
      }
      return r;
    }));
    if (selectedRecord.id === id) {
      setSelectedRecord(prev => ({ ...prev, flaggedForTribunal: !prev.flaggedForTribunal }));
    }
  };

  const exportTribunalDossier = () => {
    const lines = [
      '\uFEFFABUBAKAR MALAMI SAN ELECTION PETITION TRIBUNAL EVIDENCE DOSSIER (2027)',
      'PARALLEL VOTER TABULATION (PVT) VS INEC IREV DUAL FORENSIC AUDIT',
      'CANDIDATE: ABUBAKAR MALAMI, SAN, CON (AFRICAN DEMOCRATIC CONGRESS - ADC)',
      'CONSTITUENCY: KEBBI STATE GUBERNATORIAL ELECTION',
      `GENERATED ON: ${new Date().toLocaleString()}`,
      'DIRECTORATE: ADC LEGAL SHIELD & ICT FORENSIC CELL',
      '',
      'PU Code,Polling Unit Name,Ward,LGA,Audit Status,Agent ADC,IReV ADC,ADC Variance,Agent APC,IReV APC,APC Variance,Agent BVAS,IReV Total Cast,Agent Time,IReV Time,Time Lag (Mins),Agent GPS,IReV GPS,Distance Delta (Meters),Flagged For Tribunal,Forensic Legal Notes'
    ];

    records.forEach(r => {
      lines.push(
        `"${r.puCode}","${r.puName}","${r.ward}","${r.lga}","${r.status}",${r.agentSubmission.adc},${r.irevSubmission.adc},${r.voteVariance.adcDiff},${r.agentSubmission.apc},${r.irevSubmission.apc},${r.voteVariance.apcDiff},${r.agentSubmission.accreditedVoters},${r.irevSubmission.totalVotesCast},"${r.agentSubmission.timestamp}","${r.irevSubmission.uploadTimestamp}",${r.timeLagMinutes},"${r.agentSubmission.gpsCoords}","${r.irevSubmission.gpsCoords}",${r.distanceDiscrepancyMeters},${r.flaggedForTribunal ? 'YES' : 'NO'},"${r.tribunalEvidenceNotes || 'N/A'}"`
      );
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Malami_ADC_Kebbi_PVT_IReV_Tribunal_Dossier_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ── HEADER KPI & AUDIT SUMMARY BANNER ── */}
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>PVT VS INEC IREV FORENSIC AUDIT DESK</span>
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                <span>Section 51 &amp; Tribunal Evidence Engine</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              INEC IReV Portal vs Certified Agent Form EC8A Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Direct side-by-side reconciliation comparing official INEC IReV uploaded sheets against certified Form EC8A duplicate photographs snapped on-site by ADC agents with <strong>live GPS coordinates</strong> and <strong>exact submission timestamps</strong>.
            </p>
          </div>

          <button
            onClick={exportTribunalDossier}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 transition shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Export Legal Tribunal Dossier (CSV)</span>
          </button>
        </div>

        {/* Audit Metrics KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <span className="text-slate-400 text-[10px] font-bold uppercase block whitespace-nowrap">Total Units Audited</span>
            <span className="text-xl font-black text-white font-mono mt-0.5 block">{totalAudited} PUs</span>
            <span className="text-[10px] text-emerald-400 whitespace-nowrap">21 LGAs Kebbi Scope</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-900/40 flex flex-col justify-between">
            <span className="text-emerald-400 text-[10px] font-bold uppercase block whitespace-nowrap">Exact Matches ✓</span>
            <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">{matchedCount} PUs</span>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">{((matchedCount / totalAudited) * 100).toFixed(0)}% Integrity</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-rose-900/40 flex flex-col justify-between">
            <span className="text-rose-400 text-[10px] font-bold uppercase block whitespace-nowrap">Vote Discrepancies ⚠️</span>
            <span className="text-xl font-black text-rose-400 font-mono mt-0.5 block">{varianceCount} PUs</span>
            <span className="text-[10px] text-rose-400 font-bold whitespace-nowrap">Altered on IReV</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-amber-900/40 flex flex-col justify-between">
            <span className="text-amber-400 text-[10px] font-bold uppercase block whitespace-nowrap">Over-Voting / BVAS</span>
            <span className="text-xl font-black text-amber-400 font-mono mt-0.5 block">{accreditationCount} PUs</span>
            <span className="text-[10px] text-amber-300 font-semibold whitespace-nowrap">Sec 51 Violations</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-purple-900/40 flex flex-col justify-between">
            <span className="text-purple-400 text-[10px] font-bold uppercase block whitespace-nowrap">Flagged for Tribunal</span>
            <span className="text-xl font-black text-purple-400 font-mono mt-0.5 block">{flaggedCount} PUs</span>
            <span className="text-[10px] text-purple-300 font-bold whitespace-nowrap">Court Ready</span>
          </div>
        </div>
      </div>

      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Filter Buttons */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap gap-1">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'ALL' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white')}
            >
              All Records ({records.length})
            </button>
            <button
              onClick={() => setStatusFilter('VARIANCE')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'VARIANCE' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white')}
            >
              Vote Variances ({varianceCount})
            </button>
            <button
              onClick={() => setStatusFilter('ACCREDITATION')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'ACCREDITATION' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white')}
            >
              Over-Voting ({accreditationCount})
            </button>
            <button
              onClick={() => setStatusFilter('TIME_LAG')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'TIME_LAG' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white')}
            >
              Time Lag ({timeLagCount})
            </button>
            <button
              onClick={() => setStatusFilter('MATCHED')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'MATCHED' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white')}
            >
              Matched ({matchedCount})
            </button>
            <button
              onClick={() => setStatusFilter('FLAGGED')}
              className={'px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 ' + (statusFilter === 'FLAGGED' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white')}
            >
              Flagged Tribunal ({flaggedCount})
            </button>
          </div>

          {/* LGA Filter Dropdown */}
          <select
            value={lgaFilter}
            onChange={(e) => setLgaFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-semibold focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All 21 LGAs</option>
            <option value="Birnin Kebbi">Birnin Kebbi</option>
            <option value="Bagudo">Bagudo</option>
            <option value="Kalgo">Kalgo</option>
            <option value="Argungu">Argungu</option>
            <option value="Zuru">Zuru</option>
            <option value="Aliero">Aliero</option>
            <option value="Jega">Jega</option>
            <option value="Yauri">Yauri</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search PU Code, Name, Ward..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* ── DUAL COLUMN SIDE-BY-SIDE AUDIT WORKSPACE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Polling Units (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>AUDIT QUEUE ({filteredRecords.length})</span>
            <span>STATUS</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredRecords.map(r => {
              const isSelected = selectedRecord.id === r.id;
              const hasVariance = r.status === 'VOTE_VARIANCE';
              const hasOvervoting = r.status === 'ACCREDITATION_MISMATCH';
              const hasTimeLag = r.status === 'TIME_LAG_ALERT';

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRecord(r)}
                  className={'p-3.5 rounded-2xl border transition-all cursor-pointer ' + (
                    isSelected 
                      ? 'bg-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50' 
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono font-bold text-xs text-white">{r.puCode}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">• {r.ward} ({r.lga})</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{r.puName}</h4>
                    </div>

                    {/* Status Badge */}
                    <span className={'px-2 py-0.5 rounded text-[9px] font-black uppercase shrink-0 ' + (
                      r.status === 'MATCHED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : hasVariance
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : hasOvervoting
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    )}>
                      {r.status === 'MATCHED' ? 'MATCHED ✓' : r.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">ADC: {r.agentSubmission.adc}</span>
                      <span className="text-slate-500">vs</span>
                      <span className="text-blue-400">APC: {r.agentSubmission.apc}</span>
                    </div>

                    {r.voteVariance.adcDiff !== 0 && (
                      <span className="text-rose-400 font-bold">
                        IReV ADC: {r.irevSubmission.adc} ({r.voteVariance.adcDiff > 0 ? '+' : ''}{r.voteVariance.adcDiff})
                      </span>
                    )}

                    {r.flaggedForTribunal && (
                      <span className="text-amber-400 font-bold flex items-center gap-0.5 text-[10px]">
                        ⚖️ TRIBUNAL FLAGGED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Forensic Side-by-Side Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-5 shadow-2xl">
          
          {/* Inspector Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-black text-sm text-emerald-400">{selectedRecord.puCode}</span>
                <span className="text-xs text-slate-400 font-semibold">
                  {selectedRecord.ward} &bull; {selectedRecord.lga} LGA
                </span>
              </div>
              <h3 className="text-base font-black text-white">{selectedRecord.puName}</h3>
            </div>

            <button
              onClick={() => toggleFlagTribunal(selectedRecord.id)}
              className={'px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0 ' + (
                selectedRecord.flaggedForTribunal
                  ? 'bg-amber-500 text-slate-950 font-black shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              <Scale className="w-4 h-4" />
              <span>{selectedRecord.flaggedForTribunal ? '✓ Flagged for Tribunal Petition' : 'Flag for Election Tribunal'}</span>
            </button>
          </div>

          {/* Variance / Tampering Forensic Alert Banner */}
          {selectedRecord.status !== 'MATCHED' && (
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500 text-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>FORENSIC TAMPERING &amp; DISCREPANCY DETECTED!</span>
              </div>
              <p className="text-xs leading-relaxed">
                {selectedRecord.tribunalEvidenceNotes}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] font-mono text-rose-300">
                <span>Time Lag: <strong>{selectedRecord.timeLagMinutes} minutes</strong></span>
                <span>Geo-Distance Discrepancy: <strong>{(selectedRecord.distanceDiscrepancyMeters / 1000).toFixed(1)} km</strong></span>
              </div>
            </div>
          )}

          {/* Side-by-Side Comparison Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Column 1: Agent Certified Form EC8A (Field Truth) */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>ADC AGENT EC8A (FIELD TRUTH)</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  CERTIFIED
                </span>
              </div>

              {/* Photo Scanned Preview */}
              <div className="h-36 rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src={selectedRecord.agentSubmission.photoUrl}
                  alt="Agent EC8A"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[9px] text-emerald-400 font-mono">
                  📍 {selectedRecord.agentSubmission.gpsCoords} ({selectedRecord.agentSubmission.proximityMeters}m)
                </div>
              </div>

              {/* Scores Ledger */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-500/30">
                  <span className="font-bold text-emerald-300">ADC (Malami):</span>
                  <span className="font-black text-emerald-300 text-sm">{selectedRecord.agentSubmission.adc}</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">APC (Nasir Idris):</span>
                  <span className="font-bold text-white">{selectedRecord.agentSubmission.apc}</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">PDP:</span>
                  <span className="font-bold text-white">{selectedRecord.agentSubmission.pdp}</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">BVAS Accredited:</span>
                  <span className="font-bold text-cyan-400">{selectedRecord.agentSubmission.accreditedVoters}</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">Total Votes Cast:</span>
                  <span className="font-bold text-white">{selectedRecord.agentSubmission.totalVotesCast}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800">
                <div>Agent: <strong className="text-slate-200">{selectedRecord.agentSubmission.agentName}</strong></div>
                <div>Signed &amp; Transmitted: <strong className="text-slate-200">{selectedRecord.agentSubmission.timestamp}</strong></div>
              </div>
            </div>

            {/* Column 2: INEC IReV Uploaded Sheet */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-black text-blue-400 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-blue-400" />
                  <span>INEC IREV PORTAL SHEET</span>
                </span>
                <span className="text-[10px] text-blue-300 font-mono bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  SCRAPED
                </span>
              </div>

              {/* IReV Sheet Preview */}
              <div className="h-36 rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src={selectedRecord.irevSubmission.sheetUrl}
                  alt="INEC IReV Sheet"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[9px] text-blue-300 font-mono">
                  📍 {selectedRecord.irevSubmission.gpsCoords}
                </div>
              </div>

              {/* Scores Ledger */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className={'flex justify-between p-1.5 rounded-lg border ' + (
                  selectedRecord.voteVariance.adcDiff !== 0
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                )}>
                  <span className="font-bold">ADC (Malami):</span>
                  <span className="font-black text-sm">
                    {selectedRecord.irevSubmission.adc}
                    {selectedRecord.voteVariance.adcDiff !== 0 && (
                      <span className="text-[10px] ml-1 font-normal text-rose-400">
                        ({selectedRecord.voteVariance.adcDiff})
                      </span>
                    )}
                  </span>
                </div>
                <div className={'flex justify-between p-1.5 rounded-lg border ' + (
                  selectedRecord.voteVariance.apcDiff !== 0
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                )}>
                  <span className="font-bold">APC (Nasir Idris):</span>
                  <span className="font-black text-sm">
                    {selectedRecord.irevSubmission.apc}
                    {selectedRecord.voteVariance.apcDiff !== 0 && (
                      <span className="text-[10px] ml-1 font-normal text-amber-400">
                        (+{selectedRecord.voteVariance.apcDiff})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">PDP:</span>
                  <span className="font-bold text-white">{selectedRecord.irevSubmission.pdp}</span>
                </div>
                <div className="flex justify-between bg-slate-900 p-1.5 rounded-lg">
                  <span className="text-slate-400">BVAS Device:</span>
                  <span className="font-bold text-cyan-400">{selectedRecord.irevSubmission.bvasDeviceId}</span>
                </div>
                <div className={'flex justify-between p-1.5 rounded-lg ' + (
                  selectedRecord.irevSubmission.totalVotesCast > selectedRecord.agentSubmission.accreditedVoters
                    ? 'bg-rose-950 text-rose-300 font-bold border border-rose-600'
                    : 'bg-slate-900 text-slate-300'
                )}>
                  <span>Total Cast on Sheet:</span>
                  <span className="font-bold">{selectedRecord.irevSubmission.totalVotesCast}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800">
                <div>Upload Timestamp: <strong className="text-slate-200">{selectedRecord.irevSubmission.uploadTimestamp}</strong></div>
                <div>Transmission Lag: <strong className="text-amber-400">{selectedRecord.timeLagMinutes} minutes delay</strong></div>
              </div>
            </div>

          </div>

          {/* Quick Legal Actions for Selected Unit */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>INEC Electoral Act 2022 Compliance Status:</span>
              <strong className={selectedRecord.status === 'MATCHED' ? 'text-emerald-400' : 'text-rose-400'}>
                {selectedRecord.status === 'MATCHED' ? 'Fully Certified' : 'Challenged / Contested'}
              </strong>
            </div>

            <button
              onClick={() => alert('Affidavit of Material Variance generated for ' + selectedRecord.puCode + ' (' + selectedRecord.ward + '). Ready for filing with Electoral Petition Tribunal.')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print Form EC8A Variance Notice</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
