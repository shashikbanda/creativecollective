var express = require("express");
var router = express.Router();

// var cookie = require('cookie-parser')
var bcrypt = require('bcrypt')
var knex = require('../db/knex')

router.get('/roleSelect/:userID', function(req, res, next){
	var id = req.params.userID;
	console.log("id passed to signup/rolselect = " + id)
	res.render("roleSelect",{userID:id})
})
router.get('/email', function(req, res, next){
	res.render('signup')
})
router.post('/email', function(req, res, next){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var city = req.body.city;
	var email = req.body.email;
	var password = req.body.password;
	var id = Math.floor(Math.random() * 100000000000) + 9999999999999 

	knex('users').where({email:email}).then(function(rows){
		if(rows.length === 0){ //SAYS EMAIL IS UNIQUE, CREATE ACCOUNT
			knex('users')
			.insert({userID:id, 
					first_name: firstname, 
					last_name: lastname, 
					email: email, 
					city: city})
			.then(function(check){
				res.redirect("/signup/roleSelect/"+id)
			})
		}
		else{ //EMAIL ALREADY IN DATABASE
			console.log("email is already in use")
		}
	})
	knex('users').where({email:email}).first().then(function(user){
	    if(!user) {
	      var hash = bcrypt.hashSync(password, 8);
	      knex('users').where({email:email}).update({
	        password: hash
	      }).then(function(id) {
	        res.cookie('userID', id[0], { signed: true });
	        res.redirect("/signup/roleSelect/"+id)
	      });
	    } else {
	      res.status(409);
	      res.redirect('/login.html?error=You have already signed up. Please login.');
	    }
  	});
})

module.exports = router;