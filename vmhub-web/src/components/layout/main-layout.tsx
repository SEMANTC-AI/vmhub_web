// vmhub-web/src/components/layout/main-layout.tsx

'use client';

import { useAuth } from '@/lib/context/auth';
import { cn } from '@/lib/utils';
import { Home, Settings, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileMenu } from '@/components/profile-menu';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navigation = [
    {
      name: 'Início',
      href: '/',
      icon: Home,
      current: pathname === '/'
    },
    {
      name: 'Campanhas',
      href: '/campaigns',
      icon: MessageSquare,
      current: pathname.startsWith('/campaigns')
    },
    {
      name: 'Configurações',
      href: '/config',
      icon: Settings,
      current: pathname === '/config'
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r border-gray-100">
        {/* Header with Logo and Profile */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <Link href="/" className="text-xl font-semibold">
            SEMANTC
          </Link>
          <ProfileMenu />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm rounded-lg transition-colors',
                item.current 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-4 w-4',
                  item.current 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white">
        <main className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}