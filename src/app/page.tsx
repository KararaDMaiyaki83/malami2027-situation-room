'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab, getAllowedTabsForRole } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StandaloneLoginPage } from '@/components/auth/StandaloneLoginPage';
import { StatewideSituationRoom } from '@/components/situation-room/StatewideSituationRoom';
import { LGASupervisorDashboard } from '@/components/lga-supervisor/LGASupervisorDashboard';
import { RASupervisorDashboard } from '@/components/ra-supervisor/RASupervisorDashboard';
import { PollingUnitAgentPWA } from '@/components/pu-agent/PollingUnitAgentPWA';
import { ChainOfCustodyDesk } from '@/components/chain-custody/ChainOfCustodyDesk';
import { IncidentCommandDesk } from '@/components/incidents/IncidentCommandDesk';
import { StatewideCommsHub } from '@/components/communication/StatewideCommsHub';
import { EC8AForensicVerifier } from '@/components/forensics/EC8AForensicVerifier';
import { IReVPVTAuditDesk } from '@/components/irev/IReVPVTAuditDesk';
import { AgentAccreditationDesk } from '@/components/situation-room/AgentAccreditationDesk';
import { MalamiExecutivePitchDeck } from '@/components/pitch-deck/MalamiExecutivePitchDeck';
import { FinancialImplicationsDesk } from '@/components/budget/FinancialImplicationsDesk';
import { StrategicInnovationsDesk } from '@/components/innovations/StrategicInnovationsDesk';
import { MalamiAIChatbot } from '@/components/ai-assistant/MalamiAIChatbot';

import { KEBBI_LGAS, INITIAL_INCIDENTS, INITIAL_BROADCASTS } from '@/lib/kebbiElectoralData';
import { LGACollationData, IncidentReport, BroadcastLog } from '@/types/election';
import { INITIAL_USERS, AppUser } from '@/types/auth';

export default function Home() {
  // Authentication State: null = Standalone Login Gate!
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('SITUATION_ROOM');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const [lgas, setLgas] = useState<LGACollationData[]>(KEBBI_LGAS);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>(INITIAL_BROADCASTS);
  const [targetChainLGA, setTargetChainLGA] = useState<string>('Birnin Kebbi');

  // Load and merge persistent registered participants from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('malami2027_registered_users');
      if (saved) {
        const parsed: AppUser[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedIds = new Set(parsed.map(u => u.id));
          const unmerged = INITIAL_USERS.filter(u => !parsedIds.has(u.id));
          setUsers([...parsed, ...unmerged]);
        }
      }
    } catch (e) {
      console.error('Failed to load registered users from localStorage:', e);
    }
  }, []);

  const saveUsers = (newUsers: AppUser[]) => {
    setUsers(newUsers);
    try {
      localStorage.setItem('malami2027_registered_users', JSON.stringify(newUsers));
    } catch (e) {
      console.error('Failed to persist users to localStorage:', e);
    }
  };

  // When user logs in, set active tab strictly according to their role hierarchy
  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    if (user.role === 'PU_AGENT') {
      setActiveTab('PU_AGENT');
    } else if (user.role === 'RA_SUPERVISOR') {
      setActiveTab('RA_SUPERVISOR');
    } else if (user.role === 'LGA_SUPERVISOR') {
      setActiveTab('LGA_SUPERVISOR');
    } else {
      setActiveTab('SITUATION_ROOM');
    }
  };

  // Enforce strict containment: user can only see the tab allowed for their role
  useEffect(() => {
    if (currentUser) {
      const allowed = getAllowedTabsForRole(currentUser.role);
      if (!allowed.includes(activeTab)) {
        setActiveTab(allowed[0]);
      }
    }
  }, [currentUser, activeTab]);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegister = (newUserDraft: Omit<AppUser, 'id' | 'status' | 'registeredAt'>) => {
    const newUser: AppUser = {
      ...newUserDraft,
      id: 'usr-' + Date.now(),
      status: 'APPROVED',
      registeredAt: new Date().toLocaleString(),
    };
    saveUsers([newUser, ...users]);
  };

  // Dynamic simulation of incoming votes
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLgas(prevLgas => {
        const eligible = prevLgas.filter(l => l.reportedPUs < l.totalPUs);
        if (eligible.length === 0) return prevLgas;

        const randomIndex = Math.floor(Math.random() * eligible.length);
        const target = eligible[randomIndex];

        const addedPUs = 1;
        const adcGain = Math.floor(Math.random() * 150) + 120;
        const apcGain = Math.floor(Math.random() * 90) + 50;
        const pdpGain = Math.floor(Math.random() * 10) + 2;
        const rejGain = Math.floor(Math.random() * 4) + 1;

        return prevLgas.map(l => {
          if (l.id === target.id) {
            const newReported = Math.min(l.totalPUs, l.reportedPUs + addedPUs);
            const newADC = l.adcVotes + adcGain;
            const newAPC = l.apcVotes + apcGain;
            const newLead = newADC - newAPC;
            return {
              ...l,
              reportedPUs: newReported,
              adcVotes: newADC,
              apcVotes: newAPC,
              pdpVotes: l.pdpVotes + pdpGain,
              rejectedVotes: l.rejectedVotes + rejGain,
              leadMargin: newLead,
              status: newLead > 0 ? (newReported === l.totalPUs ? 'WON' : 'LEADING') : 'TIGHT'
            };
          }
          return l;
        });
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSelectLGAForChain = (lgaName: string) => {
    setTargetChainLGA(lgaName);
    setActiveTab('CHAIN_OF_CUSTODY');
  };

  const handleResolveIncident = (id: string, actionText: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status: 'RESOLVED',
          actionTaken: actionText
        };
      }
      return inc;
    }));
  };

  const handleDispatchLegal = (id: string, counselName: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status: 'LEGAL_DISPATCHED',
          legalCounselAssigned: counselName,
          actionTaken: `Counsel ${counselName} dispatched with Form EC8A Protest Notice.`
        };
      }
      return inc;
    }));
  };

  const handleSendBroadcast = (target: string, msg: string, channel: 'SMS_GATEWAY' | 'APP_PUSH' | 'VHF_RADIO') => {
    const newBroadcast: BroadcastLog = {
      id: `BC-${String(broadcasts.length + 1).padStart(2, '0')}`,
      sender: `${currentUser?.name || 'Central Command'} (${currentUser?.title || 'Situation Room'})`,
      recipientGroup: target,
      message: msg,
      channel: channel,
      deliveryCount: target.includes('ALL') ? 3745 : (target.includes('Ward') ? 225 : 42),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' WAT'
    };
    setBroadcasts(prev => [newBroadcast, ...prev]);
  };

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED').length;

  // IF NO USER IS LOGGED IN -> RENDER THE STANDALONE LOGIN PAGE (EXACT JIKA HANTA BEHAVIOR!)
  if (!currentUser) {
    return (
      <StandaloneLoginPage 
        allUsers={users}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Tactical Navbar with Scoped Tabs & Official Logout */}
      <Navbar 
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        onLogout={handleLogout}
        activeIncidentCount={activeIncidents}
      />

      {/* Main Reporting Hierarchy View Port */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* LEVEL 4: STATE SITUATION ROOM */}
        {activeTab === 'SITUATION_ROOM' && (
          <StatewideSituationRoom 
            lgas={lgas} 
            onSelectLGAForChain={handleSelectLGAForChain} 
            onNavigateToIReVAudit={() => setActiveTab('IREV_PVT_AUDIT')}
          />
        )}

        {/* LEVEL 3: LGA SUPERVISOR & COLLATION HALL */}
        {activeTab === 'LGA_SUPERVISOR' && (
          <LGASupervisorDashboard 
            currentUser={currentUser}
            onFileAffidavit={(aff) => {
              alert(`Protest affidavit recorded for ${aff.lga} LGA (${aff.ward}): ${aff.reason}`);
            }}
          />
        )}

        {/* LEVEL 2: REGISTRATION AREA (RA) / WARD SUPERVISOR */}
        {activeTab === 'RA_SUPERVISOR' && (
          <RASupervisorDashboard 
            currentUser={currentUser}
            onEscalateIncident={(ticket) => {
              const newInc: IncidentReport = {
                id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
                title: ticket.title,
                severity: ticket.severity,
                lgaName: currentUser.assignedLGA || 'Birnin Kebbi',
                wardName: ticket.ward,
                puCode: ticket.puCode,
                description: ticket.description,
                reportedBy: `${currentUser.name} (${currentUser.title})`,
                reporterPhone: currentUser.phone,
                timestamp: 'Just now',
                status: 'OPEN'
              };
              setIncidents(prev => [newInc, ...prev]);
            }}
            onSendWardBroadcast={(msg) => handleSendBroadcast(`${currentUser.assignedWard || 'Ward'} Agents`, msg, 'SMS_GATEWAY')}
          />
        )}

        {/* LEVEL 1: POLLING UNIT AGENT PWA */}
        {activeTab === 'PU_AGENT' && (
          <PollingUnitAgentPWA 
            currentUser={currentUser}
            onResultSubmitted={(res) => {
              alert(`Form EEC8A verified and collated for ${res.puCode} (${res.ward})! ADC: ${res.adc}, APC: ${res.apc}`);
            }}
          />
        )}

        {/* AGENT ACCREDITATION & CRYPTOGRAPHIC PIN DESK */}
        {activeTab === 'AGENT_ACCREDITATION' && (
          <AgentAccreditationDesk
            users={users}
            onUpdateUsers={saveUsers}
            currentUser={currentUser}
          />
        )}

        {/* COMMON TAB: CHAIN OF CUSTODY */}
        {activeTab === 'CHAIN_OF_CUSTODY' && (
          <ChainOfCustodyDesk 
            lgas={lgas} 
            initialLGA={targetChainLGA} 
          />
        )}

        {/* COMMON TAB: INCIDENT & SOS COMMAND */}
        {activeTab === 'INCIDENT_DESK' && (
          <IncidentCommandDesk 
            incidents={incidents}
            onResolveIncident={handleResolveIncident}
            onDispatchLegal={handleDispatchLegal}
          />
        )}

        {/* COMMON TAB: COMMS HUB */}
        {activeTab === 'COMMS_HUB' && (
          <StatewideCommsHub 
            broadcasts={broadcasts}
            onSendBroadcast={handleSendBroadcast}
          />
        )}

        {/* COMMON TAB: FORENSIC AUDIT */}
        {activeTab === 'FORENSICS' && (
          <EC8AForensicVerifier />
        )}

        {/* LEVEL 4 & COMMON TAB: PVT VS INEC IREV COMPARISON AUDIT */}
        {activeTab === 'IREV_PVT_AUDIT' && (
          <IReVPVTAuditDesk />
        )}

        {/* COMMON TAB: EXECUTIVE PITCH DECK */}
        {activeTab === 'PITCH_DECK' && (
          <MalamiExecutivePitchDeck onOpenBudget={() => setActiveTab('FINANCIAL_BUDGET')} />
        )}

        {/* FINANCIAL IMPLICATIONS MASTER BUDGET PROPOSAL */}
        {activeTab === 'FINANCIAL_BUDGET' && (
          <FinancialImplicationsDesk />
        )}

        {/* GAME-CHANGING STRATEGIC INNOVATIONS (VISION 2027) */}
        {activeTab === 'STRATEGIC_INNOVATIONS' && (
          <StrategicInnovationsDesk />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global AI Copilot / Chatbot for All Levels */}
      <MalamiAIChatbot 
        currentUser={currentUser} 
        onOpenIReVAudit={() => setActiveTab('IREV_PVT_AUDIT')}
      />

    </div>
  );
}
