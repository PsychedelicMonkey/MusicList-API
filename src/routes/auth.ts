import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../config/passport';
import { loadUser, loginUser, registerUser } from '../controllers/auth';

const router: Router = Router();

router.post(
  '/login',
  body('email').notEmpty().withMessage('email address required'),
  body('password').notEmpty().withMessage('password required'),
  loginUser
);

router.post(
  '/register',
  body('firstName').notEmpty().withMessage('first name required'),
  body('lastName').notEmpty().withMessage('last name required'),
  body('email').isEmail().withMessage('invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  registerUser
);

router.get('/me', auth, loadUser);

export default router;
