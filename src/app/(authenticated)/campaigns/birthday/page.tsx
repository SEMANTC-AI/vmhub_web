// src/app/campaigns/birthday/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCampaign } from '@/hooks/use-campaign';
import { BirthdayCampaign } from '@/types/campaign';
import { toast } from 'sonner';
import { formStyles } from '@/styles/common';

export default function BirthdayCampaignPage() {
  const { settings, loading, saveSettings } = useCampaign<BirthdayCampaign>('birthday');
  const [formData, setFormData] = useState<BirthdayCampaign>({
    type: 'birthday',
    enabled: false,
    message: '',
    coupon: '',
    settings: {
      sendTime: '09:00'
    }
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveSettings(formData);
    if (success) {
      toast.success('Configurações salvas com sucesso!');
    } else {
      toast.error('Erro ao salvar configurações');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className={formStyles.description}>Carregando configurações...</div>
      </div>
    );
  }

  return (
    <div className={formStyles.section}>
      <div className={formStyles.header}>
        <div className="flex items-center">
          <Link href="/campaigns" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className={formStyles.heading}>Campanha de Aniversário</h2>
            <p className={formStyles.description}>
              Configure as mensagens automáticas para aniversariantes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className={formStyles.form}>
          <div className="mb-8">
            <h3 className={formStyles.subheading}>Status da Campanha</h3>
            <label className="relative inline-flex items-center cursor-pointer mt-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.enabled}
                onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {formData.enabled ? 'Ativa' : 'Inativa'}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className={formStyles.subheading}>Mensagem</h3>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className={formStyles.input}
                placeholder="Ex: Feliz aniversário! 🎉 Como presente, preparamos uma oferta especial para você..."
              />
            </div>

            <div>
              <h3 className={formStyles.subheading}>Configurações</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <label className={formStyles.label}>
                    Horário de Envio
                  </label>
                  <input
                    type="time"
                    value={formData.settings.sendTime}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, sendTime: e.target.value }
                    }))}
                    className={formStyles.input}
                  />
                </div>

                {/* <div>
                  <label className={formStyles.label}>
                    Cupom de Desconto
                  </label>
                  <input
                    type="text"
                    value={formData.coupon || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, coupon: e.target.value }))}
                    className={formStyles.input}
                    placeholder="Ex: ANIVER10"
                  />
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className={formStyles.button}
            >
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}