import express from 'express';
import MetaOcupacao from '../models/MetaOcupacao.js';

const router = express.Router();

// GET meta de ocupação
router.get('/', async (req, res) => {
  try {
    const valor = await MetaOcupacao.getMeta();
    res.json({ valor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT atualizar meta de ocupação
router.put('/', async (req, res) => {
  try {
    const valor = req.body.valor || 100;
    const meta = await MetaOcupacao.setMeta(valor);
    res.json({ valor: meta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
