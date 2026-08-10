import apiClient from '../api/axios';
import {
  EmployeeProfile,
  CommuteAnalytics,
  Booking,
  LiveTripItem,
} from '../types';

let mockProfileState: EmployeeProfile = {
  id: 'emp-profile-101',
  employeeId: 'EMP-101',
  fullName: 'Alexander Wright',
  email: 'alexander.wright@company.com',
  phone: '+1 (555) 019-2831',
  department: 'Financial Technology Services',
  designation: 'Senior Lead Architect',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  homeAddress: '1428 Market Street, San Francisco, CA',
  preferredPickupStopId: 'stp-101',
  preferredPickupStopName: 'Financial District Terminal',
  preferredDropStopId: 'stp-105',
  preferredDropStopName: 'Off-Go Innovation HQ',
  emergencyContactName: 'Eleanor Wright',
  emergencyContactPhone: '+1 (555) 882-9901',
  notificationPreferences: {
    email: true,
    sms: true,
    push: true,
    tripReminders: true,
    scheduleChanges: true,
  },
};

const mockAnalyticsState: CommuteAnalytics = {
  tripsThisMonth: 18,
  totalDistanceKm: 342.5,
  averageTravelTimeMinutes: 32,
  completedTrips: 18,
  cancelledTrips: 1,
  carbonSavedKg: 48.2,
  onTimeArrivalPercentage: 98.4,
};

const mockTodayTripState: LiveTripItem = {
  id: 'trp-1001',
  code: 'TRIP-OFF-901',
  routeId: 'rt-101',
  routeName: 'HQ Financial District Express Line A',
  shuttleId: 'sht-1',
  shuttleNumber: 'OFF-GO-101',
  driverId: 'drv-1',
  driverName: 'David Miller',
  driverPhone: '+1 (555) 234-5678',
  lat: 37.7885,
  lng: -122.3998,
  heading: 210,
  currentSpeedKmh: 38,
  status: 'IN_TRANSIT',
  distanceRemainingKm: 4.2,
  etaMinutes: 12,
  delayMinutes: 2,
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
  passengers: [],
};

const mockMyUpcomingBookings: Booking[] = [
  {
    id: 'bkg-88301',
    bookingRef: 'OFF-BKG-88301',
    employeeId: 'EMP-101',
    employeeName: 'Alexander Wright',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    shuttleId: 'sht-1',
    shuttleVehicleNumber: 'OFF-GO-101',
    pickupStop: 'Financial District Terminal',
    dropoffStop: 'Off-Go Innovation HQ',
    pickupTime: '07:30 AM',
    seatNumber: '12B',
    status: 'CONFIRMED',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'bkg-88305',
    bookingRef: 'OFF-BKG-88305',
    employeeId: 'EMP-101',
    employeeName: 'Alexander Wright',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    shuttleId: 'sht-1',
    shuttleVehicleNumber: 'OFF-GO-101',
    pickupStop: 'Financial District Terminal',
    dropoffStop: 'Off-Go Innovation HQ',
    pickupTime: '07:30 AM',
    seatNumber: '08A',
    status: 'CONFIRMED',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  },
];

const mockMyBookingHistory: Booking[] = [
  {
    id: 'bkg-88290',
    bookingRef: 'OFF-BKG-88290',
    employeeId: 'EMP-101',
    employeeName: 'Alexander Wright',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    shuttleId: 'sht-1',
    shuttleVehicleNumber: 'OFF-GO-101',
    pickupStop: 'Financial District Terminal',
    dropoffStop: 'Off-Go Innovation HQ',
    pickupTime: '07:30 AM',
    seatNumber: '14C',
    status: 'COMPLETED',
    date: '2026-07-21',
  },
  {
    id: 'bkg-88280',
    bookingRef: 'OFF-BKG-88280',
    employeeId: 'EMP-101',
    employeeName: 'Alexander Wright',
    routeId: 'rt-102',
    routeName: 'North Tech Corridor Loop B',
    shuttleId: 'sht-3',
    shuttleVehicleNumber: 'OFF-GO-104',
    pickupStop: 'Marina North Station',
    dropoffStop: 'Off-Go Innovation HQ',
    pickupTime: '08:00 AM',
    seatNumber: '04A',
    status: 'COMPLETED',
    date: '2026-07-20',
  },
];

export const employeePortalService = {
  getMyProfile: async (): Promise<EmployeeProfile> => {
    try {
      const response = await apiClient.get<EmployeeProfile>('/employee/me');
      return response.data;
    } catch {
      return mockProfileState;
    }
  },

  updateMyProfile: async (updated: Partial<EmployeeProfile>): Promise<EmployeeProfile> => {
    try {
      const response = await apiClient.put<EmployeeProfile>('/employee/me', updated);
      return response.data;
    } catch {
      mockProfileState = { ...mockProfileState, ...updated };
      return mockProfileState;
    }
  },

  getTodayTrip: async (): Promise<LiveTripItem | null> => {
    try {
      const response = await apiClient.get<LiveTripItem>('/employee/me/today-trip');
      return response.data;
    } catch {
      return mockTodayTripState;
    }
  },

  getUpcomingBookings: async (): Promise<Booking[]> => {
    try {
      const response = await apiClient.get<Booking[]>('/employee/me/bookings/upcoming');
      return response.data;
    } catch {
      return mockMyUpcomingBookings;
    }
  },

  getBookingHistory: async (): Promise<Booking[]> => {
    try {
      const response = await apiClient.get<Booking[]>('/employee/me/bookings/history');
      return response.data;
    } catch {
      return mockMyBookingHistory;
    }
  },

  getCommuteAnalytics: async (): Promise<CommuteAnalytics> => {
    try {
      const response = await apiClient.get<CommuteAnalytics>('/employee/me/analytics');
      return response.data;
    } catch {
      return mockAnalyticsState;
    }
  },
};
