import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="flex min-h-screen flex-col bg-background">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar open={sidebarOpen} />
          <main className="flex-1 overflow-y-auto px-4 py-6">
            <Dashboard />
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
