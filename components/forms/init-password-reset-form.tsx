'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';

import { usePasswordResetInit } from '@/app/hook/usePasswordResetInit';
import { getApiErrorMessage } from '@/app/utils/api-client';

export const PasswordResetSchema = z.object({
  email: z.string().email(),
});

const InitPasswordResetForm = () => {
  const { mutate, isPending } = usePasswordResetInit();
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof PasswordResetSchema>> = (
    data
  ) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  };

  return (
    <Card className="w-full max-w-lg sm:max-w-lg">
      <CardHeader>
        <CardTitle>Init password reset</CardTitle>
        <CardDescription>
          Make sure to insert correct email, you will recive confirmation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Loading' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InitPasswordResetForm;
