
var passport = require('./config/passport.js');

//Routes.
var authenticationController = require('./controllers/anuthentication.controller.js');
var questionsController = require('./controllers/question.controller.js');
//Athentication

module.exports = function(app, passport) {
	
	//Home page API.
	app.get('/', function(req, res, next){
		res.sendfile('./index.html');
	});

	//Signup API.
	app.post('/api/user/signup', authenticationController.signUp);
	
	//Login API.
	app.post('/api/user/login', authenticationController.login);

	//Profile API.
	app.post('/api/user/question', passport.authenticate('jwt', { session: false }), questionsController.postQuestion);
}
