'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  Download, 
  Printer, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  PieChart, 
  TrendingUp, 
  Layers, 
  Smartphone, 
  Building2, 
  Scale, 
  Users, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function FinancialImplicationsDesk() {
  const [activeTranche, setActiveTranche] = useState<number>(1);
  const [selectedCostCenter, setSelectedCostCenter] = useState<string>('ALL');

  const costCenters = [
    {
      id: 'CC1',
      title: '1. Polling Unit Agent Network (3,745 PUs + 375 Runners)',
      amount: 121725000,
      share: '37.0%',
      icon: Smartphone,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      items: [
        { name: 'Accredited PU Agent Election Day Honorarium', qty: 3745, unit: 20000, total: 74900000, note: 'Full-day duty (06:30 AM to RAC escort)' },
        { name: 'Pre-Election Training & BVAS Simulation Stipend', qty: 3745, unit: 5000, total: 18725000, note: 'Mandatory mock drill on PWA reporting' },
        { name: 'Field Mobile Data & Airtime Recharge (5GB + Voice)', qty: 3745, unit: 3000, total: 11235000, note: 'Continuous telemetry & photo uploads' },
        { name: 'Election Day Meal / Hydration Subsidy', qty: 3745, unit: 2000, total: 7490000, note: 'Prevents abandoning voting booth' },
        { name: 'Roving Backup Agents & Motorbike Runners', qty: 375, unit: 25000, total: 9375000, note: '1 runner per 10 PUs with fuel allowance' }
      ]
    },
    {
      id: 'CC2',
      title: '2. Ward (RA) Supervisors & RAC Collation (225 Wards)',
      amount: 23625000,
      share: '7.2%',
      icon: Building2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      items: [
        { name: 'Ward Collation Supervisor Honorarium', qty: 225, unit: 60000, total: 13500000, note: 'Form EC8B collation & reconciliation' },
        { name: 'Ward Supervisor Legal & Protocol Workshop', qty: 225, unit: 15000, total: 3375000, note: 'Training on Electoral Act Sec 60/64' },
        { name: 'Multi-Network SIMs & High-Capacity Data', qty: 225, unit: 10000, total: 2250000, note: 'MTN & Airtel redundancy at RAC' },
        { name: 'Rapid Motorbike Security & Result Escort Team', qty: 225, unit: 20000, total: 4500000, note: 'Protects duplicate EC8A transit to LGA' }
      ]
    },
    {
      id: 'CC3',
      title: '3. LGA Collation & Legal Shield Teams (21 LGAs)',
      amount: 14175000,
      share: '4.3%',
      icon: Scale,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      items: [
        { name: 'LGA Lead Supervisory Counsel', qty: 21, unit: 350000, total: 7350000, note: 'Legal defense lead with on-site protest power' },
        { name: 'LGA Collation Observers & Clerks', qty: 21, unit: 75000, total: 1575000, note: 'Verifies declarations against Situation Room' },
        { name: 'LGA Emergency Transport & 4x4 Vehicle Charter', qty: 21, unit: 100000, total: 2100000, note: 'Fast mobility for LGA legal counsel' },
        { name: 'LGA Security & Protocol Contingent Allowance', qty: 21, unit: 150000, total: 3150000, note: 'Protects legal team & authentic returns' }
      ]
    },
    {
      id: 'CC4',
      title: '4. Central Situation Room HQ (Birnin Kebbi)',
      amount: 37600000,
      share: '11.4%',
      icon: Layers,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      items: [
        { name: '20 Analyst Workstations (Core i7 + Dual 27" Displays)', qty: 20, unit: 600000, total: 12000000, note: 'Dedicated 21-LGA analyst terminals' },
        { name: 'Dual Redundant Starlink Satellite & Fiber Lease', qty: 2, unit: 1750000, total: 3500000, note: 'Immune to terrestrial network disruption' },
        { name: 'Ultra-HD Command Video Wall (6x 65" 4K Displays)', qty: 1, unit: 4800000, total: 4800000, note: 'Live heatmap, margin tally & alerts' },
        { name: '15kVA Solar Inverter + 20kVA Generator & 96hr Fuel', qty: 1, unit: 6500000, total: 6500000, note: '100% uninterrupted power guarantee' },
        { name: 'Situation Room Command Personnel (48hrs Shift)', qty: 20, unit: 450000, total: 9000000, note: 'Directors, Senior Lawyers & Data Engineers' },
        { name: 'Catering, Hydration & Medical Protocol (48hrs)', qty: 1, unit: 1800000, total: 1800000, note: '24/7 staff sustenance inside perimeter' }
      ]
    },
    {
      id: 'CC5',
      title: '5. Software Platform & Telemetry (GetoCore × TEEM TECH)',
      amount: 50000000,
      share: '15.2%',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      items: [
        { name: 'Custom Situation Room & PVT Engine (`malami-adc-monitor`)', qty: 1, unit: 28500000, total: 28500000, note: 'Full-stack PWA, Sec 51 check & AI copilot' },
        { name: 'High-Availability Cloud Cluster, WAF & S3 Encrypted Storage', qty: 1, unit: 8200000, total: 8200000, note: 'Handles 3,745 concurrent photo uploads' },
        { name: 'Encrypted SMS / USSD Fallback Gateway (500,000 Credits)', qty: 1, unit: 4500000, total: 4500000, note: 'Transfers data from zero-internet PUs' },
        { name: 'Toll-Free Emergency SOS PBX SIP Trunk (`0800-ADC-MALAMI`)', qty: 1, unit: 2800000, total: 2800000, note: 'Voice escalation hotline for field agents' },
        { name: '24/7 On-Site Senior DevOps & Security Engineers (5 Pers.)', qty: 1, unit: 6000000, total: 6000000, note: 'On-site technical defense in Birnin Kebbi' }
      ]
    },
    {
      id: 'CC6',
      title: '6. Field Kits, QR Accreditation & Power Banks',
      amount: 44082500,
      share: '13.4%',
      icon: Users,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      items: [
        { name: 'Laminated High-Security Photo ID Badges with Encrypted QR', qty: 4200, unit: 1200, total: 5040000, note: 'Prevents imposter agents in collation halls' },
        { name: 'ADC 🤝 Official Brand Kits (Caps, Lapel Pins, Lanyards)', qty: 4200, unit: 2000, total: 8400000, note: 'Distinct visual identity before INEC' },
        { name: 'Tamper-Evident Waterproof Pouches & Indelible Markers', qty: 4200, unit: 1500, total: 6300000, note: 'Protects duplicate EC8A from rain/damage' },
        { name: 'Certified 10,000mAh Backup Smartphone Power Banks', qty: 3745, unit: 6500, total: 24342500, note: 'Guarantees phone battery all day and night' }
      ]
    },
    {
      id: 'CC7',
      title: '7. Legal Shield, CTC Procurement & Contingency Reserve',
      amount: 37792500,
      share: '11.5%',
      icon: Scale,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      items: [
        { name: 'INEC Certified True Copies (CTC) Statutory Acquisition Fund', qty: 1, unit: 12500000, total: 12500000, note: 'Requisition of 3,745 EC8As & BVAS logs' },
        { name: 'Notary Public & Deposition Commissioner Fund (21 LGAs)', qty: 1, unit: 4200000, total: 4200000, note: 'Rapid execution of Form EC40G affidavits' },
        { name: 'Blockchain-Anchored Digital Evidence Archival Vault', qty: 1, unit: 6000000, total: 6000000, note: 'Section 84 Evidence Act compliance' },
        { name: 'Rapid Tactical & Operational Contingency Reserve (~5%)', qty: 1, unit: 15092500, total: 15092500, note: 'Emergency transport, rerun legal defense' }
      ]
    }
  ];

  const totalBudget = costCenters.reduce((sum, c) => sum + c.amount, 0);

  const tranches = [
    {
      id: 1,
      title: 'Tranche 1: Mobilization & Tech Provisioning',
      pct: '40%',
      amount: 131600000,
      timing: 'T - 60 Days (Upon Contract Execution)',
      deliverables: [
        'Cloud cluster & database deployment on AWS/GCP',
        'Procurement of 3,745 certified backup power banks',
        'Production of 4,200 laminated QR-code photo ID badges',
        'Physical lease and outfitting of Birnin Kebbi Situation Room (Starlink, workstations, screens, inverters)'
      ]
    },
    {
      id: 2,
      title: 'Tranche 2: Field Training & Statewide Mock Simulation',
      pct: '35%',
      amount: 115150000,
      timing: 'T - 21 Days (Platform Readiness Certification)',
      deliverables: [
        'Zonal training workshops for 3,745 PU agents + 225 supervisors',
        'Direct electronic disbursement of training stipends & 5GB data',
        'Full statewide mock simulation test across all 21 LGAs',
        'Integration of Khadimiyya Foundation ward structures'
      ]
    },
    {
      id: 3,
      title: 'Tranche 3: D-Day Operations & Legal Shield Vault',
      pct: '25%',
      amount: 82250000,
      timing: 'T - 5 Days (Election Week Kick-Off)',
      deliverables: [
        'Direct disbursement of Election Day agent honoraria',
        'Deployment of 225 Ward motorbike escorts & 21 LGA legal retainers',
        '48-Hour intensive Situation Room live command',
        'Immediate INEC CTC certified document acquisition & evidence vaulting'
      ]
    }
  ];

  const filteredCenters = selectedCostCenter === 'ALL' 
    ? costCenters 
    : costCenters.filter(c => c.id === selectedCostCenter);

  const exportCSV = () => {
    const rows: string[] = [
      '# KEBBI 2027 GUBERNATORIAL ELECTION - MASTER FINANCIAL IMPLICATIONS & BUDGET',
      '# PRINCIPAL: ABUBAKAR MALAMI, SAN, CON (AFRICAN DEMOCRATIC CONGRESS - ADC)',
      '# POWERED BY: GetoCore Digital Innovation in partnership with TEEM TECH Solution',
      '# IT TECHNICAL OFFICER: Fatima Sulaiman Umar (Hotlines: 08035533332 / 09035328748)',
      '# DATE: ' + new Date().toISOString(),
      '',
      'Cost Center,Item Description,Quantity,Unit Cost (NGN),Subtotal (NGN),Operational Justification'
    ];

    costCenters.forEach(cc => {
      cc.items.forEach(item => {
        rows.push(`"${cc.title}","${item.name}",${item.qty},${item.unit},${item.total},"${item.note}"`);
      });
    });

    rows.push('');
    rows.push(`"GRAND TOTAL STATEWIDE BUDGET","Complete 21 LGAs, 225 Wards, 3,745 PUs",,,"${totalBudget}","Complete Turnkey Situation Room & Mandate Defense"`);

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kebbi_2027_Malami_ADC_Master_Budget.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                EXECUTIVE FINANCIAL TENDER
              </span>
              <span className="text-xs text-slate-400 font-mono">REF: ADC/KBB/2027/FIN-001</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Financial Implications &amp; Operational Budget</span>
              <span className="text-amber-300">₦329,000,000</span>
            </h2>
            <p className="text-xs text-slate-400">
              Prepared for <strong>Abubakar Malami, SAN, CON</strong> &bull; Complete turnkey budget for 3,745 Polling Units, 225 Wards &amp; 21 LGAs.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={() => window.open('/kebbi_2027_financial_implications_budget.html', '_blank')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition shrink-0 whitespace-nowrap"
              title="Open print-optimized master budget sheet or print to PDF"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Print Official Budget (PDF)</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Export complete budget breakdown as CSV"
            >
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Export CSV</span>
            </button>

            <a
              href="/Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
              download="Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx"
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
              title="Download editable PowerPoint (.pptx) file"
            >
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Download Slides (.pptx)</span>
            </a>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Turnkey Budget</div>
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">₦329.0M</div>
            <div className="text-[10px] text-slate-500">All 7 Cost Centers</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Cost Per Polling Unit</div>
            <div className="text-lg sm:text-xl font-black text-amber-300 font-mono">₦87,850</div>
            <div className="text-[10px] text-slate-500">Complete Mandate Security</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Field Personnel Count</div>
            <div className="text-lg sm:text-xl font-black text-white font-mono">4,366</div>
            <div className="text-[10px] text-slate-500">Agents, Supers &amp; Counsel</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Phased Milestone Tranches</div>
            <div className="text-lg sm:text-xl font-black text-blue-400 font-mono">3 Tranches</div>
            <div className="text-[10px] text-slate-500">40% &bull; 35% &bull; 25%</div>
          </div>
        </div>
      </div>

      {/* PHASED TRANCHE DRAWDOWN TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-400" />
              <span>Phased Milestone Disbursement Framework (3 Tranches)</span>
            </h3>
            <p className="text-xs text-slate-400">Zero lump-sum risk. Funds released strictly upon verified milestone completion.</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {tranches.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTranche(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTranche === t.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tranche {t.id} ({t.pct})
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE TRANCHE CARD */}
        {(() => {
          const t = tranches.find(item => item.id === activeTranche)!;
          return (
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{t.timing}</span>
                  <h4 className="text-lg font-bold text-white">{t.title}</h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-300 font-mono">₦{formatNumber(t.amount)}</div>
                  <div className="text-xs text-slate-400">{t.pct} of Grand Total</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-bold text-slate-300">Milestone Verification Deliverables:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {t.deliverables.map((d, i) => (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* COST CENTER DETAIL BREAKDOWN */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Itemized Cost Center Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400">Filter by operational department or view full consolidated schedule.</p>
          </div>

          <select
            value={selectedCostCenter}
            onChange={(e) => setSelectedCostCenter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl p-2 font-semibold"
          >
            <option value="ALL">All Cost Centers (7 Departments)</option>
            {costCenters.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredCenters.map(cc => {
            const Icon = cc.icon;
            return (
              <div key={cc.id} className="space-y-3">
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${cc.bgColor} ${cc.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{cc.title}</h4>
                      <span className="text-[10px] text-slate-400">{cc.share} of Total Budget</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-amber-300 font-mono">₦{formatNumber(cc.amount)}</div>
                  </div>
                </div>

                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-3 py-2.5 whitespace-nowrap">Item Description</th>
                        <th className="px-3 py-2.5 text-center whitespace-nowrap">Qty</th>
                        <th className="px-3 py-2.5 text-right whitespace-nowrap min-w-[120px]">Unit Rate (₦)</th>
                        <th className="px-3 py-2.5 text-right whitespace-nowrap min-w-[130px] text-emerald-400">Subtotal (₦)</th>
                        <th className="px-3 py-2.5 whitespace-nowrap font-sans">Operational Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono text-[11px]">
                      {cc.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition">
                          <td className="px-3 py-2.5 font-sans font-medium text-slate-200 whitespace-nowrap sm:whitespace-normal">{item.name}</td>
                          <td className="px-3 py-2.5 text-center text-slate-400 whitespace-nowrap">{item.qty}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{formatNumber(item.unit)}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-emerald-400 whitespace-nowrap">{formatNumber(item.total)}</td>
                          <td className="px-3 py-2.5 font-sans text-slate-400 text-[10px] min-w-[200px]">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TECHNICAL PARTNERSHIP & SIGNATORY BLOCK */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">OFFICIAL SYSTEM ARCHITECTS</span>
            <h4 className="text-base font-bold text-white">GetoCore Digital Innovation × TEEM TECH Solution</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              Engineering Commission
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="text-slate-400 text-[11px] font-semibold">LEAD IT TECHNICAL OFFICER</div>
            <div className="text-sm font-bold text-emerald-400">Fatima Sulaiman Umar</div>
            <p className="text-[11px] text-slate-400">
              Responsible for Statewide Cloud Infrastructure, PWA Offline Encryption &amp; Field Telemetry Integrity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="text-slate-400 text-[11px] font-semibold">TECHNICAL SUPPORT &amp; HOTLINES</div>
            <div className="text-sm font-bold text-amber-300 font-mono flex items-center gap-2">
              <a href="tel:08035533332" className="hover:underline">08035533332</a>
              <span className="text-slate-600">/</span>
              <a href="tel:09035328748" className="hover:underline">09035328748</a>
            </div>
            <p className="text-[11px] text-slate-400">
              24/7 Situation Room Support &bull; Direct technical liaison for SAN Abubakar Malami Campaign Directorate.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
