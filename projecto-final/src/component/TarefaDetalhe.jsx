import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import './TarefaDetalhe.css'

function TarefaDetalhe() {
  const { id } = useParams()
  const [tarefa, setTarefa] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [novaSubtarefa, setNovaSubtarefa] = useState('')
  const [editandoSubtarefa, setEditandoSubtarefa] = useState(null)
  const [textoEdicao, setTextoEdicao] = useState('')

  const carregarTarefa = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/tasks/${id}`)
      setTarefa(res.data)
      setLoading(false)
    } catch (err) {
      console.error('Erro ao carregar tarefa:', err)
      setError('Não foi possível carregar os detalhes da tarefa.')
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarTarefa()
  }, [id])

  const adicionarSubtarefa = async (e) => {
    e.preventDefault()
    if (!novaSubtarefa.trim()) return

    try {
      const subtasks = tarefa.subtasks || []
      
      let maxId = 0;
      subtasks.forEach(subtask => {
        const idNum = parseInt(subtask.id.replace(/^\D+/g, '') || 0);
        if (!isNaN(idNum) && idNum > maxId) maxId = idNum;
      });
      
      const novaSubtarefaObj = {
        id: String(maxId + 1),
        title: novaSubtarefa,
        done: false
      }
      
      await axios.patch(`http://localhost:3002/tasks/${id}`, {
        subtasks: [novaSubtarefaObj, ...subtasks]
      })
      
      setTarefa({
        ...tarefa,
        subtasks: [novaSubtarefaObj, ...subtasks]
      })
      
      setNovaSubtarefa('')
    } catch (error) {
      console.error('Erro ao adicionar subtarefa:', error)
      alert('Não foi possível adicionar a subtarefa.')
    }
  }

  const toggleSubtarefa = async (subtarefaId) => {
    try {
      const subtasks = [...tarefa.subtasks]
      const index = subtasks.findIndex(s => s.id === subtarefaId)
      
      if (index === -1) return
      
      subtasks[index].done = !subtasks[index].done
      
      await axios.patch(`http://localhost:3002/tasks/${id}`, { subtasks })
      
      setTarefa({ ...tarefa, subtasks })
    } catch (error) {
      console.error('Erro ao atualizar subtarefa:', error)
      alert('Não foi possível atualizar a subtarefa.')
    }
  }

  const iniciarEdicaoSubtarefa = (subtarefa) => {
    setEditandoSubtarefa(subtarefa.id)
    setTextoEdicao(subtarefa.title)
  }

  const salvarEdicaoSubtarefa = async () => {
    if (!textoEdicao.trim()) return
    
    try {
      const subtasks = [...tarefa.subtasks]
      const index = subtasks.findIndex(s => s.id === editandoSubtarefa)
      
      if (index === -1) return
      
      subtasks[index].title = textoEdicao
      
      await axios.patch(`http://localhost:3002/tasks/${id}`, { subtasks })
      
      setTarefa({ ...tarefa, subtasks })
      
      setEditandoSubtarefa(null)
      setTextoEdicao('')
    } catch (error) {
      console.error('Erro ao editar subtarefa:', error)
      alert('Não foi possível editar a subtarefa.')
    }
  }

  const apagarSubtarefa = async (subtarefaId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta subtarefa?')) return
    
    try {
      const subtasks = tarefa.subtasks.filter(s => s.id !== subtarefaId)
      
      await axios.patch(`http://localhost:3002/tasks/${id}`, { subtasks })
      
      setTarefa({ ...tarefa, subtasks })
    } catch (error) {
      console.error('Erro ao apagar subtarefa:', error)
      alert('Não foi possível excluir a subtarefa.')
    }
  }

  if (loading) return <div className="loading-container">A carregar tarefa...</div>
  if (error) return <div className="error-container">{error}</div>
  if (!tarefa) return <div className="error-container">Tarefa não encontrada.</div>

  return (
    <div className="tarefa-detalhada-container">
      <div className="tarefa-detalhada">
        <h2>Detalhes da Tarefa</h2>
        
        <div className="card-info">
          <div className="info-row">
            <span className="info-label">Título:</span>
            <span className="info-content">{tarefa.title}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Descrição:</span>
            <span className="info-content">{tarefa.description}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Prioridade:</span>
            <span className={`info-content priority-badge priority-${tarefa.priority}`}>
              {tarefa.priority}
            </span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Estado:</span>
            <span className={`info-content status-badge ${tarefa.done ? 'status-done' : 'status-pending'}`}>
              {tarefa.done ? 'Concluída' : 'Pendente'}
            </span>
          </div>
        </div>

        <div className="subtasks-section">
          <h3>Subtarefas</h3>
          
          <form className="add-subtask-form" onSubmit={adicionarSubtarefa}>
            <input 
              type="text"
              value={novaSubtarefa}
              onChange={(e) => setNovaSubtarefa(e.target.value)}
              placeholder="Nova subtarefa..."
              className="subtask-input"
            />
            <button type="submit" className="add-subtask-button">Adicionar</button>
          </form>
          
          <div className="subtasks-list">
            {tarefa.subtasks && tarefa.subtasks.length > 0 ? (
              tarefa.subtasks.map((subtarefa) => (
                <div key={subtarefa.id} className="subtask-item">
                  <div 
                    className={`subtask-checkbox ${subtarefa.done ? 'checked' : ''}`}
                    onClick={() => toggleSubtarefa(subtarefa.id)}
                  >
                    {subtarefa.done && <span className="checkmark">✓</span>}
                  </div>
                  
                  {editandoSubtarefa === subtarefa.id ? (
                    <div className="subtask-edit-form">
                      <input 
                        type="text"
                        value={textoEdicao}
                        onChange={(e) => setTextoEdicao(e.target.value)}
                        className="subtask-edit-input"
                        autoFocus
                      />
                      <button onClick={salvarEdicaoSubtarefa} className="subtask-save-button">
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <div className={`subtask-text ${subtarefa.done ? 'completed' : ''}`}>
                      {subtarefa.title}
                    </div>
                  )}
                  
                  <div className="subtask-actions">
                    {editandoSubtarefa !== subtarefa.id && (
                      <button 
                        onClick={() => iniciarEdicaoSubtarefa(subtarefa)} 
                        className="subtask-action-button edit"
                        title="Editar subtarefa"
                      >
                        ✏️
                      </button>
                    )}
                    <button 
                      onClick={() => apagarSubtarefa(subtarefa.id)} 
                      className="subtask-action-button delete"
                      title="Apagar subtarefa"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-subtasks-message">Não há subtarefas para esta tarefa.</p>
            )}
          </div>
        </div>
        
        <div className="tarefa-actions">
          <Link to="/" className="back-button">Voltar</Link>
          <Link to={`/editar/${id}`} className="edit-button">Editar Tarefa</Link>
        </div>
      </div>
    </div>
  )
}

export default TarefaDetalhe
