angular.module('quoraApp')
	.factory('authenticationService', ['$rootScope', '$cookies', '$http', function($rootScope, $cookies, $http){

		var service = {};

		function setCredentials(username, password){
			$rootScope.globals = {
				currentUser: {
					email: username,
					password: password
				}
			}

			var cookieExp = new Date();
			cookieExp.setDate(cookieExp.getDate() + 7);

			$cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
		}

		function clearCredentials(){
			$rootScope.globals.currentUser = {};
			$cookies.remove('globals');
		}

		function login(user, callback){

			$http(
			{
				method: 'POST',
				url: '/api/user/login',
				data: user
			}).then(function success(response){
				setCredentials(user.email, user.password);
				return callback(false, response);

			}, function error(response){
				
				return callback(true, response);
			});
		}

		function signup(user, callback){

			$http(
			{
				method: 'POST',
				url: '/api/user/signup',
				data: user
			}).then(function success(response){
				setCredentials(user.email, user.password);
				return callback(false, response);

			}, function error(response){
				
				return callback(true, response);
			});
		}

		service.setCredentials = setCredentials;
		service.clearCredentials = clearCredentials;
		service.login = login;
		service.signup = signup;

		return service;
	}]);