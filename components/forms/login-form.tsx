'use client';

import { useLogin } from '@/app/hook/useLogin';
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
  CardFooter,
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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.push('/dashboard');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Card className="w-full max-w-lg sm:max-w-lg">
      <CardHeader>
        <CardTitle>Login form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="username" placeholder="user2123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col items-center gap-5">
        <CardDescription>Dont have account?</CardDescription>
        <Link href={'/signup'} className="w-full">
          <Button className="w-full" variant="secondary">
            Make one
          </Button>
        </Link>
        <Link href={'/init-forgot-password'} className="w-full">
          <Button className="w-full" variant="outline">
            Forgot password
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
