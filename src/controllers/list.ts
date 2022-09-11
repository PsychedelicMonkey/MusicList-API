import { NextFunction, Request, Response } from 'express';
import type { User as IUser } from 'user';
import List from '../models/List';

export const getLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lists = await List.find().populate([
      'user',
      { path: 'albums', populate: { path: 'artists' } },
    ]);

    return res.json(lists);
  } catch (err) {
    return next(err);
  }
};

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const list = await List.findById(id).populate([
      'user',
      { path: 'albums', populate: { path: 'artists' } },
    ]);

    if (!list) {
      return res.status(404).json({ msg: 'not found' });
    }

    return res.json(list);
  } catch (err) {
    return next(err);
  }
};

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, albums } = req.body;
    const user = req.user as IUser;

    const list = await List.create({ name, description, user, albums });

    return res.status(201).json(list);
  } catch (err) {
    return next(err);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, albums } = req.body;
    const { id } = req.params;
    const user = req.user as IUser;

    let list = await List.findById(id);

    if (!list) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (!user._id.equals(list.user)) {
      return res.status(401).json({ msg: 'unauthorized' });
    }

    list = await List.findByIdAndUpdate(
      id,
      { name, description, albums },
      { new: true }
    );

    return res.json(list);
  } catch (err) {
    return next(err);
  }
};

export const deleteList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;

    const list = await List.findById(id);

    if (!list) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (!user._id.equals(list.user)) {
      return res.status(401).json({ msg: 'unauthorized' });
    }

    await list.remove();
    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};
