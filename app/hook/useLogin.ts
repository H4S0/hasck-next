import { LoginSchema } from '@/components/forms/login-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type LoginResponse = {
  message: string;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, z.infer<typeof LoginSchema>>({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const response = await axios.post<LoginResponse>(
        '/api/auth/login',
        data,
        { withCredentials: true }
      );
      return response.data;
    },
  });
};
