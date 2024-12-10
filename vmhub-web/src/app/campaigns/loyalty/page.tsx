// vmhub-web/src/app/campaigns/loyalty/page.tsx

'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoyaltyCampaignPage() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center">
          <Link href="/campaigns" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-display font-semibold text-gray-900">Programa de Fidelidade</h2>
            <p className="mt-2 text-sm text-gray-500">
              Configure recompensas para clientes fiéis
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="mb-8">
          <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Status do Programa</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {isEnabled ? 'Ativo' : 'Inativo'}
            </span>
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Critérios de Fidelidade</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valor mínimo em compras (R$)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Período de avaliação (dias)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: 90"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Mensagem VIP</h3>
            <textarea
              rows={4}
              className="block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Parabéns! Você alcançou o status VIP. Aproveite seus benefícios exclusivos..."
            />
          </div>

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Benefícios VIP</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Desconto permanente (%)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cupom de boas-vindas VIP
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: VIP50"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Comunicação Periódica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequência de lembretes (dias)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: 30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensagem de lembrete
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: Aproveite seus benefícios VIP! Não se esqueça do seu desconto exclusivo..."
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-medium text-gray-900 mb-4">Renovação do Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Valor para manutenção VIP (R$)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Ex: 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensagem de alerta de renovação
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: Seu status VIP precisa ser renovado! Faça uma compra até DD/MM para manter seus benefícios..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}