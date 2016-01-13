var express = require("express");
var router = express.Router();

var knex = require('../db/knex')

router.get('/', function(req, res, next){
	res.render("home")//MAIN PAGE EJS FILE GOES HERE
})
router.get('/signup/roleSelect/:userID', function(req, res, next){
	var id = req.params.userID;
	res.render("roleSelect",{userID:id})

})
module.exports = router;

