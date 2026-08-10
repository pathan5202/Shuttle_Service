import apiClient from '../api/axios';

export type DriverStopStatus = 'UPCOMING' | 'CURRENT' | 'COMPLETED' | 'SKIPPED';

export interface DriverNavigationStop {
  id: string;
  sequence: number;
  name: string;
  address: string;
  scheduledTime: string;
  estimatedArrivalMinutes: number;
  lat: number;
  lng: number;
  passengersWaiting: number;
  passengersBoarded: number;
  passengersDropped: number;
  status: DriverStopStatus;
  isOfficeDestination?: boolean;
}

export interface DriverTripNavigationState {
  tripId: string;
  tripCode: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  status: 'SCHEDULED' | 'RUNNING' | 'PAUSED' | 'COMPLETED';
  currentLocation: {
    lat: number;
    lng: number;
    speedKmH: number;
    heading: number;
  };
  officeDestination: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  stops: DriverNavigationStop[];
  activeStopIndex: number;
  passengerStats: {
    totalBookings: number;
    boarded: number;
    waiting: number;
    remaining: number;
  };
  progress: {
    completedStopsCount: number;
    totalStopsCount: number;
    distanceCoveredKm: number;
    remainingDistanceKm: number;
    estimatedOfficeArrival: string;
    percentage: number;
  };
  startTime?: string;
  endTime?: string;
}

const INITIAL_MOCK_TRIP: DriverTripNavigationState = {
  tripId: 'TRIP-ORR-8902',
  tripCode: 'ORR-EXP-0830',
  routeName: 'Outer Ring Road Corporate Express',
  vehicleNumber: 'KA-01-MJ-8902',
  driverName: 'Rajesh Kumar',
  status: 'SCHEDULED',
  currentLocation: {
    lat: 12.9716,
    lng: 77.5946,
    speedKmH: 0,
    heading: 90,
  },
  officeDestination: {
    name: 'Tech Park Main Office HQ',
    address: 'Building 4B, Off-Go Corporate Campus, Bellandur, Bengaluru',
    lat: 12.9352,
    lng: 77.6942,
  },
  stops: [
    {
      id: 'stop-1',
      sequence: 1,
      name: 'Indiranagar Metro Station',
      address: '100 Feet Rd, Near Gate 2, Indiranagar',
      scheduledTime: '08:30 AM',
      estimatedArrivalMinutes: 4,
      lat: 12.9784,
      lng: 77.6408,
      passengersWaiting: 14,
      passengersBoarded: 0,
      passengersDropped: 0,
      status: 'UPCOMING',
    },
    {
      id: 'stop-2',
      sequence: 2,
      name: 'Domlur Flyover Junction',
      address: 'Inner Ring Rd, Next to EGL Bus Bay',
      scheduledTime: '08:42 AM',
      estimatedArrivalMinutes: 16,
      lat: 12.9609,
      lng: 77.6387,
      passengersWaiting: 12,
      passengersBoarded: 0,
      passengersDropped: 0,
      status: 'UPCOMING',
    },
    {
      id: 'stop-3',
      sequence: 3,
      name: 'Embassy GolfLinks Gate',
      address: 'Intermediate Ring Rd, Gate 1 Entry',
      scheduledTime: '08:55 AM',
      estimatedArrivalMinutes: 28,
      lat: 12.9515,
      lng: 77.6465,
      passengersWaiting: 6,
      passengersBoarded: 0,
      passengersDropped: 0,
      status: 'UPCOMING',
    },
    {
      id: 'stop-office',
      sequence: 4,
      name: 'Tech Park Main Office HQ',
      address: 'Building 4B, Off-Go Corporate Campus',
      scheduledTime: '09:15 AM',
      estimatedArrivalMinutes: 45,
      lat: 12.9352,
      lng: 77.6942,
      passengersWaiting: 0,
      passengersBoarded: 0,
      passengersDropped: 32,
      status: 'UPCOMING',
      isOfficeDestination: true,
    },
  ],
  activeStopIndex: 0,
  passengerStats: {
    totalBookings: 32,
    boarded: 0,
    waiting: 32,
    remaining: 32,
  },
  progress: {
    completedStopsCount: 0,
    totalStopsCount: 4,
    distanceCoveredKm: 0,
    remainingDistanceKm: 18.4,
    estimatedOfficeArrival: '09:15 AM',
    percentage: 0,
  },
};

let currentTripState: DriverTripNavigationState = JSON.parse(JSON.stringify(INITIAL_MOCK_TRIP));

export const driverNavigationService = {
  /**
   * Fetch current driver active trip navigation state
   */
  async getCurrentTrip(): Promise<DriverTripNavigationState> {
    try {
      const response = await apiClient.get<DriverTripNavigationState>('/driver/active-trip');
      return response.data;
    } catch {
      return currentTripState;
    }
  },

  /**
   * Start driver shift and initialize navigation
   */
  async startShift(): Promise<DriverTripNavigationState> {
    currentTripState.status = 'RUNNING';
    currentTripState.startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    currentTripState.currentLocation.speedKmH = 38;
    if (currentTripState.stops.length > 0) {
      currentTripState.stops[0].status = 'CURRENT';
      currentTripState.activeStopIndex = 0;
    }
    return JSON.parse(JSON.stringify(currentTripState));
  },

  /**
   * Complete current stop and auto-advance to next stop or office destination
   */
  async markStopCompleted(stopId: string): Promise<DriverTripNavigationState> {
    const stopIdx = currentTripState.stops.findIndex((s) => s.id === stopId);
    if (stopIdx !== -1) {
      const stop = currentTripState.stops[stopIdx];
      stop.status = 'COMPLETED';
      stop.passengersBoarded += stop.passengersWaiting;
      currentTripState.passengerStats.boarded += stop.passengersWaiting;
      currentTripState.passengerStats.waiting -= stop.passengersWaiting;
      stop.passengersWaiting = 0;

      // Update vehicle location to the completed stop
      currentTripState.currentLocation.lat = stop.lat;
      currentTripState.currentLocation.lng = stop.lng;

      // Progress metrics
      const completedCount = currentTripState.stops.filter((s) => s.status === 'COMPLETED').length;
      currentTripState.progress.completedStopsCount = completedCount;
      currentTripState.progress.percentage = Math.round((completedCount / currentTripState.stops.length) * 100);
      currentTripState.progress.distanceCoveredKm = Math.min(
        18.4,
        Number((currentTripState.progress.distanceCoveredKm + 4.5).toFixed(1))
      );
      currentTripState.progress.remainingDistanceKm = Math.max(
        0,
        Number((18.4 - currentTripState.progress.distanceCoveredKm).toFixed(1))
      );

      // Auto progression
      const nextIdx = stopIdx + 1;
      if (nextIdx < currentTripState.stops.length) {
        currentTripState.activeStopIndex = nextIdx;
        currentTripState.stops[nextIdx].status = 'CURRENT';
      } else {
        // All stops completed including office
        currentTripState.status = 'COMPLETED';
        currentTripState.endTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentTripState.currentLocation.speedKmH = 0;
      }
    }
    return JSON.parse(JSON.stringify(currentTripState));
  },

  /**
   * Pause driver trip
   */
  async pauseTrip(): Promise<DriverTripNavigationState> {
    currentTripState.status = 'PAUSED';
    currentTripState.currentLocation.speedKmH = 0;
    return JSON.parse(JSON.stringify(currentTripState));
  },

  /**
   * Resume driver trip
   */
  async resumeTrip(): Promise<DriverTripNavigationState> {
    currentTripState.status = 'RUNNING';
    currentTripState.currentLocation.speedKmH = 35;
    return JSON.parse(JSON.stringify(currentTripState));
  },

  /**
   * End trip prematurely or on office arrival
   */
  async endTrip(): Promise<DriverTripNavigationState> {
    currentTripState.status = 'COMPLETED';
    currentTripState.endTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    currentTripState.currentLocation.speedKmH = 0;
    currentTripState.progress.percentage = 100;
    currentTripState.progress.remainingDistanceKm = 0;
    currentTripState.stops.forEach((s) => {
      s.status = 'COMPLETED';
    });
    return JSON.parse(JSON.stringify(currentTripState));
  },

  /**
   * Reset driver trip to initial state for testing
   */
  async resetTrip(): Promise<DriverTripNavigationState> {
    currentTripState = JSON.parse(JSON.stringify(INITIAL_MOCK_TRIP));
    return currentTripState;
  },
};
