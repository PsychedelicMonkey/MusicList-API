import { Router } from 'express';
import { auth } from '../config/passport';
import { loadUser, loginUser, registerUser } from '../controllers/auth';

const router: Router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', auth, loadUser);

export default router;
