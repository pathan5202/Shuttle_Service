import apiClient from '../api/axios';
import {
  ShuttleDetailItem,
  CreateShuttlePayload,
  UpdateShuttlePayload,
  ShuttleFilterOptions,
} from '../types';

let mockShuttlesState: ShuttleDetailItem[] = [
  {
    id: 'sht-001',
    vehicleNumber: 'OFF-GO-101',
    vehicleType: 'Sprinter Van',
    manufacturer: 'Mercedes-Benz',
    model: 'Sprinter EV 2500',
    capacity: 18,
    occupancy: 12,
    fuelType: 'Electric',
    fuelLevelPercent: 88,
    registrationNumber: 'CAL-SF-99120',
    registrationDate: '2023-05-12',
    status: 'IN_SERVICE',
    color: 'Midnight Blue',
    assignedDriver: {
      id: 'drv-001',
      driverId: 'DRV-1001',
      name: 'Marcus Vance',
      phone: '+1 (555) 012-3456',
      email: 'marcus.vance@offgo.fleet.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    assignedRoute: {
      id: 'rt-001',
      code: 'EX-A1',
      name: 'HQ Express Line A',
      totalStops: 6,
    },
    maintenanceInfo: {
      lastServiceDate: '2024-05-10',
      nextServiceDueDate: '2024-11-10',
      healthScorePercent: 96,
      openIssuesCount: 0,
      notes: 'Battery health optimal. All tire pressure checks passed.',
    },
    currentLocation: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'Market St & 4th St, San Francisco',
    },
    lastUpdated: '2 mins ago',
    notes: 'Primary executive transport van equipped with high-speed WiFi and AC.',
  },
  {
    id: 'sht-002',
    vehicleNumber: 'OFF-GO-104',
    vehicleType: 'Sprinter Van',
    manufacturer: 'Ford',
    model: 'E-Transit Custom',
    capacity: 14,
    occupancy: 0,
    fuelType: 'Electric',
    fuelLevelPercent: 94,
    registrationNumber: 'CAL-SF-44210',
    registrationDate: '2024-01-20',
    status: 'AVAILABLE',
    color: 'Pure White',
    assignedDriver: {
      id: 'drv-002',
      driverId: 'DRV-1002',
      name: 'Samantha Reed',
      phone: '+1 (555) 012-7890',
      email: 'samantha.reed@offgo.fleet.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    assignedRoute: {
      id: 'rt-002',
      code: 'NC-B2',
      name: 'North Tech Corridor B',
      totalStops: 8,
    },
    maintenanceInfo: {
      lastServiceDate: '2024-06-01',
      nextServiceDueDate: '2024-12-01',
      healthScorePercent: 98,
      openIssuesCount: 0,
      notes: 'Regular scheduled inspection verified clean status.',
    },
    currentLocation: {
      lat: 37.7833,
      lng: -122.4167,
      address: '5th Street Depot Bay 3',
    },
    lastUpdated: '10 mins ago',
    notes: 'Assigned to North Tech Corridor shift starting 09:45 AM.',
  },
  {
    id: 'sht-003',
    vehicleNumber: 'OFF-GO-201',
    vehicleType: 'Electric Bus',
    manufacturer: 'BYD',
    model: 'K9 Metro Electric',
    capacity: 32,
    occupancy: 28,
    fuelType: 'Electric',
    fuelLevelPercent: 62,
    registrationNumber: 'CAL-SF-88331',
    registrationDate: '2022-11-15',
    status: 'IN_SERVICE',
    color: 'Silver Grey',
    assignedDriver: {
      id: 'drv-003',
      driverId: 'DRV-1003',
      name: 'Carlos Mendoza',
      phone: '+1 (555) 012-9988',
      email: 'carlos.mendoza@offgo.fleet.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    assignedRoute: {
      id: 'rt-003',
      code: 'SC-C3',
      name: 'South Campus Loop C',
      totalStops: 12,
    },
    maintenanceInfo: {
      lastServiceDate: '2024-04-15',
      nextServiceDueDate: '2024-10-15',
      healthScorePercent: 91,
      openIssuesCount: 1,
      notes: 'Scheduled for routine brake pad check next month.',
    },
    currentLocation: {
      lat: 37.765,
      lng: -122.408,
      address: 'South Gate Bus Terminal',
    },
    lastUpdated: '1 min ago',
    notes: 'High-capacity shuttle for peak campus morning commutes.',
  },
  {
    id: 'sht-004',
    vehicleNumber: 'OFF-GO-302',
    vehicleType: 'Coach Bus',
    manufacturer: 'Volvo',
    model: '9700 Grand Coach',
    capacity: 45,
    occupancy: 0,
    fuelType: 'Diesel',
    fuelLevelPercent: 42,
    registrationNumber: 'CAL-SF-11002',
    registrationDate: '2021-08-10',
    status: 'MAINTENANCE',
    color: 'Dark Grey',
    assignedDriver: undefined,
    assignedRoute: undefined,
    maintenanceInfo: {
      lastServiceDate: '2024-07-01',
      nextServiceDueDate: '2024-07-25',
      healthScorePercent: 74,
      openIssuesCount: 2,
      notes: 'Undergoing transmission fluid flush & HVAC filter replacement.',
    },
    currentLocation: {
      lat: 37.75,
      lng: -122.39,
      address: 'Central Fleet Maintenance Hub Bay 12',
    },
    lastUpdated: '1 hour ago',
    notes: 'Temporarily out of service for preventative maintenance.',
  },
  {
    id: 'sht-005',
    vehicleNumber: 'OFF-GO-109',
    vehicleType: 'Minivan',
    manufacturer: 'Toyota',
    model: 'Sienna Hybrid Prime',
    capacity: 8,
    occupancy: 0,
    fuelType: 'Hybrid',
    fuelLevelPercent: 95,
    registrationNumber: 'CAL-SF-77811',
    registrationDate: '2023-09-01',
    status: 'AVAILABLE',
    color: 'Obsidian Black',
    assignedDriver: undefined,
    assignedRoute: undefined,
    maintenanceInfo: {
      lastServiceDate: '2024-05-20',
      nextServiceDueDate: '2024-11-20',
      healthScorePercent: 99,
      openIssuesCount: 0,
      notes: 'Full synthetic oil change completed.',
    },
    currentLocation: {
      lat: 37.78,
      lng: -122.41,
      address: 'HQ VIP Garage',
    },
    lastUpdated: 'Just now',
    notes: 'Reserved for VIP executive transport & rapid on-demand dispatch.',
  },
];

const mapBackendShuttle = (s: any): ShuttleDetailItem => {
  return {
    id: s.id ? String(s.id) : `sht-${Date.now()}`,
    vehicleNumber: s.vehicleNumber || 'OFF-GO-100',
    vehicleType: s.vehicleType || 'VAN',
    manufacturer: s.manufacturer || 'Mercedes-Benz',
    model: s.vehicleName || s.model || 'Sprinter Executive',
    capacity: Number(s.capacity) || 18,
    occupancy: (Number(s.capacity) || 18) - (Number(s.availableSeats) || 0),
    fuelType: s.fuelType || 'Electric',
    fuelLevelPercent: s.fuelLevelPercent || 90,
    registrationNumber: s.registrationNumber || s.vehicleNumber || 'CAL-SF-1000',
    registrationDate: s.registrationDate || '2024-01-01',
    status: s.status || 'IN_SERVICE',
    color: s.color || 'Midnight Blue',
    maintenanceInfo: s.maintenanceInfo || {
      lastServiceDate: '2025-01-01',
      nextServiceDueDate: '2025-07-01',
      healthScorePercent: 98,
      openIssuesCount: 0,
      notes: 'Optimal fleet condition.',
    },
    currentLocation: s.currentLocation || {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco Central Hub',
    },
    lastUpdated: 'Just now',
    notes: s.notes || 'Equipped with GPS tracking and WiFi.',
    assignedDriver: s.assignedDriver,
    assignedRoute: s.assignedRoute,
  };
};

export const shuttleService = {
  /**
   * GET /api/v1/shuttles
   */
  getShuttles: async (filters?: ShuttleFilterOptions): Promise<ShuttleDetailItem[]> => {
    try {
      const response = await apiClient.get<any>('/shuttles');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        let items = rawList.map(mapBackendShuttle);
        if (filters?.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          items = items.filter(
            (s) =>
              s.vehicleNumber.toLowerCase().includes(q) ||
              s.model.toLowerCase().includes(q) ||
              s.manufacturer.toLowerCase().includes(q)
          );
        }
        return items;
      }
      return mockShuttlesState;
    } catch (error) {
      console.warn('Backend /shuttles error, using fallback:', error);
      return mockShuttlesState;
    }
  },

  /**
   * GET /api/v1/shuttles/{id}
   */
  getShuttleById: async (id: string): Promise<ShuttleDetailItem> => {
    try {
      const response = await apiClient.get<any>(`/shuttles/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendShuttle(data);
      }
      throw new Error('Invalid shuttle data');
    } catch {
      const found = mockShuttlesState.find((s) => s.id === id || s.vehicleNumber === id);
      if (!found) {
        throw new Error(`Shuttle with ID ${id} not found.`);
      }
      return found;
    }
  },

  /**
   * POST /api/v1/shuttles
   */
  createShuttle: async (payload: CreateShuttlePayload): Promise<ShuttleDetailItem> => {
    try {
      const vType = (payload.vehicleType?.toUpperCase().includes('BUS') ? 'BUS' : 'VAN') as 'BUS' | 'MINI_BUS' | 'VAN';
      const backendPayload = {
        vehicleNumber: payload.vehicleNumber,
        vehicleName: payload.model || payload.vehicleType || 'Shuttle Van',
        vehicleType: vType,
        capacity: Number(payload.capacity) || 14,
      };
      const response = await apiClient.post<any>('/shuttles', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendShuttle(data);
      mockShuttlesState = [created, ...mockShuttlesState];
      return created;
    } catch (error) {
      console.warn('Create shuttle backend call failed, fallback locally:', error);
      const newShuttle: ShuttleDetailItem = {
        id: `sht-${Date.now()}`,
        vehicleNumber: payload.vehicleNumber || `OFF-GO-${Math.floor(100 + Math.random() * 900)}`,
        vehicleType: payload.vehicleType || 'Sprinter Van',
        manufacturer: payload.manufacturer || 'Mercedes-Benz',
        model: payload.model || 'Sprinter EV',
        capacity: Number(payload.capacity) || 14,
        occupancy: 0,
        fuelType: payload.fuelType || 'Electric',
        fuelLevelPercent: 100,
        registrationNumber: payload.registrationNumber || `CAL-SF-${Math.floor(10000 + Math.random() * 90000)}`,
        registrationDate: payload.registrationDate || new Date().toISOString().split('T')[0],
        status: payload.status || 'AVAILABLE',
        color: payload.color || 'White',
        notes: payload.notes || 'Newly provisioned shuttle vehicle.',
        lastUpdated: 'Just now',
        maintenanceInfo: {
          lastServiceDate: new Date().toISOString().split('T')[0],
          nextServiceDueDate: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
          healthScorePercent: 100,
          openIssuesCount: 0,
          notes: 'Initial pre-delivery fleet inspection passed.',
        },
        currentLocation: {
          lat: 37.7749,
          lng: -122.4194,
          address: 'Main Depot Yard',
        },
      };

      mockShuttlesState = [newShuttle, ...mockShuttlesState];
      return newShuttle;
    }
  },

  /**
   * PUT /api/v1/shuttles/{id}
   */
  updateShuttle: async (payload: UpdateShuttlePayload): Promise<ShuttleDetailItem> => {
    try {
      const vType = (payload.vehicleType?.toUpperCase().includes('BUS') ? 'BUS' : 'VAN') as 'BUS' | 'MINI_BUS' | 'VAN';
      const backendPayload = {
        vehicleName: payload.model || payload.vehicleType || 'Shuttle Van',
        vehicleType: vType,
        capacity: Number(payload.capacity) || 14,
        status: payload.status === 'MAINTENANCE' ? 'MAINTENANCE' : 'ACTIVE',
        trackingEnabled: true,
      };
      const response = await apiClient.put<any>(`/shuttles/${payload.id}`, backendPayload);
      const data = response.data?.data || response.data;
      const updated = mapBackendShuttle(data);
      const idx = mockShuttlesState.findIndex((s) => s.id === payload.id);
      if (idx !== -1) mockShuttlesState[idx] = updated;
      return updated;
    } catch {
      const idx = mockShuttlesState.findIndex((s) => s.id === payload.id);
      if (idx === -1) {
        throw new Error(`Shuttle with ID ${payload.id} not found.`);
      }

      const existing = mockShuttlesState[idx];
      const updated: ShuttleDetailItem = {
        ...existing,
        ...payload,
        capacity: payload.capacity ? Number(payload.capacity) : existing.capacity,
        lastUpdated: 'Just now',
      };

      mockShuttlesState[idx] = updated;
      return updated;
    }
  },

  /**
   * DELETE /api/v1/shuttles/{id}
   */
  deleteShuttle: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/shuttles/${id}`);
      mockShuttlesState = mockShuttlesState.filter((s) => s.id !== id);
      return true;
    } catch {
      mockShuttlesState = mockShuttlesState.filter((s) => s.id !== id);
      return true;
    }
  },
};
