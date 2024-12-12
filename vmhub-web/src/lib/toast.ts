// vmhub-web/src/lib/toast.ts

import { toast as sonnerToast } from 'sonner';
import { manrope } from '@/styles/common';

export const toast = {
  success: (message: string) => {
    sonnerToast.success(message, {
      className: manrope.className,
      style: {
        fontWeight: 500
      }
    });
  },
  error: (message: string) => {
    sonnerToast.error(message, {
      className: manrope.className,
      style: {
        fontWeight: 500
      }
    });
  },
  info: (message: string) => {
    sonnerToast.info(message, {
      className: manrope.className,
      style: {
        fontWeight: 500
      }
    });
  }
};