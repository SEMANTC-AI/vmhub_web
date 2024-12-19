// src/app/layout.tsx

import { DM_Sans } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/context/auth';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'VMHub - Gestão de Campanhas',
  description: 'Gestão de campanhas e automações do VMHub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn(dmSans.variable)}>
      <body
        className={cn(
          'font-sans antialiased',
          dmSans.className
        )}
      >
        <Toaster position="top-center" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}