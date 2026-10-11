import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { startEmojiFlagRendering } from '@/lib/emojiFlags'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

startEmojiFlagRendering()
