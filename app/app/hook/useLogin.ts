import { LoginSchema } from '@/components/forms/login-form';
import { createSHA512Hash } from '@/lib/hashing';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type LoginResponse = {
  message: string;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, z.infer<typeof LoginSchema>>({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const hashedPassword = await createSHA512Hash(data.password);

      const newData = {
        ...data,
        password: hashedPassword,
      };

      const response = await axios.post<LoginResponse>(
        '/api/auth/login',
        newData,
        { withCredentials: true }
      );
      return response.data;
    },
  });
};
