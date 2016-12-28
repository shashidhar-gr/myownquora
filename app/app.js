(function(){

	var app = angular.module('quoraApp', ['ngRoute', 'ngCookies']);

	app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
		$routeProvider.
		when('/signup', {
			templateUrl: '/app/signup/signup.view.html',
			controller: 'signupController'
		}).
		when('/login',{
			templateUrl : '/app/login/login.view.html',
			controller : 'loginController'
		}).
		when('/home', {
			templateUrl : '/app/answers/answers.view.html',
			controller : 'answerController'	
		}).
		when('/answer',{
			templateUrl : '/app/home/home.view.html',
			controller : 'homeController'
		}).
		otherwise({
			redirectTo : '/login'
		});

		$locationProvider.hashPrefix('!');
	}]);

})();
