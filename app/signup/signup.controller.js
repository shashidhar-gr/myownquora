(function(){
	angular.module('quoraApp')
	.controller('signupController', ['$scope', '$cookies', '$http', '$location', 'authenticationService', 'FlashService', function($scope, $cookies, $http, $location, authenticationService, FlashService){
		$scope.signup = function(newUser){

			authenticationService.signup(newUser, function(error, response){
				if(error){
					FlashService.Error(response.data.message);
					$location.path('/signup');		
				}
				else{
					$location.path('/home');
				}
			});
		}
	}])	
})();