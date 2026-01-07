import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routing/AppRoutes.tsx'
import { Provider } from 'react-redux'
import { store } from './core/store/index.ts'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </StrictMode>,
  )
}
