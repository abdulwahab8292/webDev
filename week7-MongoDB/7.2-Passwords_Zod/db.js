const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const todoSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', userSchema);
const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = {
    UserModel,
    TodoModel
};
