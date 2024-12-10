// vmhub-web/src/hooks/use-campaign.ts

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface CampaignSettings {
  enabled: boolean;
  message: string;
  coupon?: string;
  settings?: {
    sendTime?: string;
    inactiveDays?: number;
    couponValidityDays?: number;
    welcomeDelay?: number;
    minimumPurchase?: number;
    evaluationPeriod?: number;
    vipDiscount?: number;
  };
}

export function useCampaign(campaignType: string) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<CampaignSettings | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;

      try {
        const docRef = doc(firestore, 'users', user.uid, 'campaigns', campaignType);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSettings(docSnap.data() as CampaignSettings);
        }
      } catch (err) {
        console.error('Error loading campaign settings:', err);
        setError('Failed to load campaign settings');
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [user, campaignType]);

  const saveSettings = async (newSettings: CampaignSettings) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch('/api/campaigns/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignType,
          ...newSettings,
        }),
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