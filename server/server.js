import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Inicializar banco de dados
import { initDatabase } from './config/database.js';

// Importar rotas
import reservasRoutes from './routes/reservas.js';
import quartosRoutes from './routes/quartos.js';
import despesasRoutes from './routes/despesas.js';
import funcionariosRoutes from './routes/funcionarios.js';
import metaOcupacaoRoutes from './routes/metaOcupacao.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3005'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging para debug
app.use((req, res, next) => {
  if (req.path.startsWith('/api/reservas')) {
    console.log(`📥 ${req.method} ${req.path}`);
  }
  next();
});

// Rotas
app.use('/api/reservas', reservasRoutes);
app.use('/api/quartos', quartosRoutes);
app.use('/api/despesas', despesasRoutes);
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/meta-ocupacao', metaOcupacaoRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Chácara Arco Íris está funcionando!' });
});

// Middleware de tratamento de erros (deve ser o último)
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: err.message || 'Erro interno do servidor' });
});

// Iniciar servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}/api`);
    console.log(`💾 Banco de dados embutido (LowDB) ativo!`);
  });
}).catch(error => {
  console.error('❌ Erro ao inicializar banco de dados:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});
