var express = require("express");
var router = express.Router();

let userData = require('../public/users.json');

/* GET users listing. */
router.get("/users", function(req, res, next) {
  res.render("users", {userData: userData});
});

module.exports = router;
