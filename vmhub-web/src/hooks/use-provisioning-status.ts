// vmhub-web/src/hooks/use-provisioning-status.ts

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export type ProvisioningStatus = 'pending' | 'provisioning' | 'provisioned' | 'error';

interface ProvisioningState {
  status: ProvisioningStatus;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  errorTimestamp?: Date;
}

export function useProvisioningStatus(cnpj: string) {
  const { user } = useAuth();
  const [status, setStatus] = useState<ProvisioningState | null>(null);

  useEffect(() => {
    if (!user || !cnpj) return;

    const docRef = doc(firestore, 'users', user.uid, 'tokens', cnpj);
    
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setStatus({
          status: doc.data().status,
          error: doc.data().error,
          startedAt: doc.data().startedAt?.toDate(),
          completedAt: doc.data().completedAt?.toDate(),
          errorTimestamp: doc.data().errorTimestamp?.toDate(),
        });
      }
    });

    return () => unsubscribe();
  }, [user, cnpj]);

  return status;
}