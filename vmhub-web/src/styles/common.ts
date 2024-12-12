// vmhub-web/src/styles/common.ts

import { cn } from '@/lib/utils';
import { Manrope } from 'next/font/google';

export const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const formStyles = {
  input: cn(
    manrope.className,
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm",
    "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
  ),
  label: cn(
    manrope.className,
    "block text-sm font-medium text-gray-700"
  ),
  heading: cn(
    manrope.className,
    "text-2xl font-semibold text-gray-900"
  ),
  subheading: cn(
    manrope.className,
    "text-lg font-medium text-gray-900"
  ),
  description: cn(
    manrope.className,
    "mt-2 text-sm text-gray-500"
  ),
  button: cn(
    manrope.className,
    "rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm",
    "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
    "disabled:opacity-50"
  ),
  section: "space-y-6",
  form: "space-y-6 max-w-2xl",
  header: "border-b border-gray-200 pb-5",
};