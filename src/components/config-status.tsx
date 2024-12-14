// src/components/config-status.tsx

import { ProvisioningStatus } from '@/hooks/use-provisioning-status';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

interface ConfigStatusProps {
  status: ProvisioningStatus;
  error?: string;
}

export function ConfigStatus({ status, error }: ConfigStatusProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          text: 'Aguardando provisão',
          color: 'text-yellow-700'
        };
      case 'provisioning':
        return {
          icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
          text: 'Provisionando recursos',
          color: 'text-blue-700'
        };
      case 'provisioned':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: 'Recursos provisionados',
          color: 'text-green-700'
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          text: 'Erro na provisão',
          color: 'text-red-700'
        };
      default:
        return null;
    }
  };

  const display = getStatusDisplay();
  if (!display) return null;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        {display.icon}
        <span className={`font-medium ${display.color}`}>{display.text}</span>
      </div>
      {error && status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}