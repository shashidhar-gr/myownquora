angular.module('quoraApp')
	.directive('answersForm', function(){
		return {
			restrict: 'E',
			templateUrl: '/app/app-directives/answers/answers.view.html',
			controller: 'questionController' 
		}
	});