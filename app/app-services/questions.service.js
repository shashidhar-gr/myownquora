angular.module('quoraApp')
	.factory('questionService', ['$cookies', '$rootScope', function($cookies, $rootScope){
		var service = {};
		service.postQuestion = postQuestion;
		service.getQuestions = getQuestions;
		service.downVote = downVote;
		return service;

		function getQuestions(callback){
			var questions = $cookies.getObject('globals').questions === undefined ? [] : $cookies.getObject('globals').questions;
			return callback(false, questions);
		}

		function downVote(question){
			var cookieGlobals = $cookies.getObject('globals');
			var questions = cookieGlobals.questions;

			for(var i = 0; i < questions.length; i++) {
				if(questions[i].id === question.id) {
					questions[i].downvotes++;
				}
			}

			cookieGlobals["questions"] = questions;

			var cookieExp = new Date();
			cookieExp.setDate(cookieExp.getDate() + 7);

			$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });
		}
		
		function postQuestion(user, userQuestion, callback){
			var cookieGlobals = $cookies.getObject('globals');
			var questions = cookieGlobals.questions;
			
			if(Object.prototype.toString.call(questions) === '[object Array]' && questions.length !== 0){
								
				var question = {
					"id": questions.length + 1,
					"writer": user.username,
					"tags": [],
					"question": userQuestion,
					"description": "",
					"images": [],
					"noOfAnswers": 0,
					"downvotes": 0,
					"createdAt": new Date(),
					"lastUpdatedAt": new Date()
				};
				questions.push(question);
				cookieGlobals["questions"] = questions;

				var cookieExp = new Date();
				cookieExp.setDate(cookieExp.getDate() + 7);

				$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });
				return callback(false);
			}
			else{
				questions = [];
				var question = {
					"id": 1,
					"writer": user.username,
					"tags": [],
					"question": userQuestion,
					"description": "",
					"images": [],
					"noOfAnswers": 0,
					"downvotes": 0,
					"createdAt": new Date(),
					"lastUpdatedAt": new Date()
				};

				questions.push(question);
				cookieGlobals["questions"] = questions;
				
				var cookieExp = new Date();
				cookieExp.setDate(cookieExp.getDate() + 7);

				$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });
				return callback(false);
			}
		}
	}]);