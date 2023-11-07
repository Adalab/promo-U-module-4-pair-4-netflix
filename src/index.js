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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'netflix',
  });

  connection.connect();
  return connection;
}

//iniciar el servidor
const port = 4001;
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

//endpoint para todas las películas
server.get('/movies', async (req, res) => {
  const genreFilterParam = req.query.genre;
  const sortParam = req.query.sort;
  const conn = await getConnection();
  let queryMovies = '';
  if (!genreFilterParam) {
    queryMovies = `SELECT * FROM movies order by title ${sortParam || ''}`;
  } else {
    queryMovies = `SELECT * FROM movies WHERE genre="${genreFilterParam}" order by title ${
      sortParam || ''
    }`;
  }
  const [results, fields] = await conn.query(queryMovies);
  console.log(fields);
  console.log(results);
  //4.Cerrar la conexión
  conn.end();
  res.json({
    success: true,
    movies: results,
  });
});

server.get('/movies/genre', async (req, res) => {
  //1. Obtener los datos de la base de datos
  const conn = await getConnection();
  //2. Consulta que quiero a la bd: obtener todas las alumnas
  const queryMoviesByGenre = 'SELECT genre FROM movies';
  //3. Ejecutar la consulta
  const [results, fields] = await conn.query(queryMoviesByGenre);
  console.log(fields);
  console.log(results);
  //4.Cerrar la conexión
  conn.end();
  res.json({
    success: true,
    movies: results,
  });
});

server.get('/movies/:movieId', async (req, res) => {
  console.log(req.params.movieId);
  const queryMovies = `SELECT * FROM movies WHERE idMovies=${req.params.movieId};`;
  const conn = await getConnection();
  const [results] = await conn.query(queryMovies, [req.params.movieId]);
  res.render('movie', {
    movie: results[0],
  });
});

const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));
