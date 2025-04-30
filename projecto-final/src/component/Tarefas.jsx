import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Tarefas.css'

function Tarefas() {
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/tasks')
      .then((res) => setTarefas(res.data))
      .catch((err) => console.error('Erro ao buscar tarefas:', err))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Tens a certeza que queres apagar esta tarefa?')) return
    try {
      await axios.delete(`http://localhost:3002/tasks/${id}`)
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
    } catch (error) {
      console.error('Erro ao apagar tarefa:', error)
    }
  }

  const toggleTaskStatus = async (id) => {
    try {
      // Encontrar a tarefa atual
      const tarefa = tarefas.find((t) => t.id === id)
      
      if (!tarefa) return
      
      // Inverter o estado done
      const novoDone = !tarefa.done
      
      // Atualizar no servidor
      await axios.patch(`http://localhost:3002/tasks/${id}`, { done: novoDone })
      
      // Atualizar o estado local
      setTarefas(tarefas.map((t) => 
        t.id === id ? { ...t, done: novoDone } : t
      ))
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  return (
    <div className="tarefas-container">
      <h2>Lista de Tarefas</h2>
      {tarefas.length === 0 ? (
        <p className="no-tasks">Não há tarefas para mostrar.</p>
      ) : (
        <div className="task-container">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="task-card">
              <div className="task-card-content">
                <div className="task-header">
                  <div 
                    className={`task-status-checkbox ${tarefa.done ? 'completed' : 'pending'}`}
                    onClick={() => toggleTaskStatus(tarefa.id)}
                    title={tarefa.done ? "Marcar como pendente" : "Marcar como concluída"}
                  >
                    {tarefa.done && <span className="checkmark">&#10003;</span>}
                  </div>
                  <h3 className={`task-title ${tarefa.done ? 'completed-task' : ''}`}>
                    {tarefa.title}
                  </h3>
                </div>
                <p className="task-description">{tarefa.description}</p>
                <span className={`task-priority priority-${tarefa.priority}`}>
                  {tarefa.priority}
                </span>
              </div>
              <div className="task-actions">
                <Link to={`/tarefas/${tarefa.id}`} className="task-button">Ver</Link>
                <Link to={`/editar/${tarefa.id}`} className="task-button">Editar</Link>
                <button onClick={() => handleDelete(tarefa.id)} className="task-button">Apagar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tarefas
