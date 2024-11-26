import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  Settings,
  Sparkles,
  ClipboardCheck,
  ScrollText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Page } from '@/App';

interface SidebarProps {
  open: boolean;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navigation = [
  { name: 'Dashboard', page: 'dashboard' as const, icon: Home },
  { name: 'Validation Rules', page: 'rules' as const, icon: FileText },
  { name: 'Validation Report', page: 'report' as const, icon: ScrollText },
  { name: 'Manual Review', page: 'review' as const, icon: ClipboardCheck },
  { name: 'Validation Logs', page: 'logs' as const, icon: BarChart3 },
  { name: 'AI Model Training', page: 'training' as const, icon: Sparkles },
  { name: 'System Settings', page: 'settings' as const, icon: Settings },
  { name: 'Documentation', page: 'docs' as const, icon: BookOpen },
];

export default function Sidebar({ open, currentPage, onNavigate }: SidebarProps) {
  return (
    <div
      className={cn(
        'border-r bg-background transition-all duration-300',
        open ? 'w-64' : 'w-[4.5rem]'
      )}
    >
      <ScrollArea className="h-full py-6">
        <nav className="space-y-2 px-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={currentPage === item.page ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                !open && 'justify-center px-0',
                currentPage === item.page && 'bg-secondary'
              )}
              onClick={() => onNavigate(item.page)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {open && <span>{item.name}</span>}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}