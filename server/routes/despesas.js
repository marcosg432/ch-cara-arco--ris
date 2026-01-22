import express from 'express';
import Despesa from '../models/Despesa.js';

const router = express.Router();

// GET todas as despesas
router.get('/', async (req, res) => {
  try {
    const despesas = await Despesa.find({});
    despesas.sort((a, b) => (a.categoria || '').localeCompare(b.categoria || ''));
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST criar despesa
router.post('/', async (req, res) => {
  try {
    const despesaData = { ...req.body };
    delete despesaData._id;
    const despesa = await Despesa.insert(despesaData);
    res.status(201).json(despesa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT atualizar despesa
router.put('/:id', async (req, res) => {
  try {
    await Despesa.update({ _id: req.params.id }, req.body);
    const despesa = await Despesa.findOne({ _id: req.params.id });
    if (!despesa) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.json(despesa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE deletar despesa
router.delete('/:id', async (req, res) => {
  try {
    const numRemoved = await Despesa.remove({ _id: req.params.id }, {});
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.json({ message: 'Despesa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
