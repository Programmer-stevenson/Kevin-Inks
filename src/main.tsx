import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Prevent the browser from restoring the previous section after refresh.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Remove section hashes such as #work or #book before React renders.
if (window.location.hash) {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  )
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

scrollToTop()
window.addEventListener('load', scrollToTop, { once: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)