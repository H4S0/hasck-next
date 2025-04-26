'use client';

import {
  SessionResult,
  userSchemaType,
} from '@/app/hook/getHasckServerSession';
import { useState } from 'react';

export const useHasckClientSession = () => {
  const [user, setUser] = useState<userSchemaType[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
};
