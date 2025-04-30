import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function TarefaDetalhe() {
  const { id } = useParams()
  const [tarefa, setTarefa] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3002/tasks/${id}`)
      .then((res) => {
        setTarefa(res.data)
      })
      .catch((err) => {
        console.error('Erro ao carregar tarefa:', err)
        alert('Erro ao carregar a tarefa.')
      })
  }, [id])

  if (!tarefa) return <p>A carregar tarefa...</p>

  return (
    <div>
      <h2>Detalhes da Tarefa</h2>
      <p><strong>Título:</strong> {tarefa.title}</p>
      <p><strong>Descrição:</strong> {tarefa.description}</p>
      <p><strong>Prioridade:</strong> {tarefa.priority}</p>
    </div>
  )
}

export default TarefaDetalhe
