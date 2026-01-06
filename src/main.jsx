import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// --- 1. TAMBAH IMPORT INI (PENTING) ---
import { Provider } from 'react-redux'
import { store } from './store/redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* --- 2. BUNGKUS <App /> DENGAN PROVIDER --- */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)