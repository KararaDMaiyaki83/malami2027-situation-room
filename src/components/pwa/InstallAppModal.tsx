'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Monitor, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstallAppModal({ isOpen, onClose }: InstallAppModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'ANDROID' | 'IOS' | 'DESKTOP'>('ANDROID');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install the app on this device, use your browser menu (⋮ on Android, or Share icon on iOS) and tap "Add to Home Screen".');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative overflow-hidden text-slate-100">
        
        {/* Background glow */}
        <div className="absolute -right-12 -top-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Section with SAN Malami Photo Logo */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative inline-block">
            {/* The Official App Logo with SAN Malami Photo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mx-auto border-4 border-amber-400 shadow-2xl shadow-emerald-600/30 bg-slate-950">
              <img 
                src="/malami_logo.png" 
                alt="Abubakar Malami SAN CON App Logo" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -right-1 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-[9px] font-black border-2 border-slate-900 flex items-center gap-1 shadow">
              <ShieldCheck className="w-3 h-3" />
              <span>ADC 🤝</span>
            </div>
          </div>

          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OFFICIAL FIELD APP LOGO
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Malami 2027 Election Command
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
              Install the app directly to your mobile home screen. SAN Malami’s verified photo will serve as your home screen app icon for instant identification!
            </p>
          </div>
        </div>

        {/* Direct Install Button (If Browser PWA Prompt is Active) */}
        {deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Install Malami 2027 App Now</span>
          </button>
        )}

        {/* OS Platform Guides */}
        <div className="space-y-3">
          <div className="flex border-b border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('ANDROID')}
              className={`flex-1 pb-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'ANDROID'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android / Chrome</span>
            </button>
            <button
              onClick={() => setActiveTab('IOS')}
              className={`flex-1 pb-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'IOS'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone / Safari</span>
            </button>
            <button
              onClick={() => setActiveTab('DESKTOP')}
              className={`flex-1 pb-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'DESKTOP'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>PC / Laptop</span>
            </button>
          </div>

          {/* Android Steps */}
          {activeTab === 'ANDROID' && (
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Open this link in <strong>Google Chrome</strong> or <strong>Samsung Internet</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Tap the top-right menu button (<strong>⋮</strong> three vertical dots).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <span>The <strong>SAN Malami Photo Icon</strong> will immediately be pinned to your home screen!</span>
              </div>
            </div>
          )}

          {/* iOS Steps */}
          {activeTab === 'IOS' && (
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Open this link in <strong>Safari</strong> on your iPhone or iPad.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Tap the <strong>Share</strong> button (box with an arrow pointing up <Share2 className="w-3.5 h-3.5 inline text-blue-400" />).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Scroll down and tap <strong>"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-emerald-400" />).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <span>Tap <strong>"Add"</strong> in the top right. SAN Malami’s portrait will appear as the app logo.</span>
              </div>
            </div>
          )}

          {/* Desktop Steps */}
          {activeTab === 'DESKTOP' && (
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>In <strong>Google Chrome</strong>, <strong>Edge</strong>, or <strong>Brave</strong>, look at the URL address bar.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Click the <strong>Install</strong> icon (<Download className="w-3.5 h-3.5 inline text-emerald-400" />) on the right side of the address bar.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>The desktop app launches as an independent window with SAN Malami in your dock/taskbar!</span>
              </div>
            </div>
          )}
        </div>

        {/* Hausa Note for Field Agents */}
        <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-200 leading-relaxed">
          <strong>Ga Wakilan Rumfunan Zabe (Hausa):</strong><br />
          Bayan an sauke wannan manhaja, hoton <strong>SAN Malami</strong> zai fito fili a fuskar wayarku (Home screen) don gane ta cikin sauki a ranar zabe.
        </div>

        {/* Technical Partner Endorsement */}
        <div className="pt-1 text-center space-y-1.5">
          <div className="text-[10px] text-slate-400">Powered by</div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
            <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              GetoCore Digital Innovation
            </span>
            <span className="text-slate-500 font-normal">🤝</span>
            <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
              TEEM TECH Solution
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            Lead IT Technical Officer: <strong className="text-emerald-300">Fatima Sulaiman Umar</strong>
          </div>
          <div className="text-[10px] text-amber-300 font-mono">
            Support Hotlines: <a href="tel:08035533332" className="hover:underline">08035533332</a> / <a href="tel:09035328748" className="hover:underline">09035328748</a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
        >
          Close Preview
        </button>

      </div>
    </div>
  );
}
