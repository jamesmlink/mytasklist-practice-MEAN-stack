var express = require("express");
var router = express.Router();

//serve the index.html page
router.get('/', function(req, res, next){
	res.render("index.html");
});

module.exports = router;