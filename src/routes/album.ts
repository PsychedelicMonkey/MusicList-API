import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../config/passport';
import {
  getAlbum,
  removeAlbumFromFavorites,
  saveAlbumToFavorites,
} from '../controllers/album';

const router: Router = Router();

router.post(
  '/',
  auth,
  body('id').notEmpty().withMessage('album id required'),
  saveAlbumToFavorites
);
router.get('/:id', getAlbum);
router.delete('/:id', auth, removeAlbumFromFavorites);

export default router;
