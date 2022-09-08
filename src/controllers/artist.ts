import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import type { User as IUser } from 'user';
import Album from '../models/Album';
import Artist from '../models/Artist';

export const getArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ msg: 'not found' });
    }

    return res.json(artist);
  } catch (err) {
    return next(err);
  }
};

export const getArtistAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const albums = await Album.find({ artists: id });

    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

export const saveArtistToFavorites = async (
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

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (user.artists.includes(artist.id)) {
      return res
        .status(400)
        .json({ msg: 'this artist is already in your favorites' });
    }

    user.artists.push(artist.id);
    await user.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};

export const removeArtistFromFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IUser;
    const { id } = req.params;

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({ msg: 'not found' });
    }

    if (!user.artists.includes(artist.id)) {
      return res
        .status(400)
        .json({ msg: 'this artist is not in your favorites' });
    }

    user.artists.splice(user.artists.indexOf(artist.id), 1);
    await user.save();

    return res.json({ msg: 'ok' });
  } catch (err) {
    return next(err);
  }
};
