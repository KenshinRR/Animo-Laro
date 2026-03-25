import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true , unique: true},
    password: { type: String, required: true},
    bio: { type: String, required: true},
    avatar: { type: String, required: true},
});

export default mongoose.model('User', userSchema, 'Users');