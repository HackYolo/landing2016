var express = require('express');
var router = express.Router();
var config = require('../config');
var User = require('../models/user.js');
var mongojs = require('mongojs');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

var canAccessAdmin = function( req, res, next ){
  if( req.user.fb.id == config.fb_rootAdmin || req.user.isAdmin )
    return next();
  res.send(403, 'NONONO you are not allowed to play here');
};

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { user: req.user, message: req.flash('message') });
	});

  router.get('/admin', canAccessAdmin, function(req, res){
    res.render('admin', { user: req.user });
  });

  
	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { user: req.user });
	});


	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : ['public_profile', 'email'] }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);

  return router;

};


