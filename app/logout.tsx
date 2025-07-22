'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useHasckClientSession } from './hook/useHasckClientSession';

const LogoutButton = () => {
  const { logout } = useHasckClientSession();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        logout();
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
