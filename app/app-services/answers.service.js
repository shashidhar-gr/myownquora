angular.module('quoraApp')
	.factory('answerService',[ '$cookies', function($cookies){
		var service = {};

		service.getAnswers = getAnswers;
		service.postAnswer = postAnswer;
		service.upvoteAnswer = upvoteAnswer;
		return service;

		function upvoteAnswer(answer, callback){
			
			var answers = $cookies.getObject('globals').answers === undefined ? [] : $cookies.getObject('globals').answers;
			//console.log(answer);
			for(var i = 0; i < answers.length; i++){
				
				if(answers[i].id === answer.id){
					answers[i].upvotes++;
				}
			}

			var cookieGlobals = $cookies.getObject('globals');
			cookieGlobals.answers = answers;
			var cookieExp = new Date();
			cookieExp.setDate(cookieExp.getDate() + 7);

			$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });

			return callback(false);
		}

		function getAnswers(callback){
			var answers = $cookies.getObject('globals').answers === undefined ? [] : $cookies.getObject('globals').answers;

			callback(false, answers);
		}
		
		function postAnswer(user, questionObject, userAnswer, callback){

			var cookieGlobals = $cookies.getObject('globals');
			var answers = cookieGlobals.answers;
			
			if(Object.prototype.toString.call(answers) === '[object Array]' && answers.length !== 0){
					
				var answer = {
					"id": answers.length + 1,
					"writer": user.username,
					"questionid": questionObject.id,
					"answer": userAnswer,
					"images": [],
					"upvotes": 0,
					"downvotes": 0,
					"views": 0,
					"comments": [],
					"createdAt": new Date(),
					"lastUpdatedAt": new Date()
				};

				answers.push(answer);
				cookieGlobals["answers"] = answers;

				var cookieExp = new Date();
				cookieExp.setDate(cookieExp.getDate() + 7);

				$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });
				
				return callback(false);
			}
			else{
				
				answers = [];
				
				var answer = {
					"id": answers.length + 1,
					"writer": user.username,
					"questionid": questionObject.id,
					"answer": userAnswer,
					"images": [],
					"upvotes": 0,
					"downvotes": 0,
					"views": 0,
					"comments": [],
					"createdAt": new Date(),
					"lastUpdatedAt": new Date()
				};

				answers.push(answer);
				cookieGlobals["answers"] = answers;

				var cookieExp = new Date();
				cookieExp.setDate(cookieExp.getDate() + 7);

				$cookies.putObject('globals', cookieGlobals, { expires: cookieExp });
				
				return callback(false);
			}
			
		}
	}]);