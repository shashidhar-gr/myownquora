angular.module('quoraApp')
	.controller('navigationController', ['$scope', '$cookies', function($scope, $cookies){
		$scope.currentUser = $cookies.getObject('globals').currentUser;
	}]);