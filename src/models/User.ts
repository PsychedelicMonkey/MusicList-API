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
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          many: true,
        },
      ],
      select: false,
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          many: true,
        },
      ],
      select: false,
    },
    albums: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Album',
          many: true,
        },
      ],
      select: false,
    },
    artists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Artist',
          many: true,
        },
      ],
      select: false,
    },
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

UserSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret['password'];
    return ret;
  },
});

export default model<User>('User', UserSchema);
