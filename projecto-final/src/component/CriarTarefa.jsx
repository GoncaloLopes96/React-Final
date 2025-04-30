import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import './CriarTarefa.css'

function CriarTarefa() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('baixa')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const novaTarefa = { 
        title, 
        description, 
        priority,
        createdAt: new Date().toISOString(), // Adiciona timestamp de criação
        done: false
      }
      await axios.post('http://localhost:3002/tasks', novaTarefa)
      alert('Tarefa criada com sucesso!')
      setTitle('')
      setDescription('')
      setPriority('baixa')
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      alert('Ocorreu um erro ao criar a tarefa.')
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Criar Nova Tarefa</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Digite o título da tarefa"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Adicione uma descrição detalhada da tarefa"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label className="form-label">Prioridade:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        
        <button type="submit" className="form-button">
          Criar Tarefa
        </button>
      </form>
    </div>
  )
}

export default CriarTarefa
