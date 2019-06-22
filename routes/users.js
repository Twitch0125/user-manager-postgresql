var express = require("express");
var router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get("/users", function(req, res, next) {
  //find all users in the database
  db.user.find({}, (err, users) => {
    if (err) return console.error(err);
    res.render("users", { users: users });
  });
});

module.exports = router;
