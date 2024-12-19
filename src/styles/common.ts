// src/styles/common.ts

import { cn } from '@/lib/utils';
import { DM_Sans } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const formStyles = {
  input: cn(
    'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm',
    'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
    dmSans.variable
  ),
  label: cn('block text-sm font-light text-gray-700', dmSans.variable),
  heading: cn('text-3xl font-semibold text-gray-900', dmSans.variable),
  subheading: cn('text-lg font-medium text-gray-900', dmSans.variable),
  description: cn('mt-2 text-sm font-light text-gray-500', dmSans.variable),
  button: cn(
    'rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm',
    'hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
    'disabled:opacity-50',
    dmSans.variable
  ),
  section: 'space-y-8 max-w-4xl mx-auto',
  form: 'space-y-6',
  header: 'border-b border-gray-200 pb-6',
  error: 'mt-2 text-sm text-red-500',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
};