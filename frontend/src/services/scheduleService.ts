import apiClient from '../api/axios';
import {
  ScheduleItem,
  ScheduleFilterOptions,
  CreateSchedulePayload,
  UpdateSchedulePayload,
} from '../types';

let mockSchedulesState: ScheduleItem[] = [
  {
    id: 'sch-101',
    code: 'SCH-EX-01',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    startLocation: 'Financial District Terminal',
    endLocation: 'Off-Go Innovation HQ',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    shuttleModel: 'Volvo 9700 Luxury Shuttle',
    driverId: 'drv-1',
    driverName: 'David Miller',
    driverPhone: '+1 (555) 234-5678',
    departureTime: '07:30 AM',
    arrivalTime: '08:25 AM',
    durationMinutes: 55,
    bufferTimeMinutes: 15,
    operatingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: 'MORNING',
    status: 'RUNNING',
    createdDate: '2024-01-15',
    estimatedStopsCount: 5,
    conflictWarnings: [],
    recentActivity: [
      {
        id: 'act-s1',
        action: 'Trip Started On Time',
        timestamp: '07:30 AM Today',
        details: 'Driver David Miller initiated route sequence with OFF-GO-101.',
      },
      {
        id: 'act-s2',
        action: 'Schedule Published',
        timestamp: '2 days ago',
        details: 'Assigned to weekday morning commute slot.',
      },
    ],
  },
  {
    id: 'sch-102',
    code: 'SCH-EX-02',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    startLocation: 'Financial District Terminal',
    endLocation: 'Off-Go Innovation HQ',
    shuttleId: 'sht-2',
    shuttleNumber: 'OFF-GO-102',
    shuttleModel: 'Mercedes Sprinter Executive',
    driverId: 'drv-2',
    driverName: 'Sarah Jenkins',
    driverPhone: '+1 (555) 345-6789',
    departureTime: '08:00 AM',
    arrivalTime: '08:55 AM',
    durationMinutes: 55,
    bufferTimeMinutes: 15,
    operatingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: 'MORNING',
    status: 'SCHEDULED',
    createdDate: '2024-01-16',
    estimatedStopsCount: 5,
    conflictWarnings: [],
    recentActivity: [],
  },
  {
    id: 'sch-103',
    code: 'SCH-NC-01',
    routeId: 'rt-102',
    routeName: 'North Tech Corridor Loop B',
    routeCode: 'RT-NC-02',
    startLocation: 'Marina North Station',
    endLocation: 'Off-Go Innovation HQ',
    shuttleId: 'sht-3',
    shuttleNumber: 'OFF-GO-104',
    shuttleModel: 'BYD K9 Electric Bus',
    driverId: 'drv-3',
    driverName: 'Robert Thorne',
    driverPhone: '+1 (555) 456-7890',
    departureTime: '08:00 AM',
    arrivalTime: '08:35 AM',
    durationMinutes: 35,
    bufferTimeMinutes: 10,
    operatingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: 'MORNING',
    status: 'SCHEDULED',
    createdDate: '2024-01-18',
    estimatedStopsCount: 3,
    conflictWarnings: [],
    recentActivity: [],
  },
  {
    id: 'sch-104',
    code: 'SCH-WE-01',
    routeId: 'rt-104',
    routeName: 'West Suburbs Executive Connector',
    routeCode: 'RT-WE-04',
    startLocation: 'West Park Commuter Garage',
    endLocation: 'Off-Go Innovation HQ',
    shuttleId: 'sht-4',
    shuttleNumber: 'OFF-GO-108',
    shuttleModel: 'Ford Transit HD 350',
    driverId: 'drv-4',
    driverName: 'Elena Rostova',
    driverPhone: '+1 (555) 567-8901',
    departureTime: '05:15 PM',
    arrivalTime: '06:10 PM',
    durationMinutes: 55,
    bufferTimeMinutes: 15,
    operatingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: 'EVENING',
    status: 'DELAYED',
    createdDate: '2024-02-01',
    estimatedStopsCount: 4,
    conflictWarnings: [
      'Traffic Advisory: Highway 101 South congestion reported (+12 mins).',
    ],
    recentActivity: [
      {
        id: 'act-s3',
        action: 'Delay Warning Issued',
        timestamp: '10 mins ago',
        details: 'System automatically adjusted arrival estimate due to traffic feed.',
      },
    ],
  },
  {
    id: 'sch-105',
    code: 'SCH-EA-01',
    routeId: 'rt-105',
    routeName: 'East Bay BART Shuttle Link',
    routeCode: 'RT-EA-05',
    startLocation: 'Fremont BART Terminal',
    endLocation: 'Off-Go Innovation HQ',
    shuttleId: 'sht-5',
    shuttleNumber: 'OFF-GO-112',
    shuttleModel: 'Volvo 9700 Luxury Shuttle',
    driverId: 'drv-5',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (555) 678-9012',
    departureTime: '07:15 AM',
    arrivalTime: '08:15 AM',
    durationMinutes: 60,
    bufferTimeMinutes: 20,
    operatingDays: ['MON', 'WED', 'FRI'],
    shift: 'MORNING',
    status: 'CANCELLED',
    createdDate: '2024-02-10',
    estimatedStopsCount: 2,
    conflictWarnings: [
      'Vehicle Maintenance Lock: OFF-GO-112 is scheduled for brake pad service.',
    ],
    recentActivity: [
      {
        id: 'act-s4',
        action: 'Trip Cancelled by Dispatch',
        timestamp: 'Yesterday at 04:00 PM',
        details: 'Shuttle maintenance required. Passengers re-routed.',
      },
    ],
  },
  {
    id: 'sch-106',
    code: 'SCH-EX-03',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    startLocation: 'Off-Go Innovation HQ',
    endLocation: 'Financial District Terminal',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    shuttleModel: 'Volvo 9700 Luxury Shuttle',
    driverId: 'drv-1',
    driverName: 'David Miller',
    driverPhone: '+1 (555) 234-5678',
    departureTime: '05:30 PM',
    arrivalTime: '06:25 PM',
    durationMinutes: 55,
    bufferTimeMinutes: 15,
    operatingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: 'EVENING',
    status: 'SCHEDULED',
    createdDate: '2024-01-15',
    estimatedStopsCount: 5,
    conflictWarnings: [],
    recentActivity: [],
  },
];

const mapBackendSchedule = (s: any): ScheduleItem => {
  return {
    id: s.id ? String(s.id) : `sch-${Date.now()}`,
    code: s.code || `SCH-${Math.floor(100 + Math.random() * 900)}`,
    routeId: s.routeId ? String(s.routeId) : 'rt-101',
    routeName: s.routeName || 'Executive Corridor Line',
    routeCode: s.routeCode || 'RT-EX-01',
    startLocation: s.startLocation || 'Financial District Terminal',
    endLocation: s.endLocation || 'Corporate Innovation HQ',
    shuttleId: s.shuttleId ? String(s.shuttleId) : 'sht-1',
    shuttleNumber: s.shuttleNumber || 'OFF-GO-101',
    shuttleModel: s.shuttleModel || 'Sprinter Executive Van',
    driverId: s.driverId ? String(s.driverId) : 'drv-1',
    driverName: s.driverName || 'Assigned Fleet Driver',
    driverPhone: s.driverPhone || '415-555-0199',
    departureTime: s.departureTime ? String(s.departureTime).slice(0, 5) : '08:00',
    arrivalTime: s.arrivalTime ? String(s.arrivalTime).slice(0, 5) : '08:45',
    durationMinutes: s.durationMinutes || 45,
    bufferTimeMinutes: s.bufferTimeMinutes || 10,
    operatingDays: s.operatingDays || ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    shift: s.shift || 'MORNING',
    status: s.status || 'RUNNING',
    createdDate: s.startDate ? String(s.startDate) : new Date().toISOString().split('T')[0],
    estimatedStopsCount: s.estimatedStopsCount || 4,
    conflictWarnings: [],
    recentActivity: s.recentActivity || [],
  };
};

export const scheduleService = {
  /**
   * GET /api/v1/schedules
   */
  getSchedules: async (filters?: ScheduleFilterOptions): Promise<ScheduleItem[]> => {
    try {
      const response = await apiClient.get<any>('/schedules');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        let items = rawList.map(mapBackendSchedule);
        if (filters?.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          items = items.filter(
            (s) =>
              s.routeName.toLowerCase().includes(q) ||
              s.driverName.toLowerCase().includes(q) ||
              s.shuttleNumber.toLowerCase().includes(q)
          );
        }
        return items;
      }
      return [...mockSchedulesState];
    } catch (error) {
      console.warn('Backend /schedules error, using fallback:', error);
      return [...mockSchedulesState];
    }
  },

  /**
   * GET /api/v1/schedules/{id}
   */
  getScheduleById: async (id: string): Promise<ScheduleItem> => {
    try {
      const response = await apiClient.get<any>(`/schedules/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendSchedule(data);
      }
      throw new Error('Invalid schedule data');
    } catch {
      const found = mockSchedulesState.find((s) => s.id === id || s.code === id);
      if (!found) {
        throw new Error(`Schedule with ID ${id} not found.`);
      }
      return found;
    }
  },

  /**
   * POST /api/v1/schedules
   */
  createSchedule: async (payload: CreateSchedulePayload): Promise<ScheduleItem> => {
    try {
      const formatTime = (t?: string) => {
        if (!t) return '08:00:00';
        if (t.length === 5) return `${t}:00`;
        return t;
      };
      const backendPayload = {
        routeId: payload.routeId,
        driverId: payload.driverId,
        shuttleId: payload.shuttleId,
        departureTime: formatTime(payload.departureTime),
        arrivalTime: formatTime(payload.arrivalTime),
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      };
      const response = await apiClient.post<any>('/schedules', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendSchedule(data);
      mockSchedulesState = [created, ...mockSchedulesState];
      return created;
    } catch (error) {
      console.warn('Create schedule backend call failed, fallback locally:', error);
      const newSchedule: ScheduleItem = {
        id: `sch-${Date.now()}`,
        code: `SCH-TRP-${Math.floor(100 + Math.random() * 900)}`,
        routeId: payload.routeId,
        routeName: 'HQ Financial District Express Line A',
        routeCode: 'RT-EX-01',
        startLocation: 'Financial District Terminal',
        endLocation: 'Off-Go Innovation HQ',
        shuttleId: payload.shuttleId,
        shuttleNumber: 'OFF-GO-' + Math.floor(100 + Math.random() * 50),
        shuttleModel: 'Volvo 9700 Luxury Shuttle',
        driverId: payload.driverId,
        driverName: 'Assigned Fleet Driver',
        driverPhone: '+1 (555) 000-1122',
        departureTime: payload.departureTime,
        arrivalTime: payload.arrivalTime,
        durationMinutes: payload.durationMinutes || 45,
        bufferTimeMinutes: payload.bufferTimeMinutes || 15,
        operatingDays: payload.operatingDays || ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        shift: payload.shift || 'MORNING',
        status: payload.status || 'SCHEDULED',
        createdDate: new Date().toISOString().split('T')[0],
        estimatedStopsCount: 4,
        conflictWarnings: [],
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            action: 'Schedule Created in Dispatch System',
            timestamp: 'Just now',
            details: 'Trip timing and operating days published to driver portal.',
          },
        ],
      };

      mockSchedulesState = [newSchedule, ...mockSchedulesState];
      return newSchedule;
    }
  },

  /**
   * PUT /api/v1/schedules/{id}
   */
  updateSchedule: async (payload: UpdateSchedulePayload): Promise<ScheduleItem> => {
    try {
      const response = await apiClient.put<any>(`/schedules/${payload.id}`, payload);
      const data = response.data?.data || response.data;
      const updated = mapBackendSchedule(data);
      const idx = mockSchedulesState.findIndex((s) => s.id === payload.id);
      if (idx !== -1) mockSchedulesState[idx] = updated;
      return updated;
    } catch {
      const idx = mockSchedulesState.findIndex((s) => s.id === payload.id);
      if (idx === -1) {
        throw new Error(`Schedule with ID ${payload.id} not found.`);
      }

      const existing = mockSchedulesState[idx];
      const updated: ScheduleItem = {
        ...existing,
        ...payload,
        departureTime: payload.departureTime || existing.departureTime,
        arrivalTime: payload.arrivalTime || existing.arrivalTime,
        durationMinutes: payload.durationMinutes ?? existing.durationMinutes,
        bufferTimeMinutes: payload.bufferTimeMinutes ?? existing.bufferTimeMinutes,
        operatingDays: payload.operatingDays || existing.operatingDays,
        shift: payload.shift || existing.shift,
        status: payload.status || existing.status,
      };

      mockSchedulesState[idx] = updated;
      return updated;
    }
  },

  /**
   * DELETE /api/v1/schedules/{id}
   */
  deleteSchedule: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/schedules/${id}`);
      mockSchedulesState = mockSchedulesState.filter((s) => s.id !== id);
      return true;
    } catch {
      mockSchedulesState = mockSchedulesState.filter((s) => s.id !== id);
      return true;
    }
  },
};
