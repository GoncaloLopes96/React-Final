import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './nav/Navbar'
import Tarefas from './component/Tarefas'
import CriarTarefa from './component/CriarTarefa'
import EditarTarefa from './component/EditarTarefa'
import TarefaDetalhe from './component/TarefaDetalhe'
import { ThemeProvider } from './component/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Tarefas />} />
          <Route path="/criar" element={<CriarTarefa />} />
          <Route path="/editar/:id" element={<EditarTarefa />} />
          <Route path="/tarefas/:id" element={<TarefaDetalhe />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
