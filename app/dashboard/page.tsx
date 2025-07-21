'use client';

import React, { useEffect } from 'react';
import { useHasckClientSession } from '../hook/useHasckClientSession';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const DashboardIndex = () => {
  const { isAuthenticated, logout, loading } = useHasckClientSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default DashboardIndex;
