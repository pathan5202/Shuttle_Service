import apiClient from '../api/axios';
import {
  RouteDetailItem,
  CreateRoutePayload,
  UpdateRoutePayload,
  RouteFilterOptions,
} from '../types';

let mockRoutesState: RouteDetailItem[] = [
  {
    id: 'rt-101',
    code: 'RT-EX-01',
    name: 'HQ Financial District Express Line A',
    description: 'High-frequency executive corridor connecting Financial Hub with Off-Go Main Tech Campus.',
    startPoint: {
      name: 'Financial District Terminal',
      address: 'Market St & 1st St, San Francisco, CA',
      lat: 37.7905,
      lng: -122.398,
    },
    destination: {
      name: 'Off-Go Innovation HQ',
      address: '500 Townsend St, San Francisco, CA',
      lat: 37.7712,
      lng: -122.404,
    },
    totalStops: 5,
    stops: [
      {
        id: 'stp-1',
        name: 'Financial District Terminal',
        address: 'Market St & 1st St',
        lat: 37.7905,
        lng: -122.398,
        sequenceOrder: 1,
        scheduledTime: '07:30 AM',
        passengerBoardingCount: 18,
        passengerAlightingCount: 0,
      },
      {
        id: 'stp-2',
        name: 'Montgomery BART Transit Gate',
        address: '599 Market St',
        lat: 37.789,
        lng: -122.401,
        sequenceOrder: 2,
        scheduledTime: '07:42 AM',
        passengerBoardingCount: 12,
        passengerAlightingCount: 2,
      },
      {
        id: 'stp-3',
        name: 'SOMA Tech Plaza Stop',
        address: '3rd St & Folsom St',
        lat: 37.784,
        lng: -122.399,
        sequenceOrder: 3,
        scheduledTime: '07:55 AM',
        passengerBoardingCount: 8,
        passengerAlightingCount: 5,
      },
      {
        id: 'stp-4',
        name: 'Mission Bay Transit Hub',
        address: '4th St & King St',
        lat: 37.777,
        lng: -122.393,
        sequenceOrder: 4,
        scheduledTime: '08:10 AM',
        passengerBoardingCount: 6,
        passengerAlightingCount: 14,
      },
      {
        id: 'stp-5',
        name: 'Off-Go Innovation HQ',
        address: '500 Townsend St',
        lat: 37.7712,
        lng: -122.404,
        sequenceOrder: 5,
        scheduledTime: '08:25 AM',
        passengerBoardingCount: 0,
        passengerAlightingCount: 23,
      },
    ],
    totalDistanceKm: 8.4,
    estimatedDurationMinutes: 28,
    assignedShuttle: {
      id: 'sht-001',
      vehicleNumber: 'OFF-GO-101',
      model: 'Sprinter EV 2500',
      capacity: 18,
      status: 'IN_SERVICE',
    },
    assignedDriver: {
      id: 'drv-001',
      driverId: 'DRV-1001',
      name: 'Marcus Vance',
      phone: '+1 (555) 012-3456',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    status: 'ACTIVE',
    createdDate: '2024-01-15',
    dailyRidership: 340,
    schedules: [
      {
        id: 'sch-1',
        departureTime: '07:30 AM',
        arrivalTime: '08:00 AM',
        frequency: 'Every 15 mins',
        activeShuttleNumber: 'OFF-GO-101',
      },
      {
        id: 'sch-2',
        departureTime: '08:30 AM',
        arrivalTime: '09:00 AM',
        frequency: 'Every 15 mins',
        activeShuttleNumber: 'OFF-GO-104',
      },
    ],
    recentActivity: [
      {
        id: 'act-1',
        action: 'Route Optimization Complete',
        timestamp: '1 hour ago',
        details: 'Traffic re-routing reduced trip time by 4 minutes.',
      },
      {
        id: 'act-2',
        action: 'Shuttle Assigned',
        timestamp: '3 hours ago',
        details: 'Vehicle OFF-GO-101 assigned to morning shift.',
      },
    ],
  },
  {
    id: 'rt-102',
    code: 'RT-NC-02',
    name: 'North Tech Corridor Loop B',
    description: 'Connects North Campus residential apartments with South R&D labs and Bayfront Ferry Terminal.',
    startPoint: {
      name: 'Marina North Station',
      address: 'Lombard St & Van Ness Ave, San Francisco, CA',
      lat: 37.8005,
      lng: -122.424,
    },
    destination: {
      name: 'Bayfront R&D Complex',
      address: 'Illinois St & 16th St, San Francisco, CA',
      lat: 37.765,
      lng: -122.387,
    },
    totalStops: 8,
    stops: [
      {
        id: 'stp-10',
        name: 'Marina North Station',
        address: 'Lombard St & Van Ness Ave',
        lat: 37.8005,
        lng: -122.424,
        sequenceOrder: 1,
        scheduledTime: '08:00 AM',
        passengerBoardingCount: 22,
        passengerAlightingCount: 0,
      },
      {
        id: 'stp-11',
        name: 'Polk Street Village Stop',
        address: 'Polk St & Broadway',
        lat: 37.796,
        lng: -122.421,
        sequenceOrder: 2,
        scheduledTime: '08:12 AM',
        passengerBoardingCount: 14,
        passengerAlightingCount: 1,
      },
      {
        id: 'stp-12',
        name: 'Civic Center Commuter Hub',
        address: 'Van Ness Ave & McAllister St',
        lat: 37.781,
        lng: -122.419,
        sequenceOrder: 3,
        scheduledTime: '08:26 AM',
        passengerBoardingCount: 10,
        passengerAlightingCount: 4,
      },
      {
        id: 'stp-13',
        name: 'Bayfront R&D Complex',
        address: 'Illinois St & 16th St',
        lat: 37.765,
        lng: -122.387,
        sequenceOrder: 4,
        scheduledTime: '08:45 AM',
        passengerBoardingCount: 0,
        passengerAlightingCount: 41,
      },
    ],
    totalDistanceKm: 12.8,
    estimatedDurationMinutes: 42,
    assignedShuttle: {
      id: 'sht-002',
      vehicleNumber: 'OFF-GO-104',
      model: 'Ford E-Transit',
      capacity: 14,
      status: 'AVAILABLE',
    },
    assignedDriver: {
      id: 'drv-002',
      driverId: 'DRV-1002',
      name: 'Samantha Reed',
      phone: '+1 (555) 012-7890',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    status: 'ACTIVE',
    createdDate: '2024-02-01',
    dailyRidership: 410,
    schedules: [
      {
        id: 'sch-3',
        departureTime: '08:00 AM',
        arrivalTime: '08:45 AM',
        frequency: 'Every 20 mins',
        activeShuttleNumber: 'OFF-GO-104',
      },
    ],
    recentActivity: [
      {
        id: 'act-3',
        action: 'Schedule Compliance 98%',
        timestamp: 'Yesterday',
        details: 'All trips completed within target window.',
      },
    ],
  },
  {
    id: 'rt-103',
    code: 'RT-SC-03',
    name: 'South Campus Metro Express C',
    description: 'High-capacity shuttle line servicing South Airport Gateway and Central Engineering.',
    startPoint: {
      name: 'South Airport Transit Hub',
      address: 'Aviation Blvd & Airport Access Rd, San Francisco, CA',
      lat: 37.6213,
      lng: -122.379,
    },
    destination: {
      name: 'Central Engineering Campus',
      address: '2000 Silicon Way, San Mateo, CA',
      lat: 37.563,
      lng: -122.325,
    },
    totalStops: 12,
    stops: [
      {
        id: 'stp-20',
        name: 'South Airport Transit Hub',
        address: 'Aviation Blvd & Airport Access Rd',
        lat: 37.6213,
        lng: -122.379,
        sequenceOrder: 1,
        scheduledTime: '06:45 AM',
        passengerBoardingCount: 30,
        passengerAlightingCount: 0,
      },
      {
        id: 'stp-21',
        name: 'Central Engineering Campus',
        address: '2000 Silicon Way',
        lat: 37.563,
        lng: -122.325,
        sequenceOrder: 2,
        scheduledTime: '07:30 AM',
        passengerBoardingCount: 0,
        passengerAlightingCount: 30,
      },
    ],
    totalDistanceKm: 24.5,
    estimatedDurationMinutes: 38,
    assignedShuttle: {
      id: 'sht-003',
      vehicleNumber: 'OFF-GO-201',
      model: 'BYD K9 Metro Electric',
      capacity: 32,
      status: 'IN_SERVICE',
    },
    assignedDriver: {
      id: 'drv-003',
      driverId: 'DRV-1003',
      name: 'Carlos Mendoza',
      phone: '+1 (555) 012-9988',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    status: 'ACTIVE',
    createdDate: '2023-11-10',
    dailyRidership: 520,
    schedules: [
      {
        id: 'sch-4',
        departureTime: '06:45 AM',
        arrivalTime: '07:30 AM',
        frequency: 'Every 30 mins',
        activeShuttleNumber: 'OFF-GO-201',
      },
    ],
    recentActivity: [
      {
        id: 'act-4',
        action: 'Safety Inspection Verified',
        timestamp: '2 days ago',
        details: 'Vehicle safety telemetry synced.',
      },
    ],
  },
  {
    id: 'rt-104',
    code: 'RT-WE-04',
    name: 'West Suburbs Executive Connector',
    description: 'Suburban commuter shuttle connecting West Peninsula housing complexes to Tech HQ.',
    startPoint: {
      name: 'West Park Commuter Garage',
      address: 'El Camino Real & 28th Ave, San Mateo, CA',
      lat: 37.545,
      lng: -122.302,
    },
    destination: {
      name: 'Off-Go Tech Center',
      address: '100 Innovation Way, Redwood City, CA',
      lat: 37.485,
      lng: -122.236,
    },
    totalStops: 4,
    stops: [
      {
        id: 'stp-30',
        name: 'West Park Commuter Garage',
        address: 'El Camino Real & 28th Ave',
        lat: 37.545,
        lng: -122.302,
        sequenceOrder: 1,
        scheduledTime: '07:15 AM',
        passengerBoardingCount: 15,
        passengerAlightingCount: 0,
      },
      {
        id: 'stp-31',
        name: 'Off-Go Tech Center',
        address: '100 Innovation Way',
        lat: 37.485,
        lng: -122.236,
        sequenceOrder: 2,
        scheduledTime: '07:45 AM',
        passengerBoardingCount: 0,
        passengerAlightingCount: 15,
      },
    ],
    totalDistanceKm: 18.2,
    estimatedDurationMinutes: 30,
    assignedShuttle: undefined,
    assignedDriver: undefined,
    status: 'UNDER_MAINTENANCE',
    createdDate: '2024-03-01',
    dailyRidership: 180,
    schedules: [],
    recentActivity: [
      {
        id: 'act-5',
        action: 'Status Changed to Under Maintenance',
        timestamp: 'Yesterday',
        details: 'Roadwork along El Camino Real required temporary suspension.',
      },
    ],
  },
  {
    id: 'rt-105',
    code: 'RT-EA-05',
    name: 'East Bay BART Shuttle Link',
    description: 'Cross-bay commuter connection bridging East Bay BART hubs to Silicon Valley West.',
    startPoint: {
      name: 'Fremont BART Terminal',
      address: 'Bart Way, Fremont, CA',
      lat: 37.557,
      lng: -121.976,
    },
    destination: {
      name: 'Palo Alto Research Park',
      address: 'Page Mill Rd, Palo Alto, CA',
      lat: 37.418,
      lng: -122.143,
    },
    totalStops: 6,
    stops: [
      {
        id: 'stp-40',
        name: 'Fremont BART Terminal',
        address: 'Bart Way, Fremont',
        lat: 37.557,
        lng: -121.976,
        sequenceOrder: 1,
        scheduledTime: '06:30 AM',
        passengerBoardingCount: 28,
        passengerAlightingCount: 0,
      },
      {
        id: 'stp-41',
        name: 'Palo Alto Research Park',
        address: 'Page Mill Rd, Palo Alto',
        lat: 37.418,
        lng: -122.143,
        sequenceOrder: 2,
        scheduledTime: '07:20 AM',
        passengerBoardingCount: 0,
        passengerAlightingCount: 28,
      },
    ],
    totalDistanceKm: 31.0,
    estimatedDurationMinutes: 50,
    assignedShuttle: undefined,
    assignedDriver: undefined,
    status: 'INACTIVE',
    createdDate: '2023-09-20',
    dailyRidership: 0,
    schedules: [],
    recentActivity: [],
  },
];

const mapBackendRoute = (r: any): RouteDetailItem => {
  return {
    id: r.id ? String(r.id) : `rt-${Date.now()}`,
    code: r.routeCode || r.code || 'RT-101',
    name: r.routeName || r.name || 'Executive Express Route',
    description: r.description || 'Standard corporate transit route.',
    startPoint: r.startPoint || {
      name: r.source || 'Terminal Station',
      address: r.source || 'Market St, San Francisco, CA',
      lat: 37.7905,
      lng: -122.398,
    },
    destination: r.destinationPoint || {
      name: r.destination || 'Campus HQ',
      address: r.destination || 'Townsend St, San Francisco, CA',
      lat: 37.7712,
      lng: -122.404,
    },
    totalStops: r.totalStops || 4,
    stops: r.stops || [],
    totalDistanceKm: Number(r.distanceKm ?? r.totalDistanceKm ?? 10.0),
    estimatedDurationMinutes: Number(r.estimatedDurationMinutes ?? 25),
    status: r.status || (r.active !== false ? 'ACTIVE' : 'INACTIVE'),
    createdDate: r.createdDate || new Date().toISOString().split('T')[0],
    dailyRidership: r.dailyRidership || 150,
    schedules: r.schedules || [],
    recentActivity: r.recentActivity || [],
    assignedShuttle: r.assignedShuttle,
    assignedDriver: r.assignedDriver,
  };
};

export const routeService = {
  /**
   * GET /api/v1/routes
   */
  getRoutes: async (filters?: RouteFilterOptions): Promise<RouteDetailItem[]> => {
    try {
      const response = await apiClient.get<any>('/routes');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        let items = rawList.map(mapBackendRoute);
        if (filters?.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          items = items.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.code.toLowerCase().includes(q) ||
              r.startPoint.name.toLowerCase().includes(q) ||
              r.destination.name.toLowerCase().includes(q)
          );
        }
        return items;
      }
      return [...mockRoutesState];
    } catch (error) {
      console.warn('Backend /routes error, using fallback:', error);
      return [...mockRoutesState];
    }
  },

  /**
   * GET /api/v1/routes/{id}
   */
  getRouteById: async (id: string): Promise<RouteDetailItem> => {
    try {
      const response = await apiClient.get<any>(`/routes/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendRoute(data);
      }
      throw new Error('Invalid route data');
    } catch {
      const found = mockRoutesState.find((r) => r.id === id || r.code === id);
      if (!found) {
        throw new Error(`Route with ID ${id} not found.`);
      }
      return found;
    }
  },

  /**
   * POST /api/v1/routes
   */
  createRoute: async (payload: CreateRoutePayload): Promise<RouteDetailItem> => {
    try {
      const backendPayload = {
        routeCode: (payload as any).code || `RT-${Math.floor(100 + Math.random() * 900)}`,
        routeName: payload.name,
        source: payload.startPoint?.name || 'Origin Station',
        destination: payload.destination?.name || 'Destination Terminal',
        distanceKm: Number(payload.totalDistanceKm) || 10.0,
        estimatedDurationMinutes: Number(payload.estimatedDurationMinutes) || 25,
      };
      const response = await apiClient.post<any>('/routes', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendRoute(data);
      mockRoutesState = [created, ...mockRoutesState];
      return created;
    } catch (error) {
      console.warn('Create route backend call failed, fallback locally:', error);
      const newRoute: RouteDetailItem = {
        id: `rt-${Date.now()}`,
        code: (payload as any).code || `RT-CUSTOM-${Math.floor(100 + Math.random() * 900)}`,
        name: payload.name,
        description: payload.description || 'Custom configured commuter route.',
        startPoint: payload.startPoint,
        destination: payload.destination,
        totalStops: payload.stops?.length || 2,
        stops: payload.stops || [],
        totalDistanceKm: Number(payload.totalDistanceKm) || 10.0,
        estimatedDurationMinutes: Number(payload.estimatedDurationMinutes) || 25,
        status: payload.status || 'ACTIVE',
        createdDate: new Date().toISOString().split('T')[0],
        dailyRidership: 0,
        schedules: [],
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            action: 'Route Created',
            timestamp: 'Just now',
            details: 'Initial route geometry and stop sequence defined.',
          },
        ],
      };

      mockRoutesState = [newRoute, ...mockRoutesState];
      return newRoute;
    }
  },

  /**
   * PUT /api/v1/routes/{id}
   */
  updateRoute: async (payload: UpdateRoutePayload): Promise<RouteDetailItem> => {
    try {
      const backendPayload = {
        routeName: payload.name,
        source: payload.startPoint?.name || 'Origin Station',
        destination: payload.destination?.name || 'Destination Terminal',
        distanceKm: Number(payload.totalDistanceKm) || 10.0,
        estimatedDurationMinutes: Number(payload.estimatedDurationMinutes) || 25,
        status: payload.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
      };
      const response = await apiClient.put<any>(`/routes/${payload.id}`, backendPayload);
      const data = response.data?.data || response.data;
      const updated = mapBackendRoute(data);
      const idx = mockRoutesState.findIndex((r) => r.id === payload.id);
      if (idx !== -1) mockRoutesState[idx] = updated;
      return updated;
    } catch {
      const idx = mockRoutesState.findIndex((r) => r.id === payload.id);
      if (idx === -1) {
        throw new Error(`Route with ID ${payload.id} not found.`);
      }

      const existing = mockRoutesState[idx];
      const updated: RouteDetailItem = {
        ...existing,
        ...payload,
        name: payload.name || existing.name,
        description: payload.description ?? existing.description,
        startPoint: payload.startPoint || existing.startPoint,
        destination: payload.destination || existing.destination,
        totalDistanceKm: payload.totalDistanceKm ? Number(payload.totalDistanceKm) : existing.totalDistanceKm,
        estimatedDurationMinutes: payload.estimatedDurationMinutes
          ? Number(payload.estimatedDurationMinutes)
          : existing.estimatedDurationMinutes,
        status: payload.status || existing.status,
        stops: payload.stops || existing.stops,
        totalStops: payload.stops ? payload.stops.length : existing.totalStops,
      };

      mockRoutesState[idx] = updated;
      return updated;
    }
  },

  /**
   * DELETE /api/v1/routes/{id}
   */
  deleteRoute: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/routes/${id}`);
      mockRoutesState = mockRoutesState.filter((r) => r.id !== id);
      return true;
    } catch {
      mockRoutesState = mockRoutesState.filter((r) => r.id !== id);
      return true;
    }
  },
};
