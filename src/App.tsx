import { useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ValidationRules from './pages/ValidationRules';
import ValidationReport from './pages/ValidationReport';
import ManualReview from './pages/ManualReview';
import ValidationLogs from './pages/ValidationLogs';
import ModelTraining from './pages/ModelTraining';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';
import LandingPage from './pages/LandingPage';
import './App.css';

export type Page =
  | 'landing'
  | 'dashboard'
  | 'rules'
  | 'report'
  | 'review'
  | 'logs'
  | 'training'
  | 'settings'
  | 'docs';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  if (currentPage === 'landing') {
    return (
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <LandingPage onNavigate={setCurrentPage} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="flex min-h-screen flex-col bg-background">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar open={sidebarOpen} currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-y-auto px-4 py-6">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'rules' && <ValidationRules />}
            {currentPage === 'report' && <ValidationReport />}
            {currentPage === 'review' && <ManualReview />}
            {currentPage === 'logs' && <ValidationLogs />}
            {currentPage === 'training' && <ModelTraining />}
            {currentPage === 'settings' && <Settings />}
            {currentPage === 'docs' && <Documentation />}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;