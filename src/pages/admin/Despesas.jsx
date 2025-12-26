import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { getDespesas, updateDespesas, getMetaOcupacao, setMetaOcupacao, formatarMoeda, getReservas } from '../../utils/storage'
import { getMonth, getYear } from 'date-fns'
import AdminHeader from '../../components/AdminHeader'
import './Despesas.css'

const Despesas = () => {
  const [despesas, setDespesas] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [metaOcupacao, setMetaOcupacaoState] = useState(100)

  // Função para calcular faturamento de Booking e Airbnb do mês atual
  const calcularFaturamentoBookingAirbnb = () => {
    const todasReservas = getReservas()
    const mesAtual = new Date()
    const mes = mesAtual.getMonth()
    const ano = mesAtual.getFullYear()
    
    // Filtrar reservas do Booking e Airbnb do mês atual
    const reservasMes = todasReservas.filter(r => {
      if (r.status === 'cancelada') return false
      if (r.origem !== 'Booking' && r.origem !== 'Airbnb') return false
      if (!r.checkIn || !r.checkOut) return false
      const checkIn = new Date(r.checkIn)
      const checkOut = new Date(r.checkOut)
      const checkInMes = checkIn.getMonth()
      const checkInAno = checkIn.getFullYear()
      const checkOutMes = checkOut.getMonth()
      const checkOutAno = checkOut.getFullYear()
      
      return (checkInMes === mes && checkInAno === ano) || 
             (checkOutMes === mes && checkOutAno === ano) ||
             (checkIn <= new Date(ano, mes + 1, 0) && checkOut >= new Date(ano, mes, 1))
    })
    
    // Calcular valor total das reservas
    const calcularValorReserva = (r) => {
      if (r.total && r.total > 0) {
        return r.total
      }
      if (r.checkIn && r.checkOut) {
        const checkIn = new Date(r.checkIn)
        const checkOut = new Date(r.checkOut)
        const diffTime = Math.abs(checkOut - checkIn)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays * 200
      }
      return 200
    }
    
    return reservasMes.reduce((sum, r) => sum + calcularValorReserva(r), 0)
  }

  useEffect(() => {
    const todasDespesas = getDespesas()
    // Recalcular total de "Taxas de plataformas" ao carregar
    const despesasAtualizadas = todasDespesas.map(d => {
      if (d.categoria && d.categoria.toLowerCase().includes('taxa') && d.quantidade) {
        const porcentagem = parseFloat(d.quantidade) || 0
        const faturamentoBookingAirbnb = calcularFaturamentoBookingAirbnb()
        const totalCalculado = (faturamentoBookingAirbnb * porcentagem) / 100
        return { ...d, total: totalCalculado }
      }
      return d
    })
    setDespesas(despesasAtualizadas)
    setMetaOcupacaoState(getMetaOcupacao())
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateDespesas(despesas)
    setIsEditing(false)
  }

  const handleChange = (id, field, value) => {
    setDespesas(despesas.map(d => {
      if (d.id === id) {
        if (field === 'categoria') {
          return { ...d, categoria: value }
        } else if (field === 'quantidade') {
          // Se for "Taxas de plataformas", tratar como porcentagem
          const isTaxasPlataformas = d.categoria && d.categoria.toLowerCase().includes('taxa')
          let novaDespesa = { ...d, quantidade: value === '' ? null : value }
          
          if (isTaxasPlataformas && value) {
            // Limitar a 100%
            const porcentagem = Math.min(100, Math.max(0, parseFloat(value) || 0))
            novaDespesa.quantidade = porcentagem.toString()
            
            // Calcular total como porcentagem do faturamento de Booking/Airbnb
            const faturamentoBookingAirbnb = calcularFaturamentoBookingAirbnb()
            const totalCalculado = (faturamentoBookingAirbnb * porcentagem) / 100
            novaDespesa.total = totalCalculado
          }
          
          return novaDespesa
        } else {
          // Trata valores com ponto como separador de milhares e vírgula como decimal
          let valorLimpo = value.toString().trim()
          
          if (valorLimpo === '' || valorLimpo === ',') {
            return { ...d, total: 0 }
          }
          
          // Se tem vírgula, ela é o separador decimal
          // Remove todos os pontos (separadores de milhares) e converte vírgula para ponto
          if (valorLimpo.includes(',')) {
            // Remove pontos antes da vírgula (separadores de milhares)
            const partes = valorLimpo.split(',')
            const parteInteira = partes[0].replace(/\./g, '')
            const parteDecimal = partes[1] || '00'
            valorLimpo = `${parteInteira}.${parteDecimal}`
          } else {
            // Se não tem vírgula, remove todos os pontos (são separadores de milhares)
            valorLimpo = valorLimpo.replace(/\./g, '')
          }
          
          const valorNumerico = parseFloat(valorLimpo) || 0
          return { ...d, total: valorNumerico }
        }
      }
      return d
    }))
  }

  const handleAddRow = () => {
    const novaDespesa = {
      id: Date.now().toString(),
      categoria: 'Nova despesa',
      quantidade: null,
      total: 0
    }
    setDespesas([...despesas, novaDespesa])
  }

  const handleDeleteRow = (id) => {
    // Não permitir excluir "Taxas de plataformas"
    const despesa = despesas.find(d => d.id === id)
    if (despesa && despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')) {
      alert('Esta linha não pode ser excluída.')
      return
    }
    setDespesas(despesas.filter(d => d.id !== id))
  }

  return (
    <div className="despesas-page">
      <AdminHeader currentPage="despesas" />
      <div className="despesas-container">
        <div className="despesas-header">
          <h1 className="despesas-title">Despesas</h1>
          <div className="despesas-header-buttons">
            {isEditing && (
              <button onClick={handleAddRow} className="despesas-add-button">
                Adicionar linha
              </button>
            )}
            {!isEditing ? (
              <button onClick={handleEdit} className="despesas-edit-button">
                Editar
              </button>
            ) : (
              <button onClick={handleSave} className="despesas-save-button">
                Salvar
              </button>
            )}
          </div>
        </div>

        <table className="despesas-table">
          <thead>
            <tr>
              <th>Todos as Despesas</th>
              <th>Quantidade</th>
              <th>Total</th>
              {isEditing && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {despesas.map(despesa => (
              <tr key={despesa.id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={despesa.categoria}
                      onChange={(e) => handleChange(despesa.id, 'categoria', e.target.value)}
                      style={{ width: '100%', padding: '5px', background: '#2d2d2d', color: '#ffffff', border: '1px solid #404040', borderRadius: '4px' }}
                    />
                  ) : (
                    despesa.categoria
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="number"
                      value={despesa.quantidade || ''}
                        onChange={(e) => {
                          const valor = e.target.value
                          handleChange(despesa.id, 'quantidade', valor)
                        }}
                        min="0"
                        max={despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? 100 : undefined}
                        placeholder={despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? '0' : ''}
                        style={{ width: '60px', padding: '5px', background: '#2d2d2d', color: '#ffffff', border: '1px solid #404040', borderRadius: '4px' }}
                    />
                      {despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') && (
                        <span style={{ color: '#ffffff' }}>%</span>
                      )}
                    </div>
                  ) : (
                    despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') && despesa.quantidade !== null && despesa.quantidade !== '' 
                      ? `${despesa.quantidade}%` 
                      : (despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? '' : (despesa.quantidade || ''))
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={despesa.total === 0 ? '' : despesa.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      onChange={(e) => {
                        // Permite digitar números, pontos e vírgulas
                        const valor = e.target.value.replace(/[^\d.,]/g, '')
                        handleChange(despesa.id, 'total', valor)
                      }}
                      placeholder="0,00"
                      readOnly={despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')}
                      style={{ 
                        width: '120px', 
                        padding: '5px', 
                        background: despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? '#1a1a1a' : '#2d2d2d', 
                        color: '#ffffff', 
                        border: '1px solid #404040', 
                        borderRadius: '4px',
                        cursor: despesa.categoria && despesa.categoria.toLowerCase().includes('taxa') ? 'not-allowed' : 'text'
                      }}
                    />
                  ) : (
                    formatarMoeda(despesa.total)
                  )}
                </td>
                {isEditing && (
                  <td>
                    {!(despesa.categoria && despesa.categoria.toLowerCase().includes('taxa')) && (
                    <button 
                      onClick={() => handleDeleteRow(despesa.id)}
                      className="despesas-delete-button"
                      title="Excluir linha"
                    >
                        <FaTimes />
                    </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="meta-ocupacao-section">
          <div className="meta-header">
            <h2 className="meta-title">
              Meta a se bater
            </h2>
            <button className="meta-button" onClick={() => {
              const novaMeta = parseInt(prompt('Digite a meta:')) || 0
              setMetaOcupacaoState(novaMeta)
              setMetaOcupacao(novaMeta)
            }}>
              coloca meta
            </button>
          </div>
          <div className="meta-container">
            <input
              type="number"
              value={metaOcupacao || ''}
              readOnly
              placeholder="Meta"
              className="meta-input-despesas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Despesas

