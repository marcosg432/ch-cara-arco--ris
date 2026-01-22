// Sistema de armazenamento usando API do backend
import { reservasAPI, quartosAPI, despesasAPI, funcionariosAPI, metaOcupacaoAPI } from './api'

const STORAGE_KEYS = {
  USUARIO_LOGADO: 'chacara_arco_iris_usuario_logado',
  CARRINHO: 'chacara_arco_iris_carrinho'
}

// Cache para evitar múltiplas requisições
let cache = {
  reservas: null,
  quartos: null,
  despesas: null,
  funcionarios: null,
  metaOcupacao: null,
  cacheTime: {}
}

const CACHE_DURATION = 1000 // 1 segundo de cache

// Função auxiliar para limpar cache
const clearCache = (key) => {
  if (key) {
    cache[key] = null
    cache.cacheTime[key] = null
  } else {
    cache = {
      reservas: null,
      quartos: null,
      despesas: null,
      funcionarios: null,
      metaOcupacao: null,
      cacheTime: {}
    }
  }
}

// Função para verificar e atualizar reservas concluídas automaticamente
const atualizarReservasConcluidas = async (reservas) => {
  const agora = new Date()
  const horaCheckout = 10 // 10:00
  
  const reservasAtualizadas = []
  const reservasParaAtualizar = []
  
  for (const reserva of reservas) {
    if (reserva.status === 'pendente' && reserva.checkOut) {
      const checkOut = new Date(reserva.checkOut)
      checkOut.setHours(horaCheckout, 0, 0, 0)
      
      if (agora >= checkOut) {
        const reservaAtualizada = { ...reserva, status: 'concluida' }
        reservasAtualizadas.push(reservaAtualizada)
        if (reserva._id) {
          reservasParaAtualizar.push({ id: reserva._id, status: 'concluida' })
        }
      } else {
        reservasAtualizadas.push(reserva)
      }
    } else {
      reservasAtualizadas.push(reserva)
    }
  }
  
  // Atualizar no backend se houver mudanças (em background, não bloquear)
  if (reservasParaAtualizar.length > 0) {
    Promise.all(
      reservasParaAtualizar.map(r => 
        reservasAPI.update(r.id, { status: r.status }).catch(err => 
          console.error('Erro ao atualizar reserva:', err)
        )
      )
    ).catch(() => {}) // Ignorar erros em background
  }
  
  return reservasAtualizadas
}

// ========== RESERVAS ==========
export const getReservas = async () => {
  try {
    // Verificar cache
    if (cache.reservas && cache.cacheTime.reservas && 
        Date.now() - cache.cacheTime.reservas < CACHE_DURATION) {
      return await atualizarReservasConcluidas(cache.reservas)
    }
    
    const reservas = await reservasAPI.getAll()
    cache.reservas = reservas
    cache.cacheTime.reservas = Date.now()
    
    return await atualizarReservasConcluidas(reservas)
  } catch (error) {
    console.error('Erro ao buscar reservas:', error)
    return []
  }
}

export const saveReserva = async (reserva) => {
  try {
    clearCache('reservas')
    
    // Converter datas de Date para ISO string se necessário
    const reservaFormatada = {
      ...reserva,
      status: 'pendente',
      origem: reserva.origem || 'Site / whatsapp',
      // Converter checkIn e checkOut para ISO string
      checkIn: reserva.checkIn instanceof Date 
        ? reserva.checkIn.toISOString() 
        : (typeof reserva.checkIn === 'string' ? reserva.checkIn : new Date(reserva.checkIn).toISOString()),
      checkOut: reserva.checkOut instanceof Date 
        ? reserva.checkOut.toISOString() 
        : (typeof reserva.checkOut === 'string' ? reserva.checkOut : new Date(reserva.checkOut).toISOString()),
      // Garantir que campos numéricos sejam números
      pessoas: parseInt(reserva.pessoas) || 1,
      quantidadeCriancas: parseInt(reserva.quantidadeCriancas) || 0,
      temCriancas: reserva.temCriancas || false,
      idades: reserva.idades || [],
      // Garantir campos opcionais
      preco: parseFloat(reserva.preco) || 0,
      total: parseFloat(reserva.total) || 0,
      noites: parseInt(reserva.noites) || 1,
      // Remover campos null/undefined antes de enviar
      quantidadeChales: reserva.quantidadeChales ? parseInt(reserva.quantidadeChales) : undefined,
      quantidadeDormitorios: reserva.quantidadeDormitorios ? parseInt(reserva.quantidadeDormitorios) : undefined
    }
    
    // Remover campos undefined/null antes de enviar
    const reservaParaEnviar = {};
    Object.keys(reservaFormatada).forEach(key => {
      if (reservaFormatada[key] !== undefined && reservaFormatada[key] !== null) {
        reservaParaEnviar[key] = reservaFormatada[key];
      }
    });
    
    console.log('📤 Enviando reserva para API:', reservaParaEnviar);
    const novaReserva = await reservasAPI.create(reservaParaEnviar)
    return novaReserva
  } catch (error) {
    console.error('Erro ao salvar reserva:', error)
    console.error('Dados da reserva:', reserva)
    throw error
  }
}

export const updateReserva = async (id, updates) => {
  try {
    clearCache('reservas')
    const reserva = await reservasAPI.update(id, updates)
    return reserva
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error)
    throw error
  }
}

export const deleteReserva = async (id) => {
  try {
    clearCache('reservas')
    await reservasAPI.delete(id)
  } catch (error) {
    console.error('Erro ao deletar reserva:', error)
    throw error
  }
}

// ========== QUARTOS ==========
export const getQuartos = async () => {
  try {
    // Verificar cache
    if (cache.quartos && cache.cacheTime.quartos && 
        Date.now() - cache.cacheTime.quartos < CACHE_DURATION) {
      return cache.quartos
    }
    
    const quartos = await quartosAPI.getAll()
    cache.quartos = quartos
    cache.cacheTime.quartos = Date.now()
    return quartos
  } catch (error) {
    console.error('Erro ao buscar quartos:', error)
    // Retornar quartos padrão em caso de erro
    return [
      {
        id: 'imperial',
        nome: 'Chále 03',
        preco: 300,
        descricao: 'Uma suíte elegante e aconchegante, pensada para quem busca conforto e tranquilidade.'
      },
      {
        id: 'luxo',
        nome: 'Chále 04',
        preco: 300,
        descricao: 'Espaçosa e confortável, oferece uma experiência premium.'
      },
      {
        id: 'premium',
        nome: 'Chále 06',
        preco: 300,
        descricao: 'A opção mais exclusiva do hotel, perfeita para quem deseja viver momentos especiais.'
      },
      {
        id: 'exclusiva',
        nome: 'Chále 07',
        preco: 300,
        descricao: 'Combina elegância, conforto e privacidade em um só espaço.'
      },
      {
        id: 'chale05',
        nome: 'Dormitório 08 feminino',
        preco: 600,
        descricao: ''
      },
      {
        id: 'chale08',
        nome: 'Dormitório 09 masculino',
        preco: 600,
        descricao: ''
      }
    ]
  }
}

// ========== DESPESAS ==========
export const getDespesas = async () => {
  try {
    // Verificar cache
    if (cache.despesas && cache.cacheTime.despesas && 
        Date.now() - cache.cacheTime.despesas < CACHE_DURATION) {
      return cache.despesas
    }
    
    const despesas = await despesasAPI.getAll()
    cache.despesas = despesas
    cache.cacheTime.despesas = Date.now()
    return despesas
  } catch (error) {
    console.error('Erro ao buscar despesas:', error)
    // Retornar despesas padrão em caso de erro
    return [
      { id: '1', categoria: 'Funcionarios', quantidade: 7, total: 390.00 },
      { id: '2', categoria: 'Limpeza', quantidade: null, total: 1140.00 },
      { id: '3', categoria: 'Manutenção', quantidade: null, total: 420.24 },
      { id: '4', categoria: 'Gasto a parte', quantidade: null, total: 390.00 },
      { id: '5', categoria: 'Despesas fixa', quantidade: null, total: 1140.00 }
    ]
  }
}

export const updateDespesas = async (despesas) => {
  try {
    clearCache('despesas')
    // Atualizar cada despesa individualmente
    const promises = despesas.map(async (despesa) => {
      if (despesa._id) {
        // Atualizar despesa existente
        return await despesasAPI.update(despesa._id, despesa)
      } else {
        // Criar nova despesa
        return await despesasAPI.create(despesa)
      }
    })
    await Promise.all(promises)
    return despesas
  } catch (error) {
    console.error('Erro ao atualizar despesas:', error)
    throw error
  }
}

// ========== FUNCIONÁRIOS ==========
export const getFuncionarios = async () => {
  try {
    // Verificar cache
    if (cache.funcionarios && cache.cacheTime.funcionarios && 
        Date.now() - cache.cacheTime.funcionarios < CACHE_DURATION) {
      return cache.funcionarios
    }
    
    const funcionarios = await funcionariosAPI.getAll()
    cache.funcionarios = funcionarios
    cache.cacheTime.funcionarios = Date.now()
    return funcionarios
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error)
    return []
  }
}

export const saveFuncionario = async (funcionario) => {
  try {
    clearCache('funcionarios')
    const novo = await funcionariosAPI.create(funcionario)
    return novo
  } catch (error) {
    console.error('Erro ao salvar funcionário:', error)
    throw error
  }
}

export const deleteFuncionario = async (id) => {
  try {
    clearCache('funcionarios')
    await funcionariosAPI.delete(id)
  } catch (error) {
    console.error('Erro ao deletar funcionário:', error)
    throw error
  }
}

// ========== META OCUPAÇÃO ==========
export const getMetaOcupacao = async () => {
  try {
    // Verificar cache
    if (cache.metaOcupacao !== null && cache.cacheTime.metaOcupacao && 
        Date.now() - cache.cacheTime.metaOcupacao < CACHE_DURATION) {
      return cache.metaOcupacao
    }
    
    const response = await metaOcupacaoAPI.get()
    const valor = response.valor || 100
    cache.metaOcupacao = valor
    cache.cacheTime.metaOcupacao = Date.now()
    return valor
  } catch (error) {
    console.error('Erro ao buscar meta de ocupação:', error)
    return 100
  }
}

export const setMetaOcupacao = async (meta) => {
  try {
    clearCache('metaOcupacao')
    const response = await metaOcupacaoAPI.set(meta)
    return response.valor
  } catch (error) {
    console.error('Erro ao atualizar meta de ocupação:', error)
    throw error
  }
}

// ========== FUNÇÕES AUXILIARES (mantidas síncronas para compatibilidade) ==========
export const getReservasPorMes = async (mes, ano) => {
  const reservas = await getReservas()
  return reservas.filter(r => {
    const dataReserva = new Date(r.dataReserva)
    return dataReserva.getMonth() === mes && dataReserva.getFullYear() === ano
  })
}

export const getReservasPorQuarto = async (quartoId) => {
  const reservas = await getReservas()
  return reservas.filter(r => r.quartoId === quartoId)
}

export const getReservasPorData = async (data) => {
  const reservas = await getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.filter(r => {
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

export const isDataOcupada = async (data, quartoId) => {
  const reservas = await getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.some(r => {
    if (r.quartoId !== quartoId || r.status === 'cancelada') return false
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

// ========== FUNÇÕES DE FORMATAÇÃO (síncronas) ==========
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

/**
 * Verifica se um quarto é um chalé (não é dormitório)
 * @param {string} quartoId - ID do quarto
 * @returns {boolean} - true se for chalé, false caso contrário
 */
export const isChale = (quartoId) => {
  const chales = ['imperial', 'luxo', 'premium', 'exclusiva']
  return chales.includes(quartoId)
}

/**
 * Calcula o valor total da diária para aluguel de chalés
 * Cada chalé custa R$ 300 por diária, independentemente da quantidade de pessoas
 * @param {number} quantidadeChales - Número de chalés desejados
 * @returns {number} - Valor total da diária (quantidade_de_chales * 300)
 */
export const calcularPrecoChales = (quantidadeChales) => {
  if (!quantidadeChales || quantidadeChales <= 0) return 0
  const PRECO_POR_CHALE = 300
  return quantidadeChales * PRECO_POR_CHALE
}

/**
 * Verifica se um quarto é um dormitório
 * @param {string} quartoId - ID do quarto
 * @returns {boolean} - true se for dormitório, false caso contrário
 */
export const isDormitorio = (quartoId) => {
  const dormitorios = ['chale05', 'chale08']
  return dormitorios.includes(quartoId)
}

/**
 * Calcula o valor total da diária para aluguel de dormitórios
 * Cada dormitório custa R$ 600 por diária, independentemente da quantidade de pessoas
 * @param {number} quantidadeDormitorios - Número de dormitórios desejados
 * @returns {number} - Valor total da diária (quantidade_de_dormitorios * 600)
 */
export const calcularPrecoDormitorios = (quantidadeDormitorios) => {
  if (!quantidadeDormitorios || quantidadeDormitorios <= 0) return 0
  const PRECO_POR_DORMITORIO = 600
  return quantidadeDormitorios * PRECO_POR_DORMITORIO
}

// ========== FUNÇÕES DE SESSÃO (localStorage - não migrar) ==========
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

// ========== CARRINHO (localStorage - temporário) ==========
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
