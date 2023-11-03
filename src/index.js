const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'serverPort',
    user: '',
    password: '',
    database: 'netflix',
  });

  connection.connect();
  return connection;
}

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


// const staticServerPathWeb = './src/public-react';
// server.use(express.static(staticServerPathWeb));

server.get('/movies', async (req, res) =>{
    try {
      const conn = await getConnection();
      const queryMovies = 'SELECT * FROM movies';
      const [results] = await conn.query(queryMovies);
      conn.end();
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los datos de las peliculas.' });
    }
  });