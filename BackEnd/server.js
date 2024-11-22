import express from 'express';
import { createDB } from './DB/db.mjs';
import dividasRouter from './API/Dividas.js';

const app = express();
const port = 3000;

app.use(express.json());

// Inicializar o banco de dados
createDB();

// Usar o router para as rotas de dívidas
app.use('/dividas', dividasRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});