'use client';

import React, { useState } from 'react';
import { BroadcastLog } from '@/types/election';
import { 
  Radio, 
  Send, 
  Smartphone, 
  MessageSquare, 
  Wifi, 
  CheckCheck, 
  Users, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface StatewideCommsHubProps {
  broadcasts: BroadcastLog[];
  onSendBroadcast: (target: string, msg: string, channel: 'SMS_GATEWAY' | 'APP_PUSH' | 'VHF_RADIO') => void;
}

export function StatewideCommsHub({ broadcasts, onSendBroadcast }: StatewideCommsHubProps) {
  const [targetGroup, setTargetGroup] = useState<string>('ALL 3,745 Polling Unit Agents');
  const [messageText, setMessageText] = useState<string>('');
  const [channel, setChannel] = useState<'SMS_GATEWAY' | 'APP_PUSH' | 'VHF_RADIO'>('SMS_GATEWAY');
  const [broadcastSentNotification, setBroadcastSentNotification] = useState<boolean>(false);

  const incomingFeed = [
    { id: 1, sender: 'Agent Garba (PU 21-01-04-002, Dangaladima)', time: '2 mins ago', msg: 'Form EC8A concluded and signed. ADC: 212, APC: 95. BIVAS accredited count was 310. Result dispatched.' },
    { id: 2, sender: 'Paralegal Usman (Ward Collation Desk, Birnin Kebbi)', time: '5 mins ago', msg: 'All 15 PU agents arrived at RAC hall. Ward collation Form EC8B currently being compiled. No arithmetic discrepancy.' },
    { id: 3, sender: 'Agent Bitrus (PU 21-18-01-004, Sakaba)', time: '9 mins ago', msg: 'Voter turnout reached 65%. Zero invalid ballots thanks to the vertical-fold practice tutorials.' },
    { id: 4, sender: 'Barr. Yohanna (LGA Legal Lead, Danko/Wasagu)', time: '14 mins ago', msg: 'Security situation calm. Police escort secured for all rural PU ballot boxes moving to Ribah collation hall.' }
  ];

  const handleSend = () => {
    if (!messageText.trim()) return;
    onSendBroadcast(targetGroup, messageText, channel);
    setMessageText('');
    setBroadcastSentNotification(true);
    setTimeout(() => setBroadcastSentNotification(false), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* COMMS OVERVIEW HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="max-w-3xl space-y-1.5">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Multi-Tier Communication Network
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            100% Guaranteed Field Connectivity Across All 3,745 Polling Units
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminating communication blackouts through a triple-redundancy architecture combining 
            high-speed mobile apps, automated USSD/SMS gateways, and solar-powered tactical VHF radio repeaters.
          </p>
        </div>

        {/* 3-Tier Connectivity Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" /> Tier 1: Encrypted App (4G/3G)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
            </div>
            <div className="text-xl font-black text-white font-mono">2,620 PUs (70.0%)</div>
            <div className="text-[10px] text-slate-400">Birnin Kebbi, Jega, Aliero, Argungu, Zuru urban hubs</div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Tier 2: USSD & SMS Gateway
              </span>
              <span className="text-[10px] text-amber-400 font-mono">ONLINE</span>
            </div>
            <div className="text-xl font-black text-white font-mono">980 PUs (26.2%)</div>
            <div className="text-[10px] text-slate-400">Automated string syntax (`*384*2027#`) for 2G rural zones</div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> Tier 3: Tactical VHF Repeaters
              </span>
              <span className="text-[10px] text-blue-400 font-mono">ONLINE</span>
            </div>
            <div className="text-xl font-black text-white font-mono">145 PUs (3.8%)</div>
            <div className="text-[10px] text-slate-400">Riverine Bagudo & forested Sakaba/Wasagu border outposts</div>
          </div>
        </div>
      </div>

      {/* TWO-WAY COMMS CONSOLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Broadcast Sender Console */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              Statewide Direct Broadcast Console
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">SECURE PORT 8088</span>
          </div>

          {broadcastSentNotification && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Broadcast dispatched successfully to recipient group!</span>
            </div>
          )}

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">1. Target Recipient Group:</label>
              <select 
                value={targetGroup}
                onChange={(e) => setTargetGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option>ALL 3,745 Polling Unit Agents</option>
                <option>225 Ward Collation Paralegals</option>
                <option>42 LGA Litigation Counsels ("Malami Legal Shield")</option>
                <option>Kebbi Central Fortress Wards (89 Wards)</option>
                <option>Kebbi South Security Frontline Agents (70 Wards)</option>
                <option>Kebbi North Border PUs (66 Wards)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">2. Transmission Channel Layer:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'SMS_GATEWAY', label: 'SMS Gateway' },
                  { id: 'APP_PUSH', label: 'App Push' },
                  { id: 'VHF_RADIO', label: 'VHF Radio' }
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChannel(c.id as any)}
                    className={`p-2 rounded-lg text-center font-medium border transition-all ${
                      channel === c.id 
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">3. Message Directive (Auto-Hausa Translation Active):</label>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
                placeholder="Type directive, e.g.: 'CRITICAL DIRECTIVE: Form EC8A must be snapped and uploaded immediately before leaving PU. Escort ballot box to Ward RAC!'"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Transmit Direct Broadcast
            </button>
          </div>
        </div>

        {/* Live Incoming Agent Messages Stream */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div>
              <h3 className="font-bold text-white text-base">Incoming Agent Message Stream</h3>
              <p className="text-xs text-slate-400">Live check-ins and verified result signals from all 21 LGAs</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              Port: Active
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto text-xs pr-1">
            {incomingFeed.map(feed => (
              <div key={feed.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-emerald-400">{feed.sender}</span>
                  <span className="font-mono text-slate-500">{feed.time}</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">{feed.msg}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
