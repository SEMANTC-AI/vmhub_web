// src/app/signup/page.tsx

'use client';

import SignupForm from '@/components/signup-form';
import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { formStyles, poppins } from '@/styles/common';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-zinc-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className={cn(formStyles.container, poppins.className)}>
      <SignupForm />
    </div>
  );
}