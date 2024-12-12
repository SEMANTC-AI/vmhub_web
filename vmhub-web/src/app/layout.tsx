// vmhub-web/src/app/layout.tsx

import { Manrope, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/context/auth';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600'],
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
    <html lang="pt-BR" suppressHydrationWarning className={cn(spaceGrotesk.variable, manrope.variable)}>
      <body
        className={cn(
          'font-sans antialiased',
          manrope.className
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