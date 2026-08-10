import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shuttleService } from '../services/shuttleService';
import {
  ShuttleDetailItem,
  CreateShuttlePayload,
  UpdateShuttlePayload,
  ShuttleFilterOptions,
} from '../types';

export const SHUTTLES_QUERY_KEY = ['shuttles'];

export function useShuttles(filters?: ShuttleFilterOptions) {
  const query = useQuery({
    queryKey: [...SHUTTLES_QUERY_KEY, filters],
    queryFn: () => shuttleService.getShuttles(filters),
    staleTime: 30000,
  });

  const allQuery = useQuery({
    queryKey: [...SHUTTLES_QUERY_KEY, 'all'],
    queryFn: () => shuttleService.getShuttles(),
    staleTime: 30000,
  });

  return {
    shuttles: query.data || [],
    allShuttles: allQuery.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useShuttle(id?: string) {
  return useQuery({
    queryKey: ['shuttle', id],
    queryFn: () => (id ? shuttleService.getShuttleById(id) : null),
    enabled: !!id,
  });
}

export function useCreateShuttle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateShuttlePayload) => shuttleService.createShuttle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHUTTLES_QUERY_KEY });
    },
  });
}

export function useUpdateShuttle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateShuttlePayload) => shuttleService.updateShuttle(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SHUTTLES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['shuttle', variables.id] });
    },
  });
}

export function useDeleteShuttle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => shuttleService.deleteShuttle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHUTTLES_QUERY_KEY });
    },
  });
}
