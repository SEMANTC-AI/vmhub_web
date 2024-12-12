// vmhub-web/src/lib/context/auth.tsx

'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { toast } from '@/lib/toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const clearSession = useCallback(async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }, []);

  const checkConfig = useCallback(async () => {
    try {
      const response = await fetch('/api/config/check', {
        credentials: 'include',
      });
      const data = await response.json();
      return data.hasConfig;
    } catch (error) {
      console.error('Failed to check config:', error);
      return false;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      await clearSession();
      toast.success('Sessão encerrada com sucesso');
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Erro ao encerrar sessão');
    }
  }, [clearSession, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken(true);
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to set session');
          }
          
          setUser(firebaseUser);
          
          const hasConfig = await checkConfig();
          router.push(hasConfig ? '/' : '/config');
          
        } else {
          setUser(null);
          await clearSession();
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        await clearSession();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [clearSession, checkConfig, router]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};