import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Club } from '@/types/database';

export function useClubs() {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Club[];
    },
  });
}

export function useClub(id: string) {
  return useQuery({
    queryKey: ['club', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Club;
    },
    enabled: !!id,
  });
}

export function useCreateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (club: Omit<Club, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('clubs')
        .insert(club)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
  });
}

export function useUpdateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Club> & { id: string }) => {
      const { data, error } = await supabase
        .from('clubs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      queryClient.invalidateQueries({ queryKey: ['club', variables.id] });
    },
  });
}
