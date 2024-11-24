import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme from localStorage or system preference
const theme = localStorage.getItem('ui-theme') || 'system';
const root = document.documentElement;
root.classList.remove('light', 'dark');

if (theme === 'system') {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  root.classList.add(systemTheme);
} else {
  root.classList.add(theme);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);