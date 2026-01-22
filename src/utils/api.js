// Cliente API para comunicação com o backend
// Em desenvolvimento, usar o proxy do Vite (/api)
// Em produção, usar a URL completa
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Em desenvolvimento, usar proxy do Vite
  return import.meta.env.DEV ? '/api' : 'http://localhost:3009/api';
};

// Função auxiliar para fazer requisições
async function request(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  // Garantir que endpoint começa com /
  const endpointPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${endpointPath}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Verificar se a resposta é JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `Erro HTTP ${response.status}`);
    }
    
    if (!response.ok) {
      throw new Error(data.error || data.message || `Erro HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    console.error('URL:', url);
    console.error('Config:', config);
    
    // Se for um erro de rede, verificar se o servidor está rodando
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o servidor está rodando na porta 3008.');
    }
    
    // Se for um erro HTTP, incluir mais detalhes
    if (error.message.includes('HTTP')) {
      const errorMsg = error.message || 'Erro ao processar requisição';
      throw new Error(errorMsg);
    }
    
    throw error;
  }
}

// API de Reservas
export const reservasAPI = {
  getAll: () => request('/reservas'),
  getById: (id) => request(`/reservas/${id}`),
  create: (reserva) => request('/reservas', { method: 'POST', body: reserva }),
  update: (id, updates) => request(`/reservas/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/reservas/${id}`, { method: 'DELETE' }),
};

// API de Quartos
export const quartosAPI = {
  getAll: () => request('/quartos'),
  getById: (id) => request(`/quartos/${id}`),
  create: (quarto) => request('/quartos', { method: 'POST', body: quarto }),
  update: (id, updates) => request(`/quartos/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/quartos/${id}`, { method: 'DELETE' }),
};

// API de Despesas
export const despesasAPI = {
  getAll: () => request('/despesas'),
  create: (despesa) => request('/despesas', { method: 'POST', body: despesa }),
  update: (id, updates) => request(`/despesas/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/despesas/${id}`, { method: 'DELETE' }),
};

// Exportar funções individuais para compatibilidade
export const getDespesas = () => despesasAPI.getAll();
export const createDespesa = (despesa) => despesasAPI.create(despesa);
export const updateDespesa = (id, updates) => despesasAPI.update(id, updates);
export const deleteDespesa = (id) => despesasAPI.delete(id);

// API de Funcionários
export const funcionariosAPI = {
  getAll: () => request('/funcionarios'),
  create: (funcionario) => request('/funcionarios', { method: 'POST', body: funcionario }),
  update: (id, updates) => request(`/funcionarios/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/funcionarios/${id}`, { method: 'DELETE' }),
};

// API de Meta de Ocupação
export const metaOcupacaoAPI = {
  get: () => request('/meta-ocupacao'),
  set: (valor) => request('/meta-ocupacao', { method: 'PUT', body: { valor } }),
};

// Health check
export const healthCheck = () => request('/health');

