var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function(req, res){
	var user = new User(req.body);
	user.save();

	res.json(req.body);
}

module.exports.login = function(req, res){
	User.find(req.body, function(error, users){
		if(error){
			return res.status(500).json({message: "Internal server error."});
		}
		else if(users.length !== 0){
			return res.status(200).json(req.body.email);
		}
		else{
			return res.status(404).json({message: "Email or Password you entered is incorrect."});
		}
	});
}