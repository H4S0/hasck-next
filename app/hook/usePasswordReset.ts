import { passwordSchema } from '@/components/forms/password-reset-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ParamValue } from 'next/dist/server/request/params';
import z from 'zod';

type PasswordResetResponse = {
  message: string;
};

export const usePasswordReset = (token: ParamValue) => {
  return useMutation<
    PasswordResetResponse,
    Error,
    z.infer<typeof passwordSchema>
  >({
    mutationFn: async (data: z.infer<typeof passwordSchema>) => {
      const response = await axios.put<PasswordResetResponse>(
        `/api/auth/forgot-password/${token}`,
        data,
        { withCredentials: true }
      );

      return response.data;
    },
  });
};
