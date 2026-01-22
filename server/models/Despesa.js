import { db, ensureDbInitialized } from '../config/database.js';

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export default {
  find: async (query = {}) => {
    await ensureDbInitialized();
    // Sempre ler novamente para ter dados atualizados
    await db.read();
    const despesas = Array.isArray(db.data?.despesas) ? [...db.data.despesas] : [];
    return despesas.sort((a, b) => (a.categoria || '').localeCompare(b.categoria || ''));
  },
  
  findOne: async (query) => {
    await ensureDbInitialized();
    await db.read();
    const despesas = Array.isArray(db.data?.despesas) ? db.data.despesas : [];
    
    if (query._id) {
      return despesas.find(d => d._id === query._id) || null;
    }
    return null;
  },
  
  insert: async (doc) => {
    await ensureDbInitialized();
    await db.read();
    const _id = doc._id || generateId();
    const despesa = {
      ...doc,
      _id
    };
    
    if (!db.data) db.data = { despesas: [], reservas: [], quartos: [], funcionarios: [], usuarios: [], metaOcupacao: { valor: 100 } };
    if (!db.data.despesas) db.data.despesas = [];
    db.data.despesas.push(despesa);
    await db.write();
    return despesa;
  },
  
  update: async (query, update, options = {}) => {
    await ensureDbInitialized();
    await db.read();
    if (!db.data) db.data = { despesas: [] };
    if (!db.data.despesas) db.data.despesas = [];
    
    const updates = update.$set || update;
    const index = db.data.despesas.findIndex(d => d._id === query._id);
    if (index === -1) return null;
    
    db.data.despesas[index] = {
      ...db.data.despesas[index],
      ...updates
    };
    
    await db.write();
    return db.data.despesas[index];
  },
  
  remove: async (query, options = {}) => {
    await ensureDbInitialized();
    await db.read();
    if (!db.data) db.data = { despesas: [] };
    if (!db.data.despesas) db.data.despesas = [];
    
    const index = db.data.despesas.findIndex(d => d._id === query._id);
    if (index === -1) return 0;
    
    db.data.despesas.splice(index, 1);
    await db.write();
    return 1;
  },
  
  count: async (query = {}) => {
    await ensureDbInitialized();
    await db.read();
    return Array.isArray(db.data?.despesas) ? db.data.despesas.length : 0;
  }
};
