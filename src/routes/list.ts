import { Router } from 'express';
import { auth } from '../config/passport';
import {
  createList,
  deleteList,
  getList,
  getLists,
  updateList,
} from '../controllers/list';

const router: Router = Router();

router.get('/', getLists);
router.post('/', auth, createList);
router.get('/:id', getList);
router.put('/:id', auth, updateList);
router.delete('/:id', auth, deleteList);

export default router;
