import {
  Settings,
  Users,
  Shield,
  Key,
  Webhook,
  Bell,
  Mail,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  { name: 'General', icon: Settings },
  { name: 'Users', icon: Users },
  { name: 'Security', icon: Shield },
  { name: 'Data Source', icon: Database },
  { name: 'API Keys', icon: Key },
  { name: 'Webhooks', icon: Webhook },
  { name: 'Notifications', icon: Bell },
  { name: 'Email', icon: Mail },
] as const;

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsLayout({
  children,
  activeTab,
  onTabChange,
}: SettingsLayoutProps) {
  return (
    <div className="flex h-full gap-8">
      <div className="w-64 shrink-0">
        <ScrollArea className="h-full py-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={activeTab === item.name ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  activeTab === item.name && 'bg-secondary'
                )}
                onClick={() => onTabChange(item.name)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="h-full rounded-lg border bg-card p-6">
          {children}
        </div>
      </div>
    </div>
  );
}