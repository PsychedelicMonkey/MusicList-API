import { Router } from 'express';
import { auth } from '../config/passport';
import { getProfile, updateProfile } from '../controllers/profile';

const router: Router = Router();

router.get('/:id', getProfile);
router.put('/', auth, updateProfile);

export default router;
