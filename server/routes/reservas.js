import express from 'express';
import Reserva from '../models/Reserva.js';

const router = express.Router();

// GET todas as reservas
router.get('/', async (req, res) => {
  try {
    // Sempre ler o banco novamente para ter dados atualizados
    const reservas = await Reserva.find({});
    
    // Formatar reservas de forma simples e robusta
    const reservasFormatadas = reservas.map(r => {
      try {
        const reserva = {};
        
        // Copiar apenas campos válidos
        for (const key in r) {
          if (r.hasOwnProperty(key)) {
            const value = r[key];
            // Pular funções e undefined
            if (value !== undefined && typeof value !== 'function') {
              reserva[key] = value;
            }
          }
        }
        
        // Converter idades
        if (reserva.idades) {
          if (typeof reserva.idades === 'string') {
            try {
              reserva.idades = reserva.idades.trim() === '[]' || reserva.idades.trim() === '' 
                ? [] 
                : JSON.parse(reserva.idades);
              if (!Array.isArray(reserva.idades)) reserva.idades = [];
            } catch {
              reserva.idades = [];
            }
          } else if (!Array.isArray(reserva.idades)) {
            reserva.idades = [];
          }
        } else {
          reserva.idades = [];
        }
        
        // Converter temCriancas
        reserva.temCriancas = reserva.temCriancas === 1 || reserva.temCriancas === true || reserva.temCriancas === 'true';
        
        // Remover campos null
        Object.keys(reserva).forEach(key => {
          if (reserva[key] === null) {
            delete reserva[key];
          }
        });
        
        return reserva;
      } catch (e) {
        console.error('Erro ao formatar reserva:', e, r);
        // Retornar objeto mínimo válido
        return {
          _id: r._id || 'unknown',
          nome: r.nome || 'Erro',
          idades: [],
          temCriancas: false
        };
      }
    });
    
    // Ordenar por data
    reservasFormatadas.sort((a, b) => {
      try {
        const dateA = new Date(a.dataReserva || a._id || 0);
        const dateB = new Date(b.dataReserva || b._id || 0);
        return dateB - dateA;
      } catch {
        return 0;
      }
    });
    
    res.json(reservasFormatadas);
  } catch (error) {
    console.error('❌ Erro ao buscar reservas:', error);
    console.error('Stack:', error.stack);
    console.error('Tipo do erro:', error.constructor.name);
    console.error('Mensagem:', error.message);
    
    // Retornar array vazio em caso de erro para não quebrar o frontend
    try {
      res.status(500).json({ 
        error: error.message || 'Erro interno do servidor',
        details: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      });
    } catch (jsonError) {
      console.error('❌ Erro ao enviar resposta de erro:', jsonError);
      // Se não conseguir enviar JSON, tentar enviar array vazio
      try {
        res.status(200).json([]);
      } catch {
        res.status(500).send('Erro interno do servidor');
      }
    }
  }
});

// GET reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findOne({ _id: req.params.id });
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    // Converter idades de string JSON para array
    const reservaFormatada = {
      ...reserva,
      idades: reserva.idades ? (typeof reserva.idades === 'string' ? JSON.parse(reserva.idades) : reserva.idades) : [],
      temCriancas: reserva.temCriancas === 1 || reserva.temCriancas === true
    };
    res.json(reservaFormatada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST criar nova reserva
router.post('/', async (req, res) => {
  try {
    
    const codigo = `BR${Date.now()}`;
    const reserva = {
      ...req.body,
      codigo,
      dataReserva: new Date().toISOString()
    };
    
    // Garantir que todas as datas são strings
    if (reserva.checkIn) {
      try {
        reserva.checkIn = new Date(reserva.checkIn).toISOString();
      } catch (e) {
        console.error('Erro ao converter checkIn:', e);
        reserva.checkIn = new Date().toISOString();
      }
    }
    
    if (reserva.checkOut) {
      try {
        reserva.checkOut = new Date(reserva.checkOut).toISOString();
      } catch (e) {
        console.error('Erro ao converter checkOut:', e);
        reserva.checkOut = new Date().toISOString();
      }
    }
    
    // Garantir campos obrigatórios
    if (!reserva.nome) reserva.nome = 'Não informado';
    if (!reserva.email) reserva.email = 'não@informado.com';
    if (!reserva.telefone) reserva.telefone = '00000000000';
    if (!reserva.quartoId) reserva.quartoId = 'imperial';
    if (!reserva.quartoNome) reserva.quartoNome = 'Chále 03';
    if (!reserva.pessoas) reserva.pessoas = 1;
    if (reserva.temCriancas === undefined || reserva.temCriancas === null) reserva.temCriancas = false;
    if (!reserva.quantidadeCriancas) reserva.quantidadeCriancas = 0;
    if (!reserva.idades) reserva.idades = [];
    if (!reserva.preco) reserva.preco = 0;
    if (!reserva.total) reserva.total = 0;
    if (!reserva.noites) reserva.noites = 1;
    if (!reserva.status) reserva.status = 'pendente';
    if (!reserva.origem) reserva.origem = 'Site / whatsapp';
    
    // Tratar campos opcionais que podem ser null/undefined
    // Remover todos os campos null/undefined antes de processar
    Object.keys(reserva).forEach(key => {
      if (reserva[key] === null || reserva[key] === undefined) {
        delete reserva[key];
      }
    });
    
    // Converter idades para JSON string se for array
    if (Array.isArray(reserva.idades)) {
      reserva.idades = JSON.stringify(reserva.idades);
    } else if (typeof reserva.idades === 'string') {
      // Tentar parsear se for JSON válido, senão manter como está
      try {
        JSON.parse(reserva.idades);
        // É JSON válido, manter
      } catch {
        // Não é JSON válido, converter para array vazio
        reserva.idades = JSON.stringify([]);
      }
    } else {
      reserva.idades = JSON.stringify([]);
    }
    
    // Converter temCriancas para boolean
    reserva.temCriancas = reserva.temCriancas === true || reserva.temCriancas === 'true' || reserva.temCriancas === 1;
    
    // Garantir que pessoas, quantidadeCriancas, preco, total, noites são números
    reserva.pessoas = Number(reserva.pessoas) || 1;
    reserva.quantidadeCriancas = Number(reserva.quantidadeCriancas) || 0;
    reserva.preco = Number(reserva.preco) || 0;
    reserva.total = Number(reserva.total) || 0;
    reserva.noites = Number(reserva.noites) || 1;
    
    // Remover campos undefined/null antes de salvar
    Object.keys(reserva).forEach(key => {
      if (reserva[key] === undefined || reserva[key] === null) {
        // Manter null apenas para campos opcionais específicos
        if (key !== 'quantidadeChales' && key !== 'quantidadeDormitorios' && key !== 'metodoPagamento') {
          delete reserva[key];
        }
      }
    });
    
    const novaReserva = await Reserva.insert(reserva);
    
    // Converter idades e temCriancas para formato correto na resposta
    let idadesFormatadas = [];
    try {
      if (novaReserva.idades) {
        if (typeof novaReserva.idades === 'string') {
          try {
            idadesFormatadas = JSON.parse(novaReserva.idades);
          } catch (e) {
            console.warn('Erro ao parsear idades:', e);
            idadesFormatadas = [];
          }
        } else if (Array.isArray(novaReserva.idades)) {
          idadesFormatadas = novaReserva.idades;
        }
      }
    } catch (e) {
      console.warn('Erro ao formatar idades:', e);
      idadesFormatadas = [];
    }
    
    const reservaFormatada = {
      ...novaReserva,
      idades: idadesFormatadas,
      temCriancas: novaReserva.temCriancas === 1 || novaReserva.temCriancas === true || novaReserva.temCriancas === 'true'
    };
    
    res.status(201).json(reservaFormatada);
  } catch (error) {
    console.error('❌ Erro ao criar reserva:', error);
    console.error('Stack:', error.stack);
    console.error('Tipo do erro:', error.constructor.name);
    console.error('Mensagem:', error.message);
    console.error('Request body recebido:', req.body);
    
    // Retornar mensagem de erro mais detalhada em desenvolvimento
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : error.message || 'Erro interno do servidor';
    
    try {
      res.status(500).json({ 
        error: errorMessage,
        details: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      });
    } catch (jsonError) {
      console.error('❌ Erro ao enviar resposta de erro:', jsonError);
      res.status(500).send('Erro interno do servidor');
    }
  }
});

// PUT atualizar reserva
router.put('/:id', async (req, res) => {
  try {
    await Reserva.update({ _id: req.params.id }, req.body);
    const reserva = await Reserva.findOne({ _id: req.params.id });
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    // Converter idades e temCriancas para formato correto
    const reservaFormatada = {
      ...reserva,
      idades: reserva.idades ? (typeof reserva.idades === 'string' ? JSON.parse(reserva.idades) : reserva.idades) : [],
      temCriancas: reserva.temCriancas === 1 || reserva.temCriancas === true
    };
    res.json(reservaFormatada);
  } catch (error) {
    console.error('❌ Erro ao criar reserva:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Erro interno do servidor' });
  }
});

// DELETE deletar reserva
router.delete('/:id', async (req, res) => {
  try {
    const numRemoved = await Reserva.remove({ _id: req.params.id }, {});
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.json({ message: 'Reserva deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
