angular.module('quoraApp')
	.controller('answerController', ['$scope', '$cookies', 'answerService', 'questionService', function($scope, $cookies, answerService, questionService){
		
		$scope.questionAnswers = [];
		$scope.upvoteAnswer = function(answer){
			
			answerService.upvoteAnswer(answer, function(error, result){
				
			});			
		}

		listAnswers();

		function listAnswers() {
			
			answerService.getAnswers(function(error, result) {

				var answers = result;
				var questionAnswers = [];

				questionService.getQuestions(function(error, result) {

					var finalResult = [];
					questionAnswers = result;

					for(var i = 0; i < questionAnswers.length; i++) {
						
						for(var j = 0; j < answers.length; j++) {
							
							if(questionAnswers[i].id === answers[j].questionid) {

								if(questionAnswers[i]["answers"] === undefined) {
									questionAnswers[i]["answers"] = [];
									questionAnswers[i]["answers"].push(answers[j]);
								}

								questionAnswers[i]["answers"].push(answers[j]);

								finalResult.push(questionAnswers[i]);
							}
						}
					}
					
					$scope.questionAnswers = finalResult;
				})

			});

		}

	}]);