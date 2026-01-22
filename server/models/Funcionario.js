import { db } from '../config/database.js';

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export default {
  find: async (query = {}) => {
    await db.read();
    const funcionarios = db.data.funcionarios || [];
    return funcionarios.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  },
  
  findOne: async (query) => {
    await db.read();
    const funcionarios = db.data.funcionarios || [];
    
    if (query._id) {
      return funcionarios.find(f => f._id === query._id) || null;
    }
    if (query.email) {
      return funcionarios.find(f => f.email === query.email) || null;
    }
    return null;
  },
  
  insert: async (doc) => {
    await db.read();
    const _id = doc._id || generateId();
    const funcionario = {
      ...doc,
      _id
    };
    
    if (!db.data.funcionarios) db.data.funcionarios = [];
    db.data.funcionarios.push(funcionario);
    await db.write();
    return funcionario;
  },
  
  update: async (query, update, options = {}) => {
    await db.read();
    if (!db.data.funcionarios) db.data.funcionarios = [];
    
    const updates = update.$set || update;
    const index = db.data.funcionarios.findIndex(f => f._id === query._id);
    if (index === -1) return null;
    
    db.data.funcionarios[index] = {
      ...db.data.funcionarios[index],
      ...updates
    };
    
    await db.write();
    return db.data.funcionarios[index];
  },
  
  remove: async (query, options = {}) => {
    await db.read();
    if (!db.data.funcionarios) db.data.funcionarios = [];
    
    const index = db.data.funcionarios.findIndex(f => f._id === query._id);
    if (index === -1) return 0;
    
    db.data.funcionarios.splice(index, 1);
    await db.write();
    return 1;
  },
  
  count: async (query = {}) => {
    await db.read();
    return (db.data.funcionarios || []).length;
  }
};
