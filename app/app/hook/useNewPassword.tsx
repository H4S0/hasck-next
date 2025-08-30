import { passwordSchema } from '@/components/forms/password-reset';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';
import { createSHA512Hash } from '@/lib/hashing';

type PasswordResetResponse = {
  message: string;
};

export const useNewPassword = () => {
  return useMutation<
    PasswordResetResponse,
    Error,
    z.infer<typeof passwordSchema>
  >({
    mutationFn: async (data: z.infer<typeof passwordSchema>) => {
      const oldHashedPassword = await createSHA512Hash(data.oldPassword);
      const newHashedPassword = await createSHA512Hash(data.newPassword);

      const newData = {
        ...data,
        oldPassword: oldHashedPassword,
        newPassword: newHashedPassword,
      };
      const response = await axios.put<PasswordResetResponse>(
        `/api/auth/new-password`,
        newData,
        { withCredentials: true }
      );

      return response.data;
    },
  });
};
