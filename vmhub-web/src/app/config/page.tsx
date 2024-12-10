// vmhub-web/src/app/config/page.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        {/* Using font-display for Space_Grotesk */}
        <h2 className="text-2xl font-display font-semibold text-gray-900">Configurações</h2>
        {/* Using default Manrope via font-sans */}
        <p className="mt-2 text-sm text-gray-500">
          Configure suas credenciais para integração com VMHub e WhatsApp
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
            CNPJ
          </label>
          <input
            {...register('cnpj')}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Digite o CNPJ"
          />
          {errors.cnpj && (
            <p className="text-sm text-red-500">{errors.cnpj.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="vmhubToken" className="block text-sm font-medium text-gray-700">
            Token VMHub
          </label>
          <input
            {...register('vmhubToken')}
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Digite o token do VMHub"
          />
          {errors.vmhubToken && (
            <p className="text-sm text-red-500">{errors.vmhubToken.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="whatsappToken" className="block text-sm font-medium text-gray-700">
            Token WhatsApp
          </label>
          <input
            {...register('whatsappToken')}
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  );
}