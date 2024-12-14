// src/hooks/use-config.ts

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
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
        console.log('No user found');
        setLoading(false);
        return;
      }

      console.log('Loading config for user:', user.uid);

      try {
        // Get all documents in the subcollection
        const configRef = collection(firestore, 'users', user.uid, user.uid);
        console.log('Config path:', `users/${user.uid}/${user.uid}`);
        
        const q = query(configRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        console.log('Found documents:', querySnapshot.size);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as ConfigData;
          console.log('Config data:', data);
          
          setConfig({
            cnpj: data.cnpj,
            vmhubToken: data.vmhubToken,
            whatsappToken: data.whatsappToken,
            status: data.status || 'pending',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        } else {
          console.log('No config documents found');
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