'use client';

import React, { useState, useEffect } from 'react';
import { AppUser, UserRole } from '@/types/auth';
import { 
  Activity, 
  Layers, 
  AlertTriangle, 
  Radio, 
  FileCheck2, 
  Smartphone, 
  Presentation, 
  LogOut, 
  Play, 
  Clock,
  Building2,
  Scale,
  Landmark,
  UserCheck,
  ShieldCheck,
  Download,
  DollarSign,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { InstallAppModal } from '@/components/pwa/InstallAppModal';

export type ActiveTab = 
  | 'SITUATION_ROOM'
  | 'LGA_SUPERVISOR'
  | 'RA_SUPERVISOR'
  | 'PU_AGENT'
  | 'AGENT_ACCREDITATION'
  | 'CHAIN_OF_CUSTODY'
  | 'INCIDENT_DESK'
  | 'COMMS_HUB'
  | 'FORENSICS'
  | 'IREV_PVT_AUDIT'
  | 'PITCH_DECK'
  | 'FINANCIAL_BUDGET'
  | 'STRATEGIC_INNOVATIONS';

interface NavbarProps {
  currentUser: AppUser | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  onLogout: () => void;
  activeIncidentCount: number;
}

export function getAllowedTabsForRole(role?: UserRole): ActiveTab[] {
  if (!role) return ['PU_AGENT'];
  switch (role) {
    case 'SITUATION_ROOM':
      // State Coordinator & SAN Malami have master oversight of everything
      return [
        'SITUATION_ROOM', 
        'LGA_SUPERVISOR', 
        'RA_SUPERVISOR', 
        'PU_AGENT', 
        'AGENT_ACCREDITATION',
        'CHAIN_OF_CUSTODY', 
        'INCIDENT_DESK', 
        'COMMS_HUB', 
        'FORENSICS', 
        'IREV_PVT_AUDIT', 
        'PITCH_DECK',
        'FINANCIAL_BUDGET',
        'STRATEGIC_INNOVATIONS'
      ];
    case 'LGA_SUPERVISOR':
      // Strictly scoped to LGA Collation Desk
      return ['LGA_SUPERVISOR'];
    case 'RA_SUPERVISOR':
      // Strictly scoped to Ward (RA) Collation Desk & constituent PUs
      return ['RA_SUPERVISOR'];
    case 'PU_AGENT':
      // Strictly scoped to Polling Unit Agent page
      return ['PU_AGENT'];
    default:
      return ['PU_AGENT'];
  }
}

export function Navbar({
  currentUser,
  activeTab,
  setActiveTab,
  isSimulating,
  setIsSimulating,
  onLogout,
  activeIncidentCount
}: NavbarProps) {
  const [time, setTime] = useState<string>('');
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB') + ' WAT');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const allowedTabs = getAllowedTabsForRole(currentUser?.role);

  const navItems = [
    { id: 'SITUATION_ROOM', label: '1. State Situation Room', icon: Landmark },
    { id: 'LGA_SUPERVISOR', label: '2. LGA Collation Desk', icon: Scale },
    { id: 'RA_SUPERVISOR', label: '3. Ward (RA) Collation', icon: Building2 },
    { id: 'PU_AGENT', label: '4. PU Agent PWA', icon: Smartphone },
    { id: 'AGENT_ACCREDITATION', label: '5. Security & Accreditation', icon: KeyRound },
    { id: 'CHAIN_OF_CUSTODY', label: '6. Results Chain Audit', icon: Layers },
    { 
      id: 'INCIDENT_DESK', 
      label: '7. Incident & SOS', 
      icon: AlertTriangle,
      badge: activeIncidentCount > 0 ? `${activeIncidentCount} Active` : undefined 
    },
    { id: 'COMMS_HUB', label: '8. Comms & Fallback', icon: Radio },
    { id: 'FORENSICS', label: '9. EC8A Forensic Audit', icon: FileCheck2 },
    { id: 'IREV_PVT_AUDIT', label: '10. PVT vs IReV Audit', icon: ShieldCheck },
    { id: 'PITCH_DECK', label: '11. Malami Pitch Deck', icon: Presentation },
    { id: 'FINANCIAL_BUDGET', label: '12. Financial Budget', icon: DollarSign },
    { id: 'STRATEGIC_INNOVATIONS', label: '13. Vision 2027 Innovations', icon: Sparkles },
  ].filter(item => allowedTabs.includes(item.id as ActiveTab));

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand with Official SAN Malami Photo Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => setShowInstallModal(true)}
            className="relative cursor-pointer group shrink-0"
            title="Official SAN Malami App Logo - Click to Install / Download App"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md shadow-emerald-500/20 bg-slate-950 transition-transform group-hover:scale-105">
              <img 
                src="/malami_logo.png" 
                alt="Abubakar Malami SAN CON App Logo" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[7px] font-black text-slate-950">✓</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                <span>MALAMI 2027</span>
                <span className="text-amber-300">&bull; ADC 🤝</span>
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">Situation Room • Official Command</span>
            </div>
            <h1 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
              Abubakar Malami (SAN) Situation Room
            </h1>
          </div>
        </div>

        {/* Right Tools: Tech Partners, Download App, Clock, Simulation, User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Tech Partners Accreditation Badge */}
          <div 
            className="hidden xl:flex items-center space-x-1.5 text-[10px] text-slate-400 bg-slate-950/90 px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-sm shrink-0 cursor-help" 
            title="Official Platform by the Technical Team | Powered by GetoCore Digital Innovation & TEEM TECH Solution (Kaduna's #1 IT Companies with Election Ideas) | IT Technical Officer: Fatima Sulaiman Umar (08035533332 / 09035328748)"
          >
            <span className="text-emerald-400 font-semibold">Official Platform</span>
            <span className="text-slate-600 font-bold">&bull;</span>
            <span className="text-slate-500">Powered by</span>
            <span className="font-bold text-emerald-400">GetoCore</span>
            <span className="text-slate-600 font-bold">×</span>
            <span className="font-bold text-amber-300">TEEM TECH</span>
            <span className="text-[9px] text-slate-500 hidden 2xl:inline">(Kaduna #1 IT)</span>
          </div>

          {/* Download App Button with SAN Malami Logo */}
          <button
            onClick={() => setShowInstallModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 border border-emerald-400/40 transition-all shrink-0 whitespace-nowrap"
            title="Download App with SAN Malami Photo Logo for Easy Identification"
          >
            <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-300 shrink-0 bg-slate-900">
              <img src="/icon-192.png" alt="App Logo" className="w-full h-full object-cover object-top" />
            </div>
            <span className="hidden sm:inline">Download App</span>
          </button>

          {/* Clock */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{time || '18:45:00 WAT'}</span>
          </div>

          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all shrink-0 whitespace-nowrap ${
              isSimulating 
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="hidden sm:inline">Live Feed</span>
                <span className="sm:hidden">Live</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Resume</span>
              </>
            )}
          </button>

          {/* User Profile Badge */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-xl shrink-0 whitespace-nowrap">
              <div className="text-right">
                <div className="text-[9px] text-slate-400 font-medium uppercase">{currentUser.role.replace(/_/g, ' ')}</div>
                <div className="text-xs font-bold text-amber-300 truncate max-w-[130px]">{currentUser.name}</div>
              </div>
            </div>
          )}

          {/* Explicit Logout Button */}
          <button
            onClick={onLogout}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-700/60 hover:border-rose-500 text-rose-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0 whitespace-nowrap"
            title="Logout and Return to Standalone Sign-In"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>

      {/* Navigation Tabs Bar (Clean single-row horizontal scroll with no wrapping or clipping) */}
      <div className="border-t border-slate-800/60 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {allowedTabs.length > 1 ? (
            <div className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 whitespace-nowrap flex items-center gap-1.5 text-xs ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold ring-1 ring-emerald-400/40' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold text-[9px] animate-pulse shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="text-[11px] font-bold text-slate-300">
                  ROLE RESTRICTED ACCESS &bull; {currentUser?.title || 'Active Operational Session'}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                DIRECT SCOPED ACCESS ACTIVE
              </span>
            </div>
          )}
        </div>
      </div>

      {/* PWA Mobile App Download & Install Modal with SAN Malami Photo Logo */}
      <InstallAppModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </header>
  );
}

