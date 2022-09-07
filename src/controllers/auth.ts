import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({ firstName, lastName, email, password });

    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
};
