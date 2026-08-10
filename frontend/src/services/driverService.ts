import apiClient from '../api/axios';
import {
  Driver,
  CreateDriverPayload,
  DriverFilterOptions,
  DriverAssignedShuttle,
  DriverAssignedRoute,
} from '../types';

let mockDriversState: Driver[] = [
  {
    id: 'drv-001',
    driverId: 'DRV-1001',
    firstName: 'Marcus',
    lastName: 'Vance',
    name: 'Marcus Vance',
    email: 'marcus.vance@offgo.fleet.com',
    phone: '+1 (555) 012-3456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    licenseNumber: 'CDL-SF-889123',
    licenseExpiry: '2027-08-15',
    dateOfBirth: '1988-04-12',
    address: '450 California St, San Francisco, CA',
    experienceYears: 8,
    status: 'ACTIVE',
    availability: 'ON_TRIP',
    createdAt: '2024-03-10',
    assignedShuttle: {
      shuttleId: 'shuttle-101',
      vehicleNumber: 'OFF-GO-101',
      model: 'Mercedes Sprinter EV 2024',
      capacity: 18,
      status: 'ON_ROUTE',
    },
    assignedRoute: {
      routeId: 'rt-001',
      routeName: 'HQ Express Line A',
      code: 'EX-A1',
      totalStops: 6,
      estimatedDurationMinutes: 35,
    },
    emergencyContact: {
      name: 'Elena Vance',
      phone: '+1 (555) 998-1122',
      relationship: 'Spouse',
    },
    attendanceSummary: {
      totalShifts: 180,
      presentShifts: 178,
      lateCount: 2,
      attendanceRatePercent: 98.8,
    },
    tripStatistics: {
      totalTripsCompleted: 420,
      totalDistanceKm: 12450,
      totalHoursDriven: 680,
      averageRating: 4.9,
      safetyScorePercent: 99.2,
    },
    todaySchedule: {
      shiftStartTime: '06:00 AM',
      shiftEndTime: '02:30 PM',
      nextTripTime: '09:15 AM',
      routeName: 'HQ Express Line A',
      pickupPoint: 'Market Street Gate',
    },
    recentActivity: [
      {
        id: 'act-01',
        action: 'Trip Started',
        timestamp: '10 mins ago',
        details: 'Departed from Market Street Gate with 14 passengers on board.',
      },
      {
        id: 'act-02',
        action: 'Pre-Shift Inspection Passed',
        timestamp: '2 hours ago',
        details: 'Completed 24-point vehicle & tire tread safety check.',
      },
    ],
  },
  {
    id: 'drv-002',
    driverId: 'DRV-1002',
    firstName: 'Samantha',
    lastName: 'Reed',
    name: 'Samantha Reed',
    email: 'samantha.reed@offgo.fleet.com',
    phone: '+1 (555) 012-7890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    licenseNumber: 'CDL-SF-442109',
    licenseExpiry: '2026-08-05', // Expiring soon warning target
    dateOfBirth: '1992-09-24',
    address: '780 Mission St, San Francisco, CA',
    experienceYears: 5,
    status: 'ACTIVE',
    availability: 'ON_DUTY',
    createdAt: '2024-05-18',
    assignedShuttle: {
      shuttleId: 'shuttle-102',
      vehicleNumber: 'OFF-GO-104',
      model: 'Ford E-Transit Shuttle',
      capacity: 14,
      status: 'AVAILABLE',
    },
    assignedRoute: {
      routeId: 'rt-002',
      routeName: 'North Tech Corridor B',
      code: 'NC-B2',
      totalStops: 8,
      estimatedDurationMinutes: 45,
    },
    emergencyContact: {
      name: 'Robert Reed',
      phone: '+1 (555) 887-2233',
      relationship: 'Father',
    },
    attendanceSummary: {
      totalShifts: 130,
      presentShifts: 127,
      lateCount: 3,
      attendanceRatePercent: 97.6,
    },
    tripStatistics: {
      totalTripsCompleted: 310,
      totalDistanceKm: 8900,
      totalHoursDriven: 490,
      averageRating: 4.85,
      safetyScorePercent: 98.5,
    },
    todaySchedule: {
      shiftStartTime: '08:00 AM',
      shiftEndTime: '04:30 PM',
      nextTripTime: '09:45 AM',
      routeName: 'North Tech Corridor B',
      pickupPoint: '5th Street Plaza',
    },
    recentActivity: [
      {
        id: 'act-03',
        action: 'Shift Checked In',
        timestamp: '45 mins ago',
        details: 'Logged into Off-Go Driver App and synced route timetable.',
      },
    ],
  },
  {
    id: 'drv-003',
    driverId: 'DRV-1003',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@offgo.fleet.com',
    phone: '+1 (555) 012-9988',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    licenseNumber: 'CDL-SF-112233',
    licenseExpiry: '2026-06-30', // Expired or expiring
    dateOfBirth: '1984-11-03',
    address: '1020 Folsom St, San Francisco, CA',
    experienceYears: 12,
    status: 'ACTIVE',
    availability: 'BREAK',
    createdAt: '2023-11-01',
    assignedShuttle: {
      shuttleId: 'shuttle-103',
      vehicleNumber: 'OFF-GO-201',
      model: 'BYD Electric Bus C9',
      capacity: 32,
      status: 'IDLE',
    },
    assignedRoute: {
      routeId: 'rt-003',
      routeName: 'South Campus Loop C',
      code: 'SC-C3',
      totalStops: 12,
      estimatedDurationMinutes: 50,
    },
    emergencyContact: {
      name: 'Maria Mendoza',
      phone: '+1 (555) 443-1199',
      relationship: 'Spouse',
    },
    attendanceSummary: {
      totalShifts: 240,
      presentShifts: 238,
      lateCount: 2,
      attendanceRatePercent: 99.1,
    },
    tripStatistics: {
      totalTripsCompleted: 680,
      totalDistanceKm: 19400,
      totalHoursDriven: 1120,
      averageRating: 4.95,
      safetyScorePercent: 99.8,
    },
    todaySchedule: {
      shiftStartTime: '07:00 AM',
      shiftEndTime: '03:30 PM',
      nextTripTime: '10:30 AM',
      routeName: 'South Campus Loop C',
      pickupPoint: 'South Gate Terminal',
    },
    recentActivity: [
      {
        id: 'act-04',
        action: 'Break Started',
        timestamp: '15 mins ago',
        details: '30-minute mandatory rest period logged at South Depot.',
      },
    ],
  },
  {
    id: 'drv-004',
    driverId: 'DRV-1004',
    firstName: 'Priya',
    lastName: 'Sharma',
    name: 'Priya Sharma',
    email: 'priya.sharma@offgo.fleet.com',
    phone: '+1 (555) 012-3344',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    licenseNumber: 'CDL-SF-990011',
    licenseExpiry: '2028-01-20',
    dateOfBirth: '1995-03-15',
    address: '220 King St, San Francisco, CA',
    experienceYears: 4,
    status: 'ACTIVE',
    availability: 'OFF_DUTY',
    createdAt: '2024-09-01',
    assignedShuttle: undefined,
    assignedRoute: undefined,
    emergencyContact: {
      name: 'Aarav Sharma',
      phone: '+1 (555) 667-8899',
      relationship: 'Brother',
    },
    attendanceSummary: {
      totalShifts: 85,
      presentShifts: 84,
      lateCount: 1,
      attendanceRatePercent: 98.8,
    },
    tripStatistics: {
      totalTripsCompleted: 190,
      totalDistanceKm: 5200,
      totalHoursDriven: 310,
      averageRating: 4.88,
      safetyScorePercent: 99.0,
    },
    todaySchedule: {
      shiftStartTime: '02:00 PM',
      shiftEndTime: '10:30 PM',
      nextTripTime: '02:30 PM',
    },
    recentActivity: [
      {
        id: 'act-05',
        action: 'Off Duty',
        timestamp: 'Yesterday',
        details: 'Completed evening roster shift without incident.',
      },
    ],
  },
  {
    id: 'drv-005',
    driverId: 'DRV-1005',
    firstName: 'David',
    lastName: 'Kowalski',
    name: 'David Kowalski',
    email: 'david.kowalski@offgo.fleet.com',
    phone: '+1 (555) 012-6677',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    licenseNumber: 'CDL-SF-778899',
    licenseExpiry: '2025-12-10',
    dateOfBirth: '1980-07-29',
    address: '150 Van Ness Ave, San Francisco, CA',
    experienceYears: 15,
    status: 'INACTIVE',
    availability: 'OFF_DUTY',
    createdAt: '2023-08-15',
    assignedShuttle: undefined,
    assignedRoute: undefined,
    emergencyContact: {
      name: 'Anna Kowalski',
      phone: '+1 (555) 334-5566',
      relationship: 'Spouse',
    },
    attendanceSummary: {
      totalShifts: 310,
      presentShifts: 298,
      lateCount: 12,
      attendanceRatePercent: 96.1,
    },
    tripStatistics: {
      totalTripsCompleted: 890,
      totalDistanceKm: 26000,
      totalHoursDriven: 1450,
      averageRating: 4.75,
      safetyScorePercent: 97.0,
    },
    todaySchedule: {
      shiftStartTime: 'N/A',
      shiftEndTime: 'N/A',
    },
    recentActivity: [
      {
        id: 'act-06',
        action: 'Account Set Inactive',
        timestamp: '3 days ago',
        details: 'Driver requested medical leave extension.',
      },
    ],
  },
];

const mapBackendDriver = (d: any): Driver => {
  return {
    id: d.id ? String(d.id) : `drv-${Date.now()}`,
    driverId: d.employeeId || d.driverId || 'DRV-1001',
    firstName: d.firstName || 'Driver',
    lastName: d.lastName || '',
    name: `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Driver',
    email: d.email || '',
    phone: d.phoneNumber || d.phone || '',
    avatar: d.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${d.firstName || 'D'} ${d.lastName || 'R'}`)}&background=6366f1&color=fff`,
    licenseNumber: d.licenseNumber || 'CDL-1000',
    licenseExpiry: d.licenseExpiry ? String(d.licenseExpiry) : '2028-01-01',
    dateOfBirth: d.dateOfBirth || '1990-01-01',
    address: d.address || 'San Francisco Fleet Depot',
    experienceYears: d.experience ?? d.experienceYears ?? 4,
    status: d.status || (d.active !== false ? 'ACTIVE' : 'INACTIVE'),
    availability: d.availability || 'ON_DUTY',
    createdAt: d.createdAt || new Date().toISOString().split('T')[0],
    assignedShuttle: d.assignedShuttle,
    assignedRoute: d.assignedRoute,
    emergencyContact: d.emergencyContact || {
      name: 'Dispatch Office',
      phone: '415-555-0199',
      relationship: 'Fleet Ops',
    },
    attendanceSummary: d.attendanceSummary || {
      totalShifts: 120,
      presentShifts: 118,
      lateCount: 2,
      attendanceRatePercent: 98.3,
    },
    tripStatistics: d.tripStatistics || {
      totalTripsCompleted: 240,
      totalDistanceKm: 4800,
      totalHoursDriven: 320,
      averageRating: 4.9,
      safetyScorePercent: 99.0,
    },
    todaySchedule: d.todaySchedule || {
      shiftStartTime: '07:30 AM',
      shiftEndTime: '04:30 PM',
    },
    recentActivity: d.recentActivity || [],
  };
};

export const driverService = {
  /**
   * Fetch list of drivers with optional client/server filtering
   */
  getDrivers: async (filters?: DriverFilterOptions): Promise<Driver[]> => {
    try {
      const response = await apiClient.get<any>('/drivers');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        let items = rawList.map(mapBackendDriver);
        if (filters?.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          items = items.filter(
            (d) =>
              d.name.toLowerCase().includes(q) ||
              d.driverId.toLowerCase().includes(q) ||
              d.licenseNumber.toLowerCase().includes(q)
          );
        }
        return items;
      }
      return [...mockDriversState];
    } catch (error) {
      console.warn('Backend /drivers error, using fallback:', error);
      return [...mockDriversState];
    }
  },

  /**
   * Fetch single driver detail by ID
   */
  getDriverById: async (id: string): Promise<Driver> => {
    try {
      const response = await apiClient.get<any>(`/drivers/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendDriver(data);
      }
      throw new Error('Invalid driver data');
    } catch {
      const found = mockDriversState.find((d) => d.id === id || d.driverId === id);
      if (!found) {
        throw new Error(`Driver with ID ${id} not found.`);
      }
      return found;
    }
  },

  /**
   * Register a new driver record
   */
  createDriver: async (payload: CreateDriverPayload): Promise<Driver> => {
    try {
      const backendPayload = {
        employeeId: payload.driverId || `DRV-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: (payload.phone || '9876543210').replace(/\D/g, '').slice(-10),
        licenseNumber: payload.licenseNumber,
        licenseExpiry: payload.licenseExpiry || new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
        experience: Number(payload.experienceYears) || 2,
      };
      const response = await apiClient.post<any>('/drivers', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendDriver(data);
      mockDriversState = [created, ...mockDriversState];
      return created;
    } catch (error) {
      console.warn('Create driver backend call failed, fallback locally:', error);
      const newDriver: Driver = {
        id: `drv-${Date.now()}`,
        driverId: payload.driverId || `DRV-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: `${payload.firstName} ${payload.lastName}`,
        email: payload.email,
        phone: payload.phone,
        licenseNumber: payload.licenseNumber,
        licenseExpiry: payload.licenseExpiry,
        dateOfBirth: payload.dateOfBirth,
        address: payload.address,
        experienceYears: payload.experienceYears || 2,
        status: payload.status || 'ACTIVE',
        availability: payload.availability || 'ON_DUTY',
        createdAt: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${payload.firstName} ${payload.lastName}`
        )}&background=6366f1&color=fff`,
        emergencyContact: payload.emergencyContact || {
          name: 'N/A',
          phone: 'N/A',
          relationship: 'N/A',
        },
        attendanceSummary: {
          totalShifts: 0,
          presentShifts: 0,
          lateCount: 0,
          attendanceRatePercent: 100,
        },
        tripStatistics: {
          totalTripsCompleted: 0,
          totalDistanceKm: 0,
          totalHoursDriven: 0,
          averageRating: 5.0,
          safetyScorePercent: 100,
        },
        todaySchedule: {
          shiftStartTime: '08:00 AM',
          shiftEndTime: '05:00 PM',
        },
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            action: 'Account Registered',
            timestamp: 'Just now',
            details: 'Driver record created via Admin Portal.',
          },
        ],
      };

      mockDriversState = [newDriver, ...mockDriversState];
      return newDriver;
    }
  },

  /**
   * Update driver assignments (Shuttle / Route)
   */
  updateDriverAssignment: async (
    id: string,
    shuttle?: DriverAssignedShuttle | null,
    route?: DriverAssignedRoute | null
  ): Promise<Driver> => {
    try {
      const response = await apiClient.patch<any>(`/drivers/${id}/assignment`, {
        shuttle,
        route,
      });
      const data = response.data?.data || response.data;
      return mapBackendDriver(data);
    } catch {
      const idx = mockDriversState.findIndex((d) => d.id === id);
      if (idx === -1) throw new Error('Driver not found');

      const updated = { ...mockDriversState[idx] };
      if (shuttle !== undefined) updated.assignedShuttle = shuttle || undefined;
      if (route !== undefined) updated.assignedRoute = route || undefined;

      mockDriversState[idx] = updated;
      return updated;
    }
  },

  /**
   * Delete driver record
   */
  deleteDriver: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/drivers/${id}`);
      mockDriversState = mockDriversState.filter((d) => d.id !== id);
      return true;
    } catch {
      mockDriversState = mockDriversState.filter((d) => d.id !== id);
      return true;
    }
  },
};
