import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import type { Artist as IArtist } from 'music';
import discogs from '../config/discogs';
import Album from '../models/Album';
import Artist from '../models/Artist';

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

    let album = await Album.findOne({ discogsId: id }).exec();

    if (album) {
      return res.status(400).json({ msg: 'album already saved' });
    }

    const master = await discogs.getMaster(id);
    const artists: Array<IArtist> = [];

    // Map through all artists and add all artists models to the artists array
    await Promise.all(
      master.artists.map(async (a: { id: number }) => {
        let artist = await Artist.findOne({ discogsId: a.id });

        if (!artist) {
          const masterArtist = await discogs.getArtist(a.id);
          artist = await Artist.create({ ...masterArtist, discogsId: a.id });
        }

        artists.push(artist.id);
      })
    );

    album = await Album.create({ ...master, artists, discogsId: id });

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

export const saveArtist = async (
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

    let artist = await Artist.findOne({ discogsId: id }).exec();

    if (artist) {
      return res.status(400).json({ msg: 'artist already saved' });
    }

    const master = await discogs.getArtist(id);
    artist = await Artist.create({ ...master, discogsId: id });

    return res.status(201).json(artist);
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
