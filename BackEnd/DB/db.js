const sqlite3 = require("sqlite3").verbose();

// Conectar ao banco de dados SQLite
function conection() {
  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado ao banco de dados SQLite.");
  });
  return db;
}

// Fechar a conexão com o banco de dados
function closeConnection(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Fechada a conexão com o banco de dados SQLite.");
  });
}

export function createDB() {
  const db = conection();
  // Criar tabela dividas com todas as informações
  db.run(`CREATE TABLE IF NOT EXISTS dividas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_cliente TEXT NOT NULL,
    cpf_cliente TEXT NOT NULL,
    email_cliente TEXT NOT NULL,
    cep TEXT,
    numero TEXT,
    complemento TEXT,
    valor REAL NOT NULL,
    descricao TEXT NOT NULL,
    situacao TEXT NOT NULL,
    numero_processo TEXT,
    arquivo_comprovante TEXT
  )`);
  closeConnection(db);
}
