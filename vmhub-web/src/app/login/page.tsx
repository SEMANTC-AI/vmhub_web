// vmhub-web/src/app/login/page.tsx

'use client';

import LoginForm from '@/components/login-form';
import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authenticate } from './actions';
import { ResultCode } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const handleLogin = async (email: string, password: string) => {
    const result = await authenticate(email, password);

    if (result?.type === 'success') {
      // Router.replace will be handled by the useEffect when auth state changes
    } else {
      if (result?.resultCode === ResultCode.InvalidCredentials) {
        setError('Invalid email or password.');
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Add console logs for debugging
  console.log('Auth State:', { user, loading });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <LoginForm onLogin={handleLogin} error={error} />
      </div>
    </div>
  );
}