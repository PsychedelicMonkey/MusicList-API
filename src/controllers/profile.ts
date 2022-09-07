import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { User as IUser } from '../types/user';

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'not found' });
    }

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const { id } = req.user as IUser;

    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, bio },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};
