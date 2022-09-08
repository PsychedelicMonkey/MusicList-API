import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import discogs from '../config/discogs';
import Album from '../models/Album';

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

export const saveAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.body;

    const master = await discogs.getMaster(id);

    let album = await Album.findOne({ discogsId: id }).exec();

    if (album) {
      return res.status(400).json({ msg: 'album already saved' });
    }

    album = await Album.create({ ...master, discogsId: id });

    return res.status(201).json(album);
  } catch (err) {
    return next(err);
  }
};

export const searchAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { query } = req.body;

    const artists = await discogs.search({ query, type: 'artist' });

    return res.json(artists);
  } catch (err) {
    return next(err);
  }
};
