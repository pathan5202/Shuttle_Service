import { useState, useEffect, useCallback } from 'react';
import {
  driverNavigationService,
  DriverTripNavigationState,
  DriverNavigationStop,
} from '../services/driverNavigationService';
import toast from 'react-hot-toast';

/**
 * Hook to manage the driver's current trip state & live telemetry
 */
export function useCurrentTrip() {
  const [trip, setTrip] = useState<DriverTripNavigationState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTrip = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await driverNavigationService.getCurrentTrip();
      setTrip(data);
    } catch {
      toast.error('Failed to load active driver trip.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTrip();
  }, [refreshTrip]);

  return { trip, setTrip, isLoading, refreshTrip };
}

/**
 * Hook to manage driver navigation route stops, active stop, and office destination
 */
export function useDriverRoute(trip: DriverTripNavigationState | null) {
  const stops: DriverNavigationStop[] = trip?.stops || [];
  const activeStopIndex = trip?.activeStopIndex ?? 0;
  const currentStop = stops[activeStopIndex] || null;
  const nextStop = stops[activeStopIndex + 1] || null;
  const officeDestination = trip?.officeDestination || {
    name: 'Tech Park Main Office HQ',
    address: 'Building 4B, Off-Go Corporate Campus',
    lat: 12.9352,
    lng: 77.6942,
  };

  return {
    stops,
    activeStopIndex,
    currentStop,
    nextStop,
    officeDestination,
  };
}

/**
 * Hook to handle trip execution controls (Start Shift, Mark Completed, Pause, Resume, End)
 */
export function useNavigation(onStateChange?: (updatedTrip: DriverTripNavigationState) => void) {
  const [isProcessing, setIsProcessing] = useState(false);

  const startShift = useCallback(async () => {
    setIsProcessing(true);
    try {
      const updated = await driverNavigationService.startShift();
      toast.success('Shift started! Navigation route loaded to Office HQ.');
      if (onStateChange) onStateChange(updated);
      return updated;
    } catch {
      toast.error('Failed to start shift.');
    } finally {
      setIsProcessing(false);
    }
  }, [onStateChange]);

  const markStopCompleted = useCallback(
    async (stopId: string) => {
      setIsProcessing(true);
      try {
        const updated = await driverNavigationService.markStopCompleted(stopId);
        const completedStop = updated.stops.find((s) => s.id === stopId);
        if (completedStop?.isOfficeDestination) {
          toast.success('Office Destination reached! Trip successfully completed.');
        } else {
          toast.success(`Stop completed: ${completedStop?.name}`);
        }
        if (onStateChange) onStateChange(updated);
        return updated;
      } catch {
        toast.error('Failed to update stop status.');
      } finally {
        setIsProcessing(false);
      }
    },
    [onStateChange]
  );

  const pauseTrip = useCallback(async () => {
    setIsProcessing(true);
    try {
      const updated = await driverNavigationService.pauseTrip();
      toast('Trip navigation paused.', { icon: '⏸️' });
      if (onStateChange) onStateChange(updated);
      return updated;
    } catch {
      toast.error('Failed to pause trip.');
    } finally {
      setIsProcessing(false);
    }
  }, [onStateChange]);

  const resumeTrip = useCallback(async () => {
    setIsProcessing(true);
    try {
      const updated = await driverNavigationService.resumeTrip();
      toast.success('Trip navigation resumed.');
      if (onStateChange) onStateChange(updated);
      return updated;
    } catch {
      toast.error('Failed to resume trip.');
    } finally {
      setIsProcessing(false);
    }
  }, [onStateChange]);

  const endTrip = useCallback(async () => {
    setIsProcessing(true);
    try {
      const updated = await driverNavigationService.endTrip();
      toast.success('Trip ended! Telematics logged to server.');
      if (onStateChange) onStateChange(updated);
      return updated;
    } catch {
      toast.error('Failed to end trip.');
    } finally {
      setIsProcessing(false);
    }
  }, [onStateChange]);

  const resetTrip = useCallback(async () => {
    setIsProcessing(true);
    try {
      const updated = await driverNavigationService.resetTrip();
      toast.success('Shift reset to initial state.');
      if (onStateChange) onStateChange(updated);
      return updated;
    } catch {
      toast.error('Failed to reset trip.');
    } finally {
      setIsProcessing(false);
    }
  }, [onStateChange]);

  return {
    isProcessing,
    startShift,
    markStopCompleted,
    pauseTrip,
    resumeTrip,
    endTrip,
    resetTrip,
  };
}

/**
 * Hook to calculate directions and polyline coordinates between origin, waypoints, and office destination
 */
export function useDirections(trip: DriverTripNavigationState | null) {
  if (!trip) {
    return { origin: null, destination: null, waypoints: [], polylinePath: [] };
  }

  const origin = trip.currentLocation;
  const destination = trip.officeDestination;
  const waypoints = trip.stops.map((s) => ({
    lat: s.lat,
    lng: s.lng,
    name: s.name,
    isCompleted: s.status === 'COMPLETED',
  }));

  const polylinePath = [
    { lat: origin.lat, lng: origin.lng },
    ...trip.stops.map((s) => ({ lat: s.lat, lng: s.lng })),
  ];

  return {
    origin,
    destination,
    waypoints,
    polylinePath,
  };
}
