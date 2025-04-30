import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './EditarTarefa.css'

function EditarTarefa() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('baixa')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3002/tasks/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setDescription(res.data.description)
        setPriority(res.data.priority)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao carregar tarefa:', err)
        alert('Erro ao carregar a tarefa.')
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3002/tasks/${id}`, {
        title,
        description,
        priority
      })
      alert('Tarefa atualizada com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      alert('Erro ao atualizar a tarefa.')
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Editar Tarefa</h2>
      
      {loading ? (
        <p className="loading-message">Carregando tarefa...</p>
      ) : (
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
          
          <div className="form-actions">
            <button type="submit" className="form-button" style={{ marginRight: '10px' }}>
              Guardar Alterações
            </button>
            <button 
              type="button" 
              className="form-button cancel-button"
              onClick={() => navigate('/')}
              style={{ marginLeft: '10px' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditarTarefa
