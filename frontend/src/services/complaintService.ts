import apiClient from '../api/axios';
import {
  Complaint,
  CreateComplaintInput,
  ComplaintFilterOptions,
  ComplaintStatus,
} from '../types';

const mockComplaints: Complaint[] = [
  {
    id: 'CMP-1001',
    complaintRef: 'TKT-8841',
    subject: 'Shuttle delayed by 25 minutes at Indiranagar Metro Stop',
    category: 'Delay',
    priority: 'High',
    status: 'Open',
    description: 'The morning 08:30 AM shuttle arrived at 08:55 AM without prior notification on the app.',
    raisedBy: 'Alexander Wright',
    raisedById: 'EMP-1001',
    role: 'EMPLOYEE',
    department: 'Engineering',
    vehicleNumber: 'KA-01-EQ-9812',
    routeName: 'Outer Ring Road Express',
    createdOn: '2026-07-22 09:15',
    updatedOn: '2026-07-22 09:15',
    attachmentName: 'shuttle_delay_screenshot.png',
    timeline: [
      {
        id: 't-1',
        action: 'Complaint Ticket Created',
        performedBy: 'Alexander Wright',
        role: 'EMPLOYEE',
        timestamp: '2026-07-22 09:15',
        note: 'Ticket submitted via Employee Mobile Portal',
      },
    ],
  },
  {
    id: 'CMP-1002',
    complaintRef: 'TKT-8842',
    subject: 'Air Conditioning malfunction in Vehicle KA-05-AB-1234',
    category: 'Vehicle Issue',
    priority: 'Medium',
    status: 'In Progress',
    description: 'AC cooling was completely non-functional during the afternoon return route.',
    raisedBy: 'Sophia Rodriguez',
    raisedById: 'EMP-1002',
    role: 'EMPLOYEE',
    department: 'Product',
    vehicleNumber: 'KA-05-AB-1234',
    routeName: 'Whitefield Shuttle',
    assignedTo: 'Fleet Operations Lead',
    createdOn: '2026-07-21 17:40',
    updatedOn: '2026-07-22 08:10',
    adminNotes: 'Assigned HVAC mechanic for garage maintenance check.',
    timeline: [
      {
        id: 't-1',
        action: 'Complaint Submitted',
        performedBy: 'Sophia Rodriguez',
        role: 'EMPLOYEE',
        timestamp: '2026-07-21 17:40',
      },
      {
        id: 't-2',
        action: 'Assigned to Fleet Mechanics',
        performedBy: 'Admin Operations',
        role: 'ADMIN',
        timestamp: '2026-07-22 08:10',
        note: 'Vehicle scheduled for HVAC filter replacement.',
      },
    ],
  },
  {
    id: 'CMP-1003',
    complaintRef: 'TKT-8843',
    subject: 'Unauthorized parking block at Tech Park Gate 3',
    category: 'Safety',
    priority: 'Critical',
    status: 'Resolved',
    description: 'Private vehicles blocked the designated Off-Go shuttle bay, causing boarding delays.',
    raisedBy: 'Rajesh Kumar',
    raisedById: 'DRV-501',
    role: 'DRIVER',
    vehicleNumber: 'KA-03-CD-5678',
    routeName: 'Electronic City Corridor',
    createdOn: '2026-07-20 08:00',
    updatedOn: '2026-07-20 10:30',
    adminResponse: 'Security team cleared the shuttle bay and posted dedicated parking marshals.',
    adminNotes: 'Issue resolved with Tech Park security management.',
    timeline: [
      {
        id: 't-1',
        action: 'Reported by Driver',
        performedBy: 'Rajesh Kumar',
        role: 'DRIVER',
        timestamp: '2026-07-20 08:00',
      },
      {
        id: 't-2',
        action: 'Resolved & Closed',
        performedBy: 'Admin Ops',
        role: 'ADMIN',
        timestamp: '2026-07-20 10:30',
        note: 'Marshals stationed at Gate 3.',
      },
    ],
  },
  {
    id: 'CMP-1004',
    complaintRef: 'TKT-8844',
    subject: 'Request for additional stop at Silk Board junction',
    category: 'Suggestion',
    priority: 'Low',
    status: 'Open',
    description: 'Multiple employees living near Silk Board request a 2-minute pickup stop on Route 4.',
    raisedBy: 'Marcus Vance',
    raisedById: 'EMP-1003',
    role: 'EMPLOYEE',
    department: 'Sales',
    routeName: 'Silk Board & BTM Line',
    createdOn: '2026-07-19 14:20',
    updatedOn: '2026-07-19 14:20',
    timeline: [
      {
        id: 't-1',
        action: 'Suggestion Submitted',
        performedBy: 'Marcus Vance',
        role: 'EMPLOYEE',
        timestamp: '2026-07-19 14:20',
      },
    ],
  },
];

let inMemoryComplaints = [...mockComplaints];

export const complaintService = {
  getComplaints: async (filters?: ComplaintFilterOptions): Promise<Complaint[]> => {
    try {
      const response = await apiClient.get<Complaint[]>('/complaints', { params: filters });
      return response.data;
    } catch {
      let filtered = [...inMemoryComplaints];
      if (filters?.role) filtered = filtered.filter((c) => c.role === filters.role);
      if (filters?.priority) filtered = filtered.filter((c) => c.priority === filters.priority);
      if (filters?.status) filtered = filtered.filter((c) => c.status === filters.status);
      if (filters?.category) filtered = filtered.filter((c) => c.category === filters.category);
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.subject.toLowerCase().includes(q) ||
            c.raisedBy.toLowerCase().includes(q) ||
            c.complaintRef.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },

  getComplaintsByUser: async (userId: string): Promise<Complaint[]> => {
    try {
      const response = await apiClient.get<Complaint[]>(`/complaints/user/${userId}`);
      return response.data;
    } catch {
      return inMemoryComplaints.filter((c) => c.raisedById === userId || c.raisedBy.toLowerCase().includes('alexander'));
    }
  },

  createComplaint: async (input: CreateComplaintInput, user: { id: string; name: string; role: 'EMPLOYEE' | 'DRIVER'; department?: string }): Promise<Complaint> => {
    const newComplaint: Complaint = {
      id: `CMP-${Date.now().toString().slice(-4)}`,
      complaintRef: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: input.subject,
      category: input.category,
      priority: input.priority,
      status: 'Open',
      description: input.description,
      raisedBy: user.name,
      raisedById: user.id,
      role: user.role,
      department: user.department,
      attachmentName: input.attachmentName,
      createdOn: new Date().toISOString().replace('T', ' ').slice(0, 16),
      updatedOn: new Date().toISOString().replace('T', ' ').slice(0, 16),
      timeline: [
        {
          id: `t-${Date.now()}`,
          action: 'Complaint Ticket Created',
          performedBy: user.name,
          role: user.role,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
      ],
    };

    inMemoryComplaints = [newComplaint, ...inMemoryComplaints];
    return newComplaint;
  },

  updateComplaintStatus: async (
    id: string,
    status: ComplaintStatus,
    adminNotes?: string,
    adminResponse?: string,
    assignedTo?: string,
    adminUser = 'System Administrator'
  ): Promise<Complaint> => {
    const found = inMemoryComplaints.find((c) => c.id === id);
    if (!found) throw new Error('Complaint not found');

    found.status = status;
    if (adminNotes) found.adminNotes = adminNotes;
    if (adminResponse) found.adminResponse = adminResponse;
    if (assignedTo) found.assignedTo = assignedTo;
    found.updatedOn = new Date().toISOString().replace('T', ' ').slice(0, 16);

    found.timeline.push({
      id: `t-${Date.now()}`,
      action: `Status changed to ${status}`,
      performedBy: adminUser,
      role: 'ADMIN',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      note: adminNotes || adminResponse,
    });

    return { ...found };
  },
};
