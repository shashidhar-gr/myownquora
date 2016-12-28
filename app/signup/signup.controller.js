(function(){
	angular.module('quoraApp')
	.controller('signupController', ['$scope', '$cookies', '$http', '$location', function($scope, $cookies, $http, $location){
		$scope.signup = function(newUser){

			$http({
				method: 'POST',
				url: 'api/user/signup',
				data: newUser
			}).then(function success(response){
				$location.path('/home');
			}, function error(response){
				$location.path('/login');
			});
		}
	}])	
})();