import React from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { LiveShuttleMap } from '../../components/common/maps/LiveShuttleMap';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/cards/Card';
import { Shuttle } from '../../types';
import { Bus, MapPin, Clock } from 'lucide-react';

const mockTrackedShuttle: Shuttle = {
  id: 's1',
  vehicleNumber: 'KA-01-MJ-8902',
  model: 'Volvo 9400 Electric Bus',
  capacity: 42,
  occupancy: 38,
  driverName: 'Michael Vance',
  driverPhone: '+91 98765 43210',
  routeName: 'Outer Ring Road Express',
  routeId: 'r1',
  currentLocation: { lat: 12.9716, lng: 77.5946, address: 'Silk Board Junction' },
  speedKmH: 48,
  status: 'ON_TIME',
  nextStop: 'Indiranagar Metro (Your Pickup)',
  etaNextStopMinutes: 4,
  fuelLevelPercent: 88,
  lastUpdated: new Date().toISOString(),
};

export const EmployeeTrackPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Track My Shuttle"
        subtitle="Live GPS telematics stream for your assigned shuttle KA-01-MJ-8902."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveShuttleMap
            shuttles={[mockTrackedShuttle]}
            selectedShuttleId={mockTrackedShuttle.id}
            className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          />
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bus className="w-5 h-5 text-indigo-500" /> ETA & Shuttle Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                ESTIMATED ARRIVAL
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-white">4 Minutes</div>
              <p className="text-xs text-slate-500">Approaching Indiranagar Metro Stop</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Speed:</span>
                <span className="font-bold">{mockTrackedShuttle.speedKmH} km/h</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Driver:</span>
                <span className="font-bold">{mockTrackedShuttle.driverName}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
