import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landing from './Landing.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
