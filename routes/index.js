var express = require("express");
var router = express.Router();
var uuidv1 = require("uuid/v1");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { id: uuidv1() });
});

module.exports = router;
