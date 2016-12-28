angular.module('quoraApp')
	.directive('newQuestion', function(){
		return {
			restrict: 'E',
			templateUrl: '/app/questions/newquestion.view.html',
			controller: 'questionController' 
		}
	});