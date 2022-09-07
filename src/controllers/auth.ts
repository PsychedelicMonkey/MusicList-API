import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET } from '../utils/secrets';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').exec();

    if (!user) {
      return res.status(401).json({ msg: 'incorrect credentials' });
    }

    const success = await user.checkPassword(password);

    if (!success) {
      return res.status(401).json({ msg: 'incorrect credentials' });
    }

    const token = await sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });

    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({ firstName, lastName, email, password });

    const token = await sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });

    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export const loadUser = async (req: Request, res: Response) => {
  return res.json(req.user);
};
