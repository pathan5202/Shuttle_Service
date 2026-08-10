import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complaintService } from '../services/complaintService';
import { Complaint, ComplaintFilterOptions, CreateComplaintInput, ComplaintStatus } from '../types';
import toast from 'react-hot-toast';

export const COMPLAINTS_QUERY_KEY = 'complaints';

export const useComplaints = (filters?: ComplaintFilterOptions) => {
  return useQuery<Complaint[], Error>({
    queryKey: [COMPLAINTS_QUERY_KEY, filters],
    queryFn: () => complaintService.getComplaints(filters),
    staleTime: 1000 * 30,
  });
};

export const useUserComplaints = (userId: string) => {
  return useQuery<Complaint[], Error>({
    queryKey: [COMPLAINTS_QUERY_KEY, 'user', userId],
    queryFn: () => complaintService.getComplaintsByUser(userId),
    staleTime: 1000 * 30,
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      input,
      user,
    }: {
      input: CreateComplaintInput;
      user: { id: string; name: string; role: 'EMPLOYEE' | 'DRIVER'; department?: string };
    }) => complaintService.createComplaint(input, user),
    onSuccess: () => {
      toast.success('Complaint ticket raised successfully!');
      queryClient.invalidateQueries({ queryKey: [COMPLAINTS_QUERY_KEY] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to submit complaint.');
    },
  });
};

export const useUpdateComplaintStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      adminNotes,
      adminResponse,
      assignedTo,
    }: {
      id: string;
      status: ComplaintStatus;
      adminNotes?: string;
      adminResponse?: string;
      assignedTo?: string;
    }) => complaintService.updateComplaintStatus(id, status, adminNotes, adminResponse, assignedTo),
    onSuccess: () => {
      toast.success('Complaint status updated successfully!');
      queryClient.invalidateQueries({ queryKey: [COMPLAINTS_QUERY_KEY] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to update complaint status.');
    },
  });
};
