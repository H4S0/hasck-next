'use client';

import { useQuery } from '@tanstack/react-query';

export const useHasckClientSession = () => {
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

  return {
    user: data ?? null,
    isAuthenticated: !!data,
    errorMessage: error ? (error as Error).message : '',
    loading: isLoading,
  };
};
