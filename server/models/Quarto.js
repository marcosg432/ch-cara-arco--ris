import { db, ensureDbInitialized } from '../config/database.js';

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export default {
  find: async (query = {}) => {
    await ensureDbInitialized();
    let quartos = db.data.quartos || [];
    
    if (query.id) {
      quartos = quartos.filter(q => q.id === query.id);
    }
    
    return quartos.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
  },
  
  findOne: async (query) => {
    await db.read();
    const quartos = db.data.quartos || [];
    
    if (query.id) {
      return quartos.find(q => q.id === query.id) || null;
    }
    if (query._id) {
      return quartos.find(q => q._id === query._id) || null;
    }
    return null;
  },
  
  insert: async (doc) => {
    await db.read();
    const _id = doc._id || generateId();
    const quarto = {
      ...doc,
      _id
    };
    
    if (!db.data.quartos) db.data.quartos = [];
    db.data.quartos.push(quarto);
    await db.write();
    return quarto;
  },
  
  update: async (query, update, options = {}) => {
    await db.read();
    if (!db.data.quartos) db.data.quartos = [];
    
    const updates = update.$set || update;
    let quarto = null;
    
    if (query.id) {
      const index = db.data.quartos.findIndex(q => q.id === query.id);
      if (index !== -1) {
        db.data.quartos[index] = { ...db.data.quartos[index], ...updates };
        quarto = db.data.quartos[index];
      }
    }
    
    if (quarto) await db.write();
    return quarto;
  },
  
  remove: async (query, options = {}) => {
    await db.read();
    if (!db.data.quartos) db.data.quartos = [];
    
    let index = -1;
    if (query.id) {
      index = db.data.quartos.findIndex(q => q.id === query.id);
    }
    
    if (index === -1) return 0;
    
    db.data.quartos.splice(index, 1);
    await db.write();
    return 1;
  },
  
  count: async (query = {}) => {
    await db.read();
    return (db.data.quartos || []).length;
  }
};
