const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '25mb' }));

// Instalar y configurar EJS
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4001;

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_admin_netflix',
    password: '$?N7?M!TAgfZyRB',
    database: 'freedb_freedb_netflix',
  });

  connection.connect();
  return connection;
}

//iniciar el servidor
const port = 4001;
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

server.get('/movies', async (req, res) => {
  // (req, res): Require: para cuando envíen datos | Response: enviar desde el server datos al front
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  let queryMovies = 'SELECT * FROM movies';

  // obtener los datos de la bbdd
  // 1.- obtener la conexión
  const conn = await getConnection();
  // 2.- consulta de la bbdd: obtener todas las alumnas
  if (genreFilterParam === '') {
    queryMovies = 'SELECT * FROM movies';
  } else if (genreFilterParam === 'Biográfico') {
    queryMovies = "SELECT * FROM movies WHERE genre='Biográfico'";
  } else if (genreFilterParam === 'Crimen') {
    queryMovies = "SELECT * FROM movies WHERE genre='Crimen'";
  } else if (genreFilterParam === 'Comedia') {
    queryMovies = "SELECT * FROM movies WHERE genre='Comedia'";
  }

  if (sortFilterParam === 'asc') {
    queryMovies = 'SELECT * FROM movies order by title asc';
  } else if (sortFilterParam === 'desc') {
    queryMovies = 'SELECT * FROM movies order by title desc';
  }

  // 3.- ejecutar la consulta
  const [results] = await conn.query(queryMovies);
  // [results] <- con [] porque de todo lo que trae, dame solo los resultados
  console.log(results);
  /* res.json(results); */
  console.log('genre: ' + req.query.genre);
  conn.end();
  res.json({
    success: true,
    movies: results,
  });
});

//1. Consigue el id de la película que se va a renderizar
server.get('/movie/:idMovies', async (req, res) => {
  console.log('req.params.idMovies', req.params.idMovies);
  const queryMovie = 'SELECT * FROM movies WHERE idMovies=?';
  const conn = await getConnection();
  const [results] = await conn.query(queryMovie, [req.params.idMovies]);
  res.render('movieDetail', { movie: results[0] });
  conn.end();
  //2. Obtén la película
  const foundMovie = results[0];
  console.log('foundMovie', foundMovie);
  res.render('movieDetail', foundMovie);
});

//4.8.2 Login
server.post('/login', async (req, res) => {
  //usuario y contraseña
  const email = req.body.email;
  const password = req.body.password;
  //consulta mysql
  const queryLogin = 'SELECT * FROM users WHERE idUser=?';
  const conn = await getConnection();
  const [users] = await conn.query(queryLogin, [email, password]);
  const user = users[0];
  console.log(email, password);
  conn.end();
  if (user === null) {
    res.render({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  } else {
    res.render({
      success: true,
      userId: 'id_de_la_usuaria_encontrada',
    });
  }
});

//4.8.1. Registro de nuevas usuarias
server.post('/sign-up', async (req, res) => {
  //usuario y contraseña
  const email = req.body.email;
  const password = req.body.password;
  //consulta mysql
  const sql = 'INSERT INTO users (email, password) VALUES(?,?)';
  const conn = await getConnection();
  const [users] = await conn.query(sql, [email, password]);
  const user = users[0];
  conn.end();

  res.json({
    success: true,
    userId: 'nuevo id añadido',
  });
});

//servidor de estáticos
const pathServerStatic = './public_html';
server.use(express.static(pathServerStatic));
