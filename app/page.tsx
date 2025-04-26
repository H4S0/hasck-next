'use client';

import { useHasckClientSession } from './hook/useHasckClientSession';

export default function Home() {
  const { user } = useHasckClientSession();

  if (!user) {
    return;
  }

  return <div>{user.username}</div>;
}
