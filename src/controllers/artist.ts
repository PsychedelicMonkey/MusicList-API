import { NextFunction, Request, Response } from 'express';
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
