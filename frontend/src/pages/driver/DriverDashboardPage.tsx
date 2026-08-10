import React, { useState } from 'react';
import { PageHeader } from '../../components/common/headers/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/cards/Card';
import { Button } from '../../components/common/buttons/Button';
import { GoogleMap, GoogleMapsProvider, CustomMarkerData } from '../../maps';
import {
  Compass,
  Users,
  MapPin,
  Play,
  CheckCircle2,
  UserCheck,
  AlertTriangle,
  Building2,
  Navigation,
  Clock,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface DriverRouteStop {
  id: string;
  number: number;
  name: string;
  address: string;
  time: string;
  passengerCount: number;
  lat: number;
  lng: number;
  isOfficeDestination?: boolean;
  isCompleted?: boolean;
}

const ROUTE_STOPS: DriverRouteStop[] = [
  {
    id: 'stop-1',
    number: 1,
    name: 'Indiranagar Metro Station',
    address: '100 Feet Rd, Indiranagar',
    time: '08:30 AM',
    passengerCount: 14,
    lat: 12.9784,
    lng: 77.6408,
  },
  {
    id: 'stop-2',
    number: 2,
    name: 'Domlur Flyover Junction',
    address: 'Inner Ring Rd, Domlur',
    time: '08:42 AM',
    passengerCount: 12,
    lat: 12.9609,
    lng: 77.6387,
  },
  {
    id: 'stop-3',
    number: 3,
    name: 'Embassy GolfLinks Gate',
    address: 'Intermediate Ring Rd, EGL',
    time: '08:55 AM',
    passengerCount: 6,
    lat: 12.9515,
    lng: 77.6465,
  },
  {
    id: 'stop-office',
    number: 4,
    name: 'Tech Park Main Office HQ',
    address: 'Building 4B, Off-Go Corporate Campus',
    time: '09:15 AM',
    passengerCount: 32,
    lat: 12.9352,
    lng: 77.6942,
    isOfficeDestination: true,
  },
];

const VEHICLE_START_POSITION = { lat: 12.9716, lng: 77.5946 };

export const DriverDashboardPage: React.FC = () => {
  const [tripStarted, setTripStarted] = useState(false);
  const [completedStopIds, setCompletedStopIds] = useState<string[]>([]);
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  const handleToggleTrip = () => {
    const nextState = !tripStarted;
    setTripStarted(nextState);
    if (nextState) {
      toast.success('Shift started! Active navigation & office destination map loaded.');
    } else {
      toast.success('Shift ended! Telematics and trip summary logged.');
      setCompletedStopIds([]);
      setActiveStopIndex(0);
    }
  };

  const handleMarkStopComplete = (stopId: string) => {
    if (!completedStopIds.includes(stopId)) {
      setCompletedStopIds((prev) => [...prev, stopId]);
      setActiveStopIndex((prev) => Math.min(prev + 1, ROUTE_STOPS.length - 1));
      const stop = ROUTE_STOPS.find((s) => s.id === stopId);
      toast.success(`Completed stop: ${stop?.name}`);
    }
  };

  // Prepare map markers for vehicle, intermediate stops, and final office destination
  const mapMarkers: CustomMarkerData[] = [
    {
      id: 'vehicle-marker',
      position: VEHICLE_START_POSITION,
      title: 'Shuttle KA-01-MJ-8902',
      subtitle: 'Your Vehicle | Speed: 42 km/h | Status: Active Shift',
      iconType: 'shuttle',
      status: 'active',
      badgeText: 'KA-01',
    },
    ...ROUTE_STOPS.map((stop) => ({
      id: stop.id,
      position: { lat: stop.lat, lng: stop.lng },
      title: stop.isOfficeDestination ? `DESTINATION: ${stop.name}` : `Stop ${stop.number}: ${stop.name}`,
      subtitle: stop.isOfficeDestination
        ? `Corporate Office Campus | Dropoff Target: ${stop.time}`
        : `${stop.passengerCount} passengers boarding | ETA: ${stop.time}`,
      iconType: stop.isOfficeDestination ? ('stop' as const) : ('stop' as const),
      status: completedStopIds.includes(stop.id)
        ? ('completed' as const)
        : stop.isOfficeDestination
        ? ('active' as const)
        : ('idle' as const),
      badgeText: stop.isOfficeDestination ? 'OFFICE' : `STOP ${stop.number}`,
      color: stop.isOfficeDestination ? '#8b5cf6' : undefined,
    })),
  ];

  // Route Polyline
  const routePolyline = [
    {
      id: 'active-shift-route',
      path: [
        VEHICLE_START_POSITION,
        ...ROUTE_STOPS.map((s) => ({ lat: s.lat, lng: s.lng })),
      ],
      color: '#6366f1',
      weight: 5,
      opacity: 0.85,
    },
  ];

  const currentNextStop = ROUTE_STOPS[activeStopIndex] || ROUTE_STOPS[ROUTE_STOPS.length - 1];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Driver Shift Console"
        subtitle="Manage assigned shuttle KA-01-MJ-8902, active route navigation, and office dropoff."
        actions={
          <div className="flex items-center gap-2">
            <Link to="/driver/navigation">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Navigation className="w-4 h-4" />}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Open Navigation Console
              </Button>
            </Link>
            <Button
              variant={tripStarted ? 'danger' : 'outline'}
              size="md"
              onClick={handleToggleTrip}
              leftIcon={<Play className="w-4 h-4" />}
            >
              {tripStarted ? 'End Current Shift' : 'Start Quick Shift'}
            </Button>
          </div>
        }
      />

      {/* Top Banner Status when Shift Active */}
      {tripStarted && (
        <div className="p-4 rounded-2xl bg-indigo-900/90 dark:bg-indigo-950/90 text-white border border-indigo-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-600/50 border border-indigo-400/40 text-emerald-400">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  SHIFT ACTIVE
                </span>
                <span className="text-xs text-indigo-200">Route: Outer Ring Road Express</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Target Destination:{' '}
                <span className="text-indigo-200 font-extrabold underline decoration-indigo-400 decoration-2">
                  Tech Park Main Office HQ
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">NEXT WAYPOINT</span>
              <span className="font-bold text-white">{currentNextStop.name}</span>
            </div>
            <div className="px-2 py-1 rounded bg-indigo-600 text-white font-bold text-[11px]">
              {currentNextStop.time}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Interactive Route & Destination Map */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>
                  {tripStarted ? 'Live Shift Route & Stops Map' : 'Assigned Route Overview'}
                </span>
              </CardTitle>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Final Destination: Office
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Map Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[380px] bg-slate-900">
                <GoogleMapsProvider defaultTheme="dark">
                  <GoogleMap
                    center={{ lat: 12.96, lng: 77.64 }}
                    zoom={12}
                    theme="dark"
                    markers={mapMarkers}
                    polylines={routePolyline}
                    className="h-full w-full"
                  />
                </GoogleMapsProvider>

                {/* Overlaid Banner inside map */}
                <div className="absolute top-3 left-3 z-10 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs max-w-xs shadow-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>Office Destination Route</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {tripStarted
                      ? 'Displaying all 3 intermediate passenger boarding stops leading directly to Corporate Office HQ.'
                      : 'Click "Start Assigned Shift" to begin active turn-by-turn navigation.'}
                  </p>
                </div>

                {!tripStarted && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="p-3 rounded-full bg-indigo-600/30 border border-indigo-400/50 text-indigo-300">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <div className="space-y-1 max-w-sm">
                      <h4 className="text-base font-bold text-white">Shift Pending Start</h4>
                      <p className="text-xs text-slate-300">
                        Start your assigned shift to enable live GPS telematics, stop arrival tracking, and direct route guidance to the corporate office.
                      </p>
                    </div>
                    <Button variant="primary" size="md" onClick={handleToggleTrip} leftIcon={<Play className="w-4 h-4" />}>
                      Start Shift Now
                    </Button>
                  </div>
                )}
              </div>

              {/* Action Link to Employee Boarding List */}
              <Link to="/driver/checkin">
                <Button variant="outline" size="md" className="w-full" leftIcon={<UserCheck className="w-4 h-4" />}>
                  Open Stop-wise Employee Boarding List
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Detailed Stops Sequence List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Stops & Office Destination Schedule</span>
                </div>
                <span className="text-xs font-normal text-slate-500">
                  {completedStopIds.length} of {ROUTE_STOPS.length} Waypoints Completed
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {ROUTE_STOPS.map((stop, idx) => {
                const isCompleted = completedStopIds.includes(stop.id);
                const isCurrent = tripStarted && !isCompleted && activeStopIndex === idx;

                return (
                  <div
                    key={stop.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      stop.isOfficeDestination
                        ? 'bg-purple-500/10 border-purple-500/30 dark:bg-purple-950/30'
                        : isCurrent
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-sm'
                        : isCompleted
                        ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : stop.isOfficeDestination
                            ? 'bg-purple-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : stop.isOfficeDestination ? <Building2 className="w-4 h-4" /> : stop.number}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {stop.name}
                          </h4>
                          {stop.isOfficeDestination && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-600 text-white uppercase tracking-wider">
                              FINAL DESTINATION (OFFICE)
                            </span>
                          )}
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white animate-pulse">
                              NEXT STOP
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{stop.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      <div className="text-right">
                        <span className="text-xs font-bold block text-slate-900 dark:text-slate-100">
                          {stop.time}
                        </span>
                        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {stop.isOfficeDestination ? '32 Dropoffs' : `${stop.passengerCount} Boarding`}
                        </span>
                      </div>

                      {tripStarted && !isCompleted && (
                        <Button
                          size="sm"
                          variant={stop.isOfficeDestination ? 'primary' : 'outline'}
                          onClick={() => handleMarkStopComplete(stop.id)}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        >
                          {stop.isOfficeDestination ? 'Arrive at Office' : 'Complete Stop'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right 1-Col: Shift Telematics & Vehicle Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Vehicle & Shift Telematics</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 font-bold">
                  KA-01-MJ-8902
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Assigned Vehicle:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Volvo Electric Coach 2025
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Destination:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    Tech Park HQ (Office)
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Total Route Distance:</span>
                  <span className="font-bold">18.4 km</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Employee Boarding Status:</span>
                  <span className="font-bold text-indigo-600">32 / 38 Confirmed</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Speed Limit Governor:</span>
                  <span className="font-bold text-emerald-600">60 km/h Max</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Target Office Arrival:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">09:15 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/60">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Shift Protocol Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-trip vehicle safety inspection completed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GPS Telemetry & Speed Limiter online</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Office dropoff bay reservation confirmed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboardPage;

