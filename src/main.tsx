import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routing/AppRoutes.tsx'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <AppRoutes />
    </StrictMode>,
  )
}
