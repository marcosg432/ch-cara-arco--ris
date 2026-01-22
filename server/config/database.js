import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar diretório de dados se não existir
const dataDir = path.join(__dirname, '..', 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Arquivo do banco de dados
const dbFile = path.join(dataDir, 'db.json');

// Dados padrão
const defaultData = {
  reservas: [],
  quartos: [],
  despesas: [],
  funcionarios: [],
  usuarios: [],
  metaOcupacao: { valor: 100 }
};

// Criar arquivo se não existir
if (!existsSync(dbFile)) {
  writeFileSync(dbFile, JSON.stringify(defaultData, null, 2));
}

// Inicializar banco de dados
const adapter = new JSONFile(dbFile);
export const db = new Low(adapter, defaultData);

// Flag para garantir que o banco foi inicializado
let dbInitialized = false;
let initPromise = null;

// Função para inicializar o banco
export const initDatabase = async () => {
  if (dbInitialized) {
    return;
  }
  
  if (initPromise) {
    return initPromise;
  }
  
  initPromise = (async () => {
    try {
      // Verificar se o arquivo existe e está válido
      if (existsSync(dbFile)) {
        try {
          const fileContent = await import('fs/promises').then(fs => fs.readFile(dbFile, 'utf-8'));
          if (!fileContent || fileContent.trim() === '') {
            console.log('⚠️ Arquivo db.json está vazio, recriando...');
            await import('fs/promises').then(fs => fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2)));
          } else {
            // Tentar parsear para verificar se é JSON válido
            JSON.parse(fileContent);
          }
        } catch (parseError) {
          console.log('⚠️ Arquivo db.json está corrompido, recriando...');
          await import('fs/promises').then(fs => fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2)));
        }
      }
      
      await db.read();
      // Garantir que os dados padrão existam APENAS se o banco estiver vazio
      if (!db.data) {
        db.data = { ...defaultData };
        await db.write();
      } else {
        // Se já tem dados, apenas garantir que as propriedades existam sem sobrescrever
        if (!db.data.reservas) db.data.reservas = [];
        if (!db.data.quartos) db.data.quartos = [];
        if (!db.data.despesas) db.data.despesas = [];
        if (!db.data.funcionarios) db.data.funcionarios = [];
        if (!db.data.usuarios) db.data.usuarios = [];
        if (!db.data.metaOcupacao) db.data.metaOcupacao = { valor: 100 };
        // NÃO escrever aqui para não perder dados existentes
      }
      dbInitialized = true;
      console.log('✅ Banco de dados embutido (LowDB) inicializado!');
      console.log(`📁 Dados armazenados em: ${dbFile}`);
    } catch (error) {
      console.error('❌ Erro ao inicializar banco de dados:', error);
      // Tentar recriar o arquivo em caso de erro
      try {
        await import('fs/promises').then(fs => fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2)));
        console.log('✅ Arquivo db.json recriado com sucesso!');
        // Tentar novamente
        await db.read();
        db.data = { ...defaultData };
        await db.write();
        dbInitialized = true;
        console.log('✅ Banco de dados inicializado após recriação!');
      } catch (recoveryError) {
        console.error('❌ Erro ao recuperar banco de dados:', recoveryError);
        throw recoveryError;
      }
    }
  })();
  
  return initPromise;
};

// Função auxiliar para garantir que o banco está inicializado
export const ensureDbInitialized = async () => {
  try {
    if (!dbInitialized) {
      await initDatabase();
    }
    // Sempre ler para ter dados atualizados
    try {
      await db.read();
    } catch (readError) {
      console.error('Erro ao ler banco:', readError);
      // Se der erro ao ler, recriar o arquivo
      await import('fs/promises').then(fs => fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2)));
      await db.read();
    }
    // Garantir que db.data existe, mas não sobrescrever dados existentes
    if (!db.data) {
      db.data = { ...defaultData };
      await db.write();
    } else {
      // Apenas garantir que as propriedades existam
      if (!db.data.reservas) db.data.reservas = [];
      if (!db.data.quartos) db.data.quartos = [];
      if (!db.data.despesas) db.data.despesas = [];
      if (!db.data.funcionarios) db.data.funcionarios = [];
      if (!db.data.usuarios) db.data.usuarios = [];
      if (!db.data.metaOcupacao) db.data.metaOcupacao = { valor: 100 };
    }
  } catch (error) {
    console.error('Erro em ensureDbInitialized:', error);
    // Tentar recriar o arquivo
    try {
      await import('fs/promises').then(fs => fs.writeFile(dbFile, JSON.stringify(defaultData, null, 2)));
      await db.read();
      if (!db.data) {
        db.data = { ...defaultData };
        await db.write();
      }
    } catch (recoveryError) {
      console.error('Erro ao recuperar banco:', recoveryError);
      throw recoveryError;
    }
  }
};

// Inicializar imediatamente
initDatabase().catch(console.error);
