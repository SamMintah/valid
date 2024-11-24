import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  open: boolean;
}

const navigation = [
  { name: 'Dashboard', href: '#', icon: Home },
  { name: 'Validation Rules', href: '#', icon: FileText },
  { name: 'Validation Logs', href: '#', icon: BarChart3 },
  { name: 'AI Model Training', href: '#', icon: Sparkles },
  { name: 'System Settings', href: '#', icon: Settings },
  { name: 'Documentation', href: '#', icon: BookOpen },
];

export default function Sidebar({ open }: SidebarProps) {
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
              variant="ghost"
              className={cn(
                'w-full justify-start',
                !open && 'justify-center px-0'
              )}
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