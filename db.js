const { Pool } = require('pg');
// const connectionString =
// 'postgres://eapphbjrxzhxhp:0dd689c06c27cc033fcc57e1b51db9e72469be3114c3a92fd66d5fe5e74515e2@ec2-54-235-246-201.compute-1.amazonaws.com:5432/d8aqbnfhudsq2s';

// const pool = new Pool({
//   connectionString: connectionString
// });

const pool = new Pool();

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { username, firstname, lastname, email, age } = req.body;
  console.log(`${username},${firstname}, ${lastname}, ${age}, ${email}`);

  let userAge = parseInt(age, 10);
  if (isNaN(userAge)) {
    userAge = 0;
  }
  pool.query(
    'INSERT INTO users (username, firstname, lastname, email, age) VALUES ($1, $2, $3) RETURNING *',
    [name, userAge, email],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(`id: ${JSON.stringify(results.rows[0])}`); //id: {"id":9,"name":"Peter","age":25,"email":"pjohnson@mtech.org"}
      res.status(201).send(`User added with ID: ${results.rows[0].id}  `);
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.body.id);
  const { name, age, email } = req.body;
  let userAge = parseInt(age, 10);

  pool.query(
    'UPDATE users SET name = $1, age = $2, email = $3 WHERE id = $4',
    [name, userAge, email, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.body.userId);
  console.log(`deleteUser id: ${id}`);

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
