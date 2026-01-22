import Quarto from '../models/Quarto.js';
import Despesa from '../models/Despesa.js';
import '../config/database.js';

const quartosPadrao = [
  {
    id: 'imperial',
    nome: 'Chále 03',
    preco: 300,
    descricao: 'Uma suíte elegante e aconchegante, pensada para quem busca conforto e tranquilidade.'
  },
  {
    id: 'luxo',
    nome: 'Chále 04',
    preco: 300,
    descricao: 'Espaçosa e confortável, oferece uma experiência premium.'
  },
  {
    id: 'premium',
    nome: 'Chále 06',
    preco: 300,
    descricao: 'A opção mais exclusiva do hotel, perfeita para quem deseja viver momentos especiais.'
  },
  {
    id: 'exclusiva',
    nome: 'Chále 07',
    preco: 300,
    descricao: 'Combina elegância, conforto e privacidade em um só espaço.'
  },
  {
    id: 'chale05',
    nome: 'Dormitório 08 feminino',
    preco: 600,
    descricao: ''
  },
  {
    id: 'chale08',
    nome: 'Dormitório 09 masculino',
    preco: 600,
    descricao: ''
  }
];

const despesasPadrao = [
  { categoria: 'Funcionarios', quantidade: 7, total: 390.00 },
  { categoria: 'Limpeza', quantidade: null, total: 1140.00 },
  { categoria: 'Manutenção', quantidade: null, total: 420.24 },
  { categoria: 'Gasto a parte', quantidade: null, total: 390.00 },
  { categoria: 'Despesas fixa', quantidade: null, total: 1140.00 }
];

async function initDatabase() {
  try {
    console.log('📦 Inicializando banco de dados embutido...');
    
    // Inicializar quartos
    console.log('🏠 Criando quartos padrão...');
    for (const quarto of quartosPadrao) {
      const existing = await Quarto.findOne({ id: quarto.id });
      if (!existing) {
        await Quarto.insert(quarto);
      } else {
        await Quarto.update({ id: quarto.id }, quarto);
      }
    }
    console.log(`✅ ${quartosPadrao.length} quartos criados/atualizados`);
    
    // Inicializar despesas
    console.log('💰 Criando/atualizando despesas padrão...');
    const despesasExistentes = await Despesa.find({});
    for (const despesa of despesasPadrao) {
      const existe = despesasExistentes.find(d => d.categoria === despesa.categoria);
      if (!existe) {
        await Despesa.insert(despesa);
      } else {
        await Despesa.update({ _id: existe._id }, despesa);
      }
    }
    console.log(`✅ Despesas padrão criadas/atualizadas`);
    
    console.log('✅ Banco de dados inicializado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
}

initDatabase();
