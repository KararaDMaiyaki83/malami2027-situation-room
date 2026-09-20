'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Camera, 
  CheckCircle2, 
  ShieldAlert, 
  Send, 
  MapPin, 
  UserCheck, 
  FileCheck, 
  Lock, 
  AlertOctagon, 
  RefreshCw,
  Clock, 
  Calendar, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck,
  FileText,
  Download,
  Check,
  Radio,
  Eye,
  Hash,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { AppUser } from '@/types/auth';
import { ElectionSegmentId } from '@/types/election';
import { ELECTION_STAGES } from '@/lib/kebbiElectoralData';

interface PollingUnitAgentPWAProps {
  currentUser?: AppUser | null;
  onResultSubmitted?: (data: {
    ward: string;
    puCode: string;
    adc: number;
    apc: number;
    pdp: number;
    nnpp: number;
    lp: number;
    accredited: number;
  }) => void;
}

export function PollingUnitAgentPWA({ currentUser, onResultSubmitted }: PollingUnitAgentPWAProps) {
  const [appMode, setAppMode] = useState<'PHASED_REPORTING' | 'EC8A_RESULT'>('PHASED_REPORTING');
  const [isOnline, setIsOnline] = useState(true);
  const [sosTriggered, setSosTriggered] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // 6-STAGE PHASED ELECTION REPORTING STATE
  // ─────────────────────────────────────────────────────────────
  const [activeStageId, setActiveStageId] = useState<ElectionSegmentId>('STAGE_2_BVAS_ZERO_CHECK');
  const [completedStages, setCompletedStages] = useState<string[]>(['STAGE_1_ARRIVAL_SETUP']);
  const [stageChecklistAnswers, setStageChecklistAnswers] = useState<Record<string, boolean>>({
    'q0': true,
    'q1': true,
    'q2': true,
    'q3': true
  });
  const [agentObservationNotes, setAgentObservationNotes] = useState('');
  const [isPhaseSubmitting, setIsPhaseSubmitting] = useState(false);
  const [phaseSuccessMessage, setPhaseSuccessMessage] = useState<string | null>(null);

  // ─────────────────────────────────────────────────────────────
  // DIGITAL FORM EEC8A & ANTI-OVER-VOTING STATE
  // ─────────────────────────────────────────────────────────────
  const [ec8aStep, setEc8aStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [resultSubmitted, setResultSubmitted] = useState(false);

  // Unit info
  const selectedLga = currentUser?.assignedLGA || 'Birnin Kebbi';
  const selectedWard = currentUser?.assignedWard || 'Dangaladima Ward';
  const puCode = currentUser?.assignedPU?.split(' ')[0] || 'KB/BK/04/008';
  const puName = currentUser?.assignedPU || 'KB/BK/04/008 (Central Islamiyya School)';
  const agentName = currentUser?.name || 'Muhammad Bello Kamba';
  const badgeNumber = currentUser?.badgeNumber || 'ADC-PUA-9941';

  // Numerical inputs for Form EEC8A
  const [registeredVoters, setRegisteredVoters] = useState('650');
  const [bvasAccredited, setBvasAccredited] = useState('342');

  // Party Scores (Kebbi Gubernatorial Race 2027)
  const [adcVotes, setAdcVotes] = useState('214'); // Abubakar Malami, SAN
  const [apcVotes, setApcVotes] = useState('118'); // Nasir Idris
  const [pdpVotes, setPdpVotes] = useState('6');
  const [nnppVotes, setNnppVotes] = useState('0');
  const [lpVotes, setLpVotes] = useState('0');
  const [otherVotes, setOtherVotes] = useState('0');
  const [rejectedVotes, setRejectedVotes] = useState('4');

  // Form EC8A Photo
  const [photoAttached, setPhotoAttached] = useState(true);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>(
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80'
  );

  // Live Camera & Native Capture System for Demonstration
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Start live WebRTC camera
  const startCamera = async (mode: 'environment' | 'user' = 'environment') => {
    setCameraError(null);
    setIsCameraOpen(true);
    setFacingMode(mode);
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.warn('Video play error:', e));
      }
    } catch (err: any) {
      console.warn('Live camera error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera permissions in your browser or use the file picker below.'
          : 'Live camera is unavailable on this device. You can snap using the native phone camera or upload a saved photo.'
      );
    }
  };

  // Stop camera and release hardware
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  // Toggle front / back camera
  const flipCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextMode);
  };

  // Capture frame from live video and apply cryptographic GPS watermark
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw video frame
    ctx.drawImage(video, 0, 0, width, height);

    // 2. Cryptographic and GPS Watermark Banner
    const bannerHeight = Math.max(90, Math.round(height * 0.14));
    const bannerY = height - bannerHeight;

    ctx.fillStyle = 'rgba(5, 46, 22, 0.88)';
    ctx.fillRect(0, bannerY, width, bannerHeight);

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, bannerY, width, 4);

    const fontSize = Math.max(14, Math.round(width * 0.022));
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px monospace`;
    
    const nowStr = new Date().toLocaleString() + ' WAT';
    const line1 = `ADC MONITOR 2027 • INEC FORM EC8A EVIDENCE • ${puCode}`;
    const line2 = `GPS: 12.4539° N, 4.1975° E (±2m) | TIME: ${nowStr}`;
    const line3 = `BVAS: KB-BVAS-BK-008 | AGENT: ${agentName} (${badgeNumber}) | HASH: #EC8A-${Date.now().toString(16).toUpperCase()}`;

    ctx.fillText(line1, 20, bannerY + fontSize + 10);
    ctx.fillStyle = '#34d399';
    ctx.fillText(line2, 20, bannerY + (fontSize * 2) + 16);
    ctx.fillStyle = '#fde68a';
    ctx.font = `normal ${Math.round(fontSize * 0.85)}px monospace`;
    ctx.fillText(line3, 20, bannerY + (fontSize * 3) + 20);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPhotoPreviewUrl(dataUrl);
    setPhotoAttached(true);
    setIsCapturing(false);
    stopCamera();
  };

  // Handle native phone camera file input (capture="environment")
  const handleNativeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const bannerHeight = Math.max(90, Math.round(img.height * 0.14));
          const bannerY = img.height - bannerHeight;
          ctx.fillStyle = 'rgba(5, 46, 22, 0.90)';
          ctx.fillRect(0, bannerY, img.width, bannerHeight);
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(0, bannerY, img.width, 4);

          const fontSize = Math.max(14, Math.round(img.width * 0.022));
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${fontSize}px monospace`;
          const nowStr = new Date().toLocaleString() + ' WAT';
          ctx.fillText(`ADC EVIDENCE • INEC FORM EC8A • ${puCode}`, 20, bannerY + fontSize + 10);
          ctx.fillStyle = '#34d399';
          ctx.fillText(`GPS: 12.4539° N, 4.1975° E (±2m) | ${nowStr}`, 20, bannerY + (fontSize * 2) + 16);
          ctx.fillStyle = '#fde68a';
          ctx.font = `normal ${Math.round(fontSize * 0.85)}px monospace`;
          ctx.fillText(`BVAS ID: KB-BVAS-BK-008 • AGENT: ${agentName} • #EC8A-${Date.now().toString(16).toUpperCase()}`, 20, bannerY + (fontSize * 3) + 20);

          setPhotoPreviewUrl(canvas.toDataURL('image/jpeg', 0.92));
          setPhotoAttached(true);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Load official demo sample for fast desktop demonstration
  const loadOfficialDemoSample = () => {
    setPhotoPreviewUrl('https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80');
    setPhotoAttached(true);
  };

  const currentStageMeta = ELECTION_STAGES.find(s => s.id === activeStageId) || ELECTION_STAGES[0];

  // ─────────────────────────────────────────────────────────────
  // ANTI-OVER-VOTING ENGINE CALCULATIONS (SECTION 51 ELECTORAL ACT)
  // ─────────────────────────────────────────────────────────────
  const validVotes = (parseInt(adcVotes) || 0) + 
                     (parseInt(apcVotes) || 0) + 
                     (parseInt(pdpVotes) || 0) + 
                     (parseInt(nnppVotes) || 0) + 
                     (parseInt(lpVotes) || 0) + 
                     (parseInt(otherVotes) || 0);

  const rejectedCount = parseInt(rejectedVotes) || 0;
  const totalVotesCast = validVotes + rejectedCount;
  const accreditedCount = parseInt(bvasAccredited) || 0;
  const regVotersCount = parseInt(registeredVoters) || 0;

  // The critical rule: Total Votes Cast CANNOT exceed BVAS Accredited Voters
  const isOverVoting = totalVotesCast > accreditedCount;
  const overVotingDelta = totalVotesCast - accreditedCount;

  // Checklist toggler
  const handleToggleChecklist = (key: string) => {
    setStageChecklistAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Submit Phase report
  const handlePhaseReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPhaseSubmitting(true);
    setPhaseSuccessMessage(null);

    setTimeout(() => {
      setIsPhaseSubmitting(false);
      setCompletedStages(prev => Array.from(new Set([...prev, activeStageId])));
      setPhaseSuccessMessage(`Stage ${currentStageMeta.stageNumber} [${currentStageMeta.shortName}] report verified and transmitted!`);
      setTimeout(() => setPhaseSuccessMessage(null), 4000);
    }, 800);
  };

  // Submit Form EEC8A
  const handleFinalEC8ASubmit = () => {
    if (isOverVoting) {
      const confirmContested = confirm(
        `CRITICAL ALERT: Over-voting detected (+${overVotingDelta} excess votes). Under Section 51(2) of Electoral Act 2022, this unit is subject to cancellation. Do you wish to transmit this Form EC8A as an OFFICIALLY CONTESTED BALLOT with a formal protest affidavit?`
      );
      if (!confirmContested) return;
    }

    setIsSubmittingResult(true);
    setTimeout(() => {
      setIsSubmittingResult(false);
      setResultSubmitted(true);
      if (onResultSubmitted) {
        onResultSubmitted({
          ward: selectedWard,
          puCode,
          adc: parseInt(adcVotes) || 0,
          apc: parseInt(apcVotes) || 0,
          pdp: parseInt(pdpVotes) || 0,
          nnpp: parseInt(nnppVotes) || 0,
          lp: parseInt(lpVotes) || 0,
          accredited: accreditedCount
        });
      }
    }, 1200);
  };

  const handleDownloadProtestAffidavit = () => {
    const text = `
FORM EC8A STATUTORY PROTEST AFFIDAVIT
INEC KEBBI STATE GUBERNATORIAL ELECTION 2027
IN ACCORDANCE WITH SECTION 51(2) & 51(3) OF ELECTORAL ACT 2022

POLLING UNIT: ${puName} (${puCode})
WARD: ${selectedWard} | LGA: ${selectedLga}
ACCREDITED AGENT: ${agentName} (${badgeNumber})
TIME OF LOG: ${new Date().toLocaleString()}

1. BIVAS ACCREDITATION COUNT: ${accreditedCount}
2. TOTAL BALLOTS FOUND IN BOX: ${totalVotesCast}
   - ADC (Malami): ${adcVotes}
   - APC (Nasir Idris): ${apcVotes}
   - PDP: ${pdpVotes}
   - Others: ${otherVotes}
   - Rejected: ${rejectedVotes}

STATUTORY VIOLATION NOTICED:
Total votes cast (${totalVotesCast}) strictly exceeds accredited voters on BVAS (${accreditedCount}) by ${overVotingDelta} votes.
Under Section 51(2) of the Electoral Act 2022, the result of this Polling Unit is hereby declared null and void.
The Presiding Officer is officially requested to endorse this protest on Form EC8A.

COPIES SERVED TO:
- Ward Registration Area Collation Officer (RAC)
- LGA Legal Shield Lead: Barr. Sanusi Dangaladima
- Central Situation Room: Abubakar Malami SAN Directorate
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Section51_Protest_Notice_${puCode.replace(/[\/\s]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      
      {/* ── TOP OPERATIONAL HEADER BANNER ── */}
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/50 p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                ADC PU AGENT PWA &bull; FIELD TELEMETRY CLIENT 🤝
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {puCode} &bull; {selectedWard} &bull; {selectedLga} LGA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Polling Unit Agent Tactical Reporting &amp; Form EEC8A Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Strict <strong>6-Stage Phased Reporting</strong> from 7:00 AM setup to <strong>Digital Form EEC8A</strong> submission, featuring the mandatory <strong>Anti-Over-Voting Engine (Section 51)</strong> and Form EC8A camera verification.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold shrink-0">
            <button
              onClick={() => setAppMode('PHASED_REPORTING')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                appMode === 'PHASED_REPORTING' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>6-Stage Phased Report</span>
            </button>
            <button
              onClick={() => setAppMode('EC8A_RESULT')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                appMode === 'EC8A_RESULT' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Form EEC8A &amp; Anti-Overvoting</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE CLIENT CONTAINER (Realistic PWA Viewport) ── */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        
        {/* Mobile Mockup Shell */}
        <div className="relative w-full max-w-[430px] rounded-[42px] border-[8px] border-slate-800 bg-slate-950 p-4 shadow-2xl ring-1 ring-emerald-900/50">
          
          {/* Top Speaker Notch */}
          <div className="mx-auto mb-3 h-4 w-28 rounded-full bg-slate-800 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-slate-900 mr-2"></div>
            <div className="h-1.5 w-10 rounded-full bg-slate-900"></div>
          </div>

          {/* Screen Content */}
          <div className="min-h-[660px] rounded-[28px] bg-slate-900 p-4 text-slate-100 flex flex-col justify-between border border-emerald-950">
            
            <div>
              {/* Agent Device Status Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
                <div className="flex items-center space-x-2 font-bold text-emerald-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                    ADC
                  </div>
                  <span className="truncate max-w-[130px]">{agentName}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>GPS 6M</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOnline(!isOnline)}
                    className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                    <span>{isOnline ? 'LIVE' : 'CACHED'}</span>
                  </button>
                </div>
              </div>

              {/* Polling Unit Badge */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between mb-3">
                <div>
                  <div className="font-mono font-black text-white text-xs">{puCode}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[210px]">{puName}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {selectedWard}
                </span>
              </div>

              {/* Emergency SOS Button */}
              {sosTriggered ? (
                <div className="p-3 bg-rose-950/60 border border-rose-500 rounded-xl text-center space-y-1.5 mb-3 animate-pulse">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black text-rose-300">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>EMERGENCY SOS BROADCAST ACTIVE!</span>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    LGA Legal Shield &amp; Police Tactical Patrol notified with live coordinates (12.4539° N, 4.1975° E).
                  </p>
                  <button
                    onClick={() => setSosTriggered(false)}
                    className="px-3 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold"
                  >
                    Cancel Alert
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSosTriggered(true)}
                  className="w-full py-1.5 mb-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-600/40 text-rose-300 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>EMERGENCY SOS (DISPATCH LEGAL ESCORT)</span>
                </button>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 1: 6-STAGE PHASED REPORTING
                 ───────────────────────────────────────────────────────────── */}
              {appMode === 'PHASED_REPORTING' && (
                <div className="space-y-3.5 text-xs">
                  
                  {/* Stage Selector Grid */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1.5">
                      Election Lifecycle Stages (1 to 6):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {ELECTION_STAGES.map(s => {
                        const isDone = completedStages.includes(s.id);
                        const isCurrent = activeStageId === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setActiveStageId(s.id)}
                            className={`p-1.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                              isCurrent
                                ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                                : isDone
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            <span className="text-[9px] font-bold block">Stage {s.stageNumber}</span>
                            <span className="text-[10px] font-extrabold truncate w-full block">{s.shortName}</span>
                            {isDone && <span className="text-[8px] text-emerald-400 mt-0.5">✓ Sent</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Stage Details & Checklist Card */}
                  <div className="bg-slate-950 rounded-2xl p-3.5 border border-emerald-900/40 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="text-xs font-black text-white">{currentStageMeta.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-mono">{currentStageMeta.timeWindow}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        12.4539° N
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-tight">
                      {currentStageMeta.description}
                    </p>

                    {/* Success Notice */}
                    {phaseSuccessMessage && (
                      <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-[11px] text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{phaseSuccessMessage}</span>
                      </div>
                    )}

                    {/* Checklist Questions */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                        Mandatory Verification Checklist:
                      </span>
                      {currentStageMeta.checkQuestions.map((q, idx) => {
                        const isChecked = stageChecklistAnswers[`q${idx}`] !== false;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleToggleChecklist(`q${idx}`)}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700"
                          >
                            <span className="text-[11px] text-slate-300 pr-2">{q}</span>
                            <span className={`h-4 w-4 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                            }`}>
                              {isChecked ? '✓' : ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Stage 6 Form EC8A Camera Photo Card */}
                    {activeStageId === 'STAGE_6_EC8A_ENDORSEMENT_UPLOAD' && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Signed Form EC8A Camera Proof:</span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">
                            {photoAttached ? '✓ Photo Attached' : 'Photo Required'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startCamera('environment')}
                            className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{photoAttached ? 'Retake Photo' : 'Open Camera'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>File</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Field Observation Notes */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">
                        Agent Field Notes / Incident Log:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Empty ballot box confirmed, BVAS screen showed 000 accredited..."
                        value={agentObservationNotes}
                        onChange={(e) => setAgentObservationNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      />
                    </div>

                    {/* Transmit Phase Button */}
                    <button
                      type="button"
                      disabled={isPhaseSubmitting}
                      onClick={handlePhaseReportSubmit}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                    >
                      {isPhaseSubmitting ? (
                        <span>Transmitting to Situation Room...</span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Transmit Stage {currentStageMeta.stageNumber} Report to Ward RA</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Proceed to Form EEC8A link */}
                  <div className="pt-1 text-center">
                    <button
                      type="button"
                      onClick={() => setAppMode('EC8A_RESULT')}
                      className="text-emerald-400 hover:text-emerald-300 font-bold text-[11px] flex items-center justify-center space-x-1 mx-auto"
                    >
                      <span>Proceed to Final Form EEC8A &amp; Anti-Over-Voting Entry</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 2: DIGITAL FORM EEC8A & ANTI-OVER-VOTING ENGINE
                 ───────────────────────────────────────────────────────────── */}
              {appMode === 'EC8A_RESULT' && (
                <div className="space-y-3.5 text-xs">
                  
                  {/* Step Stepper Header */}
                  {!resultSubmitted && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>STEP {ec8aStep} OF 3 &bull; DIGITAL FORM EEC8A</span>
                        <span className="text-emerald-400 font-mono">
                          {ec8aStep === 1 ? '1. BVAS Accreditation' : ec8aStep === 2 ? '2. Party Scores' : '3. Form EC8A Photo & Verify'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                        <div className={`h-full bg-emerald-500 transition-all ${
                          ec8aStep === 1 ? 'w-1/3' : ec8aStep === 2 ? 'w-2/3' : 'w-full'
                        }`} />
                      </div>
                    </div>
                  )}

                  {/* Confirmation View after Submission */}
                  {resultSubmitted ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">Form EEC8A Certified &amp; Transmitted!</h3>
                        <p className="text-[11px] text-slate-300 mt-1">
                          Results for <strong>{puCode}</strong> ({selectedWard}) have been locked and integrated into the Central Situation Room.
                        </p>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-950 text-left text-xs space-y-1 font-mono">
                        <div className="text-[10px] text-slate-400">CERTIFIED TRANSMISSION SUMMARY:</div>
                        <div className="text-emerald-400 font-bold">ADC (Abubakar Malami, SAN): {adcVotes} votes 🤝</div>
                        <div className="text-blue-400">APC (Nasir Idris): {apcVotes} votes</div>
                        <div className="text-purple-400">PDP: {pdpVotes} votes</div>
                        <div className="text-slate-400 pt-1 text-[10px] border-t border-slate-800 mt-1 flex justify-between">
                          <span>TOTAL VOTES CAST: {totalVotesCast}</span>
                          <span className="text-cyan-400">BVAS: {accreditedCount}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          ANTI-OVER-VOTING STATUS: 100% COMPLIANT
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800 text-[11px] text-blue-200 text-left space-y-1">
                        <div className="font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>MANDATORY STAGE 6 INSTRUCTION:</span>
                        </div>
                        <p className="text-[10px] text-slate-300">
                          Keep your certified duplicate copy of Form EC8A secure. Accompany the Presiding Officer and ballot box directly to <strong>{selectedWard} RAC Collation Center</strong>.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setResultSubmitted(false);
                          setEc8aStep(1);
                        }}
                        className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-white transition-all border border-slate-700"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Edit or Resubmit Data</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* ── STEP 1: BVAS ACCREDITATION SETUP ── */}
                      {ec8aStep === 1 && (
                        <div className="space-y-3">
                          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                            <div>
                              <label className="block text-[10px] font-semibold text-slate-400 mb-1">Assigned Polling Unit</label>
                              <input
                                type="text"
                                disabled
                                value={puName}
                                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2 text-xs text-slate-300 font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Reg. Voters on List</label>
                                <input
                                  type="number"
                                  value={registeredVoters}
                                  onChange={(e) => setRegisteredVoters(e.target.value)}
                                  className="w-full rounded-xl bg-slate-900 border border-slate-700 p-2 text-xs text-white font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-cyan-400 mb-1 flex items-center gap-1">
                                  <Hash className="w-3 h-3 text-cyan-400" />
                                  <span>BVAS Accredited</span>
                                </label>
                                <input
                                  type="number"
                                  value={bvasAccredited}
                                  onChange={(e) => setBvasAccredited(e.target.value)}
                                  className="w-full rounded-xl bg-slate-900 border-2 border-cyan-500/80 p-2 text-xs text-cyan-300 font-mono font-black"
                                  placeholder="Accredited"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300">
                            <strong>Note:</strong> The BVAS accredited count is the statutory legal ceiling. Total votes cast in Step 2 cannot exceed this number.
                          </div>

                          <button
                            type="button"
                            onClick={() => setEc8aStep(2)}
                            className="w-full flex items-center justify-center space-x-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-black text-white transition shadow-lg shadow-emerald-600/30"
                          >
                            <span>Next: Enter Party Scores</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* ── STEP 2: PARTY SCORES & ANTI-OVER-VOTING ENGINE ── */}
                      {ec8aStep === 2 && (
                        <div className="space-y-2.5">
                          
                          {/* ADC Row (Abubakar Malami SAN) */}
                          <div className="p-2.5 rounded-xl bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-between">
                            <div>
                              <span className="font-black text-emerald-300 text-xs block">ADC (Abubakar Malami, SAN 🤝)</span>
                              <span className="text-[9px] text-slate-400">African Democratic Congress</span>
                            </div>
                            <input
                              type="number"
                              value={adcVotes}
                              onChange={(e) => setAdcVotes(e.target.value)}
                              className="w-20 rounded-lg bg-slate-950 border-2 border-emerald-400 px-2 py-1 text-right text-sm font-black text-emerald-300 font-mono focus:outline-none"
                            />
                          </div>

                          {/* APC & PDP */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                              <label className="text-[10px] font-bold text-blue-400 block mb-0.5">APC (Nasir Idris)</label>
                              <input
                                type="number"
                                value={apcVotes}
                                onChange={(e) => setApcVotes(e.target.value)}
                                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-right font-mono text-white text-xs font-bold"
                              />
                            </div>
                            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                              <label className="text-[10px] font-bold text-purple-400 block mb-0.5">PDP (Aminu Bande)</label>
                              <input
                                type="number"
                                value={pdpVotes}
                                onChange={(e) => setPdpVotes(e.target.value)}
                                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-right font-mono text-white text-xs font-bold"
                              />
                            </div>
                          </div>

                          {/* Rejected Ballots */}
                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <label className="text-[10px] font-bold text-rose-400">Rejected / Spoilt Ballots:</label>
                            <input
                              type="number"
                              value={rejectedVotes}
                              onChange={(e) => setRejectedVotes(e.target.value)}
                              className="w-20 rounded-lg bg-slate-900 border border-rose-800 px-2 py-1 text-right font-mono text-rose-300 text-xs font-bold"
                            />
                          </div>

                          {/* ─────────────────────────────────────────────────────────────
                              THE ANTI-OVER-VOTING AUDIT CALCULATOR
                             ───────────────────────────────────────────────────────────── */}
                          <div className={`p-3 rounded-2xl border transition-all ${
                            isOverVoting 
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-pulse' 
                              : 'bg-slate-950 border-emerald-900/60 text-slate-300'
                          }`}>
                            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-800">
                              <span className="font-bold flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Anti-Over-Voting Audit</span>
                              </span>
                              <span className="font-mono text-[10px] text-cyan-400 font-bold">
                                BVAS Cap: {accreditedCount}
                              </span>
                            </div>

                            <div className="flex justify-between items-center pt-1.5 text-xs font-mono">
                              <span>Total Votes Cast (Valid + Rej):</span>
                              <span className={`font-black ${isOverVoting ? 'text-rose-400 text-sm' : 'text-white'}`}>
                                {totalVotesCast}
                              </span>
                            </div>

                            {/* Alert if Over-Voting occurs */}
                            {isOverVoting ? (
                              <div className="mt-2 pt-2 border-t border-rose-800 text-[10px] space-y-1.5">
                                <div className="flex items-center gap-1 text-rose-400 font-black">
                                  <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                                  <span>STATUTORY OVER-VOTING: +{overVotingDelta} VOTES!</span>
                                </div>
                                <p className="text-rose-200 leading-tight">
                                  Under <strong>Section 51(2) of Electoral Act 2022</strong>, election results in this polling unit are void and must be cancelled by the Presiding Officer!
                                </p>
                                <button
                                  type="button"
                                  onClick={handleDownloadProtestAffidavit}
                                  className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 shadow"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Download Section 51 Protest Affidavit</span>
                                </button>
                              </div>
                            ) : (
                              <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Zero Over-Voting: {accreditedCount - totalVotesCast} unvoted ballots</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEc8aStep(1)}
                              className="w-1/3 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setEc8aStep(3)}
                              className="w-2/3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-1"
                            >
                              <span>Next: EC8A Photo &amp; GPS</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ── STEP 3: FORM EC8A PHOTO & CRYPTOGRAPHIC TRANSMISSION ── */}
                      {ec8aStep === 3 && (
                        <div className="space-y-3">
                          
                          {/* Photo Capture Preview & Camera Trigger */}
                          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white font-bold block">
                                Snap Signed Form EC8A Sheet (Evidence Photo):
                              </span>
                              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
                                GPS &amp; Timestamp Locked
                              </span>
                            </div>

                            {/* Hidden Native File Input with capture="environment" for mobile camera */}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={handleNativeFileInput}
                              className="hidden"
                            />

                            <div 
                              onClick={() => !photoAttached && startCamera('environment')}
                              className={`h-44 rounded-2xl bg-slate-900 border-2 ${
                                photoAttached ? 'border-emerald-500/60' : 'border-dashed border-slate-700 hover:border-emerald-500/60 cursor-pointer'
                              } flex flex-col items-center justify-center text-slate-400 relative overflow-hidden transition group`}
                            >
                              {photoAttached ? (
                                <>
                                  <img
                                    src={photoPreviewUrl}
                                    alt="Form EC8A Scanned Copy"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5 text-[9px] font-mono text-emerald-300">
                                    <div className="flex items-center justify-between text-white font-bold">
                                      <span>INEC FORM EC8A EVIDENCE</span>
                                      <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">✓ VERIFIED</span>
                                    </div>
                                    <span className="text-slate-200">GPS: 12.4539° N, 4.1975° E &bull; Accuracy: ±2m</span>
                                    <span className="text-amber-300 font-bold">BVAS ID: KB-BVAS-BK-008 &bull; HASH: #EC8A-8994</span>
                                  </div>
                                </>
                              ) : (
                                <div className="text-center p-4 space-y-2">
                                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <Camera className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <span className="text-xs font-bold text-white block">Tap to Open Live Camera</span>
                                    <span className="text-[10px] text-slate-400">Position signed INEC Form EC8A sheet inside frame</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Capture & Retake Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => startCamera('environment')}
                                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/30 transition"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>{photoAttached ? 'Retake (Camera)' : 'Open Camera'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center space-x-1.5 transition"
                                  title="Snap using phone camera or choose from gallery"
                                >
                                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Phone File</span>
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={loadOfficialDemoSample}
                                className="text-[10px] text-amber-300 hover:text-amber-200 underline font-semibold transition"
                              >
                                Load Demo Sample Sheet
                              </button>
                            </div>
                          </div>

                          {/* Final Score Verification Summary */}
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-400">ADC (Malami):</span>
                              <span className="font-black text-emerald-400">{adcVotes} votes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">APC (Nasir Idris):</span>
                              <span className="text-blue-300">{apcVotes} votes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Total Valid Ballots:</span>
                              <span className="text-white">{validVotes} votes</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-800 pt-1">
                              <span className="text-slate-400">Total Cast / BVAS:</span>
                              <span className={isOverVoting ? 'text-rose-400 font-bold' : 'text-cyan-400 font-bold'}>
                                {totalVotesCast} / {accreditedCount}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEc8aStep(2)}
                              className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              disabled={isSubmittingResult}
                              onClick={handleFinalEC8ASubmit}
                              className={`w-2/3 py-2.5 rounded-xl text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg transition-all ${
                                isOverVoting 
                                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30' 
                                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
                              }`}
                            >
                              {isSubmittingResult ? (
                                <span>Cryptographic Transmitting...</span>
                              ) : (
                                <>
                                  <Send className="h-3.5 w-3.5" />
                                  <span>{isOverVoting ? 'Transmit Contested Ballot' : 'Certify & Transmit Form EEC8A'}</span>
                                </>
                              )}
                            </button>
                          </div>

                        </div>
                      )}
                    </>
                  )}

                </div>
              )}

            </div>

            {/* Bottom Security Footer */}
            <div className="pt-2 text-center text-[9px] text-slate-500 border-t border-slate-800 font-mono">
              Abubakar Malami SAN Situation Room &bull; Anti-Over-Voting Protocol v2.7
            </div>

          </div>

        </div>

        {/* Desktop Side Instructions & Legal Guidelines */}
        <div className="hidden lg:block max-w-sm space-y-4">
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="text-sm font-black text-white">Agent Operating Standards</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>6-Stage Workflow:</strong> Transmit each stage checkpoint (Setup, BVAS zero, 2:30 PM lock, Counting, EEC8A, and Escort).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Section 51 Anti-Over-Voting:</strong> Never accept or sign Form EC8A if Total Cast &gt; BVAS. The system will auto-flag over-voting.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Form EC8A Snapshot:</strong> Snap clear, legible photo of the signed duplicate sheet with GPS coordinate watermark.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Stage 6 Collation Escort:</strong> Physically accompany the Presiding Officer and ballot box to the Ward Collation Center (RAC).</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 rounded-3xl p-5 border border-emerald-900/50 space-y-2">
            <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
              Legal Shield Direct Line
            </h4>
            <p className="text-xs text-slate-300">
              Assigned Legal Lead: <strong className="text-white">Barr. Sanusi Dangaladima</strong>
            </p>
            <div className="font-mono text-xs text-emerald-400 font-bold">
              +234 803 111 8899 &bull; Situation Room Toll-Free: 0800-MALAMI-2027
            </div>
          </div>
        </div>

      </div>

      {/* ── LIVE CAMERA VIEWFINDER MODAL FOR DEMONSTRATION ── */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between animate-in fade-in">
          
          {/* Top Camera HUD Bar */}
          <div className="relative z-10 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between text-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <div className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                  <span>LIVE CAM &bull; INEC FORM EC8A SCANNER</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/40">
                    HD ACTIVE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  GPS: 12.4539° N, 4.1975° E &bull; {puCode}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={stopCamera}
              className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Viewfinder Center with Video Stream & Reticle Frame */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-slate-950">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Target Framing Box for Document */}
            <div className="absolute inset-x-6 inset-y-12 sm:inset-x-16 sm:inset-y-16 border-2 border-emerald-400/80 rounded-2xl pointer-events-none shadow-2xl flex flex-col justify-between p-3">
              <div className="flex justify-between text-[10px] font-mono text-emerald-400 font-bold bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm w-max">
                <span>ALIGN SIGNED FORM EC8A SHEET INSIDE FRAME</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-emerald-400/40 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-right text-[9px] font-mono text-amber-300 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm w-max ml-auto">
                <span>AUTO CRYPTOGRAPHIC WATERMARK EMBED ACTIVE</span>
              </div>
            </div>

            {/* Error Banner if permission denied */}
            {cameraError && (
              <div className="absolute inset-4 sm:inset-12 bg-slate-900/95 border-2 border-rose-500/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <AlertOctagon className="w-12 h-12 text-rose-400" />
                <div>
                  <h4 className="text-base font-bold text-white">Camera Access Notice</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm">{cameraError}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Use Phone Camera / File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      loadOfficialDemoSample();
                      stopCamera();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                  >
                    Load Demo Sample Sheet
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Shutter & Controls Bar */}
          <div className="relative z-10 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-around text-white">
            {/* Flip Camera */}
            <button
              type="button"
              onClick={flipCamera}
              className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-200 transition"
              title="Switch Camera (Front/Back)"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Shutter Button */}
            <button
              type="button"
              disabled={isCapturing}
              onClick={captureSnapshot}
              className="w-20 h-20 rounded-full bg-white p-1.5 shadow-2xl ring-4 ring-emerald-500/50 hover:ring-emerald-400 transition-all active:scale-95 disabled:opacity-50"
              title="Take Photo & Stamp GPS"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </button>

            {/* Native Picker Fallback */}
            <button
              type="button"
              onClick={() => {
                stopCamera();
                fileInputRef.current?.click();
              }}
              className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-200 transition"
              title="Open File Picker"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
