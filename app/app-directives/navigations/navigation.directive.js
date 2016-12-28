angular.module('quoraApp')
	.directive('mainNavigation', function(){
		return {
			restrict: 'E',
			templateUrl: '/app/navigation/navigation.view.html',
			controller: 'navigationController'
		}
	});