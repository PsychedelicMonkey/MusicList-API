import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAlbum,
  getArtist,
  searchAlbums,
  searchArtists,
} from '../controllers/search';

const router: Router = Router();

router.post(
  '/albums',
  body('query').notEmpty().withMessage('please enter an album name'),
  searchAlbums
);
router.get('/albums/:id', getAlbum);

router.post(
  '/artists',
  body('query').notEmpty().withMessage('please enter an artist name'),
  searchArtists
);
router.get('/artists/:id', getArtist);

export default router;
