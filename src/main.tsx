import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1d2e',
          color: '#e2e8f0',
          border: '1px solid #2e3350',
          borderRadius: '10px',
          fontSize: '0.85rem',
        },
        success: {
          iconTheme: { primary: '#34d399', secondary: '#1a1d2e' },
        },
        error: {
          iconTheme: { primary: '#f87171', secondary: '#1a1d2e' },
        },
      }}
    />
  </StrictMode>,
)
