import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { Card, CardContent } from '../../components/common/cards/Card';
import { Bus, CheckCircle2, ShieldCheck, MapPin, User, Clock, Calendar } from 'lucide-react';

export const EmployeePassPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 flex flex-col items-center">
      <PageHeader
        title="Digital Boarding Pass"
        subtitle="Your confirmed shuttle commute pass for today's office shift."
      />

      <Card className="max-w-md w-full bg-slate-900 text-white border-slate-800 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Bus className="w-5 h-5 text-indigo-400" />
            <span className="font-extrabold text-sm text-white">OFF-GO BOARDING PASS</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            CONFIRMED
          </span>
        </div>

        {/* Seat Badge */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Seat</span>
          <h3 className="text-3xl font-black text-indigo-400 font-mono">SEAT 14A</h3>
          <p className="text-xs text-slate-300 font-medium">Front Window &bull; Priority Boarding</p>
        </div>

        {/* Commute Details */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-indigo-400" /> Passenger</span>
            <span className="font-bold text-white">Sarah Jenkins (EMP-1102)</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 flex items-center gap-1.5"><Bus className="w-3.5 h-3.5 text-blue-400" /> Route</span>
            <span className="font-bold text-white">Outer Ring Road Express</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Pickup Stop</span>
            <span className="font-bold text-white">Indiranagar Metro (08:30 AM)</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-800/40 rounded-xl">
            <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Pass Ref</span>
            <span className="font-mono font-bold text-indigo-400">OG-2026-9021-X</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" /> Verified Corporate Commute Pass
        </div>
      </Card>
    </div>
  );
};

