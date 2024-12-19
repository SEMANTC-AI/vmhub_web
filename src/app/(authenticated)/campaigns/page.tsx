// src/app/(authenticated)/campaigns/page.tsx

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Manrope } from 'next/font/google';
import { formStyles } from '@/styles/common';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const campaigns = [
  {
    id: 'birthday',
    name: '🎂 Aniversário',
    description: 'Envie mensagens automáticas de felicitações e ofertas especiais',
    href: '/campaigns/birthday',
    status: 'active',
  },
  {
    id: 'welcome',
    name: '👋 Boas-vindas',
    description: 'Mensagens de boas-vindas para novos clientes',
    href: '/campaigns/welcome',
    status: 'inactive',
  },
  {
    id: 'reactivation',
    name: '⏰ Reativação de Clientes',
    description: 'Reconquiste clientes inativos com ofertas especiais',
    href: '/campaigns/reactivation',
    status: 'inactive',
  },
  {
    id: 'loyalty',
    name: '🏆 Fidelidade',
    description: 'Recompense seus clientes mais fiéis',
    href: '/campaigns/loyalty',
    status: 'inactive',
  },
];

export default function CampaignsPage() {
  return (
    <div className={cn('space-y-6', manrope.className, formStyles.container)}>
      <div className="border-b border-gray-200 pb-5">
        <h2 className={cn("text-2xl font-semibold text-gray-900", formStyles.heading)}>
          Campanhas
        </h2>
        <p className={cn("mt-2 text-sm text-gray-500", formStyles.description)}>
          Gerencie suas campanhas de marketing automatizadas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={campaign.href}
            className="relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="min-w-0 flex-1">
              <h3 className={cn("text-lg font-medium text-gray-900", formStyles.subheading)}>
                {campaign.name}
              </h3>
              <p className={cn("mt-1 text-sm text-gray-500", formStyles.description)}>
                {campaign.description}
              </p>
            </div>
            <div className="mt-4">
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  campaign.status === 'active'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-600'
                )}
              >
                {campaign.status === 'active' ? 'Ativa' : 'Inativa'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}