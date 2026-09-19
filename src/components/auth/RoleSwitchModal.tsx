'use client';

import React from 'react';
import { AppUser, INITIAL_USERS } from '@/types/auth';
import { ShieldCheck, UserCheck, Scale, Landmark, Smartphone, X } from 'lucide-react';

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AppUser;
  onSelectUser: (user: AppUser) => void;
}

export function RoleSwitchModal({
  isOpen,
  onClose,
  currentUser,
  onSelectUser
}: RoleSwitchModalProps) {
  if (!isOpen) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SAN_MALAMI_EXECUTIVE': return Landmark;
      case 'SITUATION_ROOM_DIRECTOR': return ShieldCheck;
      case 'LGA_LEGAL_LEAD': return Scale;
      case 'WARD_SUPERVISOR': return UserCheck;
      case 'PU_AGENT': return Smartphone;
      default: return UserCheck;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Switch Operational Persona</h3>
            <p className="text-xs text-slate-400">Select any role to test its specific views, authorities, and dashboards</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-750 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {INITIAL_USERS.map((user) => {
            const Icon = getRoleIcon(user.role);
            const isSelected = currentUser.id === user.id;

            return (
              <button
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isSelected 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-white' 
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      {user.name}
                      {isSelected && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{user.title}</div>
                    <div className="text-[10px] text-slate-500">{user.assignedLGA} • {user.badgeNumber}</div>
                  </div>
                </div>

                <span className="text-xs font-mono text-emerald-400">Select →</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
          <strong>Tip for SAN Malami Presentation:</strong> You can switch between <em>SAN Malami Executive</em>, <em>Situation Room Director</em>, and <em>PU Agent PWA</em> to showcase the full end-to-end election day experience!
        </div>
      </div>
    </div>
  );
}
