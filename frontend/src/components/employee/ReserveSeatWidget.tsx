import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/cards/Card';
import { Button } from '../common/buttons/Button';
import { Calendar, MapPin, Bus, Search, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { stopService } from '../../services/stopService';
import { routeService } from '../../services/routeService';
import toast from 'react-hot-toast';

export const ReserveSeatWidget: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [availableStops, setAvailableStops] = useState<string[]>([]);
  const [availableRoutes, setAvailableRoutes] = useState<string[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [stops, routes] = await Promise.all([
          stopService.getStops(),
          routeService.getRoutes(),
        ]);

        const stopNames = stops.map((s) => s.name);
        const routeNames = routes.map((r) => `${r.code || 'RT'} - ${r.name}`);

        setAvailableStops(stopNames.length > 0 ? stopNames : [
          'Financial District Terminal',
          'Montgomery BART Transit Gate',
          'SOMA Tech Plaza Stop',
          'Corporate HQ Terminal'
        ]);

        setAvailableRoutes(routeNames.length > 0 ? routeNames : [
          'RT-EX-01 - HQ Financial District Express Line A',
          'RT-NO-02 - North Tech Corridor B',
          'RT-SO-03 - Metro South Loop C'
        ]);

        if (stopNames.length > 0) {
          setPickup(stopNames[0]);
          setDrop(stopNames[stopNames.length - 1]);
        }
        if (routeNames.length > 0) {
          setSelectedRoute(routeNames[0]);
        }
      } catch (e) {
        console.error('Error loading options in ReserveSeatWidget:', e);
      }
    };
    loadOptions();
  }, []);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success(`Seat reserved for ${selectedRoute || 'Commute Route'} on ${date}!`);
      navigate(`/employee/booking?pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&date=${date}`);
    }, 600);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border-indigo-500/30 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Quick Shuttle Reservation
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Reserve Your Commute Seat
            </h2>
            <p className="text-xs text-slate-300">
              Select date, stops, and route to lock in guaranteed corporate shuttle seating.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 100% Employer Subsidized
          </div>
        </div>

        <form onSubmit={handleReserve} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Select Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono shadow-inner"
            />
          </div>

          {/* Pickup Stop */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Pickup Stop
            </label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
            >
              {availableStops.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Drop Stop */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Drop Stop
            </label>
            <select
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
            >
              {availableStops.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Available Routes & Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-blue-400" /> Available Routes
            </label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner truncate"
            >
              {availableRoutes.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Action Row */}
          <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-time availability update &bull; Instant Confirmation</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSearching}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25 px-6 font-bold"
            >
              Reserve Seat Now
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
