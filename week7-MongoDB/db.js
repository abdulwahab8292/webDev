const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
});

const todoSchema = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
});

const UserModel = mongoose.model("User", userSchema);
const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = {
    UserModel,
    TodoModel,
};

mongoose.connect("mongodb+srv://abdulwahabj210:TAeKRPGJIHPHua5D@cluster0.tiytg.mongodb.net/mydatabase?retryWrites=true&w=majority/todo-abdul-1");
