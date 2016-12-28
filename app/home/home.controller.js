angular.module('quoraApp').
	controller('homeController', ['$scope', '$cookies', function($scope, $cookies){
		$scope.username = $cookies.getObject('globals').currentUser.username;
		
	}])