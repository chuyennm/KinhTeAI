import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './App';
// Bundled (offline-safe) serif with full Vietnamese glyph coverage; Georgia lacks precomposed Vietnamese letters.
import '@fontsource/noto-serif/latin-400.css';
import '@fontsource/noto-serif/vietnamese-400.css';
import '@fontsource/noto-serif/latin-600.css';
import '@fontsource/noto-serif/vietnamese-600.css';
import './index.css';

document.documentElement.dataset.theme = localStorage.getItem('kinhteai.theme') ?? 'dark';
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
