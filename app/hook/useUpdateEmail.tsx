import { EmailUpdateSchema } from '@/components/forms/update-email-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import z from 'zod';

type EmailUpdateResponse = {
  message: string;
};

export const useEmailUpdate = () => {
  return useMutation<
    EmailUpdateResponse,
    Error,
    z.infer<typeof EmailUpdateSchema>
  >({
    mutationFn: async (data: z.infer<typeof EmailUpdateSchema>) => {
      const response = await axios.put<EmailUpdateResponse>(
        '/api/auth/update-email',
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};
