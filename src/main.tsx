import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

document.documentElement.style.setProperty(
  '--img-womens-wellness',
  `url(${import.meta.env.BASE_URL}products/womens-wellness.png)`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
