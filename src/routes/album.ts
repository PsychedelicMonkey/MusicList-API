import { Router } from 'express';
import { getAlbum } from '../controllers/album';

const router: Router = Router();

router.get('/:id', getAlbum);

export default router;
