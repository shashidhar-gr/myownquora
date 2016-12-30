var LocalStrategy = require('passport-local').Strategy;
var User = require('../datasets/users.js');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		console.log('In passport serializeUser');
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log('In passport deserializeUser');
		User.findById(id, function(err, user) {
			done(err, user);
		});	
	});

	//For login.
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {

		User.findOne({ email : email }, function(err, user) {
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false, { message: "This user is not registered."});
			}
			if(!user.validPassword(password)){
				return done(null, false, { message: "Password doesnt match."});	
			}
			return done(null, user);
		});
	}
	));

	//For signup.
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {

		User.findOne({ email : email }, function(err, user) {
			if(err){
				return done(err);
			}
			if(user){
				return done(null, false, { message: "This email is already take."});
			}
			else{
				var newUser = new User();
				newUser.email = email;
				newUser.password = newUser.generateHash(password);

				newUser.save(function(err){
					if(err)
						throw err;
					return done(null, user);
				});		
			}
		});
	}
	));
}