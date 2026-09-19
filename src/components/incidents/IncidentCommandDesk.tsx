'use client';

import React, { useState } from 'react';
import { IncidentReport, IncidentSeverity } from '@/types/election';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  User, 
  Scale, 
  Send,
  Filter
} from 'lucide-react';

interface IncidentCommandDeskProps {
  incidents: IncidentReport[];
  onResolveIncident: (id: string, action: string) => void;
  onDispatchLegal: (id: string, counselName: string) => void;
}

export function IncidentCommandDesk({
  incidents,
  onResolveIncident,
  onDispatchLegal
}: IncidentCommandDeskProps) {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'MAJOR' | 'RESOLVED'>('ALL');
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [actionInput, setActionInput] = useState<string>('');

  const filtered = incidents.filter(i => {
    if (filter === 'ALL') return true;
    if (filter === 'CRITICAL') return i.severity === 'CRITICAL' && i.status !== 'RESOLVED';
    if (filter === 'MAJOR') return i.severity === 'MAJOR' && i.status !== 'RESOLVED';
    if (filter === 'RESOLVED') return i.status === 'RESOLVED';
    return true;
  });

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* INCIDENT COMMAND HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Live Field Incident Triage Stream
            </span>
            {criticalCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                {criticalCount} Critical SOS Alerts
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Rapid Response & Legal Shield Intervention Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of over-voting attempts, BIVAS device stalls, agent intimidation, and collation disruptions.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 shrink-0">
          {(['ALL', 'CRITICAL', 'MAJOR', 'RESOLVED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === f 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f === 'ALL' ? 'All Incidents' : f}
            </button>
          ))}
        </div>
      </div>

      {/* INCIDENTS FEED LIST */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
            No incidents currently matching filter "{filter}".
          </div>
        ) : (
          filtered.map(inc => {
            let severityBadge = "bg-rose-500/20 text-rose-400 border-rose-500/30";
            if (inc.severity === 'MAJOR') severityBadge = "bg-amber-500/20 text-amber-400 border-amber-500/30";
            if (inc.severity === 'MINOR') severityBadge = "bg-blue-500/20 text-blue-400 border-blue-500/30";
            if (inc.status === 'RESOLVED') severityBadge = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

            return (
              <div 
                key={inc.id}
                className={`p-4 bg-slate-900 border rounded-xl space-y-2.5 transition-all ${
                  inc.status !== 'RESOLVED' && inc.severity === 'CRITICAL' 
                    ? 'border-rose-500/40 bg-rose-950/10 shadow-lg shadow-rose-950/20' 
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${severityBadge}`}>
                      {inc.status === 'RESOLVED' ? 'RESOLVED' : inc.severity}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{inc.id}</span>
                    <h3 className="font-bold text-white text-sm sm:text-base">{inc.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{inc.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {inc.description}
                </p>

                {/* Location & Reporter Details */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>{inc.lgaName} LGA</strong> ({inc.wardName}{inc.puCode ? ` • ${inc.puCode}` : ''})
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      {inc.reportedBy} ({inc.reporterPhone})
                    </span>
                  </div>

                  {/* Actions & Legal Dispatch */}
                  <div className="flex items-center gap-2">
                    {inc.legalCounselAssigned && (
                      <span className="text-emerald-300 text-xs font-medium flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-emerald-400" />
                        Assigned: <strong>{inc.legalCounselAssigned}</strong>
                      </span>
                    )}

                    {inc.status !== 'RESOLVED' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onDispatchLegal(inc.id, `Barr. Bello (${inc.lgaName})`)}
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] flex items-center gap-1"
                        >
                          <Scale className="w-3 h-3" /> Dispatch Legal
                        </button>
                        <button
                          onClick={() => onResolveIncident(inc.id, 'Resolved and verified on-site by ADC field marshal.')}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Mark Resolved
                        </button>
                      </div>
                    ) : (
                      <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Action Logged
                      </span>
                    )}
                  </div>
                </div>

                {inc.actionTaken && (
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-300/90 font-mono">
                    <strong>Resolution Record:</strong> {inc.actionTaken}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
