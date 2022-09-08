import { NextFunction, Request, Response } from 'express';
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
