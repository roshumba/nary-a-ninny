'use client';

import { useSearchParams } from 'next/navigation';

export function OAuthError({ provider }: { provider: string }) {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error !== provider) return null;

  return <p style={{ color: 'red' }}>Unable to sign in with {provider}.</p>;
}