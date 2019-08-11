var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/edit/', async (req, res, next) => {
  let targetID = req.query.id;
  let user = await db.getUserById(targetID);
  console.log(user, 'user');

  res.render('edit', { user: user.rows[0] });
});

module.exports = router;
