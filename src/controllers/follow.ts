import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { User as IUser } from '../types/user';

export const followProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.user as IUser;

    const user = await User.findById(req.body.id).select('followers');

    if (!user) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (user._id.equals(auth._id)) {
      return res.status(400).json({ msg: 'you cannot follow yourself' });
    }

    if (user.followers.includes(auth._id)) {
      return res
        .status(400)
        .json({ msg: 'you are already following this profile' });
    }

    user.followers.push(auth._id);
    user.followersCount = user.followers.length;
    await user.save();

    auth.following.push(user._id);
    auth.followingCount = auth.following.length;
    await auth.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};

export const unfollowProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.user as IUser;

    const user = await User.findById(req.body.id).select('followers');

    if (!user) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (user._id.equals(auth._id)) {
      return res.status(400).json({ msg: 'you cannot follow yourself' });
    }

    if (!user.followers.includes(auth._id)) {
      return res
        .status(400)
        .json({ msg: 'you are not following this profile' });
    }

    user.followers.splice(user.followers.indexOf(auth._id), 1);
    user.followersCount = user.followers.length;
    await user.save();

    auth.following.splice(auth.following.indexOf(user._id), 1);
    auth.followingCount = auth.following.length;
    await auth.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};
