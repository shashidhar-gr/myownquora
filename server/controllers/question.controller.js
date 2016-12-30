var mongoose = require('mongoose');
var Question = require('../datasets/questions.js');

//Function to post new questions.
module.exports.postQuestion = function(req, res) {
	if(!req.body.question || !req.body.user) {
		return res.status(400).json({ success: false, message: "Both question and user are required."});
	}

	var newQuestion = new Question({
		question: req.body.question,
		user: req.body.user
	});

	newQuestion.save(function(err) {
		if(err) {
			return res.status(500).json({ success: false, message: "Internal server error."});
		}
		return res.status(200).json({ success: true, message: "New question added successfully."});
	});
}