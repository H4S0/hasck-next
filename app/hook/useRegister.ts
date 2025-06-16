import { RegisterSchema } from '@/components/forms/register-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type RegisterResponse = {
  message: string;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, z.infer<typeof RegisterSchema>>({
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      const response = await axios.post<RegisterResponse>(
        '/api/auth/register',
        data,
        { withCredentials: true }
      );

      return response.data;
    },
  });
};
