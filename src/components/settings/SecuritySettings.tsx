import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [minPasswordLength, setMinPasswordLength] = useState(8);

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Security settings updated');
    } catch (error) {
      toast.error('Failed to update security settings');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>
            Configure password requirements for all users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="minLength">Minimum Password Length</Label>
            <Input
              id="minLength"
              type="number"
              value={minPasswordLength}
              onChange={(e) => setMinPasswordLength(Number(e.target.value))}
              min={8}
              max={32}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="specialChars" defaultChecked />
            <Label htmlFor="specialChars">
              Require special characters
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="numbers" defaultChecked />
            <Label htmlFor="numbers">
              Require numbers
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enable additional security measures
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="2fa"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
            <Label htmlFor="2fa">
              Require two-factor authentication for all users
            </Label>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save Security Settings</Button>
    </div>
  );
}