import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import type { User as IUser } from 'user';
import Album from '../models/Album';

export const getAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const album = await Album.findById(req.params.id).populate('artists');

    if (!album) {
      return res.status(404).json({ msg: 'not found' });
    }

    return res.json(album);
  } catch (err) {
    return next(err);
  }
};

export const saveAlbumToFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = req.user as IUser;
    const { id } = req.body;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (user.albums.includes(id)) {
      return res
        .status(400)
        .json({ msg: 'this album is already in your favorites' });
    }

    user.albums.push(album.id);
    await user.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};

export const removeAlbumFromFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (!user.albums.includes(album.id)) {
      return res
        .status(400)
        .json({ msg: 'this album is not in your favorites' });
    }

    user.albums.splice(user.albums.indexOf(album.id), 1);
    await user.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};
