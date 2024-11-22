import express from 'express';
import { insertDivida, getDividas, getDividasById, deleteDividaById } from '../DB/db.mjs';

const router = express.Router();

// Rota para inserir uma nova dívida
router.post('/', async (req, res) => {
  try {
    const novaDivida = req.body;
    const id = await insertDivida(novaDivida);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar todas as dívidas
router.get('/', async (req, res) => {
  try {
    const dividas = await getDividas();
    res.status(200).json(dividas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar uma dívida específica por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const divida = await getDividasById(id);
    if (divida) {
      res.status(200).json(divida);
    } else {
      res.status(404).json({ error: 'Dívida não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar uma dívida específica por ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteDividaById(id);
    if (result.changes > 0) {
      res.status(200).json({ message: `Dívida com ID ${id} deletada` });
    } else {
      res.status(404).json({ error: 'Dívida não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;