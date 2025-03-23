const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    rollno: {
        type: String,
    },
    gmail: {
        type: String,
    },
    branch: {
        type: String,
    },
    mark: {
        type: String,
    },
    duration: {
        type: String,
    },
});

const QuizUser = mongoose.model('QuizUser', userSchema);

module.exports = QuizUser;
