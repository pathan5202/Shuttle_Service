import apiClient from '../api/axios';
import {
  AssignedRouteStop,
  AssignStopToRoutePayload,
  ReorderRouteStopsPayload,
  StopDetailItem,
} from '../types';
import { stopService } from './stopService';

// Internal state store for mock assigned stops per route ID
const mockRouteStopsMap: Record<string, AssignedRouteStop[]> = {
  'rt-101': [
    {
      id: 'asgn-1',
      stopId: 'stp-101',
      code: 'STP-SF-101',
      name: 'Financial District Terminal',
      address: 'Market St & 1st St, San Francisco, CA 94105',
      lat: 37.7905,
      lng: -122.398,
      landmark: 'Salesforce Transit Center Gate 4',
      city: 'San Francisco',
      zone: 'Zone A - Downtown Core',
      sequenceOrder: 1,
      estimatedArrivalMinutes: 0,
      travelTimeFromPrevMinutes: 0,
      distanceFromPrevKm: 0,
      status: 'ACTIVE',
      passengerBoardingCount: 18,
      passengerAlightingCount: 0,
      scheduledTime: '07:30 AM',
    },
    {
      id: 'asgn-2',
      stopId: 'stp-102',
      code: 'STP-SF-102',
      name: 'Montgomery BART Transit Gate',
      address: '599 Market St, San Francisco, CA 94105',
      lat: 37.789,
      lng: -122.401,
      landmark: 'Palace Hotel Entrance / BART Plaza',
      city: 'San Francisco',
      zone: 'Zone A - Downtown Core',
      sequenceOrder: 2,
      estimatedArrivalMinutes: 12,
      travelTimeFromPrevMinutes: 12,
      distanceFromPrevKm: 1.2,
      status: 'ACTIVE',
      passengerBoardingCount: 12,
      passengerAlightingCount: 2,
      scheduledTime: '07:42 AM',
    },
    {
      id: 'asgn-3',
      stopId: 'stp-103',
      code: 'STP-SF-103',
      name: 'SOMA Tech Plaza Stop',
      address: '3rd St & Folsom St, San Francisco, CA 94107',
      lat: 37.784,
      lng: -122.399,
      landmark: 'Moscone Center West',
      city: 'San Francisco',
      zone: 'Zone B - SOMA Tech Corridor',
      sequenceOrder: 3,
      estimatedArrivalMinutes: 25,
      travelTimeFromPrevMinutes: 13,
      distanceFromPrevKm: 1.8,
      status: 'ACTIVE',
      passengerBoardingCount: 8,
      passengerAlightingCount: 5,
      scheduledTime: '07:55 AM',
    },
    {
      id: 'asgn-4',
      stopId: 'stp-104',
      code: 'STP-SF-104',
      name: 'Mission Bay Transit Hub',
      address: '4th St & King St, San Francisco, CA 94107',
      lat: 37.777,
      lng: -122.393,
      landmark: 'Caltrain Depot Plaza',
      city: 'San Francisco',
      zone: 'Zone B - SOMA Tech Corridor',
      sequenceOrder: 4,
      estimatedArrivalMinutes: 40,
      travelTimeFromPrevMinutes: 15,
      distanceFromPrevKm: 2.3,
      status: 'ACTIVE',
      passengerBoardingCount: 6,
      passengerAlightingCount: 14,
      scheduledTime: '08:10 AM',
    },
    {
      id: 'asgn-5',
      stopId: 'stp-105',
      code: 'STP-SF-105',
      name: 'Off-Go Innovation HQ',
      address: '500 Townsend St, San Francisco, CA 94103',
      lat: 37.7712,
      lng: -122.404,
      landmark: 'Off-Go Main Building A - Loading Bay 2',
      city: 'San Francisco',
      zone: 'Zone B - SOMA Tech Corridor',
      sequenceOrder: 5,
      estimatedArrivalMinutes: 55,
      travelTimeFromPrevMinutes: 15,
      distanceFromPrevKm: 2.1,
      status: 'ACTIVE',
      passengerBoardingCount: 0,
      passengerAlightingCount: 23,
      scheduledTime: '08:25 AM',
    },
  ],
  'rt-102': [
    {
      id: 'asgn-10',
      stopId: 'stp-106',
      code: 'STP-MAR-106',
      name: 'Marina North Station',
      address: 'Lombard St & Van Ness Ave, San Francisco, CA 94123',
      lat: 37.8005,
      lng: -122.424,
      landmark: 'Fort Mason Center Entrance',
      city: 'San Francisco',
      zone: 'Zone C - Marina / North Peninsula',
      sequenceOrder: 1,
      estimatedArrivalMinutes: 0,
      travelTimeFromPrevMinutes: 0,
      distanceFromPrevKm: 0,
      status: 'ACTIVE',
      passengerBoardingCount: 22,
      passengerAlightingCount: 0,
      scheduledTime: '08:00 AM',
    },
    {
      id: 'asgn-11',
      stopId: 'stp-102',
      code: 'STP-SF-102',
      name: 'Montgomery BART Transit Gate',
      address: '599 Market St, San Francisco, CA 94105',
      lat: 37.789,
      lng: -122.401,
      landmark: 'Palace Hotel Entrance / BART Plaza',
      city: 'San Francisco',
      zone: 'Zone A - Downtown Core',
      sequenceOrder: 2,
      estimatedArrivalMinutes: 18,
      travelTimeFromPrevMinutes: 18,
      distanceFromPrevKm: 3.5,
      status: 'ACTIVE',
      passengerBoardingCount: 14,
      passengerAlightingCount: 1,
      scheduledTime: '08:18 AM',
    },
    {
      id: 'asgn-12',
      stopId: 'stp-105',
      code: 'STP-SF-105',
      name: 'Off-Go Innovation HQ',
      address: '500 Townsend St, San Francisco, CA 94103',
      lat: 37.7712,
      lng: -122.404,
      landmark: 'Off-Go Main Building A - Loading Bay 2',
      city: 'San Francisco',
      zone: 'Zone B - SOMA Tech Corridor',
      sequenceOrder: 3,
      estimatedArrivalMinutes: 35,
      travelTimeFromPrevMinutes: 17,
      distanceFromPrevKm: 2.8,
      status: 'ACTIVE',
      passengerBoardingCount: 0,
      passengerAlightingCount: 35,
      scheduledTime: '08:35 AM',
    },
  ],
};

const mapBackendRouteStop = (s: any, idx = 0): AssignedRouteStop => {
  return {
    id: s.id ? String(s.id) : `asgn-${Date.now() + idx}`,
    stopId: s.stopId ? String(s.stopId) : s.id ? String(s.id) : `stp-${idx}`,
    code: s.stopCode || s.code || `STP-${101 + idx}`,
    name: s.stopName || s.name || `Route Stop ${idx + 1}`,
    address: s.address || 'Station Point',
    lat: Number(s.latitude ?? s.lat ?? 37.78),
    lng: Number(s.longitude ?? s.lng ?? -122.41),
    landmark: s.landmark || 'Station Bay Marker',
    city: s.city || 'San Francisco',
    zone: s.zone || 'Zone A - Downtown Core',
    sequenceOrder: Number(s.stopOrder ?? s.sequenceOrder ?? idx + 1),
    estimatedArrivalMinutes: Number(s.estimatedTimeMinutes ?? idx * 12),
    travelTimeFromPrevMinutes: idx === 0 ? 0 : 12,
    distanceFromPrevKm: Number(s.distanceFromSourceKm ?? idx * 1.5),
    status: s.status || 'ACTIVE',
    passengerBoardingCount: s.passengerBoardingCount || 10,
    passengerAlightingCount: s.passengerAlightingCount || 2,
    scheduledTime: s.scheduledTime || `08:${String(idx * 15).padStart(2, '0')} AM`,
  };
};

export const routeStopService = {
  /**
   * GET /api/v1/routes/{routeId}/stops
   */
  getRouteStops: async (routeId: string): Promise<AssignedRouteStop[]> => {
    try {
      const response = await apiClient.get<any>(`/routes/${routeId}/stops`);
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        return rawList.map(mapBackendRouteStop);
      }
      return mockRouteStopsMap[routeId] || [];
    } catch {
      if (!mockRouteStopsMap[routeId]) {
        mockRouteStopsMap[routeId] = [];
      }
      return mockRouteStopsMap[routeId];
    }
  },

  /**
   * POST /api/v1/routes/{routeId}/stops
   */
  assignStopToRoute: async (payload: AssignStopToRoutePayload): Promise<AssignedRouteStop> => {
    try {
      const backendPayload = {
        stopId: payload.stopId,
        stopOrder: payload.sequenceOrder || 1,
        distanceFromSourceKm: 2.0,
        estimatedTimeMinutes: 10,
      };
      const response = await apiClient.post<any>(
        `/routes/${payload.routeId}/stops`,
        backendPayload
      );
      const data = response.data?.data || response.data;
      return mapBackendRouteStop(data);
    } catch {
      const allStops = await stopService.getStops();
      const targetStop = allStops.find((s) => s.id === payload.stopId);

      if (!targetStop) {
        throw new Error(`Stop ID ${payload.stopId} not found in location registry.`);
      }

      const existingStops = mockRouteStopsMap[payload.routeId] || [];

      // Duplicate check
      if (existingStops.some((s) => s.stopId === payload.stopId)) {
        throw new Error(`Stop "${targetStop.name}" is already assigned to this route.`);
      }

      const nextSequence = existingStops.length + 1;
      const newAssignment: AssignedRouteStop = {
        id: `asgn-${Date.now()}`,
        stopId: targetStop.id,
        code: targetStop.code,
        name: targetStop.name,
        address: targetStop.address,
        lat: targetStop.lat,
        lng: targetStop.lng,
        landmark: targetStop.landmark,
        city: targetStop.city,
        zone: targetStop.zone,
        sequenceOrder: payload.sequenceOrder || nextSequence,
        estimatedArrivalMinutes: (nextSequence - 1) * 12,
        travelTimeFromPrevMinutes: nextSequence === 1 ? 0 : 12,
        distanceFromPrevKm: nextSequence === 1 ? 0 : 2.4,
        status: targetStop.status,
        passengerBoardingCount: Math.floor(Math.random() * 15) + 5,
        passengerAlightingCount: Math.floor(Math.random() * 10),
        scheduledTime: `08:${String((nextSequence - 1) * 15).padStart(2, '0')} AM`,
      };

      existingStops.push(newAssignment);
      mockRouteStopsMap[payload.routeId] = existingStops;
      return newAssignment;
    }
  },

  /**
   * PUT /api/v1/routes/{routeId}/stops/reorder
   */
  reorderRouteStops: async (payload: ReorderRouteStopsPayload): Promise<AssignedRouteStop[]> => {
    try {
      const response = await apiClient.put<any>(
        `/routes/${payload.routeId}/stops/reorder`,
        payload
      );
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) return data.map(mapBackendRouteStop);
      return mockRouteStopsMap[payload.routeId] || [];
    } catch {
      const currentList = mockRouteStopsMap[payload.routeId] || [];
      const stopMap = new Map<string, AssignedRouteStop>();
      currentList.forEach((item) => stopMap.set(item.stopId, item));

      const reordered: AssignedRouteStop[] = [];
      payload.stopIdsInOrder.forEach((stopId, idx) => {
        const item = stopMap.get(stopId);
        if (item) {
          reordered.push({
            ...item,
            sequenceOrder: idx + 1,
            estimatedArrivalMinutes: idx * 12,
            travelTimeFromPrevMinutes: idx === 0 ? 0 : 12,
            distanceFromPrevKm: idx === 0 ? 0 : 2.4,
          });
        }
      });

      mockRouteStopsMap[payload.routeId] = reordered;
      return reordered;
    }
  },

  /**
   * DELETE /api/v1/routes/{routeId}/stops/{stopId}
   */
  removeStopFromRoute: async (routeId: string, stopId: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/routes/${routeId}/stops/${stopId}`);
      return true;
    } catch {
      if (mockRouteStopsMap[routeId]) {
        mockRouteStopsMap[routeId] = mockRouteStopsMap[routeId]
          .filter((s) => s.stopId !== stopId && s.id !== stopId)
          .map((s, idx) => ({
            ...s,
            sequenceOrder: idx + 1,
            estimatedArrivalMinutes: idx * 12,
          }));
      }
      return true;
    }
  },
};
