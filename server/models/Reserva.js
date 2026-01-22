import { db, ensureDbInitialized } from '../config/database.js';

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export default {
  find: async (query = {}) => {
    try {
      await ensureDbInitialized();
      
      // Garantir que temos dados atualizados
      if (!db.data || !db.data.reservas) {
        await db.read();
        if (!db.data) {
          db.data = { reservas: [], quartos: [], despesas: [], funcionarios: [], usuarios: [], metaOcupacao: { valor: 100 } };
        }
        if (!db.data.reservas) {
          db.data.reservas = [];
        }
      }
      
      let reservas = Array.isArray(db.data.reservas) ? [...db.data.reservas] : [];
      
      // Log para debug
      console.log(`📊 Total de reservas encontradas: ${reservas.length}`);
      
      if (query._id) {
        reservas = reservas.filter(r => r && r._id === query._id);
      }
      if (query.quartoId) {
        reservas = reservas.filter(r => r && r.quartoId === query.quartoId);
      }
      if (query.status) {
        reservas = reservas.filter(r => r && r.status === query.status);
      }
      
      // Filtrar reservas inválidas
      reservas = reservas.filter(r => r !== null && r !== undefined);
      
      // Ordenar com tratamento de erro
      try {
        return reservas.sort((a, b) => {
          try {
            const dateA = a.dataReserva ? new Date(a.dataReserva) : (a._id ? new Date(parseInt(a._id)) : new Date(0));
            const dateB = b.dataReserva ? new Date(b.dataReserva) : (b._id ? new Date(parseInt(b._id)) : new Date(0));
            return dateB - dateA;
          } catch (e) {
            return 0;
          }
        });
      } catch (e) {
        console.warn('Erro ao ordenar reservas:', e);
        return reservas;
      }
    } catch (error) {
      console.error('Erro no modelo Reserva.find:', error);
      console.error('Stack:', error.stack);
      // Retornar array vazio em caso de erro para não quebrar a aplicação
      return [];
    }
  },
  
  findOne: async (query) => {
    try {
      await ensureDbInitialized();
      const reservas = db.data.reservas || [];
      
      if (query._id) {
        return reservas.find(r => r && r._id === query._id) || null;
      }
      return null;
    } catch (error) {
      console.error('Erro no modelo Reserva.findOne:', error);
      return null;
    }
  },
  
  insert: async (doc) => {
    try {
      await ensureDbInitialized();
      
      // Garantir que db.data existe
      if (!db.data) {
        db.data = { reservas: [], quartos: [], despesas: [], funcionarios: [], usuarios: [], metaOcupacao: { valor: 100 } };
      }
      if (!db.data.reservas) {
        db.data.reservas = [];
      }
      
      const _id = doc._id || generateId();
      const reserva = {
        ...doc,
        _id,
        dataReserva: doc.dataReserva || new Date().toISOString()
      };
      
      // Remover campos undefined/null
      Object.keys(reserva).forEach(key => {
        if (reserva[key] === undefined || reserva[key] === null) {
          delete reserva[key];
        }
      });
      
      db.data.reservas.push(reserva);
      await db.write();
      
      return reserva;
    } catch (error) {
      console.error('❌ Erro no modelo Reserva.insert:', error);
      console.error('Stack:', error.stack);
      throw error;
    }
  },
  
  update: async (query, update, options = {}) => {
    await ensureDbInitialized();
    if (!db.data.reservas) db.data.reservas = [];
    
    const index = db.data.reservas.findIndex(r => r._id === query._id);
    if (index === -1) return null;
    
    const updates = update.$set || update;
    db.data.reservas[index] = {
      ...db.data.reservas[index],
      ...updates
    };
    
    await db.write();
    return db.data.reservas[index];
  },
  
  remove: async (query, options = {}) => {
    await ensureDbInitialized();
    if (!db.data.reservas) db.data.reservas = [];
    
    const index = db.data.reservas.findIndex(r => r._id === query._id);
    if (index === -1) return 0;
    
    db.data.reservas.splice(index, 1);
    await db.write();
    return 1;
  },
  
  count: async (query = {}) => {
    await ensureDbInitialized();
    let reservas = db.data.reservas || [];
    
    if (query.status) {
      reservas = reservas.filter(r => r.status === query.status);
    }
    
    return reservas.length;
  }
};
