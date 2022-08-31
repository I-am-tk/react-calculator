import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.querySelector<HTMLElement>('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
