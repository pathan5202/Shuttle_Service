import apiClient from '../api/axios';
import {
  BookingDetailItem,
  BookingFilterOptions,
  CreateBookingPayload,
  UpdateBookingPayload,
} from '../types';

let mockBookingsState: BookingDetailItem[] = [
  {
    id: 'bkg-1001',
    code: 'OFF-BKG-88301',
    employeeId: 'emp-1',
    employeeName: 'Alexander Wright',
    employeeEmail: 'alexander.wright@company.com',
    employeeDepartment: 'Engineering / Architecture',
    employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    driverId: 'drv-1',
    driverName: 'David Miller',
    pickupStopId: 'stp-101',
    pickupStopName: 'Financial District Terminal',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '04A',
    bookingDate: '2026-07-21',
    travelDate: '2026-07-22',
    pickupTime: '07:30 AM',
    dropTime: '08:25 AM',
    bookingStatus: 'CONFIRMED',
    createdTime: '09:15 AM Yesterday',
    notes: 'Window seat preference. Bringing small laptop bag.',
  },
  {
    id: 'bkg-1002',
    code: 'OFF-BKG-88302',
    employeeId: 'emp-2',
    employeeName: 'Sophia Rodriguez',
    employeeEmail: 'sophia.rodriguez@company.com',
    employeeDepartment: 'Product Operations',
    employeeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    driverId: 'drv-1',
    driverName: 'David Miller',
    pickupStopId: 'stp-102',
    pickupStopName: 'Montgomery BART Transit Gate',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '08B',
    bookingDate: '2026-07-21',
    travelDate: '2026-07-22',
    pickupTime: '07:42 AM',
    dropTime: '08:25 AM',
    bookingStatus: 'CONFIRMED',
    createdTime: '10:30 AM Yesterday',
    notes: 'Boarded at Montgomery gate at 07:41 AM.',
  },
  {
    id: 'bkg-1003',
    code: 'OFF-BKG-88303',
    employeeId: 'emp-3',
    employeeName: 'Marcus Vance',
    employeeEmail: 'marcus.vance@company.com',
    employeeDepartment: 'Sales & Growth',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    routeId: 'rt-102',
    routeName: 'North Tech Corridor Loop B',
    routeCode: 'RT-NC-02',
    shuttleId: 'sht-3',
    shuttleNumber: 'OFF-GO-104',
    driverId: 'drv-3',
    driverName: 'Robert Thorne',
    pickupStopId: 'stp-106',
    pickupStopName: 'Marina North Station',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '02C',
    bookingDate: '2026-07-20',
    travelDate: '2026-07-22',
    pickupTime: '08:00 AM',
    dropTime: '08:35 AM',
    bookingStatus: 'COMPLETED',
    createdTime: '02:00 PM 2 days ago',
    notes: 'Trip completed safely.',
  },
  {
    id: 'bkg-1004',
    code: 'OFF-BKG-88304',
    employeeId: 'emp-4',
    employeeName: 'Elena Rostova',
    employeeEmail: 'elena.rostova@company.com',
    employeeDepartment: 'Human Resources',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    routeId: 'rt-104',
    routeName: 'West Suburbs Executive Connector',
    routeCode: 'RT-WE-04',
    shuttleId: 'sht-4',
    shuttleNumber: 'OFF-GO-108',
    driverId: 'drv-4',
    driverName: 'Elena Rostova',
    pickupStopId: 'stp-107',
    pickupStopName: 'West Park Commuter Garage',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '12A',
    bookingDate: '2026-07-21',
    travelDate: '2026-07-22',
    pickupTime: '05:15 PM',
    dropTime: '06:10 PM',
    bookingStatus: 'PENDING',
    createdTime: '08:00 AM Today',
    notes: 'Awaiting seat confirmation confirmation.',
  },
  {
    id: 'bkg-1005',
    code: 'OFF-BKG-88305',
    employeeId: 'emp-5',
    employeeName: 'David Chen',
    employeeEmail: 'david.chen@company.com',
    employeeDepartment: 'Finance & Legal',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    routeId: 'rt-105',
    routeName: 'East Bay BART Shuttle Link',
    routeCode: 'RT-EA-05',
    shuttleId: 'sht-5',
    shuttleNumber: 'OFF-GO-112',
    driverId: 'drv-5',
    driverName: 'Marcus Vance',
    pickupStopId: 'stp-108',
    pickupStopName: 'Fremont BART Terminal',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '15F',
    bookingDate: '2026-07-20',
    travelDate: '2026-07-22',
    pickupTime: '07:15 AM',
    dropTime: '08:15 AM',
    bookingStatus: 'CANCELLED',
    createdTime: '04:12 PM 2 days ago',
    notes: 'Cancelled due to route maintenance.',
  },
  {
    id: 'bkg-1006',
    code: 'OFF-BKG-88306',
    employeeId: 'emp-6',
    employeeName: 'Rachel Kim',
    employeeEmail: 'rachel.kim@company.com',
    employeeDepartment: 'Design & UX',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    routeId: 'rt-101',
    routeName: 'HQ Financial District Express Line A',
    routeCode: 'RT-EX-01',
    shuttleId: 'sht-1',
    shuttleNumber: 'OFF-GO-101',
    driverId: 'drv-1',
    driverName: 'David Miller',
    pickupStopId: 'stp-103',
    pickupStopName: 'SOMA Tech Plaza Stop',
    dropStopId: 'stp-105',
    dropStopName: 'Off-Go Innovation HQ',
    seatNumber: '06D',
    bookingDate: '2026-07-22',
    travelDate: '2026-07-22',
    pickupTime: '07:55 AM',
    dropTime: '08:25 AM',
    bookingStatus: 'NO_SHOW',
    createdTime: '06:00 AM Today',
    notes: 'Passenger did not arrive at boarding point.',
  },
];

const mapBackendBooking = (b: any): BookingDetailItem => {
  return {
    id: b.id ? String(b.id) : `bkg-${Date.now()}`,
    code: b.code || `OFF-BKG-${Math.floor(88000 + Math.random() * 1000)}`,
    employeeId: b.employeeId ? String(b.employeeId) : 'emp-101',
    employeeName: b.employeeName || 'Alexander Wright',
    employeeEmail: b.employeeEmail || 'alexander.wright@company.com',
    employeeDepartment: b.employeeDepartment || 'Engineering',
    employeeAvatar: b.employeeAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    routeId: b.routeId || 'rt-101',
    routeName: b.routeName || 'HQ Financial District Express Line A',
    routeCode: b.routeCode || 'RT-EX-01',
    shuttleId: b.shuttleId || 'sht-1',
    shuttleNumber: b.shuttleNumber || 'OFF-GO-101',
    driverId: b.driverId || 'drv-1',
    driverName: b.driverName || 'David Miller',
    pickupStopId: b.pickupStopId || 'stp-101',
    pickupStopName: b.pickupStopName || 'Financial District Terminal',
    dropStopId: b.dropStopId || 'stp-105',
    dropStopName: b.dropStopName || 'Off-Go Innovation HQ',
    seatNumber: b.seatNumber !== undefined ? String(b.seatNumber) : '04A',
    bookingDate: b.bookingDate || new Date().toISOString().split('T')[0],
    travelDate: b.travelDate || new Date().toISOString().split('T')[0],
    pickupTime: b.pickupTime || '07:30 AM',
    dropTime: b.dropTime || '08:25 AM',
    bookingStatus: b.status || b.bookingStatus || 'CONFIRMED',
    createdTime: b.createdTime || 'Today',
    notes: b.notes || 'Reserved commuter seat.',
  };
};

export const bookingService = {
  /**
   * GET /api/v1/bookings
   */
  getBookings: async (filters?: BookingFilterOptions): Promise<BookingDetailItem[]> => {
    try {
      const response = await apiClient.get<any>('/bookings');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        let items = rawList.map(mapBackendBooking);
        if (filters?.searchQuery?.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          items = items.filter(
            (b) =>
              b.code.toLowerCase().includes(q) ||
              b.employeeName.toLowerCase().includes(q) ||
              b.shuttleNumber.toLowerCase().includes(q) ||
              b.routeName.toLowerCase().includes(q)
          );
        }
        return items;
      }
      return [...mockBookingsState];
    } catch (error) {
      console.warn('Backend /bookings error, using fallback:', error);
      return [...mockBookingsState];
    }
  },

  /**
   * GET /api/v1/bookings/{id}
   */
  getBookingById: async (id: string): Promise<BookingDetailItem> => {
    try {
      const response = await apiClient.get<any>(`/bookings/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendBooking(data);
      }
      throw new Error('Invalid booking data');
    } catch {
      const found = mockBookingsState.find((b) => b.id === id || b.code === id);
      if (!found) {
        throw new Error(`Booking record with ID ${id} not found.`);
      }
      return found;
    }
  },

  /**
   * POST /api/v1/bookings
   */
  createBooking: async (payload: CreateBookingPayload): Promise<BookingDetailItem> => {
    try {
      const backendPayload = {
        employeeId: payload.employeeId,
        scheduleId: (payload as any).scheduleId || payload.routeId,
      };
      const response = await apiClient.post<any>('/bookings', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendBooking(data);
      mockBookingsState = [created, ...mockBookingsState];
      return created;
    } catch (error) {
      console.warn('Create booking backend call failed, fallback locally:', error);
      const newCode = `OFF-BKG-${Math.floor(88000 + Math.random() * 1000)}`;
      const newBooking: BookingDetailItem = {
        id: `bkg-${Date.now()}`,
        code: newCode,
        employeeId: payload.employeeId || 'emp-101',
        employeeName: 'New Employee Reservation',
        employeeEmail: 'employee@company.com',
        employeeDepartment: 'Enterprise Operations',
        employeeAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        routeId: payload.routeId,
        routeName: 'HQ Financial District Express Line A',
        routeCode: 'RT-EX-01',
        shuttleId: payload.shuttleId || 'sht-1',
        shuttleNumber: 'OFF-GO-101',
        driverId: payload.driverId || 'drv-1',
        driverName: 'David Miller',
        pickupStopId: payload.pickupStopId,
        pickupStopName: 'Financial District Terminal',
        dropStopId: payload.dropStopId,
        dropStopName: 'Off-Go Innovation HQ',
        seatNumber: payload.seatNumber || `0${Math.floor(1 + Math.random() * 8)}A`,
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: payload.travelDate,
        pickupTime: '07:30 AM',
        dropTime: '08:25 AM',
        bookingStatus: 'CONFIRMED',
        createdTime: 'Just now',
        notes: payload.notes || 'Automated reservation issued via enterprise portal.',
      };

      mockBookingsState = [newBooking, ...mockBookingsState];
      return newBooking;
    }
  },

  /**
   * PUT /api/v1/bookings/{id}
   */
  updateBooking: async (payload: UpdateBookingPayload): Promise<BookingDetailItem> => {
    try {
      const response = await apiClient.put<any>(`/bookings/${payload.id}`, payload);
      const data = response.data?.data || response.data;
      const updated = mapBackendBooking(data);
      const idx = mockBookingsState.findIndex((b) => b.id === payload.id);
      if (idx !== -1) mockBookingsState[idx] = updated;
      return updated;
    } catch {
      const idx = mockBookingsState.findIndex((b) => b.id === payload.id);
      if (idx === -1) {
        throw new Error(`Booking with ID ${payload.id} not found.`);
      }

      const existing = mockBookingsState[idx];
      const updated: BookingDetailItem = {
        ...existing,
        ...payload,
        bookingStatus: payload.bookingStatus || existing.bookingStatus,
        seatNumber: payload.seatNumber || existing.seatNumber,
        notes: payload.notes ?? existing.notes,
      };

      mockBookingsState[idx] = updated;
      return updated;
    }
  },

  /**
   * DELETE /api/v1/bookings/{id}
   */
  deleteBooking: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/bookings/${id}`);
      mockBookingsState = mockBookingsState.filter((b) => b.id !== id && b.code !== id);
      return true;
    } catch {
      mockBookingsState = mockBookingsState.filter((b) => b.id !== id && b.code !== id);
      return true;
    }
  },
};
