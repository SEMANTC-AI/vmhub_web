// src/app/layout.tsx

import { Poppins } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/context/auth';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'VMHub - Gestão de Campanhas',
  description: 'Gestão de campanhas e automações do VMHub',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn(poppins.variable)}>
      <body
        className={cn(
          'font-sans antialiased',
          poppins.className
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