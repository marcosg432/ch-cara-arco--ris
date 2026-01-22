import express from 'express';
import Funcionario from '../models/Funcionario.js';

const router = express.Router();

// GET todos os funcionários
router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.find({});
    funcionarios.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST criar funcionário
router.post('/', async (req, res) => {
  try {
    const funcionarioData = { ...req.body };
    delete funcionarioData._id;
    const funcionario = await Funcionario.insert(funcionarioData);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT atualizar funcionário
router.put('/:id', async (req, res) => {
  try {
    await Funcionario.update({ _id: req.params.id }, req.body);
    const funcionario = await Funcionario.findOne({ _id: req.params.id });
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE deletar funcionário
router.delete('/:id', async (req, res) => {
  try {
    const numRemoved = await Funcionario.remove({ _id: req.params.id }, {});
    if (numRemoved === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
