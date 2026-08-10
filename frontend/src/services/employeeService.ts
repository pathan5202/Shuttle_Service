import apiClient from '../api/axios';
import { Employee, CreateEmployeePayload } from '../types';

let mockEmployeesState: Employee[] = [
  {
    id: 'emp-001',
    employeeId: 'EMP-9021',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    status: 'ACTIVE',
    createdAt: '2025-01-15',
    address: '124 Market St, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    assignedShuttle: {
      shuttleId: 'shuttle-01',
      vehicleNumber: 'OFF-GO-101',
      routeName: 'HQ Express Line A',
      pickupStop: 'Market Street Gate & Station 4',
    },
    currentBooking: {
      bookingId: 'bk-801',
      bookingRef: 'BK-90821',
      routeName: 'HQ Express Line A',
      pickupStop: 'Market Street Gate',
      dropoffStop: 'HQ Main Lobby',
      scheduledTime: '08:30 AM',
      status: 'CONFIRMED',
      date: 'Today',
    },
    emergencyContact: {
      name: 'Mark Jenkins',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse',
    },
    attendanceSummary: {
      totalRides: 142,
      attendanceRatePercent: 98,
      missedRides: 3,
      onTimeCheckins: 139,
    },
  },
  {
    id: 'emp-002',
    employeeId: 'EMP-9022',
    firstName: 'David',
    lastName: 'Chen',
    name: 'David Chen',
    email: 'david.chen@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Product & Design',
    status: 'ACTIVE',
    createdAt: '2025-02-01',
    address: '88 Howard St, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    assignedShuttle: {
      shuttleId: 'shuttle-02',
      vehicleNumber: 'OFF-GO-104',
      routeName: 'North Tech Corridor B',
      pickupStop: '5th Street Plaza',
    },
    currentBooking: {
      bookingId: 'bk-802',
      bookingRef: 'BK-90822',
      routeName: 'North Tech Corridor B',
      pickupStop: '5th Street Plaza',
      dropoffStop: 'North Tech Gate',
      scheduledTime: '08:45 AM',
      status: 'CHECKED_IN',
      date: 'Today',
    },
    emergencyContact: {
      name: 'Lin Chen',
      phone: '+1 (555) 222-3333',
      relationship: 'Parent',
    },
    attendanceSummary: {
      totalRides: 96,
      attendanceRatePercent: 95,
      missedRides: 5,
      onTimeCheckins: 91,
    },
  },
  {
    id: 'emp-003',
    employeeId: 'EMP-9023',
    firstName: 'Aaliyah',
    lastName: 'Patel',
    name: 'Aaliyah Patel',
    email: 'aaliyah.patel@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Human Resources',
    status: 'ACTIVE',
    createdAt: '2025-02-10',
    address: '450 Mission St, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    assignedShuttle: {
      shuttleId: 'shuttle-01',
      vehicleNumber: 'OFF-GO-101',
      routeName: 'HQ Express Line A',
      pickupStop: 'Central Tech Station',
    },
    currentBooking: {
      bookingId: 'bk-803',
      bookingRef: 'BK-90823',
      routeName: 'HQ Express Line A',
      pickupStop: 'Central Tech Station',
      dropoffStop: 'HQ Main Lobby',
      scheduledTime: '08:00 AM',
      status: 'COMPLETED',
      date: 'Today',
    },
    emergencyContact: {
      name: 'Rohan Patel',
      phone: '+1 (555) 444-5555',
      relationship: 'Sibling',
    },
    attendanceSummary: {
      totalRides: 110,
      attendanceRatePercent: 100,
      missedRides: 0,
      onTimeCheckins: 110,
    },
  },
  {
    id: 'emp-004',
    employeeId: 'EMP-9024',
    firstName: 'Marcus',
    lastName: 'Vance',
    name: 'Marcus Vance',
    email: 'marcus.vance@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Finance & Legal',
    status: 'ON_LEAVE',
    createdAt: '2025-02-20',
    address: '320 Folsom St, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    emergencyContact: {
      name: 'Jessica Vance',
      phone: '+1 (555) 666-7777',
      relationship: 'Spouse',
    },
    attendanceSummary: {
      totalRides: 45,
      attendanceRatePercent: 88,
      missedRides: 6,
      onTimeCheckins: 39,
    },
  },
  {
    id: 'emp-005',
    employeeId: 'EMP-9025',
    firstName: 'Elena',
    lastName: 'Rostova',
    name: 'Elena Rostova',
    email: 'elena.rostova@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Operations',
    status: 'ACTIVE',
    createdAt: '2025-03-01',
    address: '1050 Van Ness Ave, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    assignedShuttle: {
      shuttleId: 'shuttle-04',
      vehicleNumber: 'OFF-GO-112',
      routeName: 'East Campus Shuttle D',
      pickupStop: 'Embarcadero Pier 3',
    },
    currentBooking: {
      bookingId: 'bk-805',
      bookingRef: 'BK-90825',
      routeName: 'East Campus Shuttle D',
      pickupStop: 'Embarcadero Pier 3',
      dropoffStop: 'East Campus Gate',
      scheduledTime: '09:15 AM',
      status: 'CONFIRMED',
      date: 'Today',
    },
    emergencyContact: {
      name: 'Dmitri Rostov',
      phone: '+1 (555) 888-9999',
      relationship: 'Father',
    },
    attendanceSummary: {
      totalRides: 82,
      attendanceRatePercent: 96,
      missedRides: 3,
      onTimeCheckins: 79,
    },
  },
  {
    id: 'emp-006',
    employeeId: 'EMP-9026',
    firstName: 'James',
    lastName: 'Wilson',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Sales & Marketing',
    status: 'INACTIVE',
    createdAt: '2025-03-05',
    address: '710 Pine St, San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    emergencyContact: {
      name: 'Clara Wilson',
      phone: '+1 (555) 111-2222',
      relationship: 'Sister',
    },
    attendanceSummary: {
      totalRides: 20,
      attendanceRatePercent: 80,
      missedRides: 5,
      onTimeCheckins: 15,
    },
  },
];

const mapBackendEmployee = (e: any): Employee => {
  return {
    id: e.id ? String(e.id) : `emp-${Date.now()}`,
    employeeId: e.employeeCode || e.employeeId || 'EMP-1001',
    firstName: e.firstName || 'Employee',
    lastName: e.lastName || '',
    name: `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'Employee',
    email: e.email || '',
    phone: e.phoneNumber || e.phone || '',
    department: e.department || 'ENGINEERING',
    status: e.active !== false ? 'ACTIVE' : 'INACTIVE',
    createdAt: e.createdAt || new Date().toISOString().split('T')[0],
    address: e.address || 'Corporate Office',
    avatar: e.avatar || `https://images.unsplash.com/photo-${1494790108377 + Math.floor(Math.random() * 1000)}?w=150`,
    assignedShuttle: e.assignedShuttle,
    currentBooking: e.currentBooking,
    emergencyContact: e.emergencyContact,
    attendanceSummary: e.attendanceSummary || {
      totalRides: 0,
      attendanceRatePercent: 100,
      missedRides: 0,
      onTimeCheckins: 0,
    },
  };
};

export const employeeService = {
  // GET /api/v1/employees
  getEmployees: async (): Promise<Employee[]> => {
    try {
      const response = await apiClient.get<any>('/employees');
      const rawList = response.data?.data || response.data;
      if (Array.isArray(rawList) && rawList.length > 0) {
        return rawList.map(mapBackendEmployee);
      }
      return [...mockEmployeesState];
    } catch (error) {
      console.warn('Backend /employees error, using fallback:', error);
      return [...mockEmployeesState];
    }
  },

  // GET /api/v1/employees/{id}
  getEmployeeById: async (id: string): Promise<Employee> => {
    try {
      const response = await apiClient.get<any>(`/employees/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object') {
        return mapBackendEmployee(data);
      }
      throw new Error('Invalid employee data');
    } catch {
      const found = mockEmployeesState.find((e) => e.id === id || e.employeeId === id);
      if (!found) {
        throw new Error(`Employee with ID ${id} not found`);
      }
      return found;
    }
  },

  // POST /api/v1/employees
  createEmployee: async (payload: CreateEmployeePayload): Promise<Employee> => {
    try {
      let dept = (payload.department?.toUpperCase() || 'ENGINEERING') as any;
      if (!['ENGINEERING', 'HR', 'FINANCE', 'SALES', 'MARKETING', 'ADMIN', 'OPERATIONS', 'SUPPORT'].includes(dept)) {
        dept = 'ENGINEERING';
      }
      const backendPayload = {
        employeeCode: payload.employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: (payload.phone || '9876543210').replace(/\D/g, '').slice(-10),
        department: dept,
      };
      const response = await apiClient.post<any>('/employees', backendPayload);
      const data = response.data?.data || response.data;
      const created = mapBackendEmployee(data);
      mockEmployeesState = [created, ...mockEmployeesState];
      return created;
    } catch (error) {
      console.warn('Create employee backend call failed, fallback locally:', error);
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        employeeId: payload.employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: `${payload.firstName} ${payload.lastName}`,
        email: payload.email,
        phone: payload.phone,
        department: payload.department,
        status: payload.status || 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0],
        address: payload.address || 'San Francisco Headquarters',
        emergencyContact: payload.emergencyContact,
        attendanceSummary: {
          totalRides: 0,
          attendanceRatePercent: 100,
          missedRides: 0,
          onTimeCheckins: 0,
        },
      };

      mockEmployeesState = [newEmp, ...mockEmployeesState];
      return newEmp;
    }
  },

  // DELETE /api/v1/employees/{id}
  deleteEmployee: async (id: string): Promise<{ success: boolean; id: string }> => {
    try {
      await apiClient.delete(`/employees/${id}`);
      mockEmployeesState = mockEmployeesState.filter((e) => e.id !== id && e.employeeId !== id);
      return { success: true, id };
    } catch {
      mockEmployeesState = mockEmployeesState.filter((e) => e.id !== id && e.employeeId !== id);
      return { success: true, id };
    }
  },
};
