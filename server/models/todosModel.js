const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    userId: Number,
    id: Number,
    title: String,
    completed: Boolean
});

const TodoModel = mongoose.model("Todo", Todo);
module.exports = TodoModel;
