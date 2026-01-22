import { db } from '../config/database.js';

const getMeta = async () => {
  await db.read();
  return db.data.metaOcupacao?.valor || 100;
};

const setMeta = async (valor) => {
  await db.read();
  if (!db.data.metaOcupacao) {
    db.data.metaOcupacao = { valor: 100 };
  }
  db.data.metaOcupacao.valor = valor;
  await db.write();
  return valor;
};

export default {
  getMeta,
  setMeta
};
