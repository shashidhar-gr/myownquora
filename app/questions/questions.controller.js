angular.module('quoraApp')
	.controller('questionController', ['$scope', '$cookies', 'questionService', 'answerService', function($scope, $cookies, questionService, answerService){
		
		var currentUser = $cookies.getObject('globals').currentUser;

		//Function to post the question
		$scope.postQuestion = function(question){
			
			questionService.postQuestion(currentUser, question, function(error){
				$scope.questions = angular.copy($cookies.getObject('globals').questions);
			});
			
		}

		$scope.questions = $cookies.getObject('globals').questions;
		
		$scope.downVoteQuestion = function(question){
			questionService.downVote(question);
		}

		$scope.postAnswer = function(eachQuestion){
			bootbox.prompt({
			    title: 'Your answer',
			    buttons: {
			        confirm: {
			            label: 'Post answer'
			        },
			        cancel: {
			            label: 'cancel'
			        }
			    },
			    callback: function (answer) {

			    	var currentUser = $cookies.getObject('globals').currentUser;

			        answerService.postAnswer(currentUser, eachQuestion, answer, function(error, result){
			        	console.log($cookies.getObject('globals').answers);
			        });
			    }
			});
		}
	}]
);