import apiClient from '../api/axios';
import {
  DriverProfile,
  DriverTripStatistics,
  LiveTripItem,
  TripPassenger,
  PassengerBoardingStatus,
  TripStatus,
} from '../types';

let mockDriverProfileState: DriverProfile = {
  id: 'drv-prof-001',
  driverId: 'DRV-1008',
  fullName: 'Marcus Vance',
  email: 'marcus.vance@offgo.com',
  phone: '+1 (555) 392-8810',
  licenseNumber: 'CDL-CA-992104-X',
  licenseExpiry: '2028-11-15',
  assignedVehicle: 'Volvo Electric Coach 2025',
  assignedVehicleReg: 'OFF-GO-101',
  experienceYears: 8,
  rating: 4.95,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  status: 'ON_DUTY',
};

let mockDriverStatsState: DriverTripStatistics = {
  tripsToday: 4,
  tripsCompleted: 2,
  passengersTransported: 58,
  distanceTravelledKm: 124.8,
  averageTripTimeMinutes: 34,
  onTimePerformancePercent: 99.1,
};

let mockAssignedTripsState: LiveTripItem[] = [
  {
    id: 'trp-1001',
    code: 'TRIP-OFF-901',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    driverId: 'drv-1',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (555) 392-8810',
    lat: 37.7885,
    lng: -122.3998,
    heading: 210,
    currentSpeedKmh: 38,
    status: 'IN_TRANSIT',
    distanceRemainingKm: 4.2,
    etaMinutes: 12,
    delayMinutes: 0,
    startTime: '07:30 AM',
    currentStop: {
      id: 'stp-102',
      name: 'Montgomery BART Transit Gate',
      lat: 37.7891,
      lng: -122.4014,
      estimatedArrival: '07:42 AM',
      actualArrival: '07:43 AM',
      isCompleted: true,
      isCurrent: false,
    },
    nextStop: {
      id: 'stp-103',
      name: 'SOMA Tech Plaza Stop',
      lat: 37.7812,
      lng: -122.398,
      estimatedArrival: '07:55 AM',
      isCompleted: false,
      isCurrent: true,
    },
    stops: [
      {
        id: 'stp-101',
        name: 'Financial District Terminal',
        lat: 37.795,
        lng: -122.398,
        estimatedArrival: '07:30 AM',
        actualArrival: '07:30 AM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'stp-102',
        name: 'Montgomery BART Transit Gate',
        lat: 37.7891,
        lng: -122.4014,
        estimatedArrival: '07:42 AM',
        actualArrival: '07:43 AM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 'stp-103',
        name: 'SOMA Tech Plaza Stop',
        lat: 37.7812,
        lng: -122.398,
        estimatedArrival: '07:55 AM',
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 'stp-105',
        name: 'Off-Go Innovation HQ',
        lat: 37.7749,
        lng: -122.4194,
        estimatedArrival: '08:25 AM',
        isCompleted: false,
        isCurrent: false,
      },
    ],
    passengers: [
      {
        id: 'psg-01',
        bookingCode: 'OFF-BKG-88301',
        employeeId: 'EMP-101',
        employeeName: 'Alexander Wright',
        employeeEmail: 'alexander.wright@company.com',
        pickupStopName: 'Financial District Terminal',
        dropStopName: 'Off-Go Innovation HQ',
        bookingStatus: 'CONFIRMED',
        boardingStatus: 'BOARDED',
      },
      {
        id: 'psg-02',
        bookingCode: 'OFF-BKG-88302',
        employeeId: 'EMP-102',
        employeeName: 'Sarah Jenkins',
        employeeEmail: 'sarah.jenkins@company.com',
        pickupStopName: 'Montgomery BART Transit Gate',
        dropStopName: 'Off-Go Innovation HQ',
        bookingStatus: 'CONFIRMED',
        boardingStatus: 'BOARDED',
      },
      {
        id: 'psg-03',
        bookingCode: 'OFF-BKG-88303',
        employeeId: 'EMP-103',
        employeeName: 'David Chen',
        employeeEmail: 'david.chen@company.com',
        pickupStopName: 'SOMA Tech Plaza Stop',
        dropStopName: 'Off-Go Innovation HQ',
        bookingStatus: 'CONFIRMED',
        boardingStatus: 'WAITING',
      },
      {
        id: 'psg-04',
        bookingCode: 'OFF-BKG-88304',
        employeeId: 'EMP-104',
        employeeName: 'Rachel Green',
        employeeEmail: 'rachel.green@company.com',
        pickupStopName: 'SOMA Tech Plaza Stop',
        dropStopName: 'Off-Go Innovation HQ',
        bookingStatus: 'CONFIRMED',
        boardingStatus: 'WAITING',
      },
      {
        id: 'psg-05',
        bookingCode: 'OFF-BKG-88305',
        employeeId: 'EMP-105',
        employeeName: 'Michael Scott',
        employeeEmail: 'michael.scott@company.com',
        pickupStopName: 'Financial District Terminal',
        dropStopName: 'Off-Go Innovation HQ',
        bookingStatus: 'CONFIRMED',
        boardingStatus: 'NO_SHOW',
      },
    ],
  },
  {
    id: 'trp-1002',
    code: 'TRIP-OFF-902',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A (Return Loop)',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    driverId: 'drv-1',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (555) 392-8810',
    lat: 37.7749,
    lng: -122.4194,
    heading: 30,
    currentSpeedKmh: 0,
    status: 'SCHEDULED',
    distanceRemainingKm: 18.5,
    etaMinutes: 45,
    delayMinutes: 0,
    startTime: '05:15 PM',
    currentStop: {
      id: 'stp-105',
      name: 'Off-Go Innovation HQ',
      lat: 37.7749,
      lng: -122.4194,
      estimatedArrival: '05:15 PM',
      isCompleted: false,
      isCurrent: true,
    },
    nextStop: {
      id: 'stp-103',
      name: 'SOMA Tech Plaza Stop',
      lat: 37.7812,
      lng: -122.398,
      estimatedArrival: '05:30 PM',
      isCompleted: false,
      isCurrent: false,
    },
    stops: [
      {
        id: 'stp-105',
        name: 'Off-Go Innovation HQ',
        lat: 37.7749,
        lng: -122.4194,
        estimatedArrival: '05:15 PM',
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 'stp-103',
        name: 'SOMA Tech Plaza Stop',
        lat: 37.7812,
        lng: -122.398,
        estimatedArrival: '05:30 PM',
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 'stp-101',
        name: 'Financial District Terminal',
        lat: 37.795,
        lng: -122.398,
        estimatedArrival: '05:50 PM',
        isCompleted: false,
        isCurrent: false,
      },
    ],
    passengers: [],
  },
];

export const driverPortalService = {
  getDriverProfile: async (): Promise<DriverProfile> => {
    try {
      const response = await apiClient.get<DriverProfile>('/driver/me');
      return response.data;
    } catch {
      return mockDriverProfileState;
    }
  },

  updateDriverProfile: async (updated: Partial<DriverProfile>): Promise<DriverProfile> => {
    try {
      const response = await apiClient.put<DriverProfile>('/driver/me', updated);
      return response.data;
    } catch {
      mockDriverProfileState = { ...mockDriverProfileState, ...updated };
      return mockDriverProfileState;
    }
  },

  getAssignedTrips: async (): Promise<LiveTripItem[]> => {
    try {
      const response = await apiClient.get<LiveTripItem[]>('/driver/me/assigned-trips');
      return response.data;
    } catch {
      return mockAssignedTripsState;
    }
  },

  getCurrentTrip: async (): Promise<LiveTripItem | null> => {
    try {
      const response = await apiClient.get<LiveTripItem>('/driver/me/current-trip');
      return response.data;
    } catch {
      return mockAssignedTripsState.find((t) => t.status === 'IN_TRANSIT' || t.status === 'AT_STOP') || mockAssignedTripsState[0] || null;
    }
  },

  getPassengerManifest: async (tripId: string): Promise<TripPassenger[]> => {
    try {
      const response = await apiClient.get<TripPassenger[]>(`/driver/trips/${tripId}/passengers`);
      return response.data;
    } catch {
      const trip = mockAssignedTripsState.find((t) => t.id === tripId);
      return trip ? trip.passengers : [];
    }
  },

  updatePassengerBoardingStatus: async (
    tripId: string,
    passengerId: string,
    status: PassengerBoardingStatus
  ): Promise<boolean> => {
    try {
      await apiClient.patch(`/driver/trips/${tripId}/passengers/${passengerId}`, { status });
      return true;
    } catch {
      const trip = mockAssignedTripsState.find((t) => t.id === tripId);
      if (trip) {
        const passenger = trip.passengers.find((p) => p.id === passengerId);
        if (passenger) {
          passenger.boardingStatus = status;
        }
      }
      return true;
    }
  },

  updateTripStatus: async (tripId: string, status: TripStatus): Promise<boolean> => {
    try {
      await apiClient.patch(`/driver/trips/${tripId}/status`, { status });
      return true;
    } catch {
      const trip = mockAssignedTripsState.find((t) => t.id === tripId);
      if (trip) {
        trip.status = status;
      }
      return true;
    }
  },

  getDriverStatistics: async (): Promise<DriverTripStatistics> => {
    try {
      const response = await apiClient.get<DriverTripStatistics>('/driver/me/statistics');
      return response.data;
    } catch {
      return mockDriverStatsState;
    }
  },
};
