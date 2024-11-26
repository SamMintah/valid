import { useState } from 'react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import UsersSettings from '@/components/settings/UsersSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import DataSourceSettings from '@/components/settings/DataSourceSettings';
import ApiKeysSettings from '@/components/settings/ApiKeysSettings';
import WebhooksSettings from '@/components/settings/WebhooksSettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import EmailSettings from '@/components/settings/EmailSettings';

export type SettingsTab =
  | 'General'
  | 'Users'
  | 'Security'
  | 'Data Source'
  | 'API Keys'
  | 'Webhooks'
  | 'Notifications'
  | 'Email';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General');

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <GeneralSettings />;
      case 'Users':
        return <UsersSettings />;
      case 'Security':
        return <SecuritySettings />;
      case 'Data Source':
        return <DataSourceSettings />;
      case 'API Keys':
        return <ApiKeysSettings />;
      case 'Webhooks':
        return <WebhooksSettings />;
      case 'Notifications':
        return <NotificationsSettings />;
      case 'Email':
        return <EmailSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and manage user access
        </p>
      </div>
      <div className="h-[calc(100vh-12rem)]">
        <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </SettingsLayout>
      </div>
    </div>
  );
}