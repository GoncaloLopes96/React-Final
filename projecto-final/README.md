# Gestor de Tarefas - Projeto Final React

## Descrição

Este projeto é um gestor de tarefas desenvolvido em React, permitindo aos utilizadores gerir eficientemente as suas tarefas diárias. A aplicação apresenta uma interface intuitiva para criar, visualizar, editar e apagar tarefas, bem como marcar tarefas como concluídas.

## Funcionalidades

- **Listagem de Tarefas**: Visualização de todas as tarefas numa interface de cards
- **Criação de Tarefas**: Formulário dedicado para adicionar novas tarefas
- **Edição de Tarefas**: Modificação de tarefas existentes
- **Eliminação de Tarefas**: Remoção de tarefas da lista
- **Detalhe de Tarefa**: Visualização detalhada de uma tarefa específica
- **Marcação de Conclusão**: Toggle para marcar tarefas como concluídas/pendentes
- **Modo Escuro/Claro**: Alteração entre temas visuais diferentes
- **Prioridade de Tarefas**: Classificação de tarefas por níveis de prioridade (baixa, média, alta)

## Tecnologias Utilizadas

- **React**: Biblioteca principal para desenvolvimento da interface
- **React Router**: Gestão de rotas na aplicação
- **Axios**: Comunicação com a API de tarefas
- **JSON Server**: Simulação de API para desenvolvimento
- **CSS**: Estilização personalizada dos componentes

## Como Iniciar a Aplicação

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor JSON** (API simulada):
   ```bash
   npx json-server --watch src/api/db.json --port 3002
   ```

3. **Iniciar a aplicação React**:
   ```bash
   npm run dev
   ```

4. **Aceder à aplicação**:
   Abra o navegador e aceda a `http://localhost:5173` (ou a porta indicada pelo Vite)

## Estrutura do Projeto

```
├── src/
│   ├── api/          # Dados simulados para o JSON Server
│   ├── component/    # Componentes React (Tarefas, CriarTarefa, etc.)
│   ├── nav/          # Componentes de navegação
│   ├── App.jsx       # Componente principal e rotas
│   └── main.jsx      # Ponto de entrada da aplicação
```

## Utilização

### Página Principal
A página inicial apresenta uma lista de todas as tarefas. Cada tarefa é representada por um card que mostra o título, descrição e prioridade. O utilizador pode marcar uma tarefa como concluída/pendente clicando no círculo de estado.

### Criar Tarefa
Aceda à página "Criar Tarefa" através da navegação. Preencha o formulário com o título, descrição e selecione o nível de prioridade da tarefa. Após submeter, a nova tarefa será adicionada à lista.

### Editar Tarefa
Clique no botão "Editar" numa tarefa existente para modificar os seus detalhes. O formulário será pré-preenchido com os dados atuais da tarefa.

### Ver Detalhes
Clique no botão "Ver" numa tarefa para aceder à página de detalhes, onde todas as informações sobre a tarefa são apresentadas.

### Alternar Tema
Utilize o botão de tema (ícone sol/lua) na barra de navegação para alternar entre o modo claro e escuro.

## Contribuições

Para contribuir para este projeto:
1. Faça um fork do repositório
2. Crie uma nova branch para a sua funcionalidade (`git checkout -b nova-funcionalidade`)
3. Submeta as suas alterações (`git commit -m 'Adicionar nova funcionalidade'`)
4. Faça push para a branch (`git push origin nova-funcionalidade`)
5. Abra um Pull Request

## Contacto

Para dúvidas ou sugestões, por favor contacte-me via github!

---

Projeto desenvolvido como trabalho final para a disciplina de Desenvolvimento Web com React.