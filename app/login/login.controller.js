angular.module('quoraApp')
.controller('loginController', ['$scope', '$location', 'authenticationService', 'FlashService', function($scope, $location, authenticationService, FlashService){

	$scope.login = function(user){
	
		authenticationService.login(user, function(error, response){
			if(error){
				FlashService.Error(response.data.message);
				$location.path('/login');		
			}
			else{
				$location.path('/home');
			}
		});
	}

}]);