import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../config/passport';
import { followProfile, unfollowProfile } from '../controllers/follow';
import {
  getProfile,
  getProfileFollowers,
  getProfileFollowing,
  updateProfile,
  uploadAvatar,
} from '../controllers/profile';

const router: Router = Router();

router.get('/:id', getProfile);
router.get('/:id/followers', getProfileFollowers);
router.get('/:id/following', getProfileFollowing);

router.post('/follow', auth, followProfile);
router.post('/unfollow', auth, unfollowProfile);

router.put(
  '/',
  auth,
  body('firstName').notEmpty().withMessage('first name required'),
  body('lastName').notEmpty().withMessage('last name required'),
  body('bio')
    .isLength({ max: 150 })
    .withMessage('your bio cannot exceed 150 characters'),
  updateProfile
);

router.post('/avatar', auth, uploadAvatar);

export default router;
