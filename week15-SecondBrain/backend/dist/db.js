"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.LinkModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose"); // Import Types for ObjectId
var contentType;
(function (contentType) {
    contentType["VIDEO"] = "video";
    contentType["ARTICLE"] = "article";
    contentType["IMAGE"] = "image";
})(contentType || (contentType = {}));
// 2. Create a Schema corresponding to the document interface.
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password should be at least 8 characters long, got {VALUE}"],
        maxlength: [100, "Password should be a maximum of 100 characters long, got {VALUE}"]
    },
});
// 3. Create a Model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
// Tag schema
const TagSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
});
exports.TagModel = (0, mongoose_1.model)('Tag', TagSchema);
// Link schema
const LinkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});
exports.LinkModel = (0, mongoose_1.model)('Link', LinkSchema);
// Content schema
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: Object.values(contentType), required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag' }], // Reference to Tag
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});
exports.ContentModel = (0, mongoose_1.model)('Content', ContentSchema);
