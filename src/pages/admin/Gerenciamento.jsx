import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getFuncionarios, saveFuncionario, deleteFuncionario, getUsuarioLogado } from '../../utils/storage'
import AdminHeader from '../../components/AdminHeader'
import './Gerenciamento.css'

const Gerenciamento = () => {
  const [funcionarios, setFuncionarios] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' })
  const usuarioLogado = getUsuarioLogado()

  useEffect(() => {
    const carregarDados = async () => {
      const todosFuncionarios = await getFuncionarios()
      setFuncionarios(todosFuncionarios)
    }
    carregarDados()
  }, [])

  const handleAdd = () => {
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await saveFuncionario(formData)
      const todosFuncionarios = await getFuncionarios()
      setFuncionarios(todosFuncionarios)
      setFormData({ nome: '', email: '', senha: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
      alert('Erro ao salvar funcionário. Tente novamente.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este funcionário?')) {
      try {
        await deleteFuncionario(id)
        const todosFuncionarios = await getFuncionarios()
        setFuncionarios(todosFuncionarios)
      } catch (error) {
        console.error('Erro ao deletar funcionário:', error)
        alert('Erro ao deletar funcionário. Tente novamente.')
      }
    }
  }

  const handleVerFicha = (funcionario) => {
    alert(`Nome: ${funcionario.nome}\nE-mail: ${funcionario.email}`)
  }

  return (
    <div className="gerenciamento-page">
      <AdminHeader currentPage="gerenciamento" />
      <div className="gerenciamento-container">
        <h1 className="gerenciamento-title">Gestão de Funcionários</h1>

        <div className="gerenciamento-header">
          <h2>Todos os Gestores</h2>
          <button onClick={handleAdd} className="gerenciamento-add-button">
            <FaPlus /> Adicionar
          </button>
        </div>

        {showForm && (
          <form className="gerenciamento-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do funcionário</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="form-submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="form-cancel">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="gerenciamento-list">
          {funcionarios.map(funcionario => (
            <div key={funcionario.id} className="gerenciamento-item">
              <input
                type="text"
                value={funcionario.nome || 'Nome do funcionário'}
                readOnly
                className="funcionario-nome"
              />
              <div className="funcionario-actions">
                <button onClick={() => handleDelete(funcionario.id)} className="funcionario-button excluir">
                  Excluir
                </button>
                <button onClick={() => handleVerFicha(funcionario)} className="funcionario-button">
                  Ver ficha
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gerenciamento

