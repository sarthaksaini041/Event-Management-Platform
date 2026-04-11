import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Registration } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

export function useMyRegistrations() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-registrations', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          event:events_with_counts(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'registered')
        .order('registered_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useEventRegistrations(eventId: string) {
  return useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('event_id', eventId)
        .eq('status', 'registered');

      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });
}

export function useIsRegistered(eventId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['is-registered', eventId, user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .eq('status', 'registered')
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!eventId,
  });
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error('Must be logged in to register');

      const { data, error } = await supabase
        .from('registrations')
        .insert({
          event_id: eventId,
          user_id: user.id,
          status: 'registered',
        })
        .select()
        .single();

      if (error) throw error;
      return data as Registration;
    },
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['is-registered', eventId] });
      queryClient.invalidateQueries({ queryKey: ['my-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
    },
  });
}

export function useCancelRegistration() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['is-registered', eventId] });
      queryClient.invalidateQueries({ queryKey: ['my-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
    },
  });
}
