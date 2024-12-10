// vmhub-web/src/hooks/use-campaign.ts

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Campaign, CampaignType } from '@/types/campaign';

export function useCampaign<T extends Campaign>(type: CampaignType) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;

      try {
        const docRef = doc(firestore, 'users', user.uid, 'campaigns', type);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings(docSnap.data() as T);
        }
      } catch (err) {
        console.error('Error loading campaign settings:', err);
        setError('Failed to load campaign settings');
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [user, type]);

  const saveSettings = async (newSettings: T) => {
    if (!user) return false;

    setLoading(true);
    try {
      const response = await fetch('/api/campaigns/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to save campaign settings');
      }

      setSettings(newSettings);
      return true;
    } catch (err) {
      console.error('Error saving campaign settings:', err);
      setError('Failed to save campaign settings');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    settings,
    error,
    saveSettings,
  };
}