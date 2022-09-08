import { Router } from 'express';
import {
  getAlbum,
  getArtist,
  searchAlbums,
  searchArtists,
} from '../controllers/search';

const router: Router = Router();

router.post('/albums', searchAlbums);
router.get('/albums/:id', getAlbum);

router.post('/artists', searchArtists);
router.get('/artists/:id', getArtist);

export default router;
