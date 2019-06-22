var express = require("express");
var router = express.Router();

router.get("/edit", function(req, res, next) {
  let targetID = req.query.id;
  res.render("edit", { user: targetUser[0] });
});

module.exports = router;
