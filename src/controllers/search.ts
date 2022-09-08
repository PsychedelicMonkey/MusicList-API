import { NextFunction, Request, Response } from 'express';
import discogs from '../config/discogs';

export const getAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const album = await discogs.getMaster(id);

    return res.json(album);
  } catch (err) {
    return next(err);
  }
};

export const searchAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.body;

    const albums = await discogs.search({
      query,
      type: 'master',
      format: 'album',
    });

    return res.json(albums);
  } catch (err) {
    return next(err);
  }
};

export const getArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const artist = await discogs.getArtist(id);

    return res.json(artist);
  } catch (err) {
    return next(err);
  }
};

export const searchArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.body;

    const artists = await discogs.search({ query, type: 'artist' });

    return res.json(artists);
  } catch (err) {
    return next(err);
  }
};
