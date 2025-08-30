import { PasswordResetSchema } from '@/components/forms/init-password-reset-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type PasswordResetResponse = {
  message: string;
};

export const usePasswordResetInit = () => {
  return useMutation<
    PasswordResetResponse,
    Error,
    z.infer<typeof PasswordResetSchema>
  >({
    mutationFn: async (data: z.infer<typeof PasswordResetSchema>) => {
      const response = await axios.put<PasswordResetResponse>(
        '/api/auth/forgot-password/init',
        data,
        { withCredentials: true }
      );

      return response.data;
    },
  });
};
