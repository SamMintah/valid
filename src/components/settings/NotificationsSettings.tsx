import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const notificationTypes = [
  {
    id: 'system-alerts',
    name: 'System Alerts',
    description: 'Critical system updates and maintenance notifications',
  },
  {
    id: 'validation-updates',
    name: 'Validation Process Updates',
    description: 'Status updates for data validation processes',
  },
  {
    id: 'error-logs',
    name: 'Error Logs',
    description: 'Notifications for validation errors and system issues',
  },
  {
    id: 'manual-review',
    name: 'Manual Review Updates',
    description: 'Updates on manual review requests and approvals',
  },
];

const channels = [
  { id: 'email', label: 'Email' },
  { id: 'push', label: 'Push Notifications' },
  { id: 'slack', label: 'Slack' },
];

export default function NotificationsSettings() {
  const [settings, setSettings] = useState(
    notificationTypes.map((type) => ({
      id: type.id,
      enabled: true,
      channel: 'email',
    }))
  );

  const handleToggle = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleChannelChange = (id: string, channel: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, channel } : setting
      )
    );
  };

  const handleSave = () => {
    toast.success('Notification settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <p className="text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      <div className="space-y-4">
        {notificationTypes.map((type) => {
          const setting = settings.find((s) => s.id === type.id)!;
          return (
            <Card key={type.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggle(type.id)}
                  />
                </div>
              </CardHeader>
              {setting.enabled && (
                <CardContent>
                  <div className="space-y-2">
                    <Label>Notification Channel</Label>
                    <Select
                      value={setting.channel}
                      onValueChange={(value) =>
                        handleChannelChange(type.id, value)
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {channels.map((channel) => (
                          <SelectItem key={channel.id} value={channel.id}>
                            {channel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
}