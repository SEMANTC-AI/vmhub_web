'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCampaign } from '@/hooks/use-campaign';
import { BirthdayCampaign } from '@/types/campaign';
import { toast } from 'sonner';

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
        <div className="text-gray-500">Carregando configurações...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center">
          <Link href="/campaigns" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-display font-semibold text-gray-900">Campanha de Aniversário</h2>
            <p className="mt-2 text-sm text-gray-500">
              Configure as mensagens automáticas para aniversariantes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Status da Campanha</h3>
            <label className="relative inline-flex items-center cursor-pointer">
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

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Mensagem</h3>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Feliz aniversário! 🎉 Como presente, preparamos uma oferta especial para você..."
            />
          </div>

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Configurações</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Horário de Envio
                </label>
                <input
                  type="time"
                  value={formData.settings.sendTime}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, sendTime: e.target.value }
                  }))}
                  className="mt-1 block rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cupom de Desconto
                </label>
                <input
                  type="text"
                  value={formData.coupon || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, coupon: e.target.value }))}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: ANIVER10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}