import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAlbum,
  getArtist,
  saveAlbum,
  saveArtist,
  searchAlbums,
  searchArtists,
} from '../controllers/search';

const router: Router = Router();

router.post(
  '/albums',
  body('query').notEmpty().withMessage('please enter an album name'),
  searchAlbums
);

router.post(
  '/albums/save',
  body('id').notEmpty().withMessage('please provide an album id'),
  saveAlbum
);

router.get('/albums/:id', getAlbum);

router.post(
  '/artists',
  body('query').notEmpty().withMessage('please enter an artist name'),
  searchArtists
);

router.post(
  '/artists/save',
  body('id').notEmpty().withMessage('please provide an artist id'),
  saveArtist
);

router.get('/artists/:id', getArtist);

export default router;
