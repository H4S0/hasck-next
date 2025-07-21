'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useHasckClientSession = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/auth/authenticated', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await res.json();
      return data.user;
    },
    retry: false,
  });

  const logout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });

    if (res.ok) {
      queryClient.removeQueries({ queryKey: ['user'] });
    } else {
      throw new Error('Logout failed');
    }
  };

  return {
    user: data ?? null,
    isAuthenticated: !!data,
    errorMessage: error ? (error as Error).message : '',
    loading: isLoading,
    logout,
  };
};
