import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../config/passport';
import {
  getArtist,
  getArtistAlbums,
  removeArtistFromFavorites,
  saveArtistToFavorites,
} from '../controllers/artist';

const router: Router = Router();

router.post(
  '/',
  auth,
  body('id').notEmpty().withMessage('artist id required'),
  saveArtistToFavorites
);
router.get('/:id', getArtist);
router.delete('/:id', auth, removeArtistFromFavorites);
router.get('/:id/albums', getArtistAlbums);

export default router;
