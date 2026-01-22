import express from 'express';
import Quarto from '../models/Quarto.js';

const router = express.Router();

// GET todos os quartos
router.get('/', async (req, res) => {
  try {
    const quartos = await Quarto.find({});
    quartos.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
    res.json(quartos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET quarto por ID
router.get('/:id', async (req, res) => {
  try {
    const quarto = await Quarto.findOne({ id: req.params.id });
    if (!quarto) {
      return res.status(404).json({ error: 'Quarto não encontrado' });
    }
    res.json(quarto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST criar/atualizar quarto
router.post('/', async (req, res) => {
  try {
    const existing = await Quarto.findOne({ id: req.body.id });
    if (existing) {
      await Quarto.update({ id: req.body.id }, req.body);
      const quarto = await Quarto.findOne({ id: req.body.id });
      res.json(quarto);
    } else {
      const quartoData = { ...req.body };
      delete quartoData._id;
      const quarto = await Quarto.insert(quartoData);
      res.status(201).json(quarto);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT atualizar quarto
router.put('/:id', async (req, res) => {
  try {
    await Quarto.update({ id: req.params.id }, req.body);
    const quarto = await Quarto.findOne({ id: req.params.id });
    if (!quarto) {
      return res.status(404).json({ error: 'Quarto não encontrado' });
    }
    res.json(quarto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE deletar quarto
router.delete('/:id', async (req, res) => {
  try {
    const numRemoved = await Quarto.remove({ id: req.params.id }, {});
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Quarto não encontrado' });
    }
    res.json({ message: 'Quarto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
