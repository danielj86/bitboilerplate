/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 async = require('async'),
 bitClient = require('bitcoin'),
 Wallet = mongoose.model('Wallet');
 _ = require('underscore');



 exports.render = function(req, res) {
 	var walletGuid = '';
 	var userJson = 'NULL';
 	if(req.user){
 		walletGuid = req.user.wallet.guid;
 		userJson = JSON.stringify(req.user);
 	}

 	res.render('index', {
 		user: userJson,
 		wallet:walletGuid
 	});
 };