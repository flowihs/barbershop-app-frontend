import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/global.css';
import App from './app/App';

import { init } from "@telegram-apps/sdk";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

init();
retrieveLaunchParams();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
