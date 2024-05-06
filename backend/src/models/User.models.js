
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"email is required"],
        unique: [true,"email must be unique"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,  
        required: [true,"password is required"]
    },
    name: {
        type: String,
        required: [true,'name is required']
    }
});

// Hash the password before saving
userSchema.pre('save',async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
    } catch(error) {
        next(error);
    }
});

// check user password is correct or not
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);

};

// Create the User model
export const User = mongoose.model('User',userSchema);


