// vmhub-web/src/app/config/page.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formStyles } from '@/styles/common';

const configSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
  vmhubToken: z.string().min(1, 'Token VMHub é obrigatório'),
  whatsappToken: z.string().min(1, 'Token WhatsApp é obrigatório'),
});

type ConfigFormData = z.infer<typeof configSchema>;

export default function ConfigPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema)
  });

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

      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={formStyles.section}>
      <div className={formStyles.header}>
        <h2 className={formStyles.heading}>Configurações</h2>
        <p className={formStyles.description}>
          Configure suas credenciais para integração
        </p>
      </div>

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