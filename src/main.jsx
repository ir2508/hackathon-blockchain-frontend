import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Monitoramento from './pages/Monitoramento'
import CadastrarEntrega from './pages/CadastrarEntrega'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Monitoramento /> */}
    <CadastrarEntrega />
  </StrictMode>,
)
