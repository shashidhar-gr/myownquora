var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	question: String,
	description: String,
	tags: [],
	images: [],
	writer: String,
	noOfAnswers: { type: Number, default: 0 },
	downvotes: { type: Number, default: 0 },
	createdAt: { type: String, default: Date.now },
	lastUpdatedAt: { type: String, default: Date.now }
});

// Methods.
module.exports = mongoose.model('Question', questionSchema);