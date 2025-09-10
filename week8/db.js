const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

// Schemas
const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String }
});

const adminSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true }, 
    creatorId: { type: objectId, required: true }
});

const purchaseSchema = new Schema({
    userId: { type: objectId, required: true, ref: 'user' },
    courseId: { type: objectId, required: true, ref: 'course' } // Make sure to include the ref
});


// Models
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
const courseModel = mongoose.model("course", courseSchema);

module.exports = {
    userModel,
    adminModel,
    purchaseModel,
    courseModel 
};
