import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
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
