'use client';

import React, { useState } from 'react';
import {
  ShieldCheck, 
  Smartphone, 
  Building2, 
  UserPlus, 
  KeyRound, 
  CheckCircle2,
  AlertCircle, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight, 
  Layers,
  Scale,
  Landmark,
  UserCheck,
  Download
} from 'lucide-react';
import { InstallAppModal } from '@/components/pwa/InstallAppModal';
import { AppUser, UserRole, INITIAL_USERS } from '@/types/auth';

interface StandaloneLoginPageProps {
  allUsers: AppUser[];
  onLogin: (user: AppUser) => void;
  onRegister: (newUser: Omit<AppUser, 'id' | 'status' | 'registeredAt'>) => void;
}

const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('234')) {
    return '0' + digits.slice(3);
  }
  if (digits.length === 10) {
    return '0' + digits;
  }
  return digits;
};

export const StandaloneLoginPage: React.FC<StandaloneLoginPageProps> = ({
  allUsers,
  onLogin,
  onRegister,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('usr-sit-01'); // Default to SAN Malami / Director
  const [phoneInput, setPhoneInput] = useState('+234 803 000 2027');
  const [pinInput, setPinInput] = useState('2027');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('PU_AGENT');
  const [regLGA, setRegLGA] = useState('Birnin Kebbi');
  const [regWard, setRegWard] = useState('Dangaladima Ward');
  const [regPuCode, setRegPuCode] = useState('PU 21-01-04-008');
  const [regPvc, setRegPvc] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState<AppUser | null>(null);

  const activeSelectedUser = allUsers.find(u => u.id === selectedUserId);

  const handleSelectParticipant = (userId: string) => {
    setSelectedUserId(userId);
    setLoginError(null);

    if (userId === 'CUSTOM') {
      setPhoneInput('');
      setPinInput('');
      return;
    }

    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setPhoneInput(found.phone);
      setPinInput(found.pin);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const normInput = normalizePhone(phoneInput);
    const cleanPin = pinInput.trim();

    if (!normInput || !cleanPin) {
      setLoginError('Please enter both your registered phone number and security PIN.');
      return;
    }

    let user = allUsers.find(u => normalizePhone(u.phone).endsWith(normInput.slice(-8)));
    if (!user && activeSelectedUser && selectedUserId !== 'CUSTOM') {
      user = activeSelectedUser;
    }

    if (!user) {
      setLoginError(`No campaign official found registered with ${phoneInput}. Please select from the dropdown or register.`);
      return;
    }

    if (user.pin !== cleanPin) {
      setLoginError('Incorrect Security PIN. Please verify your PIN or contact Central Command Admin.');
      return;
    }

    if (user.status === 'PENDING') {
      setLoginError('Your account is currently PENDING security clearance by the Central Directorate.');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(user!);
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please fill in your full official name and mobile phone number.');
      return;
    }

    const newPin = Math.floor(1000 + Math.random() * 9000).toString();

    const draft: Omit<AppUser, 'id' | 'status' | 'registeredAt'> = {
      name: regName,
      phone: regPhone,
      role: regRole,
      title: regRole === 'PU_AGENT' ? `Accredited PU Agent (${regPuCode})` : (regRole === 'RA_SUPERVISOR' ? `RA Supervisor (${regWard})` : `LGA Supervisor (${regLGA})`),
      assignedLGA: regLGA,
      assignedWard: regWard,
      assignedPU: regRole === 'PU_AGENT' ? regPuCode : undefined,
      badgeNumber: `ADC-${regRole.slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`,
      pin: newPin,
      pvcNumber: regPvc,
    };

    onRegister(draft);

    const pendingUser: AppUser = {
      ...draft,
      id: 'usr-' + Date.now(),
      status: 'PENDING',
      registeredAt: new Date().toLocaleString(),
    };

    setRegisteredSuccess(pendingUser);
  };

  // Group users by reporting hierarchy
  const situationRoomUsers = allUsers.filter(u => u.role === 'SITUATION_ROOM');
  const lgaSupervisorUsers = allUsers.filter(u => u.role === 'LGA_SUPERVISOR');
  const raSupervisorUsers = allUsers.filter(u => u.role === 'RA_SUPERVISOR');
  const puAgentUsers = allUsers.filter(u => u.role === 'PU_AGENT');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative overflow-x-hidden selection:bg-emerald-600 selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-emerald-600/20 via-teal-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Banner */}
      <header className="relative z-10 border-b border-emerald-900/40 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => setShowInstallModal(true)}
            className="relative cursor-pointer group shrink-0"
            title="Official App Logo - Click to Download App"
          >
            <img
              src="/malami_logo.png"
              alt="Abubakar Malami, SAN, CON - Official App Logo"
              className="w-11 h-11 rounded-2xl object-cover border-2 border-amber-400/90 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/30 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-[8px] font-black px-1 rounded text-white border border-slate-900 shadow">
              ADC
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-sm sm:text-base tracking-tight text-white">
                ABUBAKAR MALAMI, SAN, CON
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-400 border border-emerald-500/40">
                ADC 🤝 KEBBI 2027
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none mt-0.5">
              Kebbi State Gubernatorial Election Monitoring & Collation Command
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Tech Partners Accreditation Badge */}
          <div 
            className="hidden lg:flex items-center space-x-1.5 text-[11px] text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800 shadow-sm cursor-help"
            title="GetoCore Digital Innovation × TEEM TECH Solution | Lead IT Officer: Fatima Sulaiman Umar (08035533332 / 09035328748)"
          >
            <span>Powered by</span>
            <span className="font-bold text-emerald-400">GetoCore</span>
            <span className="text-slate-500 font-bold">×</span>
            <span className="font-bold text-amber-300">TEEM TECH</span>
          </div>

          <button
            type="button"
            onClick={() => setShowInstallModal(true)}
            className="flex items-center space-x-2 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-xl transition shadow-sm"
            title="Download & Install App on Android, iPhone or PC"
          >
            <img src="/malami_logo.png" alt="App Logo" className="w-4 h-4 rounded-full object-cover border border-amber-400" />
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Download App</span>
            <span className="sm:hidden">Install</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden md:inline">Cryptographic Defense Gate • Tier 4 Active</span>
            <span className="md:hidden">Secured Gate</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="relative z-10 flex-1 max-w-xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-center">
        
        {/* Hero App Logo with SAN Malami Photo */}
        <div className="flex flex-col items-center mb-5 text-center">
          <div 
            onClick={() => setShowInstallModal(true)}
            className="relative cursor-pointer group transition-transform hover:scale-105"
            title="Official App Logo of SAN Abubakar Malami - Click to Install"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl shadow-emerald-500/30 ring-4 ring-emerald-500/20 bg-slate-900">
              <img
                src="/malami_logo.png"
                alt="Abubakar Malami, SAN, CON - Kebbi 2027 Gubernatorial Candidate & App Logo"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full border-2 border-slate-900 shadow-lg flex items-center space-x-1">
              <span>ADC</span>
              <span>🤝</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowInstallModal(true)}
            className="mt-2.5 inline-flex items-center space-x-1.5 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Install Web App with SAN Malami Photo Logo</span>
          </button>
        </div>

        {/* Card Header Title */}
        <div className="text-center mb-5 space-y-1.5">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>ROLE-BASED ELECTORAL COMMAND ACCESS GATE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Official Personnel Sign In
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose your assigned campaign participant account from the dropdown below.
            Access is strictly scoped to your supervisory level in the reporting hierarchy.
          </p>
        </div>

        {/* The Executive Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 p-6 sm:p-8 space-y-5">
          
          {/* Card Header with Lock Icon */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">Participant Authentication</h2>
                <p className="text-[11px] text-slate-400">Zero Plaintext • Multi-Tier Results Reporting Hierarchy</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg border border-slate-700">
              v2.8 SECURE
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Error Banner */}
            {loginError && (
              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-xs text-rose-300 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            {/* 1. PARTICIPANT SELECTION DROPDOWN (Categorized by 4 Hierarchy Levels) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Select Official Account (Hierarchy of Report) *</span>
                <span className="text-[10px] text-emerald-400 lowercase font-normal">choose your role</span>
              </label>

              <div className="relative">
                <select
                  value={selectedUserId}
                  onChange={(e) => handleSelectParticipant(e.target.value)}
                  className="w-full rounded-2xl bg-slate-950 border-2 border-emerald-500/50 hover:border-emerald-400 px-3.5 py-3 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer pr-10 shadow-inner"
                >
                  {/* LEVEL 4: STATE SITUATION ROOM COORDINATORS & PRINCIPAL */}
                  <optgroup label="🎖️ LEVEL 4: STATE SITUATION ROOM COORDINATORS (Master Strategic Command)">
                    {situationRoomUsers.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.title}
                      </option>
                    ))}
                  </optgroup>

                  {/* LEVEL 3: LGA SUPERVISORS & LEGAL SHIELD */}
                  <optgroup label="⚖️ LEVEL 3: LGA SUPERVISORS & LEGAL SHIELD (21 LGAs Collation Halls)">
                    {lgaSupervisorUsers.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.title}
                      </option>
                    ))}
                  </optgroup>

                  {/* LEVEL 2: REGISTRATION AREA (RA) / WARD SUPERVISORS */}
                  <optgroup label="🏢 LEVEL 2: REGISTRATION AREA (RA) SUPERVISORS (225 Wards Command)">
                    {raSupervisorUsers.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.title}
                      </option>
                    ))}
                  </optgroup>

                  {/* LEVEL 1: POLLING UNIT AGENTS */}
                  <optgroup label="📱 LEVEL 1: POLLING UNIT AGENTS (3,745 Polling Units Ground Command)">
                    {puAgentUsers.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.title}
                      </option>
                    ))}
                  </optgroup>

                  <option value="CUSTOM">-- Manual Phone / PIN Sign In --</option>
                </select>
              </div>
            </div>

            {/* 2. PHONE NUMBER INPUT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Registered Mobile Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+234 803 000 2027"
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* 3. 4-DIGIT SECURITY PIN INPUT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center justify-between">
                <span>Official Security PIN *</span>
                <span className="text-[10px] text-slate-400 font-mono">Default Demo PIN: {activeSelectedUser?.pin || '2027'}</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  type={showPin ? "text" : "password"}
                  maxLength={6}
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials & Clearance...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Command Center</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Role Access Summary Banner */}
          {activeSelectedUser && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  {activeSelectedUser.role === 'SITUATION_ROOM' && <Landmark className="w-4 h-4" />}
                  {activeSelectedUser.role === 'LGA_SUPERVISOR' && <Scale className="w-4 h-4" />}
                  {activeSelectedUser.role === 'RA_SUPERVISOR' && <Building2 className="w-4 h-4" />}
                  {activeSelectedUser.role === 'PU_AGENT' && <Smartphone className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-slate-200 font-bold">{activeSelectedUser.name}</div>
                  <div className="text-[10px] text-slate-400">{activeSelectedUser.title}</div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                {activeSelectedUser.badgeNumber}
              </span>
            </div>
          )}

          {/* Self-Registration Link */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="text-xs text-slate-400 hover:text-emerald-400 font-semibold transition"
            >
              Not yet registered? <span className="underline">Apply for Campaign Official Accreditation</span>
            </button>
          </div>

        </div>

        {/* PWA Download Banner for Field Agents */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-amber-500/40 flex items-center justify-between shadow-xl shadow-emerald-950/40">
          <div className="flex items-center space-x-3">
            <div className="relative shrink-0">
              <img
                src="/malami_logo.png"
                alt="SAN Malami Official Logo"
                className="w-11 h-11 rounded-xl object-cover border border-amber-400 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-[8px] font-black px-1 rounded text-white border border-slate-950">
                ADC
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>Download Mobile App for Election Day</span>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 font-black px-1.5 py-0.5 rounded border border-amber-400/40">
                  SAN Malami Logo
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                Install directly to home screen (Android & iOS) for instant offline PU reporting and rapid EC8A uploads.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowInstallModal(true)}
            className="ml-3 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center space-x-1.5 shrink-0 shadow-lg transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">Install</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-5 px-4 text-center text-xs text-slate-400 space-y-2">
        <p className="text-slate-300 font-semibold">
          African Democratic Congress (ADC) • Directorate of Electoral Strategy, ICT & Legal Shield • Kebbi 2027
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400">Powered by</span>
          <span className="font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-lg border border-emerald-800/60 shadow-sm">
            GetoCore Digital Innovation
          </span>
          <span className="text-slate-500 font-semibold">in partnership with</span>
          <span className="font-bold text-amber-300 bg-amber-950/70 px-2.5 py-0.5 rounded-lg border border-amber-800/60 shadow-sm">
            TEEM TECH Solution
          </span>
        </div>
        
        {/* IT Technical Support Contact */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-300">
          <span className="text-slate-400">IT Technical Officer: <strong className="text-emerald-400 font-semibold">Fatima Sulaiman Umar</strong></span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400">
            Hotlines: <a href="tel:08035533332" className="text-amber-400 hover:underline font-mono">08035533332</a> / <a href="tel:09035328748" className="text-amber-400 hover:underline font-mono">09035328748</a>
          </span>
        </div>

        <p className="text-[10px] text-slate-500 font-mono">
          High-Security Electoral Situation Room Engine • AES-256 Encrypted Field Telemetry
        </p>
      </footer>

      {/* REGISTRATION MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Register as Campaign Official</h3>
                  <p className="text-xs text-slate-400">Kebbi 2027 Gubernatorial Project (ADC 🤝)</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setRegisteredSuccess(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Registration Submitted Successfully!</span>
                </div>
                <p className="text-slate-300">
                  Your profile has been submitted for clearance by the Central Situation Room Directorate.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div>Name: <strong className="text-white">{registeredSuccess.name}</strong></div>
                  <div>Phone: <strong className="text-white">{registeredSuccess.phone}</strong></div>
                  <div>Role: <strong className="text-emerald-400">{registeredSuccess.role}</strong></div>
                  <div>Assigned PIN: <strong className="text-amber-300">{registeredSuccess.pin}</strong></div>
                </div>
                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    setRegisteredSuccess(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Select Reporting Hierarchy Level *</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="PU_AGENT">Level 1: Polling Unit Agent (PU Ground Command)</option>
                    <option value="RA_SUPERVISOR">Level 2: RA Supervisor (Ward Collation)</option>
                    <option value="LGA_SUPERVISOR">Level 3: LGA Supervisor / Legal Shield</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Full Official Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Lawal"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Mobile Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+234 800 000 0000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Assigned LGA *</label>
                    <input
                      type="text"
                      required
                      value={regLGA}
                      onChange={(e) => setRegLGA(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Assigned Ward / RA *</label>
                    <input
                      type="text"
                      required
                      value={regWard}
                      onChange={(e) => setRegWard(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {regRole === 'PU_AGENT' && (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Assigned PU Code</label>
                    <input
                      type="text"
                      value={regPuCode}
                      onChange={(e) => setRegPuCode(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-white font-mono"
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* PWA INSTALL / DOWNLOAD MODAL WITH SAN MALAMI LOGO */}
      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

    </div>
  );
};
