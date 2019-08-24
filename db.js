const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.PG_CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
  ssl: true
});

pool.connect();

// const pool = new Pool(); //uses .env variables

const tableStr = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    age integer NOT NULL
    )`;

const createTable = () => {
  pool.query(tableStr);
};

createTable();

const getUsers = () => {
  return pool.query('SELECT * FROM users ORDER BY id ASC');
};

const getUserById = id => {
  return pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

const createUser = (req, res, callback) => {
  const { username, firstname, lastname, email, age } = req.body;
  console.log(`${username},${firstname}, ${lastname}, ${age}, ${email}`);

  let userAge = parseInt(age, 10);
  if (isNaN(userAge)) {
    userAge = 0;
  }
  pool.query(
    'INSERT INTO users (username, firstname, lastname, email, age) VALUES ($1, $2, $3 ,$4, $5) RETURNING *',
    [username, firstname, lastname, email, age],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(`id: ${JSON.stringify(results.rows[0])}`); //id: {"id":9,"name":"Peter","age":25,"email":"pjohnson@mtech.org"}
      res.status(201) /*.send(`User added with ID: ${results.rows[0].id}  `)*/;
      callback();
    }
  );
};

const updateUser = (
  { id, username, firstname, lastname, email, age },
  callback
) => {
  pool.query(
    'UPDATE users SET username = $1, firstname = $2, lastname = $3, email = $4, age = $5 WHERE id = $6',
    [username, firstname, lastname, email, age, id],
    err => {
      if (err) throw err;
      callback();
    }
  );
};

const deleteUser = (id, callback) => {
  pool.query('DELETE FROM users WHERE id = $1', [id], err => {
    if (err) throw err;
    callback();
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createTable,
  query: (text, params) => pool.query(text, params)
};
