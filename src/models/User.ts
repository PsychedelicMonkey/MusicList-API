import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../types/user';

const UserSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        many: true,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        many: true,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.checkPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
