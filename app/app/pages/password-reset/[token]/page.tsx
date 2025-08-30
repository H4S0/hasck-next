'use client';

import PasswordResetForm from '@/components/forms/password-reset-form';
import { useParams } from 'next/navigation';
import React from 'react';

const PasswordResetPage = () => {
  const params = useParams();
  const token = params.token;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PasswordResetForm token={token} />
    </div>
  );
};

export default PasswordResetPage;
