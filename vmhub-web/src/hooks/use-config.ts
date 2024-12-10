import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ConfigData {
  cnpj: string;
  vmhubToken: string;
  whatsappToken: string;
  status: 'pending' | 'provisioning' | 'provisioned' | 'error';
}

export function useConfig() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      if (!user) return;

      try {
        const docRef = doc(firestore, 'users', user.uid, 'tokens', 'config');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setConfig(docSnap.data() as ConfigData);
        }
      } catch (err) {
        console.error('Error loading config:', err);
        setError('Failed to load configuration');
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, [user]);

  return { config, loading, error };
}