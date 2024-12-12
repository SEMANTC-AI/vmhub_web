// vmhub-web/src/app/config/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formStyles } from '@/styles/common';
import { useConfig } from '@/hooks/use-config';
import { useProvisioningStatus } from '@/hooks/use-provisioning-status';

const configSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
  vmhubToken: z.string().min(1, 'Token VMHub é obrigatório'),
  whatsappToken: z.string().min(1, 'Token WhatsApp é obrigatório'),
});

type ConfigFormData = z.infer<typeof configSchema>;

export default function ConfigPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { config, loading: configLoading, error: configError } = useConfig();
  const [currentCNPJ, setCurrentCNPJ] = useState<string>('');
  
  // Get real-time provisioning status
  const provisioningStatus = useProvisioningStatus(currentCNPJ);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      cnpj: '',
      vmhubToken: '',
      whatsappToken: '',
    }
  });

  // Set initial form data when config is loaded
  useEffect(() => {
    if (config) {
      setCurrentCNPJ(config.cnpj);
      reset({
        cnpj: config.cnpj,
        vmhubToken: config.vmhubToken,
        whatsappToken: config.whatsappToken,
      });
    }
  }, [config, reset]);

  const onSubmit = async (data: ConfigFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/config/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      setCurrentCNPJ(data.cnpj);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'provisioned': return 'text-green-600';
      case 'provisioning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'provisioned': return 'Configurado';
      case 'provisioning': return 'Configurando...';
      case 'error': return 'Erro';
      default: return 'Pendente';
    }
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Carregando configurações...</div>
      </div>
    );
  }

  if (configError) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="text-sm text-red-500">
          Erro ao carregar configurações: {configError}
        </div>
      </div>
    );
  }

  return (
    <div className={formStyles.section}>
      <div className={formStyles.header}>
        <h2 className={formStyles.heading}>Configurações</h2>
        <p className={formStyles.description}>
          Configure suas credenciais para integração
        </p>
      </div>

      {provisioningStatus && (
        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium">
              Status: {' '}
              <span className={getStatusColor(provisioningStatus.status)}>
                {getStatusText(provisioningStatus.status)}
              </span>
            </div>
            {provisioningStatus.error && (
              <div className="mt-2 text-sm text-red-500">
                Erro: {provisioningStatus.error}
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        <div className="space-y-2">
          <label className={formStyles.label}>
            CNPJ
          </label>
          <input
            {...register('cnpj')}
            type="text"
            className={formStyles.input}
            placeholder="Digite o CNPJ"
          />
          {errors.cnpj && (
            <p className="text-sm text-red-500">{errors.cnpj.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className={formStyles.label}>
            Token VMHub
          </label>
          <input
            {...register('vmhubToken')}
            type="password"
            className={formStyles.input}
            placeholder="Digite o token do VMHub"
          />
          {errors.vmhubToken && (
            <p className="text-sm text-red-500">{errors.vmhubToken.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className={formStyles.label}>
            Token WhatsApp
          </label>
          <input
            {...register('whatsappToken')}
            type="password"
            className={formStyles.input}
            placeholder="Digite o token do WhatsApp"
          />
          {errors.whatsappToken && (
            <p className="text-sm text-red-500">{errors.whatsappToken.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={formStyles.button}
          >
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  );
}