// Sistema de armazenamento local para simular banco de dados

const STORAGE_KEYS = {
  RESERVAS: 'brisa_azul_reservas',
  QUARTOS: 'brisa_azul_quartos',
  DESPESAS: 'brisa_azul_despesas',
  FUNCIONARIOS: 'brisa_azul_funcionarios',
  USUARIO_LOGADO: 'brisa_azul_usuario_logado',
  CARRINHO: 'brisa_azul_carrinho',
  META_OCUPACAO: 'brisa_azul_meta_ocupacao'
}

// Função para verificar e atualizar reservas concluídas automaticamente
const atualizarReservasConcluidas = () => {
  const reservas = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVAS) || '[]')
  const agora = new Date()
  const horaCheckout = 10 // 10:00
  
  const reservasAtualizadas = reservas.map(reserva => {
    if (reserva.status === 'pendente' && reserva.checkOut) {
      const checkOut = new Date(reserva.checkOut)
      checkOut.setHours(horaCheckout, 0, 0, 0)
      
      if (agora >= checkOut) {
        return { ...reserva, status: 'concluida' }
      }
    }
    return reserva
  })
  
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservasAtualizadas))
}

export const getReservas = () => {
  atualizarReservasConcluidas()
  const data = localStorage.getItem(STORAGE_KEYS.RESERVAS)
  return data ? JSON.parse(data) : []
}

export const saveReserva = (reserva) => {
  const reservas = getReservas()
  const novaReserva = {
    ...reserva,
    id: Date.now().toString(),
    codigo: `BR${Date.now()}`,
    status: 'pendente',
    dataReserva: new Date().toISOString()
  }
  reservas.push(novaReserva)
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservas))
  return novaReserva
}

export const updateReserva = (id, updates) => {
  const reservas = getReservas()
  const index = reservas.findIndex(r => r.id === id)
  if (index !== -1) {
    reservas[index] = { ...reservas[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservas))
    return reservas[index]
  }
  return null
}

export const deleteReserva = (id) => {
  const reservas = getReservas()
  const filtered = reservas.filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(filtered))
}

export const getQuartos = () => {
  const data = localStorage.getItem(STORAGE_KEYS.QUARTOS)
  if (data) return JSON.parse(data)
  
  // Inicializar quartos padrão
  const quartos = [
    {
      id: 'imperial',
      nome: 'Suíte Brisa Imperial',
      preco: 249,
      descricao: 'Uma suíte elegante e aconchegante, pensada para quem busca conforto e tranquilidade.'
    },
    {
      id: 'luxo',
      nome: 'Suíte Brisa Luxo',
      preco: 350,
      descricao: 'Espaçosa e confortável, a Suíte Brisa Luxo oferece uma experiência premium.'
    },
    {
      id: 'premium',
      nome: 'Suíte Brisa Premium',
      preco: 450,
      descricao: 'A opção mais exclusiva do hotel, perfeita para quem deseja viver momentos especiais.'
    },
    {
      id: 'exclusiva',
      nome: 'Suíte Brisa Exclusiva',
      preco: 550,
      descricao: 'Combina elegância, conforto e privacidade em um só espaço.'
    }
  ]
  localStorage.setItem(STORAGE_KEYS.QUARTOS, JSON.stringify(quartos))
  return quartos
}

export const getDespesas = () => {
  const data = localStorage.getItem(STORAGE_KEYS.DESPESAS)
  if (data) return JSON.parse(data)
  
  const despesas = [
    { id: '1', categoria: 'Funcionarios', quantidade: 7, total: 1300.00 },
    { id: '2', categoria: 'Limpeza', quantidade: null, total: 3800.00 },
    { id: '3', categoria: 'Manutenção', quantidade: null, total: 1400.80 },
    { id: '4', categoria: 'Taxas de plataformas', quantidade: null, total: 3800.00 },
    { id: '5', categoria: 'Gasto a parte', quantidade: null, total: 1300.00 },
    { id: '6', categoria: 'Despesas fixa', quantidade: null, total: 3800.00 }
  ]
  localStorage.setItem(STORAGE_KEYS.DESPESAS, JSON.stringify(despesas))
  return despesas
}

export const updateDespesas = (despesas) => {
  localStorage.setItem(STORAGE_KEYS.DESPESAS, JSON.stringify(despesas))
}

export const getFuncionarios = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FUNCIONARIOS)
  return data ? JSON.parse(data) : []
}

export const saveFuncionario = (funcionario) => {
  const funcionarios = getFuncionarios()
  const novo = {
    ...funcionario,
    id: Date.now().toString()
  }
  funcionarios.push(novo)
  localStorage.setItem(STORAGE_KEYS.FUNCIONARIOS, JSON.stringify(funcionarios))
  return novo
}

export const deleteFuncionario = (id) => {
  const funcionarios = getFuncionarios()
  const filtered = funcionarios.filter(f => f.id !== id)
  localStorage.setItem(STORAGE_KEYS.FUNCIONARIOS, JSON.stringify(filtered))
}

export const setUsuarioLogado = (usuario) => {
  localStorage.setItem(STORAGE_KEYS.USUARIO_LOGADO, JSON.stringify(usuario))
}

export const getUsuarioLogado = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USUARIO_LOGADO)
  return data ? JSON.parse(data) : null
}

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USUARIO_LOGADO)
}

export const getCarrinho = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CARRINHO)
  return data ? JSON.parse(data) : null
}

export const saveCarrinho = (carrinho) => {
  localStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(carrinho))
}

export const clearCarrinho = () => {
  localStorage.removeItem(STORAGE_KEYS.CARRINHO)
}

export const getMetaOcupacao = () => {
  const data = localStorage.getItem(STORAGE_KEYS.META_OCUPACAO)
  return data ? parseInt(data) : 100
}

export const setMetaOcupacao = (meta) => {
  localStorage.setItem(STORAGE_KEYS.META_OCUPACAO, meta.toString())
}

// Funções auxiliares para cálculos
export const getReservasPorMes = (mes, ano) => {
  const reservas = getReservas()
  return reservas.filter(r => {
    const dataReserva = new Date(r.dataReserva)
    return dataReserva.getMonth() === mes && dataReserva.getFullYear() === ano
  })
}

export const getReservasPorQuarto = (quartoId) => {
  const reservas = getReservas()
  return reservas.filter(r => r.quartoId === quartoId)
}

export const getReservasPorData = (data) => {
  const reservas = getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.filter(r => {
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

export const isDataOcupada = (data, quartoId) => {
  const reservas = getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.some(r => {
    if (r.quartoId !== quartoId || r.status === 'cancelada') return false
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

// Função para formatar valores monetários com separador de milhares
export const formatarMoeda = (valor) => {
  if (valor === null || valor === undefined || isNaN(valor)) return '0,00'
  const valorFormatado = parseFloat(valor).toFixed(2)
  const partes = valorFormatado.split('.')
  const inteiro = partes[0]
  const decimal = partes[1]
  
  // Adicionar ponto como separador de milhares
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  
  return `${inteiroFormatado},${decimal}`
}

