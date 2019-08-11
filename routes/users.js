var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/users', async (req, res, next) => {
  let users = await db.getUsers();
  res.render('users', { users: users.rows });
});

module.exports = router;
