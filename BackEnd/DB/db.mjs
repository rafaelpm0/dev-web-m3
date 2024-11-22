import sqlite3 from 'sqlite3';
sqlite3.verbose();

// Conectar ao banco de dados SQLite
function connect() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database.db', (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Conectado ao banco de dados SQLite.');
        resolve(db);
      }
    });
  });
}

// Fechar a conexão com o banco de dados
function closeConnection(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Fechada a conexão com o banco de dados SQLite.');
        resolve();
      }
    });
  });
}

async function createDB() {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS dividas (
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
      )`,
      async (err) => {
        await closeConnection(db);
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function insertDivida(divida) {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO dividas (nome_cliente, cpf_cliente, email_cliente, cep, numero, complemento, valor, descricao, situacao, numero_processo, arquivo_comprovante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        divida.nome_cliente,
        divida.cpf_cliente,
        divida.email_cliente,
        divida.cep,
        divida.numero,
        divida.complemento,
        divida.valor,
        divida.descricao,
        divida.situacao,
        divida.numero_processo,
        divida.arquivo_comprovante,
      ],
      async function (err) {
        await closeConnection(db);
        if (err) {
          reject(err);
        } else {
          console.log(`Nova divida adicionada com o id ${this.lastID}`);
          resolve(this.lastID);
        }
      }
    );
  });
}

async function getDividas() {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM dividas`, [], async (err, rows) => {
      await closeConnection(db);
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getDividasById(id) {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM dividas WHERE id = ?`, [id], async (err, row) => {
      await closeConnection(db);
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function deleteDividaById(id) {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM dividas WHERE id = ?`, [id], async function (err) {
      await closeConnection(db);
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
}

export { createDB, insertDivida, getDividas, getDividasById, deleteDividaById };