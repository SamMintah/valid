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
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Key, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  status: 'active' | 'revoked';
}

const initialKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'sk_live_123456789',
    created: '2024-03-01',
    expires: '2025-03-01',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API',
    key: 'sk_dev_987654321',
    created: '2024-02-15',
    expires: '2024-08-15',
    status: 'active',
  },
];

export default function ApiKeysSettings() {
  const [apiKeys, setApiKeys] = useState(initialKeys);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30');

  const handleCreateKey = () => {
    const newKey: ApiKey = {
      id: String(apiKeys.length + 1),
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(7)}`,
      created: new Date().toISOString().split('T')[0],
      expires: new Date(
        Date.now() + parseInt(newKeyExpiry) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      status: 'active',
    };

    setApiKeys([...apiKeys, newKey]);
    setIsCreateOpen(false);
    toast.success('API key created successfully');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, status: 'revoked' } : key
      )
    );
    toast.success('API key revoked successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">API Keys</h2>
          <p className="text-muted-foreground">
            Manage API keys for external integrations
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search API keys..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">
                      {apiKey.name}
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-2 py-1">
                        {apiKey.key}
                      </code>
                    </TableCell>
                    <TableCell>{apiKey.created}</TableCell>
                    <TableCell>{apiKey.expires}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          apiKey.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {apiKey.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => handleRevokeKey(apiKey.id)}
                        disabled={apiKey.status === 'revoked'}
                      >
                        Revoke
                      </Button>
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
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key for external integrations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Period</Label>
              <Select
                value={newKeyExpiry}
                onValueChange={setNewKeyExpiry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey}>Generate Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}