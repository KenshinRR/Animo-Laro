import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true , unique: true},
    password: { type: String, required: true},
    bio: { type: String, required: true},
    avatar: { type: String, required: true},
});

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch(err){
        throw err;
    }
})

userSchema.method('comparePassword', function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
});

export default mongoose.model('User', userSchema, 'Users');