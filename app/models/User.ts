
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        username: {
            type: String,
            required: true,
            minlength: [2, 'Username must be at least 2 characters'],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'], // Make sure this matches your UserRole enum
            default: 'user',
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt fields
    }
);

// Export or register the model
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
