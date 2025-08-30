import { RegisterSchema } from '@/components/forms/register-form';
import { createSHA512Hash } from '@/lib/hashing';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type RegisterResponse = {
  message: string;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, z.infer<typeof RegisterSchema>>({
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      const hashedPassword = await createSHA512Hash(data.password);

      const newData = {
        ...data,
        password: hashedPassword,
      };

      const response = await axios.post('/api/auth/register', newData, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
