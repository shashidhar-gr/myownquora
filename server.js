var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var app = express();

mongoose.connect('mongodb://localhost:27017/myquora');

var authenticationController = require('./server/controllers/anuthentication.controller.js');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

//Athentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

app.listen('3000', function(){
	console.log("Server is running on port 3000.");
});