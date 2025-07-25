const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do PostgreSQL
const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',         
  database: 'dados',          
  password: 'asd',      
  port: 5432,                
});

// Rota para exibir as pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM pessoas');
    res.send(`
      <h1>Lista de Pessoas</h1>
      <ul>
        ${rows.map(pessoa => `
          <li>
            ID: ${pessoa.id} | 
            Nome: ${pessoa.pessoa} | 
            Ano: ${pessoa.ano}
          </li>
        `).join('')}

      </ul>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar pessoas');
  }
});

// Rota principal (hello world)
app.get('/', (req, res) => {
  res.send('Hello World! <a href="/pessoas">Ver pessoas</a>');
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
