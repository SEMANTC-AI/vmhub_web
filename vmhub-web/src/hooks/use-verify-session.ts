// vmhub-web/src/hooks/use-verify-session.ts

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerifySessionResponse {
  isValid: boolean;
  user?: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}

export function useVerifySession() {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState<VerifySessionResponse['user']>();
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        const data: VerifySessionResponse = await response.json();

        if (data.isValid && data.user) {
          setIsValid(true);
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Session verification error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [router]);

  return { isLoading, isValid, user };
}