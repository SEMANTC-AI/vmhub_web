// src/hooks/use-config.ts

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

interface ConfigData {
  cnpj: string;
  vmhubToken: string;
  whatsappToken: string;
  status: 'pending' | 'provisioning' | 'provisioned' | 'error';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export function useConfig() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Simply read from users/{uid}
        const userDoc = doc(firestore, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists() && docSnapshot.data().config) {
          const data = docSnapshot.data().config as ConfigData;
          setConfig({
            cnpj: data.cnpj,
            vmhubToken: data.vmhubToken,
            whatsappToken: data.whatsappToken,
            status: data.status || 'pending',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      } catch (err: any) {
        console.error('Error loading config:', err);
        setError(err.message || 'Failed to load configuration');
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, [user]);

  return { config, loading, error };
}