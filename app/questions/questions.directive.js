angular.module('quoraApp')
	.directive('questionsList', function(){
		return {
			restrict: 'E',
			templateUrl: '/app/questions/questions.view.html',
			controller: 'questionController' 
		}
	});