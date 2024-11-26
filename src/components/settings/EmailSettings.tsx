import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emailLogs = [
  {
    id: '1',
    recipient: 'admin@example.com',
    subject: 'Validation Error Alert',
    status: 'delivered',
    timestamp: '2024-03-10 14:30',
  },
  {
    id: '2',
    recipient: 'user@example.com',
    subject: 'Weekly Report',
    status: 'failed',
    timestamp: '2024-03-10 14:25',
  },
];

export default function EmailSettings() {
  const [smtpConfig, setSmtpConfig] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    encryption: 'tls',
  });
  const [emailConfig, setEmailConfig] = useState({
    fromAddress: '',
    replyTo: '',
    signature: '',
    enabled: true,
  });

  const handleSmtpChange = (field: string, value: string) => {
    setSmtpConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (field: string, value: string | boolean) => {
    setEmailConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestEmail = async () => {
    try {
      // Simulate sending test email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Test email sent successfully');
    } catch (error) {
      toast.error('Failed to send test email');
    }
  };

  const handleSave = () => {
    toast.success('Email settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Email Settings</h2>
        <p className="text-muted-foreground">
          Configure email server and notification settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SMTP Configuration</CardTitle>
          <CardDescription>
            Configure your SMTP server settings for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                value={smtpConfig.host}
                onChange={(e) => handleSmtpChange('host', e.target.value)}
                placeholder="smtp.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Port</Label>
              <Input
                id="smtp-port"
                value={smtpConfig.port}
                onChange={(e) => handleSmtpChange('port', e.target.value)}
                placeholder="587"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Username</Label>
              <Input
                id="smtp-username"
                value={smtpConfig.username}
                onChange={(e) =>
                  handleSmtpChange('username', e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">Password</Label>
              <Input
                id="smtp-password"
                type="password"
                value={smtpConfig.password}
                onChange={(e) =>
                  handleSmtpChange('password', e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="encryption">Encryption Method</Label>
            <Select
              value={smtpConfig.encryption}
              onValueChange={(value) =>
                handleSmtpChange('encryption', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>
            Configure general email settings and signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch
              id="notifications"
              checked={emailConfig.enabled}
              onCheckedChange={(checked) =>
                handleEmailChange('enabled', checked)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-address">From Address</Label>
            <Input
              id="from-address"
              value={emailConfig.fromAddress}
              onChange={(e) =>
                handleEmailChange('fromAddress', e.target.value)
              }
              placeholder="noreply@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-to">Reply-To Address</Label>
            <Input
              id="reply-to"
              value={emailConfig.replyTo}
              onChange={(e) =>
                handleEmailChange('replyTo', e.target.value)
              }
              placeholder="support@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signature">Email Signature</Label>
            <Textarea
              id="signature"
              value={emailConfig.signature}
              onChange={(e) =>
                handleEmailChange('signature', e.target.value)
              }
              placeholder="Your email signature"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Email Logs</CardTitle>
          <CardDescription>
            View recent email delivery status and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emailLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.recipient}</TableCell>
                    <TableCell>{log.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === 'delivered'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="outline" onClick={handleTestEmail}>
          Send Test Email
        </Button>
      </div>
    </div>
  );
}