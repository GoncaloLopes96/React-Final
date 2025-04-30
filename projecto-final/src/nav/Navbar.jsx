import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../component/ThemeContext'
import './Navbar.css'

function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Tarefas</Link></li>
        <li><Link to="/criar">Criar Tarefa</Link></li>
      </ul>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-button"
        title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default Navbar
