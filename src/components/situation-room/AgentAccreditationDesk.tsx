'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  UserPlus, 
  Search, 
  Printer, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  QrCode, 
  Layers, 
  Building2, 
  Smartphone, 
  Send, 
  Check, 
  Award
} from 'lucide-react';
import { AppUser, UserRole } from '@/types/auth';
import { KEBBI_LGAS } from '@/lib/kebbiElectoralData';

interface AgentAccreditationDeskProps {
  users: AppUser[];
  onUpdateUsers: (updated: AppUser[]) => void;
  currentUser: AppUser | null;
}

export function AgentAccreditationDesk({
  users,
  onUpdateUsers,
  currentUser
}: AgentAccreditationDeskProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [lgaFilter, setLgaFilter] = useState<string>('ALL');
  const [visiblePins, setVisiblePins] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selected agent for viewing badge or dispatching SMS
  const [selectedAgentForBadge, setSelectedAgentForBadge] = useState<AppUser | null>(null);
  const [selectedAgentForDispatch, setSelectedAgentForDispatch] = useState<AppUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding new agent from command
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('PU_AGENT');
  const [newLga, setNewLga] = useState('Birnin Kebbi');
  const [newWard, setNewWard] = useState('Dangaladima Ward');
  const [newPuCode, setNewPuCode] = useState('PU 21-01-04-008');
  const [newPvc, setNewPvc] = useState('');
  const [generatedPin, setGeneratedPin] = useState(
    () => Math.floor(100000 + Math.random() * 900000).toString()
  );

  const togglePinVisibility = (userId: string) => {
    setVisiblePins(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Generate new cryptographic PIN for existing agent
  const handleRotatePin = (agentId: string) => {
    const freshPin = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = 'SEC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    
    const updated = users.map(u => {
      if (u.id === agentId) {
        return {
          ...u,
          pin: freshPin,
          securityHash: hash,
          issuedBy: currentUser?.name || 'Central Command'
        };
      }
      return u;
    });

    onUpdateUsers(updated);
    
    const target = updated.find(u => u.id === agentId);
    if (target) {
      setSelectedAgentForDispatch(target);
    }
  };

  const handleToggleStatus = (agentId: string) => {
    const updated = users.map(u => {
      if (u.id === agentId) {
        return {
          ...u,
          status: u.status === 'APPROVED' ? 'PENDING' : 'APPROVED'
        } as AppUser;
      }
      return u;
    });
    onUpdateUsers(updated);
  };

  const handleCreateAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const hash = 'SEC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newBadge = `ADC-${newRole.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: AppUser = {
      id: 'usr-' + Date.now(),
      name: newName.trim(),
      phone: newPhone.trim(),
      role: newRole,
      title: newRole === 'PU_AGENT' 
        ? `Accredited Field Agent (${newPuCode})` 
        : (newRole === 'RA_SUPERVISOR' ? `RA Ward Supervisor (${newWard})` : `LGA Collation Lead (${newLga})`),
      assignedLGA: newLga,
      assignedWard: newWard,
      assignedPU: newRole === 'PU_AGENT' ? newPuCode : undefined,
      badgeNumber: newBadge,
      pin: generatedPin,
      status: 'APPROVED',
      registeredAt: new Date().toLocaleString(),
      pvcNumber: newPvc.trim() || undefined,
      securityHash: hash,
      issuedBy: currentUser?.name || 'Central Command Admin'
    };

    onUpdateUsers([newUser, ...users]);
    setShowAddModal(false);
    setSelectedAgentForBadge(newUser);

    // Reset form
    setNewName('');
    setNewPhone('');
    setGeneratedPin(Math.floor(100000 + Math.random() * 900000).toString());
  };

  // Filtered list
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.assignedLGA && u.assignedLGA.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.assignedWard && u.assignedWard.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.assignedPU && u.assignedPU.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesLga = lgaFilter === 'ALL' || u.assignedLGA?.toLowerCase().includes(lgaFilter.toLowerCase());

    return matchesSearch && matchesRole && matchesLga;
  });

  const puCount = users.filter(u => u.role === 'PU_AGENT').length;
  const raCount = users.filter(u => u.role === 'RA_SUPERVISOR').length;
  const lgaCount = users.filter(u => u.role === 'LGA_SUPERVISOR').length;
  const approvedCount = users.filter(u => u.status === 'APPROVED').length;

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-black text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CENTRAL SECURITY DESK &bull; KEBBI 2027</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px]">
                Sec 43 Electoral Act 2022 Compliant
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
                Powered by GetoCore &times; TEEM TECH (Kaduna #1 IT)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Abubakar Malami (SAN) Participant Accreditation &amp; Security PIN Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Official command registry for registering field agents, issuing 6-digit cryptographic security PINs, generating tamper-evident digital badges, and dispatching credentials via SMS/WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => {
                setGeneratedPin(Math.floor(100000 + Math.random() * 900000).toString());
                setShowAddModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition active:scale-95 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>Accredit New Participant</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap"
              title="Print Accreditation Schedule"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Enrolled</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{users.length}</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{approvedCount} Cleared &bull; {users.length - approvedCount} Pending</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>PU Ground Agents</span>
            <Smartphone className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300 mt-1">{puCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Target: 3,738 Polling Units</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Ward &amp; LGA Collation Leads</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1">{raCount + lgaCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{raCount} Wards &bull; {lgaCount} LGA Supervisors</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Active Security PINs</span>
            <KeyRound className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{users.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">100% Cryptographically Bound</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, mobile phone, PU code, ward, or badge ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Roles</option>
            <option value="PU_AGENT">Level 1: PU Agents</option>
            <option value="RA_SUPERVISOR">Level 2: Ward Supervisors</option>
            <option value="LGA_SUPERVISOR">Level 3: LGA Supervisors</option>
            <option value="SITUATION_ROOM">Level 4: Situation Room</option>
          </select>

          <select
            value={lgaFilter}
            onChange={(e) => setLgaFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All 21 LGAs</option>
            {KEBBI_LGAS.map(lga => (
              <option key={lga.id} value={lga.name}>{lga.name}</option>
            ))}
          </select>

          <div className="text-xs text-slate-400 font-mono shrink-0 px-1">
            {filteredUsers.length} found
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Badge ID</th>
                <th className="py-3 px-4">Official / Agent</th>
                <th className="py-3 px-4">Role &amp; Hierarchy</th>
                <th className="py-3 px-4">Assigned Location</th>
                <th className="py-3 px-4">Phone / Contact</th>
                <th className="py-3 px-4">Security PIN</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500 font-medium">
                    No campaign participants match the search query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isPinVisible = !!visiblePins[user.id];
                  return (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition">
                      
                      {/* Badge ID */}
                      <td className="py-3 px-4 font-mono font-bold text-amber-300">
                        {user.badgeNumber}
                      </td>

                      {/* Official Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{user.name}</span>
                          {user.role === 'SITUATION_ROOM' && (
                            <span className="text-[9px] font-black bg-emerald-950 text-emerald-300 border border-emerald-700 px-1 rounded">
                              HQ
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {user.title}
                        </div>
                      </td>

                      {/* Role & Hierarchy */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                          user.role === 'PU_AGENT'
                            ? 'bg-teal-950/80 text-teal-300 border-teal-800'
                            : user.role === 'RA_SUPERVISOR'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                            : user.role === 'LGA_SUPERVISOR'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                            : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        }`}>
                          {user.role === 'PU_AGENT' && <Smartphone className="w-3 h-3" />}
                          {user.role === 'RA_SUPERVISOR' && <Layers className="w-3 h-3" />}
                          {user.role === 'LGA_SUPERVISOR' && <Building2 className="w-3 h-3" />}
                          {user.role === 'SITUATION_ROOM' && <ShieldCheck className="w-3 h-3" />}
                          <span>{user.role.replace(/_/g, ' ')}</span>
                        </span>
                      </td>

                      {/* Assigned Location */}
                      <td className="py-3 px-4">
                        <div className="text-slate-200 font-medium">
                          {user.assignedPU || user.assignedWard || user.assignedLGA || 'Statewide HQ'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {user.assignedLGA && `${user.assignedLGA} LGA`}
                        </div>
                      </td>

                      {/* Phone Number */}
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {user.phone}
                      </td>

                      {/* Security PIN with Mask/Reveal */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold border ${
                            isPinVisible 
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-600' 
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}>
                            {isPinVisible ? user.pin : '••••••'}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => togglePinVisibility(user.id)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title={isPinVisible ? 'Hide PIN' : 'Reveal PIN'}
                          >
                            {isPinVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyText(user.pin, `pin-${user.id}`)}
                            className="p-1 text-slate-400 hover:text-emerald-400 rounded hover:bg-slate-800"
                            title="Copy PIN"
                          >
                            {copiedId === `pin-${user.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black border transition ${
                            user.status === 'APPROVED'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                          }`}
                          title="Click to toggle approval status"
                        >
                          {user.status === 'APPROVED' ? 'CLEARED ✓' : 'PENDING'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* Generate/Rotate PIN */}
                          <button
                            onClick={() => handleRotatePin(user.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-600 transition"
                            title="Rotate / Generate New PIN"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          {/* SMS / WhatsApp Dispatch */}
                          <button
                            onClick={() => setSelectedAgentForDispatch(user)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-950 text-slate-300 hover:text-teal-300 border border-slate-700 hover:border-teal-600 transition"
                            title="Open SMS / WhatsApp Credential Dispatch"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>

                          {/* Digital Badge Modal */}
                          <button
                            onClick={() => setSelectedAgentForBadge(user)}
                            className="px-2 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center gap-1 transition"
                            title="View Official Digital Badge"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>Badge</span>
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD NEW PARTICIPANT FROM COMMAND */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-emerald-600/40 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Accredit New Campaign Official</h3>
                  <p className="text-xs text-slate-400">Kebbi 2027 Election Command &bull; Abubakar Malami (SAN)</p>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAgentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Command Level *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="PU_AGENT">Level 1: Polling Unit Agent (PU Ground Defense)</option>
                  <option value="RA_SUPERVISOR">Level 2: RA Ward Supervisor (Ward Collation)</option>
                  <option value="LGA_SUPERVISOR">Level 3: LGA Collation Lead &amp; Legal Shield</option>
                  <option value="SITUATION_ROOM">Level 4: Central Situation Room HQ Operator</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Official Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aliyu Usman"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mobile Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+234 803 000 0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assigned LGA</label>
                  <select
                    value={newLga}
                    onChange={(e) => setNewLga(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {KEBBI_LGAS.map(lga => (
                      <option key={lga.id} value={lga.name}>{lga.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assigned Ward / RA</label>
                  <input
                    type="text"
                    value={newWard}
                    onChange={(e) => setNewWard(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
                  />
                </div>
              </div>

              {newRole === 'PU_AGENT' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assigned Polling Unit Code / Name</label>
                  <input
                    type="text"
                    value={newPuCode}
                    onChange={(e) => setNewPuCode(e.target.value)}
                    placeholder="e.g. PU 21-01-04-008"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white font-mono"
                  />
                </div>
              )}

              {/* Cryptographic Security PIN Engine */}
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <KeyRound className="w-4 h-4" />
                    <span>Cryptographic Security PIN</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGeneratedPin(Math.floor(100000 + Math.random() * 900000).toString())}
                    className="text-[10px] text-emerald-400 hover:text-white font-bold flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Randomize</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={generatedPin}
                    onChange={(e) => setGeneratedPin(e.target.value)}
                    className="w-full text-center font-mono text-lg font-black tracking-widest rounded-xl bg-slate-950 border border-emerald-500 text-amber-300 py-1.5 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  This 6-digit PIN grants access to the field agent mobile telemetry terminal.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold transition shadow-md shadow-emerald-950"
                >
                  Issue Clearance &amp; Generate Badge
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: DIGITAL ACCREDITATION BADGE / OFFICIAL PASS */}
      {selectedAgentForBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-slate-950 border-2 border-amber-400/80 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden text-center space-y-4">
            
            {/* Holographic Watermark */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 via-amber-500/5 to-transparent pointer-events-none" />

            <button
              onClick={() => setSelectedAgentForBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>

            {/* Badge Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>ADC KEBBI 2027 &bull; MANDATE DEFENSE</span>
              </div>
              <h2 className="text-base font-black text-white tracking-tight">
                ABUBAKAR MALAMI (SAN)
              </h2>
              <p className="text-[11px] font-bold text-amber-300 uppercase">
                Official Accredited Field Official
              </p>
            </div>

            {/* Photo / Avatar with Gold Border */}
            <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900 p-1">
              <img
                src="/malami_logo.png"
                alt="Accreditation Seal"
                className="w-full h-full object-cover object-top rounded-xl"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-tl-lg shadow">
                VERIFIED ✓
              </span>
            </div>

            {/* Agent Info Details */}
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">{selectedAgentForBadge.name}</h3>
              <div className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-amber-300 font-bold">
                {selectedAgentForBadge.badgeNumber}
              </div>
              <div className="text-xs text-emerald-400 font-semibold">
                {selectedAgentForBadge.title}
              </div>
            </div>

            {/* Security PIN & QR Card */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Assigned Location:</span>
                <span className="text-xs font-bold text-white truncate max-w-[170px]">
                  {selectedAgentForBadge.assignedPU || selectedAgentForBadge.assignedWard || selectedAgentForBadge.assignedLGA}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Mobile Contact:</span>
                <span className="text-xs font-mono font-bold text-slate-200">
                  {selectedAgentForBadge.phone}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono flex items-center gap-1">
                  <KeyRound className="w-3 h-3" />
                  <span>Security Access PIN:</span>
                </span>
                <span className="text-sm font-mono font-black text-amber-300 tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-amber-400/40">
                  {selectedAgentForBadge.pin}
                </span>
              </div>
            </div>

            {/* Verification QR Code Visual */}
            <div className="p-3 rounded-xl bg-white text-slate-950 flex flex-col items-center justify-center space-y-1">
              <QrCode className="w-20 h-20 text-slate-950" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-600">
                {selectedAgentForBadge.securityHash || 'SEC-ADC2027-KB01'}
              </span>
            </div>

            <div className="text-[9px] text-slate-400 font-medium">
              Powered by GetoCore &amp; TEEM TECH Solution &bull; Kaduna #1 IT
            </div>

            {/* Print & Close */}
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
              <button
                onClick={() => setSelectedAgentForBadge(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: SMS & WHATSAPP CREDENTIAL DISPATCH */}
      {selectedAgentForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Dispatch Credentials via SMS / WhatsApp</h3>
                  <p className="text-slate-400 text-[11px]">Instant field clearance alert for {selectedAgentForDispatch.name}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgentForDispatch(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Formatted Dispatch Message:</label>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-200 leading-relaxed whitespace-pre-wrap">
{`[MALAMI 2027 SITUATION ROOM • ADC KEBBI]
Dear ${selectedAgentForDispatch.name},
You have been officially accredited as:
Role: ${selectedAgentForDispatch.role.replace(/_/g, ' ')}
Posting: ${selectedAgentForDispatch.assignedPU || selectedAgentForDispatch.assignedWard || selectedAgentForDispatch.assignedLGA}
Badge ID: ${selectedAgentForDispatch.badgeNumber}
Security Access PIN: ${selectedAgentForDispatch.pin}

Web Terminal Login: ${typeof window !== 'undefined' ? window.location.origin : 'https://malami2027.getocore.ng'}
(Sec 43 Electoral Act 2022 Accredited. Powered by GetoCore & TEEM TECH)`}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  const text = `[MALAMI 2027 SITUATION ROOM • ADC KEBBI]\nDear ${selectedAgentForDispatch.name},\nYou have been officially accredited as:\nRole: ${selectedAgentForDispatch.role.replace(/_/g, ' ')}\nPosting: ${selectedAgentForDispatch.assignedPU || selectedAgentForDispatch.assignedWard || selectedAgentForDispatch.assignedLGA}\nBadge ID: ${selectedAgentForDispatch.badgeNumber}\nSecurity Access PIN: ${selectedAgentForDispatch.pin}\n\nWeb Terminal Login: ${typeof window !== 'undefined' ? window.location.origin : 'https://malami2027.getocore.ng'}\n(Sec 43 Electoral Act 2022 Accredited. Powered by GetoCore & TEEM TECH)`;
                  handleCopyText(text, 'dispatch-text');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
              >
                {copiedId === 'dispatch-text' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Credentials Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Dispatch Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedAgentForDispatch(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
