import { Router } from 'express';
import { getArtist, getArtistAlbums } from '../controllers/artist';

const router: Router = Router();

router.get('/:id', getArtist);
router.get('/:id/albums', getArtistAlbums);

export default router;
