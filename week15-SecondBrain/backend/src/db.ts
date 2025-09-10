import { Schema, model, Types } from 'mongoose'; // Import Types for ObjectId

/*
    1. Create an interface representing a document in MongoDB. 
    The interfaces below are for type-checking in TypeScript. 
    They do not affect the schema or database structure.
*/

interface User {
    username: string;
    password: string;
}

enum contentType {
    VIDEO = "video",
    ARTICLE = "article",
    IMAGE = "image"
}

interface Tag {
    title: string;
}
/*
    ->Types.ObjectId:- 
        - This is the TypeScript type representing an ObjectId.
        - Used in interfaces, types, or anywhere you want TypeScript to know a value is an ObjectId.
        - Does not define schema behavior. Only for TypeScript type checking.
        - Helps prevent passing strings when your code expects an ObjectId.
*/
interface Link {
    hash: string;
    userId: Types.ObjectId;
}
  
interface Content {
    link: string;
    type: contentType;
    title: string;
    tags: Types.ObjectId[]; // Use mongoose.Types.ObjectId for array of tags
    userId: Types.ObjectId; // Use mongoose.Types.ObjectId
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: true, 
        minlength: [8, "Password should be at least 8 characters long, got {VALUE}"], 
        maxlength: [100, "Password should be a maximum of 100 characters long, got {VALUE}"] 
    },
});
// 3. Create a Model
export const UserModel = model<User>('User', UserSchema);
  
// Tag schema
const TagSchema = new Schema<Tag>({
    title: { 
        type: String, 
        required: true,
    },
});
export const TagModel = model<Tag>('Tag', TagSchema);
  
// Link schema
const LinkSchema = new Schema<Link>({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});
export const LinkModel = model<Link>('Link', LinkSchema);
  
// Content schema
const ContentSchema = new Schema<Content>({
    link: { type: String, required: true },
    type: { type: String, enum: Object.values(contentType), required: true },
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // Reference to Tag
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});
export const ContentModel = model<Content>('Content', ContentSchema);