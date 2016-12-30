var mongoose = require('mongoose');
var jwt_simple = require('jwt-simple');
var User = require('../datasets/users.js');
var config = require('../config/database.js');

//Function to login existing user.
module.exports.login = function(req, res) {

	if(!req.body.email || !req.body.password) {
		return res.status(400).json({ success: false, message: "Both email and password are required."});
	}
	
	User.findOne({ email : req.body.email }, function(err, user) {
		if(err){
			return res.status(500).json({ success: false, message: "Internal server error."});
		}
		if(!user){
			return res.status(400).json({ success: false, message: "User is not registered."});
		}
		if(!user.validPassword(req.body.password)){
			return res.status(400).json({ success: false, message: "Password doesn't match."});
		}
		var payload = {
			email: req.body.email
		}
		//creating token.
		var token = jwt_simple.encode(payload, config.secret);
		return res.status(200).json({ success: true, token: "JWT " + token});
	});	
}

//Function to signup new user.
module.exports.signUp = function(req, res) {

	if(!req.body.email || !req.body.password) {
		return res.status(400).json({ success: false, message: "Both email and password are required."});
	}
	

	User.findOne({ email : req.body.email }, function(err, user) {
		if(err){
			return res.status(500).json({ success: false, message: "Internal server error."});
		}
		if(user){
			return res.status(400).json({ success: false, message: "Email id already taken."});
		}
		else{
			var newUser = new User();
			newUser.email = req.body.email;
			newUser.password = newUser.generateHash(req.body.password);
			var payload = {
				email: req.body.email
			}
			//creating token.
			var token = jwt_simple.encode(payload, config.secret);
			newUser.save(function(err){
				if(err){
					return res.status(500).json({ success: false, message: "Internal server error."});
				}
				return res.status(200).json({ success: true, token: "JWT " + token});
			});		
		}
	});		
}

module.exports.profile = function(req, res){

	return res.status(200).json({ success: true, message: "All data related to me.."});
		
}