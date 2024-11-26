import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Webhook } from 'lucide-react';
import { toast } from 'sonner';

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastTriggered: string;
}

const initialWebhooks: WebhookConfig[] = [
  {
    id: '1',
    name: 'Error Notification',
    url: 'https://api.example.com/webhooks/errors',
    events: ['validation.error', 'system.error'],
    status: 'active',
    lastTriggered: '2024-03-10 14:30',
  },
  {
    id: '2',
    name: 'Success Notification',
    url: 'https://api.example.com/webhooks/success',
    events: ['validation.success'],
    status: 'active',
    lastTriggered: '2024-03-10 14:25',
  },
];

const availableEvents = [
  { id: 'validation.error', label: 'Validation Error' },
  { id: 'validation.success', label: 'Validation Success' },
  { id: 'system.error', label: 'System Error' },
  { id: 'model.trained', label: 'Model Trained' },
];

export default function WebhooksSettings() {
  const [webhooks, setWebhooks] = useState(initialWebhooks);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
  });

  const handleCreateWebhook = () => {
    const webhook: WebhookConfig = {
      id: String(webhooks.length + 1),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: 'active',
      lastTriggered: 'Never',
    };

    setWebhooks([...webhooks, webhook]);
    setIsCreateOpen(false);
    toast.success('Webhook created successfully');
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id
          ? {
              ...webhook,
              status:
                webhook.status === 'active' ? 'inactive' : 'active',
            }
          : webhook
      )
    );
  };

  const testWebhook = async (webhook: WebhookConfig) => {
    try {
      // Simulate webhook test
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Webhook tested successfully');
    } catch (error) {
      toast.error('Webhook test failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Webhooks</h2>
          <p className="text-muted-foreground">
            Manage webhook configurations for external notifications
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">
                      {webhook.name}
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-2 py-1">
                        {webhook.url}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.map((event) => (
                          <Badge
                            key={event}
                            variant="secondary"
                            className="text-xs"
                          >
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          webhook.status === 'active'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {webhook.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{webhook.lastTriggered}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => testWebhook(webhook)}
                        >
                          Test
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => toggleWebhookStatus(webhook.id)}
                        >
                          {webhook.status === 'active'
                            ? 'Deactivate'
                            : 'Activate'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Webhook</DialogTitle>
            <DialogDescription>
              Configure a new webhook endpoint for notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Webhook Name</Label>
              <Input
                id="name"
                value={newWebhook.name}
                onChange={(e) =>
                  setNewWebhook({ ...newWebhook, name: e.target.value })
                }
                placeholder="e.g., Error Notification"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Webhook URL</Label>
              <Input
                id="url"
                value={newWebhook.url}
                onChange={(e) =>
                  setNewWebhook({ ...newWebhook, url: e.target.value })
                }
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div className="space-y-2">
              <Label>Events</Label>
              <div className="space-y-2">
                {availableEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={event.id}
                      checked={newWebhook.events.includes(event.id)}
                      onCheckedChange={(checked) => {
                        setNewWebhook({
                          ...newWebhook,
                          events: checked
                            ? [...newWebhook.events, event.id]
                            : newWebhook.events.filter(
                                (e) => e !== event.id
                              ),
                        });
                      }}
                    />
                    <Label htmlFor={event.id}>{event.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWebhook}>Create Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}