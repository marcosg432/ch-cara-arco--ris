import { db } from '../config/database.js';

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

export default {
  find: async (query = {}) => {
    await db.read();
    const usuarios = db.data.usuarios || [];
    return usuarios.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  },
  
  findOne: async (query) => {
    await db.read();
    const usuarios = db.data.usuarios || [];
    
    if (query._id) {
      return usuarios.find(u => u._id === query._id) || null;
    }
    if (query.email) {
      return usuarios.find(u => u.email === query.email) || null;
    }
    return null;
  },
  
  insert: async (doc) => {
    await db.read();
    const _id = doc._id || generateId();
    const usuario = {
      ...doc,
      _id
    };
    
    if (!db.data.usuarios) db.data.usuarios = [];
    db.data.usuarios.push(usuario);
    await db.write();
    return usuario;
  },
  
  update: async (query, update, options = {}) => {
    await db.read();
    if (!db.data.usuarios) db.data.usuarios = [];
    
    const updates = update.$set || update;
    const index = db.data.usuarios.findIndex(u => u._id === query._id);
    if (index === -1) return null;
    
    db.data.usuarios[index] = {
      ...db.data.usuarios[index],
      ...updates
    };
    
    await db.write();
    return db.data.usuarios[index];
  },
  
  remove: async (query, options = {}) => {
    await db.read();
    if (!db.data.usuarios) db.data.usuarios = [];
    
    const index = db.data.usuarios.findIndex(u => u._id === query._id);
    if (index === -1) return 0;
    
    db.data.usuarios.splice(index, 1);
    await db.write();
    return 1;
  },
  
  count: async (query = {}) => {
    await db.read();
    return (db.data.usuarios || []).length;
  }
};
