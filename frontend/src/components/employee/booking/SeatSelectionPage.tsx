import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Bus,
  CheckCircle,
  QrCode,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { VehicleInfoCard } from './VehicleInfoCard';
import { SeatLayout } from './SeatLayout';
import { SeatLegend } from './SeatLegend';
import { BookingSummaryCard } from './BookingSummaryCard';
import { useAvailableSeats, useSeatSelection, useConfirmBooking } from '../../../hooks/useSeatSelection';
import { SeatItem, SeatBookingPayload } from '../../../types';
import toast from 'react-hot-toast';

const mockRoutes = [
  {
    id: 'rt-101',
    code: 'ORR-EX-01',
    name: 'Outer Ring Road Express (Silk Board → Hebbal HQ)',
    vehicleId: 'shuttle-101',
    vehicleNumber: 'OFF-GO-101',
    shuttleName: 'Mercedes Sprinter Van 2500',
    driverName: 'David Miller',
    eta: '42 mins',
    stops: [
      { id: 'stp-1', name: 'Indiranagar Metro Station (08:30 AM)' },
      { id: 'stp-2', name: 'Domlur Flyover Transit Stop (08:42 AM)' },
      { id: 'stp-3', name: 'Marathahalli Junction (08:55 AM)' },
      { id: 'stp-4', name: 'Off-Go Innovation HQ Terminal (09:15 AM)' },
    ],
  },
  {
    id: 'rt-102',
    code: 'WF-TC-02',
    name: 'Whitefield Tech Corridor Line (Indiranagar → ITPL)',
    vehicleId: 'shuttle-102',
    vehicleNumber: 'OFF-GO-104',
    shuttleName: 'BYD K9 Electric Shuttle Bus',
    driverName: 'Robert Thorne',
    eta: '35 mins',
    stops: [
      { id: 'stp-10', name: 'Koramangala 5th Block Hub (08:00 AM)' },
      { id: 'stp-11', name: 'HSR BDA Complex (08:15 AM)' },
      { id: 'stp-12', name: 'ITPL Main Gate (08:45 AM)' },
    ],
  },
  {
    id: 'rt-103',
    code: 'EC-DIR-03',
    name: 'Electronic City Direct Express (Koramangala → Infosys)',
    vehicleId: 'shuttle-103',
    vehicleNumber: 'OFF-GO-108',
    shuttleName: 'Volvo B7R Executive Coach',
    driverName: 'Elena Rostova',
    eta: '28 mins',
    stops: [
      { id: 'stp-20', name: 'Silk Board Junction (07:45 AM)' },
      { id: 'stp-21', name: 'Electronic City Phase 1 (08:15 AM)' },
    ],
  },
];

const shiftTimeSlots = [
  { id: 'shift-1', label: 'Morning Shift 1', time: '07:30 AM', available: 12 },
  { id: 'shift-2', label: 'Morning Shift 2', time: '08:30 AM', available: 8 },
  { id: 'shift-3', label: 'Morning Shift 3', time: '09:30 AM', timeLabel: '09:30 AM', available: 15 },
  { id: 'shift-4', label: 'Evening Shift 1', time: '05:30 PM', timeLabel: '05:30 PM', available: 10 },
  { id: 'shift-5', label: 'Evening Shift 2', time: '06:30 PM', timeLabel: '06:30 PM', available: 14 },
];

export const SeatSelectionPage: React.FC = () => {
  // Step State: 1 = Route & Shift Selection, 2 = Seat Selection Layout & Confirmation, 3 = Digital Ticket Pass Issued
  const [activeStep, setActiveStep] = useState<number>(1);

  // Selection Inputs
  const [selectedRouteId, setSelectedRouteId] = useState<string>('rt-101');
  const [selectedShift, setSelectedShift] = useState<string>('08:30 AM');
  const [travelDate, setTravelDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [pickupStopId, setPickupStopId] = useState<string>('stp-1');
  const [dropStopId, setDropStopId] = useState<string>('stp-4');

  // Confirmation Pass State
  const [bookingPass, setBookingPass] = useState<{
    bookingCode: string;
    passId: string;
    seatNumber: string;
    routeName: string;
    travelDate: string;
    shiftTime: string;
    pickupStop: string;
    dropStop: string;
    vehicleNumber: string;
  } | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  // Active Route Object
  const currentRoute = mockRoutes.find((r) => r.id === selectedRouteId) || mockRoutes[0];

  // Fetch Seat Layout for selected shuttle
  const { data: seatLayout, isLoading: isLayoutLoading, refetch } = useAvailableSeats(
    currentRoute.vehicleId,
    currentRoute.shuttleName,
    currentRoute.vehicleNumber,
    currentRoute.driverName
  );

  // Seat Selection hook
  const { selectedSeat, selectSeat, clearSelection } = useSeatSelection();

  // Confirm booking mutation hook
  const confirmMutation = useConfirmBooking();

  // Auto update pickup & drop stops when route changes
  useEffect(() => {
    if (currentRoute.stops.length >= 2) {
      setPickupStopId(currentRoute.stops[0].id);
      setDropStopId(currentRoute.stops[currentRoute.stops.length - 1].id);
    }
  }, [selectedRouteId]);

  // Handle proceed to seat layout view
  const handleProceedToSeats = () => {
    setValidationError(null);
    clearSelection();
    setActiveStep(2);
  };

  // Handle confirm seat booking
  const handleConfirmBooking = async () => {
    if (!selectedSeat) {
      setValidationError('Please select a seat from the shuttle layout before confirming.');
      return;
    }

    setValidationError(null);

    const pickupObj = currentRoute.stops.find((s) => s.id === pickupStopId);
    const dropObj = currentRoute.stops.find((s) => s.id === dropStopId);

    const payload: SeatBookingPayload = {
      routeId: currentRoute.id,
      routeName: currentRoute.name,
      shuttleId: currentRoute.vehicleId,
      shuttleNumber: currentRoute.vehicleNumber,
      travelDate,
      shiftTime: selectedShift,
      pickupStopId,
      pickupStopName: pickupObj ? pickupObj.name : 'Selected Stop',
      dropStopId,
      dropStopName: dropObj ? dropObj.name : 'Off-Go HQ Terminal',
      seatNumber: selectedSeat.seatNumber,
      seatCategory: selectedSeat.category,
      employeeId: 'emp-curr-01',
      employeeName: 'Alexander Wright',
    };

    try {
      const res = await confirmMutation.mutateAsync(payload);
      setBookingPass({
        bookingCode: res.bookingCode,
        passId: res.passId,
        seatNumber: selectedSeat.seatNumber,
        routeName: currentRoute.name,
        travelDate,
        shiftTime: selectedShift,
        pickupStop: pickupObj ? pickupObj.name : 'Selected Pickup',
        dropStop: dropObj ? dropObj.name : 'Destination Stop',
        vehicleNumber: currentRoute.vehicleNumber,
      });
      setActiveStep(3);
    } catch (err: any) {
      setValidationError(err.message || 'Seat reservation failed. Please pick another seat.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* STEP PROGRESS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs">
          {[
            { step: 1, label: '1. Route & Shift' },
            { step: 2, label: '2. Interactive Seat Map' },
            { step: 3, label: '3. Boarding Pass Issued' },
          ].map((s) => {
            const isActive = activeStep === s.step;
            const isCompleted = activeStep > s.step;
            return (
              <div
                key={s.step}
                className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-500'
                }`}
              >
                <span>{s.label}</span>
                {isCompleted && <CheckCircle className="w-3.5 h-3.5" />}
              </div>
            );
          })}
        </div>

        {activeStep === 2 && (
          <button
            onClick={() => setActiveStep(1)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Route</span>
          </button>
        )}
      </div>

      {/* STEP 1: ROUTE, SHIFT & STOP SELECTION */}
      {activeStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Route Selection */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Bus className="w-5 h-5 text-indigo-400" /> Select Shuttle Route
                </h3>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  {mockRoutes.length} Express Routes
                </span>
              </div>

              <div className="space-y-3">
                {mockRoutes.map((route) => {
                  const isSelected = selectedRouteId === route.id;
                  return (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border-blue-500 ring-1 ring-blue-500/50 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                          {route.code}
                        </span>
                        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Shuttle: {route.vehicleNumber}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-100">{route.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>Vehicle: <strong className="text-slate-300">{route.shuttleName}</strong></span>
                        <span>&bull;</span>
                        <span>Driver: <strong className="text-slate-300">{route.driverName}</strong></span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date & Shift Selection */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Clock className="w-5 h-5 text-emerald-400" /> Select Date & Shift Time
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Commute Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Shift Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {shiftTimeSlots.map((shift) => (
                      <button
                        type="button"
                        key={shift.id}
                        onClick={() => setSelectedShift(shift.time)}
                        className={`p-2 rounded-xl border text-xs text-center transition-all ${
                          selectedShift === shift.time
                            ? 'bg-blue-600 border-blue-400 text-white font-bold shadow-md shadow-blue-500/30'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>{shift.time}</div>
                        <span className="text-[10px] text-emerald-400 font-mono block">
                          {shift.available} Seats
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stop Pickers & Action */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <MapPin className="w-5 h-5 text-rose-400" /> Select Boarding & Drop Stops
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Pickup Boarding Stop
                  </label>
                  <select
                    value={pickupStopId}
                    onChange={(e) => setPickupStopId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {currentRoute.stops.map((stop) => (
                      <option key={stop.id} value={stop.id}>
                        {stop.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Drop-off Destination
                  </label>
                  <select
                    value={dropStopId}
                    onChange={(e) => setDropStopId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {currentRoute.stops.map((stop) => (
                      <option key={stop.id} value={stop.id}>
                        {stop.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToSeats}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mt-4 cursor-pointer transition-all"
              >
                <span>View Interactive Seat Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE SEAT SELECTION & SUMMARY */}
      {activeStep === 2 && (
        <div className="space-y-6">
          {/* Top Vehicle Info Banner */}
          {seatLayout && <VehicleInfoCard layout={seatLayout} />}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Main Column: Overhead Seat Layout & Legend (Desktop: 7 or 8 cols, Mobile: full width) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {isLayoutLoading ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">Loading real-time shuttle seat map...</p>
                </div>
              ) : seatLayout ? (
                <>
                  <SeatLayout
                    layout={seatLayout}
                    selectedSeat={selectedSeat}
                    onSelectSeat={selectSeat}
                  />

                  {/* Seat Legend */}
                  <SeatLegend />
                </>
              ) : null}
            </div>

            {/* Right Column: Booking Summary Card (Sticky Desktop / Scrollable) */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-4">
              <BookingSummaryCard
                shuttleName={currentRoute.shuttleName}
                vehicleNumber={currentRoute.vehicleNumber}
                routeName={currentRoute.name}
                pickupStopName={
                  currentRoute.stops.find((s) => s.id === pickupStopId)?.name || 'Boarding Stop'
                }
                dropStopName={
                  currentRoute.stops.find((s) => s.id === dropStopId)?.name || 'Destination Stop'
                }
                shiftTime={selectedShift}
                travelDate={travelDate}
                selectedSeat={selectedSeat}
                isSubmitting={confirmMutation.isPending}
                onConfirmBooking={handleConfirmBooking}
                validationError={validationError}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DIGITAL TICKET & BOARDING PASS CONFIRMATION */}
      {activeStep === 3 && bookingPass && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Reservation Confirmed & Pass Issued
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2">
              Seat #{bookingPass.seatNumber} Locked!
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Show this digital QR code to your shuttle driver upon boarding.
            </p>
          </div>

          {/* Ticket Card Details */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 block">PASSENGER</span>
                <span className="font-bold text-slate-100 text-sm">Alexander Wright</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">BOOKING REF</span>
                <span className="font-bold text-indigo-400">{bookingPass.bookingCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 block">SEAT NUMBER</span>
                <span className="font-black text-xl text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                  {bookingPass.seatNumber}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">VEHICLE NO.</span>
                <span className="font-bold text-slate-200 text-sm">{bookingPass.vehicleNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 block">DATE</span>
                <span className="font-bold text-slate-200">{bookingPass.travelDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">SHIFT TIME</span>
                <span className="font-bold text-emerald-400">{bookingPass.shiftTime}</span>
              </div>
            </div>

            {/* QR Mock code */}
            <div className="pt-2 flex flex-col items-center justify-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <QrCode className="w-24 h-24 text-slate-200" />
              <span className="text-[10px] text-slate-400 mt-2">Pass ID: {bookingPass.passId}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setActiveStep(1);
                setBookingPass(null);
                clearSelection();
              }}
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
            >
              Book Another Shuttle
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
