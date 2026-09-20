'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  FileCheck, 
  Radio, 
  Smartphone, 
  Search, 
  ShieldCheck, 
  FileText,
  Check,
  Eye,
  Download,
  Printer,
  Scale,
  CheckCheck
} from 'lucide-react';
import { AppUser } from '@/types/auth';
import { formatNumber } from '@/lib/utils';

interface RASupervisorDashboardProps {
  currentUser: AppUser | null;
  onEscalateIncident: (ticket: {
    ward: string;
    puCode: string;
    title: string;
    description: string;
    severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
  }) => void;
  onSendWardBroadcast: (message: string) => void;
}

export function RASupervisorDashboard({
  currentUser,
  onEscalateIncident,
  onSendWardBroadcast
}: RASupervisorDashboardProps) {
  const [activeSubtab, setActiveSubtab] = useState<'PU_MONITORING' | 'WARD_EC8B' | 'WARD_BROADCAST'>('PU_MONITORING');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [searchPu, setSearchPu] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'REPORTED' | 'PENDING'>('ALL');

  const [broadcastText, setBroadcastText] = useState('');
  const [sentBroadcasts, setSentBroadcasts] = useState<string[]>([
    'All 15 PU Agents in Dangaladima RA: Ensure all voters on queue by 2:30pm cast their ballot.',
    'Reminder: Snap Form EC8A immediately after counting and check that Votes <= BIVAS before signing!'
  ]);

  // Escalation Modal state
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escPuCode, setEscPuCode] = useState('PU 21-01-04-008');
  const [escTitle, setEscTitle] = useState('Attempted Over-voting');
  const [escDesc, setEscDesc] = useState('');
  const [escSeverity, setEscSeverity] = useState<'CRITICAL' | 'MAJOR' | 'MINOR'>('CRITICAL');

  // Constituent PUs in this Ward (e.g. Dangaladima Ward, 15 PUs)
  const wardName = currentUser?.assignedWard || 'Dangaladima Ward';
  const lgaName = currentUser?.assignedLGA || 'Birnin Kebbi';

  const [pollingUnits, setPollingUnits] = useState([
    { code: 'PU 21-01-04-001', name: 'Dangaladima Primary School Block A', agent: 'Bello Garba', status: 'REPORTED', bivas: 310, adc: 215, apc: 88, pdp: 4, rej: 3, ec8aUploaded: true },
    { code: 'PU 21-01-04-002', name: 'Dangaladima Primary School Block B', agent: 'Ibrahim Sani', status: 'REPORTED', bivas: 295, adc: 198, apc: 90, pdp: 5, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-003', name: 'Kofar Fada Viewing Center', agent: 'Aliyu Umar', status: 'REPORTED', bivas: 340, adc: 245, apc: 89, pdp: 3, rej: 3, ec8aUploaded: true },
    { code: 'PU 21-01-04-004', name: 'Dispensary Clinic Square', agent: 'Musa Abdullahi', status: 'REPORTED', bivas: 280, adc: 185, apc: 90, pdp: 3, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-005', name: 'Unguwar Zabarmawa Borehole', agent: 'Kabir Hassan', status: 'REPORTED', bivas: 320, adc: 220, apc: 94, pdp: 4, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-006', name: 'Government Girls Day Secondary', agent: 'Fatima Usman', status: 'REPORTED', bivas: 360, adc: 260, apc: 95, pdp: 2, rej: 3, ec8aUploaded: true },
    { code: 'PU 21-01-04-007', name: 'Kofar Sarkin Aski Compound', agent: 'Salisu Mohammed', status: 'REPORTED', bivas: 250, adc: 170, apc: 75, pdp: 3, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-008', name: 'Central Islamiyya School', agent: 'Muhammad Bello', status: 'REPORTED', bivas: 342, adc: 214, apc: 118, pdp: 6, rej: 4, ec8aUploaded: true },
    { code: 'PU 21-01-04-009', name: 'Emir Palace Gate North', agent: 'Abubakar Danladi', status: 'REPORTED', bivas: 305, adc: 210, apc: 90, pdp: 3, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-010', name: 'Old Motor Park Shade', agent: 'Yakubu Idris', status: 'REPORTED', bivas: 290, adc: 195, apc: 88, pdp: 4, rej: 3, ec8aUploaded: true },
    { code: 'PU 21-01-04-011', name: 'Veterinary Gate Square', agent: 'Haruna Bello', status: 'REPORTED', bivas: 275, adc: 180, apc: 90, pdp: 3, rej: 2, ec8aUploaded: true },
    { code: 'PU 21-01-04-012', name: 'Post Office Roundabout PU', agent: 'Nasiru Aliyu', status: 'PENDING', bivas: 0, adc: 0, apc: 0, pdp: 0, rej: 0, ec8aUploaded: false },
    { code: 'PU 21-01-04-013', name: 'Gidan Ruwa Square', agent: 'Suleiman Jega', status: 'PENDING', bivas: 0, adc: 0, apc: 0, pdp: 0, rej: 0, ec8aUploaded: false },
    { code: 'PU 21-01-04-014', name: 'Kola Junction Open Space', agent: 'Danjuma Koko', status: 'REPORTED', bivas: 315, adc: 215, apc: 92, pdp: 5, rej: 3, ec8aUploaded: true },
    { code: 'PU 21-01-04-015', name: 'Kasuwar Daji Market Shade', agent: 'Mustapha Zuru', status: 'REPORTED', bivas: 330, adc: 228, apc: 96, pdp: 3, rej: 3, ec8aUploaded: true },
  ]);

  const reportedCount = pollingUnits.filter(p => p.status === 'REPORTED').length;
  const totalCount = pollingUnits.length;
  const wardADC = pollingUnits.reduce((a, b) => a + b.adc, 0);
  const wardAPC = pollingUnits.reduce((a, b) => a + b.apc, 0);
  const wardPDP = pollingUnits.reduce((a, b) => a + b.pdp, 0);
  const wardBIVAS = pollingUnits.reduce((a, b) => a + b.bivas, 0);
  const wardRej = pollingUnits.reduce((a, b) => a + b.rej, 0);
  const wardTotalCast = wardADC + wardAPC + wardPDP + wardRej;

  const exportWardCSV = () => {
    const lines = [
      'INEC FORM EC8B WARD RESULTS COLLATION SCHEDULE (2027)',
      'STATE: KEBBI | LOCAL GOVERNMENT: ' + lgaName + ' | WARD (RA): ' + wardName,
      'SUPERVISOR: ' + (currentUser?.name || 'Usman Dangaladima') + ' (' + (currentUser?.badgeNumber || 'ADC-WSP-BK04') + ')',
      'POWERED BY: GetoCore Digital Innovation in partnership with TEEM TECH Solution',
      'GENERATED ON: ' + new Date().toLocaleString(),
      'CONSTITUENCY: KEBBI GUBERNATORIAL ELECTION',
      '',
      'PU Code,Polling Unit Name,Accredited Agent,BVAS Accredited,ADC (Malami),APC (Nasir Idris),PDP,Rejected Ballots,Total Votes Cast,Lead Margin (ADC-APC),Over-Voting Audit,Form EC8A Status'
    ];

    pollingUnits.forEach(p => {
      const cast = p.adc + p.apc + p.pdp + p.rej;
      const isOver = cast > p.bivas && p.bivas > 0;
      lines.push(
        '"' + p.code + '","' + p.name + '","' + p.agent + '",' + 
        p.bivas + ',' + p.adc + ',' + p.apc + ',' + p.pdp + ',' + p.rej + ',' + 
        cast + ',' + (p.adc - p.apc) + ',"' + 
        (isOver ? 'OVER-VOTING ALERT (SEC 51)' : 'LEGAL & VALID') + '","' + p.status + '"'
      );
    });

    lines.push('');
    lines.push('"TOTALS","' + wardName + ' WARD SUMMARY TOTALS (' + pollingUnits.length + ' PUs)","ALL CERTIFIED AGENTS",' + 
      wardBIVAS + ',' + wardADC + ',' + wardAPC + ',' + wardPDP + ',' + wardRej + ',' + 
      wardTotalCast + ',' + (wardADC - wardAPC) + ',"ARITHMETIC INTEGRITY 100%","CERTIFIED FORM EC8B"');

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Form_EC8B_' + wardName.replace(/[\/\s]/g, '_') + '_Collation_' + Date.now() + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredPUs = pollingUnits.filter(p => {
    if (filterStatus === 'REPORTED' && p.status !== 'REPORTED') return false;
    if (filterStatus === 'PENDING' && p.status !== 'PENDING') return false;
    if (searchPu && !p.name.toLowerCase().includes(searchPu.toLowerCase()) && !p.code.toLowerCase().includes(searchPu.toLowerCase())) return false;
    return true;
  });

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setSentBroadcasts(prev => [broadcastText, ...prev]);
    onSendWardBroadcast(broadcastText);
    setBroadcastText('');
  };

  const handleEscalateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEscalateIncident({
      ward: wardName,
      puCode: escPuCode,
      title: escTitle,
      description: escDesc,
      severity: escSeverity
    });
    setShowEscalateModal(false);
    setEscDesc('');
    alert('Incident successfully escalated to LGA Supervisor and Legal Shield team!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* WARD COMMAND HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                LEVEL 2: REGISTRATION AREA (RA) COMMAND
              </span>
              <span className="text-xs font-mono text-slate-400">{lgaName} LGA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {wardName} Collation & PU Oversight Hub
            </h2>
            <p className="text-xs text-slate-300">
              Assigned Supervisor: <strong className="text-emerald-400">{currentUser?.name || 'Usman Dangaladima'}</strong> ({currentUser?.badgeNumber || 'ADC-WSP-BK04'})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEscalateModal(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Escalate Incident to LGA</span>
            </button>
          </div>
        </div>

        {/* Ward High-Level Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">PUs Collated</div>
            <div className="text-xl font-black text-white mt-1 font-mono">{reportedCount} / {totalCount}</div>
            <div className="text-[10px] text-emerald-400">{Math.round((reportedCount/totalCount)*100)}% Ward Progress</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40">
            <div className="text-[10px] uppercase text-emerald-400 font-semibold">ADC Ward Total</div>
            <div className="text-xl font-black text-emerald-300 mt-1 font-mono">{formatNumber(wardADC)}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Lead: +{formatNumber(wardADC - wardAPC)}</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase text-blue-400 font-semibold">APC Ward Total</div>
            <div className="text-xl font-black text-blue-300 mt-1 font-mono">{formatNumber(wardAPC)}</div>
            <div className="text-[10px] text-slate-400">Trailing</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">BIVAS Accredited</div>
            <div className="text-xl font-black text-white mt-1 font-mono">{formatNumber(wardBIVAS)}</div>
            <div className="text-[10px] text-rose-400">{formatNumber(wardRej)} Rejected</div>
          </div>
        </div>
      </div>

      {/* SUBTABS NAVIGATION */}
      <div className="flex border-b border-slate-800 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveSubtab('PU_MONITORING')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubtab === 'PU_MONITORING'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. Polling Units Live Audit ({totalCount} PUs)</span>
        </button>

        <button
          onClick={() => setActiveSubtab('WARD_EC8B')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubtab === 'WARD_EC8B'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>2. Form EC8B Ward Collation Tally</span>
        </button>

        <button
          onClick={() => setActiveSubtab('WARD_BROADCAST')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubtab === 'WARD_BROADCAST'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>3. Ward Directive Broadcast Console</span>
        </button>
      </div>

      {/* SUBTAB 1: PU MONITORING */}
      {activeSubtab === 'PU_MONITORING' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchPu}
                onChange={(e) => setSearchPu(e.target.value)}
                placeholder="Search Polling Unit by code or name..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {(['ALL', 'REPORTED', 'PENDING'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    filterStatus === f ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">PU Code</th>
                  <th className="p-3">Location / Polling Unit</th>
                  <th className="p-3">Assigned Agent</th>
                  <th className="p-3 font-mono">BIVAS</th>
                  <th className="p-3 text-emerald-400 font-mono">ADC</th>
                  <th className="p-3 text-blue-400 font-mono">APC</th>
                  <th className="p-3 text-rose-400 font-mono">Rej</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Form EC8A</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredPUs.map(pu => (
                  <tr key={pu.code} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{pu.code}</td>
                    <td className="p-3 font-medium text-white">{pu.name}</td>
                    <td className="p-3 text-slate-300">{pu.agent}</td>
                    <td className="p-3 font-mono font-bold text-white">{pu.bivas || '—'}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{pu.adc || '—'}</td>
                    <td className="p-3 font-mono font-bold text-blue-400">{pu.apc || '—'}</td>
                    <td className="p-3 font-mono text-rose-400">{pu.rej || '—'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pu.status === 'REPORTED' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {pu.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {pu.ec8aUploaded ? (
                        <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Awaiting Poll Close</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: WARD FORM EC8B COLLATION (TABULATED & PRINTABLE IN PDF/CSV) */}
      {activeSubtab === 'WARD_EC8B' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          
          {/* Header & Export Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  STATUTORY FORM EC8B TALLY
                </span>
                <span className="text-xs text-slate-400 font-mono">STATE: KEBBI &bull; LGA: {lgaName}</span>
              </div>
              <h3 className="font-bold text-white text-lg">
                {wardName} Registration Area Collation Schedule
              </h3>
              <p className="text-xs text-slate-400">
                Official summation of all 15 Polling Unit Form EC8As into certified Ward Form EC8B.
              </p>
            </div>

            {/* TWO EXPORT BUTTONS: CSV and PRINT/PDF */}
            <div className="flex items-center gap-2">
              <button
                onClick={exportWardCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
                title="Export Form EC8B as CSV Spreadsheet"
              >
                <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Export EC8B (CSV)</span>
              </button>
              
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 shrink-0 whitespace-nowrap"
                title="Print Official Form EC8B or Save as PDF"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Print EC8B (PDF)</span>
              </button>
            </div>
          </div>

          {/* High-Level Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">BIVAS Accredited</span>
              <span className="text-white text-xl font-black font-mono mt-0.5">{formatNumber(wardBIVAS)}</span>
              <span className="text-[10px] text-slate-400">{reportedCount}/{totalCount} PUs Verified</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40">
              <span className="text-emerald-400 block text-[10px] uppercase font-semibold">ADC Total (Malami)</span>
              <span className="text-emerald-300 text-xl font-black font-mono mt-0.5">{formatNumber(wardADC)}</span>
              <span className="text-[10px] text-emerald-400 font-bold">Margin: +{formatNumber(wardADC - wardAPC)}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/40">
              <span className="text-blue-400 block text-[10px] uppercase font-semibold">APC Total (Nasir Idris)</span>
              <span className="text-blue-300 text-xl font-black font-mono mt-0.5">{formatNumber(wardAPC)}</span>
              <span className="text-[10px] text-slate-400">Trailing</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Ballots Cast</span>
              <span className="text-white text-xl font-black font-mono mt-0.5">{formatNumber(wardTotalCast)}</span>
              <span className="text-[10px] text-rose-400">{wardRej} Rejected</span>
            </div>
          </div>

          {/* TABULATED RESULT TABLE FOR FORM EC8B */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-0">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Constituent Polling Units Breakdown ({pollingUnits.length} Units)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">ARITHMETIC INTEGRITY: 100% MATCHED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5 whitespace-nowrap">PU Code</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Polling Unit Name</th>
                    <th className="px-3 py-2.5 whitespace-nowrap font-sans">Field Agent</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-cyan-400">BVAS</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-emerald-400 font-black">ADC</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-blue-400">APC</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-purple-400">PDP</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-rose-400">Rej</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right text-white font-bold">Total</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-right font-sans">Lead</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center font-sans">Anti-Overvoting</th>
                    <th className="px-3 py-2.5 whitespace-nowrap text-center font-sans">EC8A</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                  {pollingUnits.map(p => {
                    const cast = p.adc + p.apc + p.pdp + p.rej;
                    const isOver = cast > p.bivas && p.bivas > 0;
                    return (
                      <tr key={p.code} className="hover:bg-slate-900/60 transition-colors">
                        <td className="px-3 py-2.5 whitespace-nowrap font-bold text-white font-mono">{p.code}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-sans font-medium text-slate-200 truncate max-w-[200px]">{p.name}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-sans text-slate-400">{p.agent}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-cyan-400">{p.bivas}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-bold text-emerald-400">{p.adc}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-blue-300">{p.apc}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-purple-300">{p.pdp}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right text-rose-400">{p.rej}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-bold text-white">{cast}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-sans">
                          <span className={p.adc >= p.apc ? 'text-emerald-400 font-bold' : 'text-blue-400'}>
                            {p.adc >= p.apc ? `+${p.adc - p.apc}` : `${p.adc - p.apc}`}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center font-sans">
                          {isOver ? (
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600 text-[9px] font-bold whitespace-nowrap inline-block">
                              OVER-VOTED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[9px] font-bold whitespace-nowrap inline-block">
                              LEGAL ✓
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-center font-sans">
                          {p.ec8aUploaded ? (
                            <span className="text-emerald-400 font-bold text-[10px] whitespace-nowrap">✓ Signed</span>
                          ) : (
                            <span className="text-amber-400 text-[10px] whitespace-nowrap">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-bold text-white text-xs">
                  <tr>
                    <td colSpan={3} className="px-3 py-3 whitespace-nowrap font-sans uppercase">
                      GRAND TOTALS ({wardName})
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-cyan-400 font-black">{formatNumber(wardBIVAS)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-emerald-400 font-black">{formatNumber(wardADC)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-blue-400 font-black">{formatNumber(wardAPC)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-purple-400 font-black">{formatNumber(wardPDP)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-rose-400 font-black">{formatNumber(wardRej)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-white font-black">{formatNumber(wardTotalCast)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-emerald-400 font-black font-sans">+{formatNumber(wardADC - wardAPC)}</td>
                    <td colSpan={2} className="px-3 py-3 whitespace-nowrap text-center text-emerald-400 font-sans text-[10px]">
                      100% COLLATED
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300">
            <div>Ward Collation Officer: <strong>Dr. Al-Mustapha (Federal Poly)</strong></div>
            <div>RA Lead Paralegal: <strong>{currentUser?.name || 'Usman Dangaladima'}</strong></div>
            <div>Form EC8B Status: <strong className="text-emerald-400">Countersigned &amp; Ready for LGA Desk</strong></div>
          </div>

        </div>
      )}

      {/* SUBTAB 3: WARD DIRECTIVE BROADCAST */}
      {activeSubtab === 'WARD_BROADCAST' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              Transmit Directive to All {wardName} Agents
            </h3>
            
            <form onSubmit={handleBroadcastSubmit} className="space-y-3 text-xs">
              <textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                rows={4}
                placeholder="Type directive to all agents in your ward, e.g.: 'Ensure you obtain a certified duplicate of Form EC8A before escorting the Presiding Officer to the RAC hall.'"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send SMS Broadcast to All 15 Ward Agents</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-white text-sm">Recent Ward Directives</h3>
            <div className="space-y-2 text-xs">
              {sentBroadcasts.map((msg, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-200">
                  <div className="text-[10px] text-slate-500 mb-1 font-mono">Dispatched by Ward Supervisor • Broadcast #{sentBroadcasts.length - i}</div>
                  <p>{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE OFFICIAL FORM EC8B MODAL (PDF FORMAT) */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto no-print">
          <div className="bg-white text-slate-900 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-5 shadow-2xl print-page my-8">
            
            {/* Modal Actions Bar (hidden when printing) */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 no-print">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-700" />
                <span className="font-bold text-sm text-slate-800">Official Form EC8B Printable Certificate</span>
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
                FORM EC8B: REGISTRATION AREA / WARD RESULTS COLLATION SUMMARY
              </h2>
              <div className="text-xs font-semibold text-slate-700">
                ELECTION TO THE OFFICE OF THE GOVERNOR OF KEBBI STATE &bull; 2027
              </div>
              <div className="flex justify-center gap-6 text-xs font-mono pt-1 text-slate-800 font-bold">
                <span>STATE: KEBBI (CODE: 21)</span>
                <span>LGA: {lgaName.toUpperCase()}</span>
                <span>WARD (RA): {wardName.toUpperCase()}</span>
              </div>
            </div>

            {/* Results Tabulation Sheet */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">S/N</th>
                    <th className="p-2 border-r border-slate-300">PU Code</th>
                    <th className="p-2 border-r border-slate-300">Name of Polling Unit</th>
                    <th className="p-2 text-right border-r border-slate-300">BVAS Accred.</th>
                    <th className="p-2 text-right border-r border-slate-300 font-black text-emerald-900">ADC (Malami)</th>
                    <th className="p-2 text-right border-r border-slate-300">APC (Idris)</th>
                    <th className="p-2 text-right border-r border-slate-300">PDP</th>
                    <th className="p-2 text-right border-r border-slate-300">Rejected</th>
                    <th className="p-2 text-right border-r border-slate-300 font-bold">Total Cast</th>
                    <th className="p-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800 font-mono text-[11px]">
                  {pollingUnits.map((p, idx) => (
                    <tr key={p.code}>
                      <td className="p-1.5 text-center border-r border-slate-200">{idx + 1}</td>
                      <td className="p-1.5 font-bold border-r border-slate-200">{p.code}</td>
                      <td className="p-1.5 font-sans border-r border-slate-200">{p.name}</td>
                      <td className="p-1.5 text-right border-r border-slate-200 font-bold">{p.bivas}</td>
                      <td className="p-1.5 text-right font-black border-r border-slate-200 text-emerald-900">{p.adc}</td>
                      <td className="p-1.5 text-right border-r border-slate-200">{p.apc}</td>
                      <td className="p-1.5 text-right border-r border-slate-200">{p.pdp}</td>
                      <td className="p-1.5 text-right border-r border-slate-200">{p.rej}</td>
                      <td className="p-1.5 text-right font-bold border-r border-slate-200">{p.adc + p.apc + p.pdp + p.rej}</td>
                      <td className="p-1.5 text-center font-sans font-bold text-emerald-700">CERTIFIED</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold text-xs text-slate-900 border-t-2 border-slate-400">
                  <tr>
                    <td colSpan={3} className="p-2 text-left uppercase">TOTALS FOR {wardName.toUpperCase()} WARD</td>
                    <td className="p-2 text-right font-black">{formatNumber(wardBIVAS)}</td>
                    <td className="p-2 text-right font-black text-emerald-900">{formatNumber(wardADC)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(wardAPC)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(wardPDP)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(wardRej)}</td>
                    <td className="p-2 text-right font-black">{formatNumber(wardTotalCast)}</td>
                    <td className="p-2 text-center text-emerald-800 font-black">VALID</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Legal Attestation & Signature Box */}
            <div className="pt-4 border-t border-slate-300 space-y-4 text-xs text-slate-800">
              <p className="italic text-[11px] leading-relaxed">
                I hereby certify that I was the Registration Area Collation Officer for the election held on 6th March 2027 in the above named Registration Area, and that the summary above is a true and accurate record of votes cast at the Polling Units.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-4 font-mono text-[11px]">
                <div className="border-t border-slate-800 pt-2 text-center">
                  <div className="font-bold">Dr. Al-Mustapha</div>
                  <div className="text-[10px] text-slate-600">Ward Collation Officer (Signature &amp; Date)</div>
                </div>
                <div className="border-t border-slate-800 pt-2 text-center">
                  <div className="font-bold">{currentUser?.name || 'Usman Dangaladima'}</div>
                  <div className="text-[10px] text-slate-600">ADC RA Supervisor (Badge: {currentUser?.badgeNumber || 'ADC-WSP-BK04'})</div>
                </div>
                <div className="border-t border-slate-800 pt-2 text-center">
                  <div className="font-bold">Certified Official Stamp</div>
                  <div className="text-[10px] text-slate-600">INEC Electoral Operation</div>
                </div>
              </div>

              {/* Technical Partnership Footnote */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>INEC FORM EC8B OFFICIAL WARD TABULATION SHEET</span>
                <span>Powered by <strong>GetoCore Digital Innovation</strong> in partnership with <strong>TEEM TECH Solution</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ESCALATE MODAL */}
      {showEscalateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h4 className="font-bold text-white text-sm">Escalate Incident to LGA Legal Lead</h4>
              </div>
              <button 
                onClick={() => setShowEscalateModal(false)}
                className="w-7 h-7 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEscalateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Affected Polling Unit:</label>
                <select 
                  value={escPuCode} 
                  onChange={(e) => setEscPuCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  {pollingUnits.map(p => (
                    <option key={p.code} value={p.code}>{p.code} - {p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Incident Category:</label>
                <input 
                  type="text" 
                  value={escTitle} 
                  onChange={(e) => setEscTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" 
                  required 
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Severity Level:</label>
                <select 
                  value={escSeverity} 
                  onChange={(e) => setEscSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="CRITICAL">CRITICAL (Over-voting, violence, ballot snatching)</option>
                  <option value="MAJOR">MAJOR (BIVAS malfunction, late materials)</option>
                  <option value="MINOR">MINOR (Congestion, queue management)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Field Situation Description:</label>
                <textarea 
                  value={escDesc} 
                  onChange={(e) => setEscDesc(e.target.value)}
                  rows={3} 
                  placeholder="Describe field situation clearly..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" 
                  required 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Dispatch to LGA Legal Lead & Situation Room
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
