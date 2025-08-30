'use client';

import React from 'react';
import { Button } from '../ui/button';
import { useHasckClientSession } from '@/app/hook/useHasckClientSession';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const { logout } = useHasckClientSession();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await logout();
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
