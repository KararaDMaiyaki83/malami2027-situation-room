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
  Sparkles
} from 'lucide-react';
import { InstallAppModal } from '@/components/pwa/InstallAppModal';

export type ActiveTab = 
  | 'SITUATION_ROOM'
  | 'LGA_SUPERVISOR'
  | 'RA_SUPERVISOR'
  | 'PU_AGENT'
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
    { id: 'CHAIN_OF_CUSTODY', label: '5. Results Chain Audit', icon: Layers },
    { 
      id: 'INCIDENT_DESK', 
      label: '6. Incident & SOS', 
      icon: AlertTriangle,
      badge: activeIncidentCount > 0 ? `${activeIncidentCount} Active` : undefined 
    },
    { id: 'COMMS_HUB', label: '7. Comms & Fallback', icon: Radio },
    { id: 'FORENSICS', label: '8. EC8A Forensic Audit', icon: FileCheck2 },
    { id: 'IREV_PVT_AUDIT', label: '9. PVT vs IReV Audit', icon: ShieldCheck },
    { id: 'PITCH_DECK', label: '10. Malami Pitch Deck', icon: Presentation },
    { id: 'FINANCIAL_BUDGET', label: '11. Financial Budget', icon: DollarSign },
    { id: 'STRATEGIC_INNOVATIONS', label: '12. Vision 2027 Innovations', icon: Sparkles },
  ].filter(item => allowedTabs.includes(item.id as ActiveTab));

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand with Official SAN Malami Photo Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setShowInstallModal(true)}
            className="relative cursor-pointer group"
            title="Official SAN Malami App Logo - Click to Install / Download App"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-lg shadow-emerald-500/20 bg-slate-950 transition-transform group-hover:scale-105">
              <img 
                src="/malami_logo.png" 
                alt="Abubakar Malami SAN CON App Logo" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[7px] font-black text-slate-950">✓</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span>MALAMI 2027</span>
                <span className="text-amber-300">&bull; ADC 🤝</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">Kebbi Central Command</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              Abubakar Malami, SAN, CON
            </h1>
          </div>
        </div>

        {/* Right Tools: Download App, Clock, Simulation & Logged-In User Profile */}
        <div className="flex items-center gap-2.5">
          {/* Tech Partners Accreditation Badge */}
          <div 
            className="hidden xl:flex items-center space-x-1.5 text-[10px] text-slate-400 bg-slate-950/90 px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-sm cursor-help" 
            title="GetoCore Digital Innovation × TEEM TECH Solution | IT Technical Officer: Fatima Sulaiman Umar (08035533332 / 09035328748)"
          >
            <span className="text-slate-500">Powered by</span>
            <span className="font-bold text-emerald-400">GetoCore</span>
            <span className="text-slate-600 font-bold">×</span>
            <span className="font-bold text-amber-300">TEEM TECH</span>
            <span className="text-[9px] text-slate-500 hidden 2xl:inline">| IT: Fatima Sulaiman Umar</span>
          </div>

          {/* Download App Button with SAN Malami Logo for Easy Identification */}
          <button
            onClick={() => setShowInstallModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/30 border border-emerald-400/40 transition-all transform hover:scale-105"
            title="Download App with SAN Malami Photo Logo for Easy Identification"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-300 shrink-0 bg-slate-900">
              <img src="/icon-192.png" alt="App Logo" className="w-full h-full object-cover object-top" />
            </div>
            <span className="hidden sm:inline">Download App</span>
          </button>

          {/* Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{time || '18:45:00 WAT'}</span>
          </div>

          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isSimulating 
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Feed Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span>Resume Feed</span>
              </>
            )}
          </button>

          {/* User Profile Badge */}
          {currentUser && (
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">{currentUser.role.replace(/_/g, ' ')}</div>
                <div className="text-xs font-bold text-amber-300">{currentUser.name}</div>
              </div>
            </div>
          )}

          {/* Explicit Logout Button */}
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-700/60 hover:border-rose-500 text-rose-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title="Logout and Return to Standalone Sign-In"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>

      </div>

      {/* Navigation Tabs Bar (Scoped strictly to user's hierarchy level) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1.5 py-1.5 border-t border-slate-800/60 text-xs items-center justify-between">
        {allowedTabs.length > 1 ? (
          <div className="flex overflow-x-auto gap-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold text-[9px] animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-between w-full py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-300">
                ROLE RESTRICTED ACCESS &bull; {currentUser?.title || 'Active Operational Session'}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              DIRECT SCOPED ACCESS ACTIVE
            </span>
          </div>
        )}
      </div>

      {/* PWA Mobile App Download & Install Modal with SAN Malami Photo Logo */}
      <InstallAppModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </header>
  );
}

